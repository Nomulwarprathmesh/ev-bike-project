 "use client";

import { OperationsPage } from "@/components/operations/operations-page";
import { mockStockRequests } from "@/lib/mock-data";

export default function StockRequestsPage() {
  return (
    <OperationsPage
      title="Stock Requests"
      description="Request additional stock from admin and track approved warehouse transfers."
      actionLabel="New Stock Request"
      rows={mockStockRequests}
      columns={[
        { key: "id", label: "Request ID" },
        { key: "productName", label: "Scooter" },
        { key: "currentStock", label: "Current Stock" },
        { key: "requestedQty", label: "Requested Qty" },
        { key: "status", label: "Status" },
        { key: "date", label: "Date" },
      ]}
    />
  );
}
