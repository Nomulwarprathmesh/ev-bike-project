# EV Platform Monorepo

Enterprise monorepo for the EV commerce platform.

## Apps

- `apps/admin`: Next.js App Router admin portal
- `apps/vendor`: Next.js App Router showroom owner portal
- `apps/marketplace`: Next.js App Router customer marketplace
- `apps/backend`: Express + TypeScript + Prisma API

## Packages

- `packages/ui`: shared UI primitives
- `packages/types`: shared domain and API types
- `packages/utils`: shared helpers
- `packages/config`: shared TypeScript config
- `packages/api-client`: typed REST client

## Commands

```bash
npm install
npm run db:generate
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Why This Structure

One workspace install and one lockfile reduce dependency drift, duplicate packages, corrupted cache issues, and cold-start/build overhead. TurboRepo caches build outputs by package, so unchanged apps and packages are skipped during CI and local builds.
