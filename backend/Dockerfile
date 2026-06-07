FROM node:22-alpine
WORKDIR /app

# Install your dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy over your source files
COPY . .

EXPOSE 3000

# Execute using tsx to naturally resolve ESM .js extensions back to .ts
CMD ["npx", "tsx", "src/index.ts"]