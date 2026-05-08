import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronRight, MapPin, CreditCard, Package, Truck, ShieldCheck, ArrowLeft } from 'lucide-react'
import { Link } from '@/lib/router-compat'
import { useCart } from '../hooks/useCart'
import Footer from '../components/common/Footer'
import { EV_FALLBACK } from '../data/scooters'

const STEPS = [
  { id: 1, label: 'Delivery', icon: MapPin },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Confirmation', icon: CheckCircle },
]

const InputField = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>
    <input id={id} {...props} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all" />
  </div>
)

const Checkout = () => {
  const { cart, subtotal, total, discountAmt, clear } = useCart()
  const [step, setStep] = useState(1)
  const [payMethod, setPayMethod] = useState('card')
  const [orderId] = useState(() => 'VLT' + Math.random().toString(36).slice(2, 8).toUpperCase())

  const [delivery, setDelivery] = useState({ name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '' })
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })

  const deliveryFilled = Object.values(delivery).every(v => v.trim())
  const cardFilled = payMethod !== 'card' || Object.values(card).every(v => v.trim())

  const handleConfirm = () => { setStep(3); clear() }

  return (
    <div className="min-h-screen bg-primary-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ scale: step === s.id ? 1.1 : 1 }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step > s.id ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : step === s.id ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                    : 'bg-slate-100 text-slate-400'
                  }`}>
                  <s.icon size={18} aria-hidden="true" />
                </motion.div>
                <span className={`text-xs mt-1.5 font-semibold ${step >= s.id ? 'text-primary' : 'text-slate-400'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-20 sm:w-32 h-0.5 mx-3 mb-5 rounded-full transition-all duration-500 ${step > s.id ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Main Panel ── */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* STEP 1 — Delivery */}
              {step === 1 && (
                <motion.div key="delivery"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6"
                >
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
                    <MapPin size={20} className="text-primary" /> Delivery Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField id="fullName" label="Full Name" placeholder="Rahul Sharma" value={delivery.name} onChange={e => setDelivery(d => ({ ...d, name: e.target.value }))} />
                    <InputField id="phone" label="Phone Number" placeholder="9876543210" value={delivery.phone} onChange={e => setDelivery(d => ({ ...d, phone: e.target.value }))} />
                    <div className="sm:col-span-2">
                      <InputField id="email" label="Email Address" placeholder="rahul@email.com" value={delivery.email} onChange={e => setDelivery(d => ({ ...d, email: e.target.value }))} />
                    </div>
                    <div className="sm:col-span-2">
                      <InputField id="address" label="Address" placeholder="123, MG Road, Apt 4B" value={delivery.address} onChange={e => setDelivery(d => ({ ...d, address: e.target.value }))} />
                    </div>
                    <InputField id="city" label="City" placeholder="Bangalore" value={delivery.city} onChange={e => setDelivery(d => ({ ...d, city: e.target.value }))} />
                    <InputField id="state" label="State" placeholder="Karnataka" value={delivery.state} onChange={e => setDelivery(d => ({ ...d, state: e.target.value }))} />
                    <InputField id="pincode" label="Pincode" placeholder="560001" value={delivery.pincode} onChange={e => setDelivery(d => ({ ...d, pincode: e.target.value }))} />
                  </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => deliveryFilled && setStep(2)}
                      className={`mt-6 w-full py-4 font-bold text-base rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        deliveryFilled ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-btn hover:shadow-btn-hover hover:opacity-95 focus:ring-primary/50' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}>
                      Continue to Payment <ChevronRight size={18} aria-hidden="true" />
                    </motion.button>
                </motion.div>
              )}

              {/* STEP 2 — Payment */}
              {step === 2 && (
                <motion.div key="payment"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6"
                >
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-6">
                    <CreditCard size={20} className="text-primary" /> Payment Method
                  </h2>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { id: 'card', label: 'Card', emoji: '💳' },
                      { id: 'upi', label: 'UPI', emoji: '📱' },
                      { id: 'emi', label: 'EMI', emoji: '🏦' },
                    ].map(m => (
                      <button key={m.id} onClick={() => setPayMethod(m.id)}
                        className={`py-4 rounded-2xl border-2 text-sm font-bold flex flex-col items-center gap-1.5 transition-all ${
                          payMethod === m.id ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-slate-200 text-slate-600 hover:border-primary/40'
                        }`}>
                        <span className="text-2xl">{m.emoji}</span> {m.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {payMethod === 'card' && (
                      <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <InputField id="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" value={card.number}
                            onChange={e => setCard(c => ({ ...c, number: e.target.value }))} />
                        </div>
                        <InputField id="cardName" label="Cardholder Name" placeholder="RAHUL SHARMA" value={card.name}
                          onChange={e => setCard(c => ({ ...c, name: e.target.value }))} />
                        <div className="grid grid-cols-2 gap-3">
                          <InputField id="expiry" label="Expiry" placeholder="MM/YY" value={card.expiry}
                            onChange={e => setCard(c => ({ ...c, expiry: e.target.value }))} />
                          <InputField id="cvv" label="CVV" placeholder="•••" value={card.cvv}
                            onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))} />
                        </div>
                      </motion.div>
                    )}

                    {payMethod === 'upi' && (
                      <motion.div key="upi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                        <InputField id="upiId" label="UPI ID" placeholder="yourname@upi" />
                        <p className="text-xs text-slate-400 mt-2">Supported: GPay, PhonePe, Paytm, BHIM</p>
                      </motion.div>
                    )}

                    {payMethod === 'emi' && (
                      <motion.div key="emi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="space-y-3">
                        {[
                          { bank: 'HDFC Bank', tenure: '12 months', emi: Math.round(total / 12) },
                          { bank: 'ICICI Bank', tenure: '24 months', emi: Math.round(total / 24) },
                          { bank: 'SBI', tenure: '36 months', emi: Math.round(total / 36) },
                        ].map(opt => (
                          <label key={opt.bank} className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <input type="radio" name="emi" className="accent-primary" defaultChecked={opt.bank === 'HDFC Bank'} />
                              <div>
                                <p className="font-bold text-sm text-slate-900">{opt.bank}</p>
                                <p className="text-xs text-slate-400">{opt.tenure} · 9.5% p.a.</p>
                              </div>
                            </div>
                            <span className="font-black text-primary">₹{opt.emi.toLocaleString()}/mo</span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-2 mt-5 text-xs text-slate-400">
                    <ShieldCheck size={14} className="text-emerald-500" /> 256-bit SSL encrypted · Your payment is secure
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 px-5 py-3 border-2 border-slate-200 rounded-2xl text-sm font-semibold text-slate-600 hover:border-primary/40 transition-colors">
                      <ArrowLeft size={15} /> Back
                    </button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => cardFilled && handleConfirm()}
                      className={`flex-1 py-4 font-bold text-base rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        cardFilled ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-btn hover:shadow-btn-hover hover:opacity-95 focus:ring-primary/50' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}>
                      Pay ₹{total.toLocaleString()} <ChevronRight size={18} aria-hidden="true" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — Confirmation */}
              {step === 3 && (
                <motion.div key="confirm"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-8 text-center"
                >
                <motion.div role="status" aria-live="polite"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                  className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/30"
                >
                    <CheckCircle size={40} className="text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Order Confirmed! 🎉</h2>
                  <p className="text-slate-500 mb-1">Thank you for your purchase</p>
                  <p className="text-sm text-slate-400 mb-6">Order ID: <span className="font-bold text-slate-700">{orderId}</span></p>

                  <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-left space-y-3">
                    {[
                      { icon: Package, label: 'Order Processing', desc: "We're preparing your scooter", color: 'bg-primary/10', iconColor: 'text-primary' },
                      { icon: Truck, label: 'Estimated Delivery', desc: '5–7 business days · Free shipping', color: 'bg-cyan-50', iconColor: 'text-secondary' },
                      { icon: ShieldCheck, label: '5 Year Warranty', desc: 'Included with your purchase', color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
                    ].map(({ icon: Icon, label, desc, color, iconColor }) => (
                      <div key={label} className="flex items-center gap-3 text-sm">
                        <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                          <Icon size={16} className={iconColor} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{label}</p>
                          <p className="text-slate-400 text-xs">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/order-tracking"
                      className="flex-1 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all">
                      Track Order
                    </Link>
                    <Link to="/scooters"
                      className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-primary/40 transition-colors">
                      Continue Shopping
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Order Summary Sidebar ── */}
          {step < 3 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-5 sticky top-24">
                <h3 className="font-black text-slate-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-9 rounded-xl overflow-hidden shrink-0 bg-slate-50">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                          onError={e => { e.target.src = EV_FALLBACK }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                        <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                      </div>
                      <span className="text-xs font-black text-slate-900 shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Delivery</span><span className="text-emerald-600 font-semibold">FREE</span></div>
                  {discountAmt > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>−₹{discountAmt.toLocaleString()}</span></div>}
                  <div className="flex justify-between font-black text-slate-900 pt-2 border-t border-slate-100">
                    <span>Total</span><span className="text-lg">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Checkout
