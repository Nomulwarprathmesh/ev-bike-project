"use client";

import { X, Star, CheckCircle, MapPin, Calendar, ShoppingBag, MessageSquare, AlertTriangle, ThumbsUp, Ban, Flag, Edit3, Image as ImageIcon } from "lucide-react";
import type { Review } from "./types";
import { useEffect } from "react";

interface Props {
  review: Review | null;
  onClose: () => void;
}

export default function ReviewDrawer({ review, onClose }: Props) {
  useEffect(() => {
    if (review) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [review]);

  if (!review) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-5 flex items-center justify-between border-b border-slate-700 z-10">
          <div>
            <h2 className="text-lg font-bold text-white">Review Details</h2>
            <p className="text-sm text-slate-400">{review.id}</p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                {review.customer.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-800">{review.customer.name}</h3>
                  {review.customer.verified && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                      <CheckCircle size={11} />
                      Verified Buyer
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  {review.orderId && (
                    <span className="flex items-center gap-1">
                      <ShoppingBag size={13} />
                      {review.orderId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* EV Details */}
          <div className="bg-gradient-to-br from-slate-50 to-cyan-50/30 rounded-2xl p-5 border border-slate-100">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{review.ev.thumbnail}</span>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-slate-800">{review.ev.model}</h4>
                <p className="text-sm text-slate-500">{review.ev.brand}</p>
                <div className="flex items-center gap-1.5 mt-2 text-sm text-slate-600">
                  <MapPin size={13} />
                  {review.showroom}
                </div>
              </div>
            </div>
          </div>

          {/* Rating & Sentiment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <div className="text-xs font-semibold text-amber-600 mb-2">Rating</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-slate-800">{review.rating}.0</span>
              </div>
            </div>
            {review.sentiment && (
              <div className={`rounded-2xl p-5 border ${
                review.sentiment === "positive" ? "bg-emerald-50 border-emerald-100" :
                review.sentiment === "negative" ? "bg-red-50 border-red-100" :
                "bg-slate-50 border-slate-100"
              }`}>
                <div className={`text-xs font-semibold mb-2 ${
                  review.sentiment === "positive" ? "text-emerald-600" :
                  review.sentiment === "negative" ? "text-red-600" :
                  "text-slate-600"
                }`}>
                  Sentiment
                </div>
                <div className="flex items-center gap-2">
                  {review.sentiment === "positive" && <ThumbsUp size={20} className="text-emerald-500" />}
                  {review.sentiment === "negative" && <AlertTriangle size={20} className="text-red-500" />}
                  <span className="text-lg font-bold text-slate-800 capitalize">{review.sentiment}</span>
                </div>
              </div>
            )}
          </div>

          {/* Review Text */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Review</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{review.review}</p>
          </div>

          {/* Photos */}
          {review.photos && review.photos.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon size={16} className="text-slate-600" />
                <h4 className="text-sm font-semibold text-slate-700">Photos ({review.photos.length})</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {review.photos.map((photo, i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:scale-105 transition-transform cursor-pointer">
                    <ImageIcon size={24} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vendor Reply */}
          {review.vendorReply && (
            <div className="bg-cyan-50 rounded-2xl p-5 border border-cyan-100">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={16} className="text-cyan-600" />
                <h4 className="text-sm font-semibold text-cyan-700">Vendor Response</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">{review.vendorReply.text}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{review.vendorReply.vendor}</span>
                <span>{new Date(review.vendorReply.date).toLocaleDateString()}</span>
              </div>
            </div>
          )}

          {/* Fraud Warning */}
          {review.reported && review.fraudScore && (
            <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
              <div className="flex items-center gap-2 mb-3">
                <Flag size={16} className="text-red-600" />
                <h4 className="text-sm font-semibold text-red-700">Fraud Detection Alert</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Fraud Score</span>
                  <span className="text-lg font-bold text-red-600">{review.fraudScore}%</span>
                </div>
                <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all"
                    style={{ width: `${review.fraudScore}%` }}
                  />
                </div>
                <p className="text-xs text-red-600 font-medium">⚠️ This review has been flagged for suspicious activity</p>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Status</h4>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
              review.status === "approved" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
              review.status === "pending" ? "bg-orange-50 text-orange-600 border border-orange-200" :
              review.status === "reported" ? "bg-red-50 text-red-600 border border-red-200" :
              "bg-slate-50 text-slate-600 border border-slate-200"
            }`}>
              {review.status === "approved" && <CheckCircle size={16} />}
              {review.status === "pending" && <AlertTriangle size={16} />}
              {review.status === "reported" && <Flag size={16} />}
              {review.status.toUpperCase()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200">
            {review.status === "pending" && (
              <>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 transition-all">
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 hover:scale-[1.02] active:scale-95 transition-all">
                  <Ban size={16} />
                  Reject
                </button>
              </>
            )}
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 hover:scale-[1.02] active:scale-95 transition-all">
              <Edit3 size={16} />
              Reply as Admin
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-100 text-orange-700 rounded-xl font-semibold hover:bg-orange-200 hover:scale-[1.02] active:scale-95 transition-all">
              <Flag size={16} />
              Report Issue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
