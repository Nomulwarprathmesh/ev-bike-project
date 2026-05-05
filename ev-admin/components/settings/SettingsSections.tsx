"use client";

import { useState } from "react";
import { Settings, DollarSign, CreditCard, Bell, Shield, Palette, Database, Download, Upload, Save, RotateCcw } from "lucide-react";

export default function SettingsSections() {
  const [hasChanges, setHasChanges] = useState(false);

  return (
    <>
      {/* General Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <Settings size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">General Settings</h3>
            <p className="text-xs text-slate-400">Platform configuration</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 block">Platform Name</label>
            <input type="text" defaultValue="Voltrix Admin" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" onChange={() => setHasChanges(true)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 block">Support Email</label>
            <input type="email" defaultValue="support@voltrix.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" onChange={() => setHasChanges(true)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 block">Contact Number</label>
            <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" onChange={() => setHasChanges(true)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 block">Currency</label>
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" onChange={() => setHasChanges(true)}>
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Marketplace Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
            <DollarSign size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Marketplace Settings</h3>
            <p className="text-xs text-slate-400">Commission and vendor rules</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 block">Commission %</label>
            <input type="number" defaultValue="8" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" onChange={() => setHasChanges(true)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 block">Booking Limit</label>
            <input type="number" defaultValue="5" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" onChange={() => setHasChanges(true)} />
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div>
              <div className="text-sm font-semibold text-slate-800">Vendor Auto-Approval</div>
              <div className="text-xs text-slate-400 mt-0.5">Approve vendors automatically</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" onChange={() => setHasChanges(true)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-cyan-500"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div>
              <div className="text-sm font-semibold text-slate-800">Auto Payout</div>
              <div className="text-xs text-slate-400 mt-0.5">Enable automatic payouts</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" onChange={() => setHasChanges(true)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-cyan-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <CreditCard size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Payment Settings</h3>
            <p className="text-xs text-slate-400">Payment gateway configuration</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 block">Razorpay Key</label>
            <input type="text" placeholder="rzp_live_xxxxx" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" onChange={() => setHasChanges(true)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 block">GST %</label>
            <input type="number" defaultValue="18" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" onChange={() => setHasChanges(true)} />
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div>
              <div className="text-sm font-semibold text-slate-800">EMI Option</div>
              <div className="text-xs text-slate-400 mt-0.5">Enable EMI payments</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" onChange={() => setHasChanges(true)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-cyan-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Bell size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Notifications</h3>
            <p className="text-xs text-slate-400">Alert preferences</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Email Notifications", desc: "Receive email alerts" },
            { label: "SMS Alerts", desc: "Get SMS notifications" },
            { label: "Push Notifications", desc: "Browser push alerts" },
            { label: "Admin Alerts", desc: "Critical system alerts" },
          ].map((notif) => (
            <div key={notif.label} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div>
                <div className="text-sm font-semibold text-slate-800">{notif.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{notif.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" onChange={() => setHasChanges(true)} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-cyan-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Security</h3>
            <p className="text-xs text-slate-400">Access control settings</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 block">Session Timeout (mins)</label>
            <input type="number" defaultValue="30" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" onChange={() => setHasChanges(true)} />
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div>
              <div className="text-sm font-semibold text-slate-800">Two-Factor Auth</div>
              <div className="text-xs text-slate-400 mt-0.5">Enable 2FA for admins</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" onChange={() => setHasChanges(true)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-cyan-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Backup & Export */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Database size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Backup & Export</h3>
            <p className="text-xs text-slate-400">Data management</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all">
            <Download size={18} className="text-emerald-600" />
            <div className="text-left">
              <div className="text-sm font-bold text-slate-800">Backup DB</div>
              <div className="text-xs text-slate-400">Download backup</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all">
            <Upload size={18} className="text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-bold text-slate-800">Restore</div>
              <div className="text-xs text-slate-400">Upload backup</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all">
            <Download size={18} className="text-violet-600" />
            <div className="text-left">
              <div className="text-sm font-bold text-slate-800">Export Data</div>
              <div className="text-xs text-slate-400">CSV/JSON export</div>
            </div>
          </button>
        </div>
      </div>

      {/* Sticky Save Bar */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 flex items-center gap-4 animate-slide-up z-50">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700">You have unsaved changes</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setHasChanges(false)} className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all">
              <RotateCcw size={14} />
              Reset
            </button>
            <button onClick={() => setHasChanges(false)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-sm hover:opacity-90 transition-all">
              <Save size={14} />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
