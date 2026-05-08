 "use client";

import { OperationsPage } from "@/components/operations/operations-page";
import { mockAdminChats } from "@/lib/mock-data";

export default function AdminChatPage() {
  return (
    <OperationsPage
      title="Admin Chat"
      description="Vendor communication is limited to platform admin for approvals, transfers, pricing, and operations support."
      actionLabel="New Admin Message"
      rows={mockAdminChats}
      columns={[
        { key: "id", label: "Thread" },
        { key: "subject", label: "Subject" },
        { key: "lastMessage", label: "Last Message" },
        { key: "unread", label: "Unread" },
        { key: "updatedAt", label: "Updated" },
      ]}
    />
  );
}
