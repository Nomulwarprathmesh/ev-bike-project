import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../hooks/useWishlist'
import Footer from '../components/common/Footer'
import { EV_FALLBACK } from '../data/scooters'

const Wishlist = () => {
  const { wishlist, remove, clear } = useWishlist()

  return (
    <div className="min-h-screen bg-primary-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Heart className="text-red-500 fill-red-500" size={28} /> Wishlist
            </h1>
            <p className="text-slate-500 mt-1 text-sm">{wishlist.length} saved scooter{wishlist.length !== 1 ? 's' : ''}</p>
          </div>
          {wishlist.length > 0 && (
            <button onClick={clear}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-semibold transition-colors">
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-28 bg-white rounded-3xl border border-slate-200/70 shadow-card">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 mb-8">Save scooters you love and come back to them anytime</p>
            <Link to="/scooters"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-btn hover:shadow-btn-hover hover:opacity-95 active:scale-95 transition-all duration-200">
              Explore Scooters <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
              {wishlist.map(scooter => {
                const discount = Math.round(((scooter.originalPrice - scooter.price) / scooter.originalPrice) * 100)
                return (
                  <motion.div key={scooter.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.2 } }}
                    className="bg-white rounded-3xl border border-slate-200/70 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden bg-slate-50">
                      <img src={scooter.image} alt={scooter.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.src = EV_FALLBACK }} />
                      <div className={`absolute top-3 left-3 px-2.5 py-1 ${scooter.tagColor} text-white text-[11px] font-bold rounded-full shadow-lg`}>
                        {scooter.tag}
                      </div>
                      <button onClick={() => remove(scooter.id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center shadow hover:bg-red-50 hover:text-red-500 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">{scooter.brand}</p>
                      <h3 className="font-bold text-slate-900 text-base mb-1 leading-tight">{scooter.name}</h3>
                      <div className="flex gap-3 text-xs text-slate-500 mb-3">
                        <span>⚡ {scooter.range}km</span>
                        <span>🏎 {scooter.topSpeed}kmph</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-black text-slate-900">₹{(scooter.price / 1000).toFixed(1)}L</span>
                        <span className="text-xs text-slate-400 line-through">₹{(scooter.originalPrice / 1000).toFixed(1)}L</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg">{discount}% off</span>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/scooters/${scooter.id}`}
                          className="flex-1 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl text-center hover:opacity-90 active:scale-95 transition-all">
                          View Details
                        </Link>
                        <button className="p-2.5 border-2 border-slate-200 rounded-xl hover:border-primary hover:text-primary transition-all">
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Wishlist
