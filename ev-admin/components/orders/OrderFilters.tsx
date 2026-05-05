"use client";

import { useState } from "react";
import { Search, X, SlidersHorizontal, ChevronDown, Zap } from "lucide-react";
import type { OrderStatus } from "./types";

const TABS: { label: string; value: OrderStatus | "all"; count?: number; dot?: string }[] = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "pending", count: 5, dot: "#F59E0B" },
  { label: "Approved", value: "approved", dot: "#06B6D4" },
  { label: "Delivered", value: "delivered", dot: "#10B981" },
  { label: "Disputed", value: "disputed", count: 3, dot: "#EF4444" },
  { label: "Refunded", value: "refunded", dot: "#8B5CF6" },
  { label: "Cancelled", value: "cancelled", dot: "#94A3B8" },
];

const TAB_ACTIVE: Record<string, { bg: string; text: string; shadow: string }> = {
  all:       { bg: "bg-gradient-to-r from-emerald-500 to-cyan-500", text: "text-white", shadow: "shadow-emerald-500/30" },
  pending:   { bg: "bg-gradient-to-r from-amber-400 to-orange-400", text: "text-white", shadow: "shadow-amber-400/30" },
  approved:  { bg: "bg-gradient-to-r from-cyan-500 to-sky-500",     text: "text-white", shadow: "shadow-cyan-500/30" },
  delivered: { bg: "bg-gradient-to-r from-emerald-500 to-green-500",text: "text-white", shadow: "shadow-emerald-500/30" },
  disputed:  { bg: "bg-gradient-to-r from-red-500 to-rose-500",     text: "text-white", shadow: "shadow-red-500/30" },
  refunded:  { bg: "bg-gradient-to-r from-purple-500 to-violet-500",text: "text-white", shadow: "shadow-purple-500/30" },
  cancelled: { bg: "bg-slate-400",                                   text: "text-white", shadow: "shadow-slate-400/30" },
};

interface Props {
  activeStatus: OrderStatus | "all";
  onStatusChange: (s: OrderStatus | "all") => void;
  search: string;
  onSearchChange: (v: string) => void;
}

export default function OrderFilters({ activeStatus, onStatusChange, search, onSearchChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">

      {/* ── Tab Row ── */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {TABS.map((tab) => {
            const active = activeStatus === tab.value;
            const style = TAB_ACTIVE[tab.value];
            return (
              <button
                key={tab.value}
                onClick={() => onStatusChange(tab.value)}
                className={`relative flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  active
                    ? `${style.bg} ${style.text} shadow-lg ${style.shadow} scale-[1.02]`
                    : "text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-700 border border-slate-100"
                }`}
              >
                {/* Status dot for inactive */}
                {!active && tab.dot && (
                  <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: tab.dot }} />
                )}
                {tab.label}
                {tab.count && (
                  <span className={`inline-flex h-5 min-w-5 px-1 items-center justify-center rounded-full text-[10px] font-bold ${active ? "bg-white/25 text-white" : "text-white"}`}
                    style={!active ? { backgroundColor: tab.dot } : {}}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-slate-100 mx-6" />

      {/* ── Search + Filter Row ── */}
      <div className="flex items-center gap-3 px-6 py-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by order ID, customer name, vendor or EV model…"
            className="w-full pl-11 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-400 focus:ring-3 focus:ring-emerald-400/15 transition-all placeholder:text-slate-400 text-slate-700"
          />
          {search && (
            <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 transition-all">
              <X size={11} />
            </button>
          )}
        </div>

        {/* High value toggle */}
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all whitespace-nowrap">
          <Zap size={14} />
          High Value
        </button>

        {/* Filter toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all whitespace-nowrap ${open ? "bg-slate-800 text-white border-slate-800" : "text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100"}`}
        >
          <SlidersHorizontal size={14} />
          Filters
          <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* ── Expanded Filters ── */}
      {open && (
        <div className="px-6 pb-5 border-t border-slate-100 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Payment Status", opts: ["Paid", "Pending", "Failed", "Refunded"] },
              { label: "Vendor", opts: ["Ather Energy", "Ola Electric", "TVS Motors", "Bajaj"] },
              { label: "City", opts: ["Bengaluru", "Mumbai", "Delhi NCR", "Chennai", "Pune"] },
              { label: "EV Brand", opts: ["Ather", "Ola", "TVS", "Bajaj", "Hero"] },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f.label}</label>
                <select className="text-sm px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15 transition-all">
                  <option value="">All</option>
                  {f.opts.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">Clear All</button>
            <button className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm">Apply Filters</button>
          </div>
        </div>
      )}
    </div>
  );
}
