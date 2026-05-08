"use client";

import { Star, CheckCircle, Clock, AlertTriangle, Image, MessageSquare, Eye, ThumbsUp, ThumbsDown, Ban, Pin, Flag } from "lucide-react";
import type { Review } from "./types";

interface Props {
  reviews: Review[];
  loading: boolean;
  onView: (r: Review) => void;
}

export default function ReviewsTable({ reviews, loading, onView }: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="h-12 w-12 bg-slate-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-3 bg-slate-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">No Reviews Found</h3>
        <p className="text-sm text-slate-400">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left text-xs font-semibold text-slate-600 px-5 py-3.5">Customer</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-5 py-3.5">EV Model</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-5 py-3.5">Rating</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-5 py-3.5">Review</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-5 py-3.5">Showroom</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-5 py-3.5">Date</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-5 py-3.5">Status</th>
              <th className="text-left text-xs font-semibold text-slate-600 px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-slate-50/50 transition-colors group">
                {/* Customer */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                      {review.customer.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-700">{review.customer.name}</span>
                        {review.customer.verified && (
                          <CheckCircle size={13} className="text-emerald-500" />
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{review.id}</span>
                    </div>
                  </div>
                </td>

                {/* EV Model */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{review.ev.thumbnail}</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-700">{review.ev.model}</div>
                      <div className="text-xs text-slate-400">{review.ev.brand}</div>
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-700">{review.rating}.0</span>
                  </div>
                  {review.sentiment && (
                    <div className="flex items-center gap-1 mt-1">
                      {review.sentiment === "positive" && <ThumbsUp size={11} className="text-emerald-500" />}
                      {review.sentiment === "negative" && <ThumbsDown size={11} className="text-red-500" />}
                      <span className={`text-xs font-medium ${
                        review.sentiment === "positive" ? "text-emerald-600" :
                        review.sentiment === "negative" ? "text-red-600" : "text-slate-500"
                      }`}>
                        {review.sentiment}
                      </span>
                    </div>
                  )}
                </td>

                {/* Review */}
                <td className="px-5 py-4 max-w-xs">
                  <p className="text-sm text-slate-600 line-clamp-2">{review.review}</p>
                  {review.photos && review.photos.length > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-cyan-600 font-medium">
                      <Image size={12} />
                      {review.photos.length} photo{review.photos.length > 1 ? "s" : ""}
                    </div>
                  )}
                </td>

                {/* Showroom */}
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-600">{review.showroom}</span>
                </td>

                {/* Date */}
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-600">{new Date(review.date).toLocaleDateString()}</span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <div className="space-y-1.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      review.status === "approved" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                      review.status === "pending" ? "bg-orange-50 text-orange-600 border border-orange-200" :
                      review.status === "reported" ? "bg-red-50 text-red-600 border border-red-200" :
                      "bg-slate-50 text-slate-600 border border-slate-200"
                    }`}>
                      {review.status === "approved" && <CheckCircle size={11} />}
                      {review.status === "pending" && <Clock size={11} />}
                      {review.status === "reported" && <AlertTriangle size={11} />}
                      {review.status}
                    </span>
                    {review.vendorReply && (
                      <div className="flex items-center gap-1 text-xs text-cyan-600 font-medium">
                        <MessageSquare size={11} />
                        Vendor replied
                      </div>
                    )}
                    {review.reported && (
                      <div className="flex items-center gap-1 text-xs text-red-600 font-semibold animate-pulse">
                        <Flag size={11} />
                        Fraud: {review.fraudScore}%
                      </div>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onView(review)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-cyan-500 hover:text-white transition-all"
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                    {review.status === "pending" && (
                      <>
                        <button
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all"
                          title="Approve"
                        >
                          <CheckCircle size={14} />
                        </button>
                        <button
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all"
                          title="Reject"
                        >
                          <Ban size={14} />
                        </button>
                      </>
                    )}
                    <button
                      className="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all"
                      title="Pin Review"
                    >
                      <Pin size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
