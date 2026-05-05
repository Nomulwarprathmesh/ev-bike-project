"use client";

import { useState } from "react";
import {
  Download,
  Plus,
  Users2,
  CheckCircle,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  uid: string;
  joined: string;
  lastActive: string;
  orders: string;
  spend: string;
  status: "active" | "suspended" | "pending" | "flagged";
};
const userData: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "aarav@gmail.com",
    phone: "+1 555-123-4567",
    uid: "uid_12345",
    joined: "2023-01-15",
    lastActive: "2024-06-10",
    orders: "5",
    spend: "$2,500",
    status: "active",
  },
  {
   id: "2",
    name: "John Doe",
    email: "aarav@gmail.com",
    phone: "+1 555-123-4567",
    uid: "uid_12345",
    joined: "2023-01-15",
    lastActive: "2024-06-10",
    orders: "5",
    spend: "$2,500",
    status: "active", 
  },
  {
    id: "3",
    name: "John Doe",
    email: "aarav@gmail.com",
    phone: "+1 555-123-4567",
    uid: "uid_12345",
    joined: "2023-01-15",
    lastActive: "2024-06-10",
    orders: "5",
    spend: "$2,500",
    status: "active",
  }
];


const summaryCards = [
  {
    label: "Total Users",
    value: "1",
    change: "Stable",
    icon: Users2,
    color: "from-emerald-500 to-cyan-500",
  },
  {
    label: "Active Users",
    value: "820K",
    change: "34% MAU",
    icon: CheckCircle,
    color: "from-blue-500 to-indigo-500",
  },
  {
    label: "Buyers",
    value: "12,840",
    change: "0.5% conversion",
    icon: ShoppingBag,
    color: "from-violet-500 to-purple-500",
  },
  {
    label: "Suspended",
    value: "14",
    change: "Fraud / disputes",
    icon: AlertTriangle,
    color: "from-orange-400 to-pink-500",
  },
];

function Page() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const filteredUsers = userData;

  const exportUsers = () => {
    alert("Export started!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage users, buyers, and flagged accounts in your EV marketplace.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportUsers}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition"
          >
            <Download size={16} />
            Export Segment
          </button>

          <button
            onClick={() => setInviteOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition"
          >
            <Plus size={16} />
            Invite Admin
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={20} className="text-white" />
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {card.value}
                </p>
                <p className="text-xs text-gray-400">{card.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {inviteOpen && (
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Invite admin modal later.</p>
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
        {/* Users Table */}
<div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">

  <h2 className="text-base font-semibold text-gray-800">
    Users List
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">

      {/* Table Head */}
      <thead>
        <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
          <th className="text-left py-2 pr-4">User</th>
          <th className="text-left py-2 pr-4">Joined / Active</th>
          <th className="text-left py-2 pr-4">Orders</th>
          <th className="text-left py-2 pr-4">Spend</th>
          <th className="text-left py-2 pr-4">Status</th>
          <th className="text-left py-2">Actions</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {filteredUsers.map((user) => (
          <tr
            key={user.id}
            className={`border-b border-gray-50 hover:bg-gray-50 transition ${
              user.status === "flagged" ? "bg-red-50 border-red-100" : ""
            }`}
          >

            {/* User */}
            <td className="py-3 pr-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-400">UID {user.uid}</p>
                </div>
              </div>
            </td>

            {/* Joined */}
            <td className="py-3 pr-4 text-gray-600 text-xs">
              <p>{user.joined}</p>
              <p className="text-gray-400">{user.lastActive}</p>
            </td>

            {/* Orders */}
            <td className="py-3 pr-4 font-semibold text-gray-700">
              {user.orders}
            </td>

            {/* Spend */}
            <td className="py-3 pr-4 font-semibold text-emerald-600">
              {user.spend}
            </td>

            {/* Status */}
            <td className="py-3 pr-4">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  user.status === "active"
                    ? "bg-emerald-100 text-emerald-600"
                    : user.status === "suspended"
                    ? "bg-red-100 text-red-500"
                    : user.status === "pending"
                    ? "bg-orange-100 text-orange-500"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user.status}
              </span>
            </td>

            {/* Actions */}
            <td className="py-3">
              <div className="flex gap-2">
                
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                  👁
                </button>

                <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                  🚫
                </button>

              </div>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>
      </div>
    </div>
  );
}

export default Page;