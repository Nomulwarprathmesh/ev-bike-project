"use client";

import { DollarSign, ShoppingCart, RefreshCw, TrendingUp, Users, Target } from "lucide-react";

const stats = [
  { label: "Revenue", value: "₹45.2L", icon: DollarSign, color: "from-emerald-500 to-green-500", change: "+18.2%" },
  { label: "Orders", value: "1,847", icon: ShoppingCart, color: "from-blue-500 to-indigo-500", change: "+12.5%" },
  { label: "Refund Rate", value: "2.3%", icon: RefreshCw, color: "from-red-500 to-pink-500", change: "-0.8%" },
  { label: "Test Ride Conv.", value: "34%", icon: Target, color: "from-violet-500 to-purple-500", change: "+5.2%" },
  { label: "Vendor Growth", value: "+127", icon: Users, color: "from-cyan-500 to-blue-500", change: "This month" },
  { label: "Retention", value: "89%", icon: TrendingUp, color: "from-amber-500 to-orange-500", change: "+3.1%" },
];

export default function ReportsStats() {
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
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">{stat.change}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
