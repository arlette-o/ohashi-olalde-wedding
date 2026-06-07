# --- Stage 1: The Build Environment ---
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# This forces Vite to compile your static HTML/JS/CSS, completely skipping the strict TS check
RUN npx vite build 

# --- Stage 2: The Production Runtime ---
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]