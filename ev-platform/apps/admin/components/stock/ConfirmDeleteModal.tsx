"use client";

import { X, Trash2 } from "lucide-react";

interface Props { label: string; onConfirm: () => void; onClose: () => void; }

export default function ConfirmDeleteModal({ label, onConfirm, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Confirm Remove</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 size={24} className="text-red-500" />
          </div>
          <p className="text-sm text-gray-600 text-center">
            Are you sure you want to remove <span className="font-semibold text-gray-800">{label}</span> from inventory?
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl transition">
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
}
