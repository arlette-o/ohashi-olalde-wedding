import { useId } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useLanguage } from "../context/languageContext";
import SubmitQuestion from "../components/submitQuestion";
export default function FAQs() {
  const id = useId();
  const { lang } = useLanguage();

  const questions = lang("FAQs.Questions");
  const responses = lang("FAQs.Responses");

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6a6b4a",
        px: { xs: 2, sm: 4, md: 6 },
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 10 },
        width: "100%",
        mx: 0,
      }}
      spacing={2}
    >
      <Grid size={12}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "#fff",
            fontSize: { xs: "2rem", md: "3rem" },
            textAlign: "center",
            my: { xs: 3, md: 6 },
          }}
        >
          Frequently Asked Questions
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 10, lg: 8 }}>
        <Accordion sx={{ background: "#C5C0AD" }}>
          <AccordionSummary
            expandIcon={<ControlPointIcon sx={{ color: "#2e2e1f" }} />}
            aria-controls={`${id}-panel1-content`}
            id={`${id}-panel1-header`}
          >
            <Typography sx={{ color: "#2e2e1f" }}>
              What's the dress code?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="img"
              src="/ColorPalette.png"
              alt="Wedding colour palette"
              sx={{
                display: "block",
                maxWidth: "100%",
                height: "auto",
                mx: "auto",
                my: { xs: 3, md: 6 },
              }}
            />
          </AccordionDetails>
        </Accordion>

        {questions.map((question: string, index: number) => (
          <Accordion key={index} sx={{ background: "#C5C0AD" }}>
            <AccordionSummary
              expandIcon={<ControlPointIcon sx={{ color: "#2e2e1f" }} />}
            >
              <Typography component="span" sx={{ color: "#2e2e1f" }}>
                {question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "#2e2e1f" }}>
                {responses[index]}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
      <Grid size={12}>
        <SubmitQuestion />
      </Grid>
    </Grid>
  );
}
