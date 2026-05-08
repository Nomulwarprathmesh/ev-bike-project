"use client";

import { Shield, DollarSign, Users, Headphones, Settings, Eye, Edit } from "lucide-react";
import type { Role } from "./types";

const ROLE_ICONS = {
  super_admin: Shield,
  finance_admin: DollarSign,
  vendor_manager: Users,
  support_agent: Headphones,
  operations_manager: Settings,
  moderator: Eye,
};

const ROLE_COLORS = {
  super_admin: "from-red-500 to-pink-500",
  finance_admin: "from-emerald-500 to-green-500",
  vendor_manager: "from-blue-500 to-indigo-500",
  support_agent: "from-violet-500 to-purple-500",
  operations_manager: "from-amber-500 to-orange-500",
  moderator: "from-cyan-500 to-blue-500",
};

interface Props {
  roles: Role[];
  onEdit: (role: Role) => void;
}

export default function RoleCards({ roles, onEdit }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {roles.map((role) => {
        const Icon = ROLE_ICONS[role.type];
        const color = ROLE_COLORS[role.type];
        
        return (
          <div key={role.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-4">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm`}>
                <Icon size={20} className="text-white" />
              </div>
              <button onClick={() => onEdit(role)} className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-all">
                <Edit size={14} />
              </button>
            </div>
            
            <h3 className="text-base font-bold text-slate-800 mb-1">{role.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{role.description}</p>
            
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div>
                <div className="text-xs text-slate-400 uppercase font-semibold">Users</div>
                <div className="text-lg font-bold text-slate-800">{role.userCount}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-semibold">Permissions</div>
                <div className="text-lg font-bold text-slate-800">{role.permissionCount}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
