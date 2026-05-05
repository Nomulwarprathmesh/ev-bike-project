export type RefundStatus = "pending" | "approved" | "rejected" | "processing" | "disputed";
export type PayoutStatus = "pending" | "processing" | "paid" | "held" | "failed";
export type DisputeStatus = "open" | "under_review" | "resolved" | "escalated";
export type RiskLevel = "low" | "medium" | "high" | "fraud";
export type PaymentMode = "UPI" | "Card" | "EMI" | "Net Banking" | "Wallet";
export type TabKey = "refunds" | "payouts" | "settlements" | "disputes" | "failed";

export interface Refund {
  id: string;
  orderId: string;
  customer: string;
  customerEmail: string;
  vendor: string;
  evModel: string;
  reason: string;
  amount: number;
  paymentMode: PaymentMode;
  ageDays: number;
  status: RefundStatus;
  hasEvidence: boolean;
  autoEligible: boolean;
  vendorDisputed: boolean;
}

export interface VendorPayout {
  id: string;
  vendor: string;
  city: string;
  ordersDelivered: number;
  grossSales: number;
  commission: number;
  deductions: number;
  netPayout: number;
  status: PayoutStatus;
  settlementDate: string;
}

export interface Settlement {
  id: string;
  date: string;
  gateway: string;
  grossAmount: number;
  fees: number;
  netReceived: number;
  status: "completed" | "pending" | "failed";
  reconciliation: "matched" | "mismatched" | "pending";
}

export interface Dispute {
  id: string;
  customer: string;
  vendor: string;
  orderId: string;
  issueType: string;
  amount: number;
  hasEvidence: boolean;
  riskLevel: RiskLevel;
  ageDays: number;
  status: DisputeStatus;
}

export interface FailedPayment {
  id: string;
  customer: string;
  orderId: string;
  gateway: string;
  paymentMode: PaymentMode;
  failureReason: string;
  amount: number;
  retryCount: number;
  lastAttempt: string;
}
