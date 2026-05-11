import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import LanguageIcon from "@mui/icons-material/Language";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇲🇽" },
  { code: "jp", label: "日本語", flag: "🇯🇵" },
];

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState("en");

  const open = Boolean(anchorEl);
  const current = languages.find((lang) => lang.code === selected);

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          borderRadius: 999,
          minWidth: 80,
          px: 2,
          py: 1,
          bgcolor: "transparent",
          color: "#ffffff",
          boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
          fontSize: 20,
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        <LanguageIcon sx={{ fontSize: 18 }} />{" "}
        <KeyboardArrowDownIcon sx={{ ml: 0.5, opacity: 0.5 }} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => {
              setSelected(lang.code);
              setAnchorEl(null);
            }}
            sx={{
              py: 1.5,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, fontSize: 22 }}>
              {lang.flag}
            </ListItemIcon>

            <ListItemText>{lang.label}</ListItemText>

            {selected === lang.code && (
              <CheckIcon fontSize="small" color="success" />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
