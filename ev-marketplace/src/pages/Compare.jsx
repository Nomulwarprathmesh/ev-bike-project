import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitCompare, X, Plus, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/common/Footer'
import { scooters, EV_FALLBACK } from '../data/scooters'

const SPEC_ROWS = [
  { label: 'Price', key: 'price', format: v => `₹${(v / 1000).toFixed(1)}L` },
  { label: 'Range', key: 'range', format: v => `${v} km`, best: 'max' },
  { label: 'Top Speed', key: 'topSpeed', format: v => `${v} kmph`, best: 'max' },
  { label: 'Battery', key: 'battery', format: v => v },
  { label: 'Charging Time', key: 'chargingTime', format: v => `${v} hrs`, best: 'min' },
  { label: 'Rating', key: 'rating', format: v => `${v} ⭐`, best: 'max' },
  { label: 'EMI from', key: 'emi', format: v => `₹${v.toLocaleString()}/mo` },
]

const Compare = () => {
  const [selected, setSelected] = useState(scooters.slice(0, 2))
  const [pickerOpen, setPickerOpen] = useState(false)

  const add = (scooter) => {
    if (selected.length < 4 && !selected.find(s => s.id === scooter.id)) {
      setSelected(prev => [...prev, scooter])
    }
    setPickerOpen(false)
  }

  const remove = (id) => setSelected(prev => prev.filter(s => s.id !== id))

  const getBest = (key, type) => {
    const vals = selected.map(s => s[key]).filter(v => typeof v === 'number')
    return type === 'max' ? Math.max(...vals) : Math.min(...vals)
  }

  const colCount = Math.min(selected.length + (selected.length < 4 ? 1 : 0), 4)

  return (
    <div className="min-h-screen bg-secondary-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <GitCompare className="text-primary" size={28} /> Compare Scooters
            </h1>
            <p className="text-slate-500 mt-1 text-sm">Compare up to 4 scooters side by side</p>
          </div>
          {selected.length > 0 && (
            <button onClick={() => setSelected([])}
              className="text-sm text-red-500 hover:text-red-600 font-semibold transition-colors flex items-center gap-1">
              <X size={14} /> Clear All
            </button>
          )}
        </div>

        {/* Scooter Selector Row — horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-2 mb-8">
          <div className="min-w-max">
            <div className="grid gap-4" style={{ gridTemplateColumns: `180px repeat(${colCount}, minmax(160px, 1fr))` }}>
              <div />
              {selected.map(scooter => (
                <motion.div key={scooter.id}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl border border-slate-200/70 shadow-card overflow-hidden relative"
                >
                  <button onClick={() => remove(scooter.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-slate-100 hover:bg-red-100 hover:text-red-500 rounded-lg flex items-center justify-center transition-colors z-10">
                    <X size={11} />
                  </button>
                  <div className="h-28 overflow-hidden bg-slate-50">
                    <img src={scooter.image} alt={scooter.name} className="w-full h-full object-cover"
                      onError={e => { e.target.src = EV_FALLBACK }} />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-[10px] text-slate-400 font-medium">{scooter.brand}</p>
                    <p className="font-bold text-slate-900 text-sm leading-tight">{scooter.name}</p>
                    <p className="text-primary font-bold text-sm mt-0.5">₹{(scooter.price / 1000).toFixed(1)}L</p>
                  </div>
                </motion.div>
              ))}

              {/* Add slot */}
              {selected.length < 4 && (
                <div className="relative">
                  <button onClick={() => setPickerOpen(!pickerOpen)}
                    className="w-full h-full min-h-[168px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary hover:text-primary transition-all bg-white">
                    <Plus size={22} />
                    <span className="text-sm font-semibold">Add Scooter</span>
                  </button>

                  <AnimatePresence>
                    {pickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-2 left-0 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden"
                      >
                        {scooters.filter(s => !selected.find(sel => sel.id === s.id)).map(s => (
                          <button key={s.id} onClick={() => add(s)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left">
                            <div className="w-10 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-50">
                              <img src={s.image} alt={s.name} className="w-full h-full object-cover"
                                onError={e => { e.target.src = EV_FALLBACK }} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{s.name}</p>
                              <p className="text-xs text-slate-400">{s.brand}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spec Table */}
        {selected.length >= 2 ? (
          <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card overflow-hidden overflow-x-auto">
            <div className="min-w-max">
              {SPEC_ROWS.map((row, i) => {
                const best = row.best ? getBest(row.key, row.best) : null
                return (
                  <div key={row.key}
                    className={`grid items-center ${i % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}`}
                    style={{ gridTemplateColumns: `180px repeat(${selected.length}, minmax(160px, 1fr))` }}
                  >
                    <div className="px-5 py-4 text-sm font-bold text-slate-600">{row.label}</div>
                    {selected.map(scooter => {
                      const val = scooter[row.key]
                      const isBest = best !== null && val === best
                      return (
                        <div key={scooter.id} className={`px-4 py-4 text-center text-sm font-bold ${isBest ? 'text-primary' : 'text-slate-800'}`}>
                          {isBest && <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-1.5 mb-0.5" />}
                          {row.format(val)}
                          {isBest && <span className="ml-1.5 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">Best</span>}
                        </div>
                      )
                    })}
                  </div>
                )
              })}

              {/* Features */}
              {['Smart App', 'GPS Tracking', 'Anti-theft', 'Fast Charge', 'Reverse Mode'].map((feat, i) => (
                <div key={feat}
                  className={`grid items-center ${(SPEC_ROWS.length + i) % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}`}
                  style={{ gridTemplateColumns: `180px repeat(${selected.length}, minmax(160px, 1fr))` }}
                >
                  <div className="px-5 py-4 text-sm font-bold text-slate-600">{feat}</div>
                  {selected.map(scooter => {
                    const has = (scooter.id + i) % 3 !== 0
                    return (
                      <div key={scooter.id} className="px-4 py-4 flex justify-center">
                        {has
                          ? <CheckCircle size={18} className="text-emerald-500" />
                          : <XCircle size={18} className="text-slate-300" />}
                      </div>
                    )
                  })}
                </div>
              ))}

              {/* CTA row */}
              <div className="grid border-t border-slate-100"
                style={{ gridTemplateColumns: `180px repeat(${selected.length}, minmax(160px, 1fr))` }}>
                <div className="px-5 py-5 text-sm font-bold text-slate-600">Action</div>
                {selected.map(scooter => (
                  <div key={scooter.id} className="px-4 py-5 flex justify-center">
                    <Link to={`/scooters/${scooter.id}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-full hover:opacity-90 active:scale-95 transition-all shadow-sm">
                      View <ArrowRight size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/70 shadow-card">
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Add at least 2 scooters to compare</h3>
            <p className="text-slate-500">Click "Add Scooter" above to get started</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Compare
