"use client";

import { Trophy, TrendingUp, MapPin, Calendar } from "lucide-react";

export default function TopSections() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Selling EVs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Trophy size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Top Selling EVs</h3>
            <p className="text-xs text-slate-400">Best performers this month</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { model: "Ather 450X", sales: 234, revenue: "₹3.8L" },
            { model: "Ola S1 Pro", sales: 198, revenue: "₹3.2L" },
            { model: "TVS iQube", sales: 176, revenue: "₹2.9L" },
            { model: "Bajaj Chetak", sales: 145, revenue: "₹2.4L" },
          ].map((ev, i) => (
            <div key={ev.model} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                #{i + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-800">{ev.model}</div>
                <div className="text-xs text-slate-400">{ev.sales} units · {ev.revenue}</div>
              </div>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Top Vendors */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <Trophy size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Top Vendors</h3>
            <p className="text-xs text-slate-400">Highest revenue generators</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { name: "EV Motors Bangalore", orders: 156, revenue: "₹4.2L" },
            { name: "Green Wheels Delhi", orders: 134, revenue: "₹3.7L" },
            { name: "Eco Ride Mumbai", orders: 121, revenue: "₹3.3L" },
            { name: "Future Mobility Pune", orders: 98, revenue: "₹2.8L" },
          ].map((vendor, i) => (
            <div key={vendor.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                #{i + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-800">{vendor.name}</div>
                <div className="text-xs text-slate-400">{vendor.orders} orders · {vendor.revenue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Cities */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <MapPin size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Best Cities</h3>
            <p className="text-xs text-slate-400">Market penetration</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { city: "Bangalore", growth: "+24%", orders: 487 },
            { city: "Delhi", growth: "+18%", orders: 423 },
            { city: "Mumbai", growth: "+15%", orders: 398 },
            { city: "Pune", growth: "+12%", orders: 312 },
          ].map((city) => (
            <div key={city.city} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-violet-500" />
                <div>
                  <div className="text-sm font-bold text-slate-800">{city.city}</div>
                  <div className="text-xs text-slate-400">{city.orders} orders</div>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-600">{city.growth}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Most Booked Test Rides */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Calendar size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Most Booked Test Rides</h3>
            <p className="text-xs text-slate-400">Popular models</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { model: "Ather 450X", bookings: 89, conversion: "38%" },
            { model: "Ola S1 Pro", bookings: 76, conversion: "34%" },
            { model: "TVS iQube", bookings: 64, conversion: "31%" },
            { model: "Bajaj Chetak", bookings: 52, conversion: "29%" },
          ].map((ride) => (
            <div key={ride.model} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all">
              <div>
                <div className="text-sm font-bold text-slate-800">{ride.model}</div>
                <div className="text-xs text-slate-400">{ride.bookings} bookings</div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg">
                {ride.conversion} conv.
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
