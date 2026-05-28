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

export default function InviteCodeForm({ setGuest }: Props) {
  const [code, setCode] = useState("");

  const submitCode = async () => {
    console.log(code);
    const response = await postGuestCode(code);
    if (!response) {
      console.log("Bad Code");
      //Error handling here
      return;
    }

    setGuest(response);
    //setAuth(true);
    sessionStorage.setItem("guest", JSON.stringify(response));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          <Typography sx={labelSx}>
            Enter your Invite Code to proceed
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={inputSx}
          />
        </Box>
        <Button
          fullWidth
          disableElevation
          onClick={submitCode}
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
          Submit Code
        </Button>
      </Box>
    </Box>
  );
}
