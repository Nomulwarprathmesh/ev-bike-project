"use client";

import { TrendingUp, TrendingDown, Star, Award } from "lucide-react";
import { MOCK_REVIEWS } from "./types";

export default function ReviewAnalytics() {
  const ratingDist = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: MOCK_REVIEWS.filter(r => r.rating === rating).length,
    percentage: (MOCK_REVIEWS.filter(r => r.rating === rating).length / MOCK_REVIEWS.length) * 100
  }));

  const topEVs = [
    { model: "Ola S1 Pro", reviews: 2, rating: 4.5 },
    { model: "Ather 450X", reviews: 1, rating: 4.0 },
    { model: "Simple One", reviews: 1, rating: 5.0 },
  ];

  const topShowrooms = [
    { name: "Mumbai Central", reviews: 2, satisfaction: 92 },
    { name: "Bangalore HSR", reviews: 1, satisfaction: 88 },
    { name: "Hyderabad Banjara", reviews: 1, satisfaction: 95 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Rating Distribution */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Star size={18} className="text-amber-500" />
          <h3 className="text-lg font-bold text-slate-800">Rating Distribution</h3>
        </div>
        <div className="space-y-3">
          {ratingDist.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-semibold text-slate-700">{rating}</span>
                <Star size={12} className="fill-amber-400 text-amber-400" />
              </div>
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-600 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Most Reviewed EVs */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Award size={18} className="text-emerald-500" />
          <h3 className="text-lg font-bold text-slate-800">Most Reviewed EVs</h3>
        </div>
        <div className="space-y-3">
          {topEVs.map((ev, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  #{i + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-700">{ev.model}</div>
                  <div className="text-xs text-slate-500">{ev.reviews} reviews</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-slate-700">{ev.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment Trends */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-5">Sentiment Trends</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-600">Positive</span>
            </div>
            <div className="text-2xl font-bold text-emerald-700">
              {MOCK_REVIEWS.filter(r => r.sentiment === "positive").length}
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1">+15% this week</div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={16} className="text-red-600" />
              <span className="text-xs font-semibold text-red-600">Negative</span>
            </div>
            <div className="text-2xl font-bold text-red-700">
              {MOCK_REVIEWS.filter(r => r.sentiment === "negative").length}
            </div>
            <div className="text-xs text-red-600 font-medium mt-1">-8% this week</div>
          </div>
        </div>
      </div>

      {/* Top Showrooms */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-5">Top Showrooms</h3>
        <div className="space-y-3">
          {topShowrooms.map((showroom, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <div className="text-sm font-semibold text-slate-700">{showroom.name}</div>
                <div className="text-xs text-slate-500">{showroom.reviews} reviews</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">{showroom.satisfaction}%</div>
                <div className="text-xs text-slate-500">satisfaction</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
