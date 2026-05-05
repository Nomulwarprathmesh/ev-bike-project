"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Users,
  Zap,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockShowrooms } from "@/lib/mock-data";

export default function ShowroomPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Showroom Management</h1>
            <p className="text-gray-600 mt-1">Manage your physical showrooms and service centers</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <Plus className="w-4 h-4" />
            Add Showroom
          </Button>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockShowrooms.map((showroom, index) => (
            <motion.div
              key={showroom.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {showroom.name}
                    </h3>
                    <Badge className="mt-2 bg-emerald-100 text-emerald-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-xs text-gray-600 mt-1">{showroom.address}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Contact</p>
                    <p className="text-xs text-gray-600 mt-1">{showroom.phone}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Hours</p>
                    <p className="text-xs text-gray-600 mt-1">{showroom.hours}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-lg font-bold text-gray-900">
                        {showroom.staff}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Staff Members</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span className="text-lg font-bold text-gray-900">
                        {showroom.testRides}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Test Rides</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service Centers Info */}
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50">
          <h3 className="font-semibold text-gray-900 mb-4">Service Center Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Services Offered</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Product Sales</li>
                <li>✓ Test Rides</li>
                <li>✓ Maintenance & Repair</li>
                <li>✓ Battery Replacement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Operating Hours</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Monday - Friday: 10 AM - 8 PM</li>
                <li>Saturday: 10 AM - 6 PM</li>
                <li>Sunday: 12 PM - 6 PM</li>
                <li>Holidays: Closed</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
