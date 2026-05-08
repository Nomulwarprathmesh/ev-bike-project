 "use client";

import { OperationsPage } from "@/components/operations/operations-page";
import { mockPricingRequests } from "@/lib/mock-data";

export default function PricingRequestsPage() {
  return (
    <OperationsPage
      title="Pricing Requests"
      description="Vendors cannot edit pricing directly. Submit evidence-backed price requests for admin approval."
      actionLabel="Request Price Change"
      rows={mockPricingRequests}
      columns={[
        { key: "id", label: "Request ID" },
        { key: "productName", label: "Scooter" },
        { key: "currentPrice", label: "Current Price", render: (row) => `Rs ${row.currentPrice.toLocaleString("en-IN")}` },
        { key: "requestedPrice", label: "Requested Price", render: (row) => `Rs ${row.requestedPrice.toLocaleString("en-IN")}` },
        { key: "status", label: "Status" },
        { key: "date", label: "Date" },
      ]}
    />
  );
}
