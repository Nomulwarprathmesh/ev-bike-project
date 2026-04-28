"use client";

import { useState, useRef } from "react";
import { Package, AlertTriangle, Clock, CheckCircle, Search, Filter, X } from "lucide-react";
import AddStockModal from "@/components/stock/AddStockModal";
import StockDetailsModal from "@/components/stock/StockDetailsModal";
import StockSummaryCard from "@/components/stock/StockSummaryCard";
import StockRequestCard from "@/components/stock/StockRequestCard";
import InventoryTable from "@/components/stock/InventoryTable";

const stockRequests = [
  { id: 1, vendor: "Electric Motors Hub", city: "Mumbai",    product: "Ola S1 Pro",   requested: 20, current: 8,   lastUpdated: "2 hrs ago",  status: "Pending"  as const },
  { id: 2, vendor: "EV Galleria",         city: "Pune",      product: "Ather 450X",   requested: 15, current: 34,  lastUpdated: "1 day ago",  status: "Pending"  as const },
  { id: 3, vendor: "GreenRide Motors",    city: "Bangalore", product: "Bajaj Chetak", requested: 30, current: 120, lastUpdated: "3 hrs ago",  status: "Approved" as const },
  { id: 4, vendor: "SpeedRide Motors",    city: "Hyderabad", product: "TVS iQube",    requested: 25, current: 5,   lastUpdated: "5 hrs ago",  status: "Pending"  as const },
  { id: 5, vendor: "EV World",            city: "Delhi",     product: "Hero Vida V1", requested: 10, current: 62,  lastUpdated: "6 hrs ago",  status: "Rejected" as const },
  { id: 6, vendor: "VoltDrive",           city: "Chennai",   product: "Ola S1 Air",   requested: 18, current: 0,   lastUpdated: "1 day ago",  status: "Pending"  as const },
];

// derive counts from data
const totalStock    = stockRequests.reduce((s, r) => s + r.current, 0);
const lowStockCount = stockRequests.filter((r) => r.current > 0 && r.current < 10).length;
const pendingCount  = stockRequests.filter((r) => r.status === "Pending").length;
const approvedCount = stockRequests.filter((r) => r.status === "Approved").length;

type CardFilter = "all" | "low" | "pending" | "approved";

const summaryData: { label: string; value: string; icon: typeof Package; color: string; filter: CardFilter }[] = [
  { label: "Total Stock",      value: String(totalStock),    icon: Package,       color: "from-emerald-500 to-cyan-500",  filter: "all"      },
  { label: "Low Stock Alerts", value: String(lowStockCount), icon: AlertTriangle, color: "from-red-400 to-rose-500",      filter: "low"      },
  { label: "Pending Requests", value: String(pendingCount),  icon: Clock,         color: "from-orange-400 to-amber-500",  filter: "pending"  },
  { label: "Approved Today",   value: String(approvedCount), icon: CheckCircle,   color: "from-blue-500 to-indigo-500",   filter: "approved" },
];

const cities   = ["All Cities", "Mumbai", "Pune", "Bangalore", "Hyderabad", "Delhi", "Chennai"];
const statuses = ["All", "Pending", "Approved", "Rejected"];

export default function StockPage() {
  const [search,        setSearch]        = useState("");
  const [cityFilter,    setCityFilter]    = useState("All Cities");
  const [statusFilter,  setStatusFilter]  = useState("All");
  const [activeCard,    setActiveCard]    = useState<CardFilter>("all");
  const [selectedRequest, setSelectedRequest] = useState<{ product: string; city: string; vendor: string; stock: number; lastUpdated: string } | null>(null);
  const [showAddStock, setShowAddStock] = useState(false);

  const inventoryRef  = useRef<HTMLDivElement>(null);
  const requestsRef   = useRef<HTMLDivElement>(null);

  // clicking a summary card sets a quick filter + scrolls to requests
  function handleCardClick(filter: CardFilter) {
    setActiveCard(filter);
    if (filter === "low")      setStatusFilter("All");
    if (filter === "pending")  setStatusFilter("Pending");
    if (filter === "approved") setStatusFilter("Approved");
    if (filter === "all")      setStatusFilter("All");
    requestsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const filtered = stockRequests.filter((r) => {
    const matchSearch  = r.vendor.toLowerCase().includes(search.toLowerCase()) || r.product.toLowerCase().includes(search.toLowerCase());
    const matchCity    = cityFilter === "All Cities" || r.city === cityFilter;
    const matchStatus  = statusFilter === "All" || r.status === statusFilter;
    const matchCard    = activeCard === "all"
      ? true
      : activeCard === "low"
      ? r.current > 0 && r.current < 10
      : activeCard === "pending"
      ? r.status === "Pending"
      : r.status === "Approved";
    return matchSearch && matchCity && matchStatus && matchCard;
  });

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stock Management</h1>
          <p className="text-sm text-gray-400 mt-1">Manage vendor stock requests, inventory levels, and approvals.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddStock(true)}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition">
            + Add Stock
          </button>
          <button
            onClick={() => inventoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition"
          >
            View Inventory
          </button>
        </div>
      </div>

      {/* Summary Cards — clickable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {summaryData.map((card) => (
          <button
            key={card.label}
            onClick={() => handleCardClick(card.filter)}
            className={`text-left rounded-2xl transition-all ring-2 ${
              activeCard === card.filter ? "ring-emerald-400 shadow-md scale-[1.02]" : "ring-transparent"
            }`}
          >
            <StockSummaryCard label={card.label} value={card.value} icon={card.icon} color={card.color} />
          </button>
        ))}
      </div>

      {/* Vendor Stock Requests */}
      <div ref={requestsRef} className="flex flex-col gap-4 scroll-mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-gray-800">Vendor Stock Requests</h2>
            {activeCard !== "all" && (
              <button
                onClick={() => { setActiveCard("all"); setStatusFilter("All"); }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-1 rounded-lg"
              >
                <X size={11} /> Clear filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-500 bg-white">
              <Search size={14} />
              <input
                className="outline-none bg-transparent w-36 placeholder:text-gray-400 text-sm"
                placeholder="Search vendor / product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-500 bg-white outline-none"
            >
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>

            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setActiveCard("all"); }}
                  className={`text-xs font-medium px-3 py-1 rounded-lg transition-all ${
                    statusFilter === s
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-500 bg-white hover:bg-gray-50">
              <Filter size={13} /> Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((req) => (
            <StockRequestCard key={req.id} request={req} onViewDetails={(r) => setSelectedRequest({ product: r.product, city: r.city, vendor: r.vendor, stock: r.current, lastUpdated: r.lastUpdated })} />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-gray-400 col-span-3 text-center py-10">No requests match your filters.</p>
          )}
        </div>
      </div>

      {/* Inventory Table */}
      <div ref={inventoryRef} className="scroll-mt-4">
        <InventoryTable />
      </div>

      {showAddStock    && <AddStockModal     onClose={() => setShowAddStock(false)} />}
      {selectedRequest && <StockDetailsModal row={selectedRequest} onClose={() => setSelectedRequest(null)} />}
    </div>
  );
}
