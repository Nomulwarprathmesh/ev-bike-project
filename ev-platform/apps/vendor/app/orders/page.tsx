"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  Eye,
  Truck,
  Calendar,
  X,
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
import { mockOrders } from "@/lib/mock-data";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  packed: "bg-purple-100 text-purple-800 border-purple-200",
  shipped: "bg-cyan-100 text-cyan-800 border-cyan-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600 mt-1">Manage and track customer orders</p>
          </div>
          <Button variant="outline" className="gap-2 rounded-xl shadow-lg">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Controls */}
        <Card className="p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

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
                  All Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("packed")}>
                  Packed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>
                  Shipped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>
                  Delivered
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.product}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      ₹{order.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.date}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`${statusColors[order.status as keyof typeof statusColors]} border`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="gap-2 rounded-lg hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Order Details Modal */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-gradient-to-r from-white to-gray-50">
                <h2 className="text-xl font-bold text-gray-900">
                  Order {selectedOrder.id}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">
                        {selectedOrder.customerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">
                        {selectedOrder.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-xl border border-emerald-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Order Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product</span>
                      <span className="font-medium text-gray-900">
                        {selectedOrder.product}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <span className="font-medium text-gray-900">
                        {selectedOrder.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium text-gray-900">
                        ₹{selectedOrder.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Status Timeline
                  </h3>
                  <div className="space-y-3">
                    {["pending", "confirmed", "packed", "shipped", "delivered"].map(
                      (status, index) => (
                        <div key={status} className="flex items-start gap-3">
                          <div
                            className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                              ["pending", "confirmed", "packed", "shipped", "delivered"].indexOf(
                                selectedOrder.status
                              ) >= index
                                ? "bg-emerald-600"
                                : "bg-gray-300"
                            }`}
                          />
                          <div>
                            <p className="font-medium text-gray-900 capitalize">
                              {status}
                            </p>
                            <p className="text-xs text-gray-500">
                              {status === selectedOrder.status
                                ? "Current status"
                                : "Pending"}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 rounded-xl border border-orange-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Delivery Address
                  </h3>
                  <p className="text-sm text-gray-600">{selectedOrder.address}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
