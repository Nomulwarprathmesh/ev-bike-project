"use client";

import { X, CheckCircle, XCircle, FileQuestion, AlertTriangle, Clock, User, Package, Zap, CreditCard, MessageSquare, ChevronRight } from "lucide-react";
import type { Refund } from "./types";

interface Props {
  refund: Refund | null;
  onClose: () => void;
}

const timeline = [
  { label: "Order placed", time: "Jul 10, 09:14", done: true },
  { label: "Payment captured", time: "Jul 10, 09:15", done: true },
  { label: "Refund requested", time: "Jul 15, 14:32", done: true },
  { label: "Vendor notified", time: "Jul 15, 14:33", done: true },
  { label: "Admin review", time: "Pending", done: false },
  { label: "Refund processed", time: "—", done: false },
];

export default function RefundDrawer({ refund, onClose }: Props) {
  if (!refund) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />
      <aside className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col animate-drawer overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <p className="text-xs text-slate-400 font-medium">Refund Details</p>
            <h2 className="text-base font-bold text-slate-800">{refund.id}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
            <X size={15} className="text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Summary */}
          <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-4 border border-emerald-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-bold text-slate-800">₹{refund.amount.toLocaleString("en-IN")}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                refund.status === "pending" ? "bg-amber-100 text-amber-700" :
                refund.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                refund.status === "disputed" ? "bg-rose-100 text-rose-700" :
                "bg-slate-100 text-slate-600"
              }`}>{refund.status.toUpperCase()}</span>
            </div>
            <p className="text-sm text-slate-500">{refund.reason}</p>
          </div>

          {/* Customer & Order */}
          <Section icon={User} title="Customer">
            <Row label="Name" value={refund.customer} />
            <Row label="Email" value={refund.customerEmail} />
            <Row label="Order ID" value={refund.orderId} />
          </Section>

          <Section icon={Zap} title="EV Details">
            <Row label="Model" value={refund.evModel} />
            <Row label="Vendor" value={refund.vendor} />
          </Section>

          <Section icon={CreditCard} title="Payment Breakdown">
            <Row label="Mode" value={refund.paymentMode} />
            <Row label="Amount Paid" value={`₹${refund.amount.toLocaleString("en-IN")}`} />
            <Row label="Refund Amount" value={`₹${refund.amount.toLocaleString("en-IN")}`} />
            <Row label="Platform Fee" value="₹0 (waived)" />
          </Section>

          {/* Evidence */}
          <Section icon={Package} title="Evidence">
            {refund.hasEvidence ? (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <CheckCircle size={14} /> Documents uploaded by customer
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <FileQuestion size={14} /> No documents uploaded
              </div>
            )}
          </Section>

          {/* Vendor Response */}
          <Section icon={MessageSquare} title="Vendor Response">
            {refund.vendorDisputed ? (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-sm text-rose-700">
                Vendor has disputed this refund. Claims product was delivered in working condition.
              </div>
            ) : (
              <p className="text-sm text-slate-400">No vendor response yet.</p>
            )}
          </Section>

          {/* Timeline */}
          <Section icon={Clock} title="Timeline">
            <div className="space-y-3 mt-1">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${t.done ? "bg-emerald-500" : "bg-slate-200"}`}>
                    {t.done && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className={`text-sm ${t.done ? "text-slate-700 font-medium" : "text-slate-400"}`}>{t.label}</span>
                    <span className="text-xs text-slate-400">{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Admin Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Admin Notes</label>
            <textarea
              rows={3}
              placeholder="Add internal notes..."
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* Decision Buttons */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl py-2.5 transition-all hover:scale-[1.02] active:scale-95">
            <CheckCircle size={14} /> Approve
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl py-2.5 transition-all hover:scale-[1.02] active:scale-95">
            <XCircle size={14} /> Reject
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-sm font-semibold rounded-xl py-2.5 transition-all hover:scale-[1.02] active:scale-95">
            <FileQuestion size={14} /> Request Proof
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-sm font-semibold rounded-xl py-2.5 transition-all hover:scale-[1.02] active:scale-95">
            <AlertTriangle size={14} /> Escalate
          </button>
        </div>
      </aside>
    </>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={13} className="text-cyan-500" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</span>
      </div>
      <div className="bg-slate-50 rounded-xl p-3 space-y-1.5">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}
