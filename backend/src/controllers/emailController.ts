import "dotenv/config";

import { Resend } from "resend";
import type { Request, Response } from "express";
import { guestSubmissionEmail } from "../templates/guestSubmissionTemplate.js";
import { newRSVPEmail } from "../templates/newRSVPTemplate.js";

const RESEND_API = process.env.RESEND_API || "";

const log = (...args: unknown[]) => console.log("[email]", ...args);
const logErr = (...args: unknown[]) => console.error("[email]", ...args);

log("controller loaded", {
  hasResendApi: Boolean(RESEND_API),
  // Length + prefix only. Enough to tell "missing", "empty string", and
  // "pasted with quotes/whitespace" apart without putting the key in a log.
  resendApiLength: RESEND_API.length,
  resendApiPrefix: RESEND_API ? `${RESEND_API.slice(0, 4)}...` : "(none)",
});

if (!RESEND_API) {
  logErr(
    "RESEND_API is not set — outgoing email is disabled. Compose reads this " +
      "from the .env next to docker-compose.yml, not backend/.env.",
  );
}

// Built once, but lazily: `new Resend("")` throws, and doing that at module
// scope would take the whole API down at boot over a missing mail key rather
// than just failing the two email routes.
let client: Resend | null = null;
const getResend = () => {
  if (!RESEND_API) return null;
  if (!client) {
    log("constructing Resend client (first send of this process)");
    client = new Resend(RESEND_API);
  }
  return client;
};

const NO_KEY = {
  error: "Email is not configured on this server (RESEND_API)",
  // `reason` is a stable machine-readable code the frontend logs verbatim, so
  // a misconfigured server is distinguishable from a rejected send in the
  // browser console without reading the server logs first.
  reason: "missing_resend_api_key",
};

export const sendGuestSubmission = async (req: Request, res: Response) => {
  const requestId = res.locals.requestId ?? "-";
  const { email, message } = req.body ?? {};

  log(`${requestId} POST /api/email/submission`, {
    hasEmail: Boolean(email),
    hasMessage: Boolean(message),
    messageLength: typeof message === "string" ? message.length : 0,
    bodyKeys: Object.keys(req.body ?? {}),
  });

  if (!email || !message) {
    logErr(`${requestId} rejected: missing email or message`);
    return res.status(400).json({
      error: "email and message are required",
      reason: "missing_fields",
      requestId,
    });
  }

  const resend = getResend();
  if (!resend) {
    logErr(`${requestId} rejected: no RESEND_API key in this container`);
    return res.status(503).json({ ...NO_KEY, requestId });
  }

  const startedAt = Date.now();
  try {
    const payload = guestSubmissionEmail(email, message);
    log(`${requestId} sending via Resend`, {
      from: (payload as any).from,
      to: (payload as any).to,
      subject: (payload as any).subject,
    });

    const { data, error } = await resend.emails.send(payload);
    // Resend reports failures in the body rather than throwing, so this branch
    // has to return — without it the success response fired too and Express
    // blew up with ERR_HTTP_HEADERS_SENT on every rejected send.
    if (error) {
      logErr(
        `${requestId} Resend rejected guest submission after ${Date.now() - startedAt}ms:`,
        error,
      );
      return res.status(502).json({
        error: error.message ?? String(error),
        reason: "resend_rejected",
        resendError: error,
        requestId,
      });
    }
    log(
      `${requestId} sent in ${Date.now() - startedAt}ms, resend id:`,
      data?.id,
    );
    return res.status(200).json({ ...data, requestId });
  } catch (err: any) {
    logErr(
      `${requestId} guest submission send threw after ${Date.now() - startedAt}ms:`,
      err,
    );
    return res.status(500).json({
      error: err?.message ?? "Unknown error",
      reason: "send_threw",
      name: err?.name,
      requestId,
    });
  }
};

export const sendRSVPEmail = async (req: Request, res: Response) => {
  const requestId = res.locals.requestId ?? "-";
  const { name, attending, guests } = req.body ?? {};

  log(`${requestId} POST /api/email/rsvp`, { name, attending, guests });

  const resend = getResend();
  if (!resend) {
    logErr(`${requestId} rejected: no RESEND_API key in this container`);
    return res.status(503).json({ ...NO_KEY, requestId });
  }

  const startedAt = Date.now();
  try {
    const { data, error } = await resend.emails.send(
      newRSVPEmail({ name, attending, guests }),
    );
    if (error) {
      logErr(
        `${requestId} Resend rejected RSVP email after ${Date.now() - startedAt}ms:`,
        error,
      );
      return res.status(502).json({
        error: error.message ?? String(error),
        reason: "resend_rejected",
        resendError: error,
        requestId,
      });
    }
    log(
      `${requestId} RSVP email sent in ${Date.now() - startedAt}ms, resend id:`,
      data?.id,
    );
    return res.status(200).json({ ...data, requestId });
  } catch (err: any) {
    logErr(
      `${requestId} RSVP email send threw after ${Date.now() - startedAt}ms:`,
      err,
    );
    return res.status(500).json({
      error: err?.message ?? "Unknown error",
      reason: "send_threw",
      name: err?.name,
      requestId,
    });
  }
};
