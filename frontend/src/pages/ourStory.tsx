import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLanguage } from "../context/languageContext";
import PageHeading from "../components/pageHeading";
import { PAGE_BG } from "../theme/colors";

// Captions live in the translation files (`OurStory.mosaic`), matched by index.
const itemData: { img: string; rows?: number; cols?: number }[] = [
  {
    img: "/mosaic pics/car1.png",
    rows: 1,
    cols: 2,
  },
  {
    img: "/mosaic pics/kyoto.jpeg",
    rows: 1,
    cols: 1,
  },
  {
    img: "/mosaic pics/yosemite1.jpeg",
    rows: 1,
    cols: 1,
  },
  {
    img: "/mosaic pics/yosemite2.jpeg",
    rows: 2,
    cols: 2,
  },
];

// Measured from the alpha channel of frame.png (752x971): the lace border
// occupies these margins, leaving a 90.7% x 92.9% transparent opening. The
// photo is sized to that opening so it sits *inside* the lace instead of
// underneath it.
const OPENING = {
  left: "4.65%",
  top: "3.5%",
  width: "90.7%",
  height: "92.9%",
};

// Gap the opening leaves below the photo (100% − top − height). The caption
// panel anchors here so its bottom edge lands on the photo, not on the lace.
const OPENING_BOTTOM = "3.6%";

const FramedImage = ({ src, alt }: { src: string; alt: string }) => (
  <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        position: "absolute",
        // Full-bleed on phones, where the frame overlay is hidden entirely.
        top: { xs: 0, sm: OPENING.top },
        left: { xs: 0, sm: OPENING.left },
        width: { xs: "100%", sm: OPENING.width },
        height: { xs: "100%", sm: OPENING.height },
        objectFit: "cover",
        display: "block",
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
      }}
    />
    <Box
      component="img"
      src="/frame.png"
      alt=""
      aria-hidden="true"
      sx={{
        position: "absolute",
        // The frame defines the outer bounds; stretching it to the container
        // keeps the opening aligned with the photo at any aspect ratio.
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "fill",
        pointerEvents: "none",
        display: { xs: "none", sm: "block" },
      }}
    />
  </Box>
);

/** An image with its caption panel resting over the bottom edge. */
const StoryPanel = ({
  src,
  alt,
  title,
  body,
}: {
  src: string;
  alt: string;
  title: string;
  body: string;
}) => (
  <Box sx={{ position: "relative", width: "100%" }}>
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: { xs: "4 / 5", md: "3 / 4" },
      }}
    >
      <FramedImage src={src} alt={alt} />
    </Box>

    <Box
      sx={{
        // Overlaps the image on wide screens; sits directly beneath it on
        // phones, where an overlay would cover the photo entirely. Anchored to
        // the frame's opening, not the container, so its bottom-left corner
        // sits flush on the photo instead of spilling onto the lace border.
        position: { xs: "static", md: "absolute" },
        bottom: { md: OPENING_BOTTOM },
        left: { md: OPENING.left },
        // Spans the full opening so the panel's left, right and bottom edges
        // land exactly on the photo's.
        width: { xs: "100%", md: OPENING.width },
        bgcolor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(2px)",
        p: { xs: 2.5, md: 4 },
        // Square where it meets the photo's edges; only the free top corners
        // stay rounded.
        borderRadius: { xs: "0 0 8px 8px", md: "12px 12px 0 0" },
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem", lg: "3.2rem" },
          lineHeight: 1.15,
          color: "#f5f0e8",
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: { xs: "0.95rem", md: "1rem" },
          lineHeight: 1.8,
          color: "#f5f0e8",
        }}
      >
        {body}
      </Typography>
    </Box>
  </Box>
);

export default function OurStory() {
  //Use language context
  const { lang } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // The quilted mosaic needs fewer columns on a phone or every tile is a stamp.
  const mosaicCols = isMobile ? 2 : 3;
  const captions: string[] = lang("OurStory.mosaic");

  return (
    <Box
      sx={{
        bgcolor: PAGE_BG,
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <PageHeading
        title={lang("OurStory.title")}
        subtitle={lang("OurStory.subtitle")}
      />
      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <StoryPanel
            src="/Hallway.jpg"
            alt="Where we met"
            title={lang("OurStory.ourStory.title")}
            body={lang("OurStory.ourStory.content")}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <StoryPanel
            // The park in Kinosaki where the proposal happened — a dedicated
            // proposal photo can swap in here when one is picked.
            src="/Kinosaki.JPG"
            alt="Kinosaki, where the proposal happened"
            title={lang("OurStory.theProposal.title")}
            body={lang("OurStory.theProposal.content")}
          />
        </Grid>

        <Grid size={12}>
          <Box
            sx={{
              width: "80%",
              mx: "auto",
              height: "1px",
              bgcolor: "rgba(245,240,232,0.2)",
              my: { xs: 2, md: 4 },
            }}
          />
        </Grid>

        <Grid size={12}>
          <ImageList variant="quilted" cols={mosaicCols} gap={8} sx={{ m: 0 }}>
            {itemData.map((item, i) => (
              <ImageListItem
                key={item.img}
                cols={Math.min(item.cols || 1, mosaicCols)}
                rows={item.rows || 1}
                sx={{
                  "& .MuiImageListItemBar-root": {
                    // No hover on touch devices, so keep captions visible there.
                    opacity: { xs: 1, md: 0 },
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover .MuiImageListItemBar-root": { opacity: 1 },
                }}
              >
                <img src={item.img} alt={captions[i]} loading="lazy" />
                <ImageListItemBar title={captions[i]} />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
  );
}
