import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Avatar,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { getAllGuests, type Guest } from "../api/guestAPI";

const CREAM = "#f5f0e8";
const GOLD = "#c9bb8e";
const DARK = "#1a1612";
const DARK2 = "#252019";
const MUTED = "#7a7060";

type SortKey = "name" | "allowed_invitees" | "guests_accepted" | "attending";

function getInitials(fname: string, lname: string) {
  return `${fname[0]}${lname[0]}`.toUpperCase();
}

function avatarColor(name: string) {
  const colors = ["#8b7355", "#6b8b6b", "#7a6b8b", "#8b6b6b", "#6b7a8b"];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function GuestTable() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    getAllGuests()
      .then(setGuests)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: DARK,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: GOLD }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ bgcolor: DARK, minHeight: "100vh", p: 4 }}>
        <Alert
          severity="error"
          sx={{
            bgcolor: "#2a1a1a",
            color: CREAM,
            "& .MuiAlert-icon": { color: "#e57373" },
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  const totalInvited = guests.reduce((s, g) => s + g.allowed_invitees, 0);
  const totalAccepted = guests.reduce((s, g) => s + g.guests_accepted, 0);
  const attending = guests.filter((g) => g.attending).length;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = guests
    .filter((g) => {
      const q = search.toLowerCase();
      return (
        g.fname.toLowerCase().includes(q) ||
        g.lname.toLowerCase().includes(q) ||
        g.email?.toLowerCase().includes(q) ||
        g.plus.some((p) => p.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      let av: string | number, bv: string | number;
      if (sortKey === "name") {
        av = `${a.lname}${a.fname}`;
        bv = `${b.lname}${b.fname}`;
      } else if (sortKey === "attending") {
        av = a.attending ? 1 : 0;
        bv = b.attending ? 1 : 0;
      } else {
        av = a[sortKey];
        bv = b[sortKey];
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const headCell = (label: string, key: SortKey) => (
    <TableCell sx={{ borderBottom: `1px solid ${GOLD}22`, py: 1.5 }}>
      <TableSortLabel
        active={sortKey === key}
        direction={sortKey === key ? sortDir : "asc"}
        onClick={() => handleSort(key)}
        sx={{
          color: `${GOLD} !important`,
          fontFamily: "'Cormorant SC', serif",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          "& .MuiTableSortLabel-icon": { color: `${GOLD}88 !important` },
        }}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );

  return (
    <Box
      sx={{
        bgcolor: DARK,
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 300,
            color: CREAM,
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          Guest List
        </Typography>
        <Box sx={{ width: 48, height: 1, bgcolor: GOLD, mt: 1.5, mb: 3 }} />

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 4, mb: 3, flexWrap: "wrap" }}>
          {[
            { label: "Total Guests", value: guests.length },
            { label: "Total Invitees", value: totalInvited },
            { label: "Confirmed", value: attending },
            { label: "Seats Accepted", value: totalAccepted },
          ].map(({ label, value }) => (
            <Box key={label}>
              <Typography
                sx={{
                  color: GOLD,
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  color: CREAM,
                  fontSize: "2rem",
                  fontWeight: 300,
                  lineHeight: 1.1,
                }}
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Progress */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography
              sx={{
                color: MUTED,
                fontSize: "0.75rem",
                fontFamily: "'Cormorant SC', serif",
                letterSpacing: "0.1em",
              }}
            >
              RSVP Progress
            </Typography>
            <Typography sx={{ color: GOLD, fontSize: "0.75rem" }}>
              {Math.round((attending / guests.length) * 100)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(attending / guests.length) * 100}
            sx={{
              height: 2,
              bgcolor: `${GOLD}22`,
              "& .MuiLinearProgress-bar": { bgcolor: GOLD },
            }}
          />
        </Box>

        {/* Search */}
        <TextField
          placeholder="Search guests, plus ones, emails…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: MUTED, fontSize: 18 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: { xs: "100%", md: 360 },
            "& .MuiOutlinedInput-root": {
              bgcolor: DARK2,
              color: CREAM,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.95rem",
              "& fieldset": { borderColor: `${GOLD}33` },
              "&:hover fieldset": { borderColor: `${GOLD}66` },
              "&.Mui-focused fieldset": { borderColor: GOLD },
            },
            "& input::placeholder": { color: MUTED, opacity: 1 },
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          bgcolor: "transparent",
          border: `1px solid ${GOLD}22`,
          borderRadius: 1,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: `${GOLD}08` }}>
              <TableCell
                sx={{ borderBottom: `1px solid ${GOLD}22`, py: 1.5, width: 48 }}
              />
              {headCell("Name", "name")}
              <TableCell
                sx={{
                  borderBottom: `1px solid ${GOLD}22`,
                  py: 1.5,
                  color: GOLD,
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Plus Ones
              </TableCell>
              {headCell("Allowed", "allowed_invitees")}
              {headCell("Accepted", "guests_accepted")}
              {headCell("Attending", "attending")}
              <TableCell
                sx={{
                  borderBottom: `1px solid ${GOLD}22`,
                  py: 1.5,
                  color: GOLD,
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Contact
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((guest, i) => {
              const fullName = `${guest.fname} ${guest.lname}`;
              return (
                <TableRow
                  key={i}
                  sx={{
                    "&:hover": { bgcolor: `${GOLD}08` },
                    transition: "background 0.15s",
                    borderBottom: `1px solid ${GOLD}11`,
                  }}
                >
                  <TableCell sx={{ border: "none", py: 1.5, px: 2 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: "0.7rem",
                        bgcolor: avatarColor(fullName),
                        color: CREAM,
                        fontFamily: "'Cormorant SC', serif",
                      }}
                    >
                      {getInitials(guest.fname, guest.lname)}
                    </Avatar>
                  </TableCell>

                  {/* Name */}
                  <TableCell sx={{ border: "none", py: 1.5 }}>
                    <Typography
                      sx={{
                        color: CREAM,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      {fullName}
                    </Typography>
                  </TableCell>

                  {/* Plus ones */}
                  <TableCell sx={{ border: "none", py: 1.5 }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {guest.plus.length === 0 ? (
                        <Typography
                          sx={{
                            color: MUTED,
                            fontSize: "0.8rem",
                            fontStyle: "italic",
                          }}
                        >
                          —
                        </Typography>
                      ) : (
                        guest.plus.map((p) => (
                          <Chip
                            key={p}
                            label={p}
                            size="small"
                            sx={{
                              bgcolor: `${GOLD}18`,
                              color: GOLD,
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "0.75rem",
                              height: 22,
                              border: `1px solid ${GOLD}33`,
                              "& .MuiChip-label": { px: 1 },
                            }}
                          />
                        ))
                      )}
                    </Box>
                  </TableCell>

                  {/* Allowed */}
                  <TableCell sx={{ border: "none", py: 1.5 }}>
                    <Typography
                      sx={{
                        color: CREAM,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                        textAlign: "center",
                      }}
                    >
                      {guest.allowed_invitees}
                    </Typography>
                  </TableCell>

                  {/* Accepted */}
                  <TableCell sx={{ border: "none", py: 1.5 }}>
                    <Typography
                      sx={{
                        color: guest.guests_accepted > 0 ? GOLD : MUTED,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                        textAlign: "center",
                      }}
                    >
                      {guest.guests_accepted}
                    </Typography>
                  </TableCell>

                  {/* Attending */}
                  <TableCell sx={{ border: "none", py: 1.5 }}>
                    {guest.attending ? (
                      <CheckCircleIcon
                        sx={{ color: "#7aad7a", fontSize: 20 }}
                      />
                    ) : (
                      <CancelIcon sx={{ color: `${MUTED}88`, fontSize: 20 }} />
                    )}
                  </TableCell>

                  {/* Contact */}
                  <TableCell sx={{ border: "none", py: 1.5 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {guest.email && (
                        <Tooltip title={guest.email} arrow>
                          <EmailIcon
                            sx={{
                              color: MUTED,
                              fontSize: 18,
                              cursor: "pointer",
                              "&:hover": { color: GOLD },
                            }}
                          />
                        </Tooltip>
                      )}
                      {guest.whatsapp && (
                        <Tooltip title={guest.whatsapp} arrow>
                          <WhatsAppIcon
                            sx={{
                              color: MUTED,
                              fontSize: 18,
                              cursor: "pointer",
                              "&:hover": { color: "#5aad5a" },
                            }}
                          />
                        </Tooltip>
                      )}
                      {!guest.email && !guest.whatsapp && (
                        <Typography
                          sx={{
                            color: MUTED,
                            fontSize: "0.8rem",
                            fontStyle: "italic",
                          }}
                        >
                          —
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        sx={{ color: MUTED, fontSize: "0.75rem", mt: 2, fontStyle: "italic" }}
      >
        {filtered.length} of {guests.length} guests
      </Typography>
    </Box>
  );
}
