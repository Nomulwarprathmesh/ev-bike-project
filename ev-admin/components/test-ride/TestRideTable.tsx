"use client";

import { Calendar, CheckCircle, Eye, MapPin, Phone, UserCheck, UserX, X } from "lucide-react";
import type { TestRideBooking } from "./types";

interface Props {
  bookings: TestRideBooking[];
  loading: boolean;
  onView: (booking: TestRideBooking) => void;
  onConfirm: (id: string) => void;
  onAssignStaff: (id: string) => void;
  onComplete: (id: string) => void;
  onNoShow: (id: string) => void;
  onCancel: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  "no-show": "bg-slate-100 text-slate-700 border-slate-200",
};

const FOLLOWUP_COLORS: Record<string, string> = {
  not_contacted: "bg-slate-100 text-slate-600",
  call_scheduled: "bg-blue-100 text-blue-600",
  interested: "bg-purple-100 text-purple-600",
  converted: "bg-emerald-100 text-emerald-600",
  not_interested: "bg-red-100 text-red-600",
};

const FOLLOWUP_LABELS: Record<string, string> = {
  not_contacted: "Not Contacted",
  call_scheduled: "Call Scheduled",
  interested: "Interested",
  converted: "Converted",
  not_interested: "Not Interested",
};

export default function TestRideTable({
  bookings,
  loading,
  onView,
  onConfirm,
  onAssignStaff,
  onComplete,
  onNoShow,
  onCancel,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {["Booking ID", "Customer", "EV Model", "Showroom", "Slot Date & Time", "Status", "Assigned Staff", "Follow-up", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-slate-100">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => (
                    <td key={j} className="px-4 py-4">
                      <div className="h-4 bg-slate-100 rounded shimmer w-24" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mx-auto mb-4">
          <Calendar size={28} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-700 mb-2">No bookings found</h3>
        <p className="text-sm text-slate-500">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">EV Model</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Showroom</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Slot Date & Time</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Staff</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Follow-up</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">{booking.id}</span>
                    {booking.isToday && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-red-100 text-red-600 rounded-full">TODAY</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                      {booking.customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700">{booking.customer.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Phone size={10} />
                        {booking.customer.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-700">{booking.ev.model}</div>
                    <div className="text-xs text-slate-500">{booking.ev.brand}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-700">{booking.showroom.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin size={10} />
                      {booking.showroom.city}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    <div>
                      <div className="text-sm font-semibold text-slate-700">{booking.slot.date}</div>
                      <div className="text-xs text-slate-500">{booking.slot.time}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${
                      STATUS_COLORS[booking.status]
                    } ${booking.status === "pending" ? "badge-pulse" : ""}`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {booking.assignedStaff ? (
                    <div className="text-sm text-slate-700">{booking.assignedStaff.name}</div>
                  ) : (
                    <button
                      onClick={() => onAssignStaff(booking.id)}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      Assign Staff
                    </button>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${FOLLOWUP_COLORS[booking.followUp]}`}>
                    {FOLLOWUP_LABELS[booking.followUp]}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onView(booking)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors group relative"
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                    {booking.status === "pending" && (
                      <button
                        onClick={() => onConfirm(booking.id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-600 transition-colors"
                        title="Confirm"
                      >
                        <CheckCircle size={14} />
                      </button>
                    )}
                    {booking.status === "confirmed" && (
                      <>
                        <button
                          onClick={() => onComplete(booking.id)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                          title="Mark Completed"
                        >
                          <UserCheck size={14} />
                        </button>
                        <button
                          onClick={() => onNoShow(booking.id)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-600 transition-colors"
                          title="Mark No-show"
                        >
                          <UserX size={14} />
                        </button>
                      </>
                    )}
                    {(booking.status === "pending" || booking.status === "confirmed") && (
                      <button
                        onClick={() => onCancel(booking.id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                        title="Cancel"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
