import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  checkBackendHealth,
  EmailApiError,
  submitGuestQuestion,
} from "../api/emailAPI";
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
  // The form used to swallow failures silently, so a broken API looked
  // identical to a successful send. Guests need to know which one happened.
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const submitQuestion = async () => {
    console.log("[submitQuestion] submit clicked", {
      emailLength: email.trim().length,
      questionLength: question.trim().length,
      href: window.location.href,
    });

    if (!email.trim() || !question.trim()) {
      console.warn("[submitQuestion] blocked locally: empty email or question");
      setStatus("error");
      return;
    }
    setLoading(true);
    setStatus("idle");
    try {
      const result = await submitGuestQuestion(email, question);
      console.log("[submitQuestion] send succeeded", result);
      setStatus("sent");
      setEmail("");
      setQuestion("");
    } catch (err) {
      if (err instanceof EmailApiError) {
        console.error("[submitQuestion] send failed", {
          status: err.status,
          reason: err.reason,
          requestId: err.requestId,
          message: err.message,
          body: err.body,
        });
      } else {
        console.error("[submitQuestion] send failed (unexpected error)", err);
      }
      // A failed send is the one moment worth probing the backend: it separates
      // "the whole API is down" from "the API is up and the send itself was
      // rejected", which look identical from the form.
      console.log("[submitQuestion] probing /api/health to locate the fault...");
      await checkBackendHealth();
      setStatus("error");
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

        {status !== "idle" && (
          <Typography
            role="status"
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              textAlign: "center",
              color: status === "sent" ? GOLD : "#e8a0a0",
            }}
          >
            {lang(
              status === "sent" ? "FAQs.ask.success" : "FAQs.ask.errorMessage",
            )}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
