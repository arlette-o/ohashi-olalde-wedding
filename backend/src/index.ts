import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { guestRouter } from "./routes/guestRouter.js";

dotenv.config();
const MONGOURL = process.env.MONGO_URL || "";

const connectMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
connectMongo();

app.use("/api/guests", guestRouter);

app.get("/", (req, res) => {
  res.send("Backend is running");

  console.log("Connected to DB:", mongoose.connection.db?.databaseName);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
