import { Box, Typography } from "@mui/material";
import { CountdownTimer } from "../components/countdown";
import { useLanguage } from "../context/languageContext";

export default function Weddingpage() {
  const { lang } = useLanguage();
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#0e0d0b",
        backgroundImage: `url('/Kinosaki.JPG')`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <Box
        className="hero-bg"
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('/WeddingFrame.png')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          pt: "72px",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.30) 100%)",
          },
        }}
      />

      {/* Hero copy */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          zIndex: 1,
        }}
      >
        <Typography
          className="date-fade"
          variant="body2"
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: { xs: "0.8rem", md: "1.7rem" },
            letterSpacing: "0.35em",
            color: "#ffffff",
            textTransform: "uppercase",
            mb: 1.5,
          }}
        >
          08 . 21 . 2027
        </Typography>

        <Typography
          className="title-fade"
          component="h1"
          sx={{
            fontFamily: "'Cormorant SC', serif",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 8vw, 5.5rem)",
            lineHeight: 1.05,
            letterSpacing: { xs: "0.06em", md: "0.1em" },
            color: "#ffffff",
            textShadow: "0 2px 40px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          {lang("Home.names")}
        </Typography>

        <CountdownTimer />
      </Box>
    </Box>
  );
}
