"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Grid3x3,
  List,
  Package,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import ProductCard from "@/components/products/product-card";
import { mockProducts } from "@/lib/mock-data";
import Link from "next/link";

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"accepted" | "rejected" | "stock">("accepted");

  const getBaseProducts = useCallback(() => {
    switch (activeTab) {
      case "accepted":
        return mockProducts.filter((p) => p.status === "approved" && p.stock > 0);
      case "rejected":
        return mockProducts.filter((p) => p.status === "rejected");
      case "stock":
        return mockProducts.filter((p) => p.status === "approved");
      default:
        return [];
    }
  }, [activeTab]);

  const filteredProducts = useMemo(() => {
    const base = getBaseProducts();
    return base.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, getBaseProducts]);

  const statusIcon = activeTab === "accepted" ? CheckCircle : activeTab === "rejected" ? XCircle : Package;
  const statusColor = activeTab === "accepted" ? "emerald" : activeTab === "rejected" ? "red" : "blue";
  const statusBgColor = activeTab === "accepted" ? "bg-emerald-50/50" : activeTab === "rejected" ? "bg-red-50/50" : "bg-blue-50/50";
  const statusBorderColor = activeTab === "accepted" ? "border-emerald-100" : activeTab === "rejected" ? "border-red-100" : "border-blue-100";

  // statusConfig no longer needed with direct vars

  const acceptedCount = useMemo(() => mockProducts.filter((p) => p.status === "approved" && p.stock > 0).length, []);
  const rejectedCount = useMemo(() => mockProducts.filter((p) => p.status === "rejected").length, []);
  const stockCount = useMemo(() => mockProducts.filter((p) => p.status === "approved").length, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600 mt-1">
              Manage your approved and assigned products
            </p>
          </div>
        </div>

        {/* Controls */}
        <Card className="p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 rounded-2xl focus:bg-white focus:border-gray-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`border-gray-200 ${viewMode === "grid" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "hover:bg-gray-50"}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("table")}
                className={`border-gray-200 ${viewMode === "table" ? "bg-blue-50 border-blue-200 text-blue-700" : "hover:bg-gray-50"}`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            {/* Export */}
            <Button variant="outline" className="gap-2 border-gray-200 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-1">
            <TabsTrigger value="accepted" className="gap-2 rounded-2xl data-[state=active]:bg-emerald-100 data-[state=active]:text-gray-900">
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Accepted</span>
              <Badge variant="secondary" className="ml-2 bg-emerald-200 text-emerald-900">{acceptedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-2 rounded-2xl data-[state=active]:bg-red-100 data-[state=active]:text-gray-900">
              <XCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Rejected</span>
              <Badge variant="secondary" className="ml-2 bg-red-200 text-red-900">{rejectedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="stock" className="gap-2 rounded-2xl data-[state=active]:bg-blue-100 data-[state=active]:text-gray-900">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Stock</span>
              <Badge variant="secondary" className="ml-2 bg-blue-200 text-blue-900">{stockCount}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value={activeTab} className="space-y-4">
            {/* Results Count & View Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> of {getBaseProducts().length} product(s)
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                {/* Grid View */}
                {viewMode === "grid" && (
                  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
                    {filteredProducts.map((product, idx) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                        discount={product.discount}
                        image={product.image}
                        stock={product.stock}
                        status={activeTab}
                        rating={product.rating}
                        views={product.views}
                        sales={product.sales}
                        decisionDate={product.decisionDate}
                        rejectionReason={product.rejectionReason}
                        range={product.range}
                      />
                    ))}
                  </div>
                )}

                {/* Table View */}
                {viewMode === "table" && (
                  <Card className="overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Range</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.brand}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-gray-900">₹{Math.round(product.price * (1 - product.discount / 100)).toLocaleString()}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  product.stock > 20 ? "bg-emerald-100 text-emerald-800" :
                                  product.stock > 0 ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"
                                }`}>
                                  {product.stock}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge className={`${
                                  activeTab === "accepted" ? "bg-emerald-100 text-emerald-800" :
                                  activeTab === "rejected" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                                }`}>
                                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.range} km</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                <Button variant="ghost" size="sm">View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                )}
              </>
            ) : (
              <Card className={`p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${statusBorderColor}`}>
                <div className={`text-${statusColor}-600 mb-2`}>
                  <statusIcon className="mx-auto h-12 w-12" />
                </div>
                <p className="text-gray-600 text-lg font-medium">No products found</p>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
