import { BORDER, CREAM, OLIVE, OLIVE_HOVER } from "../theme/colors";

// Shared look for the invite-code, RSVP, and question forms, matched to the
// cream cards on Travel & Stay (they previously used Georgia and a set of
// off-palette near-miss colors).

/** The cream card a form sits in. */
export const formCardSx = {
  border: `8px solid ${BORDER}`,
  borderRadius: "24px",
  bgcolor: CREAM,
  p: { xs: 3, sm: 5 },
  width: "100%",
  maxWidth: 640,
  display: "flex",
  flexDirection: "column",
  gap: 3.5,
};

export const labelSx = {
  fontWeight: 700,
  fontSize: "1rem",
  color: OLIVE,
  mb: 1,
  display: "block",
};

export const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#fff",
    "& fieldset": { borderColor: BORDER },
    "&:hover fieldset": { borderColor: OLIVE },
    "&.Mui-focused fieldset": { borderColor: OLIVE, borderWidth: 1 },
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    color: OLIVE,
    padding: "14px 16px",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(79,82,51,0.45)",
    opacity: 1,
  },
};

/** Solid olive pill, like the venue "Open in Google Maps" button. */
export const submitButtonSx = {
  backgroundColor: OLIVE,
  color: CREAM,
  fontWeight: 700,
  fontSize: "1rem",
  letterSpacing: "0.04em",
  borderRadius: "999px",
  py: 1.75,
  textTransform: "none",
  "&:hover": { backgroundColor: OLIVE_HOVER },
  mt: 0.5,
};

export const radioSx = {
  color: BORDER,
  "&.Mui-checked": { color: OLIVE },
};

export const radioTextSx = {
  fontSize: "0.95rem",
  color: OLIVE,
};
