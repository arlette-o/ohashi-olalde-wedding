import { Box, Typography } from "@mui/material";

export default function TravelAndStay() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          color: "#fff",
        }}
      >
        Travel &amp; Stay
      </Typography>
    </Box>
  );
}
