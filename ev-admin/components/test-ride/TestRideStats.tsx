"use client";

import { Calendar, CheckCircle, Clock, TrendingUp, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: number;
  trend: string;
  icon: React.ElementType;
  delay?: number;
}

function StatCard({ title, value, trend, icon: Icon, delay = 0 }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = value;
      const duration = 800;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div
      className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-100">
          <Icon size={20} className="text-emerald-600" />
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-800 mb-1 animate-count">{count}</div>
      <div className="text-xs font-medium text-slate-500 mb-2">{title}</div>
      <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
        <TrendingUp size={12} />
        {trend}
      </div>
    </div>
  );
}

interface Props {
  stats: {
    total: number;
    today: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

export default function TestRideStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard title="Total Bookings" value={stats.total} trend="+12.5% this week" icon={Users} delay={0} />
      <StatCard title="Today's Test Rides" value={stats.today} trend="+2 from yesterday" icon={Calendar} delay={50} />
      <StatCard title="Pending Approval" value={stats.pending} trend="Needs attention" icon={Clock} delay={100} />
      <StatCard title="Confirmed" value={stats.confirmed} trend="+8.3% this week" icon={CheckCircle} delay={150} />
      <StatCard title="Completed" value={stats.completed} trend="85% conversion" icon={CheckCircle} delay={200} />
      <StatCard title="Cancelled / No-show" value={stats.cancelled} trend="-3.2% this week" icon={XCircle} delay={250} />
    </div>
  );
}
