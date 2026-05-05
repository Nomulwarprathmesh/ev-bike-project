"use client";

import { X, CheckCircle, Clock, MapPin, Phone, Mail, Battery, Zap, Calendar, User } from "lucide-react";
import type { TestRideBooking } from "./types";

const TIMELINE = [
  { label: "Booking Requested", icon: Calendar },
  { label: "Pending Approval", icon: Clock },
  { label: "Booking Confirmed", icon: CheckCircle },
  { label: "Staff Assigned", icon: User },
  { label: "Test Ride Completed", icon: CheckCircle },
];

const STATUS_STEP: Record<string, number> = {
  pending: 2,
  confirmed: 3,
  completed: 5,
  cancelled: 2,
  "no-show": 4,
};

const FOLLOWUP_LABELS: Record<string, string> = {
  not_contacted: "Not Contacted",
  call_scheduled: "Call Scheduled",
  interested: "Interested",
  converted: "Converted to Order",
  not_interested: "Not Interested",
};

interface Props {
  booking: TestRideBooking;
  onClose: () => void;
}

export default function BookingDrawer({ booking, onClose }: Props) {
  const step = STATUS_STEP[booking.status] ?? 1;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col animate-drawer overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div>
            <div className="text-xs text-slate-400 font-medium">Booking Details</div>
            <div className="text-lg font-bold text-slate-800">{booking.id}</div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X size={16} className="text-slate-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 scrollbar-hide">
          {booking.isToday && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Test ride scheduled for today</span>
            </div>
          )}

          <Section title="Customer Details">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-lg font-bold">
                {booking.customer.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{booking.customer.name}</div>
                <div className="text-xs text-slate-500">{booking.customer.email}</div>
              </div>
            </div>
            <Row label="Phone" value={booking.customer.phone} icon={Phone} />
            <Row label="Email" value={booking.customer.email} icon={Mail} />
          </Section>

          <Section title="EV Details">
            <Row label="Model" value={booking.ev.model} />
            <Row label="Brand" value={booking.ev.brand} />
            <Row label="Battery" value={booking.ev.battery} icon={Battery} />
            <Row label="Range" value={booking.ev.range} icon={Zap} />
          </Section>

          <Section title="Showroom Details">
            <Row label="Name" value={booking.showroom.name} />
            <Row label="City" value={booking.showroom.city} icon={MapPin} />
            <Row label="Address" value={booking.showroom.address} />
          </Section>

          <Section title="Booking Slot">
            <Row label="Date" value={booking.slot.date} icon={Calendar} />
            <Row label="Time" value={booking.slot.time} icon={Clock} />
          </Section>

          {booking.assignedStaff && (
            <Section title="Assigned Staff">
              <Row label="Name" value={booking.assignedStaff.name} icon={User} />
              <Row label="Phone" value={booking.assignedStaff.phone} icon={Phone} />
            </Section>
          )}

          <Section title="Follow-up Status">
            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-slate-500">Current Status</span>
              <span className="text-xs font-semibold text-slate-700">{FOLLOWUP_LABELS[booking.followUp]}</span>
            </div>
          </Section>

          <Section title="Booking Timeline">
            <div className="relative pl-5 space-y-4">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200" />
              {TIMELINE.map((t, i) => {
                const done = i < step;
                const active = i === step - 1;
                return (
                  <div key={t.label} className="flex items-center gap-3 relative">
                    <div
                      className={`absolute -left-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                        done
                          ? "bg-emerald-500 border-emerald-500"
                          : active
                          ? "bg-white border-emerald-400"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      {done && <CheckCircle size={10} className="text-white" />}
                      {!done && active && <Clock size={10} className="text-emerald-500" />}
                    </div>
                    <span className={`text-xs font-medium ${done ? "text-slate-700" : "text-slate-400"}`}>{t.label}</span>
                  </div>
                );
              })}
            </div>
          </Section>

          {booking.notes && (
            <Section title="Notes">
              <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">{booking.notes}</div>
            </Section>
          )}

          <Section title="Admin Notes">
            <textarea
              rows={3}
              placeholder="Add internal note…"
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all resize-none placeholder:text-slate-400"
            />
            <button className="mt-2 px-4 py-2 text-xs font-semibold bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors">
              Save Note
            </button>
          </Section>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex gap-2">
          <button className="flex-1 py-2.5 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity">
            Confirm Booking
          </button>
          <button className="flex-1 py-2.5 text-sm font-semibold bg-slate-50 text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
            Reschedule
          </button>
          <button className="px-4 py-2.5 text-sm font-semibold bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{title}</div>
      <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-100">{children}</div>
    </div>
  );
}

function Row({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ElementType }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-xs text-slate-500 flex items-center gap-1.5">
        {Icon && <Icon size={12} className="text-slate-400" />}
        {label}
      </span>
      <span className="text-xs font-semibold text-slate-700">{value}</span>
    </div>
  );
}
