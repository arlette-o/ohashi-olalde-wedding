import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { useLanguage } from "../context/languageContext";

const itemData: { img: string; title: string }[] = [
  { img: "public/mosaic pics/car1.png", title: "Car ride in 2023" },
  { img: "public/mosaic pics/kyoto.jpeg", title: "Walking through Tokyo!" },
  {
    img: "public/mosaic pics/yosemite1.jpeg",
    title: "Arlette in Taka in Yosemite",
  },
  {
    img: "public/mosaic pics/yosemite2.jpeg",
    title: "Arlette and Take in Yosemite",
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
      sx={{
        position: "absolute",
        inset: "-4%",
        width: "108%",
        height: "108%",
        objectFit: "fill",
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
  </Box>
);

export default function OurStory() {
  //Use language context
  const { lang } = useLanguage();

  return (
    <Box sx={{ bgcolor: "#6a6b4a", pt: "72px" }}>
      {/* ── Section 1: How We Met ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          minHeight: "calc(100vh - 72px)",
        }}
      >
        {/* Left: photo */}
        <Box
          sx={{
            position: "relative",
            ml: { xs: 3, md: 8 },
            mt: { xs: 4, md: 6 },
            mb: { xs: 4, md: 6 },
            width: "75%",
            height: "85%",
          }}
        >
          <FramedImage src="/Hallway.jpg" alt="Where we met" />
        </Box>

        {/* Right: text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 4, md: 8 },
            py: { xs: 6, md: 10 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: { xs: "2.2rem", md: "3.2rem", lg: "3.8rem" },
              lineHeight: 1.15,
              color: "#f5f0e8",
              mb: 6,
            }}
          >
            {lang("OurStory.ourStory.title")}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: { xs: "0.95rem", md: "1rem" },
              lineHeight: 1.8,
              color: "#f5f0e8",
              mb: 4,
            }}
          >
            {lang("OurStory.ourStory.content")}
          </Typography>
        </Box>
      </Box>

      {/* ── Divider ── */}
      <Box
        sx={{
          width: "80%",
          mx: "auto",
          height: "1px",
          bgcolor: "rgba(245,240,232,0.2)",
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 4, md: 8 },
            py: { xs: 6, md: 10 },
            order: { xs: 2, md: 1 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: { xs: "2.2rem", md: "3.2rem", lg: "3.8rem" },
              lineHeight: 1.15,
              color: "#f5f0e8",
              mb: 6,
            }}
          >
            {lang("OurStory.theProposal.title")}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: { xs: "0.95rem", md: "1rem" },
              lineHeight: 1.8,
              color: "#f5f0e8",
              mb: 4,
            }}
          >
            {lang("OurStory.theProposal.content")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 6,
            pr: { xs: 3, md: 8 },
            pl: { xs: 3, md: 4 },
            py: { xs: 4, md: 8 },
            order: { xs: 1, md: 2 },
          }}
        >
          {/* Top photo */}
          <Box
            sx={{
              position: "relative",
              width: "80%",
              aspectRatio: "3 / 4",
              alignSelf: "flex-end",
            }}
          >
            <FramedImage src="/proposal-1.jpg" alt="The proposal" />
          </Box>

          {/* Bottom photo — offset left for a staggered feel */}
          <Box
            sx={{
              position: "relative",
              width: "80%",
              aspectRatio: "3 / 4",
              alignSelf: "flex-start",
            }}
          >
            <FramedImage src="/proposal-2.jpg" alt="The proposal" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", maxWidth: 500, height: 450, overflowY: "scroll", mx: "auto", px: { xs: 2, md: 0 } }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
