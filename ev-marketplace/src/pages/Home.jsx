import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Sparkles, Zap, Shield, Users, MapPin, Brain, IndianRupee, Star, CheckCircle, ChevronRight, ArrowRight, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScooterCard from '../components/scooter/ScooterCard'
import Footer from '../components/common/Footer'
import { scooters, testimonials } from '../data/scooters'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  }),
}

const CountUp = ({ to, prefix = '', suffix = '', duration = 1.8 }) => {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (node) node.textContent = prefix + (Number.isInteger(to) ? Math.round(v).toLocaleString() : v.toFixed(0)) + suffix
      },
    })
    return () => controls.stop()
  }, [to, prefix, suffix, duration])
  return <span ref={ref}>{prefix}0{suffix}</span>
}

const SectionHeader = ({ label, title, subtitle }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-14">
    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-4">{label}</span>
    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3 text-balance">{title}</h2>
    {subtitle && <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>}
  </motion.div>
)

const Home = () => {
  return (
    <div className="overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative min-h-[92vh] flex items-center bg-primary-section overflow-hidden">

        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-secondary/8 to-cyan-100/40 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-dot-grid opacity-25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Pill badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur border border-primary/20 rounded-full text-sm font-semibold text-primary shadow-sm mb-8"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <Sparkles size={13} /> AI-Powered EV Marketplace
              </motion.div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-balance">
                <span className="text-slate-900">Your Smart </span>
                <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
                  EV Journey
                </span>
                <br />
                <span className="text-slate-900">Starts Here</span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-500 mb-10 leading-relaxed max-w-lg">
                Discover, compare, finance, and test ride electric scooters with AI recommendations. India&apos;s #1 EV marketplace.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/scooters"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-base rounded-full shadow-btn hover:shadow-btn-hover hover:opacity-95 active:scale-95 transition-all duration-200">
                    <Zap size={18} fill="white" /> Explore Bikes
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/test-ride"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 hover:border-primary/40 text-slate-800 font-bold text-base rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                    Book Test Ride
                  </Link>
                </motion.div>
              </div>

              {/* Trust stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { val: '10k+', label: 'Happy Users', color: 'text-primary' },
                  { val: '500+', label: 'Dealers', color: 'text-secondary' },
                  { val: '50+', label: 'EV Models', color: 'text-accent' },
                  { val: '4.9★', label: 'Rating', color: 'text-amber-500' },
                ].map(({ val, label, color }, i) => (
                  <motion.div key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className={`text-xl lg:text-2xl font-black ${color}`}>{val}</div>
                    <div className="text-xs text-slate-400 mt-0.5 font-medium">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Hero visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main card */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl shadow-black/30">
                <div className="absolute inset-0 bg-dot-grid opacity-20" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/20 blur-3xl rounded-full" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-center"
                  >
                    <div className="text-7xl mb-2">⚡</div>
                    <div className="text-white/60 text-sm font-semibold tracking-widest uppercase">Electric Scooter</div>
                  </motion.div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </div>

              {/* Floating stat cards */}
              <motion.div
                className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-2xl font-black text-primary">195km</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Max Range</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-xl"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="text-2xl font-black text-secondary">120kmph</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Top Speed</div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-4 -translate-y-1/2 bg-gradient-to-br from-primary to-secondary rounded-2xl px-4 py-3 shadow-2xl shadow-primary/30"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-xl font-black text-white">₹1.15L</div>
                <div className="text-xs text-white/80 font-medium uppercase tracking-wide">Starting</div>
              </motion.div>

              <motion.div
                className="absolute top-4 right-4 glass rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-xs font-bold text-slate-700">Fast Charging</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                count: 10000, prefix: '', suffix: '+',
                label: 'Happy Customers',
                icon: Users,
                iconBg: 'bg-emerald-50',
                iconColor: 'text-primary',
                accent: 'from-primary/20 to-primary/5',
                border: 'border-primary/15',
              },
              {
                count: 500, prefix: '', suffix: '+',
                label: 'Showrooms',
                icon: MapPin,
                iconBg: 'bg-cyan-50',
                iconColor: 'text-secondary',
                accent: 'from-secondary/20 to-secondary/5',
                border: 'border-secondary/15',
              },
              {
                count: 50, prefix: '', suffix: '+',
                label: 'EV Models',
                icon: Zap,
                iconBg: 'bg-violet-50',
                iconColor: 'text-violet-600',
                accent: 'from-violet-200/40 to-violet-100/10',
                border: 'border-violet-200/40',
              },
              {
                count: 50, prefix: '₹', suffix: 'Cr+',
                label: 'Loans Disbursed',
                icon: TrendingUp,
                iconBg: 'bg-amber-50',
                iconColor: 'text-amber-600',
                accent: 'from-amber-200/40 to-amber-100/10',
                border: 'border-amber-200/40',
              },
            ].map(({ count, prefix, suffix, label, icon: Icon, iconBg, iconColor, accent, border }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative bg-white rounded-3xl border ${border} shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col items-center text-center overflow-hidden`}
              >
                {/* Gradient accent bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-60 pointer-events-none`} />

                {/* Icon */}
                <div className={`relative z-10 w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}>
                  <motion.div
                    initial={{ rotate: -10, scale: 0.8 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
                  >
                    <Icon size={24} className={iconColor} />
                  </motion.div>
                </div>

                {/* Animated count */}
                <div className={`relative z-10 text-3xl font-black ${iconColor} mb-1 tabular-nums`}>
                  <CountUp to={count} prefix={prefix} suffix={suffix} duration={1.6 + i * 0.15} />
                </div>

                {/* Label */}
                <div className="relative z-10 text-sm font-semibold text-slate-500 leading-tight">{label}</div>

                {/* Bottom accent line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accent.replace('/20', '').replace('/5', '/60')}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4, duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POPULAR SCOOTERS ══ */}
      <section className="section bg-secondary-section">
        <div className="container-xl">
          <SectionHeader
            label="🔥 Trending Now"
            title="Popular Electric Scooters"
            subtitle="Handpicked top-rated EVs loved by thousands of riders across India"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scooters.map((scooter, i) => (
              <motion.div key={scooter.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i * 0.1}
              >
                <ScooterCard scooter={scooter} />
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-12">
            <Link to="/scooters"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary/30 text-primary font-bold rounded-full hover:bg-primary hover:text-white hover:border-primary active:scale-95 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-primary/20">
              View All Scooters <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ WHY VOLTRIX ══ */}
      <section className="section bg-primary-section">
        <div className="container-xl">
          <SectionHeader
            label="✨ Why Us"
            title="Why Choose Voltrix?"
            subtitle="We make your EV buying journey smarter, faster, and more rewarding"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Brain, gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', title: 'AI Recommendations', desc: 'Our AI analyzes your commute, budget, and preferences to suggest the perfect EV for you.' },
              { icon: IndianRupee, gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', title: 'Best Finance Deals', desc: 'Compare EMI plans from 15+ banks. Get pre-approved loans in under 2 minutes.' },
              { icon: MapPin, gradient: 'from-cyan-500 to-blue-600', bg: 'bg-cyan-50', title: '500+ Showrooms', desc: 'Find authorized dealers near you. Book test rides at your convenience.' },
              { icon: Shield, gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-50', title: 'Verified Listings', desc: 'Every scooter listing is verified. No fake prices, no hidden charges.' },
              { icon: Zap, gradient: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50', title: 'Instant Comparison', desc: 'Compare up to 4 scooters side-by-side on 30+ parameters in seconds.' },
              { icon: Star, gradient: 'from-pink-500 to-rose-600', bg: 'bg-pink-50', title: 'Genuine Reviews', desc: 'Real reviews from verified buyers. Make informed decisions with confidence.' },
            ].map(({ icon: Icon, gradient, bg, title, desc }, i) => (
              <motion.div key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i * 0.08}
                className="group bg-white rounded-3xl p-6 border border-slate-200/70 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AI FINDER ══ */}
      <section className="section bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-dot-grid opacity-10" />
        </div>
        <div className="relative z-10 container-xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-6">
              <Brain size={13} /> AI-Powered
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 text-balance">
              Find Your Perfect EV in{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">60 Seconds</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Answer 5 quick questions. Our AI recommends the best EV for your lifestyle and budget.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['Daily KMs?', 'Budget?', 'City/Highway?', 'Home Charging?', 'Preferred Brand?'].map((q, i) => (
                <motion.div key={q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5"
                >
                  <div className="w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-[10px] font-black">{i + 1}</div>
                  <span className="text-sm text-slate-300 font-medium">{q}</span>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/scooters"
                className="inline-flex items-center gap-2.5 px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white font-black text-lg rounded-full shadow-2xl shadow-primary/30 hover:opacity-95 active:scale-95 transition-all duration-200">
                <Brain size={22} /> Start AI Finder
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ FINANCE BANNER ══ */}
      <section className="section bg-secondary-section">
        <div className="container-xl">
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute inset-0 bg-dot-grid opacity-10" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center p-8 lg:p-14">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-5">💰 Easy Finance</span>
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 text-balance">
                  Own Your EV at <br /><span className="text-yellow-300">₹2,999/month</span>
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">Zero down payment options. Instant approval from 15+ partner banks.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['0% Processing Fee', 'Instant Approval', 'Flexible Tenure', 'No Hidden Charges'].map(f => (
                    <div key={f} className="flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1.5 rounded-xl text-white text-xs font-semibold">
                      <CheckCircle size={12} /> {f}
                    </div>
                  ))}
                </div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/finance"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-black rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200">
                    Calculate EMI <ChevronRight size={18} />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: 'Partner Banks', val: '15+' },
                  { label: 'Avg Approval', val: '2 min' },
                  { label: 'Loans Disbursed', val: '₹50Cr+' },
                  { label: 'Happy Borrowers', val: '8,000+' },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-white/15 backdrop-blur rounded-2xl p-5 text-center border border-white/20">
                    <div className="text-3xl font-black text-white mb-1">{val}</div>
                    <div className="text-white/70 text-sm font-medium">{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section bg-primary-section">
        <div className="container-xl">
          <SectionHeader
            label="💬 Reviews"
            title="What Our Riders Say"
            subtitle="Real stories from real EV owners who found their perfect ride on Voltrix"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i * 0.12}
                className="bg-white rounded-3xl p-7 border border-slate-200/70 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-black shadow-md shadow-primary/20">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.city} · {t.bike}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
