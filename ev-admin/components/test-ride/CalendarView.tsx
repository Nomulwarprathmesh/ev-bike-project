"use client";

import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { TestRideBooking } from "./types";

interface Props {
  bookings: TestRideBooking[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CalendarView({ bookings }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getBookingsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return bookings.filter((b) => b.slot.date === dateStr);
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayBookings = getBookingsForDate(day);
    const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

    days.push(
      <div
        key={day}
        className={`h-24 border border-slate-200 rounded-xl p-2 hover:bg-slate-50 transition-colors ${
          isToday ? "bg-emerald-50 border-emerald-300" : "bg-white"
        }`}
      >
        <div className={`text-xs font-bold mb-1 ${isToday ? "text-emerald-600" : "text-slate-600"}`}>{day}</div>
        <div className="space-y-1">
          {dayBookings.slice(0, 2).map((booking) => (
            <div
              key={booking.id}
              className={`text-xs px-2 py-1 rounded-lg truncate ${
                booking.status === "confirmed"
                  ? "bg-blue-100 text-blue-700"
                  : booking.status === "pending"
                  ? "bg-amber-100 text-amber-700"
                  : booking.status === "completed"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {booking.slot.time} - {booking.customer.name}
            </div>
          ))}
          {dayBookings.length > 2 && (
            <div className="text-xs text-slate-500 font-semibold">+{dayBookings.length - 2} more</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-100">
            <CalendarIcon size={18} className="text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-800">
            {MONTHS[month]} {year}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ChevronLeft size={16} className="text-slate-600" />
          </button>
          <button
            onClick={nextMonth}
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ChevronRight size={16} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{days}</div>

      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-amber-100 border border-amber-200" />
          <span className="text-xs text-slate-600">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-blue-100 border border-blue-200" />
          <span className="text-xs text-slate-600">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-emerald-100 border border-emerald-200" />
          <span className="text-xs text-slate-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-slate-100 border border-slate-200" />
          <span className="text-xs text-slate-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
}
