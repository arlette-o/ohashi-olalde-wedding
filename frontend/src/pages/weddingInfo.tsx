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
        backgroundColor: "#6a6b4a",
        px: { xs: 2, sm: 3, md: 6 },
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 10 },
        mx: 0,
        width: "100%",
      }}
    >
      <Grid size={12}>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: { xs: "2.2rem", md: "3.5rem" },
            color: CREAM,
            letterSpacing: "0.08em",
            textAlign: "center",
            mb: { xs: 3, md: 6 },
          }}
        >
          The Wedding Day
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Box
          sx={{
            border: `8px solid ${BORDER}`,
            borderRadius: "24px",
            display: "flex",
            justifyContent: "center",
            px: { xs: 0, sm: 1 },
          }}
        >
          <Timeline
            sx={{
              maxWidth: 700,
              width: "100%",
              mx: "auto",
              px: { xs: 0, sm: 2 },
            }}
          >
            {events.map((event, i) => (
              <TimelineItem key={event.label}>
                {/* Alternates: even = icon left, odd = icon right */}
                <TimelineOppositeContent
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    // Keep the icon gutter narrow on phones so the event
                    // labels aren't squeezed into a two-word column.
                    flex: { xs: "0 0 auto", md: 1 },
                    px: { xs: 1, md: 2 },
                    mr: { xs: 0, md: 6, lg: 10 },
                  }}
                >
                  <Box
                    sx={{
                      "& svg": {
                        fontSize: { xs: 28, md: 40 },
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
                        minHeight: { xs: "70px", md: "140px" },
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
      </Grid>
      <Grid
        size={{ xs: 12, md: 7 }}
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: { xs: 4, md: 7 },
          mt: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            border: `8px solid ${BORDER}`,
            borderRadius: "24px",
            width: "100%",
            overflow: "hidden",
            // Cream surface so the olive body text has something to read
            // against — it was olive-on-olive before.
            bgcolor: CREAM,
          }}
        >
          <Box
            component="img"
            src="/HaciendaSanMon.jpg"
            alt="Hacienda Santa Monica"
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              objectFit: "cover",
              display: "block",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            }}
          />
          <Box
            sx={{
              p: { xs: 2.5, md: 4 },
              display: "flex",
              alignItems: "center",
              textAlign: "left",
              gap: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "rgba(79,82,51,0.12)",
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
                sx={{
                  fontWeight: 700,
                  color: OLIVE,
                  fontSize: "1rem",
                  mb: 0.5,
                }}
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
              p: { xs: 2.5, md: 4 },
              display: "flex",
              alignItems: "center",
              textAlign: "left",
              gap: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "rgba(79,82,51,0.12)",
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
                sx={{
                  fontWeight: 700,
                  color: OLIVE,
                  fontSize: "1rem",
                  mb: 0.5,
                }}
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
        </Box>
      </Grid>
    </Grid>
  );
}
