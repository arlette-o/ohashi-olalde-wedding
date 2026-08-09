import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { guestRouter } from "./routes/guestRouter.js";
import { emailRouter } from "./routes/emailRouter.js";
import { addRSVPField } from "./scripts/addRsvpFieldtoGuests.js";

dotenv.config();
const MONGOURL = process.env.MONGO_URL || "";

const connectMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("MongoDB connected");
  } catch (error) {
    // Deliberately not fatal. This used to process.exit(1), which meant an
    // Atlas IP-allowlist change took down the *entire* API — including the
    // question form, which never touches Mongo — and `restart: always` turned
    // that into a crash loop that read as a bare 502 from Caddy. Mongoose
    // retries in the background, so guest routes recover on their own once the
    // database is reachable again; until then they 500 and everything else
    // keeps serving.
    console.error("MongoDB connection error (continuing to serve):", error);
  }
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
connectMongo();

// Top-level await: an unhandled rejection here fails module evaluation and
// kills the process, so a one-off backfill must never be able to take the
// server down. It buffers and times out whenever Mongo is unreachable.
try {
  await addRSVPField();
} catch (error) {
  console.error("addRSVPField backfill skipped:", error);
}

app.use("/api/guests", guestRouter);
app.use("/api/email", emailRouter);

app.get("/", (req, res) => {
  res.send("Backend is running");

  console.log("Connected to DB:", mongoose.connection.db?.databaseName);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
