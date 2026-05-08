"use client";

import { useState } from "react";
import { Eye, Check, X, SlidersHorizontal } from "lucide-react";

export interface StockRequest {
  id: number;
  vendor: string;
  city: string;
  product: string;
  requested: number;
  current: number;
  lastUpdated: string;
  status: "Pending" | "Approved" | "Rejected";
}

const statusStyles = {
  Pending:  "bg-orange-100 text-orange-600",
  Approved: "bg-emerald-100 text-emerald-600",
  Rejected: "bg-red-100 text-red-500",
};

export default function StockRequestCard({
  request,
  onViewDetails,
}: {
  request: StockRequest;
  onViewDetails: (r: StockRequest) => void;
}) {
  const [status, setStatus] = useState<StockRequest["status"]>(request.status);
  const [qty, setQty]       = useState(request.requested);
  const isLow  = request.current < 10;
  const isOver = request.current > 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-800">{request.vendor}</p>
            <span className="text-xs text-gray-400">· {request.city}</span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{request.product}</p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      {/* Stock info */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">Requested</p>
          <p className="text-lg font-bold text-gray-800">{request.requested}</p>
        </div>
        <div className={`rounded-xl p-3 text-center ${isLow ? "bg-red-50" : isOver ? "bg-yellow-50" : "bg-gray-50"}`}>
          <p className="text-xs text-gray-400">Current Stock</p>
          <p className={`text-lg font-bold ${isLow ? "text-red-500" : isOver ? "text-yellow-600" : "text-gray-800"}`}>
            {request.current}
          </p>
          {isLow  && <p className="text-xs text-red-400 font-medium">Low Stock</p>}
          {isOver && <p className="text-xs text-yellow-500 font-medium">Overstock</p>}
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">Last Updated</p>
          <p className="text-xs font-semibold text-gray-700 mt-1">{request.lastUpdated}</p>
        </div>
      </div>

      {/* Adjust quantity */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={14} className="text-gray-400" />
        <span className="text-xs text-gray-500">Adjust Qty:</span>
        <button onClick={() => setQty((q) => Math.max(0, q - 1))}
          className="w-6 h-6 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 flex items-center justify-center">−</button>
        <span className="text-sm font-semibold text-gray-800 w-8 text-center">{qty}</span>
        <button onClick={() => setQty((q) => q + 1)}
          className="w-6 h-6 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 flex items-center justify-center">+</button>
        <span className="text-xs text-emerald-500 ml-1 cursor-pointer hover:underline">Auto Suggest</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => setStatus("Approved")}
          disabled={status === "Approved"}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition ${
            status === "Approved"
              ? "bg-emerald-100 text-emerald-400 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 text-white"
          }`}
        >
          <Check size={13} /> Approve
        </button>
        <button
          onClick={() => setStatus("Rejected")}
          disabled={status === "Rejected"}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition ${
            status === "Rejected"
              ? "border border-red-100 text-red-300 cursor-not-allowed"
              : "border border-red-200 text-red-500 hover:bg-red-50"
          }`}
        >
          <X size={13} /> Decline
        </button>
        <button
          onClick={() => onViewDetails({ ...request, status })}
          className="flex items-center gap-1.5 border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs font-semibold px-3 py-2 rounded-xl transition ml-auto"
        >
          <Eye size={13} /> View Details
        </button>
      </div>
    </div>
  );
}
