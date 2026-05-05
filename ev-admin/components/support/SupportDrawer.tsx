"use client";

import { X, Paperclip, Send, User, Package, Clock } from "lucide-react";
import type { Ticket } from "./types";

interface Props {
  ticket: Ticket | null;
  onClose: () => void;
}

export default function SupportDrawer({ ticket, onClose }: Props) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl h-full bg-white shadow-2xl animate-slide-in-right flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-500 to-cyan-500">
          <div className="text-white">
            <h3 className="text-lg font-bold">{ticket.subject}</h3>
            <p className="text-sm text-white/80 mt-0.5">Ticket #{ticket.id}</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Customer & Order Info */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                {ticket.customer.avatar}
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-semibold">Customer</div>
                <div className="text-sm font-bold text-slate-700">{ticket.customer.name}</div>
              </div>
            </div>
            {ticket.orderReference && (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-200 flex items-center justify-center">
                  <Package size={18} className="text-slate-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Order</div>
                  <div className="text-sm font-bold text-slate-700">{ticket.orderReference}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conversation Timeline */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {ticket.customer.avatar}
            </div>
            <div className="flex-1">
              <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <p className="text-sm text-slate-700">Hi, I need help with my recent order. The delivery is delayed.</p>
              </div>
              <div className="text-xs text-slate-400 mt-1.5">2 hours ago</div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <div className="flex-1 flex flex-col items-end">
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
                <p className="text-sm">Thank you for reaching out. Let me check your order status and get back to you shortly.</p>
              </div>
              <div className="text-xs text-slate-400 mt-1.5">1 hour ago</div>
            </div>
            <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-slate-600" />
            </div>
          </div>
        </div>

        {/* Internal Notes */}
        <div className="px-6 py-3 bg-amber-50 border-t border-amber-100">
          <div className="text-xs font-bold text-amber-700 uppercase mb-1">Internal Note</div>
          <p className="text-sm text-amber-600">Customer has premium account. Priority handling required.</p>
        </div>

        {/* Reply Editor */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                placeholder="Type your reply..."
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-all">
                <Paperclip size={18} />
              </button>
              <button className="h-10 w-10 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 flex items-center justify-center text-white transition-all shadow-md">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
