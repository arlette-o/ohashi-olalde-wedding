import Guest from "../schemas/guest.js";

const generateCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

export const addCodes = async () => {
  const guests = await Guest.find();

  for (const guest of guests) {
    guest.set("invite_code", generateCode());
    await guest.save();
  }

  console.log(`Updated ${guests.length} guests with codes`);
  //await mongoose.disconnect();
};
