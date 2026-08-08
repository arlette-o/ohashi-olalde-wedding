import "dotenv/config";

import { Resend } from "resend";
import type { Request, Response } from "express";
import { guestSubmissionEmail } from "../templates/guestSubmissionTemplate.js";
import { newRSVPEmail } from "../templates/newRSVPTemplate.js";

const RESEND_API = process.env.RESEND_API || "";

export const sendGuestSubmission = async (req: Request, res: Response) => {
  const { email, message } = req.body;
  //console.log("RESEND_API in emailController:", JSON.stringify(RESEND_API));
  const resend = new Resend(RESEND_API);

  try {
    const { data, error } = await resend.emails.send(
      guestSubmissionEmail(email, message),
    );
    if (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log(err.message);
  }
};

export const sendRSVPEmail = async (req: Request, res: Response) => {
  const { name, attending, guests } = req.body;
  try {
    const resend = new Resend(RESEND_API);

    const { data, error } = await resend.emails.send(
      newRSVPEmail({ name, attending, guests }),
    );
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log(err.message);
  }
};
