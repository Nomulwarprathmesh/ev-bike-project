# 🧪 VOLTRIX Frontend - Manual Testing Checklist

## Pre-Launch Testing Checklist

### 1. ROUTING & NAVIGATION
- [ ] Home page (`/`) loads without errors
- [ ] All navbar links navigate correctly
- [ ] Logo click returns to home
- [ ] Mobile menu opens/closes smoothly
- [ ] All 13 routes accessible and functional
- [ ] 404 page displays for invalid routes
- [ ] Back button works in browser
- [ ] No console errors on any page

### 2. RESPONSIVE DESIGN
#### Mobile (360px)
- [ ] No horizontal scroll
- [ ] Text readable without zoom
- [ ] Buttons touch-friendly (min 44px)
- [ ] Images scale properly
- [ ] Mobile menu visible and functional
- [ ] Forms stack vertically

#### Mobile (430px)
- [ ] Layout looks good
- [ ] All content visible
- [ ] No overlapping elements
- [ ] Navbar collapses properly

#### Tablet (768px)
- [ ] 2-column grid for products
- [ ] Sidebar visible on some pages
- [ ] Filters accessible
- [ ] Forms have good spacing

#### Laptop (1024px)
- [ ] 3-column grid for products
- [ ] Full navbar visible
- [ ] Sidebar visible
- [ ] All features accessible

#### Desktop (1440px)
- [ ] Max-width container respected
- [ ] Full layout visible
- [ ] No stretched elements
- [ ] Professional appearance

### 3. HOME PAGE
- [ ] Hero section loads with animations
- [ ] CTA buttons clickable and functional
- [ ] Popular scooters section displays 6 items
- [ ] Stats section animates on scroll
- [ ] "Why Choose Voltrix" section displays 6 features
- [ ] AI Finder section has working CTA
- [ ] Finance banner displays correctly
- [ ] Testimonials section shows 3 reviews
- [ ] Footer visible and links work
- [ ] No broken images

### 4. LISTING PAGE
- [ ] Products load in grid view
- [ ] Search works for scooter names
- [ ] Search works for brand names
- [ ] Brand filter works
- [ ] Category filter works
- [ ] Price slider works
- [ ] Range slider works
- [ ] Sort dropdown works (5 options)
- [ ] Grid/List toggle works
- [ ] Wishlist button adds to wishlist
- [ ] Compare button adds to compare
- [ ] View Details link works
- [ ] Empty state shows when no results
- [ ] Filter count badge updates

### 5. PRODUCT DETAIL PAGE
- [ ] Dynamic route works for each product
- [ ] Main image displays
- [ ] Image navigation arrows work
- [ ] Thumbnails clickable
- [ ] Color selector shows 4 colors
- [ ] Color selection visual feedback works
- [ ] Overview tab displays content
- [ ] Specifications tab shows all specs
- [ ] EMI & Finance tab shows calculator
- [ ] Reviews tab shows ratings and reviews
- [ ] Add to Cart button works
- [ ] Buy Now button works
- [ ] Book Test Ride link works
- [ ] Wishlist heart button works
- [ ] Share button visible
- [ ] Similar scooters section shows 3 items
- [ ] Price displays correctly
- [ ] Discount badge shows percentage
- [ ] Rating and review count display

### 6. CART PAGE
- [ ] Empty cart shows friendly message
- [ ] Add to cart items display
- [ ] Quantity +/- buttons work
- [ ] Remove button removes item
- [ ] Subtotal calculates correctly
- [ ] Coupon input accepts codes
- [ ] Valid coupon (VOLTRIX10) applies discount
- [ ] Invalid coupon shows error
- [ ] Discount amount displays
- [ ] Total calculates with discount
- [ ] Checkout button navigates to checkout
- [ ] Continue Shopping link works
- [ ] Cart badge updates in navbar

### 7. CHECKOUT PAGE
- [ ] Step 1: Delivery form displays
- [ ] Step 1: All fields required
- [ ] Step 1: Continue button disabled until filled
- [ ] Step 2: Payment methods display (Card, UPI, EMI)
- [ ] Step 2: Card fields show when Card selected
- [ ] Step 2: UPI field shows when UPI selected
- [ ] Step 2: EMI options show when EMI selected
- [ ] Step 3: Confirmation screen displays
- [ ] Order ID generates
- [ ] Order summary displays in sidebar
- [ ] Back button works between steps
- [ ] Order summary updates correctly

### 8. WISHLIST PAGE
- [ ] Empty wishlist shows message
- [ ] Saved items display in grid
- [ ] Remove button removes item
- [ ] Clear All button clears wishlist
- [ ] View Details link works
- [ ] Add to Cart button works
- [ ] Wishlist count displays

### 9. COMPARE PAGE
- [ ] Empty state shows message
- [ ] Add Scooter button opens picker
- [ ] Can add up to 4 scooters
- [ ] Remove button removes scooter
- [ ] Comparison table displays
- [ ] Best specs highlighted in green
- [ ] All specifications display
- [ ] Features section shows checkmarks
- [ ] View button links to product detail
- [ ] Mobile horizontal scroll works

### 10. SHOWROOMS PAGE
- [ ] Showroom cards display
- [ ] City filter buttons work
- [ ] Search works for city/area/name
- [ ] Showroom details display (phone, email, timing)
- [ ] Book Visit button works
- [ ] Map placeholder displays
- [ ] Map markers clickable
- [ ] Booking confirmation shows
- [ ] Get Directions link works
- [ ] Empty state shows when no results

### 11. TEST RIDE PAGE
- [ ] Step 1: Scooter selection works
- [ ] Step 2: Showroom selection works
- [ ] Step 3: Date picker works
- [ ] Step 3: Time slots display
- [ ] Step 4: Form fields display
- [ ] Step 5: Confirmation shows booking ID
- [ ] Back button works between steps
- [ ] Progress bar updates
- [ ] All validations work

### 12. FINANCE PAGE
- [ ] Scooter selector displays
- [ ] Loan amount slider works
- [ ] Down payment slider works
- [ ] Interest rate slider works
- [ ] Tenure buttons work (12, 24, 36, 48, 60)
- [ ] EMI calculates correctly
- [ ] Total interest calculates
- [ ] Total payable calculates
- [ ] Bank offers display (6 banks)
- [ ] Eligibility checklist works
- [ ] Progress bar updates
- [ ] Apply for Loan button works

### 13. ACCOUNT PAGE
- [ ] Profile tab displays user info
- [ ] Edit button enables editing
- [ ] Save button saves changes
- [ ] Orders tab shows mock orders
- [ ] Order status displays correctly
- [ ] Track button works
- [ ] Wishlist tab shows saved items
- [ ] Settings tab shows notifications
- [ ] Toggle switches work
- [ ] Sign Out button visible

### 14. ORDER TRACKING PAGE
- [ ] Search bar accepts order ID
- [ ] Search finds correct order
- [ ] Order details display
- [ ] Timeline shows all steps
- [ ] Completed steps show checkmark
- [ ] Current step shows animation
- [ ] Delivery address displays
- [ ] Delivery partner info shows
- [ ] Contact support button visible

### 15. LOGIN PAGE
- [ ] Email input accepts text
- [ ] Password input hides text
- [ ] Show/hide password toggle works
- [ ] Remember me checkbox works
- [ ] Forgot password link visible
- [ ] Sign In button works
- [ ] Sign up link works

### 16. SIGNUP PAGE
- [ ] All form fields display
- [ ] Form validation works
- [ ] Password requirements show
- [ ] Create Account button works
- [ ] Sign in link works
- [ ] Terms and Privacy links visible

### 17. ANIMATIONS & INTERACTIONS
- [ ] Page transitions smooth
- [ ] Card hover effects work
- [ ] Button hover effects work
- [ ] Button tap effects work
- [ ] Scroll animations trigger
- [ ] Modal animations smooth
- [ ] No laggy animations
- [ ] 60fps maintained

### 18. IMAGES & MEDIA
- [ ] All product images load
- [ ] Fallback images work
- [ ] Images have correct aspect ratio
- [ ] No stretched images
- [ ] No broken image icons
- [ ] Images load quickly
- [ ] Lazy loading works

### 19. FORMS & VALIDATION
- [ ] Required fields validated
- [ ] Email format validated
- [ ] Phone number format validated
- [ ] Error messages display
- [ ] Success messages display
- [ ] Form submission works
- [ ] Form reset works

### 20. ACCESSIBILITY
- [ ] Tab navigation works
- [ ] Focus states visible
- [ ] Buttons have labels
- [ ] Form labels present
- [ ] Color contrast readable
- [ ] Alt text on images
- [ ] Keyboard shortcuts work

### 21. PERFORMANCE
- [ ] Page loads in < 2 seconds
- [ ] Route changes in < 500ms
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth scrolling
- [ ] No jank or stuttering

### 22. BROWSER COMPATIBILITY
- [ ] Chrome latest version
- [ ] Firefox latest version
- [ ] Safari latest version
- [ ] Edge latest version
- [ ] Mobile browsers

### 23. NETWORK CONDITIONS
- [ ] Works on 4G
- [ ] Works on WiFi
- [ ] Handles slow network
- [ ] Handles offline (gracefully)
- [ ] Retry logic works

### 24. DATA PERSISTENCE
- [ ] Cart persists on refresh
- [ ] Wishlist persists on refresh
- [ ] Compare list persists on refresh
- [ ] Form data persists
- [ ] User preferences saved

---

## Testing Notes

### Device Testing
- [ ] iPhone 12 (390x844)
- [ ] iPhone SE (375x667)
- [ ] Samsung Galaxy S21 (360x800)
- [ ] iPad (768x1024)
- [ ] Desktop 1920x1080
- [ ] Desktop 1440x900

### Browser Testing
- [ ] Chrome 120+
- [ ] Firefox 121+
- [ ] Safari 17+
- [ ] Edge 120+

### Network Testing
- [ ] 4G LTE
- [ ] WiFi 5GHz
- [ ] WiFi 2.4GHz
- [ ] Slow 3G (throttled)

---

## Sign-Off

**Tested By:** ___________________  
**Date:** ___________________  
**Status:** ☐ Pass ☐ Fail  
**Issues Found:** ___________________  
**Ready for Launch:** ☐ Yes ☐ No  

---

**Last Updated:** 2025  
**Version:** 1.0
