"use client";

import { FileText, Download, CheckCircle, PauseCircle, Receipt } from "lucide-react";
import type { VendorPayout, PayoutStatus } from "./types";

const statusStyles: Record<PayoutStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-cyan-100 text-cyan-700",
  paid: "bg-emerald-100 text-emerald-700",
  held: "bg-rose-100 text-rose-700",
  failed: "bg-red-100 text-red-700",
};

export default function VendorPayoutsTab({ payouts }: { payouts: VendorPayout[] }) {
  if (payouts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Receipt size={40} className="mb-3 text-slate-200" />
        <p className="font-semibold text-slate-500">No vendor payouts</p>
        <p className="text-sm mt-1">No payouts scheduled for this cycle.</p>
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full text-sm min-w-[900px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {["Vendor", "City", "Orders", "Gross Sales", "Commission", "Deductions", "Net Payout", "Status", "Settlement Date", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {payouts.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
              <td className="px-4 py-3">
                <p className="font-semibold text-slate-800 text-xs">{p.vendor}</p>
                <p className="text-slate-400 text-xs font-mono">{p.id}</p>
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">{p.city}</td>
              <td className="px-4 py-3 text-xs font-semibold text-slate-700">{p.ordersDelivered}</td>
              <td className="px-4 py-3 text-xs font-semibold text-slate-800">₹{(p.grossSales / 100000).toFixed(2)}L</td>
              <td className="px-4 py-3 text-xs text-rose-600 font-medium">-₹{(p.commission / 100000).toFixed(2)}L</td>
              <td className="px-4 py-3 text-xs text-rose-600 font-medium">-₹{p.deductions.toLocaleString("en-IN")}</td>
              <td className="px-4 py-3 text-xs font-bold text-emerald-700">₹{(p.netPayout / 100000).toFixed(2)}L</td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}>{p.status}</span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{p.settlementDate}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <button className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1">
                    <CheckCircle size={11} /> Pay
                  </button>
                  <button className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 px-2.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1">
                    <PauseCircle size={11} /> Hold
                  </button>
                  <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1">
                    <Download size={11} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
