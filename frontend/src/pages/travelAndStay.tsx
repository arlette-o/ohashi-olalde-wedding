import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Grid, IconButton, Link, Typography } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HotelIcon from "@mui/icons-material/Hotel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlaceIcon from "@mui/icons-material/Place";
import { useLanguage } from "../context/languageContext";
import {
  BORDER,
  CREAM,
  DARK_OLIVE,
  GOLD,
  GOLD_DARK,
  OLIVE,
  OLIVE_HOVER,
  PAGE_BG,
} from "../theme/colors";

const COORDS = "32.5165,-116.9725";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${COORDS}`;
const WAZE_URL = `https://waze.com/ul?ll=${COORDS}&navigate=yes`;
const PHONE = "+526646479294";

interface Hotel {
  name: string;
  area: string;
  pricePerNight: string;
  distanceToVenue: string;
  bookingUrl?: string;
  img?: string;
}

// Hotel recommendations go here as they're confirmed — each entry becomes a
// card in the Stay section. While empty, a "coming soon" note renders instead.
const hotels: Hotel[] = [];

// The two illustrated guides the maps below were cropped out of. Linked at the
// end of each section for anyone who wants the whole poster.
const FULL_GUIDES = {
  gettingThere: "/travel/getting-there.png",
  finalMiles: "/travel/finding-the-hacienda.png",
};

// The nav in home.tsx is `position="fixed"`, so it doesn't take part in layout —
// the jump bar has to be told where its underside is, and anchors have to clear
// both bars or the heading you jumped to lands behind them.
const NAV_H = { xs: 64, md: 72 };
const JUMP_BAR_H = 52;

/**
 * Where a jumped-to heading comes to rest, measured from the top of the
 * viewport. Both `scrollMarginTop` and the scroll-spy read from this: they have
 * to agree, or the section you just jumped to lands below the spy's line, fails
 * its test, and the *previous* pill stays lit.
 */
const ANCHOR_OFFSET_PX = {
  xs: NAV_H.xs + JUMP_BAR_H + 16,
  md: NAV_H.md + JUMP_BAR_H + 20,
};
const ANCHOR_OFFSET = {
  xs: `${ANCHOR_OFFSET_PX.xs}px`,
  md: `${ANCHOR_OFFSET_PX.md}px`,
};

/** MUI's `md` breakpoint, so the spy can pick the matching offset above. */
const MD_QUERY = "(min-width:900px)";

/**
 * The jump targets, in page order. Labels come from `TravelandStay.jumpTo`.
 * Shuttles has no pill of its own: it now sits near the top inside Getting
 * There, so a pill for it would stay lit through the maps, drive times and
 * border tips that follow it — mislabelling most of that section.
 */
const SECTIONS = [
  "gettingThere",
  "finalMiles",
  "turnByTurn",
  "stay",
  "directions",
] as const;

const smoothly = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

interface JumpItem {
  id: string;
  label: string;
}

/**
 * The pill bar. Sits inline under the page subtitle, then parks below the nav
 * once you scroll past it, so it's reachable from anywhere on a very long page
 * The active pill tracks whatever you're currently reading; on phones the row
 * scrolls sideways and keeps that pill in view.
 */
const JumpBar = ({ items, label }: { items: JumpItem[]; label: string }) => {
  const [active, setActive] = useState(items[0].id);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const sync = () => {
      // Built from the same number `scrollMarginTop` uses, so a heading that a
      // jump has parked always counts as arrived. Measuring the bar's underside
      // instead would put this line *above* that resting place and leave the
      // previous pill lit. The slack absorbs fractional scroll offsets and
      // smooth scrolls that stop a pixel or two short — landing exactly on the
      // boundary would otherwise flip the highlight back by one.
      const offset = window.matchMedia(MD_QUERY).matches
        ? ANCHOR_OFFSET_PX.md
        : ANCHOR_OFFSET_PX.xs;
      const line = offset + 24;
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      // The venue block sits above the page's bottom padding, so it can never
      // reach the line however far you scroll — near the end of the page it is
      // by definition what you're looking at. The tolerance is loose because
      // momentum scrolling routinely stops a few pixels short.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 64;
      setActive(atBottom ? items[items.length - 1].id : current);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [items]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const pill = pillRefs.current[active];
    if (!scroller || !pill) return;
    // Centring only means anything when the row overflows, i.e. on phones —
    // otherwise scrollLeft is pinned at 0 and this is busywork. Skipping it
    // also avoids firing a redundant scroll request while the page may still
    // be mid-jump from the click that changed `active`.
    if (scroller.scrollWidth <= scroller.clientWidth) return;
    // Driving the scroller directly rather than scrollIntoView, so centring a
    // pill can never nudge the page itself.
    scroller.scrollTo({
      left: Math.max(
        0,
        pill.offsetLeft - (scroller.clientWidth - pill.offsetWidth) / 2
      ),
      behavior: smoothly(),
    });
  }, [active]);

  return (
    <Box
      component="nav"
      aria-label={label}
      sx={{
        position: "sticky",
        top: { xs: `${NAV_H.xs}px`, md: `${NAV_H.md}px` },
        // Below the AppBar's z-index (1100) so the nav always wins.
        zIndex: 5,
        mb: { xs: 4, md: 5 },
        py: 1,
        borderRadius: "999px",
        border: "1px solid rgba(245,240,232,0.22)",
        bgcolor: "rgba(63,66,40,0.86)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box
        ref={scrollerRef}
        sx={{
          position: "relative",
          display: "flex",
          gap: { xs: 1, md: 1.25 },
          justifyContent: { xs: "flex-start", md: "center" },
          overflowX: "auto",
          px: { xs: 1.5, md: 2 },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          // Fade the ends on phones so it reads as scrollable rather than as a
          // row that happens to be cut off.
          maskImage: {
            xs: "linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)",
            md: "none",
          },
        }}
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <Box
              key={item.id}
              component="button"
              ref={(el: HTMLElement | null) => {
                pillRefs.current[item.id] = el;
              }}
              onClick={() =>
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: smoothly(), block: "start" })
              }
              aria-current={isActive ? "true" : undefined}
              sx={{
                flexShrink: 0,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "'Cormorant SC', serif",
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                letterSpacing: "0.08em",
                px: { xs: 1.75, md: 2.25 },
                py: 0.75,
                borderRadius: "999px",
                transition: "background-color 0.25s ease, color 0.25s ease",
                border: `1px solid ${
                  isActive ? GOLD : "rgba(245,240,232,0.24)"
                }`,
                bgcolor: isActive ? GOLD : "transparent",
                color: isActive ? DARK_OLIVE : "rgba(245,240,232,0.88)",
                "&:hover": {
                  bgcolor: isActive ? GOLD : "rgba(245,240,232,0.12)",
                  color: isActive ? DARK_OLIVE : CREAM,
                },
              }}
            >
              {item.label}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

/** Quiet round button that fades in once the page has scrolled a fair way. */
const BackToTop = ({ label }: { label: string }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const sync = () => setShow(window.scrollY > 900);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  const toTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: smoothly() }),
    []
  );

  return (
    <IconButton
      onClick={toTop}
      aria-label={label}
      title={label}
      sx={{
        position: "fixed",
        right: { xs: 16, md: 28 },
        bottom: "calc(16px + env(safe-area-inset-bottom))",
        zIndex: 5,
        width: 44,
        height: 44,
        color: GOLD,
        border: `1px solid ${GOLD}`,
        bgcolor: "rgba(47,58,43,0.85)",
        backdropFilter: "blur(8px)",
        opacity: show ? 1 : 0,
        // Invisible is also untappable, so it can't swallow clicks when hidden.
        pointerEvents: show ? "auto" : "none",
        transition: "opacity 0.3s ease",
        "&:hover": { bgcolor: DARK_OLIVE },
      }}
    >
      <KeyboardArrowUpIcon />
    </IconButton>
  );
};

/** Big cream heading that sits directly on the olive page background. */
const SectionHeading = ({
  id,
  title,
  subtitle,
}: {
  /** Jump-bar anchor. Offset so the heading clears the nav and the jump bar. */
  id: string;
  title: string;
  subtitle: string;
}) => (
  <Box id={id} sx={{ textAlign: "center", scrollMarginTop: ANCHOR_OFFSET }}>
    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: { xs: "2rem", md: "2.8rem" },
        color: CREAM,
        letterSpacing: "0.08em",
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: { xs: "1.05rem", md: "1.25rem" },
        color: GOLD,
        mt: 0.5,
      }}
    >
      {subtitle}
    </Typography>
  </Box>
);

/** Cream panel — the base surface for every block of content on the page. */
const Card = ({
  children,
  sx = {},
}: {
  children: React.ReactNode;
  sx?: object;
}) => (
  <Box
    sx={{
      border: `8px solid ${BORDER}`,
      borderRadius: "24px",
      bgcolor: CREAM,
      height: "100%",
      ...sx,
    }}
  >
    {children}
  </Box>
);

/** Heading used inside a cream card. */
const CardHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <Box sx={{ textAlign: "center", mb: { xs: 2, md: 3 } }}>
    <Typography
      sx={{
        fontFamily: "'Cormorant SC', serif",
        fontWeight: 400,
        fontSize: { xs: "1.3rem", md: "1.7rem" },
        color: OLIVE,
        letterSpacing: "0.08em",
      }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: { xs: "1rem", md: "1.1rem" },
          color: GOLD_DARK,
          mt: 0.5,
        }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

/**
 * A map panel. The artwork is drawn for a wide canvas, so on phones the image
 * keeps a readable intrinsic width and the card scrolls sideways instead of
 * shrinking the labels into nothing. Tapping opens the full-resolution file.
 */
const MapCard = ({
  title,
  subtitle,
  src,
  hint,
  width,
  height,
}: {
  title: string;
  subtitle: string;
  src: string;
  hint: string;
  /** Intrinsic size of the artwork, so lazy loading doesn't shift the page. */
  width: number;
  height: number;
}) => (
  <Card sx={{ p: { xs: 2, md: 3.5 } }}>
    <CardHeading title={title} subtitle={subtitle} />
    <Box sx={{ overflowX: "auto", borderRadius: "12px" }}>
      <Box
        component="a"
        href={src}
        target="_blank"
        rel="noopener"
        sx={{
          display: "block",
          lineHeight: 0,
          minWidth: { xs: 760, sm: "100%" },
        }}
      >
        <Box
          component="img"
          src={src}
          alt={title}
          loading="lazy"
          width={width}
          height={height}
          sx={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>
    </Box>
    <Typography
      sx={{
        textAlign: "center",
        mt: 1.5,
        fontSize: "0.9rem",
        fontStyle: "italic",
        color: GOLD_DARK,
      }}
    >
      {hint}
    </Typography>
  </Card>
);

/** Cream card with an icon header — used for shuttle info and coming-soon notes. */
const NoteCard = ({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) => (
  <Card
    sx={{
      p: { xs: 2.5, md: 4 },
      display: "flex",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Box
      sx={{
        bgcolor: "rgba(79,82,51,0.12)",
        borderRadius: "50%",
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography
        sx={{ fontWeight: 700, color: OLIVE, fontSize: "1.1rem", mb: 0.5 }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: OLIVE, fontSize: "1.05rem", lineHeight: 1.7 }}>
        {body}
      </Typography>
    </Box>
  </Card>
);

/** Quiet link back to the original illustrated poster. */
const FullGuideLink = ({ href, label }: { href: string; label: string }) => (
  <Box sx={{ textAlign: "center" }}>
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      underline="hover"
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontSize: { xs: "1rem", md: "1.1rem" },
        color: GOLD,
      }}
    >
      {label}
    </Link>
  </Box>
);

interface Fact {
  value: string;
  label: string;
}
interface DistanceRow {
  from: string;
  note: string;
  distance: string;
  time: string;
}
interface Tip {
  lead: string;
  body: string;
}
interface StreetName {
  term: string;
  gloss: string;
}
interface Route {
  title: string;
  subtitle: string;
  steps: string[];
}

export default function TravelAndStay() {
  const { lang, language } = useLanguage();

  const facts: Fact[] = lang("TravelandStay.gettingThere.facts");
  const distanceRows: DistanceRow[] = lang(
    "TravelandStay.gettingThere.distance.rows"
  );
  const tips: Tip[] = lang("TravelandStay.gettingThere.crossing.tips");
  const streetNames: StreetName[] = lang(
    "TravelandStay.finalMiles.streetNames.items"
  );
  const routes: Route[] = lang("TravelandStay.finalMiles.turnByTurn.routes");
  const mapHint = lang("TravelandStay.mapHint");
  const fullGuideLabel = lang("TravelandStay.fullGuide");

  // Rebuilt on a language switch so the pills re-label themselves.
  const jumpItems: JumpItem[] = useMemo(
    () =>
      SECTIONS.map((key) => ({
        id: key,
        label: lang(`TravelandStay.jumpTo.${key}`),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: PAGE_BG,
        px: { xs: 2, sm: 3, md: 6 },
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 10 },
      }}
    >
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: { xs: "2.4rem", md: "3.5rem" },
            color: CREAM,
            letterSpacing: "0.08em",
            textAlign: "center",
          }}
        >
          {lang("TravelandStay.title")}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: { xs: "1.1rem", md: "1.35rem" },
            color: GOLD,
            textAlign: "center",
            mt: 1,
            mb: { xs: 3, md: 4 },
          }}
        >
          {lang("TravelandStay.subtitle")}
        </Typography>

        <JumpBar items={jumpItems} label={lang("TravelandStay.jumpTo.label")} />

        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* ---------------- Getting there ---------------- */}
          <Grid size={12}>
            <SectionHeading
              id="gettingThere"
              title={lang("TravelandStay.gettingThere.title")}
              subtitle={lang("TravelandStay.gettingThere.subtitle")}
            />
          </Grid>

          {/* The three things most guests want to know up front */}
          <Grid size={12}>
            <Card
              sx={{
                p: { xs: 2.5, md: 3.5 },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: { xs: 2.5, sm: 0 },
              }}
            >
              {facts.map((fact, i) => (
                <Box
                  key={fact.value}
                  sx={{
                    textAlign: "center",
                    px: { sm: 2 },
                    borderLeft: {
                      xs: "none",
                      sm: i === 0 ? "none" : `1px solid ${BORDER}`,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: { xs: "1.5rem", md: "1.8rem" },
                      color: GOLD_DARK,
                    }}
                  >
                    {fact.value}
                  </Typography>
                  <Typography
                    sx={{ color: OLIVE, fontSize: "1rem", mt: 0.5 }}
                  >
                    {fact.label}
                  </Typography>
                </Box>
              ))}
            </Card>
          </Grid>

          {/* Sits up here rather than further down: guests planning how they'll
              get to the venue want to know a shuttle exists before they start
              reading maps and drive times. */}
          <Grid size={12}>
            <NoteCard
              icon={<DirectionsBusIcon sx={{ color: OLIVE, fontSize: 24 }} />}
              title={lang("TravelandStay.shuttle.title")}
              body={lang("TravelandStay.shuttle.description")}
            />
          </Grid>

          <Grid size={12}>
            <MapCard
              title={lang("TravelandStay.gettingThere.bigPicture.title")}
              subtitle={lang("TravelandStay.gettingThere.bigPicture.subtitle")}
              src="/travel/map-region.png"
              hint={mapHint}
              width={1800}
              height={1594}
            />
          </Grid>

          {/* Distance & drive time — real text, so it reflows on a phone */}
          <Grid size={12}>
            <Card sx={{ p: { xs: 2.5, md: 4 } }}>
              <CardHeading
                title={lang("TravelandStay.gettingThere.distance.title")}
                subtitle={lang("TravelandStay.gettingThere.distance.subtitle")}
              />
              <Box
                sx={{
                  display: { xs: "none", md: "grid" },
                  gridTemplateColumns: "1.6fr 1fr 1fr",
                  gap: 2,
                  pb: 1,
                  borderBottom: `1px solid ${BORDER}`,
                }}
              >
                {[
                  lang("TravelandStay.gettingThere.distance.headings.start"),
                  lang("TravelandStay.gettingThere.distance.headings.distance"),
                  lang("TravelandStay.gettingThere.distance.headings.time"),
                ].map((heading) => (
                  <Typography
                    key={heading}
                    sx={{
                      fontFamily: "'Cormorant SC', serif",
                      fontSize: "1rem",
                      letterSpacing: "0.12em",
                      color: GOLD_DARK,
                    }}
                  >
                    {heading}
                  </Typography>
                ))}
              </Box>

              {distanceRows.map((row, i) => (
                <Box
                  key={row.from}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1.6fr 1fr 1fr" },
                    gap: { xs: 0.5, md: 2 },
                    alignItems: "baseline",
                    py: { xs: 2, md: 2.25 },
                    borderTop: i === 0 ? "none" : `1px solid ${BORDER}`,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: { xs: "1.25rem", md: "1.35rem" },
                        color: OLIVE,
                      }}
                    >
                      {row.from}
                    </Typography>
                    <Typography
                      sx={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "rgba(79,82,51,0.7)",
                      }}
                    >
                      {row.note}
                    </Typography>
                  </Box>
                  {/* On phones these two sit side by side under the name */}
                  <Box
                    sx={{
                      display: { xs: "flex", md: "contents" },
                      gap: 1.5,
                      alignItems: "baseline",
                      mt: { xs: 0.75, md: 0 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: GOLD_DARK,
                      }}
                    >
                      {row.distance}
                    </Typography>
                    <Typography sx={{ fontSize: "1.05rem", color: OLIVE }}>
                      {row.time}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Typography
                sx={{
                  mt: 2,
                  textAlign: "center",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "rgba(79,82,51,0.7)",
                }}
              >
                {lang("TravelandStay.gettingThere.distance.footnote")}
              </Typography>
            </Card>
          </Grid>

          {/* Crossing the border */}
          <Grid size={12}>
            <Card sx={{ p: { xs: 2.5, md: 4 } }}>
              <CardHeading
                title={lang("TravelandStay.gettingThere.crossing.title")}
                subtitle={lang("TravelandStay.gettingThere.crossing.subtitle")}
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  columnGap: 4,
                  rowGap: { xs: 2.5, md: 3 },
                }}
              >
                {tips.map((tip) => (
                  <Box
                    key={tip.lead}
                    sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                  >
                    <Box
                      sx={{
                        width: 9,
                        height: 9,
                        mt: "0.55em",
                        flexShrink: 0,
                        bgcolor: GOLD_DARK,
                        transform: "rotate(45deg)",
                      }}
                    />
                    <Typography
                      sx={{
                        color: OLIVE,
                        fontSize: { xs: "1.05rem", md: "1.1rem" },
                        lineHeight: 1.7,
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        {tip.lead}
                      </Box>{" "}
                      {tip.body}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          <Grid size={12}>
            <FullGuideLink
              href={FULL_GUIDES.gettingThere}
              label={fullGuideLabel}
            />
          </Grid>

          {/* ---------------- The final miles ---------------- */}
          <Grid size={12}>
            <SectionHeading
              id="finalMiles"
              title={lang("TravelandStay.finalMiles.title")}
              subtitle={lang("TravelandStay.finalMiles.subtitle")}
            />
          </Grid>

          <Grid size={12}>
            <MapCard
              title={lang("TravelandStay.finalMiles.airport.title")}
              subtitle={lang("TravelandStay.finalMiles.airport.subtitle")}
              src="/travel/map-airport.png"
              hint={mapHint}
              width={1800}
              height={1269}
            />
          </Grid>

          <Grid size={12}>
            <Card
              sx={{
                p: { xs: 2.5, md: 3.5 },
                border: `2px solid ${GOLD}`,
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: "1.05rem",
                  letterSpacing: "0.14em",
                  color: GOLD_DARK,
                  mb: 1,
                }}
              >
                {lang("TravelandStay.finalMiles.pleaseNote.title")}
              </Typography>
              <Typography
                sx={{
                  color: OLIVE,
                  fontSize: { xs: "1.05rem", md: "1.1rem" },
                  lineHeight: 1.75,
                }}
              >
                {lang("TravelandStay.finalMiles.pleaseNote.body")}
              </Typography>
            </Card>
          </Grid>

          <Grid size={12}>
            <MapCard
              title={lang("TravelandStay.finalMiles.landmarks.title")}
              subtitle={lang("TravelandStay.finalMiles.landmarks.subtitle")}
              src="/travel/map-landmarks.png"
              hint={mapHint}
              width={1800}
              height={889}
            />
          </Grid>

          {/* Little glossary for the Spanish road signs on the maps */}
          <Grid size={12}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  color: GOLD,
                  mb: 1,
                }}
              >
                {lang("TravelandStay.finalMiles.streetNames.intro")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  columnGap: 3,
                  rowGap: 1,
                }}
              >
                {streetNames.map((street) => (
                  <Typography
                    key={street.term}
                    sx={{ color: CREAM, fontSize: "1rem" }}
                  >
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      {street.term}
                    </Box>{" "}
                    · {street.gloss}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Turn by turn */}
          <Grid size={12}>
            <SectionHeading
              id="turnByTurn"
              title={lang("TravelandStay.finalMiles.turnByTurn.title")}
              subtitle={lang("TravelandStay.finalMiles.turnByTurn.subtitle")}
            />
          </Grid>

          {routes.map((route) => (
            <Grid key={route.title} size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <CardHeading title={route.title} subtitle={route.subtitle} />
                <Box
                  component="ol"
                  sx={{
                    listStyle: "none",
                    counterReset: "step",
                    m: 0,
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {route.steps.map((step) => (
                    <Box
                      key={step}
                      component="li"
                      sx={{
                        counterIncrement: "step",
                        display: "flex",
                        gap: 1.5,
                        color: OLIVE,
                        fontSize: { xs: "1.05rem", md: "1.1rem" },
                        lineHeight: 1.7,
                        "&::before": {
                          content: 'counter(step) "."',
                          color: GOLD_DARK,
                          fontWeight: 700,
                          flexShrink: 0,
                        },
                      }}
                    >
                      {step}
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}

          <Grid size={12}>
            <FullGuideLink
              href={FULL_GUIDES.finalMiles}
              label={fullGuideLabel}
            />
          </Grid>

          {/* ---------------- Where to stay ---------------- */}
          <Grid size={12}>
            <SectionHeading
              id="stay"
              title={lang("TravelandStay.stay.title")}
              subtitle={lang("TravelandStay.stay.subtitle")}
            />
          </Grid>

          {hotels.length === 0 ? (
            <Grid size={12}>
              <NoteCard
                icon={<HotelIcon sx={{ color: OLIVE, fontSize: 24 }} />}
                title={lang("TravelandStay.stay.comingSoonTitle")}
                body={lang("TravelandStay.stay.comingSoon")}
              />
            </Grid>
          ) : (
            hotels.map((hotel) => (
              <Grid key={hotel.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {hotel.img && (
                    <Box
                      component="img"
                      src={hotel.img}
                      alt={hotel.name}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Cormorant SC', serif",
                        fontSize: "1.25rem",
                        color: OLIVE,
                      }}
                    >
                      {hotel.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PlaceIcon sx={{ color: OLIVE, fontSize: 18 }} />
                      <Typography sx={{ color: OLIVE, fontSize: "1rem" }}>
                        {hotel.area} · {hotel.distanceToVenue}{" "}
                        {lang("TravelandStay.stay.distanceToVenue")}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: OLIVE, fontSize: "1.05rem" }}>
                      {hotel.pricePerNight}{" "}
                      {lang("TravelandStay.stay.perNight")}
                    </Typography>
                    {hotel.bookingUrl && (
                      <Button
                        href={hotel.bookingUrl}
                        target="_blank"
                        rel="noopener"
                        sx={{
                          mt: "auto",
                          alignSelf: "flex-start",
                          color: CREAM,
                          bgcolor: OLIVE,
                          px: 3,
                          borderRadius: "999px",
                          "&:hover": { bgcolor: OLIVE_HOVER },
                        }}
                      >
                        {lang("TravelandStay.stay.bookNow")}
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))
          )}

          {/* ---------------- Venue address ---------------- */}
          <Grid
            size={12}
            id="directions"
            sx={{ scrollMarginTop: ANCHOR_OFFSET }}
          >
            <Box
              sx={{
                borderRadius: "24px",
                bgcolor: DARK_OLIVE,
                p: { xs: 3, md: 5 },
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: { xs: "1.15rem", md: "1.4rem" },
                  color: GOLD,
                }}
              >
                {lang("TravelandStay.venue.eyebrow")}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  letterSpacing: "0.06em",
                  color: CREAM,
                  mt: 1,
                }}
              >
                {lang("TravelandStay.venue.name")}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(245,240,232,0.85)",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  mt: 1,
                }}
              >
                {lang("TravelandStay.venue.address")}
              </Typography>
              <Typography
                sx={{ color: GOLD, fontSize: "1.05rem", mt: 0.5 }}
              >
                {lang("TravelandStay.venue.coordinates")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Button
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener"
                  startIcon={<PlaceIcon />}
                  sx={{
                    color: DARK_OLIVE,
                    bgcolor: GOLD,
                    px: 3,
                    borderRadius: "999px",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#d8cba2" },
                  }}
                >
                  {lang("TravelandStay.venue.googleMaps")}
                </Button>
                <Button
                  href={WAZE_URL}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: CREAM,
                    border: `1px solid ${GOLD}`,
                    px: 3,
                    borderRadius: "999px",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "rgba(201,187,142,0.15)" },
                  }}
                >
                  {lang("TravelandStay.venue.waze")}
                </Button>
              </Box>
              <Link
                href={`tel:${PHONE}`}
                underline="hover"
                sx={{
                  display: "inline-block",
                  mt: 2.5,
                  color: GOLD,
                  fontSize: "1.05rem",
                }}
              >
                {lang("TravelandStay.venue.phone")}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <BackToTop label={lang("TravelandStay.jumpTo.backToTop")} />
    </Box>
  );
}
