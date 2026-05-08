 "use client";

import { OperationsPage } from "@/components/operations/operations-page";
import { mockRepairs } from "@/lib/mock-data";

export default function RepairsPage() {
  return (
    <OperationsPage
      title="Repair Jobs"
      description="Track repair intake, estimates, technician progress, and customer handover."
      actionLabel="Create Repair Job"
      rows={mockRepairs}
      columns={[
        { key: "id", label: "Repair ID" },
        { key: "customerName", label: "Customer" },
        { key: "vehicle", label: "Scooter" },
        { key: "issue", label: "Issue" },
        { key: "estimate", label: "Estimate", render: (row) => `Rs ${row.estimate.toLocaleString("en-IN")}` },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
