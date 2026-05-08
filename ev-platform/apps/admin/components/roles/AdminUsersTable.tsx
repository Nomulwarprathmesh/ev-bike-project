"use client";

import { Eye, Edit, Trash2, Shield } from "lucide-react";
import type { AdminUser } from "./types";

interface Props {
  users: AdminUser[];
}

export default function AdminUsersTable({ users }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">Admin Users</span>
          <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-500 rounded-full">{users.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">User</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Email</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Last Login</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/80 transition-all">
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {user.avatar}
                    </div>
                    <div className="text-sm font-semibold text-slate-700">{user.name}</div>
                  </div>
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">{user.email}</div>
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-slate-400" />
                    <span className="text-sm font-semibold text-slate-700">{user.role}</span>
                  </div>
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">{user.department}</div>
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="text-xs text-slate-500">{user.lastLogin}</div>
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-lg ${
                    user.status === "active" 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-all">
                      <Eye size={14} />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg text-blue-600 hover:bg-blue-50 transition-all">
                      <Edit size={14} />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-50 transition-all">
                      <Trash2 size={14} />
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
