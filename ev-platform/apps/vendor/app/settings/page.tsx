"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Bell,
  CheckCircle,
  Save,
  LockIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockVendor } from "@/lib/mock-data";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your vendor account and preferences</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 shadow-lg">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="kyc" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">KYC</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Logo Card - Locked */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <LockIcon className="w-5 h-5 text-gray-600" />
                    Vendor Logo
                  </h3>
                  <Badge className="bg-gray-600">Managed by Admin</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your logo is managed by the platform admin. You cannot change it directly.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border-2 border-gray-200 shadow-md">
                    <img
                      src={mockVendor.logo}
                      alt="Logo"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900">Current Logo</p>
                    <p className="mt-1">To change your logo, contact platform support.</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Business Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Business Details
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <Input
                        defaultValue={mockVendor.name}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Owner Name
                      </label>
                      <Input
                        placeholder="Enter owner name"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        defaultValue={mockVendor.email}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number
                      </label>
                      <Input
                        defaultValue={mockVendor.phone}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address
                    </label>
                    <Textarea
                      placeholder="Enter your business address..."
                      rows={3}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number
                      </label>
                      <Input
                        placeholder="Enter GST number"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Joined Date
                      </label>
                      <Input
                        type="date"
                        defaultValue={mockVendor.joinedDate}
                        disabled
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-xl shadow-lg">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </Card>
            </motion.div>
          </TabsContent>

          {/* KYC Tab */}
          <TabsContent value="kyc" className="space-y-6">
            {/* KYC Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-900">
                        KYC Status
                      </h3>
                      <p className="text-sm text-emerald-800 mt-1">
                        Your account is verified
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-600">Verified</Badge>
                </div>
              </Card>
            </motion.div>

            {/* KYC Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  KYC Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Registration Number
                    </label>
                    <Input
                      placeholder="Enter registration number"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number
                      </label>
                      <Input
                        placeholder="Enter GST number"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PAN Number
                      </label>
                      <Input
                        placeholder="Enter PAN number"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address
                    </label>
                    <Textarea
                      placeholder="Enter your business address..."
                      rows={3}
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Account Details
                    </label>
                    <Input
                      placeholder="Account number"
                      className="rounded-xl mb-2"
                    />
                    <Input placeholder="IFSC code" className="rounded-xl" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Showroom Details
                    </label>
                    <Textarea
                      placeholder="Enter your showroom address and details..."
                      rows={3}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-xl shadow-lg">
                  <Save className="w-4 h-4" />
                  Update Information
                </Button>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Change Password
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-xl shadow-lg">
                  <Lock className="w-4 h-4" />
                  Update Password
                </Button>

                {/* Two-Factor Authentication */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" className="rounded-xl">
                    Enable 2FA
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  {[
                    { label: "Order Notifications", desc: "Get notified for new orders" },
                    { label: "Stock Alerts", desc: "Low stock and inventory alerts" },
                    { label: "Approval Updates", desc: "Product approval status updates" },
                    { label: "Payment Updates", desc: "Payment and settlement updates" },
                    { label: "Marketing Emails", desc: "Promotional and marketing emails" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded"
                      />
                    </div>
                  ))}
                </div>

                <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-xl shadow-lg">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
