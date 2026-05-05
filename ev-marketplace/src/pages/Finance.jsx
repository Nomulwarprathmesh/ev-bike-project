import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { IndianRupee, Percent, Calendar, CheckCircle, XCircle, ChevronRight, Building2, Zap } from 'lucide-react'
import { calcEMI, calcTotalPayable, calcTotalInterest } from '../utils/emiCalculator'
import { scooters, EV_FALLBACK } from '../data/scooters'
import Footer from '../components/common/Footer'

const BANKS = [
  { name: 'HDFC Bank', rate: 8.5, maxTenure: 60, logo: '🏦', processing: '0%', approval: '2 min' },
  { name: 'ICICI Bank', rate: 9.0, maxTenure: 48, logo: '🏛', processing: '0.5%', approval: '5 min' },
  { name: 'SBI', rate: 8.75, maxTenure: 60, logo: '🏢', processing: '0%', approval: '10 min' },
  { name: 'Axis Bank', rate: 9.5, maxTenure: 48, logo: '🏗', processing: '1%', approval: '3 min' },
  { name: 'Kotak Bank', rate: 9.25, maxTenure: 36, logo: '🏬', processing: '0%', approval: '4 min' },
  { name: 'IDFC First', rate: 8.99, maxTenure: 60, logo: '🏪', processing: '0%', approval: '2 min' },
]

const ELIGIBILITY = [
  { label: 'Age between 21–65 years', key: 'age' },
  { label: 'Salaried or self-employed', key: 'employed' },
  { label: 'Minimum income ₹15,000/month', key: 'income' },
  { label: 'Credit score above 650', key: 'credit' },
  { label: 'Valid KYC documents', key: 'kyc' },
  { label: 'Indian resident', key: 'resident' },
]

const Finance = () => {
  const [loanAmount, setLoanAmount] = useState(120000)
  const [tenure, setTenure] = useState(36)
  const [rate, setRate] = useState(8.5)
  const [downPayment, setDownPayment] = useState(20000)
  const [eligibility, setEligibility] = useState({})
  const [selectedScooter, setSelectedScooter] = useState(null)

  const principal = loanAmount - downPayment
  const emi = useMemo(() => calcEMI(principal, rate, tenure), [principal, rate, tenure])
  const totalPayable = calcTotalPayable(emi, tenure)
  const totalInterest = calcTotalInterest(emi, tenure, principal)
  const eligibleCount = Object.values(eligibility).filter(Boolean).length

  const handleScooterSelect = (s) => {
    setSelectedScooter(s)
    setLoanAmount(s.price)
    setDownPayment(Math.round(s.price * 0.15))
  }

  return (
    <div className="min-h-screen bg-secondary-section">

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 py-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-dot-grid opacity-10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-bold rounded-full mb-4">
              <IndianRupee size={14} /> Easy EV Finance
            </span>
            <h1 className="text-3xl lg:text-5xl font-black text-white mb-3">
              Own Your EV at <span className="text-yellow-300">₹2,999/month</span>
            </h1>
            <p className="text-white/80 text-lg mb-6">Zero processing fee · Instant approval · 15+ partner banks</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['0% Processing Fee', 'Instant Approval', 'Flexible Tenure', 'No Hidden Charges'].map(f => (
                <div key={f} className="flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full text-white text-sm font-semibold">
                  <CheckCircle size={13} /> {f}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── EMI Calculator ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Scooter selector */}
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-primary" /> Select Scooter <span className="text-sm font-normal text-slate-400">(optional)</span>
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {scooters.map(s => (
                  <button key={s.id} onClick={() => handleScooterSelect(s)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 shrink-0 transition-all min-w-[90px] ${
                      selectedScooter?.id === s.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-100 hover:border-primary/40'
                    }`}>
                    <div className="w-14 h-10 rounded-xl overflow-hidden bg-slate-50">
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover"
                        onError={e => { e.target.src = EV_FALLBACK }} />
                    </div>
                    <p className="text-xs font-bold text-slate-800 text-center leading-tight">{s.name}</p>
                    <p className="text-xs text-primary font-black">₹{(s.price / 1000).toFixed(0)}k</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculator */}
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
              <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <IndianRupee size={18} className="text-primary" /> EMI Calculator
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-700">Loan Amount</span>
                    <span className="font-black text-primary">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <input type="range" min={50000} max={200000} step={5000} value={loanAmount}
                    onChange={e => { setLoanAmount(+e.target.value); setDownPayment(Math.round(+e.target.value * 0.15)) }}
                    className="w-full" />
                  <div className="flex justify-between text-xs text-slate-400 mt-1"><span>₹50k</span><span>₹2L</span></div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-700">Down Payment</span>
                    <span className="font-black text-secondary">₹{downPayment.toLocaleString()}</span>
                  </div>
                  <input type="range" min={0} max={Math.round(loanAmount * 0.5)} step={5000} value={downPayment}
                    onChange={e => setDownPayment(+e.target.value)}
                    className="w-full" style={{ accentColor: '#08B6D8' }} />
                  <div className="flex justify-between text-xs text-slate-400 mt-1"><span>₹0</span><span>50%</span></div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-700 flex items-center gap-1"><Percent size={12} /> Interest Rate</span>
                    <span className="font-black text-violet-600">{rate}% p.a.</span>
                  </div>
                  <input type="range" min={7} max={15} step={0.25} value={rate}
                    onChange={e => setRate(+e.target.value)}
                    className="w-full" style={{ accentColor: '#8B5CF6' }} />
                  <div className="flex justify-between text-xs text-slate-400 mt-1"><span>7%</span><span>15%</span></div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-bold text-slate-700 flex items-center gap-1"><Calendar size={12} /> Tenure</span>
                    <span className="font-black text-orange-600">{tenure} months</span>
                  </div>
                  <div className="flex gap-2">
                    {[12, 24, 36, 48, 60].map(t => (
                      <button key={t} onClick={() => setTenure(t)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                          tenure === t ? 'border-primary bg-primary text-white shadow-sm' : 'border-slate-100 text-slate-600 hover:border-primary/40'
                        }`}>
                        {t}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-5 border border-primary/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">Monthly EMI</p>
                    <p className="text-2xl font-black text-primary">₹{emi.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">Total Interest</p>
                    <p className="text-2xl font-black text-orange-500">₹{totalInterest.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">Total Payable</p>
                    <p className="text-2xl font-black text-slate-900">₹{totalPayable.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 bg-white/70 rounded-xl p-3 text-xs text-slate-500 text-center">
                  Principal: ₹{principal.toLocaleString()} · Down: ₹{downPayment.toLocaleString()} · {tenure}mo @ {rate}%
                </div>
              </div>

              <a href="/checkout"
                className="mt-4 w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-btn hover:shadow-btn-hover">
                Apply for Loan <ChevronRight size={18} />
              </a>
            </div>

            {/* Bank Offers */}
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
              <h2 className="text-lg font-black text-slate-900 mb-5 flex items-center gap-2">
                <Building2 size={18} className="text-primary" /> Partner Bank Offers
              </h2>
              <div className="space-y-3">
                {BANKS.map((bank, i) => {
                  const bankEmi = calcEMI(principal, bank.rate, tenure)
                  return (
                    <motion.div key={bank.name}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group"
                    >
                      <div className="text-2xl w-10 text-center shrink-0">{bank.logo}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 text-sm">{bank.name}</p>
                        <div className="flex gap-3 text-xs text-slate-500 mt-0.5">
                          <span>📊 {bank.rate}% p.a.</span>
                          <span>⏱ Up to {bank.maxTenure}mo</span>
                          <span>🏷 {bank.processing} fee</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black text-primary text-sm">₹{bankEmi.toLocaleString()}/mo</p>
                        <p className="text-xs text-emerald-600 font-semibold">{bank.approval} approval</p>
                      </div>
                      <ChevronRight size={15} className="text-slate-300 group-hover:text-primary transition-colors shrink-0" />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">

            {/* EMI Summary sticky */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-6 text-white sticky top-24 shadow-lg shadow-primary/20">
              <p className="text-white/80 text-sm mb-1 font-medium">Your Monthly EMI</p>
              <p className="text-4xl font-black mb-5">₹{emi.toLocaleString()}</p>
              <div className="space-y-2.5 text-sm">
                {[
                  ['Loan Amount', `₹${loanAmount.toLocaleString()}`],
                  ['Down Payment', `₹${downPayment.toLocaleString()}`],
                  ['Principal', `₹${principal.toLocaleString()}`],
                  ['Rate', `${rate}% p.a.`],
                  ['Tenure', `${tenure} months`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-white/70">{k}</span>
                    <span className="font-bold">{v}</span>
                  </div>
                ))}
                <div className="border-t border-white/20 pt-2.5 flex justify-between">
                  <span className="text-white/70">Total Payable</span>
                  <span className="font-black">₹{totalPayable.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Eligibility Checklist */}
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-6">
              <h3 className="font-black text-slate-900 mb-1">Eligibility Check</h3>
              <p className="text-xs text-slate-400 mb-4">Tick all that apply to you</p>
              <div className="space-y-3">
                {ELIGIBILITY.map(item => (
                  <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
                    <button
                      onClick={() => setEligibility(e => ({ ...e, [item.key]: !e[item.key] }))}
                      className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                        eligibility[item.key] ? 'bg-primary border-primary' : 'border-slate-300 group-hover:border-primary/50'
                      }`}>
                      {eligibility[item.key] && <CheckCircle size={11} className="text-white" />}
                    </button>
                    <span className="text-sm text-slate-700">{item.label}</span>
                  </label>
                ))}
              </div>

              <div className={`mt-5 p-4 rounded-2xl text-center transition-all ${
                eligibleCount === 6 ? 'bg-emerald-50 border border-emerald-200'
                : eligibleCount >= 4 ? 'bg-yellow-50 border border-yellow-200'
                : 'bg-slate-50 border border-slate-200'
              }`}>
                {eligibleCount === 6 ? (
                  <>
                    <CheckCircle size={22} className="text-emerald-500 mx-auto mb-1" />
                    <p className="font-black text-emerald-700 text-sm">You're Eligible! 🎉</p>
                    <p className="text-xs text-emerald-600 mt-0.5">Apply now for instant approval</p>
                  </>
                ) : eligibleCount >= 4 ? (
                  <>
                    <p className="font-black text-yellow-700 text-sm">Likely Eligible</p>
                    <p className="text-xs text-yellow-600 mt-0.5">{6 - eligibleCount} criteria pending</p>
                  </>
                ) : (
                  <>
                    <XCircle size={22} className="text-slate-400 mx-auto mb-1" />
                    <p className="font-black text-slate-600 text-sm">Check {6 - eligibleCount} more criteria</p>
                  </>
                )}
                <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${eligibleCount === 6 ? 'bg-emerald-500' : 'bg-primary'}`}
                    animate={{ width: `${(eligibleCount / 6) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-card p-5">
              <h3 className="font-black text-slate-900 mb-3">Documents Required</h3>
              <ul className="space-y-2.5">
                {['Aadhaar Card', 'PAN Card', 'Last 3 months salary slips', 'Bank statement (6 months)', 'Passport size photo'].map(doc => (
                  <li key={doc} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Finance
