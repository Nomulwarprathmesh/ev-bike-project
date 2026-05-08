import type { Refund, VendorPayout, Settlement, Dispute, FailedPayment } from "./types";

export const mockRefunds: Refund[] = [
  { id: "REF-001", orderId: "ORD-4821", customer: "Arjun Mehta", customerEmail: "arjun@email.com", vendor: "Voltrix Delhi", evModel: "Voltrix Z9 Pro", reason: "Defective battery", amount: 89500, paymentMode: "EMI", ageDays: 12, status: "pending", hasEvidence: true, autoEligible: false, vendorDisputed: true },
  { id: "REF-002", orderId: "ORD-4756", customer: "Priya Sharma", customerEmail: "priya@email.com", vendor: "EcoRide Mumbai", evModel: "EcoRide S3", reason: "Wrong model delivered", amount: 62000, paymentMode: "UPI", ageDays: 3, status: "pending", hasEvidence: true, autoEligible: true, vendorDisputed: false },
  { id: "REF-003", orderId: "ORD-4690", customer: "Rahul Nair", customerEmail: "rahul@email.com", vendor: "GreenWheel Blr", evModel: "GreenWheel X1", reason: "Cancelled before delivery", amount: 45000, paymentMode: "Card", ageDays: 1, status: "approved", hasEvidence: false, autoEligible: true, vendorDisputed: false },
  { id: "REF-004", orderId: "ORD-4612", customer: "Sneha Patel", customerEmail: "sneha@email.com", vendor: "Voltrix Delhi", evModel: "Voltrix Z7", reason: "Motor noise issue", amount: 71000, paymentMode: "Net Banking", ageDays: 18, status: "disputed", hasEvidence: true, autoEligible: false, vendorDisputed: true },
  { id: "REF-005", orderId: "ORD-4580", customer: "Karan Singh", customerEmail: "karan@email.com", vendor: "SpeedEV Pune", evModel: "SpeedEV R2", reason: "Charger not included", amount: 38500, paymentMode: "UPI", ageDays: 5, status: "processing", hasEvidence: false, autoEligible: true, vendorDisputed: false },
  { id: "REF-006", orderId: "ORD-4501", customer: "Divya Rao", customerEmail: "divya@email.com", vendor: "EcoRide Mumbai", evModel: "EcoRide S5 Max", reason: "Display malfunction", amount: 95000, paymentMode: "EMI", ageDays: 22, status: "pending", hasEvidence: true, autoEligible: false, vendorDisputed: false },
  { id: "REF-007", orderId: "ORD-4430", customer: "Amit Kumar", customerEmail: "amit@email.com", vendor: "GreenWheel Blr", evModel: "GreenWheel X3", reason: "Duplicate payment", amount: 55000, paymentMode: "Card", ageDays: 2, status: "approved", hasEvidence: false, autoEligible: true, vendorDisputed: false },
];

export const mockPayouts: VendorPayout[] = [
  { id: "PAY-V001", vendor: "Voltrix Delhi", city: "Delhi NCR", ordersDelivered: 48, grossSales: 4280000, commission: 428000, deductions: 12500, netPayout: 3839500, status: "pending", settlementDate: "2025-07-25" },
  { id: "PAY-V002", vendor: "EcoRide Mumbai", city: "Mumbai", ordersDelivered: 35, grossSales: 2940000, commission: 294000, deductions: 8200, netPayout: 2637800, status: "processing", settlementDate: "2025-07-25" },
  { id: "PAY-V003", vendor: "GreenWheel Blr", city: "Bengaluru", ordersDelivered: 62, grossSales: 5180000, commission: 518000, deductions: 15600, netPayout: 4646400, status: "paid", settlementDate: "2025-07-20" },
  { id: "PAY-V004", vendor: "SpeedEV Pune", city: "Pune", ordersDelivered: 21, grossSales: 1620000, commission: 162000, deductions: 4800, netPayout: 1453200, status: "held", settlementDate: "2025-07-28" },
  { id: "PAY-V005", vendor: "ChargePlus Chennai", city: "Chennai", ordersDelivered: 29, grossSales: 2310000, commission: 231000, deductions: 6900, netPayout: 2072100, status: "pending", settlementDate: "2025-07-26" },
];

export const mockSettlements: Settlement[] = [
  { id: "STL-001", date: "2025-07-22", gateway: "Razorpay", grossAmount: 1840000, fees: 18400, netReceived: 1821600, status: "completed", reconciliation: "matched" },
  { id: "STL-002", date: "2025-07-21", gateway: "PayU", grossAmount: 920000, fees: 9200, netReceived: 910800, status: "completed", reconciliation: "matched" },
  { id: "STL-003", date: "2025-07-20", gateway: "Cashfree", grossAmount: 1250000, fees: 12500, netReceived: 1237500, status: "completed", reconciliation: "mismatched" },
  { id: "STL-004", date: "2025-07-23", gateway: "Razorpay", grossAmount: 680000, fees: 6800, netReceived: 673200, status: "pending", reconciliation: "pending" },
  { id: "STL-005", date: "2025-07-19", gateway: "Stripe", grossAmount: 450000, fees: 4500, netReceived: 445500, status: "failed", reconciliation: "mismatched" },
];

export const mockDisputes: Dispute[] = [
  { id: "DIS-001", customer: "Arjun Mehta", vendor: "Voltrix Delhi", orderId: "ORD-4821", issueType: "Product not as described", amount: 89500, hasEvidence: true, riskLevel: "high", ageDays: 12, status: "open" },
  { id: "DIS-002", customer: "Sneha Patel", vendor: "Voltrix Delhi", orderId: "ORD-4612", issueType: "Unauthorized charge", amount: 71000, hasEvidence: true, riskLevel: "fraud", ageDays: 18, status: "escalated" },
  { id: "DIS-003", customer: "Vikram Joshi", vendor: "EcoRide Mumbai", orderId: "ORD-4390", issueType: "Delivery delay", amount: 58000, hasEvidence: false, riskLevel: "low", ageDays: 4, status: "under_review" },
  { id: "DIS-004", customer: "Meera Iyer", vendor: "GreenWheel Blr", orderId: "ORD-4210", issueType: "Defective product", amount: 42000, hasEvidence: true, riskLevel: "medium", ageDays: 7, status: "open" },
  { id: "DIS-005", customer: "Rohit Das", vendor: "SpeedEV Pune", orderId: "ORD-4105", issueType: "Double payment", amount: 38500, hasEvidence: false, riskLevel: "medium", ageDays: 2, status: "resolved" },
];

export const mockFailedPayments: FailedPayment[] = [
  { id: "FP-001", customer: "Nikhil Verma", orderId: "ORD-4900", gateway: "Razorpay", paymentMode: "Card", failureReason: "Insufficient funds", amount: 75000, retryCount: 2, lastAttempt: "2025-07-23 14:32" },
  { id: "FP-002", customer: "Ananya Gupta", orderId: "ORD-4895", gateway: "PayU", paymentMode: "UPI", failureReason: "UPI timeout", amount: 48000, retryCount: 1, lastAttempt: "2025-07-23 11:15" },
  { id: "FP-003", customer: "Suresh Babu", orderId: "ORD-4880", gateway: "Cashfree", paymentMode: "Net Banking", failureReason: "Bank server error", amount: 92000, retryCount: 3, lastAttempt: "2025-07-22 18:45" },
  { id: "FP-004", customer: "Pooja Reddy", orderId: "ORD-4871", gateway: "Razorpay", paymentMode: "EMI", failureReason: "EMI plan rejected", amount: 110000, retryCount: 0, lastAttempt: "2025-07-22 09:20" },
  { id: "FP-005", customer: "Aditya Shah", orderId: "ORD-4860", gateway: "Stripe", paymentMode: "Card", failureReason: "Card declined", amount: 65000, retryCount: 1, lastAttempt: "2025-07-21 16:55" },
];
