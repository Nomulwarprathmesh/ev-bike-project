 "use client";

import { OperationsPage } from "@/components/operations/operations-page";
import { mockSpareParts } from "@/lib/mock-data";

export default function SparePartsPage() {
  return (
    <OperationsPage
      title="Spare Parts"
      description="Monitor service parts availability and request replenishment before repair queues slow down."
      actionLabel="Request Spare Parts"
      rows={mockSpareParts}
      columns={[
        { key: "id", label: "Part ID" },
        { key: "name", label: "Part" },
        { key: "stock", label: "Stock" },
        { key: "price", label: "Admin Price", render: (row) => `Rs ${row.price.toLocaleString("en-IN")}` },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
