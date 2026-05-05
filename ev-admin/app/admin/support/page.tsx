"use client";

import { useState } from "react";
import { Search, Download, Activity } from "lucide-react";
import SupportStats from "@/components/support/SupportStats";
import SupportTable from "@/components/support/SupportTable";
import SupportDrawer from "@/components/support/SupportDrawer";
import type { Ticket } from "@/components/support/types";

const mockTickets: Ticket[] = [
  {
    id: "TKT-1001",
    customer: { name: "Aarav Sharma", email: "aarav@example.com", avatar: "AS" },
    category: "delivery",
    priority: "high",
    assignedAgent: "Priya Kumar",
    status: "in_progress",
    slaTimer: "2h 15m",
    lastUpdate: "15 mins ago",
    unread: true,
    overdue: false,
    orderReference: "ORD-5432",
    evReference: "Ather 450X",
    subject: "Delivery delayed for my order",
  },
  {
    id: "TKT-1002",
    customer: { name: "Rohan Patel", email: "rohan@example.com", avatar: "RP" },
    category: "technical",
    priority: "urgent",
    assignedAgent: "Amit Singh",
    status: "escalated",
    slaTimer: "0h 45m",
    lastUpdate: "5 mins ago",
    unread: true,
    overdue: true,
    orderReference: "ORD-5431",
    evReference: "Ola S1 Pro",
    subject: "Battery issue after delivery",
  },
  {
    id: "TKT-1003",
    customer: { name: "Sneha Reddy", email: "sneha@example.com", avatar: "SR" },
    category: "billing",
    priority: "medium",
    assignedAgent: "Kavya Nair",
    status: "open",
    slaTimer: "4h 30m",
    lastUpdate: "1 hour ago",
    unread: false,
    overdue: false,
    orderReference: "ORD-5430",
    subject: "EMI payment not reflecting",
  },
  {
    id: "TKT-1004",
    customer: { name: "Vikram Joshi", email: "vikram@example.com", avatar: "VJ" },
    category: "refund",
    priority: "high",
    assignedAgent: "Priya Kumar",
    status: "in_progress",
    slaTimer: "1h 20m",
    lastUpdate: "30 mins ago",
    unread: false,
    overdue: false,
    orderReference: "ORD-5429",
    evReference: "TVS iQube",
    subject: "Refund request for cancelled order",
  },
  {
    id: "TKT-1005",
    customer: { name: "Ananya Gupta", email: "ananya@example.com", avatar: "AG" },
    category: "general",
    priority: "low",
    assignedAgent: "Rahul Verma",
    status: "resolved",
    slaTimer: "Completed",
    lastUpdate: "2 hours ago",
    unread: false,
    overdue: false,
    subject: "Query about test ride booking",
  },
];

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = mockTickets.filter(
    (t) =>
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
          Customer Support / Help Desk
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Support Center</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage customer tickets, queries, and support requests
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
              <Activity size={16} className="text-emerald-600 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700">Live Support Active</span>
            </div>
            <button className="flex items-center gap-2 border border-slate-200 text-slate-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-50 transition-all">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <SupportStats />

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets by ID, customer name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Table */}
      <SupportTable tickets={filteredTickets} onView={setSelectedTicket} />

      {/* Drawer */}
      <SupportDrawer ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  );
}
