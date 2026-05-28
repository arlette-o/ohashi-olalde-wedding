import { Grid, Typography } from "@mui/material";
import RsvpForm from "../components/rsvpform";
import InviteCodeForm from "../components/inviteCode";
import { useEffect, useState } from "react";
import type { Guest } from "../api/guestAPI";

export default function RSVP() {
  const [guest, setGuest] = useState<Guest | null>(() => {
    const sessionGuest = sessionStorage.getItem("guest");
    return sessionGuest ? (JSON.parse(sessionGuest) as Guest) : null;
  });
  //TODO: Get guest from session storageß
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem("unlocked") === "true",
  );

  useEffect(() => {
    if (guest !== null) {
      setUnlocked(true);
      sessionStorage.setItem("unlocked", "true");
    }
  }, [guest]);

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
        {!unlocked ? (
          <InviteCodeForm setGuest={setGuest} />
        ) : (
          <RsvpForm guest={guest} />
        )}
      </Grid>
    </Grid>
  );
}
