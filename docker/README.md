# 🐳 Docker — Affiliate Review Boilerplate

This folder contains the Docker Compose setup for running the whole stack. The `docker-compose.*.yml` files only **orchestrate** the services. Each app's image is built from the `Dockerfile` inside that app's source folder (`backend/`, `cms/`, `web/`).

## 📁 Structure

```text
vue-nest-starter/
├── backend/   Dockerfile, .dockerignore             → NestJS API   (stages: development | production)
├── cms/       Dockerfile, .dockerignore, nginx.conf → Vue 3 + Vite (stages: development | production)
├── web/       Dockerfile, .dockerignore             → Nuxt 4 SSR   (stages: development | production)
└── docker/
    ├── docker-compose.local.yml   # Dev environment (hot reload): mysql, minio, backend, cms, web
    ├── docker-compose.prod.yml    # Production: mysql, backend, cms, web
    ├── .env.local.example         # Env template for local
    ├── .env.prod.example          # Env template for production
    ├── mysql/                     # MySQL config (common.cnf, local.cnf, prod.cnf)
    └── data/                      # Runtime data (backend logs) — not committed
```

---

## 💻 Running LOCAL (development)

> Run every command below **from inside the `docker/` folder**.

### 1. Create the `.env` file

```bash
cd docker
cp .env.local.example .env
```

> [!IMPORTANT]
> The file **must be named `docker/.env`** (next to the compose files) because Compose interpolates `${MYSQL_*}` and `${S3_*}` from it for `mysql` and `minio`, while `backend`/`cms`/`web` also load `./.env`. Never copy `.env` between local and production — service hostnames differ (`mysql` / `backend` in local vs `test-mysql` / `test-backend` in production).

### 2. Build & start

```bash
docker compose -f docker-compose.local.yml up -d --build
```

### 3. Run database migrations & seeds

```bash
docker compose -f docker-compose.local.yml exec backend npm run migration:run
docker compose -f docker-compose.local.yml exec backend npm run seed:run
```

### 4. Access

| Service       | URL                          | Notes                                                                        |
| ------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| Web (Nuxt)    | http://localhost:3000        |                                                                              |
| CMS (Vue)     | http://localhost:5173        |                                                                              |
| Backend API   | http://localhost:3002/api/v1 |                                                                              |
| Swagger       | http://localhost:3002/api    |                                                                              |
| MinIO Console | http://localhost:9001        | user/pass: `minioadmin` / `minioadmin`                                       |
| MySQL         | `localhost:3306`             | app user `review_user` (`DB_PASSWORD`), admin `root` (`MYSQL_ROOT_PASSWORD`) |

### Hot reload

Source code is mounted into the containers (`../backend:/app`, `../cms:/app`, `../web:/app`), so the apps reload automatically when you edit code on the host. `node_modules` lives inside the container (an anonymous volume), so it doesn't conflict with the `node_modules` on your host.

> [!WARNING]
> **After changing `package.json`** (adding or removing packages), you must rebuild **and** recreate the `node_modules` volume. Rebuilding alone keeps the old `node_modules`:
>
> ```bash
> docker compose -f docker-compose.local.yml up -d --build --renew-anon-volumes backend
> ```

### Useful commands

```bash
# Show container status
docker compose -f docker-compose.local.yml ps

# Restart a single service
docker compose -f docker-compose.local.yml restart backend

# Open a shell inside a container
docker compose -f docker-compose.local.yml exec backend sh

# Open the MySQL CLI
docker compose -f docker-compose.local.yml exec mysql mysql -uroot -p

# Run only the infrastructure (mysql + minio) and run the apps with npm on the host
docker compose -f docker-compose.local.yml up -d mysql minio

# Stop everything (keeps data)
docker compose -f docker-compose.local.yml down

# Stop and DELETE MySQL/MinIO data (clean reset)
docker compose -f docker-compose.local.yml down -v
```

> [!TIP]
> If you run only `mysql` + `minio` in Docker and start the apps with `npm run ...` on the host, each app's `.env` must use `localhost` (`DB_HOST=localhost`, `S3_ENDPOINT=http://localhost:9000`).

---

## 🚀 Running PRODUCTION

`docker-compose.prod.yml` runs **test-mysql**, **test-backend**, **test-cms** (Nginx static SPA), and **test-web** (Nuxt 4 SSR). Service names are prefixed with `test-` so they never collide with other projects sharing the external `shared-gateway` network.

No service publishes host ports directly; `test-backend`, `test-cms`, and `test-web` join `shared-gateway` so your reverse proxy (Nginx / Traefik / Caddy...) routes traffic to them:

| Service        | Upstream (on `shared-gateway`) | Notes                                                 |
| -------------- | ------------------------------ | ----------------------------------------------------- |
| Backend API    | `test-backend:3002`            | Also on `app-network` (reaches `test-mysql`)          |
| CMS (Vue)      | `test-cms:80`                  | Static files served by Nginx                          |
| Web (Nuxt SSR) | `test-web:3000`                | Also on `app-network` (SSR calls `test-backend:3002`) |

### 1. Create the network shared with the reverse proxy (one-time)

```bash
docker network create shared-gateway
```

### 2. Create & fill in `.env`

```bash
cd docker
cp .env.prod.example .env
```

**Required** variables (compose/backend will fail if missing):

- `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` (`MYSQL_USER` must **not** be `root`).
- `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`: must match `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` identically (do **not** use `root`).
- `JWT_SECRET`: a long random string, e.g. `openssl rand -base64 48`.
- `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET_NAME`, `S3_ENDPOINT`, `S3_REGION`, `STORAGE_BASE_URL`.
- `CORS_ORIGIN`: the real domains of the web and CMS.
- `VITE_BASE_API`, `VITE_WEB_URL` (for CMS build) and `NUXT_PUBLIC_API_BASE_URL` (for Web build & browser runtime).

> [!WARNING]
> In production, the backend **does not auto-create the bucket**. Create it on your S3 provider before starting.
>
> Also note that `VITE_*` variables are **embedded into the CMS bundle at build time** — changing `VITE_BASE_API` or `VITE_WEB_URL` requires rebuilding the `test-cms` image (`docker compose -f docker-compose.prod.yml up -d --build test-cms`).

### 3. Build & start (and run migrations on first deploy)

On a fresh database, run migrations before starting `test-backend` so startup seeders don't fail on missing tables:

```bash
docker compose -f docker-compose.prod.yml up -d test-mysql
docker compose -f docker-compose.prod.yml run --rm --build test-backend npx typeorm migration:run -d dist/database/data-source.js
docker compose -f docker-compose.prod.yml up -d --build
```

For subsequent deploys (tables already exist):

```bash
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec test-backend npx typeorm migration:run -d dist/database/data-source.js
```

### 4. Verify

```bash
docker compose -f docker-compose.prod.yml ps        # test-mysql, test-backend, test-cms, test-web should be (healthy)
docker compose -f docker-compose.prod.yml logs -f test-backend test-web test-cms
```

The backend healthcheck calls `http://localhost:3002/api/v1/health`.

---

## 🛠️ Troubleshooting

| Symptom                                                 | Cause / Fix                                                                                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend logs `ECONNREFUSED 127.0.0.1:3306`              | `DB_HOST` is set to `localhost`. Change it to `DB_HOST=mysql` (local) or `DB_HOST=test-mysql` (prod) in `docker/.env`.                          |
| Backend logs `S3 access failed` on startup              | `S3_ENDPOINT` must be `http://minio:9000` (local). Also check that MinIO is healthy with `docker compose ... ps minio`.                         |
| Uploaded images don't show in the browser               | `STORAGE_BASE_URL` must be a URL the browser can reach: `http://localhost:9000/<bucket>/`.                                                      |
| CMS/Web API calls fail with CORS or connection errors   | `VITE_BASE_API` and `NUXT_PUBLIC_API_BASE_URL` must be `http://localhost:3002/api/v1` (the browser-side URL).                                   |
| Web SSR gets no data (but the client side does)         | SSR code must use `runtimeConfig.apiBase` (`http://backend:3002/...` locally or `http://test-backend:3002/...` in prod), not `public.apiBase`.  |
| `Cannot find module ...` after installing a new package | Re-run with `--build --renew-anon-volumes` (see Hot reload).                                                                                    |
| Code changes don't trigger a reload (Windows)           | `CHOKIDAR_USEPOLLING=true` is already set. If it still doesn't reload, restart the service. For faster hot reload, keep the source inside WSL2. |
| `port is already allocated`                             | Another app is using the port. Stop it or change the port mapping in the compose file.                                                          |
| `the --mount option requires BuildKit`                  | Enable BuildKit by setting `DOCKER_BUILDKIT=1`, or update Docker.                                                                               |
| `pull access denied for minio/minio`                    | MinIO removed its community images from Docker Hub. The compose file pins Chainguard's free build (`cgr.dev/chainguard/minio@sha256:...`).      |
