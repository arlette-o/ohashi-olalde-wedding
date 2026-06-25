import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { postGuestCode, type Guest } from "../api/guestAPI";

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

interface Props {
  setGuest: (value: Guest) => void;
}

export default function submitQuestion() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const submitQuestion = async () => {};

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
            sx={inputSx}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Box>
        <Button
          fullWidth
          disableElevation
          onClick={submitQuestion}
          sx={{
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
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
