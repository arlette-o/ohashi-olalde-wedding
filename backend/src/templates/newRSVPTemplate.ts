interface RSVP {
  name: string;
  attending: boolean;
  guests: number;
}

export const newRSVPEmail = (info: RSVP) => {
  return {
    from: "onboarding@resend.dev",
    to: "arlettetakawedding@gmail.com",
    subject: `New RSVP from ${info.name}`,
    html: `<p> ${info.name} has RSVP'd as <strong>${info.attending ? "attending" : "declined"}</strong> for <strong>${info.guests}</strong> people!</p>`,
  };
};
