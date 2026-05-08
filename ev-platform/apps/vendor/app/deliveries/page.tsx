 "use client";

import { OperationsPage } from "@/components/operations/operations-page";
import { mockDeliveries } from "@/lib/mock-data";

export default function DeliveriesPage() {
  return (
    <OperationsPage
      title="Delivery Processing"
      description="Prepare confirmed customer orders for packing, shipping, delivery confirmation, and handover."
      rows={mockDeliveries}
      columns={[
        { key: "id", label: "Delivery ID" },
        { key: "orderId", label: "Order" },
        { key: "customerName", label: "Customer" },
        { key: "vehicle", label: "Scooter" },
        { key: "eta", label: "ETA" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
