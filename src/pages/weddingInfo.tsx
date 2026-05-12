import { Box, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import CocktailIcon from "../components/svg/cocktail";
import CelebrateIcon from "../components/svg/celebrate";
import DinnerPlate from "../components/svg/dinnerPlate";
import DiscoballIcon from "../components/svg/discoBall";
import ClockIcon from "../components/svg/clock";

const CREAM = "#f5f0e8";
const GOLD = "#c9bb8e";

const events = [
  { label: "Cocktail Hour", icon: <CocktailIcon />, time: "5:00 PM" },
  {
    label: "Entrance of the Married Couple",
    icon: <CelebrateIcon />,
    time: "6:00 PM",
  },
  {
    label: "Dinner",
    icon: <DinnerPlate />,
    time: "6:30 PM",
  },
  { label: "Party!", icon: <DiscoballIcon />, time: "8:00 PM" },
  { label: "End of the night", icon: <ClockIcon />, time: "11:00 PM" },
];

export default function WeddingInfo() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: { xs: "2.4rem", md: "3.5rem" },
          color: CREAM,
          letterSpacing: "0.08em",
          mb: 6,
        }}
      >
        The Wedding Day Schedule
      </Typography>

      <Timeline sx={{ maxWidth: 700, width: "100%" }}>
        {events.map((event, i) => (
          <TimelineItem key={event.label}>
            {/* Alternates: even = icon left, odd = icon right */}
            <TimelineOppositeContent
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                mr: 10,
              }}
            >
              <Box
                sx={{
                  "& svg": {
                    fontSize: 40,
                    color: GOLD,
                    stroke: GOLD,
                  },
                }}
              >
                {event.icon}
              </Box>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: "transparent",
                  border: `2px solid ${GOLD}`,
                  boxShadow: "none",
                  width: 20,
                  height: 20,
                }}
              />
              {i < events.length - 1 && (
                <TimelineConnector
                  sx={{
                    bgcolor: GOLD,
                    opacity: 0.4,
                    width: "1px",
                    minHeight: "140px",
                  }}
                />
              )}
            </TimelineSeparator>

            <TimelineContent
              sx={{
                display: "flex",
                flexDirection: "column",
                pb: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Cormorant SC', serif",
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1.3rem" },
                  color: CREAM,
                  letterSpacing: "0.06em",
                }}
              >
                {event.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "0.85rem",
                  color: GOLD,
                  mt: 0.5,
                }}
              >
                {event.time}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
