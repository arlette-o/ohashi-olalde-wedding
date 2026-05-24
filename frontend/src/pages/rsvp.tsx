import { Box, Grid, Typography } from "@mui/material";
import RsvpForm from "../components/rsvpform";

export default function RSVP() {
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
        <RsvpForm />
      </Grid>
    </Grid>
  );
}
