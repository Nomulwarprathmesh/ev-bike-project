import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, GitCompare, Zap, Gauge, Battery, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EV_FALLBACK } from '../../data/scooters'

const ScooterCard = ({ scooter, onWishlist, onCompare }) => {
  const [wishlisted, setWishlisted] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleWishlist = (e) => {
    e.preventDefault()
    setWishlisted(!wishlisted)
    onWishlist?.(scooter)
  }

  const discount = Math.round(((scooter.originalPrice - scooter.price) / scooter.originalPrice) * 100)

  return (
    <motion.div
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image area — fixed height for consistency */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/20 to-cyan-50/20 shrink-0">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />

        <img
          src={imgError ? EV_FALLBACK : scooter.image}
          alt={scooter.name}
          onError={() => setImgError(true)}
          className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20" />

        {/* Tag */}
        <div className={`absolute top-3 left-3 z-30 px-2.5 py-1 ${scooter.tagColor} text-white text-[11px] font-bold rounded-full shadow-lg`}>
          {scooter.tag}
        </div>

        {/* Wishlist */}
        <motion.button
          onClick={handleWishlist}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 z-30 w-8 h-8 glass rounded-xl shadow-md flex items-center justify-center"
        >
          <Heart size={14} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-500'} />
        </motion.button>

        {/* Discount badge */}
        <div className="absolute bottom-3 right-3 z-30 px-2 py-0.5 bg-black/60 backdrop-blur text-white text-[11px] font-bold rounded-lg">
          {discount}% OFF
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Brand + Name + Rating */}
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-0.5">{scooter.brand}</p>
          <h3 className="text-base font-bold text-slate-900 leading-tight">{scooter.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10} className={i < Math.floor(scooter.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'} />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-700">{scooter.rating}</span>
            <span className="text-xs text-slate-400">({scooter.reviews.toLocaleString()})</span>
          </div>
        </div>

        {/* Spec chips */}
        <div className="flex gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 rounded-xl">
            <Zap size={10} className="text-primary" aria-hidden="true" />
            <span className="text-[11px] font-bold text-emerald-700">{scooter.range}km</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-cyan-50 rounded-xl">
            <Gauge size={10} className="text-secondary" aria-hidden="true" />
            <span className="text-[11px] font-bold text-cyan-700">{scooter.topSpeed}kmph</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-violet-50 rounded-xl">
            <Battery size={10} className="text-violet-500" aria-hidden="true" />
            <span className="text-[11px] font-bold text-violet-700">{scooter.battery}</span>
          </div>
        </div>

        {/* Price + Colors */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">₹{(scooter.price / 1000).toFixed(1)}L</span>
              <span className="text-sm text-slate-400 line-through">₹{(scooter.originalPrice / 1000).toFixed(1)}L</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              EMI <span className="font-semibold text-primary">₹{scooter.emi.toLocaleString()}/mo</span>
            </p>
          </div>
          <div className="flex gap-1.5">
            {scooter.colors.slice(0, 3).map((c, i) => (
              <div key={i} className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Link
            to={`/scooters/${scooter.id}`}
            className="flex-1 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-2xl text-center hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            View Details <ArrowRight size={13} />
          </Link>
          <motion.button
            onClick={() => onCompare?.(scooter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 border-2 border-slate-100 rounded-2xl hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-slate-400 transition-all duration-200"
            title="Compare"
          >
            <GitCompare size={15} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ScooterCard
