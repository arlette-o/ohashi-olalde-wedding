import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { postGuestCode, type Guest } from "../api/guestAPI";
import { useLanguage } from "../context/languageContext";
import {
  formCardSx,
  inputSx,
  labelSx,
  submitButtonSx,
} from "./formStyles";

interface Props {
  setGuest: (value: Guest) => void;
}

export default function InviteCodeForm({ setGuest }: Props) {
  const { lang } = useLanguage();
  const [code, setCode] = useState("");

  const submitCode = async () => {
    const response = await postGuestCode(code);
    if (!response) {
      console.log("Bad Code");
      //Error handling here
      return;
    }

    setGuest(response);
    sessionStorage.setItem("guest", JSON.stringify(response));
  };

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
          <Typography sx={labelSx}>{lang("RSVP.invite.prompt")}</Typography>
          <TextField
            fullWidth
            placeholder={lang("RSVP.invite.placeholder")}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={inputSx}
          />
        </Box>
        <Button
          fullWidth
          disableElevation
          onClick={submitCode}
          sx={submitButtonSx}
        >
          {lang("RSVP.invite.submit")}
        </Button>
      </Box>
    </Box>
  );
}
