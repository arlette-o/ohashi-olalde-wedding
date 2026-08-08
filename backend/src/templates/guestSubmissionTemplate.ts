export const guestSubmissionEmail = (email: string, message: string) => {
  return {
    from: "ask@arlettetakawedding.com",
    to: "arlettetakawedding@gmail.com",
    subject: "New Question Submitted",
    html: `<p> From ${email} message is: ${message} <strong>first email</strong>!</p>`,
  };
};
