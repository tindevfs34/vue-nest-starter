# syntax=docker/dockerfile:1
# ==============================================
# Web (NuxtJS 4 SSR) — Multi-stage Dockerfile
# ==============================================

# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app

# ---- Dependencies (postinstall runs "nuxt prepare", do not use --ignore-scripts) ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-audit --no-fund

# ---- Development ----
FROM deps AS development
COPY . .
EXPOSE 3000
CMD ["npx", "nuxt", "dev", "--host", "0.0.0.0"]

# ---- Build ----
FROM deps AS build
COPY . .
# Giữ lại chỉ khi nuxt.config thực sự đọc các biến này lúc build
ARG NUXT_PUBLIC_API_BASE_URL
ARG NUXT_PUBLIC_APP_NAME
RUN npm run build

# ---- Production ----
FROM node:22-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

RUN addgroup -g 1001 -S appgroup && \
  adduser -S appuser -u 1001 -G appgroup

# Nuxt .output is self-contained (Nitro bundles all dependencies)
COPY --from=build --chown=appuser:appgroup /app/.output ./.output

USER appuser
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

CMD ["node", ".output/server/index.mjs"]