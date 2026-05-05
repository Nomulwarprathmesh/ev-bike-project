import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ShoppingBag, Heart, Settings, LogOut, Edit2, CheckCircle, Camera, Bell, Shield, CreditCard, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { scooters, EV_FALLBACK } from '../data/scooters'
import Footer from '../components/common/Footer'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const MOCK_ORDERS = [
  { id: 'VLT4F2K9', scooter: scooters[0], date: '2025-06-10', status: 'Delivered', amount: scooters[0].price },
  { id: 'VLTB3M7X', scooter: scooters[2], date: '2025-06-28', status: 'In Transit', amount: scooters[2].price },
  { id: 'VLTA1N5P', scooter: scooters[4], date: '2025-07-02', status: 'Processing', amount: scooters[4].price },
]

const STATUS_STYLE = {
  Delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'In Transit': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
  Processing: 'bg-orange-50 text-orange-700 border border-orange-200',
  Cancelled: 'bg-red-50 text-red-600 border border-red-200',
}

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>
    <input {...props} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-60 disabled:cursor-not-allowed" />
  </div>
)

const Account = () => {
  const [tab, setTab] = useState('profile')
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ name: 'Rahul Sharma', email: 'rahul@email.com', phone: '9876543210', city: 'Bangalore' })
  const [notifications, setNotifications] = useState({ orders: true, offers: true, testRide: false, newsletter: true })

  const handleSave = () => { setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <div className="min-h-screen bg-primary-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-6">

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6 sticky top-24">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto shadow-lg shadow-primary/20">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow hover:bg-slate-50 transition-colors">
                    <Camera size={12} className="text-slate-500" />
                  </button>
                </div>
                <h2 className="font-black text-slate-900 mt-3 text-base">{profile.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{profile.email}</p>
              </div>

              {/* Nav */}
              <nav className="space-y-1">
                {TABS.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      tab === t.id ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'
                    }`}>
                    <t.icon size={15} /> {t.label}
                    {tab === t.id && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all mt-2">
                  <LogOut size={15} /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* ── Main Panel ── */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">

              {/* PROFILE */}
              {tab === 'profile' && (
                <motion.div key="profile"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-black text-slate-900">My Profile</h2>
                      <button onClick={() => editing ? handleSave() : setEditing(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          editing ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}>
                        {editing ? <><CheckCircle size={13} /> Save</> : <><Edit2 size={13} /> Edit</>}
                      </button>
                    </div>

                    <AnimatePresence>
                      {saved && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl text-sm font-semibold">
                          <CheckCircle size={14} /> Profile updated successfully!
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Full Name', key: 'name', placeholder: 'Your name' },
                        { label: 'Phone Number', key: 'phone', placeholder: '9876543210' },
                        { label: 'Email Address', key: 'email', placeholder: 'email@example.com' },
                        { label: 'City', key: 'city', placeholder: 'Your city' },
                      ].map(f => (
                        <InputField key={f.key} label={f.label} value={profile[f.key]} placeholder={f.placeholder}
                          disabled={!editing}
                          onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))} />
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                      {[
                        { label: 'Orders', val: MOCK_ORDERS.length },
                        { label: 'Wishlist', val: 4 },
                        { label: 'Test Rides', val: 2 },
                      ].map(({ label, val }) => (
                        <div key={label} className="text-center p-4 bg-slate-50 rounded-2xl">
                          <div className="text-2xl font-black text-primary">{val}</div>
                          <div className="text-xs text-slate-500 mt-0.5 font-medium">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ORDERS */}
              {tab === 'orders' && (
                <motion.div key="orders"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
                    <h2 className="text-xl font-black text-slate-900 mb-6">My Orders</h2>
                    <div className="space-y-4">
                      {MOCK_ORDERS.map(order => (
                        <div key={order.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50/50 transition-all">
                          <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-50">
                            <img src={order.scooter.image} alt={order.scooter.name}
                              className="w-full h-full object-cover"
                              onError={e => { e.target.src = EV_FALLBACK }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 text-sm">{order.scooter.name}</p>
                            <p className="text-xs text-slate-400">{order.scooter.brand} · #{order.id}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{order.date}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-black text-slate-900 text-sm">₹{order.amount.toLocaleString()}</p>
                            <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_STYLE[order.status]}`}>
                              {order.status}
                            </span>
                          </div>
                          <Link to="/order-tracking"
                            className="shrink-0 px-3 py-2 border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all">
                            Track
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* WISHLIST */}
              {tab === 'wishlist' && (
                <motion.div key="wishlist"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
                    <h2 className="text-xl font-black text-slate-900 mb-6">Saved Scooters</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {scooters.slice(0, 4).map(s => (
                        <div key={s.id} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50/50 transition-all">
                          <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-50">
                            <img src={s.image} alt={s.name} className="w-full h-full object-cover"
                              onError={e => { e.target.src = EV_FALLBACK }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 text-sm truncate">{s.name}</p>
                            <p className="text-xs text-primary font-black">₹{(s.price / 1000).toFixed(1)}L</p>
                          </div>
                          <Link to={`/scooters/${s.id}`}
                            className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all shrink-0">
                            View
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SETTINGS */}
              {tab === 'settings' && (
                <motion.div key="settings"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Notifications */}
                  <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-5">
                      <Bell size={17} className="text-primary" /> Notifications
                    </h2>
                    <div className="space-y-4">
                      {[
                        { key: 'orders', label: 'Order Updates', desc: 'Shipping and delivery notifications' },
                        { key: 'offers', label: 'Offers & Deals', desc: 'Exclusive discounts and promotions' },
                        { key: 'testRide', label: 'Test Ride Reminders', desc: 'Upcoming test ride alerts' },
                        { key: 'newsletter', label: 'Newsletter', desc: 'Weekly EV news and updates' },
                      ].map(item => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{item.label}</p>
                            <p className="text-xs text-slate-400">{item.desc}</p>
                          </div>
                          <button onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))}
                            className={`w-11 h-6 rounded-full transition-all duration-300 relative shrink-0 ${notifications[item.key] ? 'bg-primary' : 'bg-slate-200'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-sm ${notifications[item.key] ? 'left-6' : 'left-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security */}
                  <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-5">
                      <Shield size={17} className="text-primary" /> Security
                    </h2>
                    <div className="space-y-2">
                      {['Change Password', 'Two-Factor Authentication', 'Active Sessions'].map(item => (
                        <button key={item} className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50/50 transition-all text-sm font-semibold text-slate-700">
                          {item} <ChevronRight size={15} className="text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-5">
                      <CreditCard size={17} className="text-primary" /> Saved Payments
                    </h2>
                    <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100">
                      <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-black">VISA</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">•••• •••• •••• 4242</p>
                        <p className="text-xs text-slate-400">Expires 12/27</p>
                      </div>
                      <button className="ml-auto text-xs text-red-500 hover:text-red-600 font-semibold transition-colors">Remove</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
