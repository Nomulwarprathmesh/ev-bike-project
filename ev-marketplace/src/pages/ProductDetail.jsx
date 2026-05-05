import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, Heart, Zap, Gauge, Battery, Clock,
  ShoppingCart, CalendarCheck, ChevronRight, ChevronLeft,
  Shield, Truck, RotateCcw, CheckCircle, Share2
} from 'lucide-react'
import Footer from '../components/common/Footer'
import { scooters, EV_FALLBACK } from '../data/scooters'

const TABS = ['Overview', 'Specifications', 'EMI & Finance', 'Reviews']

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const scooter = scooters.find(s => s.id === Number(id))

  const [activeTab, setActiveTab] = useState('Overview')
  const [selectedColor, setSelectedColor] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [loanAmount, setLoanAmount] = useState(scooter?.price ?? 100000)
  const [tenure, setTenure] = useState(36)
  const [rate] = useState(9.5)

  if (!scooter) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
      <div className="text-5xl">🔍</div>
      <h2 className="text-2xl font-bold text-slate-800">Scooter not found</h2>
      <button onClick={() => navigate('/scooters')}
        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all">
        Back to Listing
      </button>
    </div>
  )

  const images = [scooter.image, scooter.image, scooter.image]
  const emi = Math.round((loanAmount * (rate / 1200) * Math.pow(1 + rate / 1200, tenure)) / (Math.pow(1 + rate / 1200, tenure) - 1))
  const discount = Math.round(((scooter.originalPrice - scooter.price) / scooter.originalPrice) * 100)

  const specs = [
    { label: 'Range', value: `${scooter.range} km`, icon: Zap, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Top Speed', value: `${scooter.topSpeed} kmph`, icon: Gauge, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Battery', value: scooter.battery, icon: Battery, color: 'text-violet-600 bg-violet-50' },
    { label: 'Charging', value: `${scooter.chargingTime} hrs`, icon: Clock, color: 'text-orange-600 bg-orange-50' },
  ]

  return (
    <div className="min-h-screen bg-primary-section">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={13} />
          <Link to="/scooters" className="hover:text-primary transition-colors">Scooters</Link>
          <ChevronRight size={13} />
          <span className="text-slate-900 font-medium truncate">{scooter.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-10 mb-12">

          {/* ── LEFT: Image Gallery ── */}
          <div>
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-card border border-slate-200/70 aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={images[imgIndex]}
                  alt={scooter.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onError={e => { e.target.src = EV_FALLBACK }}
                />
              </AnimatePresence>

              {/* Nav arrows */}
              <button onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur rounded-xl shadow-md flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeft size={17} aria-hidden="true" />
              </button>
              <button onClick={() => setImgIndex(i => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur rounded-xl shadow-md flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRight size={17} aria-hidden="true" />
              </button>

              {/* Tag */}
              <div className={`absolute top-4 left-4 px-3 py-1 ${scooter.tagColor} text-white text-xs font-bold rounded-full shadow-lg`}>
                {scooter.tag}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button onClick={() => setWishlisted(!wishlisted)}
                  className="w-9 h-9 bg-white/90 backdrop-blur rounded-xl shadow-md flex items-center justify-center hover:bg-white transition-colors">
                  <Heart size={16} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'} />
                </button>
                <button className="w-9 h-9 bg-white/90 backdrop-blur rounded-xl shadow-md flex items-center justify-center hover:bg-white transition-colors">
                  <Share2 size={16} className="text-slate-400" />
                </button>
              </div>

              {/* Discount */}
              <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur text-white text-xs font-bold rounded-xl">
                {discount}% OFF
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-3">
              {images.map((img, i) => (
                <button key={i} onClick={() => setImgIndex(i)}
                  className={`w-20 h-16 rounded-2xl overflow-hidden border-2 transition-all ${imgIndex === i ? 'border-primary shadow-md' : 'border-slate-200 hover:border-primary/40'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover"
                    onError={e => { e.target.src = EV_FALLBACK }} />
                </button>
              ))}
            </div>

            {/* Color Selector */}
            <div className="mt-4 bg-white rounded-2xl p-4 border border-slate-200/70 shadow-card">
              <p className="text-sm font-semibold text-slate-700 mb-3">Color Options</p>
              <div className="flex gap-3">
                {scooter.colors.map((color, i) => (
                  <motion.button key={i} onClick={() => setSelectedColor(i)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === i ? 'border-primary scale-110 shadow-md ring-2 ring-primary/20' : 'border-slate-200'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Info + Price Card ── */}
          <div className="flex flex-col gap-5">

            {/* Title */}
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">{scooter.brand}</p>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mt-1 leading-tight">{scooter.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(scooter.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-700">{scooter.rating}</span>
                <span className="text-sm text-slate-400">({scooter.reviews.toLocaleString()} reviews)</span>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-4 gap-3">
              {specs.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl p-3 text-center border border-slate-200/70 shadow-card">
                  <div className={`w-8 h-8 ${color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <Icon size={14} />
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">{value}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Price Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-card">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-3xl font-black text-slate-900">₹{scooter.price.toLocaleString()}</span>
                <span className="text-lg text-slate-400 line-through mb-0.5">₹{scooter.originalPrice.toLocaleString()}</span>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg mb-0.5">{discount}% OFF</span>
              </div>
              <p className="text-sm text-slate-500 mb-5">
                EMI from <span className="font-semibold text-primary">₹{scooter.emi.toLocaleString()}/month</span> · Ex-showroom price
              </p>

              <div className="flex flex-col gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-base rounded-2xl shadow-btn hover:shadow-btn-hover hover:opacity-95 flex items-center justify-center gap-2 transition-all duration-200">
                  <Zap size={18} /> Buy Now
                </motion.button>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="py-3 border-2 border-primary/30 text-primary font-semibold rounded-2xl hover:bg-primary/5 hover:border-primary flex items-center justify-center gap-2 transition-all duration-200 text-sm">
                    <ShoppingCart size={16} /> Add to Cart
                  </motion.button>
                  <Link to="/test-ride"
                    className="py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-2xl hover:border-primary/40 hover:text-primary flex items-center justify-center gap-2 transition-all duration-200 text-sm">
                    <CalendarCheck size={16} /> Test Ride
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: '5 Year Warranty' },
                { icon: Truck, label: 'Free Delivery' },
                { icon: RotateCcw, label: '7 Day Return' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl p-3 border border-slate-200/70 text-center shadow-card">
                  <Icon size={17} className="text-primary" />
                  <span className="text-xs text-slate-600 font-medium leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card overflow-hidden">
          <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab ? 'text-primary' : 'text-slate-500 hover:text-slate-800'
                }`}>
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {activeTab === 'Overview' && (
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    The <strong>{scooter.name}</strong> by {scooter.brand} is one of India's most popular electric scooters, offering an impressive {scooter.range}km range on a single charge. Designed for urban commuters, it combines performance, style, and sustainability.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {['Smart connectivity & app integration', 'Regenerative braking system', 'Multiple riding modes', 'Anti-theft alarm system', 'LED lighting all around', 'Digital instrument cluster'].map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle size={14} className="text-primary shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Specifications' && (
                <div className="grid sm:grid-cols-2 gap-0">
                  {[
                    ['Range', `${scooter.range} km`],
                    ['Top Speed', `${scooter.topSpeed} kmph`],
                    ['Battery Capacity', scooter.battery],
                    ['Charging Time', `${scooter.chargingTime} hours`],
                    ['Motor Type', 'BLDC Hub Motor'],
                    ['Brakes', 'Disc + CBS'],
                    ['Suspension', 'Telescopic + Mono'],
                    ['Kerb Weight', '110 kg'],
                    ['Boot Space', '30 litres'],
                    ['Warranty', '3 years / 40,000 km'],
                  ].map(([key, val], i) => (
                    <div key={key} className={`flex justify-between py-3 px-4 ${i % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'} rounded-xl`}>
                      <span className="text-sm text-slate-500">{key}</span>
                      <span className="text-sm font-semibold text-slate-900">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'EMI & Finance' && (
                <div className="max-w-lg">
                  <h3 className="font-bold text-slate-900 mb-5">EMI Calculator</h3>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600 font-medium">Loan Amount</span>
                        <span className="font-bold text-slate-900">₹{loanAmount.toLocaleString()}</span>
                      </div>
                      <input type="range" min={20000} max={scooter.price} step={5000} value={loanAmount}
                        onChange={e => setLoanAmount(+e.target.value)} className="w-full" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600 font-medium">Tenure</span>
                        <span className="font-bold text-slate-900">{tenure} months</span>
                      </div>
                      <input type="range" min={12} max={60} step={6} value={tenure}
                        onChange={e => setTenure(+e.target.value)} className="w-full" />
                    </div>
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-5 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Monthly EMI</p>
                        <p className="text-3xl font-black text-primary">₹{emi.toLocaleString()}</p>
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <p>Rate: {rate}% p.a.</p>
                        <p>Tenure: {tenure} mo</p>
                      </div>
                    </div>
                    <Link to="/finance"
                      className="block text-center py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all">
                      Apply for Loan
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-6 pb-5 border-b border-slate-100">
                    <div className="text-center">
                      <div className="text-5xl font-black text-slate-900">{scooter.rating}</div>
                      <div className="flex gap-0.5 justify-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={13} className={i < Math.floor(scooter.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'} />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{scooter.reviews.toLocaleString()} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map(star => {
                        const pct = star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 3 : 2
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-3">{star}</span>
                            <Star size={9} className="fill-amber-400 text-amber-400" />
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-amber-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.6, delay: (5 - star) * 0.08 }}
                              />
                            </div>
                            <span className="w-6 text-right">{pct}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {[
                    { name: 'Rohit K.', rating: 5, text: 'Excellent range and build quality. Best EV I have owned!', date: '2 weeks ago' },
                    { name: 'Sneha P.', rating: 4, text: 'Great for daily commute. App connectivity is a bonus.', date: '1 month ago' },
                    { name: 'Vikram S.', rating: 5, text: 'Smooth ride, fast charging. Totally worth the price.', date: '1 month ago' },
                  ].map((r, i) => (
                    <div key={i} className="py-4 border-b border-slate-50 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {r.name[0]}
                          </div>
                          <span className="font-semibold text-sm text-slate-900">{r.name}</span>
                        </div>
                        <span className="text-xs text-slate-400">{r.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-1.5 ml-10">
                        {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={11} className="fill-amber-400 text-amber-400" />)}
                      </div>
                      <p className="text-sm text-slate-600 ml-10">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Scooters */}
        <div className="mt-12 bg-secondary-section rounded-3xl p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {scooters.filter(s => s.id !== scooter.id).slice(0, 3).map(s => (
              <Link key={s.id} to={`/scooters/${s.id}`}>
                <motion.div whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-slate-200/70 shadow-card hover:shadow-card-hover transition-all overflow-hidden flex gap-4 p-4 items-center">
                  <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-50">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover"
                      onError={e => { e.target.src = EV_FALLBACK }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">{s.brand}</p>
                    <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                    <p className="text-primary font-bold text-sm mt-0.5">₹{(s.price / 1000).toFixed(1)}L</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetail
