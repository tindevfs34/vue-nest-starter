# ==============================================
# CMS (VueJS 3 + Vite) — Multi-stage Dockerfile
# ==============================================

# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app
# Skip downloading the Cypress binary (~500MB) — e2e tests are not run inside containers
ENV CYPRESS_INSTALL_BINARY=0

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm-cms npm ci --no-audit --no-fund && npm cache clean --force

# ---- Development ----
FROM base AS development
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm-cms npm ci --no-audit --no-fund
COPY . .
# vite.config.ts has server.open=true -> disable auto-opening a browser inside the container
ENV BROWSER=none
EXPOSE 5173
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "5173"]

# ---- Build ----
FROM deps AS build
COPY . .

# Vite bakes VITE_* variables into the bundle at build time
ARG VITE_BASE_URL=/
ARG VITE_BASE_API
ARG VITE_BASE_API_CLOUD
ARG VITE_WEB_URL
ENV VITE_BASE_URL=$VITE_BASE_URL \
    VITE_BASE_API=$VITE_BASE_API \
    VITE_BASE_API_CLOUD=$VITE_BASE_API_CLOUD \
    VITE_WEB_URL=$VITE_WEB_URL

RUN npm run build

# ---- Production (static files served by Nginx) ----
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

