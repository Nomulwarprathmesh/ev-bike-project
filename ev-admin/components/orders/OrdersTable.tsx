"use client";

import { useState } from "react";
import { Eye, CheckCircle, XCircle, RefreshCw, Download, Truck, AlertTriangle, ShieldCheck, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import type { Order, OrderStatus } from "./types";

const STATUS_STYLE: Record<OrderStatus, { cls: string; dot: string }> = {
  pending:   { cls: "bg-amber-50 text-amber-700 border-amber-200",   dot: "#F59E0B" },
  approved:  { cls: "bg-cyan-50 text-cyan-700 border-cyan-200",      dot: "#06B6D4" },
  delivered: { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "#10B981" },
  disputed:  { cls: "bg-red-50 text-red-600 border-red-200",         dot: "#EF4444" },
  refunded:  { cls: "bg-purple-50 text-purple-700 border-purple-200",dot: "#8B5CF6" },
  cancelled: { cls: "bg-slate-100 text-slate-500 border-slate-200",  dot: "#94A3B8" },
};

const PAY_STYLE: Record<string, string> = {
  paid:     "bg-emerald-100 text-emerald-700",
  pending:  "bg-amber-100 text-amber-700",
  failed:   "bg-red-100 text-red-600",
  refunded: "bg-purple-100 text-purple-700",
};

const ROW_BG: Record<OrderStatus, string> = {
  disputed:  "bg-red-50/70 hover:bg-red-50",
  pending:   "bg-amber-50/50 hover:bg-amber-50/80",
  approved:  "bg-white hover:bg-slate-50/80",
  delivered: "bg-white hover:bg-emerald-50/30",
  refunded:  "bg-white hover:bg-slate-50/80",
  cancelled: "bg-slate-50/60 hover:bg-slate-50",
};

const BOOKING_BADGE: Record<string, { label: string; cls: string }> = {
  full_payment: { label: "Full Pay",  cls: "bg-emerald-100 text-emerald-700" },
  emi:          { label: "EMI",       cls: "bg-blue-100 text-blue-700" },
  test_ride:    { label: "Test Ride", cls: "bg-violet-100 text-violet-700" },
};

const AVATAR_COLORS = ["#12C48B","#06B6D4","#F59E0B","#8B5CF6","#EF4444","#10B981","#3B82F6","#EC4899"];

const COLS = ["Order ID", "Customer", "Vendor", "EV Model", "Amount", "Payment", "Status", "Type", "Actions"];

function SkeletonRow() {
  return (
    <tr>
      {COLS.map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="shimmer h-4 rounded-lg" style={{ width: `${60 + (i * 17) % 40}%` }} />
        </td>
      ))}
    </tr>
  );
}

interface Props {
  orders: Order[];
  loading: boolean;
  onView: (o: Order) => void;
  page: number;
  perPage: number;
  total: number;
  onPageChange: (p: number) => void;
}

export default function OrdersTable({ orders, loading, onView, page, perPage, total, onPageChange }: Props) {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">

      {/* Table header info bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">Order Records</span>
          <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-500 rounded-full">{total} total</span>
        </div>
        <div className="text-xs text-slate-400">Last updated: just now</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              {COLS.map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
              : orders.length === 0
              ? (
                <tr>
                  <td colSpan={9} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-inner">
                        <Truck size={32} className="text-slate-300" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-slate-500">No orders found</div>
                        <div className="text-sm text-slate-400 mt-1">Try adjusting your filters or search query</div>
                      </div>
                    </div>
                  </td>
                </tr>
              )
              : orders.map((order, idx) => {
                const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                const statusStyle = STATUS_STYLE[order.status];
                const booking = BOOKING_BADGE[order.bookingType];

                return (
                  <tr
                    key={order.id}
                    className={`group transition-all duration-150 ${ROW_BG[order.status]}`}
                  >
                    {/* Order ID */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-slate-700">{order.id}</span>
                        {order.status === "disputed" && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 shadow-sm shadow-red-500/40 animate-pulse">
                            <AlertTriangle size={10} className="text-white" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 font-medium">{order.date}</div>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-9 w-9 rounded-xl flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0 shadow-sm"
                          style={{ backgroundColor: avatarColor }}
                        >
                          {order.customer.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                            {order.customer.name}
                            {order.customer.risk && (
                              <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                                <AlertTriangle size={9} /> Risk
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 font-medium">{order.customer.uid}</div>
                        </div>
                      </div>
                    </td>

                    {/* Vendor */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-700">{order.vendor.name}</span>
                        {order.vendor.verified && (
                          <ShieldCheck size={14} className="text-cyan-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">{order.vendor.city}</div>
                    </td>

                    {/* EV Model */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Truck size={15} className="text-slate-400" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-700">{order.ev.model}</div>
                          <div className="text-xs text-slate-400 font-medium">{order.ev.battery} · {order.ev.range}</div>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-base font-extrabold text-slate-800">₹{order.amount.toLocaleString()}</div>
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-lg ${PAY_STYLE[order.paymentStatus]}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border ${statusStyle.cls}`}>
                        <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: statusStyle.dot }} />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>

                    {/* Booking Type */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-lg ${booking.cls}`}>
                        {booking.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <ActionBtn icon={Eye}          label="View Details" cls="text-slate-600 hover:bg-slate-100 hover:text-slate-800"   onClick={() => onView(order)} tooltip={tooltip} setTooltip={setTooltip} />
                        <ActionBtn icon={CheckCircle}  label="Approve"      cls="text-emerald-600 hover:bg-emerald-50"                      onClick={() => {}} tooltip={tooltip} setTooltip={setTooltip} />
                        <ActionBtn icon={XCircle}      label="Reject"       cls="text-red-500 hover:bg-red-50"                              onClick={() => {}} tooltip={tooltip} setTooltip={setTooltip} />
                        <ActionBtn icon={RefreshCw}    label="Refund"       cls="text-purple-500 hover:bg-purple-50"                        onClick={() => {}} tooltip={tooltip} setTooltip={setTooltip} />
                        <ActionBtn icon={Download}     label="Invoice"      cls="text-cyan-600 hover:bg-cyan-50"                            onClick={() => {}} tooltip={tooltip} setTooltip={setTooltip} />
                        <ActionBtn icon={MoreHorizontal} label="More"       cls="text-slate-400 hover:bg-slate-100"                         onClick={() => {}} tooltip={tooltip} setTooltip={setTooltip} />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {!loading && total > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/40">
          <div className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-700">{start}–{end}</span> of <span className="font-bold text-slate-700">{total}</span> orders
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`h-8 w-8 text-sm font-bold rounded-lg transition-all ${
                  p === page
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md shadow-emerald-500/30"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtn({
  icon: Icon, label, cls, onClick, tooltip, setTooltip,
}: {
  icon: React.ElementType; label: string; cls: string;
  onClick: () => void; tooltip: string | null; setTooltip: (v: string | null) => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setTooltip(label)}
        onMouseLeave={() => setTooltip(null)}
        className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all active:scale-90 ${cls}`}
      >
        <Icon size={14} />
      </button>
      {tooltip === label && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-800 text-white text-[11px] font-semibold rounded-lg whitespace-nowrap pointer-events-none z-20 animate-fade-in shadow-xl">
          {label}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </div>
      )}
    </div>
  );
}
