// Both email calls used to throw a bare `new Error("Failed to send mail")`,
// which discarded the status code and the server's JSON body — the two things
// that actually say *why* a send failed. In production that reduced every
// distinct failure (backend down, missing API key, Resend rejection, HTML
// error page from the proxy) to one indistinguishable message in the console.

export class EmailApiError extends Error {
  status: number;
  reason?: string;
  requestId?: string;
  body: unknown;

  constructor(
    message: string,
    details: {
      status: number;
      reason?: string;
      requestId?: string;
      body: unknown;
    },
  ) {
    super(message);
    this.name = "EmailApiError";
    this.status = details.status;
    this.reason = details.reason;
    this.requestId = details.requestId;
    this.body = details.body;
  }
}

import { apiUrl } from "./config";

const log = (...args: unknown[]) => console.log("[emailAPI]", ...args);
const logErr = (...args: unknown[]) => console.error("[emailAPI]", ...args);

// Reads the body as text first, then tries JSON. A dead backend answers
// through Caddy with an HTML 502 page, and `response.json()` on that throws a
// SyntaxError that masks the real status — so the raw text is what gets
// logged when parsing fails.
const readBody = async (response: Response) => {
  const raw = await response.text();
  try {
    return { parsed: JSON.parse(raw) as any, raw };
  } catch {
    return { parsed: null, raw };
  }
};

const request = async (
  label: string,
  url: string,
  payload: Record<string, unknown>,
) => {
  const startedAt = Date.now();
  log(`${label} POST ${url}`, {
    origin: window.location.origin,
    payloadKeys: Object.keys(payload),
  });

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    // fetch only rejects when the request never got an HTTP response at all:
    // DNS failure, TLS failure, connection refused, offline, or a CORS
    // preflight the browser blocked. A 500 from the server does NOT land here.
    //
    // Since the API moved to its own subdomain these calls are cross-origin,
    // so a blocked preflight is now a live possibility and lands right here —
    // note that the browser hides the reason from JS, and only the Network
    // tab (or the backend's [cors] log lines) will name it.
    logErr(`${label} network-level failure (no HTTP response):`, networkError, {
      url,
      hint:
        "Cross-origin request failed before any response. Check, in order: " +
        "DNS for the API host resolves; its TLS cert is valid (open the URL " +
        "directly in a tab); the backend is up; and this page's origin is in " +
        "the backend's CORS allowlist.",
    });
    throw new EmailApiError(
      "Could not reach the server (network or CORS failure)",
      { status: 0, reason: "network_error", body: String(networkError) },
    );
  }

  const durationMs = Date.now() - startedAt;
  const { parsed, raw } = await readBody(response);
  const requestId =
    response.headers.get("X-Request-Id") ?? parsed?.requestId ?? undefined;

  log(`${label} response`, {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    durationMs,
    requestId,
    contentType: response.headers.get("content-type"),
    body: parsed ?? raw.slice(0, 500),
  });

  if (!response.ok) {
    const reason = parsed?.reason;
    const serverMessage = parsed?.error ?? raw.slice(0, 300);

    logErr(`${label} FAILED`, {
      status: response.status,
      reason: reason ?? "(none returned)",
      serverMessage,
      requestId: requestId ?? "(none)",
      // Plain-language read of the status, so the console says what to check
      // rather than leaving it to be inferred from the number.
      hint:
        response.status === 503
          ? "Backend is up but RESEND_API is missing in the container — check the .env next to docker-compose.yml and redeploy."
          : response.status === 502
            ? "Either Resend rejected the send (see resendError) or the backend container is down and Caddy answered instead. Check /api/health."
            : response.status === 400
              ? "The server considered the submitted fields empty or malformed."
              : response.status === 404
                ? "Route not found — the /api/* proxy rule or the deployed backend build may be stale."
                : "Unexpected status; see the logged body and the backend logs for this requestId.",
      fullBody: parsed ?? raw,
    });

    throw new EmailApiError(serverMessage || `Request failed (${response.status})`, {
      status: response.status,
      reason,
      requestId,
      body: parsed ?? raw,
    });
  }

  log(`${label} succeeded in ${durationMs}ms`, parsed);
  return parsed;
};

export async function submitGuestQuestion(email: string, message: string) {
  return request("submitGuestQuestion", apiUrl("/api/email/submission"), {
    email,
    message,
  });
}

export async function emailRSVPResponse(payload: {
  name: string;
  guests: number;
  attending: boolean;
}) {
  return request("emailRSVPResponse", apiUrl("/api/email/rsvp"), {
    name: payload.name,
    attending: payload.attending,
    guests: payload.guests,
  });
}

// Callable from the browser console as `window.checkBackendHealth()` to tell
// "the backend is down" apart from "the backend is up but email is broken"
// without shell access to the production host.
export async function checkBackendHealth() {
  try {
    const response = await fetch(apiUrl("/api/health"));
    const { parsed, raw } = await readBody(response);
    log("health check", { status: response.status, body: parsed ?? raw });
    return parsed ?? raw;
  } catch (error) {
    logErr("health check failed — backend unreachable:", error);
    return null;
  }
}

if (typeof window !== "undefined") {
  (window as any).checkBackendHealth = checkBackendHealth;
}
