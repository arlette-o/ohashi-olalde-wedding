import { Box, Typography } from "@mui/material";
import { CREAM, GOLD } from "../theme/colors";

/**
 * The big cream serif title + italic gold subtitle every page opens with,
 * lifted from Travel & Stay so the whole site shares one heading voice.
 */
export default function PageHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
      <Typography
        component="h1"
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: { xs: "2.4rem", md: "3.5rem" },
          color: CREAM,
          letterSpacing: "0.08em",
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: { xs: "1.1rem", md: "1.35rem" },
            color: GOLD,
            mt: 1,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
