import "dotenv/config";

import { Resend } from "resend";
import type { Request, Response } from "express";
import { guestSubmissionEmail } from "../templates/guestSubmissionTemplate.js";
import { newRSVPEmail } from "../templates/newRSVPTemplate.js";

const RESEND_API = process.env.RESEND_API || "";

// Built once. Constructing a client per request was pointless work, and it hid
// the fact that a missing key only ever surfaces as a 4xx from Resend.
const resend = new Resend(RESEND_API);

if (!RESEND_API) {
  console.error(
    "RESEND_API is not set — every outgoing email will fail. Check the .env " +
      "next to docker-compose.yml (compose reads it from there, not backend/.env).",
  );
}

export const sendGuestSubmission = async (req: Request, res: Response) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "email and message are required" });
  }

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
