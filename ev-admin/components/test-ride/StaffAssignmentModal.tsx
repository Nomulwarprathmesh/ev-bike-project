"use client";

import { X, User, Phone, CheckCircle, AlertTriangle } from "lucide-react";

interface Staff {
  id: string;
  name: string;
  phone: string;
  available: boolean;
  currentBookings: number;
}

const MOCK_STAFF: Staff[] = [
  { id: "S001", name: "Amit Kumar", phone: "+91 98765 00001", available: true, currentBookings: 2 },
  { id: "S002", name: "Sneha Reddy", phone: "+91 98765 00002", available: true, currentBookings: 1 },
  { id: "S003", name: "Rajesh Verma", phone: "+91 98765 00003", available: false, currentBookings: 4 },
  { id: "S004", name: "Priya Singh", phone: "+91 98765 00004", available: true, currentBookings: 0 },
];

interface Props {
  bookingId: string;
  onClose: () => void;
  onAssign: (staffId: string) => void;
}

export default function StaffAssignmentModal({ bookingId, onClose, onAssign }: Props) {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-modal">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div>
              <div className="text-lg font-bold text-slate-800">Assign Staff</div>
              <div className="text-xs text-slate-500">Booking: {bookingId}</div>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X size={16} className="text-slate-600" />
            </button>
          </div>

          <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            {MOCK_STAFF.map((staff) => (
              <div
                key={staff.id}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  staff.available
                    ? "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50"
                    : "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                }`}
                onClick={() => staff.available && onAssign(staff.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        {staff.name}
                        {staff.available ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <CheckCircle size={12} />
                            Available
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                            <AlertTriangle size={12} />
                            Busy
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone size={10} />
                        {staff.phone}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Current bookings: {staff.currentBookings}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-slate-100 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
