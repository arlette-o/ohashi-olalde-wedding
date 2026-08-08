import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { submitGuestQuestion } from "../api/emailAPI";

const OLIVE = "#6b7048";
const BORDER = "#c8c9b8";
const OLIVE_DARK = "#4f5233";
const LABEL_COLOR = "#2e2e1f";

const labelSx = {
  fontFamily: "'Georgia', serif",
  fontWeight: 700,
  fontSize: "1rem",
  color: LABEL_COLOR,
  mb: 1,
  display: "block",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#fff",
    "& fieldset": { borderColor: BORDER },
    "&:hover fieldset": { borderColor: OLIVE },
    "&.Mui-focused fieldset": { borderColor: OLIVE, borderWidth: 1 },
  },
  "& .MuiInputBase-input": {
    fontFamily: "'Georgia', serif",
    fontSize: "1rem",
    color: LABEL_COLOR,
    padding: "14px 16px",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#aaa",
    opacity: 1,
  },
};

const multiInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#fff",
    "& fieldset": { borderColor: BORDER },
    "&:hover fieldset": { borderColor: OLIVE },
    "&.Mui-focused fieldset": { borderColor: OLIVE, borderWidth: 1 },
  },
  "& .MuiInputBase-input": {
    fontFamily: "'Georgia', serif",
    fontSize: "1rem",
    color: LABEL_COLOR,
    padding: "0px 2px",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#aaa",
    opacity: 1,
  },
};

const buttonSx = {
  backgroundColor: OLIVE,
  color: "#fff",
  fontFamily: "'Georgia', serif",
  fontWeight: 700,
  fontSize: "1rem",
  letterSpacing: "0.04em",
  borderRadius: "12px",
  py: 2,
  textTransform: "none",
  "&:hover": { backgroundColor: OLIVE_DARK },
  mt: 0.5,
};

export default function SubmitQuestion() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const submitQuestion = async () => {
    setLoading(true);
    const response = await submitGuestQuestion(email, question);
    if (!response) {
      console.log("Issue with emailing");
      //TODO: error handling here
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "start",
        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f2f1ee",
          borderRadius: "16px",
          border: `1px solid ${BORDER}`,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          p: { xs: 3, sm: 5 },
          width: "100%",
          maxWidth: 640,
          display: "flex",
          flexDirection: "column",
          gap: 3.5,
        }}
      >
        <Box>
          <Typography sx={labelSx}>Your Email</Typography>
          <TextField
            fullWidth
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={inputSx}
          />
        </Box>
        <Box>
          <Typography sx={labelSx}>Send Us a Question</Typography>
          <TextField
            multiline
            fullWidth
            minRows={4}
            sx={multiInputSx}
            value={question}
            placeholder="Ask Us Anything"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Box>
        <Button
          fullWidth
          disableElevation
          onClick={submitQuestion}
          sx={buttonSx}
        >
          {loading ? <CircularProgress /> : "Submit"}
        </Button>
      </Box>
    </Box>
  );
}
