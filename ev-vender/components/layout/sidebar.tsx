"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Plus,
  ShoppingCart,
  Users,
  Zap,
  Warehouse,
  Store,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  { icon: Zap, label: "Leads", href: "/leads" },
  { icon: Warehouse, label: "Inventory", href: "/inventory" },
  { icon: Store, label: "Showroom", href: "/showroom" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: MessageSquare, label: "Reviews", href: "/reviews" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-0 h-screen bg-white/90 backdrop-blur-md border-r border-gray-100 transition-all duration-300 z-40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">EV</span>
              </div>
          <span className="font-bold text-gray-900">ShowroomHub</span>
        </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <ChevronLeft
              className={cn(
                "w-4 h-4 transition-transform text-gray-600",
                collapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 mb-1",
                    isActive
                      ? "bg-slate-100 text-slate-900 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="text-xs text-gray-600">
              <p className="font-semibold text-gray-900 mb-1">ElectroVibe Motors</p>
              <p>Premium EV Vendor</p>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden fixed left-4 top-4 z-50 h-10 w-10 p-0 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white/90 backdrop-blur-md border-r border-gray-100">
          <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 h-16 px-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">EV</span>
          </div>
          <span className="font-bold text-gray-900">ShowroomHub</span>
        </div>
            <nav className="flex-1 overflow-y-auto py-4 px-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 mb-1",
                        isActive
                          ? "bg-slate-100 text-slate-900 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
