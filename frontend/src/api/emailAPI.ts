export async function submitGuestQuestion(email: string, message: string) {
  const response = await fetch("/api/email/submission", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      message,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to send mail");
  }
  return response.json();
}

export async function emailRSVPResponse(payload: {
  name: string;
  guests: number;
  attending: boolean;
}) {
  const response = await fetch("/api/email/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      attending: payload.attending,
      guests: payload.guests,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to send RSVP email");
  }
  return response.json();
}
