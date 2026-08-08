import mongoose, { Schema, Document } from "mongoose";

interface IGuest extends Document {
  fname: string;
  lname: string;
  plus: string[];
  allowed_invitees: number;
  email: string;
  attending: boolean;
  guests_accepted: number;
  whatsapp: string;
  line: string;
  invite_code: string;
  prev_rsvp: boolean;
}

const GuestSchema = new Schema<IGuest>(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    plus: { type: [String], default: [] },
    allowed_invitees: { type: Number, required: true },
    attending: { type: Boolean, required: true, default: false },
    guests_accepted: { type: Number, required: true, default: 0 },
    email: { type: String, sparse: true, unique: true },
    whatsapp: { type: String },
    line: { type: String },
    invite_code: { type: String, unique: true },
    prev_rsvp: { type: Boolean },
  },
  { timestamps: true },
);

const Guest = mongoose.model<IGuest>("Guest", GuestSchema);
export default Guest;
