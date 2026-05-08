"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Package,
  Warehouse,
  RefreshCw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockProducts, mockStockHistory } from "@/lib/mock-data";

export default function InventoryPage() {
  const lowStockProducts = mockProducts.filter((p) => p.stock < 20 && p.stock > 0 && p.status === "approved");
  const outOfStockProducts = mockProducts.filter((p) => p.stock === 0 && p.status === "approved");
  const approvedProducts = mockProducts.filter((p) => p.status === "approved");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Showroom Inventory</h1>
          <p className="text-gray-600 mt-1">
            Track assigned scooter stock. Replenishment and transfers are approved by platform admin.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Assigned Models</p>
                  <p className="text-3xl font-bold text-blue-900 mt-2">
                    {approvedProducts.length}
                  </p>
                </div>
                <Package className="w-12 h-12 text-blue-400 opacity-30" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Low Stock</p>
                  <p className="text-3xl font-bold text-orange-900 mt-2">
                    {lowStockProducts.length}
                  </p>
                </div>
                <TrendingDown className="w-12 h-12 text-orange-400 opacity-30" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 shadow-lg bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Out of Stock</p>
                  <p className="text-3xl font-bold text-red-900 mt-2">
                    {outOfStockProducts.length}
                  </p>
                </div>
                <AlertTriangle className="w-12 h-12 text-red-400 opacity-30" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Low Stock Alerts */}
        {lowStockProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50 border-l-4 border-l-orange-500 border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Low Stock Transfer Requests
              </h3>
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-orange-200 hover:border-orange-300 transition-all"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        Only <span className="font-semibold text-orange-600">{product.stock}</span> units left
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 rounded-lg hover:bg-orange-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Request Transfer
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Stock History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
              <h3 className="font-semibold text-gray-900">Stock Movement Audit</h3>
              <p className="text-sm text-gray-600 mt-1">Admin transfers, sales, adjustments, and low-stock alerts</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStockHistory.slice(0, 8).map((history) => {
                    const product = mockProducts.find(p => p.id === history.productId);
                    return (
                      <tr key={history.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-gray-900 font-medium">{history.date}</td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-900">{product?.name}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-semibold px-2 py-1 rounded-full text-xs ${
                            history.type === 'restock' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {history.quantity > 0 ? '+' : ''}{history.quantity}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-900">
                            {history.type.charAt(0).toUpperCase() + history.type.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{history.note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
