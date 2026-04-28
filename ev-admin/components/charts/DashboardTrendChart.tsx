"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const weeks = ["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10","W11","W12"];

const chartData = {
  Revenue: [12, 19, 15, 28, 24, 33, 29, 40, 36, 45, 42, 52].map((v, i) => ({ week: weeks[i], value: v })),
  Orders:  [80, 95, 88, 110, 102, 130, 120, 145, 138, 160, 155, 175].map((v, i) => ({ week: weeks[i], value: v })),
  Vendors: [10, 12, 11, 15, 14, 18, 17, 22, 20, 25, 24, 28].map((v, i) => ({ week: weeks[i], value: v })),
};

type Tab = keyof typeof chartData;
const tabs: Tab[] = ["Revenue", "Orders", "Vendors"];

export default function DashboardTrendChart({ className }: { className?: string }) {
  const [active, setActive] = useState<Tab>("Revenue");

  return (
    <div className={cn("bg-white rounded-2xl shadow-sm p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-gray-800">Trend Overview</h2>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                active === tab
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData[active]} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            labelStyle={{ fontWeight: 600, color: "#374151" }}
          />
          <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#colorValue)" dot={false} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
