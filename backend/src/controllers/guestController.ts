import express from "express";
import type { Request, Response } from "express";
import Guest from "../schemas/guest.js";

export const getAllGuests = async (_req: Request, res: Response) => {
  try {
    const all = await Guest.find();
    res.status(200).json(all);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

export const getGuestInfoByCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    if (typeof code !== "string") {
      return res.status(400).json({ message: "Invite code is required" });
    }
    const guestInfo = await Guest.findOne({ invite_code: code });

    res.status(200).json(guestInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

export const updateGuestRSVPInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { attending, guests } = req.body;

  try {
    if (!id) throw new Error("Guest ID is required");
    const update = await Guest.updateOne(
      { _id: id },
      { $set: { attending, guests_accepted: guests } },
    );
    res.status(200).json(update);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};
