"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [unreadCount] = useState(
    mockNotifications.filter((n) => !n.read).length
  );

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 z-30 flex items-center justify-between px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products, orders..."
            className="pl-10 bg-gray-50 border-gray-200 rounded-2xl focus:bg-white focus:border-gray-300"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative h-10 w-10 p-0 hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-slate-900 text-white"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white/90 backdrop-blur-md border-gray-100 rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {mockNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors",
                    !notif.read && "bg-slate-50"
                  )}
                >
                  <p className="font-medium text-sm text-gray-900">
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatTime(notif.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 px-2 hover:bg-gray-100">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" />
                <AvatarFallback>EV</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">
                  ElectroVibe
                </span>
                <span className="text-xs text-gray-500">Vendor</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-md border-gray-100 rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <User className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-gray-900">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <Settings className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-gray-900">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-100" />
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <LogOut className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-gray-900">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}
