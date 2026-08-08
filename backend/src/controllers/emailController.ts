import "dotenv/config";

import { Resend } from "resend";
import type { Request, Response } from "express";
import { guestSubmissionEmail } from "../templates/guestSubmissionTemplate.js";
import { newRSVPEmail } from "../templates/newRSVPTemplate.js";

const RESEND_API = process.env.RESEND_API || "";

if (!RESEND_API) {
  console.error(
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
  if (!client) client = new Resend(RESEND_API);
  return client;
};

const NO_KEY = { error: "Email is not configured on this server (RESEND_API)" };

export const sendGuestSubmission = async (req: Request, res: Response) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "email and message are required" });
  }

  const resend = getResend();
  if (!resend) return res.status(503).json(NO_KEY);

  try {
    const { data, error } = await resend.emails.send(
      guestSubmissionEmail(email, message),
    );
    // Resend reports failures in the body rather than throwing, so this branch
    // has to return — without it the success response fired too and Express
    // blew up with ERR_HTTP_HEADERS_SENT on every rejected send.
    if (error) {
      console.error("Resend rejected guest submission:", error);
      return res.status(502).json({ error: error.message ?? error });
    }
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Guest submission send threw:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const sendRSVPEmail = async (req: Request, res: Response) => {
  const { name, attending, guests } = req.body;

  const resend = getResend();
  if (!resend) return res.status(503).json(NO_KEY);

  try {
    const { data, error } = await resend.emails.send(
      newRSVPEmail({ name, attending, guests }),
    );
    if (error) {
      console.error("Resend rejected RSVP email:", error);
      return res.status(502).json({ error: error.message ?? error });
    }
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("RSVP email send threw:", err);
    return res.status(500).json({ error: err.message });
  }
};
