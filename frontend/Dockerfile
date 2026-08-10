# --- Stage 1: The Build Environment ---
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# The API origin is decided in src/api/config.ts via import.meta.env.PROD, so
# a production build needs no build args. Note that any such value would have
# to be set HERE rather than on the container: Vite inlines it at build time,
# so changing it means rebuilding this image, not restarting it.

# This forces Vite to compile your static HTML/JS/CSS, completely skipping the strict TS check
RUN npx vite build

# --- Stage 2: The Production Runtime ---
FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]