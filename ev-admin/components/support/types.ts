export type TicketStatus = "open" | "in_progress" | "resolved" | "escalated" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory = "technical" | "billing" | "delivery" | "refund" | "general";

export interface Ticket {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  category: TicketCategory;
  priority: TicketPriority;
  assignedAgent: string;
  status: TicketStatus;
  slaTimer: string;
  lastUpdate: string;
  unread: boolean;
  overdue: boolean;
  evReference?: string;
  orderReference?: string;
  subject: string;
}
