# Arlette & Taka — Wedding Site

The site behind [arlettetakawedding.com](https://arlettetakawedding.com).

| Folder      | What it is                                                        |
| ----------- | ----------------------------------------------------------------- |
| `frontend/` | React + TypeScript + Vite + MUI. Built and served by nginx.       |
| `backend/`  | Express API (guests / RSVPs in MongoDB, email via Resend).        |
| `caddy/`    | Production reverse proxy with automatic HTTPS.                    |

```
browser ──► caddy ──┬── /api/*  ──► backend:3000  (Express)
                    └── else    ──► ui:80         (nginx, built frontend)
```

## Running locally with Docker

This runs the same containers as production, minus HTTPS.

**1. Secrets.** Create `.env` in the repo root (it's gitignored):

```
MONGO_USER=...
MONGO_PASSWORD=...
MONGO_URL=...
RESEND_API=...
```

**2. Local override.** Create `docker-compose.override.yml` in the repo root.
It's gitignored on purpose: Compose merges it automatically, and committing it
once made production serve plain HTTP. It swaps in `Caddyfile.dev` (port 80, no
TLS) so Caddy doesn't try to get real certificates on your machine:

```yaml
services:
  caddy:
    ports:
      - "80:80"
    volumes:
      - ./Caddyfile.dev:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
```

**3. Run it** from the repo root:

```sh
docker compose up --build        # build and start; open http://localhost
docker compose up --build -d     # same, in the background
docker compose logs -f backend   # follow one service's logs
docker compose down              # stop everything
```

Rebuild (`--build`) after any code change — the frontend is compiled into the
image, so there is no hot reload under Docker.

> **Forms won't work under Docker locally.** A production build always points at
> `https://api.arlettetakawedding.com` (see `frontend/src/api/config.ts`), and that
> API's CORS allowlist doesn't include `http://localhost`. Pages render fine;
> RSVP and question submissions fail. Use the dev servers below to test those.

## Running locally without Docker (for development)

Hot reload, and forms talk to your local backend.

```sh
# Terminal 1 — API on :3001 (reads backend/.env, same keys as above)
cd backend && npm install && npm run dev

# Terminal 2 — site on http://localhost:3000, proxies /api to :3001
cd frontend && npm install && npm run dev
```

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which deploys to the EC2
host. `.github/workflows/diagnose.yml` can be run by hand to inspect that host.

## Photos

Keep photos small — they're the bulk of every page load.

- **Full-size originals** live in `frontend/photo-originals/` (excluded from the
  Docker build, never deployed).
- **What the site serves** lives in `frontend/public/`: mosaic photos resized to
  1200px on the long side, the large story photos to 2000px.

Adding a photo to the Our Story mosaic:

```sh
cd frontend
cp ~/Downloads/NewPhoto.jpeg photo-originals/mosaicpics/
sips -Z 1200 -s format jpeg -s formatOptions 80 \
  photo-originals/mosaicpics/NewPhoto.jpeg --out public/mosaicpics/NewPhoto.jpeg
python3 src/scripts/imageList.py   # regenerates src/assets/imageList.ts
```

The script keeps any hand-tuned `rows`/`cols` and titles, and records each
photo's size so the layout doesn't jump while images load. Captions go in the
translation files under `OurStory.mosaic`, keyed by filename.

Images are cached by browsers for 30 days (`frontend/nginx.conf`), so to replace
a photo give the new one a **new filename** — otherwise returning visitors may
keep seeing the old one.
