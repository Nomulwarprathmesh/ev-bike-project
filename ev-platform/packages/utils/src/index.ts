import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function toPagination(page = 1, pageSize = 20) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safePageSize = Math.min(Math.max(Number(pageSize) || 20, 1), 100);
  return { page: safePage, pageSize: safePageSize, skip: (safePage - 1) * safePageSize };
}

export function labelFromStatus(status: string) {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function stockStatusFromQuantity(stock: number, lowStockThreshold = 20) {
  if (stock <= 0) return "requested";
  if (stock <= lowStockThreshold) return "low_stock";
  return "available";
}
