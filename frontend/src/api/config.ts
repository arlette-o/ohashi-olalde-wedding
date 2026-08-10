// Single source of truth for where the API lives.
//
// Vite inlines `import.meta.env` at BUILD time, so this value is baked into
// the bundle by `vite build` — it is not read at runtime. The build arg is
// plumbed through frontend/Dockerfile and docker-compose.yml.
//
//   production : VITE_API_BASE_URL=https://api.arlettetakawedding.com
//   dev/local  : unset -> "" -> relative paths, which the Vite dev server
//                proxies to the local backend (see vite.config.ts)
//
// Keeping the empty-string default means dev stays same-origin and needs no
// CORS handling at all; only production goes cross-origin.
// The "if production use production, else localhost" rule. `import.meta.env.PROD`
// is true for `vite build` and false for `vite dev`, and Vite resolves it at
// build time — so the dev branch is not merely unused in the production
// bundle, it is compiled out of it.
//
// Dev stays "" (relative) on purpose: relative URLs go through the dev-server
// proxy in vite.config.ts, which keeps local requests same-origin and means
// CORS never applies while developing.
const DEFAULT_BASE = import.meta.env.PROD
  ? "https://api.arlettetakawedding.com"
  : "";

// The env var is an optional override for the default above — useful for a
// preview deploy or to point a local build at the real API. Nothing needs to
// set it for normal production builds.
const RAW_BASE = import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE;

// A trailing slash here would produce "//api/..." after joining. Cheap to
// tolerate rather than depend on whoever sets the env var getting it right.
export const API_BASE = RAW_BASE.replace(/\/+$/, "");

/**
 * Joins the API origin to a root-relative path.
 * `apiUrl("/api/email/submission")` ->
 *   dev:  "/api/email/submission"                (proxied to localhost:3001)
 *   prod: "https://api.arlettetakawedding.com/api/email/submission"
 */
export const apiUrl = (path: string) => `${API_BASE}${path}`;

// Logged once at startup so the deployed bundle states which API origin it was
// built against. A stale image pointing at the wrong host is otherwise
// invisible from the browser.
console.log("[apiConfig] API base:", API_BASE || "(same-origin, relative)");
