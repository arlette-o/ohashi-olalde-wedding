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
import PageHeading from "../components/pageHeading";
import { BORDER, CREAM, GOLD_DARK, OLIVE, PAGE_BG } from "../theme/colors";

// Cream cards with the site border, replacing the default gray accordions.
const accordionSx = {
  bgcolor: CREAM,
  color: OLIVE,
  border: `1px solid ${BORDER}`,
  borderRadius: "16px !important",
  boxShadow: "none",
  mb: 1.5,
  // MUI draws a divider line above each accordion; the gap does that job here.
  "&::before": { display: "none" },
  "&.Mui-expanded": { my: 0, mb: 1.5 },
};

const summarySx = {
  px: { xs: 2, md: 3 },
  "& .MuiAccordionSummary-content": { my: 2 },
};

const questionSx = {
  fontFamily: "'Cormorant SC', serif",
  fontSize: { xs: "1.05rem", md: "1.15rem" },
  letterSpacing: "0.04em",
  color: OLIVE,
};

const answerSx = {
  color: OLIVE,
  fontSize: "1.02rem",
  lineHeight: 1.7,
};

export default function FAQs() {
  const id = useId();
  const { lang } = useLanguage();

  const questions: string[] = lang("FAQs.Questions");
  const responses: string[] = lang("FAQs.Responses");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: PAGE_BG,
        px: { xs: 2, sm: 4, md: 6 },
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 10 },
      }}
    >
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        <PageHeading
          title={lang("FAQs.title")}
          subtitle={lang("FAQs.subtitle")}
        />

        <Grid container sx={{ justifyContent: "center" }}>
          <Grid size={{ xs: 12, md: 10, lg: 8 }}>
            <Accordion disableGutters sx={accordionSx}>
              <AccordionSummary
                expandIcon={<ControlPointIcon sx={{ color: GOLD_DARK }} />}
                aria-controls={`${id}-panel1-content`}
                id={`${id}-panel1-header`}
                sx={summarySx}
              >
                <Typography sx={questionSx}>{lang("FAQs.dressCode")}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 2, md: 3 } }}>
                <Box
                  component="img"
                  src="/ColorPalette.png"
                  alt="Wedding colour palette"
                  sx={{
                    display: "block",
                    maxWidth: "100%",
                    height: "auto",
                    mx: "auto",
                    my: { xs: 1, md: 2 },
                    borderRadius: "8px",
                  }}
                />
              </AccordionDetails>
            </Accordion>

            {questions.map((question, index) => (
              <Accordion key={question} disableGutters sx={accordionSx}>
                <AccordionSummary
                  expandIcon={<ControlPointIcon sx={{ color: GOLD_DARK }} />}
                  sx={summarySx}
                >
                  <Typography component="span" sx={questionSx}>
                    {question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pt: 0 }}>
                  <Typography sx={answerSx}>{responses[index]}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>

          <Grid size={12}>
            <SubmitQuestion />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
