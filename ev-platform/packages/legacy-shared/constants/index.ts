// Shared Constants for EV Marketplace Platform

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
export const API_TIMEOUT = 30000; // 30 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGES_PER_PRODUCT = 10;

// Currency
export const DEFAULT_CURRENCY = "INR";
export const CURRENCY_SYMBOL = "₹";

// Date Formats
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATETIME_FORMAT = "DD/MM/YYYY HH:mm";

// Order Status Colors
export const ORDER_STATUS_COLORS = {
  pending: "yellow",
  confirmed: "blue",
  processing: "purple",
  shipped: "indigo",
  delivered: "green",
  cancelled: "red",
  refunded: "orange",
} as const;

// Payment Status Colors
export const PAYMENT_STATUS_COLORS = {
  pending: "yellow",
  completed: "green",
  failed: "red",
  refunded: "orange",
} as const;

// Product Status Colors
export const PRODUCT_STATUS_COLORS = {
  active: "green",
  inactive: "gray",
  out_of_stock: "red",
  discontinued: "red",
} as const;

// Vendor Status Colors
export const VENDOR_STATUS_COLORS = {
  pending: "yellow",
  approved: "green",
  rejected: "red",
  suspended: "orange",
} as const;

// Routes
export const ROUTES = {
  // Admin Routes
  ADMIN: {
    DASHBOARD: "/admin",
    BIKES: "/admin/bikes",
    ORDERS: "/admin/orders",
    VENDORS: "/admin/vendors",
    USERS: "/admin/users",
    REVIEWS: "/admin/reviews",
    REPORTS: "/admin/reports",
    SETTINGS: "/admin/settings",
  },
  // Vendor Routes
  VENDOR: {
    DASHBOARD: "/vendor",
    PRODUCTS: "/vendor/products",
    ORDERS: "/vendor/orders",
    REVIEWS: "/vendor/reviews",
    PROFILE: "/vendor/profile",
  },
  // Marketplace Routes
  MARKETPLACE: {
    HOME: "/",
    BIKES: "/bikes",
    BIKE_DETAIL: "/bikes/:id",
    CART: "/cart",
    CHECKOUT: "/checkout",
    ORDERS: "/orders",
    PROFILE: "/profile",
  },
} as const;

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_LENGTH: 10,
  PINCODE_LENGTH: 6,
  GST_LENGTH: 15,
  MIN_RATING: 1,
  MAX_RATING: 5,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  PASSWORDS_DONT_MATCH: "Passwords do not match",
  INVALID_GST: "Please enter a valid GST number",
  FILE_TOO_LARGE: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
  INVALID_FILE_TYPE: "Invalid file type",
  NETWORK_ERROR: "Network error. Please try again.",
  UNAUTHORIZED: "You are not authorized to perform this action",
  SERVER_ERROR: "Server error. Please try again later.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  REGISTER_SUCCESS: "Registration successful",
  UPDATE_SUCCESS: "Updated successfully",
  DELETE_SUCCESS: "Deleted successfully",
  CREATE_SUCCESS: "Created successfully",
  ORDER_PLACED: "Order placed successfully",
  PAYMENT_SUCCESS: "Payment completed successfully",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
  CART: "cart",
  THEME: "theme",
} as const;

// Bike Brands
export const BIKE_BRANDS = [
  "Ather",
  "Ola Electric",
  "TVS",
  "Bajaj",
  "Hero Electric",
  "Revolt",
  "Simple Energy",
  "Ultraviolette",
  "Okinawa",
  "Ampere",
] as const;

// Indian States
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;
