import {
  Box,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useLanguage } from "../context/languageContext";
import InfoIcon from "@mui/icons-material/Info";

const itemData: { img: string; title: string; rows?: number; cols?: number }[] =
  [
    {
      img: "public/mosaic pics/car1.png",
      title: "Car ride in 2023",
      rows: 1,
      cols: 2,
    },
    {
      img: "public/mosaic pics/kyoto.jpeg",
      title: "Walking through Kyoto!",
      rows: 1,
      cols: 1,
    },
    {
      img: "public/mosaic pics/yosemite1.jpeg",
      title: "Arlette and Taka in Yosemite",
      rows: 1,
      cols: 1,
    },
    {
      img: "public/mosaic pics/yosemite2.jpeg",
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

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function OurStory() {
  //Use language context
  const { lang } = useLanguage();

  return (
    <Grid container spacing={2} sx={{ bgcolor: "#6a6b4a" }}>
      <Grid size={6} sx={{ minHeight: "60vh", padding: 8, mt: 8 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <FramedImage src="/Hallway.jpg" alt="Where we met" />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "90%",
              height: "40%",
              p: 4,
              borderRadius: 12,
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
      <Grid size={6} sx={{ minHeight: "60vh", padding: 8, mt: 8 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <FramedImage src="/proposal-1.jpg" alt="The proposal" />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "90%",
              height: "40%",
              p: 4,
              borderRadius: 12,
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
              {lang("OurStory.theProposal.title")}{" "}
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
        <ImageList variant="quilted" cols={3} gap={8}>
          {itemData.map((item) => (
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
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                //subtitle={item.author}
                sx={{
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </Grid>
  );
}
{
  /*
  
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
            </Typography>
          </Box>
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
          </Box> */
}
