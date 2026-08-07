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
import PageHeading from "../components/pageHeading";
import { BORDER, CREAM, GOLD, OLIVE, PAGE_BG } from "../theme/colors";

import PlaceIcon from "@mui/icons-material/Place";
import EventIcon from "@mui/icons-material/Event";

/** Icon-led row inside the venue card, matching the NoteCard look. */
const InfoRow = ({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) => (
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
      {icon}
    </Box>
    <Box>
      <Typography sx={{ fontWeight: 700, color: OLIVE, fontSize: "1rem", mb: 0.5 }}>
        {title}
      </Typography>
      {lines.map((line) => (
        <Typography key={line} sx={{ color: OLIVE, fontSize: "0.95rem" }}>
          {line}
        </Typography>
      ))}
    </Box>
  </Box>
);

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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: PAGE_BG,
        px: { xs: 2, sm: 3, md: 6 },
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 10 },
      }}
    >
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        <PageHeading
          title={lang("WeddingInfo.title")}
          subtitle={lang("WeddingInfo.subtitle")}
        />
        <Grid container spacing={{ xs: 4, md: 5 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                border: `8px solid ${BORDER}`,
                borderRadius: "24px",
                display: "flex",
                justifyContent: "center",
                px: { xs: 0, sm: 1 },
                height: "100%",
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
                    <TimelineOppositeContent
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                        // A fixed icon gutter at every width — inside the
                        // 1120px shell a flexible one eats half the column and
                        // wraps the longer event labels to four lines.
                        flex: "0 0 auto",
                        px: { xs: 1, md: 2 },
                        mr: { xs: 0, md: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          // The icon art now scales with fontSize (the svg
                          // components used to overflow their box 2.25x, which
                          // is why these numbers grew when that was fixed).
                          "& svg": {
                            fontSize: { xs: 44, md: 64 },
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
                            // Long enough to breathe, short enough that the
                            // column roughly matches the venue card beside it.
                            minHeight: { xs: "70px", md: "90px" },
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
          <Grid size={{ xs: 12, md: 7 }}>
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
                }}
              />
              <InfoRow
                icon={<PlaceIcon sx={{ color: OLIVE, fontSize: 24 }} />}
                title={lang("WeddingInfo.venueTitle")}
                lines={[
                  lang("TravelandStay.venue.name"),
                  lang("TravelandStay.venue.address"),
                ]}
              />
              <Box sx={{ mx: { xs: 2.5, md: 4 }, borderTop: `1px solid ${BORDER}` }} />
              <InfoRow
                icon={<EventIcon sx={{ color: OLIVE, fontSize: 24 }} />}
                title={lang("WeddingInfo.whenTitle")}
                lines={[lang("WeddingInfo.date"), lang("WeddingInfo.time")]}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
