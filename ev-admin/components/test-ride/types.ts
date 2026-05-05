export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no-show";
export type FollowUpStatus = "not_contacted" | "call_scheduled" | "interested" | "converted" | "not_interested";

export interface TestRideBooking {
  id: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  ev: {
    model: string;
    brand: string;
    thumbnail?: string;
    battery: string;
    range: string;
  };
  showroom: {
    name: string;
    city: string;
    address: string;
  };
  slot: {
    date: string;
    time: string;
  };
  status: BookingStatus;
  assignedStaff?: {
    name: string;
    phone: string;
  };
  followUp: FollowUpStatus;
  notes?: string;
  createdAt: string;
  isToday?: boolean;
}

export const MOCK_BOOKINGS: TestRideBooking[] = [
  {
    id: "TR-2025-001",
    customer: { name: "Rahul Sharma", phone: "+91 98765 43210", email: "rahul@example.com" },
    ev: { model: "Ather 450X", brand: "Ather", battery: "3.7 kWh", range: "105 km" },
    showroom: { name: "Voltrix Hub", city: "Mumbai", address: "Andheri West" },
    slot: { date: "2025-01-15", time: "10:00 AM" },
    status: "pending",
    followUp: "not_contacted",
    createdAt: "2025-01-14T10:30:00Z",
    isToday: true,
  },
  {
    id: "TR-2025-002",
    customer: { name: "Priya Patel", phone: "+91 98765 43211", email: "priya@example.com" },
    ev: { model: "Ola S1 Pro", brand: "Ola Electric", battery: "4 kWh", range: "135 km" },
    showroom: { name: "EV Central", city: "Bangalore", address: "Koramangala" },
    slot: { date: "2025-01-15", time: "02:00 PM" },
    status: "confirmed",
    assignedStaff: { name: "Amit Kumar", phone: "+91 98765 00001" },
    followUp: "call_scheduled",
    createdAt: "2025-01-13T14:20:00Z",
    isToday: true,
  },
  {
    id: "TR-2025-003",
    customer: { name: "Arjun Mehta", phone: "+91 98765 43212", email: "arjun@example.com" },
    ev: { model: "TVS iQube", brand: "TVS", battery: "3.4 kWh", range: "100 km" },
    showroom: { name: "Green Wheels", city: "Delhi", address: "Connaught Place" },
    slot: { date: "2025-01-16", time: "11:00 AM" },
    status: "confirmed",
    assignedStaff: { name: "Sneha Reddy", phone: "+91 98765 00002" },
    followUp: "interested",
    createdAt: "2025-01-12T09:15:00Z",
  },
  {
    id: "TR-2025-004",
    customer: { name: "Kavya Singh", phone: "+91 98765 43213", email: "kavya@example.com" },
    ev: { model: "Bajaj Chetak", brand: "Bajaj", battery: "3 kWh", range: "95 km" },
    showroom: { name: "Voltrix Hub", city: "Mumbai", address: "Andheri West" },
    slot: { date: "2025-01-14", time: "03:00 PM" },
    status: "completed",
    assignedStaff: { name: "Rajesh Verma", phone: "+91 98765 00003" },
    followUp: "converted",
    notes: "Customer placed order after test ride",
    createdAt: "2025-01-10T11:00:00Z",
  },
  {
    id: "TR-2025-005",
    customer: { name: "Neha Gupta", phone: "+91 98765 43214", email: "neha@example.com" },
    ev: { model: "Hero Vida V1", brand: "Hero", battery: "3.9 kWh", range: "110 km" },
    showroom: { name: "EV Central", city: "Bangalore", address: "Koramangala" },
    slot: { date: "2025-01-13", time: "04:00 PM" },
    status: "no-show",
    followUp: "not_contacted",
    createdAt: "2025-01-11T16:45:00Z",
  },
  {
    id: "TR-2025-006",
    customer: { name: "Vikram Joshi", phone: "+91 98765 43215", email: "vikram@example.com" },
    ev: { model: "Simple One", brand: "Simple Energy", battery: "4.8 kWh", range: "203 km" },
    showroom: { name: "Green Wheels", city: "Delhi", address: "Connaught Place" },
    slot: { date: "2025-01-12", time: "01:00 PM" },
    status: "cancelled",
    followUp: "not_interested",
    notes: "Customer cancelled due to budget constraints",
    createdAt: "2025-01-09T13:30:00Z",
  },
];
