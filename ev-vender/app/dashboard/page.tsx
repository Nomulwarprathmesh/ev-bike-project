"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingCart,
  Eye,
  Zap,
  AlertTriangle,
  Package,
  Clock,
  CheckCircle,
  XCircle,
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
import { mockAnalytics, mockOrders, mockProducts } from "@/lib/mock-data";

const COLORS = ["#1e293b", "#475569", "#64748b", "#cbd5e1"];

export default function Dashboard() {
  const lowStockProducts = mockProducts.filter((p) => p.stock < 20 && p.status === "approved" && p.stock > 0);
  const outOfStockProducts = mockProducts.filter((p) => p.stock === 0 && p.status === "approved");
  const acceptedProducts = mockProducts.filter((p) => p.status === "approved" && p.stock > 0);
  const rejectedProducts = mockProducts.filter((p) => p.status === "rejected");
  const totalStock = mockProducts.filter((p) => p.status === "approved").reduce((sum, p) => sum + p.stock, 0);
  const recentDecisions = mockProducts.filter((p) => p.decisionDate).sort((a,b) => new Date(b.decisionDate).getTime() - new Date(a.decisionDate).getTime()).slice(0,5);
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
Welcome back to your Showroom Owner portal
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={CheckCircle}
            label="Accepted Products"
            value={acceptedProducts.length.toString()}
            change={2}
            trend="up"
            color="emerald"
          />
          <StatCard
            icon={XCircle}
            label="Rejected Products"
            value={rejectedProducts.length.toString()}
            change={-1}
            trend="down"
            color="red"
          />
          <StatCard
            icon={Package}
            label="Total Stock"
            value={totalStock.toString()}
            change={15}
            trend="up"
            color="blue"
          />
          <StatCard
            icon={AlertTriangle}
            label="Low Stock Products"
            value={lowStockProducts.length.toString()}
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
                {lowStockProducts.length} approved product(s) have low stock levels
              </p>
            </div>
          </motion.div>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Admin Decisions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Recent Admin Decisions
              </h3>
              <div className="space-y-3">
                {recentDecisions.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-sm transition-all">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.status === "rejected" ? "Rejected" : "Accepted"} on {product.decisionDate}</p>
                    </div>
                    <Badge className={product.status === "rejected" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}>
                      {product.status === "rejected" ? "Rejected" : "Accepted"}
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
                Stock Alerts
              </h3>
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
                    <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">Low stock: {product.stock} units</p>
                    </div>
                  </div>
                ))}
                {outOfStockProducts.length > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{outOfStockProducts.length} products out of stock</p>
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
              <h3 className="font-semibold text-gray-900 mb-4">Revenue Trend</h3>
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
              <h3 className="font-semibold text-gray-900 mb-4">Orders Analytics</h3>
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
