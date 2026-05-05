"use client";

import { X, CheckCircle, Clock, Truck, Package, CreditCard, ShieldCheck, AlertTriangle } from "lucide-react";
import type { Order } from "./types";

const TIMELINE = [
  { label: "Order Placed", icon: Package },
  { label: "Payment Confirmed", icon: CreditCard },
  { label: "Vendor Approved", icon: ShieldCheck },
  { label: "Vehicle Assigned", icon: CheckCircle },
  { label: "Out for Delivery", icon: Truck },
  { label: "Delivered", icon: CheckCircle },
];

const STATUS_STEP: Record<string, number> = {
  pending: 1, approved: 3, delivered: 6, disputed: 2, refunded: 2, cancelled: 1,
};

const PAY_COLOR: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-600",
  refunded: "bg-purple-100 text-purple-700",
};

interface Props { order: Order; onClose: () => void; }

export default function OrderDrawer({ order, onClose }: Props) {
  const step = STATUS_STEP[order.status] ?? 1;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col animate-drawer overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div>
            <div className="text-xs text-slate-400 font-medium">Order Details</div>
            <div className="text-lg font-bold text-slate-800">{order.id}</div>
          </div>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
            <X size={16} className="text-slate-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 scrollbar-hide">
          {/* Customer */}
          <Section title="Customer">
            <Row label="Name" value={order.customer.name} />
            <Row label="UID" value={order.customer.uid} />
            {order.customer.risk && (
              <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                <AlertTriangle size={13} /> High-risk account flagged
              </div>
            )}
          </Section>

          {/* Vendor */}
          <Section title="Vendor">
            <Row label="Showroom" value={order.vendor.name} />
            <Row label="City" value={order.vendor.city} />
            <Row label="Verified" value={order.vendor.verified ? "✅ Yes" : "❌ No"} />
          </Section>

          {/* EV Details */}
          <Section title="EV Details">
            <Row label="Model" value={order.ev.model} />
            <Row label="Brand" value={order.ev.brand} />
            <Row label="Battery" value={order.ev.battery} />
            <Row label="Range" value={order.ev.range} />
          </Section>

          {/* Payment */}
          <Section title="Payment Breakdown">
            <Row label="Amount" value={`₹${order.amount.toLocaleString()}`} />
            <Row label="Booking Type" value={order.bookingType.replace("_", " ").toUpperCase()} />
            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-slate-500">Payment Status</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PAY_COLOR[order.paymentStatus]}`}>
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>
          </Section>

          {/* Dispute */}
          {order.dispute && (
            <Section title="Dispute Info">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
                <div className="text-xs font-semibold text-red-700">{order.dispute.category}</div>
                <div className="text-xs text-red-600">{order.dispute.complaint}</div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 text-xs font-semibold bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">Mark Resolved</button>
                <button className="flex-1 py-2 text-xs font-semibold bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors">Escalate</button>
                <button className="flex-1 py-2 text-xs font-semibold bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors">Refund</button>
              </div>
            </Section>
          )}

          {/* Delivery Timeline */}
          <Section title="Delivery Timeline">
            <div className="relative pl-5 space-y-4">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200" />
              {TIMELINE.map((t, i) => {
                const done = i < step;
                const active = i === step - 1;
                return (
                  <div key={t.label} className="flex items-center gap-3 relative">
                    <div className={`absolute -left-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${done ? "bg-emerald-500 border-emerald-500" : active ? "bg-white border-emerald-400" : "bg-white border-slate-200"}`}>
                      {done && <CheckCircle size={10} className="text-white" />}
                      {!done && active && <Clock size={10} className="text-emerald-500" />}
                    </div>
                    <span className={`text-xs font-medium ${done ? "text-slate-700" : "text-slate-400"}`}>{t.label}</span>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Admin Notes */}
          <Section title="Admin Notes">
            <textarea
              rows={3}
              placeholder="Add internal note…"
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all resize-none placeholder:text-slate-400"
            />
            <button className="mt-2 px-4 py-2 text-xs font-semibold bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors">Save Note</button>
          </Section>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-2">
          <button className="flex-1 py-2.5 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity">Approve</button>
          <button className="flex-1 py-2.5 text-sm font-semibold bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">Reject</button>
          <button className="flex-1 py-2.5 text-sm font-semibold bg-slate-50 text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">Invoice</button>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{title}</div>
      <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-100">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-xs font-semibold text-slate-700">{value}</span>
    </div>
  );
}
