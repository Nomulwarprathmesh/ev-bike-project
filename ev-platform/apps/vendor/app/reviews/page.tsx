"use client";

import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Filter, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockReviews } from "@/lib/mock-data";
import { useState } from "react";

export default function ReviewsPage() {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const filteredReviews = ratingFilter
    ? mockReviews.filter((r) => r.rating === ratingFilter)
    : mockReviews;

  const avgRating =
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
          <p className="text-gray-600 mt-1">Manage customer reviews and feedback</p>
        </div>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(avgRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {avgRating.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Average Rating</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 text-center">
              <p className="text-3xl font-bold text-emerald-600">
                {mockReviews.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Reviews</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {mockReviews.filter((r) => r.verified).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Verified Reviews</p>
            </Card>
          </motion.div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Rating
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setRatingFilter(null)}>
                All Ratings
              </DropdownMenuItem>
              {[5, 4, 3, 2, 1].map((rating) => (
                <DropdownMenuItem
                  key={rating}
                  onClick={() => setRatingFilter(rating)}
                >
                  {rating} Star{rating !== 1 ? "s" : ""}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {review.customerName}
                      </h3>
                      {review.verified && (
                        <Badge className="bg-emerald-100 text-emerald-800">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{review.productName}</p>
                  </div>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium text-gray-900">
                    {review.rating}.0
                  </span>
                </div>

                {/* Comment */}
                <p className="text-gray-600 mb-4">{review.comment}</p>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-emerald-600 hover:text-emerald-700"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Helpful
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-gray-600 hover:text-gray-700"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-red-600 hover:text-red-700"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    Report
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-600">No reviews found</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
