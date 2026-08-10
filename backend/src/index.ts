import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { guestRouter } from "./routes/guestRouter.js";
import { emailRouter } from "./routes/emailRouter.js";
import { addRSVPField } from "./scripts/addRsvpFieldtoGuests.js";

dotenv.config();
const MONGOURL = process.env.MONGO_URL || "";

const BOOT_TIME = new Date().toISOString();

// Every log line is prefixed so `docker compose logs backend | grep '\[boot\]'`
// (or [mongo]/[req]/[email]) pulls out one concern at a time.
const log = (tag: string, ...args: unknown[]) =>
  console.log(`[${tag}]`, ...args);
const logErr = (tag: string, ...args: unknown[]) =>
  console.error(`[${tag}]`, ...args);

log("boot", "=== backend starting ===", {
  bootTime: BOOT_TIME,
  nodeVersion: process.version,
  nodeEnv: process.env.NODE_ENV ?? "(unset)",
  port: process.env.PORT ?? "(unset, defaulting to 3001)",
  // Never log secret values — only whether they arrived in the container at
  // all, which is the failure that actually keeps happening in production.
  hasMongoUrl: Boolean(process.env.MONGO_URL),
  hasResendApi: Boolean(process.env.RESEND_API),
  resendApiLength: (process.env.RESEND_API || "").length,
});

if (!MONGOURL) {
  logErr(
    "boot",
    "MONGO_URL is empty. Compose reads it from the .env next to " +
      "docker-compose.yml — guest routes will fail until it is set.",
  );
}

// Connection-level events, not just the initial connect() result. A dropped
// Atlas connection an hour after boot produced no output at all before this,
// which made "is the backend up?" impossible to answer from the logs.
mongoose.connection.on("connected", () =>
  log("mongo", "connected", { db: mongoose.connection.db?.databaseName }),
);
mongoose.connection.on("disconnected", () => logErr("mongo", "disconnected"));
mongoose.connection.on("reconnected", () => log("mongo", "reconnected"));
mongoose.connection.on("error", (error) =>
  logErr("mongo", "connection error event:", error),
);

const connectMongo = async (): Promise<void> => {
  const startedAt = Date.now();
  log("mongo", "connecting...");
  try {
    await mongoose.connect(MONGOURL);
    log("mongo", `connect() resolved in ${Date.now() - startedAt}ms`, {
      db: mongoose.connection.db?.databaseName,
      readyState: mongoose.connection.readyState,
    });
  } catch (error) {
    // Deliberately not fatal. This used to process.exit(1), which meant an
    // Atlas IP-allowlist change took down the *entire* API — including the
    // question form, which never touches Mongo — and `restart: always` turned
    // that into a crash loop that read as a bare 502 from Caddy. Mongoose
    // retries in the background, so guest routes recover on their own once the
    // database is reachable again; until then they 500 and everything else
    // keeps serving.
    logErr(
      "mongo",
      `connect() failed after ${Date.now() - startedAt}ms (continuing to serve):`,
      error,
    );
  }
};

const app = express();
const PORT = process.env.PORT || 3001;

// Now that the API answers on its own hostname, browser calls to it are
// cross-origin and every one is preceded by a preflight. A bare `cors()`
// reflects any origin, which is too open for a publicly addressable API, so
// this is an explicit allowlist. CORS_ORIGINS (comma-separated) overrides it
// without a code change.
const ALLOWED_ORIGINS = (
  process.env.CORS_ORIGINS ||
  [
    "https://arlettetakawedding.com",
    "https://www.arlettetakawedding.com",
    // Vite dev server. Harmless in production: an attacker cannot make a
    // victim's browser originate from localhost on someone else's machine.
    "http://localhost:3000",
    "http://localhost:5173",
  ].join(",")
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

log("boot", "CORS allowlist:", ALLOWED_ORIGINS);

app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header at all: curl, server-to-server, same-origin GETs.
      // Nothing to enforce, so allow it — CORS only governs browsers.
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);

      // The browser deliberately hides the reason for a blocked preflight
      // from JavaScript, so this log is the only place the real cause of a
      // silent frontend failure is written down.
      logErr(
        "cors",
        `BLOCKED origin ${origin} — not in allowlist. Add it to CORS_ORIGINS ` +
          `in the .env next to docker-compose.yml if this is legitimate.`,
      );
      callback(null, false);
    },
  }),
);
app.use(express.json());

// One line in, one line out, with a request id that also goes back to the
// browser as X-Request-Id. That id is what ties a console error in the
// frontend to the matching stack trace in `docker compose logs backend`.
let requestCounter = 0;
app.use((req, res, next) => {
  const requestId = `r${++requestCounter}`;
  res.locals.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);

  const startedAt = Date.now();
  log("req", `--> ${requestId} ${req.method} ${req.originalUrl}`, {
    origin: req.headers.origin ?? "(none)",
    contentType: req.headers["content-type"] ?? "(none)",
  });

  res.on("finish", () => {
    log(
      "req",
      `<-- ${requestId} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - startedAt}ms`,
    );
  });
  next();
});

connectMongo();

// Top-level await: an unhandled rejection here fails module evaluation and
// kills the process, so a one-off backfill must never be able to take the
// server down. It buffers and times out whenever Mongo is unreachable.
try {
  log("boot", "running addRSVPField backfill...");
  await addRSVPField();
  log("boot", "addRSVPField backfill finished");
} catch (error) {
  logErr("boot", "addRSVPField backfill skipped:", error);
}

app.use("/api/guests", guestRouter);
app.use("/api/email", emailRouter);

// Cheap "is the backend actually up, and what does it think it has?" probe.
// Reachable in production at https://arlettetakawedding.com/api/health, so it
// can be checked from a browser tab without shell access to the server.
app.get("/api/health", (_req, res) => {
  const mongoStates = ["disconnected", "connected", "connecting", "disconnecting"];
  const body = {
    status: "ok",
    bootTime: BOOT_TIME,
    uptimeSeconds: Math.round(process.uptime()),
    nodeEnv: process.env.NODE_ENV ?? null,
    mongo: {
      readyState: mongoose.connection.readyState,
      readyStateLabel:
        mongoStates[mongoose.connection.readyState] ?? "unknown",
      db: mongoose.connection.db?.databaseName ?? null,
    },
    email: {
      hasResendApi: Boolean(process.env.RESEND_API),
      resendApiLength: (process.env.RESEND_API || "").length,
    },
    corsAllowlist: ALLOWED_ORIGINS,
  };
  log("health", "health check served:", body);
  res.status(200).json(body);
});

app.get("/", (req, res) => {
  res.send("Backend is running");

  log("root", "Connected to DB:", mongoose.connection.db?.databaseName);
});

// Anything that throws past a route handler lands here instead of hanging the
// request, and the browser gets the request id to quote back.
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    logErr("error", `unhandled error on ${res.locals.requestId}:`, err);
    if (res.headersSent) return;
    res.status(500).json({
      error: err?.message ?? "Internal server error",
      requestId: res.locals.requestId,
    });
  },
);

// Last-resort process-level logging. Without these a crash in an async path
// shows up only as the container silently restarting.
process.on("unhandledRejection", (reason) =>
  logErr("process", "unhandledRejection:", reason),
);
process.on("uncaughtException", (error) =>
  logErr("process", "uncaughtException:", error),
);

app.listen(PORT, () => {
  log("boot", `=== server listening on port ${PORT} ===`);
});
