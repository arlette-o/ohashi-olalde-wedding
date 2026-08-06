import { Box, Button, Grid, Link, Typography } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HotelIcon from "@mui/icons-material/Hotel";
import PlaceIcon from "@mui/icons-material/Place";
import { useLanguage } from "../context/languageContext";

const OLIVE = "#4f5233";
const BORDER = "#c8c9b8";
const CREAM = "#f5f0e8";
const GOLD = "#c9bb8e";

interface Hotel {
  name: string;
  area: string;
  pricePerNight: string;
  distanceToVenue: string;
  bookingUrl?: string;
  img?: string;
}

// Hotel recommendations go here as they're confirmed — each entry becomes a
// card in the Stay section. While empty, a "coming soon" note renders instead.
const hotels: Hotel[] = [];

const travelGuides = [
  {
    img: "/travel/getting-there.png",
    key: "gettingThere",
  },
  {
    img: "/travel/finding-the-hacienda.png",
    key: "findingTheHacienda",
  },
];

const SectionHeading = ({
  title,
  subtitle,
  id,
}: {
  title: string;
  subtitle: string;
  id: string;
}) => (
  <Box id={id} sx={{ textAlign: "center", scrollMarginTop: "96px" }}>
    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: { xs: "1.9rem", md: "2.6rem" },
        color: CREAM,
        letterSpacing: "0.08em",
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: { xs: "0.95rem", md: "1.1rem" },
        color: GOLD,
        mt: 0.5,
      }}
    >
      {subtitle}
    </Typography>
  </Box>
);

/** Cream card with an icon header — used for shuttle info and coming-soon notes. */
const NoteCard = ({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) => (
  <Box
    sx={{
      border: `8px solid ${BORDER}`,
      borderRadius: "24px",
      bgcolor: CREAM,
      p: { xs: 2.5, md: 4 },
      display: "flex",
      alignItems: "center",
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
      <Typography
        sx={{ fontWeight: 700, color: OLIVE, fontSize: "1rem", mb: 0.5 }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: OLIVE, fontSize: "0.95rem" }}>{body}</Typography>
    </Box>
  </Box>
);

export default function TravelAndStay() {
  const { lang } = useLanguage();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#6a6b4a",
        px: { xs: 2, sm: 3, md: 6 },
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 10 },
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: { xs: "2.2rem", md: "3.5rem" },
          color: CREAM,
          letterSpacing: "0.08em",
          textAlign: "center",
          mb: { xs: 2, md: 3 },
        }}
      >
        {lang("TravelandStay.title")}
      </Typography>

      {/* Jump links so guests land on the info they came for */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: { xs: 4, md: 6 },
        }}
      >
        {(["travel", "stay"] as const).map((section) => (
          <Link
            key={section}
            href={`#${section}`}
            underline="none"
            sx={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              letterSpacing: "0.1em",
              color: CREAM,
              border: `1px solid ${GOLD}`,
              borderRadius: "999px",
              px: 3,
              py: 0.75,
              "&:hover": { bgcolor: "rgba(201,187,142,0.15)" },
            }}
          >
            {lang(`TravelandStay.nav.${section}`)}
          </Link>
        ))}
      </Box>

      <Grid container spacing={{ xs: 4, md: 5 }}>
        {/* ---------------- Travel ---------------- */}
        <Grid size={12}>
          <SectionHeading
            id="travel"
            title={lang("TravelandStay.travel.title")}
            subtitle={lang("TravelandStay.travel.subtitle")}
          />
        </Grid>

        {travelGuides.map((guide) => (
          <Grid key={guide.key} size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                border: `8px solid ${BORDER}`,
                borderRadius: "24px",
                overflow: "hidden",
                bgcolor: CREAM,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                component="a"
                href={guide.img}
                target="_blank"
                rel="noopener"
                sx={{ display: "block", lineHeight: 0 }}
              >
                <Box
                  component="img"
                  src={guide.img}
                  alt={lang(
                    `TravelandStay.travel.guides.${guide.key}.title`
                  )}
                  loading="lazy"
                  sx={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
              <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Typography
                  sx={{
                    fontFamily: "'Cormorant SC', serif",
                    fontWeight: 400,
                    fontSize: { xs: "1.05rem", md: "1.2rem" },
                    color: OLIVE,
                    letterSpacing: "0.04em",
                    mb: 1,
                  }}
                >
                  {lang(`TravelandStay.travel.guides.${guide.key}.title`)}
                </Typography>
                <Typography
                  sx={{
                    color: OLIVE,
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                  }}
                >
                  {lang(
                    `TravelandStay.travel.guides.${guide.key}.description`
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}

        <Grid size={12}>
          <NoteCard
            icon={<DirectionsBusIcon sx={{ color: OLIVE, fontSize: 24 }} />}
            title={lang("TravelandStay.travel.shuttle.title")}
            body={lang("TravelandStay.travel.shuttle.description")}
          />
        </Grid>

        {/* Divider between the two halves of the page */}
        <Grid size={12}>
          <Box
            sx={{
              width: "80%",
              mx: "auto",
              height: "1px",
              bgcolor: "rgba(245,240,232,0.2)",
              my: { xs: 1, md: 3 },
            }}
          />
        </Grid>

        {/* ---------------- Stay ---------------- */}
        <Grid size={12}>
          <SectionHeading
            id="stay"
            title={lang("TravelandStay.stay.title")}
            subtitle={lang("TravelandStay.stay.subtitle")}
          />
        </Grid>

        {hotels.length === 0 ? (
          <Grid size={12}>
            <NoteCard
              icon={<HotelIcon sx={{ color: OLIVE, fontSize: 24 }} />}
              title={lang("TravelandStay.stay.title")}
              body={lang("TravelandStay.stay.comingSoon")}
            />
          </Grid>
        ) : (
          hotels.map((hotel) => (
            <Grid key={hotel.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  border: `8px solid ${BORDER}`,
                  borderRadius: "24px",
                  overflow: "hidden",
                  bgcolor: CREAM,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {hotel.img && (
                  <Box
                    component="img"
                    src={hotel.img}
                    alt={hotel.name}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
                <Box
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant SC', serif",
                      fontSize: "1.15rem",
                      color: OLIVE,
                    }}
                  >
                    {hotel.name}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <PlaceIcon sx={{ color: OLIVE, fontSize: 18 }} />
                    <Typography sx={{ color: OLIVE, fontSize: "0.9rem" }}>
                      {hotel.area} · {hotel.distanceToVenue}{" "}
                      {lang("TravelandStay.stay.distanceToVenue")}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: OLIVE, fontSize: "0.95rem" }}>
                    {hotel.pricePerNight}{" "}
                    {lang("TravelandStay.stay.perNight")}
                  </Typography>
                  {hotel.bookingUrl && (
                    <Button
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        mt: "auto",
                        alignSelf: "flex-start",
                        color: CREAM,
                        bgcolor: OLIVE,
                        px: 3,
                        borderRadius: "999px",
                        "&:hover": { bgcolor: "#3d402a" },
                      }}
                    >
                      {lang("TravelandStay.stay.bookNow")}
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
