import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, Grid3X3, List, X, ChevronDown, ArrowRight } from 'lucide-react'
import { Link } from '@/lib/router-compat'
import ScooterCard from '../components/scooter/ScooterCard'
import Footer from '../components/common/Footer'
import { scooters, EV_FALLBACK } from '../data/scooters'

const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popular' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Range: High to Low', value: 'range' },
  { label: 'Top Rated', value: 'rating' },
]

const approvedScooters = scooters.filter(s => (s.status ?? 'approved') === 'approved')
const BRANDS = [...new Set(approvedScooters.map(s => s.brand))]
const CATEGORIES = ['all', 'premium', 'mid']

const Listing = () => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('popular')
  const [view, setView] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ brand: [], category: 'all', maxPrice: 200000, minRange: 0 })
  const [sortOpen, setSortOpen] = useState(false)

  const toggleBrand = (brand) =>
    setFilters(f => ({
      ...f,
      brand: f.brand.includes(brand) ? f.brand.filter(b => b !== brand) : [...f.brand, brand],
    }))

  const filtered = useMemo(() => {
    let list = [...approvedScooters]
    if (search) list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.brand.toLowerCase().includes(search.toLowerCase()))
    if (filters.brand.length) list = list.filter(s => filters.brand.includes(s.brand))
    if (filters.category !== 'all') list = list.filter(s => s.category === filters.category)
    list = list.filter(s => s.price <= filters.maxPrice && s.range >= filters.minRange)
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'range') list.sort((a, b) => b.range - a.range)
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [search, filters, sort])

  const activeFilterCount = filters.brand.length + (filters.category !== 'all' ? 1 : 0) + (filters.maxPrice < 200000 ? 1 : 0) + (filters.minRange > 0 ? 1 : 0)
  const clearFilters = () => setFilters({ brand: [], category: 'all', maxPrice: 200000, minRange: 0 })

  return (
    <div className="min-h-screen bg-primary-section">

      {/* Sticky toolbar */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search scooters, brands..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all ${
                  showFilters ? 'bg-primary text-white border-primary shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:border-primary/50'
                }`}
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeFilterCount > 0 && (
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${showFilters ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 hover:border-primary/50 transition-all"
                >
                  <span className="hidden sm:inline">{SORT_OPTIONS.find(o => o.value === sort)?.label}</span>
                  <span className="sm:hidden">Sort</span>
                  <ChevronDown size={13} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden"
                    >
                      {SORT_OPTIONS.map(o => (
                        <button key={o.value} onClick={() => { setSort(o.value); setSortOpen(false) }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${sort === o.value ? 'text-primary font-semibold bg-primary/5' : 'text-slate-700'}`}>
                          {o.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View toggle */}
              <div className="flex border border-slate-200 rounded-2xl overflow-hidden">
                <button onClick={() => setView('grid')} className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-primary text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                  <Grid3X3 size={14} />
                </button>
                <button onClick={() => setView('list')} className={`p-2.5 transition-colors ${view === 'list' ? 'bg-primary text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-slate-100 mt-3.5">
                  {/* Brand */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Brand</p>
                    <div className="flex flex-wrap gap-1.5">
                      {BRANDS.map(b => (
                        <button key={b} onClick={() => toggleBrand(b)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            filters.brand.includes(b) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
                          }`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Category</p>
                    <div className="flex gap-1.5">
                      {CATEGORIES.map(c => (
                        <button key={c} onClick={() => setFilters(f => ({ ...f, category: c }))}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border capitalize transition-all ${
                            filters.category === c ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
                          }`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Max Price */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">
                      Max Price: <span className="text-primary">₹{(filters.maxPrice / 1000).toFixed(0)}k</span>
                    </p>
                    <input type="range" min={80000} max={200000} step={5000} value={filters.maxPrice}
                      onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
                      className="w-full" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>₹80k</span><span>₹2L</span></div>
                  </div>

                  {/* Min Range */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">
                      Min Range: <span className="text-primary">{filters.minRange}km</span>
                    </p>
                    <input type="range" min={0} max={200} step={10} value={filters.minRange}
                      onChange={e => setFilters(f => ({ ...f, minRange: +e.target.value }))}
                      className="w-full" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0km</span><span>200km</span></div>
                    {activeFilterCount > 0 && (
                      <button onClick={clearFilters} className="mt-2 text-xs text-red-500 hover:text-red-600 font-semibold transition-colors">
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            <span className="font-bold text-slate-900">{filtered.length}</span> admin-approved scooters found
          </p>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600 font-semibold flex items-center gap-1">
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24 bg-white rounded-3xl border border-slate-200/70">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No scooters found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters or search term</p>
            <button onClick={() => { setSearch(''); clearFilters() }}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
              Reset All
            </button>
          </motion.div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((scooter, i) => (
              <motion.div key={scooter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <ScooterCard scooter={scooter} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((scooter, i) => (
              <motion.div key={scooter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-slate-200/70 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 p-4 flex gap-5 items-center"
              >
                <div className="w-36 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-50">
                  <img src={scooter.image} alt={scooter.name}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = EV_FALLBACK }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 font-medium">{scooter.brand}</p>
                  <h3 className="font-bold text-slate-900 text-base">{scooter.name}</h3>
                  <div className="flex gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">⚡ {scooter.range}km</span>
                    <span className="flex items-center gap-1">🏎 {scooter.topSpeed}kmph</span>
                    <span className="flex items-center gap-1">🔋 {scooter.battery}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-black text-slate-900">₹{(scooter.price / 1000).toFixed(1)}L</div>
                  <div className="text-xs text-slate-400 mt-0.5">EMI ₹{scooter.emi.toLocaleString()}/mo</div>
                  <Link to={`/scooters/${scooter.id}`}
                    className="mt-2 inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all">
                    View <ArrowRight size={11} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Listing
