import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from '@/lib/router-compat'

const Signup = () => {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' })

  return (
    <div className="min-h-screen bg-secondary-section flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">VOLTRIX</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Create your account</h1>
          <p className="text-slate-500 mt-1 text-sm">Join 10,000+ EV buyers on Voltrix</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Rahul Sharma" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="tel" placeholder="9876543210" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" placeholder="rahul@email.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type={show ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all" />
                <button onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/10 rounded p-1">
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-primary/5 rounded-2xl p-4 space-y-2">
              {['Free test ride booking', 'Exclusive finance deals', 'Price drop alerts'].map(b => (
                <div key={b} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle size={12} className="text-primary shrink-0" /> {b}
                </div>
              ))}
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-black text-base rounded-2xl shadow-btn hover:shadow-btn-hover hover:opacity-95 flex items-center justify-center gap-2 transition-all duration-200">
              Create Account <ArrowRight size={17} />
            </motion.button>

            <p className="text-xs text-slate-400 text-center">
              By signing up, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">Terms</a> and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
