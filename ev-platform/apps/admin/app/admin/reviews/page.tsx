"use client";

import { useState, useMemo } from "react";
import { Download, Bell, RefreshCw, MessageSquare, Activity, Calendar, TrendingUp, ChevronRight } from "lucide-react";
import { MOCK_REVIEWS, type Review, type RatingFilter } from "@/components/reviews/types";
import ReviewStatsCards from "@/components/reviews/ReviewStatsCards";
import ReviewFilters from "@/components/reviews/ReviewFilters";
import ReviewsTable from "@/components/reviews/ReviewsTable";
import ReviewDrawer from "@/components/reviews/ReviewDrawer";
import ReviewAnalytics from "@/components/reviews/ReviewAnalytics";

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<RatingFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [loading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const filtered = useMemo(() => {
    let list = MOCK_REVIEWS;
    
    // Filter by rating
    if (activeFilter !== "all") {
      if (activeFilter === "pending") {
        list = list.filter(r => r.status === "pending");
      } else if (activeFilter === "reported") {
        list = list.filter(r => r.reported);
      } else {
        list = list.filter(r => r.rating === parseInt(activeFilter));
      }
    }
    
    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        r =>
          r.id.toLowerCase().includes(q) ||
          r.customer.name.toLowerCase().includes(q) ||
          r.ev.model.toLowerCase().includes(q) ||
          r.ev.brand.toLowerCase().includes(q) ||
          r.showroom.toLowerCase().includes(q)
      );
    }
    
    return list;
  }, [activeFilter, search]);

  const handleFilterChange = (f: RatingFilter) => {
    setActiveFilter(f);
  };

  const handleSearch = (v: string) => {
    setSearch(v);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* ── Premium Header Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] px-8 py-7">
        {/* Decorative glow blobs */}
        <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left: Title */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-xl shadow-emerald-500/30 ring-2 ring-white/10">
              <MessageSquare size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">Customer Reviews &amp; Ratings</h1>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="flex items-center gap-1.5">
                  <Activity size={13} className="text-slate-500" />
                  Monitor EV reviews, ratings &amp; customer feedback
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-medium">+12.5% positive reviews</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
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

        {/* Breadcrumb */}
        <div className="relative flex items-center gap-2 mt-5 text-xs text-slate-500">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Customer Management</span>
          <ChevronRight size={12} />
          <span className="text-emerald-400 font-semibold">Reviews</span>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="px-8 py-7 space-y-6">
        {/* Stats Cards */}
        <ReviewStatsCards />

        {/* Toggle Analytics */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Activity size={14} />
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </button>
        </div>

        {/* Analytics Section */}
        {showAnalytics && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <ReviewAnalytics />
          </div>
        )}

        {/* Filters */}
        <ReviewFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          search={search}
          onSearchChange={handleSearch}
        />

        {/* Reviews Table */}
        <ReviewsTable
          reviews={filtered}
          loading={loading}
          onView={(r) => setSelectedReview(r)}
        />

        {/* Results Summary */}
        {filtered.length > 0 && (
          <div className="text-center text-sm text-slate-500">
            Showing {filtered.length} of {MOCK_REVIEWS.length} reviews
          </div>
        )}
      </div>

      {/* Review Drawer */}
      {selectedReview && (
        <ReviewDrawer review={selectedReview} onClose={() => setSelectedReview(null)} />
      )}
    </div>
  );
}
