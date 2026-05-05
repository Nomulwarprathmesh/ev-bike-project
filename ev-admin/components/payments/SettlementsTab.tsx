"use client";

import { Landmark, AlertCircle } from "lucide-react";
import type { Settlement } from "./types";

const summaryCards = [
  { label: "Daily Settlement", value: "₹18.4L", sub: "Jul 23, 2025", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Platform Commission", value: "₹1.84L", sub: "10% of gross", color: "text-cyan-600", bg: "bg-cyan-50" },
  { label: "GST Deducted", value: "₹33.1K", sub: "18% on commission", color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Pending Settlement", value: "₹6.8L", sub: "1 gateway pending", color: "text-amber-600", bg: "bg-amber-50" },
];

const paymentSplit = [
  { mode: "UPI", pct: 42, color: "bg-emerald-400" },
  { mode: "Card", pct: 31, color: "bg-cyan-400" },
  { mode: "EMI", pct: 18, color: "bg-indigo-400" },
  { mode: "Net Banking", pct: 9, color: "bg-amber-400" },
];

const reconStyles = {
  matched: "bg-emerald-100 text-emerald-700",
  mismatched: "bg-rose-100 text-rose-700",
  pending: "bg-amber-100 text-amber-700",
};

const statusStyles = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-rose-100 text-rose-700",
};

export default function SettlementsTab({ settlements }: { settlements: Settlement[] }) {
  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <div key={c.label} className={`${c.bg} rounded-2xl p-4 border border-white`}>
            <p className={`text-xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{c.sub}</p>
            <p className="text-xs font-semibold text-slate-600 mt-2">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Payment Mode Split */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <p className="text-sm font-semibold text-slate-700 mb-3">Payment Mode Split</p>
        <div className="flex rounded-full overflow-hidden h-3 mb-3">
          {paymentSplit.map((p) => (
            <div key={p.mode} className={`${p.color} transition-all`} style={{ width: `${p.pct}%` }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {paymentSplit.map((p) => (
            <div key={p.mode} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
              {p.mode} <span className="font-semibold">{p.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Settlement ID", "Date", "Gateway", "Gross Amount", "Fees", "Net Received", "Status", "Reconciliation"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {settlements.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">{s.id}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{s.date}</td>
                <td className="px-4 py-3 text-xs font-medium text-slate-700">{s.gateway}</td>
                <td className="px-4 py-3 text-xs font-semibold text-slate-800">₹{s.grossAmount.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-xs text-rose-600 font-medium">-₹{s.fees.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-xs font-bold text-emerald-700">₹{s.netReceived.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[s.status]}`}>{s.status}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit ${reconStyles[s.reconciliation]}`}>
                    {s.reconciliation === "mismatched" && <AlertCircle size={10} />}
                    {s.reconciliation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
