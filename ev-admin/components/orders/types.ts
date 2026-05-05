export type OrderStatus = "pending" | "approved" | "delivered" | "disputed" | "refunded" | "cancelled";
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";
export type BookingType = "full_payment" | "emi" | "test_ride";

export interface Order {
  id: string;
  customer: { name: string; uid: string; avatar: string; risk?: boolean };
  vendor: { name: string; city: string; verified: boolean };
  ev: { model: string; brand: string; battery: string; range: string; image: string };
  amount: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  bookingType: BookingType;
  date: string;
  dispute?: { category: string; complaint: string };
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "VTX-10041",
    customer: { name: "Arjun Mehta", uid: "USR-4821", avatar: "AM", risk: false },
    vendor: { name: "Ather Energy Hub", city: "Bengaluru", verified: true },
    ev: { model: "Ather 450X", brand: "Ather", battery: "3.7 kWh", range: "146 km", image: "" },
    amount: 149000,
    paymentStatus: "paid",
    status: "delivered",
    bookingType: "full_payment",
    date: "2025-07-10",
  },
  {
    id: "VTX-10042",
    customer: { name: "Priya Sharma", uid: "USR-3302", avatar: "PS", risk: false },
    vendor: { name: "Ola Electric Showroom", city: "Mumbai", verified: true },
    ev: { model: "Ola S1 Pro", brand: "Ola", battery: "4.0 kWh", range: "181 km", image: "" },
    amount: 134999,
    paymentStatus: "pending",
    status: "pending",
    bookingType: "emi",
    date: "2025-07-11",
  },
  {
    id: "VTX-10043",
    customer: { name: "Rahul Verma", uid: "USR-9910", avatar: "RV", risk: true },
    vendor: { name: "TVS Motors Delhi", city: "Delhi NCR", verified: false },
    ev: { model: "TVS iQube S", brand: "TVS", battery: "5.1 kWh", range: "145 km", image: "" },
    amount: 119900,
    paymentStatus: "paid",
    status: "disputed",
    bookingType: "full_payment",
    date: "2025-07-09",
    dispute: { category: "Non-delivery", complaint: "Vehicle not delivered after 15 days of payment." },
  },
  {
    id: "VTX-10044",
    customer: { name: "Sneha Patil", uid: "USR-7741", avatar: "SP", risk: false },
    vendor: { name: "Bajaj Chetak Zone", city: "Pune", verified: true },
    ev: { model: "Bajaj Chetak", brand: "Bajaj", battery: "3.0 kWh", range: "126 km", image: "" },
    amount: 142000,
    paymentStatus: "paid",
    status: "approved",
    bookingType: "emi",
    date: "2025-07-12",
  },
  {
    id: "VTX-10045",
    customer: { name: "Kiran Nair", uid: "USR-5523", avatar: "KN", risk: false },
    vendor: { name: "Hero Vida Showroom", city: "Chennai", verified: true },
    ev: { model: "Hero Vida V1 Pro", brand: "Hero", battery: "3.94 kWh", range: "165 km", image: "" },
    amount: 145900,
    paymentStatus: "refunded",
    status: "refunded",
    bookingType: "full_payment",
    date: "2025-07-08",
  },
  {
    id: "VTX-10046",
    customer: { name: "Amit Joshi", uid: "USR-2214", avatar: "AJ", risk: false },
    vendor: { name: "Ather Energy Hub", city: "Hyderabad", verified: true },
    ev: { model: "Ather 450S", brand: "Ather", battery: "2.9 kWh", range: "115 km", image: "" },
    amount: 129000,
    paymentStatus: "paid",
    status: "delivered",
    bookingType: "full_payment",
    date: "2025-07-07",
  },
  {
    id: "VTX-10047",
    customer: { name: "Divya Rao", uid: "USR-8834", avatar: "DR", risk: true },
    vendor: { name: "Ola Electric Showroom", city: "Bengaluru", verified: true },
    ev: { model: "Ola S1 Air", brand: "Ola", battery: "2.5 kWh", range: "101 km", image: "" },
    amount: 99999,
    paymentStatus: "failed",
    status: "cancelled",
    bookingType: "emi",
    date: "2025-07-13",
  },
  {
    id: "VTX-10048",
    customer: { name: "Suresh Kumar", uid: "USR-6612", avatar: "SK", risk: false },
    vendor: { name: "TVS Motors Chennai", city: "Chennai", verified: true },
    ev: { model: "TVS iQube ST", brand: "TVS", battery: "5.1 kWh", range: "145 km", image: "" },
    amount: 124900,
    paymentStatus: "pending",
    status: "pending",
    bookingType: "test_ride",
    date: "2025-07-14",
  },
];
