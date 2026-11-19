# syntax=docker/dockerfile:1
# ==============================================
# Backend (NestJS) — Multi-stage Dockerfile
# ==============================================
ARG NPM_REGISTRY=https://registry.npmjs.org

# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app

# ---- Dependencies (all deps) ----
FROM base AS deps
ARG NPM_REGISTRY
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-audit --no-fund --registry=${NPM_REGISTRY}

# ---- Development ----
FROM deps AS development
COPY . .
EXPOSE 3002
CMD ["npx", "nodemon"]

# ---- Build ----
FROM deps AS build
COPY . .
RUN npm run build

# ---- Production ----
FROM node:22-alpine AS production
ARG NPM_REGISTRY
ENV NODE_ENV=production
WORKDIR /app

RUN addgroup -g 1001 -S appgroup && \
  adduser -S appuser -u 1001 -G appgroup

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm ci --omit=dev --no-audit --no-fund --registry=${NPM_REGISTRY}

COPY --from=build /app/dist ./dist

RUN mkdir -p logs && chown appuser:appgroup logs

USER appuser
EXPOSE 3002

HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3002/api/v1/health || exit 1

CMD ["node", "dist/main.js"]