# 🚗 EV Vendor Portal - Premium Dashboard

A production-ready, modern SaaS-style EV vendor management dashboard built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

### Core Pages
- **Dashboard** - Analytics overview with revenue trends, orders, traffic sources, and top products
- **Products** - Grid/table view with search, filters, sorting, and bulk actions
- **Add Product** - Multi-step form with 7 stages (Basic Details → Preview & Publish)
- **Orders** - Order management with status tracking and delivery timeline
- **Leads** - Customer inquiry management with priority and status filtering
- **Inventory** - Stock management with low stock alerts and restock tracking
- **Showroom** - Physical location management with staff and test ride info
- **Analytics** - Advanced charts with revenue, orders, traffic, and performance metrics
- **Reviews** - Customer review management with ratings and verification
- **Notifications** - Real-time notification center with categorization
- **Customers** - Customer list with order history and spending
- **Settings** - Profile, KYC verification, security, and preferences

### Design Features
- **Responsive Layout** - Mobile-first design with collapsible sidebar
- **Fixed Sidebar** - Persistent navigation with collapse/expand toggle
- **Sticky Header** - Top navigation with search, notifications, and profile
- **Mobile Drawer** - Sheet-based sidebar for mobile devices
- **Smooth Animations** - Framer Motion transitions and micro-interactions
- **Premium Styling** - Rounded cards, soft shadows, glassmorphism effects
- **EV Theme** - Emerald green and blue accent colors
- **Dark Mode Ready** - CSS variables for easy theme switching

### Components
- Stat cards with animated counters
- Product cards with image, rating, and quick actions
- Order status timeline
- Lead priority badges
- Notification cards with type-based styling
- Chart components (Line, Bar, Area, Pie)
- Modal dialogs and drawers
- Dropdown menus and filters
- Form inputs with validation UI
- Empty states and loading skeletons

## 🏗️ Project Structure

```
ev-vender/
├── app/
│   ├── dashboard/          # Dashboard page
│   ├── products/           # Products listing
│   │   └── add/           # Add product multi-step form
│   ├── orders/            # Orders management
│   ├── leads/             # Leads & inquiries
│   ├── inventory/         # Stock management
│   ├── showroom/          # Showroom management
│   ├── analytics/         # Analytics & reports
│   ├── reviews/           # Customer reviews
│   ├── notifications/     # Notification center
│   ├── customers/         # Customer list
│   ├── settings/          # Settings & preferences
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home (redirects to dashboard)
│   └── globals.css        # Global styles
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx           # Navigation sidebar
│   │   ├── header.tsx            # Top header
│   │   └── dashboard-layout.tsx  # Layout wrapper
│   ├── dashboard/
│   │   └── stat-card.tsx         # Stat card component
│   ├── products/
│   │   └── product-card.tsx      # Product card component
│   ├── ui/                       # shadcn/ui components
│   └── common/                   # Shared components
├── lib/
│   ├── mock-data.ts      # Mock data for all pages
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Colors
- **Primary**: Emerald (#10b981)
- **Secondary**: Blue (#3b82f6)
- **Accent**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Background**: White (#ffffff)
- **Surface**: Gray-50 (#f9fafb)

### Typography
- **Headings**: Geist Sans, Bold
- **Body**: Geist Sans, Regular
- **Mono**: Geist Mono (for code)

### Spacing
- Base unit: 4px
- Padding: 4px, 8px, 12px, 16px, 24px, 32px
- Gaps: 8px, 12px, 16px, 24px

### Shadows
- Small: `shadow-sm`
- Medium: `shadow-md`
- Large: `shadow-lg`
- Hover: `hover:shadow-lg`

## 📊 Mock Data

All pages use mock data from `lib/mock-data.ts`:
- **mockVendor** - Vendor profile information
- **mockProducts** - 4 sample EV products
- **mockOrders** - 5 sample orders
- **mockLeads** - 3 sample leads
- **mockNotifications** - 3 sample notifications
- **mockAnalytics** - Revenue, orders, and traffic data
- **mockShowrooms** - 2 sample showrooms
- **mockReviews** - 2 sample reviews

## 🔧 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **Tables**: TanStack Table

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)
- **Wide**: > 1280px (xl)

## 🎯 Key Features

### Dashboard
- Revenue and order statistics
- Product performance charts
- Traffic source breakdown
- Recent orders table
- Low stock alerts
- Animated counters

### Products
- Grid and table view toggle
- Search and filter functionality
- Product status badges
- Quick edit and delete actions
- Bulk operations support
- Product preview modal

### Orders
- Order status tracking
- Customer information
- Delivery timeline
- Payment status
- Order details modal
- Export functionality

### Analytics
- Revenue trend chart
- Orders analytics
- Traffic source pie chart
- Product performance comparison
- KPI indicators
- Date range filtering

### Notifications
- Real-time notification cards
- Type-based styling (order, stock, review, system)
- Mark as read functionality
- Delete notifications
- Unread count badge

## 🔐 Security Notes

This is a **frontend-only** implementation. For production:
1. Add backend API integration
2. Implement authentication (JWT, OAuth)
3. Add input validation and sanitization
4. Implement rate limiting
5. Add CSRF protection
6. Use environment variables for sensitive data

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications with WebSocket
- [ ] Advanced filtering and search
- [ ] Bulk import/export functionality
- [ ] Custom report generation
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] User activity logging
- [ ] Advanced analytics with date ranges
- [ ] Vendor performance scoring

## 📝 Component Usage

### StatCard
```tsx
<StatCard
  icon={TrendingUp}
  label="Total Revenue"
  value="₹12,45,000"
  change={12}
  trend="up"
  color="emerald"
/>
```

### ProductCard
```tsx
<ProductCard
  id="prod_001"
  name="ProMax Electric Scooter"
  brand="ElectroVibe"
  price={24999}
  discount={10}
  image="..."
  stock={45}
  status="published"
  rating={4.7}
  views={2340}
  sales={156}
/>
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Recharts](https://recharts.org)

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👥 Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Built with ❤️ for EV Vendors**
