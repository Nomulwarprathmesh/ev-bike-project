export type UserRole =
  | "customer"
  | "vendor_owner"
  | "vendor_staff"
  | "moderator"
  | "finance_admin"
  | "super_admin";

export type ProductStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "inactive"
  | "out_of_stock";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type StockStatus = "available" | "low_stock" | "requested" | "transferred";

export type ServiceStatus = "booked" | "in_progress" | "completed" | "cancelled";

export type PricingRequestStatus = "pending" | "approved" | "rejected";

export type StockRequestStatus = "requested" | "approved" | "transferred" | "rejected";

export const PRODUCT_STATUSES: ProductStatus[] = [
  "draft",
  "pending",
  "approved",
  "rejected",
  "inactive",
  "out_of_stock",
];

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

export const STOCK_STATUSES: StockStatus[] = [
  "available",
  "low_stock",
  "requested",
  "transferred",
];

export const SERVICE_STATUSES: ServiceStatus[] = [
  "booked",
  "in_progress",
  "completed",
  "cancelled",
];

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: "active" | "inactive" | "suspended" | "pending";
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model?: string;
  price: number;
  originalPrice?: number;
  status: ProductStatus;
  rangeKm?: number;
  topSpeedKmph?: number;
  chargingTimeHours?: number;
  batteryCapacityKwh?: number;
  images: string[];
}
