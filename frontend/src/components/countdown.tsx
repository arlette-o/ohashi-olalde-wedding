import { Box, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/languageContext";

const WEDDING_DATE = new Date("2027-08-29T15:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(target: Date): TimeLeft {
  const calc = (): TimeLeft => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calc);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <Box sx={{ textAlign: "center", minWidth: { xs: 52, md: 72 } }}>
    <Typography
      sx={{
        fontFamily: "'Cormorant SC', serif",
        fontWeight: 300,
        fontSize: { xs: "2rem", md: "2.8rem" },
        lineHeight: 1,
        color: "#fff",
        letterSpacing: "0.04em",
      }}
    >
      {String(value).padStart(2, "0")}
    </Typography>
    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: { xs: "0.6rem", md: "0.7rem" },
        letterSpacing: "0.25em",
        color: "rgba(255,255,255,0.5)",
        textTransform: "uppercase",
        mt: 0.5,
      }}
    >
      {label}
    </Typography>
  </Box>
);

const Dot = () => (
  <Typography
    sx={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 300,
      fontSize: { xs: "1.4rem", md: "2rem" },
      color: "rgba(255,255,255,0.3)",
      lineHeight: 1,
      mb: "1.1rem",
      userSelect: "none",
    }}
  >
    ·
  </Typography>
);

export const CountdownTimer = () => {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const { lang } = useLanguage();
  return (
    <Stack
      className="countdown-fade"
      direction="row"
      spacing={{ xs: 1.5, md: 2.5 }}
      sx={{ mt: 4 }}
    >
      <CountdownUnit value={days} label={lang("Home.time.days")} />
      <Dot />
      <CountdownUnit value={hours} label={lang("Home.time.hours")} />
      <Dot />
      <CountdownUnit value={minutes} label={lang("Home.time.mins")} />
      <Dot />
      <CountdownUnit value={seconds} label={lang("Home.time.sec")} />
    </Stack>
  );
};
