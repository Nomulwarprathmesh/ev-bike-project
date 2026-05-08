"use client";

import { X } from "lucide-react";

interface Row { product: string; city: string; vendor: string; stock: number; lastUpdated: string; }
interface Props { row: Row; onClose: () => void; }

const history = [
  { date: "28 Jun 2025", action: "Stock updated — 20 units added",      color: "bg-emerald-500" },
  { date: "20 Jun 2025", action: "Stock adjusted — reduced by 5 units", color: "bg-orange-400"  },
  { date: "10 Jun 2025", action: "Initial stock added — 50 units",       color: "bg-blue-500"   },
];

export default function StockDetailsModal({ row, onClose }: Props) {
  const totalReceived = row.stock + 232;
  const totalSold     = 232;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Stock Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        {/* Info */}
        <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-y-2 text-sm">
          {[
            ["Vendor",       row.vendor],
            ["Product",      row.product],
            ["City",         row.city],
            ["Last Updated", row.lastUpdated],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="font-semibold text-gray-800">{val}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Received", value: totalReceived, color: "text-blue-600"    },
            { label: "Total Sold",     value: totalSold,     color: "text-orange-500"  },
            { label: "Available",      value: row.stock,     color: "text-emerald-600" },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* History */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Stock History</p>
          <div className="flex flex-col gap-3">
            {history.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${item.color}`} />
                <div>
                  <p className="text-sm text-gray-700">{item.action}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onClose}
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-2.5 rounded-xl hover:opacity-90 transition">
          Close
        </button>
      </div>
    </div>
  );
}
