# 🎨 Customization Guide

## Color Scheme

### Change Primary Color (Emerald to Your Brand Color)

Edit `app/globals.css`:

```css
:root {
  /* Change from emerald to your color */
  --accent: 142 71% 45%; /* Emerald */
  
  /* Examples:
  --accent: 59 89% 43%;   /* Blue */
  --accent: 0 84% 60%;    /* Red */
  --accent: 38 92% 50%;   /* Orange */
  --accent: 142 76% 36%;  /* Green */
  */
}
```

### Update Tailwind Color References

Search and replace in all files:
- `emerald-600` → `blue-600`
- `emerald-50` → `blue-50`
- `emerald-100` → `blue-100`

## Branding

### Change Vendor Name

Edit `lib/mock-data.ts`:

```tsx
export const mockVendor = {
  name: "Your Company Name", // Change this
  email: "your@email.com",
  // ...
};
```

Edit `components/layout/sidebar.tsx`:

```tsx
<span className="font-bold text-gray-900">Your App Name</span>
```

### Change Logo

Replace the logo in `components/layout/sidebar.tsx`:

```tsx
<div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-sm">YN</span> {/* Your initials */}
</div>
```

Or use an image:

```tsx
<Image src="/logo.png" alt="Logo" width={32} height={32} />
```

## Data Customization

### Update Mock Products

Edit `lib/mock-data.ts`:

```tsx
export const mockProducts = [
  {
    id: "prod_001",
    name: "Your Product Name",
    brand: "Your Brand",
    price: 25000,
    discount: 10,
    image: "your-image-url",
    stock: 50,
    status: "published",
    rating: 4.7,
    views: 2340,
    sales: 156,
    batteryCapacity: "52V 2.6Ah",
    topSpeed: 55,
    range: 45,
    chargingTime: 4.5,
    colors: ["Black", "White", "Blue"],
  },
  // Add more products
];
```

### Update Mock Orders

Edit `lib/mock-data.ts`:

```tsx
export const mockOrders = [
  {
    id: "ORD-001",
    customerName: "Customer Name",
    email: "customer@email.com",
    product: "Product Name",
    quantity: 1,
    amount: 22499,
    status: "delivered",
    date: "2024-01-15",
    deliveryDate: "2024-01-20",
    paymentStatus: "completed",
    address: "Customer Address",
  },
  // Add more orders
];
```

## UI Customization

### Change Sidebar Menu Items

Edit `components/layout/sidebar.tsx`:

```tsx
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Products", href: "/products" },
  // Add or remove items here
  { icon: Settings, label: "Settings", href: "/settings" },
];
```

### Change Card Styling

Edit individual card components or `app/globals.css`:

```css
/* Make cards more rounded */
.card-hover {
  @apply transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-3xl;
}

/* Change shadow intensity */
.card-hover {
  @apply transition-all duration-300 hover:shadow-2xl;
}
```

### Change Button Styles

Edit `components/ui/button.tsx` or use Tailwind classes:

```tsx
<Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
  Custom Button
</Button>
```

## Layout Customization

### Change Sidebar Width

Edit `components/layout/sidebar.tsx`:

```tsx
<aside
  className={cn(
    "hidden md:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40",
    collapsed ? "w-20" : "w-72" // Change from w-64 to w-72
  )}
>
```

### Change Header Height

Edit `components/layout/header.tsx`:

```tsx
<header className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-6">
  {/* Change h-16 to h-20 */}
</header>
```

### Change Main Content Padding

Edit `components/layout/dashboard-layout.tsx`:

```tsx
<main className="md:ml-64 mt-16 p-8 md:p-12">
  {/* Change p-4 md:p-6 to p-8 md:p-12 */}
  {children}
</main>
```

## Typography Customization

### Change Font

Edit `app/layout.tsx`:

```tsx
import { Inter, Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Use in className
className={`${poppins.variable}`}
```

### Change Heading Sizes

Edit individual pages or create a utility:

```tsx
<h1 className="text-4xl font-bold text-gray-900">
  {/* Change from text-3xl to text-4xl */}
</h1>
```

## Animation Customization

### Change Animation Duration

Edit `components/dashboard/stat-card.tsx`:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }} // Change from 0.3 to 0.5
>
```

### Disable Animations

Replace all Framer Motion components with regular divs:

```tsx
// Before
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

// After
<div>
```

## Chart Customization

### Change Chart Colors

Edit chart pages (e.g., `app/analytics/page.tsx`):

```tsx
const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];
// Change to your colors
const COLORS = ["#6366f1", "#ec4899", "#14b8a6", "#f97316"];
```

### Change Chart Type

Replace chart components:

```tsx
// From LineChart to AreaChart
<AreaChart data={mockAnalytics.revenue}>
  <Area type="monotone" dataKey="value" fill="#10b981" />
</AreaChart>
```

## Form Customization

### Add New Form Fields

Edit `app/products/add/page.tsx`:

```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    New Field Label
  </label>
  <Input
    name="newField"
    value={formData.newField}
    onChange={handleInputChange}
    placeholder="Placeholder text"
  />
</div>
```

### Change Form Validation

Edit form components and add validation:

```tsx
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
});
```

## Table Customization

### Add New Table Columns

Edit table pages (e.g., `app/orders/page.tsx`):

```tsx
<th className="text-left py-3 px-4 font-medium text-gray-600">
  New Column
</th>

// In tbody
<td className="py-3 px-4">New Data</td>
```

### Change Table Styling

Edit `components/ui/table.tsx` or inline styles:

```tsx
<table className="w-full text-sm border-collapse">
  {/* Add border-collapse for better styling */}
</table>
```

## Responsive Breakpoints

### Adjust for Different Screen Sizes

Edit Tailwind breakpoints in `tailwind.config.ts`:

```tsx
module.exports = {
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
}
```

## Dark Mode

### Enable Dark Mode

Edit `app/globals.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    /* Add dark mode colors */
  }
}
```

## Performance Optimization

### Lazy Load Components

```tsx
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/charts/heavy-chart"), {
  loading: () => <div>Loading...</div>,
});
```

### Optimize Images

```tsx
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={400}
  priority // For above-the-fold images
/>
```

## Common Customizations

### Change Page Title

Edit each page's `<h1>`:

```tsx
<h1 className="text-3xl font-bold text-gray-900">Your Page Title</h1>
```

### Change Button Text

Search for button text and replace:

```tsx
<Button>Your Button Text</Button>
```

### Change Empty State Message

Edit empty state components:

```tsx
<Card className="p-12 text-center">
  <p className="text-gray-600">Your custom message</p>
</Card>
```

### Add New Status Badge

Edit status badge mappings:

```tsx
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  yourStatus: "bg-purple-100 text-purple-800", // Add new
};
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=EV Vendor Portal
NEXT_PUBLIC_BRAND_COLOR=emerald
```

Use in code:

```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appName = process.env.NEXT_PUBLIC_APP_NAME;
```

## Testing Customizations

### Test Color Changes

1. Edit `app/globals.css`
2. Run `npm run dev`
3. Check all pages for consistency

### Test Responsive Design

1. Open DevTools (F12)
2. Toggle device toolbar
3. Test on different screen sizes

### Test Animations

1. Open DevTools
2. Reduce motion in accessibility settings
3. Verify animations still work smoothly

## Troubleshooting

### Colors Not Changing

- Clear `.next` folder: `rm -rf .next`
- Restart dev server: `npm run dev`
- Check CSS variable names

### Layout Breaking

- Check sidebar width changes
- Verify header height changes
- Test responsive breakpoints

### Animations Not Working

- Ensure Framer Motion is installed
- Check motion component syntax
- Verify transition properties

---

**Happy customizing! 🎨**
