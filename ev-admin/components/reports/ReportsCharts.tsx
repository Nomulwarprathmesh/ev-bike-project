"use client";

import { TrendingUp, BarChart3, PieChart } from "lucide-react";

export default function ReportsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trend */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">Revenue Trend</h3>
            <p className="text-xs text-slate-400 mt-0.5">Last 6 months performance</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
            <TrendingUp size={18} className="text-white" />
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-3">
          {[65, 78, 82, 90, 85, 95].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t-xl hover:opacity-80 transition-all cursor-pointer"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-slate-400 font-semibold">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Growth */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">Orders Growth</h3>
            <p className="text-xs text-slate-400 mt-0.5">Monthly order volume</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <BarChart3 size={18} className="text-white" />
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-3">
          {[55, 68, 75, 82, 78, 88].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-xl hover:opacity-80 transition-all cursor-pointer"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-slate-400 font-semibold">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* EV Category Sales */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">EV Category Sales</h3>
            <p className="text-xs text-slate-400 mt-0.5">Distribution by type</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <PieChart size={18} className="text-white" />
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "E-Scooters", value: 45, color: "from-emerald-500 to-green-500" },
            { label: "E-Bikes", value: 30, color: "from-blue-500 to-indigo-500" },
            { label: "E-Motorcycles", value: 15, color: "from-violet-500 to-purple-500" },
            { label: "E-Cycles", value: 10, color: "from-amber-500 to-orange-500" },
          ].map((cat) => (
            <div key={cat.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-slate-700">{cat.label}</span>
                <span className="text-sm font-bold text-slate-800">{cat.value}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${cat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Performance */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">Top Cities</h3>
            <p className="text-xs text-slate-400 mt-0.5">By order volume</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { city: "Bangalore", orders: 487, revenue: "₹12.4L", color: "from-emerald-500 to-cyan-500" },
            { city: "Delhi", orders: 423, revenue: "₹10.8L", color: "from-blue-500 to-indigo-500" },
            { city: "Mumbai", orders: 398, revenue: "₹9.7L", color: "from-violet-500 to-purple-500" },
            { city: "Pune", orders: 312, revenue: "₹7.9L", color: "from-amber-500 to-orange-500" },
          ].map((city) => (
            <div key={city.city} className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${city.color} flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0`}>
                {city.city.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-800">{city.city}</div>
                <div className="text-xs text-slate-400">{city.orders} orders · {city.revenue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
