import express from "express";
import {
  sendGuestSubmission,
  sendRSVPEmail,
} from "../controllers/emailController.js";

export const emailRouter = express.Router();

emailRouter.post("/submission", sendGuestSubmission);
emailRouter.post("/rsvp", sendRSVPEmail);
