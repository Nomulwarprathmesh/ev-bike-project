"use client";

import { ShieldAlert, UserCheck, Scale, ArrowUpCircle, Ban, Gavel } from "lucide-react";
import type { Dispute, DisputeStatus, RiskLevel } from "./types";

const riskStyles: Record<RiskLevel, string> = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
  fraud: "bg-red-100 text-red-800 font-bold",
};

const statusStyles: Record<DisputeStatus, string> = {
  open: "bg-amber-100 text-amber-700",
  under_review: "bg-cyan-100 text-cyan-700",
  resolved: "bg-emerald-100 text-emerald-700",
  escalated: "bg-rose-100 text-rose-700",
};

export default function DisputesTab({ disputes }: { disputes: Dispute[] }) {
  if (disputes.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Gavel size={40} className="mb-3 text-slate-200" />
        <p className="font-semibold text-slate-500">No active disputes</p>
        <p className="text-sm mt-1">All disputes have been resolved.</p>
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full text-sm min-w-[950px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {["Dispute ID", "Customer", "Vendor", "Order ID", "Issue Type", "Amount", "Evidence", "Risk", "Age", "Status", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {disputes.map((d) => (
            <tr key={d.id} className={`hover:bg-slate-50/80 transition-colors ${d.riskLevel === "fraud" ? "bg-red-50/30" : ""}`}>
              <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">{d.id}</td>
              <td className="px-4 py-3 text-xs font-semibold text-slate-800">{d.customer}</td>
              <td className="px-4 py-3 text-xs text-slate-600">{d.vendor}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-500">{d.orderId}</td>
              <td className="px-4 py-3 text-xs text-slate-600 max-w-[130px] truncate">{d.issueType}</td>
              <td className="px-4 py-3 text-xs font-semibold text-slate-800">₹{d.amount.toLocaleString("en-IN")}</td>
              <td className="px-4 py-3">
                {d.hasEvidence
                  ? <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full font-medium">Uploaded</span>
                  : <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">None</span>}
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit ${riskStyles[d.riskLevel]}`}>
                  {d.riskLevel === "fraud" && <ShieldAlert size={10} />}
                  {d.riskLevel}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold ${d.ageDays >= 10 ? "text-rose-600" : "text-slate-500"}`}>{d.ageDays}d</span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[d.status]}`}>{d.status.replace("_", " ")}</span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <button className="text-xs bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-2 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1">
                    <UserCheck size={11} /> Assign
                  </button>
                  <button className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1">
                    <Scale size={11} /> Resolve
                  </button>
                  <button className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 px-2 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1">
                    <ArrowUpCircle size={11} />
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
