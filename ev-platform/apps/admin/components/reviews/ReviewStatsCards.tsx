"use client";

import { Star, ThumbsUp, Clock, AlertTriangle, MessageSquare, TrendingUp } from "lucide-react";
import { MOCK_REVIEWS } from "./types";

export default function ReviewStatsCards() {
  const total = MOCK_REVIEWS.length;
  const avgRating = (MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1);
  const positive = MOCK_REVIEWS.filter(r => r.rating >= 4).length;
  const pending = MOCK_REVIEWS.filter(r => r.status === "pending").length;
  const reported = MOCK_REVIEWS.filter(r => r.reported).length;
  const withReply = MOCK_REVIEWS.filter(r => r.vendorReply).length;
  const responseRate = ((withReply / total) * 100).toFixed(0);

  const stats = [
    { label: "Total Reviews", value: total, icon: MessageSquare, trend: "+12.5%", color: "emerald" },
    { label: "Average Rating", value: avgRating, icon: Star, trend: "+0.3", color: "amber" },
    { label: "Positive Reviews", value: positive, icon: ThumbsUp, trend: "+8.2%", color: "cyan" },
    { label: "Pending Moderation", value: pending, icon: Clock, trend: "-2", color: "orange" },
    { label: "Reported Reviews", value: reported, icon: AlertTriangle, trend: "+1", color: "red" },
    { label: "Response Rate", value: `${responseRate}%`, icon: TrendingUp, trend: "+5%", color: "violet" },
  ];

  const colorMap: Record<string, { bg: string; icon: string; border: string; trend: string }> = {
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100", trend: "text-emerald-600" },
    amber: { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-100", trend: "text-amber-600" },
    cyan: { bg: "bg-cyan-50", icon: "text-cyan-600", border: "border-cyan-100", trend: "text-cyan-600" },
    orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-100", trend: "text-orange-600" },
    red: { bg: "bg-red-50", icon: "text-red-600", border: "border-red-100", trend: "text-red-600" },
    violet: { bg: "bg-violet-50", icon: "text-violet-600", border: "border-violet-100", trend: "text-violet-600" },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color];
        return (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`h-11 w-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon size={20} className={colors.icon} />
              </div>
              <span className={`text-xs font-semibold ${colors.trend} flex items-center gap-1`}>
                <TrendingUp size={11} />
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
            <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
