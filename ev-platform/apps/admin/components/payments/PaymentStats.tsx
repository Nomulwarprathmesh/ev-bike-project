"use client";

import { TrendingUp, TrendingDown, RefreshCw, Clock, AlertTriangle, XCircle, DollarSign, Gavel } from "lucide-react";

const stats = [
  { label: "Refunds Processed", value: "₹18.4L", sub: "142 this month", trend: "+12%", up: true, icon: RefreshCw, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Pending Refunds", value: "23", sub: "₹9.2L total value", trend: "+3", up: false, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Vendor Payouts", value: "₹1.46Cr", sub: "5 vendors this cycle", trend: "+8%", up: true, icon: DollarSign, color: "text-cyan-500", bg: "bg-cyan-50" },
  { label: "Avg Refund SLA", value: "3.2 days", sub: "Target: 5 days", trend: "-0.8d", up: true, icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-50" },
  { label: "Failed Payments", value: "5", sub: "₹3.9L at risk", trend: "-2", up: true, icon: XCircle, color: "text-rose-500", bg: "bg-rose-50" },
  { label: "Disputed Amount", value: "₹2.99L", sub: "5 active disputes", trend: "+1", up: false, icon: Gavel, color: "text-orange-500", bg: "bg-orange-50" },
];

export default function PaymentStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-count"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon size={16} className={s.color} />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-emerald-600" : "text-rose-500"}`}>
                {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {s.trend}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800 leading-tight">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </div>
            <p className="text-xs font-medium text-slate-500">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}
