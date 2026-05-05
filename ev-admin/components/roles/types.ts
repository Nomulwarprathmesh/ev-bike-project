export type RoleType = "super_admin" | "finance_admin" | "vendor_manager" | "support_agent" | "operations_manager" | "moderator";

export interface Role {
  id: string;
  name: string;
  type: RoleType;
  userCount: number;
  permissionCount: number;
  description: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  lastLogin: string;
  status: "active" | "inactive";
  avatar: string;
}

export interface Permission {
  module: string;
  view: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
  export: boolean;
}
