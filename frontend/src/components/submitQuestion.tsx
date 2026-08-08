import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { submitGuestQuestion } from "../api/emailAPI";
import { useLanguage } from "../context/languageContext";
import {
  formCardSx,
  inputSx,
  labelSx,
  submitButtonSx,
} from "./formStyles";
import { CREAM, GOLD } from "../theme/colors";

export default function SubmitQuestion() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const submitQuestion = async () => {
    setLoading(true);
    try {
      await submitGuestQuestion(email, question);
    } catch (err) {
      console.log("Issue with emailing", err);
      //TODO: error handling here
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "start",
        py: { xs: 4, md: 6 },
      }}
    >
      {/* A little context above the card — it used to float unannounced. */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: { xs: "1.7rem", md: "2.2rem" },
            color: CREAM,
            letterSpacing: "0.06em",
          }}
        >
          {lang("FAQs.ask.title")}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: { xs: "1rem", md: "1.15rem" },
            color: GOLD,
            mt: 0.5,
          }}
        >
          {lang("FAQs.ask.subtitle")}
        </Typography>
      </Box>

      <Box sx={formCardSx}>
        <Box>
          <Typography sx={labelSx}>{lang("FAQs.ask.email")}</Typography>
          <TextField
            fullWidth
            placeholder={lang("FAQs.ask.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={inputSx}
          />
        </Box>
        <Box>
          <Typography sx={labelSx}>{lang("FAQs.ask.question")}</Typography>
          <TextField
            multiline
            minRows={3}
            fullWidth
            sx={inputSx}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Box>
        <Button
          fullWidth
          disableElevation
          onClick={submitQuestion}
          disabled={loading}
          sx={submitButtonSx}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            lang("FAQs.ask.submit")
          )}
        </Button>
      </Box>
    </Box>
  );
}
