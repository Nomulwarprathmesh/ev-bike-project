"use client";

import { useState } from "react";
import { CheckSquare, Square, Eye, CheckCircle, XCircle, Zap, AlertTriangle, FileText, Download, ChevronDown } from "lucide-react";
import type { Refund, RefundStatus } from "./types";

const statusStyles: Record<RefundStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  processing: "bg-cyan-100 text-cyan-700",
  disputed: "bg-orange-100 text-orange-700",
};

interface Props {
  refunds: Refund[];
  loading: boolean;
  onReview: (r: Refund) => void;
}

export default function RefundTable({ refunds, loading, onReview }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleAll = () =>
    setSelected(selected.size === refunds.length ? new Set() : new Set(refunds.map((r) => r.id)));

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  if (loading) return <SkeletonRows />;

  if (refunds.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <CheckCircle size={40} className="mb-3 text-slate-200" />
        <p className="font-semibold text-slate-500">No refunds found</p>
        <p className="text-sm mt-1">All caught up! No pending refunds match your filters.</p>
      </div>
    );

  return (
    <div className="space-y-3">
      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-slate-800 text-white rounded-xl px-4 py-2.5 text-sm animate-count">
          <span className="font-semibold">{selected.size} selected</span>
          <div className="flex-1" />
          <button className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/30 text-xs">
            <CheckCircle size={13} /> Bulk Approve
          </button>
          <button className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded-lg font-semibold transition-all text-xs">
            <XCircle size={13} /> Bulk Reject
          </button>
          <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg font-semibold transition-all text-xs">
            <Download size={13} /> Export
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-4 py-3 text-left">
                <button onClick={toggleAll} className="text-slate-400 hover:text-slate-600 transition-colors">
                  {selected.size === refunds.length ? <CheckSquare size={16} className="text-cyan-500" /> : <Square size={16} />}
                </button>
              </th>
              {["Refund ID", "Customer / Order", "Vendor", "EV Model", "Reason", "Amount", "Mode", "Age", "Status", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {refunds.map((r) => (
              <tr
                key={r.id}
                className={`group transition-colors hover:bg-slate-50/80 ${r.ageDays >= 15 ? "bg-rose-50/40" : ""}`}
              >
                <td className="px-4 py-3">
                  <button onClick={() => toggle(r.id)} className="text-slate-300 hover:text-cyan-500 transition-colors">
                    {selected.has(r.id) ? <CheckSquare size={16} className="text-cyan-500" /> : <Square size={16} />}
                  </button>
                </td>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">{r.id}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-800 text-xs">{r.customer}</p>
                  <p className="text-slate-400 text-xs">{r.orderId}</p>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">{r.vendor}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{r.evModel}</td>
                <td className="px-4 py-3 text-xs text-slate-500 max-w-[120px] truncate">{r.reason}</td>
                <td className="px-4 py-3 font-semibold text-slate-800 text-xs whitespace-nowrap">₹{r.amount.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{r.paymentMode}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold ${r.ageDays >= 15 ? "text-rose-600" : r.ageDays >= 7 ? "text-amber-600" : "text-slate-500"}`}>
                    {r.ageDays}d
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${statusStyles[r.status]} ${r.status === "pending" ? "badge-pulse" : ""}`}>
                      {r.status}
                    </span>
                    {r.vendorDisputed && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full w-fit font-medium">Disputed</span>}
                    {r.autoEligible && r.status === "pending" && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full w-fit font-medium">Auto-eligible</span>}
                    {r.hasEvidence && <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full w-fit font-medium flex items-center gap-0.5"><FileText size={9} />Docs</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <ActionMenu refund={r} onReview={onReview} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActionMenu({ refund, onReview }: { refund: Refund; onReview: (r: Refund) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-all"
      >
        Actions <ChevronDown size={11} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 bg-white border border-slate-100 rounded-xl shadow-xl py-1 w-40 animate-count">
            {[
              { label: "Review", icon: Eye, action: () => { onReview(refund); setOpen(false); } },
              { label: "Approve", icon: CheckCircle, action: () => setOpen(false) },
              { label: "Auto-approve", icon: Zap, action: () => setOpen(false) },
              { label: "Reject", icon: XCircle, action: () => setOpen(false) },
              { label: "Mediate", icon: AlertTriangle, action: () => setOpen(false) },
            ].map(({ label, icon: Icon, action }) => (
              <button key={label} onClick={action} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors">
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 h-10 border-b border-slate-100" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3.5 border-b border-slate-50">
          {[16, 80, 120, 100, 100, 80, 70, 50, 40, 70, 80].map((w, j) => (
            <div key={j} className="shimmer rounded-md h-4 flex-shrink-0" style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  );
}
