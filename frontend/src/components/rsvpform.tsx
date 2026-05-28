import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import type { Guest } from "../api/guestAPI";

const OLIVE = "#6b7048";
const OLIVE_DARK = "#4f5233";
//const CREAM_BG = "#f0ede8";
const LABEL_COLOR = "#2e2e1f";
const BORDER = "#c8c9b8";

interface Props {
  guest: Guest;
}

export default function RsvpForm({ guest }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState("accepts");
  const [guests, setGuests] = useState("0");

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

  const labelSx = {
    fontFamily: "'Georgia', serif",
    fontWeight: 700,
    fontSize: "1rem",
    color: LABEL_COLOR,
    mb: 1,
    display: "block",
  };

  const submitForm = async () => {
    console.log(name, email, attending, guests);
  };

  const generateMenuItems = (max: number) => {
    return Array.from({ length: max }, (_, i) => (
      <MenuItem key={i} value={i}>
        {i + 1} {i === 0 ? " Guest" : " Guests"}
      </MenuItem>
    ));
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
          <Typography sx={labelSx}>Hi {guest.fname}!</Typography>
          {/* <TextField
            fullWidth
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={inputSx}
          /> */}
        </Box>
        <Box>
          <Typography sx={labelSx}>Email Address</Typography>
          <TextField
            fullWidth
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={inputSx}
          />
        </Box>
        <Box>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                ...labelSx,
                "&.Mui-focused": { color: LABEL_COLOR },
                color: `${LABEL_COLOR} !important`,
              }}
            >
              Will you be attending?
            </FormLabel>
            <RadioGroup
              row
              value={attending}
              onChange={(e) => setAttending(e.target.value)}
              sx={{ gap: 3, mt: 0.5 }}
            >
              <FormControlLabel
                value="accepts"
                control={
                  <Radio
                    sx={{
                      color: BORDER,
                      "&.Mui-checked": { color: OLIVE },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "0.95rem",
                      color: LABEL_COLOR,
                    }}
                  >
                    Joyfully accepts
                  </Typography>
                }
              />
              <FormControlLabel
                value="declines"
                control={
                  <Radio
                    sx={{
                      color: BORDER,
                      "&.Mui-checked": { color: OLIVE_DARK },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "0.95rem",
                      color: LABEL_COLOR,
                    }}
                  >
                    Regretfully declines
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Number of Guests */}
        <Box>
          <Typography sx={labelSx}>Number of Guests</Typography>
          <Select
            value={guests}
            onChange={(e: SelectChangeEvent) => setGuests(e.target.value)}
            fullWidth
            sx={{
              borderRadius: "12px",
              backgroundColor: "#fff",
              fontFamily: "'Georgia', serif",
              fontSize: "1rem",
              color: LABEL_COLOR,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: BORDER },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: OLIVE,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: OLIVE,
                borderWidth: 1,
              },
              "& .MuiSelect-select": { padding: "14px 16px" },
            }}
          >
            {generateMenuItems(guest.allowed_invitees)}
          </Select>
        </Box>

        {/* Submit */}
        <Button
          fullWidth
          disableElevation
          onClick={submitForm}
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
          Submit RSVP
        </Button>
      </Box>
    </Box>
  );
}
