import { Box, Grid, Typography } from "@mui/material";
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
      <Grid size={12} sx={{ textAlign: "center", pb: 2, mt: 8 }}>
        <Typography
          sx={{
            fontFamily: "'Cormorant SC', serif",
            fontWeight: 400,
            fontSize: { xs: "3rem", md: "4rem" },
            letterSpacing: "0.2em",
          }}
        >
          RSVP
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            my: 1,
          }}
        >
          <Box sx={{ height: "1px", width: 120, bgcolor: "#c8c9b8" }} />
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "1px solid #c8c9b8",
            }}
          />
          <Box sx={{ height: "1px", width: 120, bgcolor: "#c8c9b8" }} />
        </Box>

        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.2rem",
            mt: 1,
          }}
        >
          Please RSVP by June 26, 2027
        </Typography>
      </Grid>
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
