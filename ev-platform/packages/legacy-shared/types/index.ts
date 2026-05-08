// Shared TypeScript Types for EV Marketplace Platform

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "admin" | "vendor" | "customer";

// Product/Bike Types
export interface Bike {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  description: string;
  specifications: BikeSpecifications;
  images: string[];
  vendorId: string;
  stock: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface BikeSpecifications {
  range: number; // in km
  topSpeed: number; // in km/h
  chargingTime: number; // in hours
  batteryCapacity: number; // in kWh
  motorPower: number; // in watts
  weight: number; // in kg
}

export type ProductStatus = "active" | "inactive" | "out_of_stock" | "discontinued";

// Order Types
export interface Order {
  id: string;
  userId: string;
  bikeId: string;
  vendorId: string;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 
  | "pending" 
  | "confirmed" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "cancelled" 
  | "refunded";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

// Address Type
export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
}

// Vendor Types
export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  gstNumber: string;
  address: Address;
  status: VendorStatus;
  rating: number;
  totalSales: number;
  createdAt: Date;
  updatedAt: Date;
}

export type VendorStatus = "pending" | "approved" | "rejected" | "suspended";

// Review Types
export interface Review {
  id: string;
  userId: string;
  bikeId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Test Ride Types
export interface TestRide {
  id: string;
  userId: string;
  bikeId: string;
  vendorId: string;
  scheduledDate: Date;
  status: TestRideStatus;
  location: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TestRideStatus = "scheduled" | "completed" | "cancelled" | "no_show";

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  name: string;
  confirmPassword: string;
}

// Filter Types
export interface BikeFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRange?: number;
  status?: ProductStatus;
  vendorId?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  vendorId?: string;
}
