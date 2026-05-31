import express from "express";
import {
  getAllGuests,
  getGuestInfoByCode,
  updateGuestRSVPInfo,
} from "../controllers/guestController.js";

export const guestRouter = express.Router();

guestRouter.get("/all", getAllGuests);
guestRouter.get("/:code", getGuestInfoByCode);
guestRouter.put("/rsvp/:id", updateGuestRSVPInfo);
