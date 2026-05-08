"use client";

import type React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type OperationsPageProps<T extends { id: string; status?: string }> = {
  title: string;
  description: string;
  actionLabel?: string;
  rows: T[];
  columns: Column<T>[];
};

const statusClass = (status = "") => {
  if (["approved", "available", "completed", "delivered", "transferred"].includes(status)) {
    return "bg-emerald-100 text-emerald-800";
  }
  if (["pending", "requested", "booked", "packed", "shipped", "in_progress"].includes(status)) {
    return "bg-blue-100 text-blue-800";
  }
  if (["low_stock"].includes(status)) return "bg-orange-100 text-orange-800";
  return "bg-slate-100 text-slate-800";
};

export function OperationsPage<T extends { id: string; status?: string }>({
  title,
  description,
  actionLabel,
  rows,
  columns,
}: OperationsPageProps<T>) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
          {actionLabel && <Button className="self-start md:self-auto">{actionLabel}</Button>}
        </div>

        <Card className="overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th key={String(column.key)} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      {column.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td key={String(column.key)} className="px-6 py-4 text-gray-700">
                        {column.render
                          ? column.render(row)
                          : column.key === "status"
                            ? (
                              <Badge className={statusClass(String(row[column.key]))}>
                                {String(row[column.key]).replace("_", " ")}
                              </Badge>
                            )
                            : String(row[column.key] ?? "")}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm">Open</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
