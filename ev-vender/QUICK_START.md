# 🚀 Quick Start Guide - EV Vendor Portal

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000
```

The app will automatically redirect to `/dashboard`.

## 📂 File Structure Overview

### Pages (App Router)
Each page is a directory with `page.tsx`:
- `/dashboard` - Main dashboard
- `/products` - Product listing
- `/products/add` - Add product form
- `/orders` - Orders management
- `/leads` - Leads management
- `/inventory` - Inventory management
- `/showroom` - Showroom management
- `/analytics` - Analytics dashboard
- `/reviews` - Reviews management
- `/notifications` - Notifications center
- `/customers` - Customers list
- `/settings` - Settings & preferences

### Components
- `components/layout/` - Layout components (Sidebar, Header, DashboardLayout)
- `components/dashboard/` - Dashboard-specific components
- `components/products/` - Product-specific components
- `components/ui/` - shadcn/ui components

### Data
- `lib/mock-data.ts` - All mock data for the application

## 🎨 Customization

### Change Colors
Edit `app/globals.css` to modify the color scheme:
```css
:root {
  --accent: 142 71% 45%; /* Change primary color */
}
```

### Update Mock Data
Edit `lib/mock-data.ts` to change:
- Vendor information
- Products
- Orders
- Leads
- Analytics data

### Modify Sidebar Menu
Edit `components/layout/sidebar.tsx` to add/remove menu items:
```tsx
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  // Add more items here
];
```

## 🔗 Navigation

### Sidebar Links
- Dashboard
- Products
- Add Product
- Orders
- Customers
- Leads
- Inventory
- Showroom
- Analytics
- Reviews
- Notifications
- Settings

### Header Features
- Search bar (desktop only)
- Notification dropdown
- Profile dropdown with logout

## 📊 Adding New Pages

### 1. Create Directory
```bash
mkdir app/new-page
```

### 2. Create page.tsx
```tsx
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function NewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">New Page</h1>
        {/* Your content here */}
      </div>
    </DashboardLayout>
  );
}
```

### 3. Add to Sidebar
Edit `components/layout/sidebar.tsx` and add to `menuItems` array.

## 🎯 Common Tasks

### Add a New Product Card
```tsx
import { ProductCard } from "@/components/products/product-card";

<ProductCard
  id="prod_001"
  name="Product Name"
  brand="Brand"
  price={25000}
  discount={10}
  image="image-url"
  stock={50}
  status="published"
  rating={4.5}
  views={1000}
  sales={100}
/>
```

### Add a Stat Card
```tsx
import { StatCard } from "@/components/dashboard/stat-card";

<StatCard
  icon={TrendingUp}
  label="Revenue"
  value="₹12,45,000"
  change={12}
  trend="up"
  color="emerald"
/>
```

### Create a Modal
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Add a Chart
```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#10b981" />
  </LineChart>
</ResponsiveContainer>
```

## 🎨 Styling Tips

### Tailwind Classes
- Spacing: `p-4`, `m-2`, `gap-3`
- Colors: `text-emerald-600`, `bg-blue-50`, `border-gray-200`
- Responsive: `md:grid-cols-2`, `lg:flex-row`
- Hover: `hover:shadow-lg`, `hover:bg-gray-50`

### Custom Utilities
- `.gradient-ev` - EV gradient background
- `.card-hover` - Card hover effect
- `.smooth-transition` - Smooth transitions
- `.glass-effect` - Glassmorphism effect

## 🔄 State Management

### Using Zustand (if needed)
```tsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### Using React Hooks
```tsx
const [state, setState] = useState(initialValue);
const [data, setData] = useState([]);
```

## 📱 Responsive Design

### Mobile First Approach
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>
```

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🚀 Performance Tips

1. Use `next/image` for images
2. Implement code splitting with dynamic imports
3. Use React.memo for expensive components
4. Optimize animations with Framer Motion
5. Lazy load charts and heavy components

## 🐛 Debugging

### Browser DevTools
- React DevTools extension
- Network tab for API calls
- Console for errors

### Next.js Debug Mode
```bash
NODE_OPTIONS='--inspect' npm run dev
```

## 📦 Building for Production

```bash
# Build
npm run build

# Test production build
npm start

# Analyze bundle
npm run build -- --analyze
```

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Recharts](https://recharts.org/en-US)

## ❓ FAQ

**Q: How do I add a new menu item?**
A: Edit `components/layout/sidebar.tsx` and add to the `menuItems` array.

**Q: How do I change the color scheme?**
A: Edit the CSS variables in `app/globals.css`.

**Q: How do I add API integration?**
A: Replace mock data with API calls using fetch or axios.

**Q: How do I add authentication?**
A: Implement a login page and use middleware for route protection.

**Q: How do I deploy?**
A: Deploy to Vercel, Netlify, or any Node.js hosting platform.

---

Happy coding! 🎉
