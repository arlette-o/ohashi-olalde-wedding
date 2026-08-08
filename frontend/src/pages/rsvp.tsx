import { Box, Grid, Typography } from "@mui/material";
import RsvpForm from "../components/rsvpform";
import InviteCodeForm from "../components/inviteCode";
import { useEffect, useState } from "react";
import type { Guest } from "../api/guestAPI";
import ChangeRsvpForm from "../components/changeRsvpForm";
import { useLanguage } from "../context/languageContext";
import { BORDER, CREAM, GOLD, PAGE_BG } from "../theme/colors";

export default function RSVP() {
  const { lang } = useLanguage();
  // 1. Initialize guest from session storage
  const [guest, setGuest] = useState<Guest | null>(() => {
    const sessionGuest = sessionStorage.getItem("guest");
    return sessionGuest ? (JSON.parse(sessionGuest) as Guest) : null;
  });

  // Guests who already RSVP'd get the edit form instead of a fresh one.
  const [prevRsvp, setPrevRsvp] = useState(false);

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

  useEffect(() => {
    if (guest) {
      setPrevRsvp(guest.prev_rsvp);
    }
  }, [guest]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: "100vh",
        alignContent: "flex-start",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PAGE_BG,
        px: { xs: 2, sm: 4 },
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 10 },
        width: "100%",
        mx: 0,
      }}
    >
      <Grid size={12} sx={{ textAlign: "center", pb: 2 }}>
        <Typography
          sx={{
            fontFamily: "'Cormorant SC', serif",
            fontWeight: 400,
            fontSize: { xs: "2.5rem", md: "4rem" },
            letterSpacing: "0.2em",
            color: CREAM,
          }}
        >
          {lang("RSVP.title")}
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
          <Box
            sx={{ height: "1px", width: { xs: 64, md: 120 }, bgcolor: BORDER }}
          />
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: `1px solid ${BORDER}`,
            }}
          />
          <Box
            sx={{ height: "1px", width: { xs: 64, md: 120 }, bgcolor: BORDER }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.2rem",
            // It previously inherited near-black, which sank into the olive.
            color: GOLD,
            mt: 1,
          }}
        >
          {lang("RSVP.deadline")}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 10, lg: 8 }}>
        {!isUnlocked || !guest ? (
          <InviteCodeForm setGuest={handleInviteSuccess} />
        ) : prevRsvp ? (
          <ChangeRsvpForm guest={guest} />
        ) : (
          <RsvpForm guest={guest} />
        )}
      </Grid>
    </Grid>
  );
}
