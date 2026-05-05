# 🚗 EV Marketplace Platform - Monorepo

A comprehensive electric vehicle marketplace platform with separate applications for Admin, Vendors, and Customers.

## 📦 Project Structure

```
ev-bike-project/
├── ev-admin/              # Admin Dashboard
├── ev-marketplace/        # Customer Marketplace
├── ev-vender/             # Vendor Portal
├── shared/                # Shared packages
│   ├── ui/               # Shared UI components
│   ├── hooks/            # Shared React hooks
│   ├── utils/            # Shared utilities
│   ├── types/            # Shared TypeScript types
│   └── constants/        # Shared constants
├── .gitignore
├── package.json          # Root workspace config
├── turbo.json            # Turborepo config
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install all dependencies
npm install

# Or install for specific app
npm install --workspace=ev-admin
```

### Development

```bash
# Run all apps in development mode
npm run dev

# Run specific app
npm run dev:admin
npm run dev:marketplace
npm run dev:vendor
```

### Build

```bash
# Build all apps
npm run build

# Build specific app
npm run build:admin
npm run build:marketplace
npm run build:vendor
```

### Production

```bash
# Start all apps in production mode
npm start

# Start specific app
npm start --workspace=ev-admin
```

## 📱 Applications

### 1. Admin Dashboard (`ev-admin`)
**Port:** 3000  
**Purpose:** Platform administration and management

**Features:**
- Dashboard with analytics
- Bike/Product management
- Order management
- Vendor approval and management
- User management
- Payment tracking
- Review moderation
- Reports and analytics
- Settings and configuration

**Tech Stack:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Redux Toolkit
- TanStack Table
- Recharts
- Shadcn UI

### 2. Customer Marketplace (`ev-marketplace`)
**Port:** 3001  
**Purpose:** Customer-facing marketplace

**Features:**
- Browse electric bikes
- Product details and specifications
- Shopping cart
- Checkout and payment
- Order tracking
- User profile
- Reviews and ratings
- Test ride booking

**Tech Stack:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- Supabase (Auth & Database)
- Shadcn UI

### 3. Vendor Portal (`ev-vender`)
**Port:** 3002  
**Purpose:** Vendor management portal

**Features:**
- Vendor dashboard
- Product listing management
- Order management
- Inventory tracking
- Sales analytics
- Review management
- Profile settings

**Tech Stack:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Table
- Recharts
- Shadcn UI

## 🔧 Shared Packages

### @ev-marketplace/ui
Shared UI components used across all applications.

```typescript
import { Button, Card, Input } from '@ev-marketplace/ui';
```

### @ev-marketplace/hooks
Shared React hooks for common functionality.

```typescript
import { useLocalStorage, useDebounce } from '@ev-marketplace/hooks';
```

### @ev-marketplace/utils
Shared utility functions.

```typescript
import { cn, formatCurrency, formatDate } from '@ev-marketplace/utils';
```

### @ev-marketplace/types
Shared TypeScript types and interfaces.

```typescript
import type { User, Bike, Order } from '@ev-marketplace/types';
```

### @ev-marketplace/constants
Shared constants and configuration.

```typescript
import { ROUTES, API_BASE_URL } from '@ev-marketplace/constants';
```

## 🛠️ Development Scripts

```bash
# Development
npm run dev                 # Run all apps
npm run dev:admin          # Run admin only
npm run dev:marketplace    # Run marketplace only
npm run dev:vendor         # Run vendor only

# Build
npm run build              # Build all apps
npm run build:admin        # Build admin only
npm run build:marketplace  # Build marketplace only
npm run build:vendor       # Build vendor only

# Lint
npm run lint               # Lint all apps

# Clean
npm run clean              # Clean all node_modules
npm run clean:builds       # Clean all .next folders
```

## 📝 Environment Variables

Create `.env.local` files in each app directory:

### ev-admin/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=EV Admin
```

### ev-marketplace/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### ev-vender/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
NEXT_PUBLIC_APP_NAME=EV Vendor
```

## 🏗️ Architecture

### Monorepo Benefits
- **Code Sharing:** Shared components, hooks, and utilities
- **Consistent Tooling:** Same build tools and configurations
- **Atomic Changes:** Update multiple apps in single commit
- **Type Safety:** Shared types across all apps
- **Faster Development:** Reuse code, avoid duplication

### Tech Stack
- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **State Management:** Redux Toolkit, Zustand
- **Data Fetching:** TanStack Query
- **UI Components:** Shadcn UI
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide React

## 📊 Project Status

### Completed ✅
- [x] Project structure cleanup
- [x] Duplicate folder removal
- [x] Monorepo setup
- [x] Shared packages creation
- [x] Dependencies installation
- [x] Build configuration
- [x] Development environment

### In Progress 🚧
- [ ] Move duplicate UI components to shared package
- [ ] Setup CI/CD pipeline
- [ ] Add testing infrastructure
- [ ] API integration
- [ ] Database setup

### Planned 📋
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] Monitoring and logging
- [ ] Performance optimization
- [ ] Security hardening

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests for specific app
npm test --workspace=ev-admin
```

## 📦 Deployment

### Vercel (Recommended)
Each app can be deployed separately to Vercel:

```bash
# Deploy admin
cd ev-admin && vercel

# Deploy marketplace
cd ev-marketplace && vercel

# Deploy vendor
cd ev-vender && vercel
```

### Docker
```bash
# Build Docker images
docker-compose build

# Run containers
docker-compose up
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👥 Team

- **Admin Team:** Platform management and operations
- **Vendor Team:** Vendor onboarding and support
- **Customer Team:** User experience and marketplace

## 📞 Support

For support, email support@evmarketplace.com or join our Slack channel.

## 🔗 Links

- [Documentation](./docs)
- [API Reference](./docs/api)
- [Contributing Guide](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

---

**Built with ❤️ by the EV Marketplace Team**
