# Vendor Portal - Visual Examples & Code Snippets

## 🎨 UI Component Examples

### 1. Floating Card with Gradient Background

**Visual:**
```
┌─────────────────────────────────┐
│ ✓ Approved Products             │
│                                 │
│ 4                               │
│                                 │
│ (with emerald gradient)         │
└─────────────────────────────────┘
```

**Code:**
```tsx
<Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 shadow-lg hover:shadow-xl transition-shadow">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-emerald-600">Approved Products</p>
      <p className="text-3xl font-bold text-emerald-900 mt-2">4</p>
    </div>
    <CheckCircle className="w-12 h-12 text-emerald-400 opacity-30" />
  </div>
</Card>
```

### 2. Product Card with Status Badge

**Visual:**
```
┌──────────────────────────┐
│ [Image]      [APPROVED]  │
│                          │
│ ProMax Electric Scooter  │
│ ElectroVibe              │
│                          │
│ ₹24,999  -10%            │
│                          │
│ 🔋 52V 2.6Ah             │
│ ⚡ 55 km/h               │
│ 📍 45 km range           │
│                          │
│ Stock: 45                │
│                          │
│ [View] [Submit]          │
└──────────────────────────┘
```

**Code:**
```tsx
<Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105">
  <div className="relative h-40 bg-gray-200">
    <img src={image} alt={name} className="w-full h-full object-cover" />
    <Badge className="absolute top-2 right-2 bg-emerald-600">Approved</Badge>
  </div>
  <div className="p-4">
    <h3 className="font-semibold text-gray-900 line-clamp-2">{name}</h3>
    <p className="text-xs text-gray-600 mt-1">{brand}</p>
    <div className="mt-3 flex items-baseline gap-2">
      <span className="text-lg font-bold text-gray-900">₹{price}</span>
      <Badge variant="secondary">{discount}% off</Badge>
    </div>
    <div className="mt-3 space-y-1 text-xs text-gray-600">
      <p>🔋 {batteryCapacity}</p>
      <p>⚡ {topSpeed} km/h</p>
      <p>📍 {range} km range</p>
    </div>
  </div>
</Card>
```

### 3. Status Tab Navigation

**Visual:**
```
┌─────────────────────────────────────────────────┐
│ ✓ Approved [4]  ⏱ Pending [1]  ✗ Rejected [1]  │
│ 📄 Draft [1]                                    │
└─────────────────────────────────────────────────┘
```

**Code:**
```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList className="grid w-full grid-cols-4 shadow-lg">
    <TabsTrigger value="approved" className="gap-2">
      <CheckCircle className="w-4 h-4" />
      <span>Approved</span>
      <Badge variant="secondary">{approvedCount}</Badge>
    </TabsTrigger>
    <TabsTrigger value="pending" className="gap-2">
      <Clock className="w-4 h-4" />
      <span>Pending</span>
      <Badge variant="secondary">{pendingCount}</Badge>
    </TabsTrigger>
    {/* More tabs... */}
  </TabsList>
</Tabs>
```

### 4. Admin Approval Info Banner

**Visual:**
```
┌─────────────────────────────────────────────────┐
│ ℹ️ Admin Approval Required                      │
│                                                 │
│ Your product will be visible in the marketplace │
│ only after admin approval. You'll receive a     │
│ notification once the admin reviews your       │
│ request.                                        │
└─────────────────────────────────────────────────┘
```

**Code:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 shadow-lg"
>
  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
  <div>
    <h3 className="font-semibold text-blue-900">Admin Approval Required</h3>
    <p className="text-sm text-blue-800 mt-1">
      Your product will be visible in the marketplace only after admin approval.
      You'll receive a notification once the admin reviews your request.
    </p>
  </div>
</motion.div>
```

### 5. Locked Logo Card

**Visual:**
```
┌──────────────────────────────────────┐
│ 🔒 Vendor Logo    [Managed by Admin]  │
│                                      │
│ Your logo is managed by the platform │
│ admin. You cannot change it directly.│
│                                      │
│ [Logo Image]  Contact support to     │
│               change your logo.      │
└──────────────────────────────────────┘
```

**Code:**
```tsx
<Card className="p-6 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <LockIcon className="w-5 h-5 text-gray-600" />
      Vendor Logo
    </h3>
    <Badge className="bg-gray-600">Managed by Admin</Badge>
  </div>
  <p className="text-sm text-gray-600 mb-4">
    Your logo is managed by the platform admin. You cannot change it directly.
  </p>
  <div className="flex items-center gap-4">
    <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border-2 border-gray-200 shadow-md">
      <img src={logo} alt="Logo" className="w-20 h-20 object-cover rounded-lg" />
    </div>
    <div className="text-sm text-gray-600">
      <p className="font-medium text-gray-900">Current Logo</p>
      <p className="mt-1">To change your logo, contact platform support.</p>
    </div>
  </div>
</Card>
```

### 6. Rejection Reason Display

**Visual:**
```
┌──────────────────────────────────────┐
│ Urban Glide X                         │
│ ElectroVibe                           │
│ ₹16,999  -8%                          │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ ⚠️ Reason:                     │  │
│ │ Images quality not meeting     │  │
│ │ standards. Please resubmit     │  │
│ │ with high-resolution product   │  │
│ │ photos.                        │  │
│ └────────────────────────────────┘  │
│                                      │
│ [View] [Resubmit]                    │
└──────────────────────────────────────┘
```

**Code:**
```tsx
{product.rejectionReason && (
  <div className="mt-3 p-2 bg-red-100 rounded border border-red-200">
    <p className="text-xs text-red-800">
      <strong>Reason:</strong> {product.rejectionReason}
    </p>
  </div>
)}
```

### 7. Low Stock Alert

**Visual:**
```
┌─────────────────────────────────────────┐
│ ⚠️ Low Stock Alert                      │
│                                         │
│ City Commuter Pro                       │
│ Only 12 units left                      │
│                                    [Request Stock]
│                                         │
│ Budget Rider                            │
│ Only 5 units left                       │
│                                    [Request Stock]
└─────────────────────────────────────────┘
```

**Code:**
```tsx
{lowStockProducts.length > 0 && (
  <Card className="p-6 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50 border-l-4 border-l-orange-500">
    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <AlertTriangle className="w-5 h-5 text-orange-600" />
      Low Stock Alert
    </h3>
    <div className="space-y-3">
      {lowStockProducts.map((product) => (
        <div key={product.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-orange-200">
          <div>
            <p className="font-medium text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-600">
              Only <span className="font-semibold text-orange-600">{product.stock}</span> units left
            </p>
          </div>
          <Button size="sm" variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Request Stock
          </Button>
        </div>
      ))}
    </div>
  </Card>
)}
```

### 8. Order Details Modal

**Visual:**
```
┌─────────────────────────────────────┐
│ Order ORD-001                    [✕] │
├─────────────────────────────────────┤
│                                     │
│ Customer Information                │
│ ┌─────────────────────────────────┐ │
│ │ Name: Rajesh Kumar              │ │
│ │ Email: rajesh@example.com       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Order Details                       │
│ ┌─────────────────────────────────┐ │
│ │ Product: ProMax Electric Scooter│ │
│ │ Quantity: 1                     │ │
│ │ Amount: ₹22,499                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Status Timeline                     │
│ ● Pending                           │
│ ● Confirmed                         │
│ ● Packed                            │
│ ● Shipped                           │
│ ○ Delivered                         │
│                                     │
│ Delivery Address                    │
│ 123 Main St, Mumbai, MH 400001      │
│                                     │
└─────────────────────────────────────┘
```

**Code:**
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
    {/* Modal content */}
  </motion.div>
</motion.div>
```

### 9. Lead Card

**Visual:**
```
┌──────────────────────────────────────┐
│ Arjun Verma              [HIGH]       │
│ ProMax Electric Scooter              │
│                                      │
│ [NEW]                                │
│                                      │
│ "Interested in bulk purchase for     │
│  corporate fleet"                    │
│                                      │
│ 📅 2024-01-20                        │
│                                      │
│ [Call] [Email] [Note]                │
└──────────────────────────────────────┘
```

**Code:**
```tsx
<Card className="p-6 border-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{lead.interestedProduct}</p>
    </div>
    <Badge className="bg-red-100 text-red-800 border border-red-200">High</Badge>
  </div>
  <Badge variant="outline">New</Badge>
  <p className="text-sm text-gray-600 mb-4 line-clamp-2">"{lead.message}"</p>
  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
    <Clock className="w-3 h-3" />
    {lead.date}
  </div>
  <div className="flex gap-2">
    <Button variant="outline" size="sm" className="flex-1 gap-2">
      <Phone className="w-4 h-4" />
      Call
    </Button>
    <Button variant="outline" size="sm" className="flex-1 gap-2">
      <Mail className="w-4 h-4" />
      Email
    </Button>
    <Button variant="outline" size="sm" className="flex-1 gap-2">
      <MessageSquare className="w-4 h-4" />
      Note
    </Button>
  </div>
</Card>
```

### 10. 7-Step Stepper

**Visual:**
```
┌─────────────────────────────────────────────────┐
│ ① ─── ② ─── ③ ─── ④ ─── ⑤ ─── ⑥ ─── ⑦        │
│                                                 │
│ Basic Details  Pricing  Specs  Battery  Images │
│ SEO & Tags  Review                             │
└─────────────────────────────────────────────────┘

Current Step: ④ Battery & Performance

[Previous] [Next]
```

**Code:**
```tsx
<Card className="p-6 shadow-lg">
  <div className="flex items-center justify-between">
    {steps.map((step, index) => (
      <div key={index} className="flex items-center flex-1">
        <motion.div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
            index < currentStep
              ? "bg-emerald-600 text-white shadow-lg"
              : index === currentStep
                ? "bg-emerald-100 text-emerald-600 ring-2 ring-emerald-600 shadow-lg"
                : "bg-gray-200 text-gray-600"
          }`}
        >
          {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
        </motion.div>
        {index < steps.length - 1 && (
          <div
            className={`flex-1 h-1 mx-2 transition-all ${
              index < currentStep ? "bg-emerald-600" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
</Card>
```

## 🎯 Animation Examples

### Fade In Animation
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Slide Up Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Staggered Animation
```tsx
{items.map((item, idx) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.05 }}
  >
    {item.content}
  </motion.div>
))}
```

### Scale on Hover
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
>
  Content
</motion.div>
```

## 🎨 Color Usage Examples

### Emerald (Success/Approved)
```tsx
// Background
bg-emerald-50, bg-emerald-100, bg-emerald-600

// Text
text-emerald-600, text-emerald-800, text-emerald-900

// Gradient
from-emerald-50 to-emerald-100/50

// Border
border-emerald-200
```

### Blue (Info/Pending)
```tsx
// Background
bg-blue-50, bg-blue-100, bg-blue-600

// Text
text-blue-600, text-blue-800, text-blue-900

// Gradient
from-blue-50 to-blue-100/50

// Border
border-blue-200
```

### Red (Danger/Rejected)
```tsx
// Background
bg-red-50, bg-red-100, bg-red-600

// Text
text-red-600, text-red-800, text-red-900

// Gradient
from-red-50 to-red-100/50

// Border
border-red-200
```

## 📱 Responsive Examples

### Mobile First
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Single column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### Responsive Text
```tsx
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Responsive Heading
</h1>
```

### Responsive Padding
```tsx
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>
```

---

**Version:** 1.0
**Last Updated:** 2024-01-21
**Status:** ✅ Complete

For more information, refer to the UI_STYLING_GUIDE.md file.
