"use client";

import { useState, useMemo } from "react";
import { Download, Bell, RefreshCw, Zap, Activity, Calendar, TrendingUp } from "lucide-react";
import { MOCK_ORDERS, type Order, type OrderStatus } from "@/components/orders/types";
import OrderStatsCards from "@/components/orders/OrderStatsCards";
import OrderFilters from "@/components/orders/OrderFilters";
import OrdersTable from "@/components/orders/OrdersTable";
import OrderDrawer from "@/components/orders/OrderDrawer";

const PER_PAGE = 6;

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let list = MOCK_ORDERS;
    if (activeStatus !== "all") list = list.filter((o) => o.status === activeStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.vendor.name.toLowerCase().includes(q) ||
          o.ev.model.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeStatus, search]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleStatusChange = (s: OrderStatus | "all") => { setActiveStatus(s); setPage(1); };
  const handleSearch = (v: string) => { setSearch(v); setPage(1); };

  return (
    <div className="min-h-screen bg-[#F1F5F9]">

      {/* ── Premium Header Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] px-8 py-7">
        {/* Decorative glow blobs */}
        <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left: Title */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-xl shadow-emerald-500/30 ring-2 ring-white/10">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">Orders Management</h1>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="flex items-center gap-1.5">
                  <Activity size={13} className="text-slate-500" />
                  Voltrix Admin Platform
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-medium">+22.8% this month</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <Calendar size={14} />
              Jul 2025
            </button>
            <button className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all">
              <Bell size={16} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-[#1E293B]" />
            </button>
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all">
              <RefreshCw size={15} />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] active:scale-[0.97] transition-all">
              <Download size={15} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="relative flex items-center gap-2 mt-5 text-xs text-slate-500">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Dashboard</span>
          <span className="text-slate-700">/</span>
          <span className="text-emerald-400 font-semibold">Orders</span>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="px-8 py-7 space-y-6">
        <OrderStatsCards />
        <OrderFilters
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
          search={search}
          onSearchChange={handleSearch}
        />
        <OrdersTable
          orders={paginated}
          loading={loading}
          onView={(o) => setSelectedOrder(o)}
          page={page}
          perPage={PER_PAGE}
          total={filtered.length}
          onPageChange={setPage}
        />
      </div>

      {selectedOrder && (
        <OrderDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
