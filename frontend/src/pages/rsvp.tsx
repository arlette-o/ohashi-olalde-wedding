import { Grid, Typography } from "@mui/material";
import RsvpForm from "../components/rsvpform";
import InviteCodeForm from "../components/inviteCode";
import { useState } from "react";
import type { Guest } from "../api/guestAPI";

export default function RSVP() {
  // 1. Initialize guest from session storage
  const [guest, setGuest] = useState<Guest | null>(() => {
    const sessionGuest = sessionStorage.getItem("guest");
    return sessionGuest ? (JSON.parse(sessionGuest) as Guest) : null;
  });

  // 2. Derive "unlocked" state directly! No useEffect needed.
  // The form is unlocked if the session says so OR if we have a valid guest in state.
  const isUnlocked = sessionStorage.getItem("unlocked") === "true" || guest !== null;

  // 3. Helper function to handle successful invite codes
  const handleInviteSuccess = (authenticatedGuest: Guest) => {
    sessionStorage.setItem("unlocked", "true");
    sessionStorage.setItem("guest", JSON.stringify(authenticatedGuest));
    setGuest(authenticatedGuest);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid size={4}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "#fff",
          }}
        >
          RSVP
        </Typography>
      </Grid>
      <Grid size={8}>
        {!isUnlocked || !guest ? (
          <InviteCodeForm setGuest={handleInviteSuccess} />
        ) : (
          <RsvpForm guest={guest} />
        )}
      </Grid>
    </Grid>
  );
}