"use client";

import { Search } from "lucide-react";
import type { BookingStatus } from "./types";

interface Props {
  activeStatus: BookingStatus | "all" | "today";
  onStatusChange: (status: BookingStatus | "all" | "today") => void;
  search: string;
  onSearchChange: (value: string) => void;
}

const TABS: { label: string; value: BookingStatus | "all" | "today"; count?: number }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Today", value: "today" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "No-show", value: "no-show" },
];

export default function TestRideFilters({ activeStatus, onStatusChange, search, onSearchChange }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onStatusChange(tab.value)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                activeStatus === tab.value
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search booking ID, customer, EV model, showroom..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
}
