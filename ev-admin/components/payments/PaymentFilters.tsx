"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface Filters {
  status: string;
  paymentMode: string;
  vendor: string;
  city: string;
  disputeOnly: boolean;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

const statusOptions = ["All", "pending", "approved", "rejected", "processing", "disputed"];
const modeOptions = ["All", "UPI", "Card", "EMI", "Net Banking", "Wallet"];
const vendorOptions = ["All", "Voltrix Delhi", "EcoRide Mumbai", "GreenWheel Blr", "SpeedEV Pune", "ChargePlus Chennai"];
const cityOptions = ["All", "Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Chennai"];

export default function PaymentFilters({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const set = (key: keyof Filters, val: string | boolean) =>
    onChange({ ...filters, [key]: val });

  const activeChips = [
    filters.status !== "All" && { key: "status", label: `Status: ${filters.status}` },
    filters.paymentMode !== "All" && { key: "paymentMode", label: `Mode: ${filters.paymentMode}` },
    filters.vendor !== "All" && { key: "vendor", label: `Vendor: ${filters.vendor}` },
    filters.city !== "All" && { key: "city", label: `City: ${filters.city}` },
    filters.disputeOnly && { key: "disputeOnly", label: "Disputes only" },
  ].filter(Boolean) as { key: keyof Filters; label: string }[];

  const clearAll = () => onChange({ status: "All", paymentMode: "All", vendor: "All", city: "All", disputeOnly: false });

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-cyan-400 hover:text-cyan-600 px-3 py-2 rounded-xl transition-all"
        >
          <SlidersHorizontal size={14} /> Filters
          {activeChips.length > 0 && (
            <span className="bg-cyan-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{activeChips.length}</span>
          )}
          <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {/* Active chips */}
        {activeChips.map((chip) => (
          <span key={chip.key} className="flex items-center gap-1.5 text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 px-2.5 py-1.5 rounded-full">
            {chip.label}
            <button onClick={() => set(chip.key, chip.key === "disputeOnly" ? false : "All")} className="hover:text-rose-500 transition-colors">
              <X size={11} />
            </button>
          </span>
        ))}

        {activeChips.length > 1 && (
          <button onClick={clearAll} className="text-xs text-slate-400 hover:text-rose-500 font-medium transition-colors">
            Clear all
          </button>
        )}
      </div>

      {open && (
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-3 animate-count">
          <FilterSelect label="Status" value={filters.status} options={statusOptions} onChange={(v) => set("status", v)} />
          <FilterSelect label="Payment Mode" value={filters.paymentMode} options={modeOptions} onChange={(v) => set("paymentMode", v)} />
          <FilterSelect label="Vendor" value={filters.vendor} options={vendorOptions} onChange={(v) => set("vendor", v)} />
          <FilterSelect label="City" value={filters.city} options={cityOptions} onChange={(v) => set("city", v)} />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500">Disputes Only</label>
            <button
              onClick={() => set("disputeOnly", !filters.disputeOnly)}
              className={`h-9 rounded-xl border text-xs font-semibold transition-all ${filters.disputeOnly ? "bg-cyan-500 text-white border-cyan-500" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300"}`}
            >
              {filters.disputeOnly ? "On" : "Off"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-xl border border-slate-200 text-xs text-slate-700 px-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
