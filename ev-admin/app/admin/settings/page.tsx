"use client";

import SettingsSections from "@/components/settings/SettingsSections";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
          Admin Control / Settings
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure platform settings, payments, and security
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <SettingsSections />
    </div>
  );
}
