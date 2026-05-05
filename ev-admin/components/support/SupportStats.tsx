"use client";

import { Ticket, MessageSquare, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Tickets", value: "1,247", icon: Ticket, color: "from-blue-500 to-indigo-500", change: "+12%" },
  { label: "Open Tickets", value: "89", icon: MessageSquare, color: "from-amber-500 to-orange-500", change: "23 new" },
  { label: "In Progress", value: "156", icon: Clock, color: "from-cyan-500 to-blue-500", change: "Active" },
  { label: "Resolved", value: "987", icon: CheckCircle, color: "from-emerald-500 to-green-500", change: "79%" },
  { label: "Escalated", value: "15", icon: AlertTriangle, color: "from-red-500 to-pink-500", change: "Critical" },
  { label: "Avg Response", value: "2.4h", icon: TrendingUp, color: "from-violet-500 to-purple-500", change: "-15%" },
];

export default function SupportStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold truncate">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-0.5">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.change}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
