"use client";

import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/offers": "Pricing Approvals",
  "/admin/stock": "Inventory Distribution",
  "/admin/bikes": "Dealer Approvals",
  "/admin/users": "Users",
  "/admin/products": "Scooter Catalog",
  "/admin/showroom": "Showrooms",
  "/admin/orders": "Orders",
  "/admin/payments": "Payments",
  "/admin/test-ride": "Test Rides",
  "/admin/reviews": "Review Moderation",
  "/admin/support": "Support & Chat",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings & Roles",
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
