"use client";

import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/offers": "New Offers",
  "/admin/stock": "Stock Management",
  "/admin/bikes": "Vendor Approvals",
  "/admin/users": "Users",
  "/admin/products": "Products",
  "/admin/showroom": "Showroom",
  "/admin/orders": "Orders",
  "/admin/payments": "Payments",
  "/admin/test-ride": "Test Ride",
  "/admin/reviews": "Reviews",
  "/admin/support": "Support",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings & Role",
};

export default function Navbar() {
  const pathname = usePathname();
  const pageName = pageNames[pathname] || "Dashboard";

  return (
    <div className="bg-white border-b px-6 py-4 mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{pageName}</h1>
    </div>
  );
}
