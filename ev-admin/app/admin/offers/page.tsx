"use client";

import { useState } from "react";
import {
  Tag, BarChart2, TrendingUp, Star, Search, Filter,
  Plus, Image, Eye, Pencil, Ban, AlertTriangle, Clock
} from "lucide-react";

// ── Static Data ──────────────────────────────────────────────
const summaryCards = [
  { label: "Active Offers", value: "14", icon: Tag, color: "from-emerald-500 to-cyan-500" },
  { label: "Total Redemptions", value: "8,420", icon: BarChart2, color: "from-blue-500 to-indigo-500" },
  { label: "Revenue Generated", value: "₹42.6L", icon: TrendingUp, color: "from-violet-500 to-purple-500" },
  { label: "Best Performing", value: "FLAT20EV", icon: Star, color: "from-orange-400 to-pink-500" },
];

const previousOffers = [
  { name: "FLAT20EV", discount: "20% OFF", validity: "01 Jun – 30 Jun", status: "Active", redemptions: 1840, revenue: "₹9.2L", profit: "+18%", expiringSoon: false, lowPerf: false },
  { name: "SUMMER10", discount: "₹1,000 OFF", validity: "15 May – 15 Jun", status: "Expired", redemptions: 620, revenue: "₹3.1L", profit: "+8%", expiringSoon: false, lowPerf: false },
  { name: "CITYDEAL5", discount: "5% OFF", validity: "20 Jun – 05 Jul", status: "Scheduled", redemptions: 0, revenue: "—", profit: "—", expiringSoon: false, lowPerf: false },
  { name: "MONSOON15", discount: "15% OFF", validity: "25 Jun – 02 Jul", status: "Active", redemptions: 210, revenue: "₹1.05L", profit: "+4%", expiringSoon: true, lowPerf: false },
  { name: "TESTRIDE50", discount: "₹500 OFF", validity: "01 Jun – 10 Jun", status: "Expired", redemptions: 88, revenue: "₹0.44L", profit: "+1%", expiringSoon: false, lowPerf: true },
];

const posters = [
  { name: "Summer Sale Campaign", status: "Active" },
  { name: "Monsoon Offer Banner", status: "Active" },
  { name: "City Deal Poster", status: "Scheduled" },
  { name: "Test Ride Promo", status: "Expired" },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-600",
  Expired: "bg-gray-100 text-gray-500",
  Scheduled: "bg-blue-100 text-blue-600",
};

const filterTabs = ["All", "Active", "Scheduled", "Expired"];

// ── Component ─────────────────────────────────────────────────
export default function OffersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = previousOffers.filter(
    (o) => activeFilter === "All" || o.status === activeFilter
  );

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">New Offers</h1>
          <p className="text-sm text-gray-400 mt-1">Create and manage EV scooter offers, posters, discounts and campaign performance.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition"
          >
            <Plus size={16} /> Add New Offer
          </button>
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition">
            <Image size={16} /> Add New Poster
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">{card.label}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Best Profit Offer */}
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#0e3460] rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Best Profit Offer</p>
          <h2 className="text-2xl font-bold">FLAT20EV</h2>
          <p className="text-sm text-slate-300 mt-1">20% OFF on all EV Scooters · Valid Jun 2025</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Revenue", value: "₹9.2L" },
            { label: "Total Orders", value: "1,840" },
            { label: "Profit Margin", value: "+18%" },
            { label: "Conversion", value: "34.2%" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl px-4 py-3 text-center">
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className="text-lg font-bold">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Offers Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-gray-800">Previous Offers</h2>
          <div className="flex flex-wrap gap-2">
            {/* Search */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-500">
              <Search size={14} />
              <input className="outline-none bg-transparent w-32 placeholder:text-gray-400" placeholder="Search offers..." />
            </div>
            {/* Filter tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`text-xs font-medium px-3 py-1 rounded-lg transition-all ${
                    activeFilter === tab
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Sort */}
            <button className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50">
              <Filter size={13} /> Sort by Profit
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="text-left py-2 pr-4">Offer</th>
                <th className="text-left py-2 pr-4">Discount</th>
                <th className="text-left py-2 pr-4">Validity</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th className="text-left py-2 pr-4">Redemptions</th>
                <th className="text-left py-2 pr-4">Revenue</th>
                <th className="text-left py-2 pr-4">Profit</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((offer) => (
                <tr key={offer.name} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-3 pr-4 font-semibold text-gray-800 flex items-center gap-2">
                    {offer.name}
                    {offer.expiringSoon && (
                      <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full">
                        <Clock size={10} /> Expiring
                      </span>
                    )}
                    {offer.lowPerf && (
                      <span className="flex items-center gap-1 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
                        <AlertTriangle size={10} /> Low
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{offer.discount}</td>
                  <td className="py-3 pr-4 text-gray-500">{offer.validity}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[offer.status]}`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{offer.redemptions}</td>
                  <td className="py-3 pr-4 text-gray-600">{offer.revenue}</td>
                  <td className="py-3 pr-4 font-semibold text-emerald-600">{offer.profit}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Pencil size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><Ban size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Poster Management */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
        <h2 className="text-base font-semibold text-gray-800">Poster Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {posters.map((poster) => (
            <div key={poster.name} className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Image size={32} className="text-slate-300" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{poster.name}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[poster.status]}`}>
                    {poster.status}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Pencil size={13} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><Ban size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Offer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Create New Offer</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Offer Title", placeholder: "e.g. FLAT20EV", type: "text" },
                { label: "Discount Value", placeholder: "e.g. 20 or 1000", type: "text" },
                { label: "Start Date", placeholder: "", type: "date" },
                { label: "End Date", placeholder: "", type: "date" },
                { label: "Minimum Order Value", placeholder: "e.g. ₹50,000", type: "text" },
                { label: "Applicable City", placeholder: "e.g. Mumbai, Pune", type: "text" },
              ].map((field) => (
                <div key={field.label} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Discount Type</label>
                <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400">
                  <option>Percentage</option>
                  <option>Flat Amount</option>
                  <option>Free Accessory</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Offer Status</label>
                <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400">
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Draft</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Applicable Products</label>
                <input
                  type="text"
                  placeholder="e.g. Ola S1 Pro, Ather 450X"
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Upload Poster / Banner</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl h-24 flex items-center justify-center text-gray-400 text-sm cursor-pointer hover:border-emerald-400 transition">
                  <Image size={18} className="mr-2" /> Click to upload image
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition">
              Create Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
