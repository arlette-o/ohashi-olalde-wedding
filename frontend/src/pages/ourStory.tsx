import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useLanguage } from "../context/languageContext";
import { imageList } from "../assets/imageList";

export default function OurStory() {
  //Use language context
  const { lang } = useLanguage();

  return (
    <Grid container spacing={2} sx={{ bgcolor: "#6a6b4a" }}>
      <Grid
        size={{ md: 6, sm: 12 }}
        sx={{ minHeight: "60vh", padding: 8, mt: 8 }}
      >
        <Box
          sx={{
            border: `8px solid #c8c9b8`,
            borderRadius: 12,
            position: "relative",
            width: "100%",
            height: "100%",
            padding: 5,
            overflow: "hidden",
            "&:hover .story-overlay-full": { opacity: 1 },
            "&:hover .story-title-only": { opacity: 0 },
          }}
        >
          <Box
            component="img"
            src={"/Hallway.jpg"}
            alt={"Hallway Picture"}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              borderRadius: 12,
            }}
          />

          {/* Title only — visible by default */}
          <Box
            className="story-title-only"
            sx={{
              position: "absolute",
              bottom: 0,
              width: "90%",
              p: 4,
              transition: "opacity 0.3s ease",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: { xs: "2.2rem", md: "3.2rem", lg: "3.8rem" },
                lineHeight: 1.15,
                color: "#f5f0e8",
              }}
            >
              {lang("OurStory.ourStory.title")}
            </Typography>
          </Box>

          {/* Full overlay — visible on hover */}
          <Box
            className="story-overlay-full"
            sx={{
              position: "absolute",
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "86%",
              height: "65%",
              p: 4,
              borderRadius: 12,
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: { xs: "2.2rem", md: "3.2rem", lg: "3.8rem" },
                lineHeight: 1.15,
                color: "#f5f0e8",
                mb: 2,
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
              }}
            >
              {lang("OurStory.ourStory.content")}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        size={{ md: 6, sm: 11 }}
        sx={{ minHeight: "60vh", padding: 8, mt: 8 }}
      >
        <Box
          sx={{
            border: `8px solid #c8c9b8`,
            borderRadius: 12,
            position: "relative",
            width: "100%",
            height: "100%",
            padding: 5,
            overflow: "hidden",
            "&:hover .story-overlay-full": { opacity: 1 },
            "&:hover .story-title-only": { opacity: 0 },
          }}
        >
          <Box
            component="img"
            src={"/Proposal-1.jpg"}
            alt={"Proposal Picture"}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              borderRadius: 12,
            }}
          />

          <Box
            className="story-title-only"
            sx={{
              position: "absolute",
              bottom: 0,
              width: "90%",
              p: 4,
              transition: "opacity 0.3s ease",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: { xs: "2.2rem", md: "3.2rem", lg: "3.8rem" },
                lineHeight: 1.15,
                color: "#f5f0e8",
              }}
            >
              {lang("OurStory.theProposal.title")}
            </Typography>
          </Box>

          <Box
            className="story-overlay-full"
            sx={{
              position: "absolute",
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "87%",
              height: "90%",
              p: 4,
              borderRadius: 12,
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: { xs: "2.2rem", md: "3.2rem", lg: "3.8rem" },
                lineHeight: 1.15,
                color: "#f5f0e8",
                mb: 2,
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
              }}
            >
              {lang("OurStory.theProposal.content")}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Box
        sx={{
          width: "80%",
          mx: "auto",
          height: "1px",
          bgcolor: "rgba(245,240,232,0.2)",
        }}
      />

      <Grid size={12}>
        <Box sx={{ maxWidth: "90%", mx: "auto" }}>
          <ImageList
            variant="quilted"
            cols={3}
            gap={8}
            rowHeight={300}
            sx={{ gridAutoFlow: "dense" }}
          >
            {imageList.map((item: any) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
                sx={{
                  "&:hover .MuiImageListItemBar-root": {
                    opacity: 1,
                  },
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <ImageListItemBar
                  title={item.title}
                  sx={{
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Grid>
    </Grid>
  );
}
