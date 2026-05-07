import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Stack,
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { CountdownTimer } from "../components/countdown";

// ─── Custom Theme ─────────────────────────────────────────────────────────────
const weddingTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e8ddd0" },
    background: { default: "#1a1610" },
  },
  typography: {
    fontFamily: "'Cormorant Garamond', serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "0.85rem",
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.88)",
          "&:hover": { color: "#fff", background: "transparent" },
        },
      },
    },
  },
});

// ─── Google Fonts injection ────────────────────────────────────────────────────
const globalStyles = (
  <GlobalStyles
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cormorant+SC:wght@300;400;600&display=swap');

            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { width: 100%; max-width: 100%; overflow-x: hidden; }


      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(1.06); }
        to   { opacity: 1; transform: scale(1); }
      }

      .hero-bg {
        animation: scaleIn 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      .nav-fade {
        animation: fadeIn 1.2s ease 0.4s both;
      }
      .date-fade {
        animation: fadeUp 1s ease 0.7s both;
      }
      .title-fade {
        animation: fadeUp 1s ease 1s both;
      }
      .location-fade {
        animation: fadeUp 1s ease 1.3s both;
      }
    `}
  />
);

// ─── Monogram SVG ──────────────────────────────────────────────────────────────
const Monogram = () => (
  <svg
    width="46"
    height="46"
    viewBox="0 0 46 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="3"
      y="36"
      fontFamily="'Cormorant Garamond', serif"
      fontSize="38"
      fontWeight="300"
      fill="white"
      letterSpacing="-4"
    >
      AT
    </text>
  </svg>
);

// ─── Nav Items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["Our Story", "Travel & Stay", "Registry", "FAQs"];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function WeddingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ThemeProvider theme={weddingTheme}>
      <CssBaseline />
      {globalStyles}

      {/* ── Full‑viewport Hero ── */}
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          bgcolor: "#0e0d0b",
        }}
      >
        {/* Background image via CSS so we can animate it cleanly */}
        <Box
          className="hero-bg"
          sx={{
            position: "absolute",
            inset: 0,

            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            transformOrigin: "center center",
            // subtle dark vignette
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.30) 100%)",
            },
          }}
        />

        {/* ── Navbar ── */}
        <AppBar
          className="nav-fade"
          position="absolute"
          elevation={0}
          sx={{
            background: scrolled ? "rgba(10,9,8,0.55)" : "transparent",
            backdropFilter: scrolled ? "blur(10px)" : "none",
            transition: "background 0.4s ease, backdrop-filter 0.4s ease",
            px: { xs: 2, md: 4 },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 72 },
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Box sx={{ opacity: 0.92 }}>
              <Monogram />
            </Box>

            {/* Nav links */}
            <Stack
              direction="row"
              spacing={{ xs: 2, md: 4 }}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {NAV_ITEMS.map((item) => (
                <Button key={item} disableRipple>
                  {item}
                </Button>
              ))}
            </Stack>

            {/* Language icon */}
            <IconButton
              sx={{
                border: "1px solid rgba(255,255,255,0.45)",
                borderRadius: "50%",
                width: 38,
                height: 38,
                color: "rgba(255,255,255,0.85)",
                "&:hover": { borderColor: "#fff" },
              }}
            >
              <LanguageIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* ── Hero Copy ── */}
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
          {/* Date */}
          <Typography
            className="date-fade"
            variant="body2"
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.75)",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            06 . 26 . 2027
          </Typography>

          {/* Names */}
          <Typography
            className="title-fade"
            component="h1"
            sx={{
              fontFamily: "'Cormorant SC', serif",
              fontWeight: 400,
              fontSize: { xs: "clamp(2.2rem, 8vw, 5.5rem)" },
              lineHeight: 1.05,
              letterSpacing: { xs: "0.06em", md: "0.1em" },
              color: "#ffffff",
              textShadow: "0 2px 40px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            Arlette &amp; Taka
          </Typography>

          <CountdownTimer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
