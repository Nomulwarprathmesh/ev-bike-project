"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockLeads } from "@/lib/mock-data";

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-blue-100 text-blue-800 border-blue-200",
};

const statusColors = {
  new: "bg-blue-50 border-blue-200",
  contacted: "bg-purple-50 border-purple-200",
  qualified: "bg-emerald-50 border-emerald-200",
};

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.interestedProduct.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !priorityFilter || lead.priority === priorityFilter;
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads & Inquiries</h1>
          <p className="text-gray-600 mt-1">
            Manage customer inquiries and sales leads
          </p>
        </div>

        {/* Controls */}
        <Card className="p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            {/* Priority Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-xl">
                  <Filter className="w-4 h-4" />
                  Priority
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setPriorityFilter(null)}>
                  All Priorities
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("high")}>
                  High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>
                  Medium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("low")}>
                  Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-xl">
                  <Filter className="w-4 h-4" />
                  Status
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("new")}>
                  New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("contacted")}>
                  Contacted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("qualified")}>
                  Qualified
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>

        {/* Leads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead, idx) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                className={`p-6 border-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 ${statusColors[lead.status as keyof typeof statusColors]}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {lead.interestedProduct}
                    </p>
                  </div>
                  <Badge
                    className={`${priorityColors[lead.priority as keyof typeof priorityColors]} border`}
                  >
                    {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                  </Badge>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <Badge
                    variant="outline"
                    className="bg-white border-gray-300 text-gray-700"
                  >
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 bg-white/50 p-2 rounded-lg">
                  "{lead.message}"
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Clock className="w-3 h-3" />
                  {lead.date}
                </div>

                {/* Contact Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 rounded-lg hover:bg-gray-100"
                    onClick={() => window.location.href = `tel:${lead.phone}`}
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Call</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 rounded-lg hover:bg-gray-100"
                    onClick={() => window.location.href = `mailto:${lead.email}`}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="hidden sm:inline">Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 rounded-lg hover:bg-gray-100"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Note</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLeads.length === 0 && (
          <Card className="p-12 text-center shadow-lg">
            <p className="text-gray-600">No leads found</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
