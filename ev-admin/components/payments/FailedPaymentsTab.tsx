"use client";

import { RefreshCw, Link2, XCircle, Phone, AlertOctagon } from "lucide-react";
import type { FailedPayment } from "./types";

export default function FailedPaymentsTab({ payments }: { payments: FailedPayment[] }) {
  if (payments.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <AlertOctagon size={40} className="mb-3 text-slate-200" />
        <p className="font-semibold text-slate-500">No failed payments</p>
        <p className="text-sm mt-1">All payments processed successfully.</p>
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full text-sm min-w-[900px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {["Payment ID", "Customer", "Order ID", "Gateway", "Mode", "Failure Reason", "Amount", "Retries", "Last Attempt", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {payments.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
              <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">{p.id}</td>
              <td className="px-4 py-3 text-xs font-semibold text-slate-800">{p.customer}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.orderId}</td>
              <td className="px-4 py-3 text-xs text-slate-600">{p.gateway}</td>
              <td className="px-4 py-3">
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{p.paymentMode}</span>
              </td>
              <td className="px-4 py-3 text-xs text-rose-600 font-medium max-w-[140px] truncate">{p.failureReason}</td>
              <td className="px-4 py-3 text-xs font-bold text-slate-800">₹{p.amount.toLocaleString("en-IN")}</td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.retryCount >= 3 ? "bg-rose-100 text-rose-700" : p.retryCount > 0 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                  {p.retryCount}x
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{p.lastAttempt}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <button className="text-xs bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-2 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1">
                    <RefreshCw size={11} /> Retry
                  </button>
                  <button className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1">
                    <Link2 size={11} /> Link
                  </button>
                  <button className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 px-2 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1">
                    <XCircle size={11} />
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
