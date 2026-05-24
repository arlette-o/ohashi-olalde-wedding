import { Box, ImageList, ImageListItem, Typography } from "@mui/material";

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
            Our Story
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
            Taka and Arlette met in this exact hallway at Cal Poly SLO in
            Engineering East on the first day of their Networks lab in 2019.
            They had both waited until the last minute to print their lab
            worksheets. Arlette spotted Taka at a computer with the lab printout
            pulled up, she approached him and asked if he could print her a copy
            as well. They walked together over to the lab room and Arlette asked
            Taka, "Do you have a lab partner for this class?" Taka replied, "No"
            and Arlette asked, "Well would you like one?" and that is how
            Arlette and Taka became lab partners.
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
            The Proposal
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
            Taka and Arlette booked a second trip to Japan in 2025. They went
            shopping in Tokyo, sightseeing in Kyoto and relaxing in Kinosaki.
            Taka was particularly excited for Kinosaki as he had planned to
            propose at this beautiful, quiet, hot spring town. He made sure to
            book a fancy ryokan with all the amenities and peace that money
            could buy. On the second day of their Kinosaki stay, November 19th,
            Taka asked Arlette to go for a walk in the surrounding area. They
            came to a quiet secluded park with a view of the whole town and
            mountains in the background and breathed in the crisp cool air. He
            asked Arlette to turn around and reached into his pocket and knelt
            down. Arlette turned and accepted immediately. They embraced, it was
            just them two in this beautiful park, only the river and mountains
            kept them company. The proposal was intimate, peaceful, and the ring
            was gorgeous.
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
      <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
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
