import express from "express";
import type { Request, Response } from "express";
import Guest from "../schemas/guest.js";

export const getAllGuests = async (_req: Request, res: Response) => {
  const all = await Guest.find();
  res.status(200).json(all);
};
