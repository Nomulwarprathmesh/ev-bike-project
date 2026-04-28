"use client";

import { useState } from "react";
import { X } from "lucide-react";

const reasons = ["Restock", "New Shipment", "Return from Vendor", "Adjustment", "Other"];

interface Row { product: string; city: string; vendor: string; stock: number; }
interface Props { row: Row; onClose: () => void; onSave: (newStock: number) => void; }

export default function EditStockModal({ row, onClose, onSave }: Props) {
  const [newStock, setNewStock] = useState(row.stock);
  const [reason, setReason]     = useState("");
  const [notes, setNotes]       = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Edit Stock</h2>
            <p className="text-xs text-gray-400 mt-0.5">{row.product} · {row.vendor}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Vendor</label>
            <input value={row.vendor} readOnly className="border border-gray-100 bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</label>
            <input value={row.product} readOnly className="border border-gray-100 bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">City</label>
            <input value={row.city} readOnly className="border border-gray-100 bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Stock</label>
            <input value={row.stock} readOnly className="border border-gray-100 bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">New Stock Quantity</label>
            <input type="number" min={0} value={newStock}
              onChange={(e) => setNewStock(Number(e.target.value))}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reason</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
              <option value="">Select reason</option>
              {reasons.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Notes</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={() => { onSave(newStock); onClose(); }}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
