"use client";

import { Search, Filter, Star } from "lucide-react";
import type { RatingFilter } from "./types";

interface Props {
  activeFilter: RatingFilter;
  onFilterChange: (f: RatingFilter) => void;
  search: string;
  onSearchChange: (s: string) => void;
}

export default function ReviewFilters({ activeFilter, onFilterChange, search, onSearchChange }: Props) {
  const filters: { key: RatingFilter; label: string; count?: number }[] = [
    { key: "all", label: "All Reviews" },
    { key: "5", label: "5 Star", count: 3 },
    { key: "4", label: "4 Star", count: 2 },
    { key: "3", label: "3 Star", count: 1 },
    { key: "2", label: "2 Star", count: 1 },
    { key: "1", label: "1 Star", count: 1 },
    { key: "pending", label: "Pending", count: 2 },
    { key: "reported", label: "Reported", count: 1 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search customer, EV model, showroom..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all">
          <Filter size={15} />
          More Filters
        </button>
      </div>

      {/* Rating Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
        {filters.map((f) => {
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              {f.key !== "all" && f.key !== "pending" && f.key !== "reported" && (
                <Star size={13} className={isActive ? "fill-white" : "fill-amber-400 text-amber-400"} />
              )}
              {f.label}
              {f.count !== undefined && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-white/20" : "bg-slate-200 text-slate-600"}`}>
                  {f.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
