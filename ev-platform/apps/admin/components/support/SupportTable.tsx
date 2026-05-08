"use client";

import { Eye, UserPlus, Reply, AlertTriangle, CheckCircle, Download, Clock } from "lucide-react";
import type { Ticket, TicketStatus, TicketPriority } from "./types";

const STATUS_STYLE: Record<TicketStatus, { cls: string; dot: string }> = {
  open: { cls: "bg-amber-50 text-amber-700 border-amber-200", dot: "#F59E0B" },
  in_progress: { cls: "bg-cyan-50 text-cyan-700 border-cyan-200", dot: "#06B6D4" },
  resolved: { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "#10B981" },
  escalated: { cls: "bg-red-50 text-red-600 border-red-200", dot: "#EF4444" },
  closed: { cls: "bg-slate-100 text-slate-500 border-slate-200", dot: "#94A3B8" },
};

const PRIORITY_STYLE: Record<TicketPriority, string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

const CATEGORY_STYLE: Record<string, string> = {
  technical: "bg-purple-100 text-purple-700",
  billing: "bg-emerald-100 text-emerald-700",
  delivery: "bg-cyan-100 text-cyan-700",
  refund: "bg-pink-100 text-pink-700",
  general: "bg-slate-100 text-slate-600",
};

interface Props {
  tickets: Ticket[];
  onView: (ticket: Ticket) => void;
}

export default function SupportTable({ tickets, onView }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">Support Tickets</span>
          <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-500 rounded-full">{tickets.length}</span>
        </div>
        <div className="text-xs text-slate-400">Live updates</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Ticket ID</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Priority</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Agent</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">SLA Timer</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Last Update</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {tickets.map((ticket) => {
              const statusStyle = STATUS_STYLE[ticket.status];
              return (
                <tr key={ticket.id} className={`hover:bg-slate-50/80 transition-all ${ticket.overdue ? "bg-red-50/30" : ""}`}>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-slate-700">{ticket.id}</span>
                      {ticket.unread && <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />}
                      {ticket.overdue && <AlertTriangle size={14} className="text-red-500" />}
                    </div>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {ticket.customer.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-700">{ticket.customer.name}</div>
                        <div className="text-xs text-slate-400">{ticket.customer.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-lg ${CATEGORY_STYLE[ticket.category]}`}>
                      {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                    </span>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-lg ${PRIORITY_STYLE[ticket.priority]}`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-slate-700">{ticket.assignedAgent}</div>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border ${statusStyle.cls}`}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusStyle.dot }} />
                      {ticket.status.replace("_", " ").charAt(0).toUpperCase() + ticket.status.replace("_", " ").slice(1)}
                    </span>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className={`flex items-center gap-1.5 text-sm font-semibold ${ticket.overdue ? "text-red-600" : "text-slate-700"}`}>
                      <Clock size={14} />
                      {ticket.slaTimer}
                    </div>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-xs text-slate-500">{ticket.lastUpdate}</div>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => onView(ticket)} className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="h-8 w-8 flex items-center justify-center rounded-lg text-cyan-600 hover:bg-cyan-50 transition-all">
                        <Reply size={14} />
                      </button>
                      <button className="h-8 w-8 flex items-center justify-center rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all">
                        <UserPlus size={14} />
                      </button>
                      <button className="h-8 w-8 flex items-center justify-center rounded-lg text-purple-600 hover:bg-purple-50 transition-all">
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
