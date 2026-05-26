import { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Stack,
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import LanguageMenu from "../components/languageMenu";
import { useLanguage } from "../context/languageContext";
import MonogramIcon from "../components/svg/monogram";

const weddingTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e8ddd0" },
    background: { default: "#1a1610" },
  },
  typography: { fontFamily: "'Cormorant Garamond', serif" },
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

      .hero-bg       { animation: scaleIn 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      .nav-fade      { animation: fadeIn  1.2s ease 0.4s  both; }
      .date-fade     { animation: fadeUp  1s   ease 0.7s  both; }
      .title-fade    { animation: fadeUp  1s   ease 1s    both; }
      .location-fade { animation: fadeUp  1s   ease 1.3s  both; }
      .countdown-fade{ animation: fadeUp  1s   ease 1.6s  both; }
    `}
  />
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_ITEMS = [
    { label: lang("Home.navItems.home"), path: "/" },
    { label: lang("Home.navItems.ourStory"), path: "ourstory" },
    { label: lang("Home.navItems.weddingInfo"), path: "weddinginfo" },
    { label: lang("Home.navItems.travelStay"), path: "travelstay" },
    { label: lang("Home.navItems.rsvp"), path: "rsvp" },
    { label: lang("Home.navItems.faqs"), path: "faqs" },
  ];

  return (
    <ThemeProvider theme={weddingTheme}>
      <CssBaseline />
      {globalStyles}

      <AppBar
        className="nav-fade"
        position="fixed"
        elevation={0}
        sx={{
          left: 0,
          right: 0,
          width: "100%",
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
          <Box
            sx={{ opacity: 0.92, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <MonogramIcon />
          </Box>

          <Stack
            direction="row"
            spacing={{ xs: 2, md: 4 }}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.label}
                disableRipple
                onClick={() => navigate(item.path)}
                sx={{ color: " #494b25" }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <LanguageMenu />
        </Toolbar>
      </AppBar>

      {/* Page content renders here */}
      <Box component="main">
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
