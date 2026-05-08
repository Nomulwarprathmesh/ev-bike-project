# EV Platform Architecture

```text
ev-platform
├── apps
│   ├── admin         Next.js admin portal
│   ├── vendor        Next.js showroom owner portal
│   ├── marketplace   Next.js customer marketplace
│   └── backend       Express REST API
├── packages
│   ├── api-client    typed frontend API wrapper
│   ├── config        shared TypeScript config
│   ├── types         shared domain contracts
│   ├── ui            shared UI entrypoint
│   └── utils         shared helpers
└── prisma            PostgreSQL schema and migrations
```

## Request Flow

```text
Browser
  -> Next.js app
  -> @ev-platform/api-client
  -> Backend REST API
  -> Prisma
  -> Neon PostgreSQL
```

## Scaling

- Scale frontend apps independently on Vercel.
- Scale backend horizontally behind a load balancer.
- Keep Prisma client singleton per backend instance.
- Use Neon connection pooling for serverless or autoscaled backends.
- Add Redis for dashboard aggregates, OTP/session throttling, and product-list cache.
- Move image uploads to S3-compatible storage with CDN delivery.

## Team Workflow

- Feature teams own apps.
- Platform team owns `packages/*`, backend, Prisma schema, CI/CD.
- API contracts are added first in `packages/types`, then implemented in backend and consumed by apps.
- Each PR runs `npm run typecheck`, `npm run lint`, and `npm run build`.
