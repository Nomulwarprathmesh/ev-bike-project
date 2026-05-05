import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Trash2, Plus, Minus, Tag, X, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import Footer from '../components/common/Footer'
import { EV_FALLBACK } from '../data/scooters'

const Cart = () => {
  const { cart, remove, updateQty, coupon, setCoupon, discount, discountAmt, applyCoupon, removeCoupon, couponError, subtotal, total } = useCart()
  const [couponInput, setCouponInput] = useState('')

  const handleApply = () => {
    if (applyCoupon(couponInput)) setCoupon(couponInput)
  }

  return (
    <div className="min-h-screen bg-secondary-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <ShoppingCart className="text-primary" size={28} /> Shopping Cart
            {cart.length > 0 && <span className="text-lg font-normal text-slate-400">({cart.length} item{cart.length !== 1 ? 's' : ''})</span>}
          </h1>
        </div>

        {cart.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-28 bg-white rounded-3xl border border-slate-200/70 shadow-card">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Add scooters to your cart to proceed</p>
            <Link to="/scooters"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-btn hover:shadow-btn-hover hover:opacity-95 active:scale-95 transition-all duration-200">
              Explore Scooters <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── Cart Items ── */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, transition: { duration: 0.2 } }}
                    className="bg-white rounded-2xl border border-slate-200/70 shadow-card p-5 flex gap-4 items-center"
                  >
                    <div className="w-28 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-50">
                      <img src={item.image} alt={item.name}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.src = EV_FALLBACK }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 font-medium">{item.brand}</p>
                      <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                      <div className="flex gap-3 text-xs text-slate-500 mt-0.5">
                        <span>⚡ {item.range}km</span>
                        <span>🏎 {item.topSpeed}kmph</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        {/* Qty controls */}
                        <div className="flex items-center gap-1.5 bg-slate-50 rounded-xl p-1 border border-slate-100">
                          <button onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-600">
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-slate-900">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-600">
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-900">₹{(item.price * item.qty).toLocaleString()}</p>
                          {item.qty > 1 && <p className="text-xs text-slate-400">₹{item.price.toLocaleString()} each</p>}
                        </div>
                      </div>
                    </div>

                    <button onClick={() => remove(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Coupon */}
              <div className="bg-white rounded-2xl border border-slate-200/70 shadow-card p-5">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <Tag size={16} className="text-primary" /> Apply Coupon
                </h3>
                {discount > 0 ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Tag size={14} />
                      <span className="font-bold">{coupon}</span>
                      <span className="text-sm">— {discount}% off applied!</span>
                    </div>
                    <button onClick={removeCoupon} className="text-emerald-600 hover:text-red-500 transition-colors">
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input value={couponInput} onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === 'Enter' && handleApply()}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 uppercase transition-all" />
                    <button onClick={handleApply}
                      className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all">
                      Apply
                    </button>
                  </div>
                )}
                {couponError && <p className="text-red-500 text-xs mt-2 font-medium">{couponError}</p>}
                <p className="text-xs text-slate-400 mt-2">Try: VOLTRIX10 · EV20 · FIRSTRIDE</p>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: ShieldCheck, label: 'Secure Payment' },
                  { icon: Truck, label: 'Free Delivery' },
                  { icon: RotateCcw, label: '7 Day Return' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="bg-white rounded-2xl p-3.5 border border-slate-200/70 flex items-center gap-2 text-sm text-slate-600 shadow-card">
                    <Icon size={16} className="text-primary shrink-0" /> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Order Summary ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6 sticky top-24">
                <h3 className="font-black text-slate-900 text-lg mb-5">Order Summary</h3>

                <div className="space-y-3 mb-5">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600 truncate mr-2">{item.name} × {item.qty}</span>
                      <span className="font-semibold text-slate-900 shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Delivery</span>
                    <span className="font-semibold text-emerald-600">FREE</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600">Coupon ({discount}% off)</span>
                      <span className="font-semibold text-emerald-600">−₹{discountAmt.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-100 pt-3 flex justify-between">
                    <span className="font-black text-slate-900">Total</span>
                    <span className="font-black text-xl text-slate-900">₹{total.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <p className="text-xs text-emerald-600 font-semibold">🎉 You save ₹{discountAmt.toLocaleString()}!</p>
                  )}
                </div>

                <Link to="/checkout"
                  className="mt-6 w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-base rounded-2xl shadow-btn hover:shadow-btn-hover hover:opacity-95 active:scale-95 flex items-center justify-center gap-2 transition-all duration-200">
                  Proceed to Checkout <ArrowRight size={17} />
                </Link>
                <Link to="/scooters" className="mt-3 w-full py-3 text-center text-sm text-slate-500 hover:text-primary transition-colors block">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart
