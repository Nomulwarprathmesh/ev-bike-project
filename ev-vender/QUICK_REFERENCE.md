# Vendor Portal - Quick Reference Guide

## 🎯 Key Concept: Product Approval Workflow

```
Vendor Submits Product Request
         ↓
    Admin Reviews
         ↓
    ┌───┴───┐
    ↓       ↓
 APPROVED  REJECTED
    ↓       ↓
Visible   Show Reason
in Market  + Resubmit
```

## 📊 Product Statuses

| Status | Icon | Color | Meaning |
|--------|------|-------|---------|
| `approved` | ✓ | Emerald | Live in marketplace |
| `pending` | ⏱ | Blue | Waiting for admin review |
| `rejected` | ✗ | Red | Needs improvements |
| `draft` | 📄 | Purple | Not submitted yet |

## 🗂️ File Structure

```
ev-vender/
├── app/
│   ├── dashboard/page.tsx          # Main dashboard with approval queue
│   ├── products/
│   │   ├── page.tsx                # Products with tabs (approved/pending/rejected/draft)
│   │   └── add/page.tsx            # Submit product request (7-step stepper)
│   ├── orders/page.tsx             # Orders with premium UI
│   ├── leads/page.tsx              # Leads with floating cards
│   ├── inventory/page.tsx          # Inventory with stock alerts
│   ├── settings/page.tsx           # Settings (logo locked, KYC added)
│   └── ...
├── lib/
│   └── mock-data.ts                # Updated with new product statuses
├── VENDOR_PORTAL_UPDATE.md         # Detailed update summary
├── UI_STYLING_GUIDE.md             # Design system documentation
└── IMPLEMENTATION_CHECKLIST.md     # Completion checklist
```

## 🎨 Design System Quick Reference

### Colors
```
Emerald (Success):    #10b981  → bg-emerald-600, from-emerald-50
Blue (Info):          #3b82f6  → bg-blue-600, from-blue-50
Red (Danger):         #ef4444  → bg-red-600, from-red-50
Orange (Warning):     #f59e0b  → bg-orange-600, from-orange-50
Purple (Draft):       #a855f7  → bg-purple-600, from-purple-50
```

### Common Classes
```
Cards:        shadow-lg hover:shadow-xl transition-shadow
Gradients:    bg-gradient-to-br from-[color]-50 to-[color]-100/50
Borders:      border border-[color]-200
Rounded:      rounded-xl (inputs), rounded-2xl (cards)
Hover:        hover:scale-105 hover:bg-gray-100
Animations:   motion.div with opacity/y transitions
```

## 📝 Page Overview

### Dashboard (`/dashboard`)
**Purpose:** Overview of vendor business
**Key Features:**
- Approval queue summary (pending, rejected, draft counts)
- Pending product requests list
- Revenue and orders charts
- Recent orders table

### Products (`/products`)
**Purpose:** Manage all products
**Key Features:**
- Tab navigation (Approved, Pending, Rejected, Draft)
- Floating product cards
- Status badges
- Rejection reasons
- Action buttons (View, Submit, Resubmit)

### Submit Product Request (`/products/add`)
**Purpose:** Submit new product for approval
**Key Features:**
- 7-step stepper UI
- Admin approval info banner
- Button: "Send Request to Admin"
- Premium floating cards

### Orders (`/orders`)
**Purpose:** Manage customer orders
**Key Features:**
- Premium table with status badges
- Order details modal
- Status timeline
- Customer information

### Leads (`/leads`)
**Purpose:** Manage sales leads
**Key Features:**
- Floating lead cards
- Priority badges
- Status filters
- Contact action buttons

### Inventory (`/inventory`)
**Purpose:** Manage stock levels
**Key Features:**
- Stock stat cards
- Low stock alerts
- Stock request buttons
- Inventory table

### Settings (`/settings`)
**Purpose:** Manage account settings
**Key Features:**
- Locked logo preview (cannot change)
- Business details
- KYC status card
- Security settings
- Notification preferences

## 🔄 Workflow Examples

### Submitting a Product
1. Click "Submit Product Request" button
2. Fill 7-step form
3. Review product details
4. Click "Send Request to Admin"
5. Product appears in "Pending" tab
6. Wait for admin approval

### Handling Rejection
1. Product appears in "Rejected" tab
2. Rejection reason displayed
3. Click "Resubmit" button
4. Make improvements
5. Resubmit for approval

### Managing Approved Products
1. Approved products in "Approved" tab
2. Can view, edit, or manage stock
3. Cannot delete or unpublish
4. Stock updates available

## 🎯 Key Changes from Previous Version

| Feature | Before | After |
|---------|--------|-------|
| Product Publishing | Direct | Request → Approval |
| Logo Management | Vendor editable | Admin managed (locked) |
| Product Visibility | Immediate | After approval |
| Rejection Handling | N/A | Show reason + resubmit |
| UI Style | Basic | Premium floating cards |
| Product Status | published/draft | approved/pending/rejected/draft |

## 💡 Important Notes

### For Vendors
- ✅ Can submit product requests
- ✅ Can edit business details
- ✅ Can manage orders and leads
- ✅ Can track inventory
- ❌ Cannot change logo
- ❌ Cannot directly publish products
- ❌ Cannot force marketplace availability

### For Admins (Future)
- Will see approval queue
- Can approve/reject products
- Can provide rejection reasons
- Can manage vendor accounts

## 🚀 Development Tips

### Adding New Features
1. Follow the floating card pattern
2. Use gradient backgrounds for status
3. Add motion animations for entrance
4. Use rounded-xl/rounded-2xl
5. Include shadow-lg and hover effects

### Styling New Components
```tsx
// Template for new card
<Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
  <h3 className="text-lg font-semibold text-gray-900">Title</h3>
  <p className="text-sm text-gray-600 mt-2">Content</p>
</Card>

// Template for status card
<Card className="p-6 bg-gradient-to-br from-[color]-50 to-[color]-100/50 border border-[color]-200">
  {/* Content */}
</Card>

// Template for animated element
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  {/* Content */}
</motion.div>
```

### Testing Checklist
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Animations smooth
- [ ] No console errors
- [ ] Hover effects work
- [ ] Filters work
- [ ] Modals open/close

## 📚 Documentation Files

1. **VENDOR_PORTAL_UPDATE.md** - Detailed changes and features
2. **UI_STYLING_GUIDE.md** - Design system and patterns
3. **IMPLEMENTATION_CHECKLIST.md** - Completion status
4. **QUICK_REFERENCE.md** - This file

## 🔗 Related Files

- `lib/mock-data.ts` - Mock data with new statuses
- `components/ui/` - Reusable UI components
- `components/layout/dashboard-layout.tsx` - Main layout
- `components/dashboard/stat-card.tsx` - Stat card component
- `components/products/product-card.tsx` - Product card component

## ❓ FAQ

**Q: Can vendors change their logo?**
A: No, logo is managed by admin only. It's locked in settings.

**Q: How long does admin approval take?**
A: This depends on admin workflow (not implemented in mock version).

**Q: Can vendors delete rejected products?**
A: Yes, they can resubmit with improvements or create new requests.

**Q: What happens to draft products?**
A: They remain in draft until vendor submits them for approval.

**Q: Can vendors see approval status?**
A: Yes, products show status in the Products page tabs.

## 🎓 Learning Resources

- Framer Motion: https://www.framer.com/motion/
- Tailwind CSS: https://tailwindcss.com/
- Next.js: https://nextjs.org/
- React: https://react.dev/

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the UI styling guide
3. Check implementation checklist
4. Review mock data structure

---

**Version:** 1.0
**Last Updated:** 2024-01-21
**Status:** ✅ Complete
