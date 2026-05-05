import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, User, Menu, X, Zap } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

const NAV_LINKS = [
  { label: 'Explore', href: '/scooters' },
  { label: 'Compare', href: '/compare' },
  { label: 'Finance', href: '/finance' },
  { label: 'Test Ride', href: '/test-ride' },
  { label: 'Showrooms', href: '/showrooms' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
    <motion.nav
      className={`w-full max-w-5xl transition-all duration-300 rounded-2xl ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(15,23,42,0.12)] border border-slate-200/60'
          : 'bg-white/70 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.08)] border border-white/60'
      }`}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md shadow-primary/30"
            >
              <Zap size={15} className="text-white" fill="white" />
            </motion.div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VOLTRIX
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <Link key={href} to={href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active ? 'text-primary' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-primary/8 rounded-xl border border-primary/15"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/wishlist"
              className="p-2.5 text-slate-500 hover:text-primary hover:bg-primary/8 rounded-xl transition-all duration-200">
              <Heart size={19} aria-hidden="true" />
            </Link>

            <Link to="/cart" className="relative p-2.5 text-slate-500 hover:text-primary hover:bg-primary/8 rounded-xl transition-all duration-200">
              <ShoppingBag size={19} aria-hidden="true" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm"
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link to="/account" className="p-2.5 text-slate-500 hover:text-primary hover:bg-primary/8 rounded-xl transition-all duration-200">
              <User size={19} aria-hidden="true" />
            </Link>

            <Link to="/account"
              className="ml-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-full shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:opacity-95 active:scale-95 transition-all duration-200">
              Sign In
            </Link>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-1.5">
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-primary rounded-xl transition-colors">
              <ShoppingBag size={20} aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={22} /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ label, href }, i) => {
                const active = pathname === href || (href !== '/' && pathname.startsWith(href))
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link to={href}
                      className={`flex items-center py-3 px-4 text-sm font-semibold rounded-2xl transition-all ${
                        active ? 'text-primary bg-primary/8' : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                      }`}>
                      {label}
                      {active && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
                className="pt-3 mt-2 border-t border-slate-100 space-y-1">
                <Link to="/wishlist" className="flex items-center gap-3 py-3 px-4 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-2xl transition-all">
                  <Heart size={17} /> Wishlist
                </Link>
                <Link to="/cart" className="flex items-center gap-3 py-3 px-4 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-2xl transition-all">
                  <ShoppingBag size={17} /> Cart
                  {count > 0 && <span className="ml-auto w-5 h-5 bg-primary text-white text-xs font-black rounded-full flex items-center justify-center">{count}</span>}
                </Link>
                <Link to="/account" className="flex items-center gap-3 py-3 px-4 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-2xl transition-all">
                  <User size={17} /> Account
                </Link>
                <Link to="/account"
                  className="flex items-center justify-center w-full py-3.5 mt-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl shadow-md hover:opacity-90 transition-opacity">
                  Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </div>
  )
}

export default Navbar
