export type Guest = {
  fname: string;
  lname: string;
  plus: string[];
  allowed_invitees: number;
  email: string;
  attending: boolean;
  guests_accepted: number;
  whatsapp: string;
  line: string;
};

export async function getAllGuests(): Promise<Guest[]> {
  const response = await fetch("/api/guests/all");
  if (!response.ok) {
    throw new Error("Failed to load assets");
  }
  return response.json();
}
