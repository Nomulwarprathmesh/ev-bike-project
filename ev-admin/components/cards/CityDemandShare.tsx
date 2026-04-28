"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { city: "Bengaluru", percent: 31, color: "#10b981" },
  { city: "Mumbai", percent: 22, color: "#06b6d4" },
  { city: "Delhi NCR", percent: 19, color: "#6366f1" },
  { city: "Chennai", percent: 14, color: "#f59e0b" },
  { city: "Pune + others", percent: 14, color: "#e2e8f0" },
];

export default function CityDemandShare({ className }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5 ${className ?? ""}`}>
      <h2 className="text-base font-semibold text-gray-800">City demand share</h2>

      {/* Donut Chart */}
      <div className="relative flex items-center justify-center h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="percent"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute flex flex-col items-center pointer-events-none">
          <span className="text-2xl font-bold text-gray-800">2.4M</span>
          <span className="text-xs text-gray-400">users</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.city} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-gray-600">{item.city}</span>
            </div>
            <span className="font-medium text-gray-700">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
