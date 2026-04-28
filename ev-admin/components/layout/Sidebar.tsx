"use client";

import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BikeIcon,
  BoomBox,
  BuildingIcon,
  CarFrontIcon,
  ChartAreaIcon,
  CheckCheckIcon,
  CreditCardIcon,
  HandCoinsIcon,
  LayoutDashboard,
  Package,
  Settings,
  StarIcon,
  ToolCaseIcon,
  Users,
  Zap,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "New Offers", href: "/admin/offers", icon: ToolCaseIcon },
  { name: "Stock Management", href: "/admin/stock", icon: Package },
  { name: "Vendor Approvals", href: "/admin/bikes", icon: CheckCheckIcon },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Products", href: "/admin/products", icon: CarFrontIcon },
  { name: "Showroom", href: "/admin/showroom", icon: BuildingIcon },
  { name: "Orders", href: "/admin/orders", icon: BoomBox },
  { name: "Payments", href: "/admin/payments", icon: CreditCardIcon },
  { name: "Test Ride", href: "/admin/test-ride", icon: BikeIcon },
  { name: "Reviews", href: "/admin/reviews", icon: StarIcon },
  { name: "Support", href: "/admin/support", icon: HandCoinsIcon },
  { name: "Reports", href: "/admin/reports", icon: ChartAreaIcon },
  { name: "Settings & Role", href: "/admin/settings", icon: Settings },
] as const;

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col bg-[#0B1F3A] p-5 text-white">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500">
          <Zap size={24} />
        </div>
        <h1 className="font-bold">EV Admin</h1>
      </div>

      {/* Links */}
      <nav className="space-y-2 flex-1 overflow-y-auto pr-1 scrollbar-hide">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20"
              }`}
            >
              <Icon
                size={18}
                className={`transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout (Bottom Center) */}
      <div className="flex justify-center pt-4">
        <button className="text-red-500 text-sm font-semibold hover:text-red-400 transition-colors">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
