# EV Bike Platform Backend Implementation Document

This document summarizes backend requirements for the three frontend apps in this repository:

- `ev-marketplace`: customer-facing EV scooter marketplace
- `ev-vender`: showroom owner/vendor portal
- `ev-admin`: platform admin portal

The current frontends are mostly mock-data driven. The backend should replace mock arrays, localStorage-only flows, and UI-only actions with persistent APIs, authentication, role permissions, payments, inventory, test rides, orders, support, reviews, analytics, and notifications.

## 1. Current Frontend Analysis

### Customer Marketplace: `ev-marketplace`

Framework: Vite + React.

Important routes:

- `/`: home page with scooter discovery and testimonials
- `/scooters`: product listing with filters
- `/scooters/:id`: product detail, specifications, EMI, reviews
- `/compare`: compare selected scooters
- `/wishlist`: saved products
- `/cart`: cart flow
- `/checkout`: delivery details and payment method flow
- `/showrooms`: showroom directory and showroom selection
- `/test-ride`: multi-step test ride booking
- `/finance`: EMI calculator and loan eligibility UI
- `/account`: customer profile, orders, addresses, notifications
- `/order-tracking`: order tracking
- `/login`, `/signup`: customer authentication

Current mock/local data:

- `src/data/scooters.js`: products, specs, price, EMI, ratings, images
- `src/data/showrooms.js`: showrooms, cities, brand availability, contact info, map coordinates
- `useCart`, `useWishlist`, `useCompare`: localStorage persistence
- `Checkout.jsx`: creates local generated order IDs
- `TestRide.jsx`: stores booking in localStorage
- `Account.jsx` and `OrderTracking.jsx`: mock profile/orders

Backend needs:

- Customer auth and profile APIs
- Product catalog APIs with filters, search, sorting, details, reviews, inventory availability
- Cart, wishlist, and compare persistence per customer
- Checkout, order creation, payment initialization, payment verification
- Test ride slot availability and booking
- Showroom directory and brand/product availability
- Finance/EMI offers and loan lead capture
- Order tracking and customer order history

### Showroom Owner Portal: `ev-vender`

Framework: Next.js App Router.

Important routes:

- `/dashboard`: showroom owner overview, revenue, orders, stock alerts, product approval status
- `/products`: product listing and product status
- `/inventory`: stock and stock history
- `/orders`: vendor/showroom orders
- `/leads`: customer leads
- `/customers`: customers derived from orders
- `/analytics`: revenue, orders, traffic analytics
- `/showroom`: showroom profiles
- `/reviews`: product reviews
- `/notifications`: notifications
- `/settings`: vendor/showroom settings

Current mock data:

- `lib/mock-data.ts`
- `mockVendor`: vendor profile
- `mockProducts`: products with approval status, stock, decision date, rejection reason
- `mockStockHistory`: restock, sale, adjustment, low stock events
- `mockOrders`: customer orders
- `mockLeads`: customer lead pipeline
- `mockNotifications`: notification inbox
- `mockAnalytics`: revenue, orders, traffic charts
- `mockShowrooms`: showroom locations and test ride count
- `mockReviews`: customer reviews

Backend needs:

- Vendor/showroom authentication and scoped access
- Product CRUD with approval workflow
- Product image upload and validation
- Inventory stock management and stock audit log
- Vendor order management
- Lead management pipeline
- Showroom profile and staff management
- Vendor analytics and reports
- Vendor notifications
- Review listing and vendor replies

### Admin Portal: `ev-admin`

Framework: Next.js App Router.

Important routes:

- `/admin`: dashboard
- `/admin/users`: customer/admin user management
- `/admin/products` and `/admin/bikes`: product and bike management
- `/admin/orders`: order operations and dispute status
- `/admin/payments`: refunds, payouts, settlements, disputes, failed payments
- `/admin/test-ride`: test ride bookings, staff assignment, follow-up
- `/admin/stock`: platform inventory management
- `/admin/reviews`: review moderation and analytics
- `/admin/support`: support ticket management
- `/admin/roles`: admin roles and permission matrix
- `/admin/showroom`: showroom management
- `/admin/offers`: promotional offers
- `/admin/reports`: reporting dashboard
- `/admin/settings`: platform settings

Current mock/type sources:

- `components/orders/types.ts`: admin order model and statuses
- `components/payments/types.ts` and `mockData.ts`: refunds, payouts, settlements, disputes, failed payments
- `components/test-ride/types.ts`: test ride booking and follow-up model
- `components/reviews/types.ts`: review moderation model
- `components/support/types.ts`: support tickets
- `components/roles/types.ts`: roles, permissions, admin users
- `components/stock/*`: inventory rows, stock edits, additions, details
- `app/admin/users/page.tsx`: user management mock data

Backend needs:

- Admin authentication, role-based access control, permissions
- Customer/admin/vendor user management
- Vendor/showroom approval and suspension
- Product approval/moderation
- Order operations, disputes, refunds
- Payment reconciliation, vendor payouts, settlement reports
- Support tickets and SLA tracking
- Review moderation, fraud/report handling
- Test ride management and staff assignment
- Platform analytics and exports

## 2. Recommended Backend Stack

Use a single API backend for all three apps.

Recommended option:

- Runtime: Node.js
- Framework: NestJS or Express/Fastify
- Database: PostgreSQL
- ORM: Prisma
- Cache/queue: Redis + BullMQ
- Object storage: S3-compatible storage for product/review/vendor documents
- Auth: JWT access token + refresh token, or session cookies if hosted under one domain
- Payments: Razorpay/Stripe/Cashfree abstraction layer
- Email/SMS/WhatsApp: provider abstraction for OTPs, order updates, and test ride reminders

Alternative: Next.js API routes can work for an MVP, but a separate backend is cleaner because this platform has multiple apps, role boundaries, background jobs, and payment webhooks.

## 3. Core Roles And Access

Roles:

- `customer`: marketplace user
- `vendor_owner`: showroom/vendor owner
- `vendor_staff`: showroom staff
- `support_agent`: support ticket operations
- `finance_admin`: refunds, settlements, payouts
- `vendor_manager`: vendor/showroom and product approval
- `operations_manager`: orders, stock, test rides
- `moderator`: reviews and reported content
- `super_admin`: full access

Access rules:

- Customers can only access their own cart, wishlist, orders, test rides, reviews, addresses, and profile.
- Vendor users can only access their assigned vendor/showroom data.
- Admin users require module permissions for view, edit, delete, approve, and export.
- Payment webhooks must use signature verification and idempotency.
- Stock mutations must always create audit log entries.

## 4. Main Database Tables

### Identity

- `users`: id, name, email, phone, passwordHash, role, status, emailVerifiedAt, phoneVerifiedAt, lastLoginAt, createdAt, updatedAt
- `admin_users`: userId, department, roleId, status
- `roles`: id, name, type, description
- `permissions`: id, roleId, module, canView, canEdit, canDelete, canApprove, canExport
- `refresh_tokens`: id, userId, tokenHash, expiresAt, revokedAt

### Vendor And Showroom

- `vendors`: id, businessName, legalName, email, phone, gstNumber, status, rating, totalSales, verifiedAt, rejectionReason
- `vendor_users`: id, vendorId, userId, role
- `showrooms`: id, vendorId, name, city, area, address, phone, email, timing, days, latitude, longitude, status
- `showroom_staff`: id, showroomId, name, phone, email, role, active
- `vendor_documents`: id, vendorId, type, fileUrl, verificationStatus, rejectionReason

### Catalog

- `brands`: id, name, status
- `products`: id, vendorId, brandId, name, model, description, price, originalPrice, discount, category, status, approvalStatus, rejectionReason, decisionDate, createdAt, updatedAt
- `product_specs`: productId, rangeKm, topSpeedKmph, chargingTimeHours, batteryCapacityKwh, motorPowerWatts, weightKg
- `product_images`: id, productId, url, alt, sortOrder
- `product_colors`: id, productId, name, hex
- `showroom_products`: id, showroomId, productId, availableForSale, availableForTestRide

Suggested product statuses:

- `draft`
- `pending_approval`
- `approved`
- `rejected`
- `inactive`
- `out_of_stock`
- `discontinued`

### Inventory

- `inventory`: id, showroomId, productId, stock, reservedStock, lowStockThreshold, updatedAt
- `stock_movements`: id, inventoryId, productId, showroomId, type, quantity, reason, note, referenceType, referenceId, createdBy, createdAt

Movement types:

- `restock`
- `sale`
- `reservation`
- `release`
- `adjustment`
- `return`
- `low_stock_alert`

### Commerce

- `carts`: id, userId, status, createdAt, updatedAt
- `cart_items`: id, cartId, productId, showroomId, quantity, priceSnapshot
- `wishlists`: id, userId, productId, createdAt
- `compare_items`: id, userId, productId, createdAt
- `orders`: id, orderNumber, userId, vendorId, showroomId, status, bookingType, subtotal, discount, tax, totalAmount, paymentStatus, deliveryAddressId, createdAt, updatedAt
- `order_items`: id, orderId, productId, productName, quantity, unitPrice, totalPrice
- `order_status_history`: id, orderId, fromStatus, toStatus, note, changedBy, createdAt
- `addresses`: id, userId, name, phone, street, city, state, pincode, country, isDefault

Suggested order statuses:

- `pending`
- `confirmed`
- `approved`
- `packed`
- `shipped`
- `delivered`
- `cancelled`
- `disputed`
- `refunded`

### Payments And Finance

- `payments`: id, orderId, gateway, gatewayPaymentId, paymentMode, amount, status, failureReason, retryCount, lastAttemptAt, createdAt
- `refunds`: id, orderId, paymentId, customerId, vendorId, reason, amount, status, hasEvidence, autoEligible, vendorDisputed, createdAt
- `vendor_payouts`: id, vendorId, ordersDelivered, grossSales, commission, deductions, netPayout, status, settlementDate
- `settlements`: id, date, gateway, grossAmount, fees, netReceived, status, reconciliationStatus
- `payment_disputes`: id, orderId, customerId, vendorId, issueType, amount, riskLevel, status, ageDays, hasEvidence
- `finance_leads`: id, userId, productId, loanAmount, downPayment, tenureMonths, interestRate, monthlyIncome, employmentType, status

### Test Rides And Leads

- `test_ride_bookings`: id, bookingNumber, userId, productId, showroomId, date, timeSlot, status, assignedStaffId, followUpStatus, notes, createdAt
- `test_ride_slots`: id, showroomId, productId, date, timeSlot, capacity, bookedCount, active
- `leads`: id, vendorId, showroomId, userId, productId, source, name, email, phone, message, priority, status, assignedTo, createdAt

Test ride statuses:

- `pending`
- `confirmed`
- `completed`
- `cancelled`
- `no_show`

Lead statuses:

- `new`
- `contacted`
- `qualified`
- `converted`
- `lost`

### Reviews And Support

- `reviews`: id, userId, orderId, productId, showroomId, rating, review, status, sentiment, reported, fraudScore, createdAt
- `review_photos`: id, reviewId, url
- `review_replies`: id, reviewId, vendorId, text, createdAt
- `support_tickets`: id, ticketNumber, customerId, category, priority, assignedAgentId, status, slaDueAt, lastUpdateAt, unread, overdue, evReference, orderReference, subject, description
- `ticket_messages`: id, ticketId, senderId, message, attachments, createdAt

### Notifications And Analytics

- `notifications`: id, userId, type, title, message, readAt, metadata, createdAt
- `analytics_events`: id, userId, sessionId, eventName, entityType, entityId, metadata, createdAt
- `reports_exports`: id, requestedBy, reportType, filters, fileUrl, status, createdAt

## 5. API Response Shape

Use one consistent response format:

```json
{
  "success": true,
  "data": {},
  "message": "Done"
}
```

Paginated list response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 120,
    "totalPages": 6
  }
}
```

Error response:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": {}
  }
}
```

## 6. API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`
- `GET /api/auth/me`

### Customer Marketplace

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/:id/reviews`
- `GET /api/brands`
- `GET /api/showrooms`
- `GET /api/showrooms/:id`
- `GET /api/showrooms/:id/products`
- `GET /api/cart`
- `POST /api/cart/items`
- `PATCH /api/cart/items/:id`
- `DELETE /api/cart/items/:id`
- `GET /api/wishlist`
- `POST /api/wishlist/:productId`
- `DELETE /api/wishlist/:productId`
- `GET /api/compare`
- `POST /api/compare/:productId`
- `DELETE /api/compare/:productId`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `GET /api/orders/:id/tracking`
- `POST /api/payments/initiate`
- `POST /api/payments/verify`
- `POST /api/payments/webhook`
- `GET /api/test-rides/slots`
- `POST /api/test-rides`
- `GET /api/test-rides/my`
- `PATCH /api/test-rides/:id/cancel`
- `POST /api/finance/leads`
- `GET /api/account/profile`
- `PATCH /api/account/profile`
- `GET /api/account/addresses`
- `POST /api/account/addresses`
- `PATCH /api/account/addresses/:id`
- `DELETE /api/account/addresses/:id`

### Vendor/Showroom Portal

- `GET /api/vendor/dashboard`
- `GET /api/vendor/profile`
- `PATCH /api/vendor/profile`
- `GET /api/vendor/showrooms`
- `POST /api/vendor/showrooms`
- `PATCH /api/vendor/showrooms/:id`
- `GET /api/vendor/products`
- `POST /api/vendor/products`
- `GET /api/vendor/products/:id`
- `PATCH /api/vendor/products/:id`
- `DELETE /api/vendor/products/:id`
- `POST /api/vendor/products/:id/submit-approval`
- `POST /api/vendor/products/:id/images`
- `GET /api/vendor/inventory`
- `PATCH /api/vendor/inventory/:id`
- `POST /api/vendor/inventory/:id/stock-movement`
- `GET /api/vendor/stock-history`
- `GET /api/vendor/orders`
- `GET /api/vendor/orders/:id`
- `PATCH /api/vendor/orders/:id/status`
- `GET /api/vendor/leads`
- `PATCH /api/vendor/leads/:id`
- `GET /api/vendor/customers`
- `GET /api/vendor/reviews`
- `POST /api/vendor/reviews/:id/reply`
- `GET /api/vendor/analytics`
- `GET /api/vendor/notifications`
- `PATCH /api/vendor/notifications/:id/read`

### Admin Portal

- `GET /api/admin/dashboard`
- `GET /api/admin/users`
- `POST /api/admin/users/invite`
- `PATCH /api/admin/users/:id/status`
- `GET /api/admin/vendors`
- `PATCH /api/admin/vendors/:id/status`
- `GET /api/admin/showrooms`
- `PATCH /api/admin/showrooms/:id/status`
- `GET /api/admin/products`
- `PATCH /api/admin/products/:id/approve`
- `PATCH /api/admin/products/:id/reject`
- `GET /api/admin/orders`
- `GET /api/admin/orders/:id`
- `PATCH /api/admin/orders/:id/status`
- `GET /api/admin/payments/refunds`
- `PATCH /api/admin/payments/refunds/:id/status`
- `GET /api/admin/payments/payouts`
- `PATCH /api/admin/payments/payouts/:id/status`
- `GET /api/admin/payments/settlements`
- `GET /api/admin/payments/disputes`
- `PATCH /api/admin/payments/disputes/:id/status`
- `GET /api/admin/payments/failed`
- `GET /api/admin/test-rides`
- `PATCH /api/admin/test-rides/:id/status`
- `PATCH /api/admin/test-rides/:id/assign-staff`
- `PATCH /api/admin/test-rides/:id/follow-up`
- `GET /api/admin/inventory`
- `POST /api/admin/inventory`
- `PATCH /api/admin/inventory/:id`
- `DELETE /api/admin/inventory/:id`
- `GET /api/admin/reviews`
- `PATCH /api/admin/reviews/:id/moderate`
- `GET /api/admin/support/tickets`
- `POST /api/admin/support/tickets`
- `PATCH /api/admin/support/tickets/:id`
- `POST /api/admin/support/tickets/:id/messages`
- `GET /api/admin/roles`
- `POST /api/admin/roles`
- `PATCH /api/admin/roles/:id`
- `PATCH /api/admin/roles/:id/permissions`
- `GET /api/admin/reports/:type`
- `POST /api/admin/reports/:type/export`
- `GET /api/admin/settings`
- `PATCH /api/admin/settings`

## 7. Required Filters And Query Parameters

Products:

- `search`
- `brand`
- `category`
- `minPrice`
- `maxPrice`
- `minRange`
- `city`
- `showroomId`
- `status`
- `approvalStatus`
- `sort`
- `page`
- `pageSize`

Orders:

- `status`
- `paymentStatus`
- `bookingType`
- `vendorId`
- `showroomId`
- `customerId`
- `startDate`
- `endDate`
- `search`
- `page`
- `pageSize`

Payments:

- `status`
- `paymentMode`
- `gateway`
- `vendorId`
- `city`
- `startDate`
- `endDate`

Test rides:

- `status`
- `followUp`
- `showroomId`
- `productId`
- `date`
- `city`

Reviews:

- `status`
- `rating`
- `reported`
- `sentiment`
- `productId`
- `showroomId`

Support:

- `status`
- `priority`
- `category`
- `assignedAgentId`
- `overdue`

## 8. Important Workflows

### Product Approval

1. Vendor creates or edits a product.
2. Product status becomes `pending_approval`.
3. Admin reviews product details, images, specs, and pricing.
4. Admin approves or rejects.
5. Rejection requires `rejectionReason`.
6. Vendor dashboard shows latest decision and date.

### Checkout And Order

1. Customer adds items to cart.
2. Backend validates stock and reserves inventory during checkout.
3. Backend creates pending order.
4. Backend initiates payment.
5. Payment webhook confirms payment.
6. Order becomes `confirmed` or payment becomes `failed`.
7. Stock movement is created for reservation/sale.
8. Customer and vendor receive notifications.

### Test Ride Booking

1. Customer selects product, showroom, date, and slot.
2. Backend checks slot capacity.
3. Booking is created as `pending` or `confirmed`.
4. Admin/vendor can assign staff.
5. Status can move to `completed`, `cancelled`, or `no_show`.
6. Follow-up status can become `converted` if an order is placed.

### Refund

1. Customer/admin creates refund request.
2. Backend checks payment and order eligibility.
3. Finance admin approves/rejects.
4. Payment gateway refund is triggered.
5. Refund status updates through webhook or polling.
6. Vendor payout deductions are adjusted.

### Stock Update

1. Vendor/admin changes stock.
2. Backend validates permission and non-negative stock.
3. Inventory row is updated.
4. Stock movement audit row is inserted.
5. Low stock notification is created if stock is below threshold.

## 9. Frontend Integration Mapping

Replace these current files/flows first:

- `ev-marketplace/src/data/scooters.js` -> `GET /api/products`
- `ev-marketplace/src/data/showrooms.js` -> `GET /api/showrooms`
- Marketplace localStorage cart -> `/api/cart`
- Marketplace localStorage wishlist -> `/api/wishlist`
- Marketplace localStorage test ride booking -> `/api/test-rides`
- `ev-vender/lib/mock-data.ts` -> `/api/vendor/*`
- `ev-admin/components/payments/mockData.ts` -> `/api/admin/payments/*`
- Admin mock arrays in type files -> `/api/admin/*`

Keep localStorage only for anonymous browsing preferences. Once a user logs in, sync cart, wishlist, and compare items to the backend.

## 10. Security Requirements

- Hash passwords with bcrypt or argon2.
- Validate all request bodies with schemas.
- Use rate limiting on auth, OTP, payment, and public search endpoints.
- Verify payment webhook signatures.
- Use idempotency keys for checkout, payment, refund, and webhook processing.
- Enforce vendor scoping on every `/api/vendor/*` endpoint.
- Enforce admin permissions on every `/api/admin/*` endpoint.
- Store uploaded files in object storage, not the database.
- Keep audit logs for admin actions, product approval, stock movement, refunds, and role permission changes.

## 11. MVP Build Phases

### Phase 1: Foundation

- Database schema and migrations
- Auth, roles, vendor scoping, admin permissions
- Product, brand, showroom APIs
- Customer product listing/detail integration

### Phase 2: Commerce

- Cart, wishlist, compare
- Checkout and order creation
- Payment initiation/webhook verification
- Order tracking
- Inventory reservation and stock movement

### Phase 3: Vendor Portal

- Vendor dashboard APIs
- Product CRUD and approval submission
- Inventory management
- Vendor orders, leads, reviews, notifications
- Vendor analytics

### Phase 4: Admin Portal

- Admin dashboard
- User/vendor/showroom management
- Product approval
- Orders, refunds, payouts, settlements, disputes
- Test ride management
- Support tickets
- Reviews moderation
- Reports and exports

### Phase 5: Automation

- Email/SMS/WhatsApp notifications
- Low stock alerts
- Test ride reminders
- Payment reconciliation jobs
- Vendor payout generation
- Analytics event tracking

## 12. Initial Backend TODO Checklist

- [ ] Pick backend framework and create backend app folder.
- [ ] Configure PostgreSQL, Prisma, Redis, environment variables.
- [ ] Create database schema for users, vendors, showrooms, products, inventory, orders, payments, test rides, reviews, support, notifications.
- [ ] Implement auth and role middleware.
- [ ] Implement public marketplace APIs for products and showrooms.
- [ ] Implement cart, wishlist, compare APIs.
- [ ] Implement checkout and payment APIs.
- [ ] Implement vendor APIs and replace `ev-vender/lib/mock-data.ts`.
- [ ] Implement admin APIs and replace admin mock data.
- [ ] Add webhook handlers and idempotency.
- [ ] Add seed data matching current frontend mock data.
- [ ] Add API client helpers in all three apps.

