"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-50">
      <Sidebar />
<Header />
      <main className="md:ml-64 mt-16 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
