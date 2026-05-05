"use client";

import { useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import RoleCards from "@/components/roles/RoleCards";
import AdminUsersTable from "@/components/roles/AdminUsersTable";
import PermissionMatrix from "@/components/roles/PermissionMatrix";
import type { Role, AdminUser } from "@/components/roles/types";

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    type: "super_admin",
    userCount: 3,
    permissionCount: 45,
    description: "Full system access and control",
  },
  {
    id: "2",
    name: "Finance Admin",
    type: "finance_admin",
    userCount: 5,
    permissionCount: 28,
    description: "Manage payments and settlements",
  },
  {
    id: "3",
    name: "Vendor Manager",
    type: "vendor_manager",
    userCount: 8,
    permissionCount: 22,
    description: "Oversee vendor operations",
  },
  {
    id: "4",
    name: "Support Agent",
    type: "support_agent",
    userCount: 12,
    permissionCount: 15,
    description: "Handle customer support tickets",
  },
  {
    id: "5",
    name: "Operations Manager",
    type: "operations_manager",
    userCount: 6,
    permissionCount: 32,
    description: "Manage daily operations",
  },
  {
    id: "6",
    name: "Moderator",
    type: "moderator",
    userCount: 4,
    permissionCount: 18,
    description: "Review content and moderate",
  },
];

const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@voltrix.com",
    role: "Super Admin",
    department: "Management",
    lastLogin: "2 mins ago",
    status: "active",
    avatar: "RK",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@voltrix.com",
    role: "Finance Admin",
    department: "Finance",
    lastLogin: "1 hour ago",
    status: "active",
    avatar: "PS",
  },
  {
    id: "3",
    name: "Amit Singh",
    email: "amit@voltrix.com",
    role: "Vendor Manager",
    department: "Operations",
    lastLogin: "3 hours ago",
    status: "active",
    avatar: "AS",
  },
  {
    id: "4",
    name: "Kavya Nair",
    email: "kavya@voltrix.com",
    role: "Support Agent",
    department: "Support",
    lastLogin: "5 mins ago",
    status: "active",
    avatar: "KN",
  },
  {
    id: "5",
    name: "Rahul Verma",
    email: "rahul@voltrix.com",
    role: "Operations Manager",
    department: "Operations",
    lastLogin: "2 days ago",
    status: "inactive",
    avatar: "RV",
  },
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
          Admin Control / Roles & Permissions
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Roles & Permissions</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage admin roles and access control
            </p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition-all">
            <Plus size={16} />
            Create Role
          </button>
        </div>
      </div>

      {/* Security Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-bold text-amber-800">Security Alert</div>
          <div className="text-xs text-amber-600 mt-1">
            2 admins have not logged in for over 30 days. Consider reviewing their access.
          </div>
        </div>
      </div>

      {/* Role Cards */}
      <RoleCards roles={mockRoles} onEdit={setSelectedRole} />

      {/* Admin Users Table */}
      <AdminUsersTable users={mockUsers} />

      {/* Permission Matrix */}
      <PermissionMatrix />

      {/* Activity Log */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="mb-5">
          <h3 className="text-base font-bold text-slate-800">Recent Activity</h3>
          <p className="text-xs text-slate-400 mt-0.5">Permission changes and role assignments</p>
        </div>
        <div className="space-y-3">
          {[
            { action: "Role assigned", user: "Priya Sharma", detail: "Finance Admin role", time: "2 hours ago" },
            { action: "Permission updated", user: "Amit Singh", detail: "Export permission granted", time: "5 hours ago" },
            { action: "Role created", user: "Rajesh Kumar", detail: "New Moderator role", time: "1 day ago" },
            { action: "User deactivated", user: "System", detail: "Inactive user removed", time: "2 days ago" },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <div className="text-sm font-semibold text-slate-800">{log.action}</div>
                  <div className="text-xs text-slate-400">{log.user} · {log.detail}</div>
                </div>
              </div>
              <div className="text-xs text-slate-400">{log.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
