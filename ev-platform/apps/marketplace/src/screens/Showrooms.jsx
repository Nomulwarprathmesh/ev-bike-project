import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Phone, Mail, Clock, Star, CalendarCheck, Navigation, X } from 'lucide-react'
import { Link } from '@/lib/router-compat'
import { showrooms, cities } from '../data/showrooms'
import Footer from '../components/common/Footer'

const Showrooms = () => {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selected, setSelected] = useState(null)
  const [bookingId, setBookingId] = useState(null)

  const filtered = useMemo(() => {
    let list = showrooms
    if (selectedCity !== 'All Cities') list = list.filter(s => s.city === selectedCity)
    if (search) list = list.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.area.toLowerCase().includes(search.toLowerCase())
    )
    return list
  }, [search, selectedCity])

  const handleBook = (showroom) => {
    setBookingId('BK' + Math.random().toString(36).slice(2, 7).toUpperCase())
    setSelected(showroom)
  }

  return (
    <div className="min-h-screen bg-secondary-section">

      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-dot-grid opacity-10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary text-sm font-bold rounded-full mb-4">
              <MapPin size={14} /> 500+ Showrooms Across India
            </span>
            <h1 className="text-3xl lg:text-5xl font-black text-white mb-3">
              Find a Showroom <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Near You</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8">Visit, test ride, and experience your dream EV in person</p>

            <div className="max-w-xl mx-auto relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by city, area or showroom name..."
                className="w-full pl-10 pr-10 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-primary/60 focus:bg-white/15 transition-all" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* City Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {cities.map(city => (
            <button key={city} onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                selectedCity === city ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
              }`}>
              {city}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Showroom Cards ── */}
          <div className="lg:col-span-2">
            <p className="text-sm text-slate-500 mb-4">
              <span className="font-bold text-slate-900">{filtered.length}</span> showrooms found
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/70 shadow-card">
                <div className="text-5xl mb-3">📍</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No showrooms found</h3>
                <p className="text-slate-500">Try a different city or search term</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {filtered.map((showroom, i) => (
                    <motion.div key={showroom.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ delay: i * 0.04 }}
                      className={`bg-white rounded-2xl border shadow-card hover:shadow-card-hover transition-all p-5 cursor-pointer ${
                        selected?.id === showroom.id ? 'border-primary ring-2 ring-primary/15' : 'border-slate-200/70'
                      }`}
                      onClick={() => setSelected(selected?.id === showroom.id ? null : showroom)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`px-2.5 py-0.5 ${showroom.tagColor} text-white text-xs font-bold rounded-full`}>{showroom.tag}</span>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Star size={10} className="fill-amber-400 text-amber-400" />
                              <span className="font-bold text-slate-700">{showroom.rating}</span>
                              <span>({showroom.reviews})</span>
                            </div>
                          </div>
                          <h3 className="font-black text-slate-900 text-base">{showroom.name}</h3>
                          <div className="flex items-start gap-1.5 text-sm text-slate-500 mt-1">
                            <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
                            <span className="leading-snug">{showroom.address}</span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={e => { e.stopPropagation(); handleBook(showroom) }}
                          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-full shadow-sm hover:opacity-90 active:scale-95 transition-all"
                        >
                          <CalendarCheck size={13} /> Book Visit
                        </motion.button>
                      </div>

                      <AnimatePresence>
                        {selected?.id === showroom.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-slate-100 grid sm:grid-cols-3 gap-4">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone size={13} className="text-primary shrink-0" />
                                <span>{showroom.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Mail size={13} className="text-primary shrink-0" />
                                <span className="truncate">{showroom.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Clock size={13} className="text-primary shrink-0" />
                                <span>{showroom.timing} · {showroom.days}</span>
                              </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="text-xs text-slate-500 font-semibold">Available brands:</span>
                              {showroom.brands.map(b => (
                                <span key={b} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-xl">{b}</span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* ── Map + Booking Panel ── */}
          <div className="space-y-5">

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-card overflow-hidden">
              <div className="relative h-64 bg-secondary-section">
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: 'radial-gradient(circle, #12C48B 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                {filtered.map(s => (
                  <motion.div key={s.id}
                    className="absolute cursor-pointer"
                    style={{ left: `${((s.lng - 68) / (98 - 68)) * 100}%`, top: `${((s.lat - 8) / (38 - 8)) * 100}%` }}
                    whileHover={{ scale: 1.4 }}
                    onClick={() => setSelected(s)}
                  >
                    <div className={`w-4 h-4 ${selected?.id === s.id ? 'bg-secondary scale-125' : 'bg-primary'} rounded-full border-2 border-white shadow-md transition-all`} />
                  </motion.div>
                ))}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-xs text-slate-500 font-semibold shadow">
                  🗺 India Map
                </div>
              </div>
              <div className="p-3 text-center text-xs text-slate-400">Click a dot to highlight showroom</div>
            </div>

            {/* Booking confirmation */}
            <AnimatePresence>
              {bookingId && selected && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                      <CalendarCheck size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Visit Booked! 🎉</p>
                      <p className="text-xs text-slate-500">ID: {bookingId}</p>
                    </div>
                    <button onClick={() => setBookingId(null)} className="ml-auto text-slate-400 hover:text-slate-600">
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{selected.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{selected.area}, {selected.city}</p>
                  <p className="text-xs text-slate-500 mt-1">⏰ {selected.timing}</p>
                  <Link to="/test-ride"
                    className="mt-3 w-full py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all">
                    <CalendarCheck size={13} /> Book Test Ride Too
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-card p-5">
              <h3 className="font-black text-slate-900 mb-4">Our Network</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '500+', label: 'Showrooms' },
                  { val: '28', label: 'States' },
                  { val: '150+', label: 'Cities' },
                  { val: '50k+', label: 'Test Rides' },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center p-3 bg-slate-50 rounded-2xl">
                    <div className="text-xl font-black text-primary">{val}</div>
                    <div className="text-xs text-slate-500 mt-0.5 font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Get directions */}
            {selected && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-2xl border border-slate-200/70 shadow-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Navigation size={17} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-900 truncate">{selected.name}</p>
                  <p className="text-xs text-slate-400">{selected.area}, {selected.city}</p>
                </div>
                <a href={`https://maps.google.com/?q=${selected.lat},${selected.lng}`} target="_blank" rel="noreferrer"
                  className="px-3 py-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shrink-0">
                  Directions
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Showrooms
