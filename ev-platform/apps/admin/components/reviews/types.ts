export type ReviewStatus = "approved" | "pending" | "rejected" | "reported";
export type RatingFilter = "all" | "5" | "4" | "3" | "2" | "1" | "pending" | "reported";

export interface Review {
  id: string;
  customer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  ev: {
    model: string;
    brand: string;
    thumbnail: string;
  };
  rating: number;
  review: string;
  showroom: string;
  date: string;
  status: ReviewStatus;
  vendorReply?: {
    text: string;
    date: string;
    vendor: string;
  };
  photos?: string[];
  sentiment?: "positive" | "neutral" | "negative";
  reported?: boolean;
  fraudScore?: number;
  orderId?: string;
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: "REV-2025-001",
    customer: { name: "Rajesh Kumar", avatar: "RK", verified: true },
    ev: { model: "Ola S1 Pro", brand: "Ola Electric", thumbnail: "🛵" },
    rating: 5,
    review: "Excellent EV bike! Amazing range and smooth ride. The acceleration is impressive and charging is super fast. Highly recommend for daily commute.",
    showroom: "Mumbai Central",
    date: "2025-01-15",
    status: "approved",
    sentiment: "positive",
    vendorReply: {
      text: "Thank you for your wonderful feedback! We're thrilled you're enjoying your Ola S1 Pro.",
      date: "2025-01-16",
      vendor: "Ola Electric Mumbai"
    },
    photos: ["photo1.jpg", "photo2.jpg"],
    orderId: "ORD-2024-1234"
  },
  {
    id: "REV-2025-002",
    customer: { name: "Priya Sharma", avatar: "PS", verified: true },
    ev: { model: "Ather 450X", brand: "Ather Energy", thumbnail: "🛵" },
    rating: 4,
    review: "Great performance and build quality. Battery life is good but could be better. Overall satisfied with the purchase.",
    showroom: "Bangalore HSR",
    date: "2025-01-14",
    status: "approved",
    sentiment: "positive",
    orderId: "ORD-2024-1235"
  },
  {
    id: "REV-2025-003",
    customer: { name: "Amit Patel", avatar: "AP", verified: false },
    ev: { model: "TVS iQube", brand: "TVS", thumbnail: "🛵" },
    rating: 2,
    review: "Disappointed with the range. Not as advertised. Service center is also far from my location.",
    showroom: "Ahmedabad West",
    date: "2025-01-13",
    status: "approved",
    sentiment: "negative",
    vendorReply: {
      text: "We apologize for your experience. Our team will contact you to address your concerns.",
      date: "2025-01-14",
      vendor: "TVS Ahmedabad"
    },
    orderId: "ORD-2024-1236"
  },
  {
    id: "REV-2025-004",
    customer: { name: "Sneha Reddy", avatar: "SR", verified: true },
    ev: { model: "Revolt RV400", brand: "Revolt Motors", thumbnail: "🛵" },
    rating: 5,
    review: "Love the sound system and AI features! Best decision ever. The bike looks stunning and performs exceptionally well.",
    showroom: "Hyderabad Banjara",
    date: "2025-01-12",
    status: "approved",
    sentiment: "positive",
    photos: ["photo3.jpg"],
    orderId: "ORD-2024-1237"
  },
  {
    id: "REV-2025-005",
    customer: { name: "Vikram Singh", avatar: "VS", verified: true },
    ev: { model: "Bajaj Chetak", brand: "Bajaj", thumbnail: "🛵" },
    rating: 3,
    review: "Average performance. Good for city rides but lacks power on highways. Build quality is decent.",
    showroom: "Delhi Connaught",
    date: "2025-01-11",
    status: "pending",
    sentiment: "neutral",
    orderId: "ORD-2024-1238"
  },
  {
    id: "REV-2025-006",
    customer: { name: "Anonymous User", avatar: "AU", verified: false },
    ev: { model: "Ola S1 Pro", brand: "Ola Electric", thumbnail: "🛵" },
    rating: 1,
    review: "Worst purchase ever! Fake product. Don't buy from this seller. Complete scam and fraud.",
    showroom: "Mumbai Central",
    date: "2025-01-10",
    status: "reported",
    sentiment: "negative",
    reported: true,
    fraudScore: 85
  },
  {
    id: "REV-2025-007",
    customer: { name: "Kavita Joshi", avatar: "KJ", verified: true },
    ev: { model: "Hero Electric Optima", brand: "Hero Electric", thumbnail: "🛵" },
    rating: 4,
    review: "Good value for money. Battery backup is impressive. Comfortable for long rides.",
    showroom: "Pune Kothrud",
    date: "2025-01-09",
    status: "approved",
    sentiment: "positive",
    orderId: "ORD-2024-1239"
  },
  {
    id: "REV-2025-008",
    customer: { name: "Rahul Verma", avatar: "RV", verified: true },
    ev: { model: "Simple One", brand: "Simple Energy", thumbnail: "🛵" },
    rating: 5,
    review: "Outstanding! The dashboard is futuristic and the ride quality is superb. Worth every penny.",
    showroom: "Bangalore Whitefield",
    date: "2025-01-08",
    status: "pending",
    sentiment: "positive",
    photos: ["photo4.jpg", "photo5.jpg"],
    orderId: "ORD-2024-1240"
  }
];
