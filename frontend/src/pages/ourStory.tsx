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

const itemData: { img: string; title: string; rows?: number; cols?: number }[] =
  [
    {
      img: "/mosaic pics/car1.png",
      title: "Car ride in 2023",
      rows: 1,
      cols: 2,
    },
    {
      img: "/mosaic pics/kyoto.jpeg",
      title: "Walking through Kyoto!",
      rows: 1,
      cols: 1,
    },
    {
      img: "/mosaic pics/yosemite1.jpeg",
      title: "Arlette and Taka in Yosemite",
      rows: 1,
      cols: 1,
    },
    {
      img: "/mosaic pics/yosemite2.jpeg",
      title: "Arlette and Taka in Yosemite",
      rows: 2,
      cols: 2,
    },
  ];

const FramedImage = ({ src, alt }: { src: string; alt: string }) => (
  <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: "100%",
        height: "100%",
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
        inset: "-4%",
        width: "108%",
        height: "108%",
        objectFit: "fill",
        mixBlendMode: "screen",
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
        // phones, where an overlay would cover the photo entirely.
        position: { xs: "static", md: "absolute" },
        bottom: { md: 0 },
        left: { md: 0 },
        width: { xs: "100%", md: "90%" },
        bgcolor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(2px)",
        p: { xs: 2.5, md: 4 },
        borderRadius: { xs: "0 0 8px 8px", md: "12px" },
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

  return (
    <Box
      sx={{
        bgcolor: "#6a6b4a",
        pt: { xs: 12, md: 16 },
        pb: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
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
            src="/proposal-1.jpg"
            alt="The proposal"
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
            {itemData.map((item) => (
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
                <img src={item.img} alt={item.title} loading="lazy" />
                <ImageListItemBar title={item.title} />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
  );
}
