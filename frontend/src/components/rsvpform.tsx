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
import { updateRSVP, type Guest } from "../api/guestAPI";
import { useLanguage } from "../context/languageContext";
import {
  formCardSx,
  inputSx,
  labelSx,
  radioSx,
  radioTextSx,
  submitButtonSx,
} from "./formStyles";
import { BORDER, OLIVE } from "../theme/colors";

interface Props {
  guest: Guest;
}

export default function RsvpForm({ guest }: Props) {
  const { lang } = useLanguage();
  const [attending, setAttending] = useState("accepts");
  const [guests, setGuests] = useState("1");
  const [meal, setMeal] = useState("");
  const [notes, setNotes] = useState("");

  const submitForm = async () => {
    const payload = { id: guest._id, attending, guests };

    await updateRSVP(payload);
  };

  const generateMenuItems = (max: number) => {
    return Array.from({ length: max }, (_, i) => (
      <MenuItem key={i} value={i + 1}>
        {i + 1}{" "}
        {i === 0 ? lang("RSVP.form.guestSingular") : lang("RSVP.form.guestPlural")}
      </MenuItem>
    ));
  };

  const id = useId();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "start",
        py: { xs: 2, md: 4 },
      }}
    >
      <Box sx={formCardSx}>
        <Box>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: "1.7rem",
              color: OLIVE,
              display: "block",
              textAlign: "left",
            }}
          >
            {lang("RSVP.form.greeting").replace("{name}", guest.fname)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                ...labelSx,
                "&.Mui-focused": { color: OLIVE },
                color: `${OLIVE} !important`,
              }}
            >
              {lang("RSVP.form.attending")}
            </FormLabel>
            <RadioGroup
              value={attending}
              onChange={(e) => setAttending(e.target.value)}
              sx={{
                // Side by side once there's room; the two labels are too long
                // to share a line on a phone.
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 0, sm: 3 },
                mt: 0.5,
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio sx={radioSx} />}
                label={
                  <Typography sx={radioTextSx}>
                    {lang("RSVP.form.accepts")}
                  </Typography>
                }
              />
              <FormControlLabel
                value={false}
                control={<Radio sx={radioSx} />}
                label={
                  <Typography sx={radioTextSx}>
                    {lang("RSVP.form.declines")}
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
          <Box>
            <Typography sx={labelSx}>{lang("RSVP.form.guests")}</Typography>
            <Select
              value={guests}
              onChange={(e: SelectChangeEvent) => setGuests(e.target.value)}
              fullWidth
              sx={{
                borderRadius: "12px",
                backgroundColor: "#fff",
                fontSize: "1rem",
                color: OLIVE,
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
          <FormControl>
            <FormLabel
              id={`${id}-label`}
              sx={{
                ...labelSx,
                "&.Mui-focused": { color: OLIVE },
                color: `${OLIVE} !important`,
              }}
            >
              {lang("RSVP.form.meal")}
            </FormLabel>
            <RadioGroup
              aria-labelledby={`${id}-label`}
              name="meal"
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
            >
              <FormControlLabel
                value="meat"
                control={<Radio sx={radioSx} />}
                label={
                  <Typography sx={radioTextSx}>
                    {lang("RSVP.form.meat")}
                  </Typography>
                }
              />
              <FormControlLabel
                value="veg"
                control={<Radio sx={radioSx} />}
                label={
                  <Typography sx={radioTextSx}>
                    {lang("RSVP.form.veg")}
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <Typography sx={labelSx}>{lang("RSVP.form.dietary")}</Typography>
          <TextField
            fullWidth
            placeholder={lang("RSVP.form.dietaryPlaceholder")}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={inputSx}
          />
        </Box>
        <Button
          fullWidth
          disableElevation
          onClick={submitForm}
          sx={submitButtonSx}
        >
          {lang("RSVP.form.submit")}
        </Button>
      </Box>
    </Box>
  );
}
