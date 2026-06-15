import { useLanguage } from "../context/languageContext";
import { Box, Grid, Typography } from "@mui/material";
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
import RingsIcon from "../components/svg/rings";

import PlaceIcon from "@mui/icons-material/Place";

const OLIVE = "#4f5233";
const BORDER = "#c8c9b8";

const CREAM = "#f5f0e8";
const GOLD = "#c9bb8e";

export default function WeddingInfo() {
  const { lang } = useLanguage();
  const events = [
    {
      label: lang("WeddingInfo.events.ceremony"),
      icon: <RingsIcon />,
      time: "4:00 PM",
    },
    {
      label: lang("WeddingInfo.events.cocktailHour"),
      icon: <CocktailIcon />,
      time: "5:00 PM",
    },
    {
      label: lang("WeddingInfo.events.entrance"),
      icon: <CelebrateIcon />,
      time: "6:00 PM",
    },
    {
      label: lang("WeddingInfo.events.dinner"),
      icon: <DinnerPlate />,
      time: "6:30 PM",
    },
    {
      label: lang("WeddingInfo.events.party"),
      icon: <DiscoballIcon />,
      time: "8:00 PM",
    },
    {
      label: lang("WeddingInfo.events.end"),
      icon: <ClockIcon />,
      time: "11:00 PM",
    },
  ];
  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: "100vh",
        display: "flex",
        //alignItems: "center",
        //justifyContent: "center",
      }}
    >
      <Grid size={12}>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: { xs: "2.4rem", md: "3.5rem" },
            color: CREAM,
            letterSpacing: "0.08em",
            mb: 6,
            mt: 8,
          }}
        >
          The Wedding Day Schedule
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
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
      </Grid>
      <Grid
        size={{ xs: 12, md: 7 }}
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 7,
        }}
      >
        <Box
          component="img"
          src="/HaciendaSanMon.jpg"
          alt="Hacienda Santa Monica"
          sx={{
            width: { xs: "100%", md: "75%" },
            height: "auto",
            maxHeight: "50vh",
            objectFit: "cover",
            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            borderRadius: "16px",
          }}
        />
        <Box
          sx={{
            border: `1px solid ${BORDER}`,
            borderRadius: "16px",
            p: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "#fff",
            minWidth: { xs: 0, sm: 360 },
          }}
        >
          <Box
            sx={{
              bgcolor: "#f2f1ee",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <PlaceIcon sx={{ color: OLIVE, fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 700, color: OLIVE, fontSize: "1rem", mb: 0.5 }}
            >
              Venue
            </Typography>
            <Typography sx={{ color: OLIVE, fontSize: "0.95rem" }}>
              Hacienda Santa Monica
            </Typography>
            <Typography sx={{ color: OLIVE, fontSize: "0.95rem" }}>
              Mesa de Otay, Vía Rápida Ote., Guadalupe Victoria, 22426
            </Typography>
            <Typography sx={{ color: OLIVE, fontSize: "0.95rem" }}>
              Tijuana, B.C., Mexico
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            border: `1px solid ${BORDER}`,
            borderRadius: "16px",
            p: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "#fff",
            minWidth: { xs: 0, sm: 360 },
          }}
        >
          <Box
            sx={{
              bgcolor: "#f2f1ee",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <PlaceIcon sx={{ color: OLIVE, fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 700, color: OLIVE, fontSize: "1rem", mb: 0.5 }}
            >
              Ceremony & Party
            </Typography>
            <Typography sx={{ color: OLIVE, fontSize: "0.95rem" }}>
              Saturday, August 21st,2027
            </Typography>
            <Typography sx={{ color: OLIVE, fontSize: "0.95rem" }}>
              4:00pm - 11pm
            </Typography>
            <Typography sx={{ color: OLIVE, fontSize: "0.95rem" }}>
              Tijuana, B.C., Mexico
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
