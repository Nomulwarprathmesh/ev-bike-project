"use client";

import { useState, useMemo } from "react";
import { Download, Bell, RefreshCw, BikeIcon, Activity, TrendingUp, Calendar, LayoutGrid, List } from "lucide-react";
import { MOCK_BOOKINGS, type TestRideBooking, type BookingStatus } from "@/components/test-ride/types";
import TestRideStats from "@/components/test-ride/TestRideStats";
import TestRideFilters from "@/components/test-ride/TestRideFilters";
import TestRideTable from "@/components/test-ride/TestRideTable";
import BookingDrawer from "@/components/test-ride/BookingDrawer";
import StaffAssignmentModal from "@/components/test-ride/StaffAssignmentModal";
import CalendarView from "@/components/test-ride/CalendarView";

export default function TestRidePage() {
  const [activeStatus, setActiveStatus] = useState<BookingStatus | "all" | "today">("all");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<TestRideBooking | null>(null);
  const [assigningStaff, setAssigningStaff] = useState<string | null>(null);
  const [loading] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");

  const filtered = useMemo(() => {
    let list = MOCK_BOOKINGS;

    if (activeStatus === "today") {
      list = list.filter((b) => b.isToday);
    } else if (activeStatus !== "all") {
      list = list.filter((b) => b.status === activeStatus);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.customer.name.toLowerCase().includes(q) ||
          b.ev.model.toLowerCase().includes(q) ||
          b.showroom.name.toLowerCase().includes(q) ||
          b.showroom.city.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeStatus, search]);

  const stats = useMemo(() => {
    return {
      total: MOCK_BOOKINGS.length,
      today: MOCK_BOOKINGS.filter((b) => b.isToday).length,
      pending: MOCK_BOOKINGS.filter((b) => b.status === "pending").length,
      confirmed: MOCK_BOOKINGS.filter((b) => b.status === "confirmed").length,
      completed: MOCK_BOOKINGS.filter((b) => b.status === "completed").length,
      cancelled: MOCK_BOOKINGS.filter((b) => b.status === "cancelled" || b.status === "no-show").length,
    };
  }, []);

  const handleStatusChange = (s: BookingStatus | "all" | "today") => {
    setActiveStatus(s);
  };

  const handleSearch = (v: string) => {
    setSearch(v);
  };

  const handleConfirm = (id: string) => {
    console.log("Confirm booking:", id);
  };

  const handleAssignStaff = (id: string) => {
    setAssigningStaff(id);
  };

  const handleStaffAssigned = (staffId: string) => {
    console.log("Assigned staff:", staffId, "to booking:", assigningStaff);
    setAssigningStaff(null);
  };

  const handleComplete = (id: string) => {
    console.log("Mark completed:", id);
  };

  const handleNoShow = (id: string) => {
    console.log("Mark no-show:", id);
  };

  const handleCancel = (id: string) => {
    console.log("Cancel booking:", id);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* Premium Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] px-8 py-7">
        <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-xl shadow-emerald-500/30 ring-2 ring-white/10">
              <BikeIcon size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">Test Ride Bookings</h1>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="flex items-center gap-1.5">
                  <Activity size={13} className="text-slate-500" />
                  Manage customer test ride requests, showroom slots, cancellations, and follow-ups
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <Calendar size={14} />
              Jan 2025
            </button>
            <button className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all">
              <Bell size={16} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-[#1E293B]" />
            </button>
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all">
              <RefreshCw size={15} />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] active:scale-[0.97] transition-all">
              <Download size={15} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="relative flex items-center gap-2 mt-5 text-xs text-slate-500">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Operations</span>
          <span className="text-slate-700">/</span>
          <span className="text-emerald-400 font-semibold">Test Rides</span>
        </div>
      </div>

      {/* Page Content */}
      <div className="px-8 py-7 space-y-6">
        <TestRideStats stats={stats} />

        <TestRideFilters
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
          search={search}
          onSearchChange={handleSearch}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing <span className="font-bold text-slate-800">{filtered.length}</span> booking{filtered.length !== 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                viewMode === "table"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <List size={14} />
              Table View
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                viewMode === "calendar"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <LayoutGrid size={14} />
              Calendar View
            </button>
          </div>
        </div>

        {viewMode === "table" ? (
          <TestRideTable
            bookings={filtered}
            loading={loading}
            onView={(b) => setSelectedBooking(b)}
            onConfirm={handleConfirm}
            onAssignStaff={handleAssignStaff}
            onComplete={handleComplete}
            onNoShow={handleNoShow}
            onCancel={handleCancel}
          />
        ) : (
          <CalendarView bookings={filtered} />
        )}
      </div>

      {selectedBooking && <BookingDrawer booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}

      {assigningStaff && (
        <StaffAssignmentModal
          bookingId={assigningStaff}
          onClose={() => setAssigningStaff(null)}
          onAssign={handleStaffAssigned}
        />
      )}
    </div>
  );
}
