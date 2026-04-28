"use client";

import { useState } from "react";
import { Pencil, Eye, Trash2 } from "lucide-react";
import EditStockModal from "@/components/stock/EditStockModal";
import StockDetailsModal from "@/components/stock/StockDetailsModal";
import ConfirmDeleteModal from "@/components/stock/ConfirmDeleteModal";

type Row = { product: string; city: string; vendor: string; stock: number; lastUpdated: string };

const initialInventory: Row[] = [
  { product: "Ola S1 Pro",   city: "Mumbai",    vendor: "Electric Motors Hub", stock: 8,   lastUpdated: "2 hrs ago"  },
  { product: "Ather 450X",   city: "Pune",      vendor: "EV Galleria",         stock: 34,  lastUpdated: "1 day ago"  },
  { product: "Bajaj Chetak", city: "Bangalore", vendor: "GreenRide Motors",    stock: 120, lastUpdated: "3 hrs ago"  },
  { product: "TVS iQube",    city: "Hyderabad", vendor: "SpeedRide Motors",    stock: 5,   lastUpdated: "5 hrs ago"  },
  { product: "Hero Vida V1", city: "Delhi",     vendor: "EV World",            stock: 62,  lastUpdated: "6 hrs ago"  },
  { product: "Ola S1 Air",   city: "Chennai",   vendor: "VoltDrive",           stock: 0,   lastUpdated: "1 day ago"  },
];

export default function InventoryTable() {
  const [rows,        setRows]        = useState<Row[]>(initialInventory);
  const [editRow,     setEditRow]     = useState<Row | null>(null);
  const [detailRow,   setDetailRow]   = useState<Row | null>(null);
  const [deleteRow,   setDeleteRow]   = useState<Row | null>(null);

  function handleSave(updated: Row, newStock: number) {
    setRows((prev) =>
      prev.map((r) =>
        r.product === updated.product && r.city === updated.city
          ? { ...r, stock: newStock, lastUpdated: "Just now" }
          : r
      )
    );
  }

  function handleDelete(row: Row) {
    setRows((prev) => prev.filter((r) => !(r.product === row.product && r.city === row.city)));
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
        <h2 className="text-base font-semibold text-gray-800">Inventory Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="text-left py-2 pr-4">Product</th>
                <th className="text-left py-2 pr-4">City</th>
                <th className="text-left py-2 pr-4">Vendor</th>
                <th className="text-left py-2 pr-4">Stock</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th className="text-left py-2 pr-4">Last Updated</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isLow  = row.stock > 0 && row.stock < 10;
                const isOut  = row.stock === 0;
                const isOver = row.stock > 100;
                return (
                  <tr key={`${row.product}-${row.city}`} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 pr-4 font-semibold text-gray-800">{row.product}</td>
                    <td className="py-3 pr-4 text-gray-500">{row.city}</td>
                    <td className="py-3 pr-4 text-gray-500">{row.vendor}</td>
                    <td className="py-3 pr-4 font-bold text-gray-800">{row.stock}</td>
                    <td className="py-3 pr-4">
                      {isOut  && <span className="text-xs font-semibold bg-red-100 text-red-600 px-2.5 py-1 rounded-full">Out of Stock</span>}
                      {isLow  && <span className="text-xs font-semibold bg-orange-100 text-orange-500 px-2.5 py-1 rounded-full">Low Stock</span>}
                      {isOver && <span className="text-xs font-semibold bg-yellow-100 text-yellow-600 px-2.5 py-1 rounded-full">Overstock</span>}
                      {!isOut && !isLow && !isOver && <span className="text-xs font-semibold bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full">Healthy</span>}
                    </td>
                    <td className="py-3 pr-4 text-gray-400 text-xs">{row.lastUpdated}</td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setEditRow(row)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => setDetailRow(row)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400" title="View Details">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => setDeleteRow(row)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400" title="Remove">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={7} className="py-10 text-center text-sm text-gray-400">No inventory items.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editRow   && <EditStockModal   row={editRow}   onClose={() => setEditRow(null)}   onSave={(n) => handleSave(editRow, n)} />}
      {detailRow && <StockDetailsModal row={detailRow} onClose={() => setDetailRow(null)} />}
      {deleteRow && <ConfirmDeleteModal label={`${deleteRow.product} · ${deleteRow.city}`} onClose={() => setDeleteRow(null)} onConfirm={() => handleDelete(deleteRow)} />}
    </>
  );
}
