import express from "express";
import { getAllGuests } from "../controllers/guestController.js";

export const guestRouter = express.Router();

guestRouter.get("/all", getAllGuests);
