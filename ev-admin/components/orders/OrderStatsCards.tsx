"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, ShoppingCart, Clock, CheckCircle, Truck, IndianRupee } from "lucide-react";

const STATS = [
  {
    label: "Total Orders",
    sub: "All time orders",
    value: 1284,
    trend: 12.4,
    up: true,
    icon: ShoppingCart,
    color: "#12C48B",
    glow: "shadow-emerald-500/20",
    from: "#12C48B",
    to: "#06B6D4",
    bg: "from-white to-emerald-50/60",
  },
  {
    label: "Pending",
    sub: "Awaiting action",
    value: 87,
    trend: 3.1,
    up: true,
    icon: Clock,
    color: "#F59E0B",
    glow: "shadow-amber-500/20",
    from: "#F59E0B",
    to: "#FCD34D",
    bg: "from-white to-amber-50/60",
  },
  {
    label: "Approved",
    sub: "Vendor confirmed",
    value: 342,
    trend: 8.7,
    up: true,
    icon: CheckCircle,
    color: "#06B6D4",
    glow: "shadow-cyan-500/20",
    from: "#06B6D4",
    to: "#38BDF8",
    bg: "from-white to-cyan-50/60",
  },
  {
    label: "Delivered",
    sub: "Successfully done",
    value: 798,
    trend: 15.2,
    up: true,
    icon: Truck,
    color: "#10B981",
    glow: "shadow-green-500/20",
    from: "#10B981",
    to: "#34D399",
    bg: "from-white to-green-50/60",
  },
  {
    label: "GMV Revenue",
    sub: "Gross merchandise",
    value: 184,
    trend: 22.8,
    up: true,
    icon: IndianRupee,
    color: "#12C48B",
    glow: "shadow-emerald-500/20",
    from: "#12C48B",
    to: "#06B6D4",
    bg: "from-white to-teal-50/60",
    suffix: "L",
  },
];

const SPARKS = [
  [30, 50, 40, 70, 55, 85, 65, 95],
  [55, 35, 65, 45, 75, 40, 70, 55],
  [25, 50, 35, 70, 55, 80, 60, 88],
  [45, 65, 50, 80, 60, 92, 70, 100],
  [40, 55, 45, 75, 65, 88, 75, 95],
];

function useCountUp(target: number, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let v = 0;
      const step = target / 55;
      const id = setInterval(() => {
        v += step;
        if (v >= target) { setCount(target); clearInterval(id); }
        else setCount(Math.floor(v));
      }, 16);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return count;
}

function StatCard({ s, i }: { s: typeof STATS[0]; i: number }) {
  const n = useCountUp(s.value, i * 120);
  const display = s.suffix ? `₹${n}${s.suffix}` : n.toLocaleString();

  return (
    <div className={`relative bg-gradient-to-br ${s.bg} rounded-2xl p-6 border border-slate-100 shadow-lg ${s.glow} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group cursor-default`}>
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${s.from}, ${s.to})` }} />

      {/* Decorative circle */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ background: `radial-gradient(circle, ${s.color}, transparent)` }} />

      {/* Icon + Trend */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300"
          style={{ background: `linear-gradient(135deg, ${s.from}22, ${s.to}33)`, border: `1px solid ${s.color}30` }}
        >
          <s.icon size={20} style={{ color: s.color }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${s.up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
          {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {s.trend}%
        </div>
      </div>

      {/* Value */}
      <div className="text-3xl font-extrabold text-slate-800 tabular-nums tracking-tight leading-none mb-1">
        {display}
      </div>
      <div className="text-sm font-semibold text-slate-600">{s.label}</div>
      <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>

      {/* Sparkline */}
      <div className="flex items-end gap-0.5 mt-4 h-8">
        {SPARKS[i].map((h, k) => (
          <div
            key={k}
            className="flex-1 rounded-sm transition-all duration-300 group-hover:opacity-60"
            style={{ height: `${h}%`, background: `linear-gradient(to top, ${s.from}, ${s.to})`, opacity: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function OrderStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
      {STATS.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
    </div>
  );
}
