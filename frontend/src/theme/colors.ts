// The site palette, extracted from travelAndStay.tsx so every page draws from
// the same swatches instead of re-declaring near-miss hex values.
export const OLIVE = "#4f5233";
export const BORDER = "#c8c9b8";
export const CREAM = "#f5f0e8";
export const GOLD = "#c9bb8e";
// Gold reads as washed-out on the cream cards, so accents inside a card use
// this darker mix instead.
export const GOLD_DARK = "#9a8b57";
export const DARK_OLIVE = "#2f3a2b";
// The olive the marble background falls back to while it loads.
export const PAGE_BG = "#6a6b4a";
// Laid over the marble so cream text keeps roughly the contrast it had on
// plain PAGE_BG (bare marble drops to ~1.5:1 in its lightest patches).
export const MARBLE_TINT = "rgba(79, 82, 51, 0.6)";
// Hover shade for solid-olive buttons (from the Travel & Stay "Book" button).
export const OLIVE_HOVER = "#3d402a";
