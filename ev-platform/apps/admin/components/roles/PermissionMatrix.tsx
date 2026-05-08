"use client";

import { Check, X } from "lucide-react";

const modules = [
  "Dashboard",
  "Orders",
  "Payments",
  "Vendors",
  "Support",
  "Reports",
  "Settings",
  "Reviews",
  "Test Rides",
];

const permissions = ["View", "Edit", "Delete", "Approve", "Export"];

export default function PermissionMatrix() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-800">Permission Matrix</h3>
        <p className="text-xs text-slate-400 mt-0.5">Configure role-based access control</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest sticky left-0 bg-slate-50/80">Module</th>
              {permissions.map((perm) => (
                <th key={perm} className="px-5 py-3.5 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  {perm}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {modules.map((module, idx) => (
              <tr key={module} className="hover:bg-slate-50/80 transition-all">
                <td className="px-5 py-4 text-sm font-semibold text-slate-700 sticky left-0 bg-white">
                  {module}
                </td>
                {permissions.map((perm, permIdx) => {
                  const hasPermission = Math.random() > 0.3;
                  return (
                    <td key={perm} className="px-5 py-4 text-center">
                      <label className="inline-flex items-center justify-center cursor-pointer">
                        <input type="checkbox" defaultChecked={hasPermission} className="sr-only peer" />
                        <div className="h-6 w-6 rounded-lg border-2 border-slate-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 flex items-center justify-center transition-all">
                          <Check size={14} className="text-white opacity-0 peer-checked:opacity-100" />
                        </div>
                      </label>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
