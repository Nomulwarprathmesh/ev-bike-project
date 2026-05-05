"use client";

import { useState, useMemo } from "react";
import {
  Search, Download, Calendar, Wifi, RefreshCw,
  CreditCard, Landmark, Gavel, AlertOctagon, ChevronRight,
} from "lucide-react";
import PaymentStats from "@/components/payments/PaymentStats";
import RefundTable from "@/components/payments/RefundTable";
import RefundDrawer from "@/components/payments/RefundDrawer";
import VendorPayoutsTab from "@/components/payments/VendorPayoutsTab";
import SettlementsTab from "@/components/payments/SettlementsTab";
import DisputesTab from "@/components/payments/DisputesTab";
import FailedPaymentsTab from "@/components/payments/FailedPaymentsTab";
import PaymentFilters from "@/components/payments/PaymentFilters";
import { mockRefunds, mockPayouts, mockSettlements, mockDisputes, mockFailedPayments } from "@/components/payments/mockData";
import type { TabKey, Refund } from "@/components/payments/types";

const TABS: { key: TabKey; label: string; icon: React.ElementType; count?: number }[] = [
  { key: "refunds", label: "Refunds", icon: RefreshCw, count: 7 },
  { key: "payouts", label: "Vendor Payouts", icon: CreditCard, count: 5 },
  { key: "settlements", label: "Settlements", icon: Landmark, count: 5 },
  { key: "disputes", label: "Payment Disputes", icon: Gavel, count: 5 },
  { key: "failed", label: "Failed Payments", icon: AlertOctagon, count: 5 },
];

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("refunds");
  const [search, setSearch] = useState("");
  const [drawerRefund, setDrawerRefund] = useState<Refund | null>(null);
  const [loading] = useState(false);
  const [filters, setFilters] = useState({
    status: "All",
    paymentMode: "All",
    vendor: "All",
    city: "All",
    disputeOnly: false,
  });

  const filteredRefunds = useMemo(() => {
    return mockRefunds.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.id.toLowerCase().includes(q) || r.orderId.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q) || r.vendor.toLowerCase().includes(q);
      const matchStatus = filters.status === "All" || r.status === filters.status;
      const matchMode = filters.paymentMode === "All" || r.paymentMode === filters.paymentMode;
      const matchVendor = filters.vendor === "All" || r.vendor === filters.vendor;
      const matchDispute = !filters.disputeOnly || r.vendorDisputed;
      return matchSearch && matchStatus && matchMode && matchVendor && matchDispute;
    });
  }, [search, filters]);

  return (
    <div className="space-y-5 py-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <span>Financials</span>
        <ChevronRight size={12} />
        <span className="text-slate-600 font-semibold">Payments &amp; Refunds</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-2xl font-bold text-slate-800">Payments &amp; Refunds</h1>
            <span className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-full">
              <Wifi size={10} className="animate-pulse" /> Live finance sync
            </span>
          </div>
          <p className="text-sm text-slate-400">Manage customer refunds, vendor payouts, settlements and payment disputes</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-500 hover:border-cyan-400 transition-colors cursor-pointer">
            <Calendar size={14} /> Jul 1 – Jul 23, 2025
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-95 transition-all">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search refund ID, order, customer, vendor…"
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all"
        />
      </div>

      {/* Stats */}
      <PaymentStats />

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-[#0B1F3A] text-white shadow-md shadow-slate-900/20"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              <Icon size={14} />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
        {activeTab === "refunds" && (
          <>
            <PaymentFilters filters={filters} onChange={setFilters} />
            <RefundTable refunds={filteredRefunds} loading={loading} onReview={setDrawerRefund} />
          </>
        )}
        {activeTab === "payouts" && <VendorPayoutsTab payouts={mockPayouts} />}
        {activeTab === "settlements" && <SettlementsTab settlements={mockSettlements} />}
        {activeTab === "disputes" && <DisputesTab disputes={mockDisputes} />}
        {activeTab === "failed" && <FailedPaymentsTab payments={mockFailedPayments} />}
      </div>

      {/* Refund Drawer */}
      <RefundDrawer refund={drawerRefund} onClose={() => setDrawerRefund(null)} />
    </div>
  );
}
