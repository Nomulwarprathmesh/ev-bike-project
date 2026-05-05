# Vendor Portal - Premium UI Styling Guide

## Design Patterns Used

### 1. Floating Cards
All cards use premium styling with shadows and hover effects:

```tsx
<Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
  {/* Content */}
</Card>
```

**Classes:**
- `shadow-lg` - Base shadow
- `hover:shadow-xl` - Enhanced shadow on hover
- `transition-shadow` - Smooth shadow transition
- `p-6` - Padding
- `rounded-2xl` - Rounded corners (applied via Card component)

### 2. Gradient Backgrounds
Status-specific gradient backgrounds for visual hierarchy:

```tsx
<Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200">
  {/* Success/Approved content */}
</Card>
```

**Gradient Patterns:**
- `from-emerald-50 to-emerald-100/50` - Success (Approved)
- `from-blue-50 to-blue-100/50` - Info (Pending)
- `from-red-50 to-red-100/50` - Danger (Rejected)
- `from-orange-50 to-orange-100/50` - Warning (Low Stock)
- `from-purple-50 to-purple-100/50` - Draft
- `from-gray-50 to-gray-100/50` - Neutral

### 3. Status Badges
Color-coded badges for quick status identification:

```tsx
<Badge className="bg-emerald-600 text-white">Approved</Badge>
<Badge className="bg-blue-100 text-blue-800 border border-blue-200">Pending</Badge>
```

**Badge Variants:**
- Solid: `bg-[color]-600 text-white`
- Outlined: `bg-[color]-100 text-[color]-800 border border-[color]-200`

### 4. Hover Effects
Interactive elements with smooth hover animations:

```tsx
<Card className="hover:shadow-xl hover:scale-105 transition-all">
  {/* Content */}
</Card>
```

**Hover Classes:**
- `hover:shadow-xl` - Enhanced shadow
- `hover:scale-105` - Slight scale increase
- `hover:bg-gray-100` - Background color change
- `hover:border-[color]-300` - Border color change
- `transition-all` - Smooth animation

### 5. Motion Animations
Framer Motion for entrance animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  {/* Content */}
</motion.div>
```

**Animation Patterns:**
- Fade in: `opacity: 0 → 1`
- Slide up: `y: 20 → 0`
- Scale: `scale: 0.95 → 1`
- Staggered delays: `delay: 0.1, 0.2, 0.3...`

### 6. Input Fields
Rounded input fields with consistent styling:

```tsx
<Input
  placeholder="Enter value"
  className="rounded-xl"
/>
```

**Input Classes:**
- `rounded-xl` - Rounded corners
- `pl-10` - Left padding for icons
- `border-gray-300` - Border color

### 7. Buttons
Premium button styling with rounded corners:

```tsx
<Button className="bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-xl shadow-lg">
  <Icon className="w-4 h-4" />
  Action Text
</Button>
```

**Button Variants:**
- Primary: `bg-emerald-600 hover:bg-emerald-700`
- Secondary: `bg-blue-600 hover:bg-blue-700`
- Outline: `variant="outline" rounded-xl`
- Ghost: `variant="ghost" hover:bg-gray-100`

### 8. Tables
Premium table styling with hover effects:

```tsx
<table className="w-full text-sm">
  <thead>
    <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
      <th className="text-left py-3 px-4 font-medium text-gray-600">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-colors">
      <td className="py-3 px-4">Data</td>
    </tr>
  </tbody>
</table>
```

**Table Classes:**
- Header: `bg-gradient-to-r from-gray-50 to-gray-100`
- Row hover: `hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100`
- Borders: `border-b border-gray-200` (header), `border-gray-100` (rows)

### 9. Modals/Dialogs
Premium modal styling with backdrop:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
>
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl"
  >
    {/* Content */}
  </motion.div>
</motion.div>
```

**Modal Classes:**
- Backdrop: `bg-black/50`
- Container: `rounded-2xl shadow-2xl`
- Animation: Scale and opacity

### 10. Info Banners
Alert/info banners with gradient backgrounds:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 shadow-lg"
>
  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
  <div>
    <h3 className="font-semibold text-blue-900">Title</h3>
    <p className="text-sm text-blue-800 mt-1">Message</p>
  </div>
</motion.div>
```

## Color Palette

### Primary Colors
- Emerald: `#10b981` (Success, Approved)
- Blue: `#3b82f6` (Info, Pending)
- Red: `#ef4444` (Danger, Rejected)
- Orange: `#f59e0b` (Warning, Low Stock)
- Purple: `#a855f7` (Draft)

### Neutral Colors
- Gray-50: `#f9fafb` (Lightest)
- Gray-100: `#f3f4f6`
- Gray-200: `#e5e7eb`
- Gray-600: `#4b5563` (Text)
- Gray-900: `#111827` (Darkest)

## Spacing Scale
- `p-2` - 8px
- `p-3` - 12px
- `p-4` - 16px
- `p-6` - 24px
- `p-8` - 32px
- `gap-2` - 8px
- `gap-3` - 12px
- `gap-4` - 16px
- `gap-6` - 24px

## Border Radius
- `rounded-lg` - 8px
- `rounded-xl` - 12px
- `rounded-2xl` - 16px
- `rounded-3xl` - 24px

## Shadow Scale
- `shadow-sm` - Small shadow
- `shadow-lg` - Large shadow (default for cards)
- `shadow-xl` - Extra large shadow (hover state)
- `shadow-2xl` - Maximum shadow (modals)

## Typography Scale
- `text-xs` - 12px (Captions)
- `text-sm` - 14px (Body text)
- `text-base` - 16px (Default)
- `text-lg` - 18px (Subheadings)
- `text-xl` - 20px (Section headers)
- `text-2xl` - 24px (Page headers)
- `text-3xl` - 30px (Main headers)

## Font Weights
- `font-medium` - 500 (Labels, badges)
- `font-semibold` - 600 (Subheadings)
- `font-bold` - 700 (Headers)

## Responsive Breakpoints
- Mobile: Default (< 640px)
- Tablet: `md:` (≥ 768px)
- Desktop: `lg:` (≥ 1024px)
- Large: `xl:` (≥ 1280px)

## Common Component Patterns

### Stat Card
```tsx
<Card className="p-6 bg-gradient-to-br from-[color]-50 to-[color]-100/50 border border-[color]-200 shadow-lg hover:shadow-xl transition-shadow">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-[color]-600">Label</p>
      <p className="text-3xl font-bold text-[color]-900 mt-2">Value</p>
    </div>
    <Icon className="w-12 h-12 text-[color]-400 opacity-30" />
  </div>
</Card>
```

### Product Card
```tsx
<Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105">
  <div className="relative h-40 bg-gray-200">
    <img src={image} alt={name} className="w-full h-full object-cover" />
    <Badge className="absolute top-2 right-2">Status</Badge>
  </div>
  <div className="p-4">
    <h3 className="font-semibold text-gray-900 line-clamp-2">{name}</h3>
    <p className="text-lg font-bold text-emerald-600 mt-3">₹{price}</p>
  </div>
</Card>
```

### Action Row
```tsx
<div className="flex items-center justify-between p-4 bg-gradient-to-r from-[color]-50 to-[color]-50/50 rounded-xl border border-[color]-100/50 hover:border-[color]-200 transition-all">
  <div className="flex-1">
    <p className="font-medium text-gray-900">Title</p>
    <p className="text-sm text-gray-600">Subtitle</p>
  </div>
  <Button size="sm" variant="outline" className="rounded-lg">
    Action
  </Button>
</div>
```

## Best Practices

1. **Consistency**: Use the same color scheme for similar statuses
2. **Hierarchy**: Use size and weight to establish visual hierarchy
3. **Spacing**: Maintain consistent spacing between elements
4. **Animations**: Keep animations smooth and purposeful
5. **Accessibility**: Ensure sufficient color contrast
6. **Responsiveness**: Test on multiple screen sizes
7. **Performance**: Use CSS transitions instead of JS when possible
8. **Readability**: Maintain adequate line height and letter spacing

## Implementation Tips

1. Always wrap cards in `<Card>` component
2. Use `motion.div` for entrance animations
3. Apply `rounded-xl` or `rounded-2xl` to all interactive elements
4. Use gradient backgrounds for status differentiation
5. Add `shadow-lg` to all floating elements
6. Include `transition-all` for smooth hover effects
7. Use `hover:scale-105` for interactive cards
8. Apply `gap-2` or `gap-3` between inline elements
9. Use `p-4` or `p-6` for card padding
10. Always include `text-sm` or `text-xs` for secondary text
