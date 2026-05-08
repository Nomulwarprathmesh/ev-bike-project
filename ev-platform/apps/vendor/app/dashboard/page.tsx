"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Wrench,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockAnalytics, mockDeliveries, mockOrders, mockProducts, mockServices, mockStockRequests } from "@/lib/mock-data";

const COLORS = ["#1e293b", "#475569", "#64748b", "#cbd5e1"];

export default function Dashboard() {
  const lowStockProducts = mockProducts.filter((p) => p.stock < 20 && p.status === "approved" && p.stock > 0);
  const outOfStockProducts = mockProducts.filter((p) => p.stock === 0 && p.status === "approved");
  const assignedScooters = mockProducts.filter((p) => p.status === "approved");
  const totalStock = mockProducts.filter((p) => p.status === "approved").reduce((sum, p) => sum + p.stock, 0);
  const openServiceJobs = mockServices.filter((service) => service.status === "booked" || service.status === "in_progress");
  const pendingStockRequests = mockStockRequests.filter((request) => request.status === "requested");
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Showroom Operations</h1>
          <p className="text-gray-600 mt-1">
            Sell assigned scooters, handle inventory requests, process deliveries, and manage service work.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={CheckCircle}
            label="Assigned Scooters"
            value={assignedScooters.length.toString()}
            change={2}
            trend="up"
            color="emerald"
          />
          <StatCard
            icon={Wrench}
            label="Open Services"
            value={openServiceJobs.length.toString()}
            change={4}
            trend="up"
            color="blue"
          />
          <StatCard
            icon={Package}
            label="Showroom Stock"
            value={totalStock.toString()}
            change={15}
            trend="up"
            color="blue"
          />
          <StatCard
            icon={AlertTriangle}
            label="Stock Requests"
            value={pendingStockRequests.length.toString()}
            change={1}
            trend="up"
            color="orange"
          />
        </div>

        {/* Alerts */}
        {lowStockProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-4 flex items-start gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <AlertTriangle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900">Low Stock Alert</h3>
              <p className="text-sm text-gray-600 mt-1">
                {lowStockProducts.length} assigned scooter model(s) need admin stock transfer review
              </p>
            </div>
          </motion.div>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Stock Transfer Requests
              </h3>
              <div className="space-y-3">
                {mockStockRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-sm transition-all">
                    <div>
                      <p className="font-medium text-gray-900">{request.productName}</p>
                      <p className="text-sm text-gray-600">{request.requestedQty} units requested on {request.date}</p>
                    </div>
                    <Badge className={request.status === "transferred" ? "bg-emerald-100 text-emerald-800" : request.status === "approved" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}>
                      {request.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Stock Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Delivery And Service Queue
              </h3>
              <div className="space-y-3">
                {mockDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{delivery.vehicle}</p>
                      <p className="text-sm text-gray-600">{delivery.orderId} for {delivery.customerName} - {delivery.status}</p>
                    </div>
                  </div>
                ))}
                {outOfStockProducts.length > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{outOfStockProducts.length} assigned scooter model(s) out of stock</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-4">Sales Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAnalytics.revenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "16px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1e293b"
                    strokeWidth={2}
                    dot={{ fill: "#1e293b", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Orders Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-4">Orders And Fulfilment</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockAnalytics.orders}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "16px",
                    }}
                  />
                  <Bar dataKey="value" fill="#475569" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>



        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Orders</h3>
              <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{order.customerName}</td>
                      <td className="py-3 px-4 text-gray-600">{order.product}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        ₹{order.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className="bg-gray-50 border-gray-200 text-gray-900"
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
