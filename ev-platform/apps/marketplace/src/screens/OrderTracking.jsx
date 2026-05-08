import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, Truck, CheckCircle, MapPin, Clock, Phone, ChevronRight } from 'lucide-react'
import { Link } from '@/lib/router-compat'
import { scooters, EV_FALLBACK } from '../data/scooters'
import Footer from '../components/common/Footer'

const MOCK_ORDERS = [
  {
    id: 'VLT4F2K9', scooter: scooters[0], date: '2025-06-10', amount: scooters[0].price,
    status: 3,
    address: '47, 5th Block, Koramangala, Bangalore - 560095',
    steps: [
      { label: 'Order Placed', desc: 'Your order has been confirmed', date: '10 Jun, 10:32 AM', done: true },
      { label: 'Processing', desc: 'Scooter being prepared at warehouse', date: '10 Jun, 2:15 PM', done: true },
      { label: 'Shipped', desc: 'Out for delivery from Pune warehouse', date: '12 Jun, 9:00 AM', done: true },
      { label: 'Delivered', desc: 'Delivered to your address', date: '14 Jun, 11:45 AM', done: true },
    ],
  },
  {
    id: 'VLTB3M7X', scooter: scooters[2], date: '2025-06-28', amount: scooters[2].price,
    status: 2,
    address: '12, Versova Road, Andheri West, Mumbai - 400053',
    steps: [
      { label: 'Order Placed', desc: 'Your order has been confirmed', date: '28 Jun, 3:10 PM', done: true },
      { label: 'Processing', desc: 'Scooter being prepared at warehouse', date: '29 Jun, 10:00 AM', done: true },
      { label: 'Shipped', desc: 'Expected delivery in 2–3 days', date: '30 Jun, 8:30 AM', done: false, active: true },
      { label: 'Delivered', desc: 'Estimated: 2 Jul', date: '', done: false },
    ],
  },
  {
    id: 'VLTA1N5P', scooter: scooters[4], date: '2025-07-02', amount: scooters[4].price,
    status: 1,
    address: 'Road No. 36, Jubilee Hills, Hyderabad - 500033',
    steps: [
      { label: 'Order Placed', desc: 'Your order has been confirmed', date: '2 Jul, 9:45 AM', done: true },
      { label: 'Processing', desc: 'Being prepared at warehouse', date: '', done: false, active: true },
      { label: 'Shipped', desc: 'Estimated: 4 Jul', date: '', done: false },
      { label: 'Delivered', desc: 'Estimated: 6 Jul', date: '', done: false },
    ],
  },
]

const STATUS_LABEL = ['', 'Processing', 'In Transit', 'Delivered']
const STATUS_STYLE = {
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'In Transit': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Processing: 'bg-orange-50 text-orange-700 border-orange-200',
}

const OrderTracking = () => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(MOCK_ORDERS[1])

  const handleSearch = () => {
    const found = MOCK_ORDERS.find(o => o.id.toLowerCase() === search.trim().toLowerCase())
    if (found) setSelected(found)
  }

  const statusLabel = STATUS_LABEL[selected.status]

  return (
    <div className="min-h-screen bg-secondary-section">

      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-dot-grid opacity-10" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary text-sm font-bold rounded-full mb-4">
              <Package size={14} /> Order Tracking
            </span>
            <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Track Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Order</span>
            </h1>
            <p className="text-slate-400 mb-6">Enter your order ID to get real-time updates</p>

            <div className="flex gap-2 max-w-md mx-auto">
              <input value={search} onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Enter Order ID (e.g. VLT4F2K9)"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-primary/60 transition-all text-sm" />
              <button onClick={handleSearch}
                className="px-5 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all">
                <Search size={17} />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Try: VLT4F2K9 · VLTB3M7X · VLTA1N5P</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Order List ── */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="font-black text-slate-900 mb-4">Recent Orders</h3>
            {MOCK_ORDERS.map(order => (
              <motion.button key={order.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                onClick={() => setSelected(order)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                  selected.id === order.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-200/70 bg-white hover:border-primary/30'
                }`}>
                <div className="w-14 h-10 rounded-xl overflow-hidden shrink-0 bg-slate-50">
                  <img src={order.scooter.image} alt={order.scooter.name}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = EV_FALLBACK }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{order.scooter.name}</p>
                  <p className="text-xs text-slate-400">#{order.id}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${STATUS_STYLE[STATUS_LABEL[order.status]]}`}>
                  {STATUS_LABEL[order.status]}
                </span>
              </motion.button>
            ))}
          </div>

          {/* ── Tracking Detail ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Order header */}
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-50">
                  <img src={selected.scooter.image} alt={selected.scooter.name}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = EV_FALLBACK }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-slate-400">{selected.scooter.brand}</p>
                      <h3 className="font-black text-slate-900 text-lg leading-tight">{selected.scooter.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Order #{selected.id} · {selected.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${STATUS_STYLE[statusLabel]}`}>
                      {statusLabel}
                    </span>
                  </div>
                  <p className="text-base font-black text-slate-900 mt-2">₹{selected.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
              <h3 className="font-black text-slate-900 mb-6">Tracking Timeline</h3>
              <div className="space-y-0">
                {selected.steps.map((step, i) => {
                  const isLast = i === selected.steps.length - 1
                  return (
                    <div key={step.label} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                            step.done ? 'bg-primary border-primary shadow-sm shadow-primary/30'
                            : step.active ? 'bg-white border-primary'
                            : 'bg-slate-50 border-slate-200'
                          }`}>
                          {step.done
                            ? <CheckCircle size={15} className="text-white" />
                            : step.active
                              ? <motion.div
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="w-3 h-3 bg-primary rounded-full"
                                />
                              : <div className="w-3 h-3 bg-slate-300 rounded-full" />}
                        </motion.div>
                        {!isLast && (
                          <div className={`w-0.5 h-12 mt-1 rounded-full ${step.done ? 'bg-primary' : 'bg-slate-200'}`} />
                        )}
                      </div>

                      <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                        <p className={`font-bold text-sm ${step.done || step.active ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                        <p className={`text-xs mt-0.5 ${step.done || step.active ? 'text-slate-500' : 'text-slate-300'}`}>{step.desc}</p>
                        {step.date && (
                          <p className="text-xs text-primary font-semibold mt-1 flex items-center gap-1">
                            <Clock size={9} /> {step.date}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Delivery info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200/70 shadow-card p-5">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 mb-3">
                  <MapPin size={14} className="text-primary" /> Delivery Address
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">{selected.address}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200/70 shadow-card p-5">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 mb-3">
                  <Truck size={14} className="text-primary" /> Delivery Partner
                </h4>
                <p className="text-sm font-bold text-slate-900">Voltrix Express</p>
                <p className="text-xs text-slate-400 mt-0.5">Tracking ID: VX{selected.id}EX</p>
                <div className="flex items-center gap-2 mt-3">
                  <Phone size={12} className="text-primary" />
                  <span className="text-sm text-slate-600">1800-123-VOLTRIX</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Link to="/account"
                className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-bold rounded-2xl text-center hover:border-primary/40 transition-colors text-sm flex items-center justify-center gap-2">
                View All Orders <ChevronRight size={14} />
              </Link>
              {statusLabel !== 'Delivered' && (
                <button className="flex-1 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all text-sm">
                  Contact Support
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OrderTracking
