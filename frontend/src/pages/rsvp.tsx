import { Box, Grid, Typography } from "@mui/material";
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
  const isUnlocked =
    sessionStorage.getItem("unlocked") === "true" || guest !== null;

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
        //minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6a6b4a",
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
      {isUnlocked && (
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
      )}
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
