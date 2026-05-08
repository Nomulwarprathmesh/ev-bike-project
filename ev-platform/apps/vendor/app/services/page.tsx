 "use client";

import { OperationsPage } from "@/components/operations/operations-page";
import { mockServices } from "@/lib/mock-data";

export default function ServicesPage() {
  return (
    <OperationsPage
      title="Service Bookings"
      description="Manage booked customer services and update service progress for admin analytics."
      actionLabel="Add Service Slot"
      rows={mockServices}
      columns={[
        { key: "id", label: "Service ID" },
        { key: "customerName", label: "Customer" },
        { key: "vehicle", label: "Scooter" },
        { key: "type", label: "Service Type" },
        { key: "slot", label: "Slot" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
