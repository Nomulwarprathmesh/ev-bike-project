"use client";

import { useState } from "react";
import { X } from "lucide-react";

const vendors  = ["Electric Motors Hub", "EV Galleria", "GreenRide Motors", "SpeedRide Motors", "EV World", "VoltDrive"];
const products = ["Ola S1 Pro", "Ather 450X", "Bajaj Chetak", "TVS iQube", "Hero Vida V1", "Ola S1 Air"];
const cities   = ["Mumbai", "Pune", "Bangalore", "Hyderabad", "Delhi", "Chennai"];
const reasons  = ["Restock", "New Shipment", "Return from Vendor", "Adjustment", "Other"];

interface Props { onClose: () => void; }

export default function AddStockModal({ onClose }: Props) {
  const [form, setForm] = useState({
    vendor: "", product: "", city: "",
    currentStock: "", addQty: "", reason: "",
    date: "", notes: "",
  });

  const total = (Number(form.currentStock) || 0) + (Number(form.addQty) || 0);

  function set(key: string, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Add Stock</h2>
            <p className="text-xs text-gray-400 mt-0.5">Update inventory for a vendor product</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Vendor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Vendor</label>
            <select value={form.vendor} onChange={(e) => set("vendor", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
              <option value="">Select vendor</option>
              {vendors.map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</label>
            <select value={form.product} onChange={(e) => set("product", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
              <option value="">Select product</option>
              {products.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">City</label>
            <select value={form.city} onChange={(e) => set("city", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
              <option value="">Select city</option>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Current Stock */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Stock</label>
            <input type="number" min={0} placeholder="e.g. 8"
              value={form.currentStock} onChange={(e) => set("currentStock", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>

          {/* Add Quantity */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Add Quantity</label>
            <input type="number" min={0} placeholder="e.g. 20"
              value={form.addQty} onChange={(e) => set("addQty", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>

          {/* Total Stock After Update — read only */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Stock After Update</label>
            <div className="border border-emerald-200 bg-emerald-50 rounded-xl px-3 py-2 text-sm font-bold text-emerald-600">
              {total > 0 ? total : "—"}
            </div>
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reason</label>
            <select value={form.reason} onChange={(e) => set("reason", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
              <option value="">Select reason</option>
              {reasons.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</label>
            <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Notes</label>
            <textarea rows={3} placeholder="Optional notes about this stock update..."
              value={form.notes} onChange={(e) => set("notes", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition">
            Cancel
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition shadow-sm">
            Confirm Add Stock
          </button>
        </div>

      </div>
    </div>
  );
}
