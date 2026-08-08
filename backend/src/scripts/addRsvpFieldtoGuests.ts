import Guest from "../schemas/guest.js";

export const addRSVPField = async () => {
  const result = await Guest.updateMany(
    { prev_rsvp: { $exists: false } },
    { $set: { prev_rsvp: false } },
  );

  console.log(`Updated ${result.modifiedCount} guests with prev_rsvp field`);
  //await mongoose.disconnect();
};
