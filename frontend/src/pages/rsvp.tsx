import { Grid, Typography } from "@mui/material";
import RsvpForm from "../components/rsvpform";
import InviteCodeForm from "../components/inviteCode";
import { useState } from "react";

export default function RSVP() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem("unlocked") === "true",
  );

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
        {!unlocked ? <InviteCodeForm setAuth={setUnlocked} /> : <RsvpForm />}
      </Grid>
    </Grid>
  );
}
