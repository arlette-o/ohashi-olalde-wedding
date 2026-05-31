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
import { useId, useState } from "react";
import type { Guest } from "../api/guestAPI";

const OLIVE = "#6b7048";
const OLIVE_DARK = "#4f5233";
//const CREAM_BG = "#f0ede8";
const LABEL_COLOR = "#2e2e1f";
const BORDER = "#c8c9b8";

interface Props {
  guest: Guest;
}

export default function GuestMealForm({ guest }: Props) {
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

  const radioSX = {
    color: BORDER,
    "&.Mui-checked": { color: OLIVE },
  };

  const radioTextSX = {
    fontFamily: "'Georgia', serif",
    fontSize: "0.95rem",
    color: LABEL_COLOR,
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

  const id = useId();
  const [value, setValue] = useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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
          <Typography
            sx={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: LABEL_COLOR,
              mb: 1,
              display: "block",
              textAlign: "center",
            }}
          ></Typography>
          <TextField
            fullWidth
            placeholder="Guest name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={inputSx}
          />
        </Box>
        {/* <Box>
          <Typography sx={labelSx}>Email Address</Typography>
          <TextField
            fullWidth
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={inputSx}
          />
        </Box> */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                control={<Radio sx={radioSX} />}
                label={
                  <Typography sx={radioTextSX}>Joyfully accepts</Typography>
                }
              />
              <FormControlLabel
                value="declines"
                control={<Radio sx={radioSX} />}
                label={
                  <Typography sx={radioTextSX}>Regretfully declines</Typography>
                }
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel
              id={`${id}-label`}
              sx={{
                ...labelSx,
                "&.Mui-focused": { color: LABEL_COLOR },
                color: `${LABEL_COLOR} !important`,
              }}
            >
              What is your meal preference?
            </FormLabel>
            <RadioGroup
              aria-labelledby={`${id}-label`}
              name="meal"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="mean"
                control={<Radio sx={radioSX} />}
                label="Meat Protein"
                sx={radioTextSX}
              />
              <FormControlLabel
                value="Vegetarian"
                control={<Radio sx={radioSX} />}
                label="Vegetarian"
                sx={radioTextSX}
              />
            </RadioGroup>
          </FormControl>
        </Box>

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
