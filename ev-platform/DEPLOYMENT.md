# Deployment Guide

## Environments

- Admin: Vercel project from `apps/admin`
- Vendor: Vercel project from `apps/vendor`
- Marketplace: Vercel project from `apps/marketplace`
- Backend: Docker host, Render, Railway, Fly.io, ECS, or any Node container platform
- Database: Neon PostgreSQL

## Required Variables

Copy `.env.example` to `.env` locally and configure the same values in production.

Frontend apps require:

- `NEXT_PUBLIC_API_URL`

Backend requires:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CORS_ORIGINS`

## Production Build

```bash
npm install
npm run db:generate
npm run build
```

## Database Release

```bash
npm run prisma:deploy --workspace=@ev-platform/backend
```

## Load Reduction Strategy

- One root dependency graph prevents duplicate React/Next/library installs.
- TurboRepo skips unchanged package builds in CI.
- Backend uses pagination, indexes, compression, rate limiting, and a singleton Prisma client.
- Read-heavy APIs should later add Redis caching for product listing, showroom listing, and dashboards.
- Next apps use App Router and image remote patterns, enabling route-level code splitting and image optimization.
