"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle, Filter, Package, Plus, Search, Tags } from "lucide-react";

type ProductStatus = "draft" | "pending" | "approved" | "rejected" | "inactive" | "out_of_stock";

type Scooter = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  range: string;
  status: ProductStatus;
  assignedDealers: number;
};

const scooters: Scooter[] = [
  { id: "SC-001", name: "Ola S1 Pro", brand: "Ola Electric", category: "Scooter", price: 129999, stock: 142, range: "181 km", status: "approved", assignedDealers: 18 },
  { id: "SC-002", name: "Ather 450X", brand: "Ather Energy", category: "Scooter", price: 149900, stock: 55, range: "146 km", status: "approved", assignedDealers: 14 },
  { id: "SC-003", name: "TVS iQube S", brand: "TVS Motor", category: "Scooter", price: 109900, stock: 0, range: "100 km", status: "out_of_stock", assignedDealers: 9 },
  { id: "SC-004", name: "Revolt RV400", brand: "Revolt Motors", category: "Bike", price: 139900, stock: 48, range: "150 km", status: "pending", assignedDealers: 0 },
  { id: "SC-005", name: "Hero Vida V1 Pro", brand: "Hero MotoCorp", category: "Scooter", price: 145900, stock: 84, range: "165 km", status: "draft", assignedDealers: 0 },
];

const statusStyle: Record<ProductStatus, string> = {
  draft: "bg-gray-100 text-gray-700",
  pending: "bg-blue-100 text-blue-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  inactive: "bg-slate-100 text-slate-700",
  out_of_stock: "bg-orange-100 text-orange-700",
};

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProductStatus | "all">("all");

  const filtered = useMemo(() => {
    return scooters.filter((scooter) => {
      const matchesQuery = `${scooter.name} ${scooter.brand}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || scooter.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const approved = scooters.filter((scooter) => scooter.status === "approved").length;
  const pending = scooters.filter((scooter) => scooter.status === "pending").length;
  const outOfStock = scooters.filter((scooter) => scooter.status === "out_of_stock").length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scooter Catalog Control</h1>
          <p className="mt-1 text-sm text-gray-500">
            Admin owns scooter creation, catalog status, pricing, and dealer stock assignment.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-sm">
          <Plus size={16} /> Add Scooter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Catalog Items", value: scooters.length, icon: Package },
          { label: "Approved Live", value: approved, icon: CheckCircle },
          { label: "Pending Review", value: pending, icon: Tags },
          { label: "Out Of Stock", value: outOfStock, icon: AlertTriangle },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                  <Icon size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-500">
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search scooters or brands..."
              className="w-56 bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-gray-400" />
            {(["all", "draft", "pending", "approved", "rejected", "inactive", "out_of_stock"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setStatus(item)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  status === item ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="py-3 pr-4">Scooter</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Admin Price</th>
                <th className="py-3 pr-4">Central Stock</th>
                <th className="py-3 pr-4">Dealers</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((scooter) => (
                <tr key={scooter.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-gray-900">{scooter.name}</p>
                    <p className="text-xs text-gray-500">{scooter.brand} - {scooter.range}</p>
                  </td>
                  <td className="py-4 pr-4 text-gray-600">{scooter.category}</td>
                  <td className="py-4 pr-4 font-semibold text-gray-900">Rs {scooter.price.toLocaleString("en-IN")}</td>
                  <td className="py-4 pr-4 text-gray-700">{scooter.stock}</td>
                  <td className="py-4 pr-4 text-gray-700">{scooter.assignedDealers}</td>
                  <td className="py-4 pr-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[scooter.status]}`}>
                      {scooter.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">Edit Catalog</button>
                      <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">Assign Stock</button>
                      <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">Set Price</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
