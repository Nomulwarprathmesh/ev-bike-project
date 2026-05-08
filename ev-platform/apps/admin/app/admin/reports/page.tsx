"use client";

import { useState } from "react";
import { Calendar, Download, FileText } from "lucide-react";
import ReportsStats from "@/components/reports/ReportsStats";
import ReportsCharts from "@/components/reports/ReportsCharts";
import TopSections from "@/components/reports/TopSections";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("Last 30 days");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
          Analytics / Reports
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Reports & Insights</h1>
            <p className="text-sm text-slate-500 mt-1">
              Comprehensive analytics and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-slate-200 text-slate-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-50 transition-all">
              <Calendar size={16} />
              {dateRange}
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition-all">
              <Download size={16} />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <ReportsStats />

      {/* Charts */}
      <ReportsCharts />

      {/* Top Sections */}
      <TopSections />

      {/* Download Center */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <FileText size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Download Center</h3>
            <p className="text-xs text-slate-400">Export and schedule reports</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Daily Report", desc: "Last 24 hours", color: "from-blue-500 to-indigo-500" },
            { label: "Weekly Report", desc: "Last 7 days", color: "from-violet-500 to-purple-500" },
            { label: "Monthly Report", desc: "Last 30 days", color: "from-emerald-500 to-green-500" },
            { label: "Vendor Report", desc: "All vendors", color: "from-amber-500 to-orange-500" },
          ].map((report) => (
            <button
              key={report.label}
              className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all text-left"
            >
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${report.color} flex items-center justify-center flex-shrink-0`}>
                <Download size={16} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{report.label}</div>
                <div className="text-xs text-slate-400">{report.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
