import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, MapPin, User, CheckCircle, Bike, Clock, ChevronLeft, X, Star, MapPinIcon, Calendar, Sparkles, Gift, Ribbon } from 'lucide-react'
import { scooters, EV_FALLBACK } from '../data/scooters'
import { showrooms } from '../data/showrooms'
import Footer from '../components/common/Footer'

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']

const Confetti = ({ scoped = false }) => {
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
    emoji: ['🎉', '🎊', '⭐', '✨', '🚀', '🏆', '💚', '🎈'][Math.floor(Math.random() * 8)],
  }))

  const containerClass = scoped ? 'absolute inset-0 pointer-events-none overflow-hidden' : 'fixed inset-0 pointer-events-none overflow-hidden'
  const yEnd = scoped ? 400 : window.innerHeight + 20

  return (
    <div className={containerClass}>
      {confetti.map(item => (
        <motion.div
          key={item.id}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: yEnd, opacity: 0, rotate: 360 }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: 'easeIn',
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          className="absolute text-2xl"
          style={{ left: `${item.left}%` }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  )
}

const Sticker = ({ emoji, delay, x, y }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 15 }}
    whileHover={{ scale: 1.2, rotate: 10 }}
    className="absolute text-4xl cursor-pointer pointer-events-none"
    style={{ left: x, top: y }}
  >
    {emoji}
  </motion.div>
)

const FloatingSparkles = () => {
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 0.5,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            duration: 2,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        />
      ))}
    </div>
  )
}



const getDates = () => Array.from({ length: 7 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i + 1)
  return {
    date: d.toISOString().split('T')[0],
    day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
    num: d.getDate(),
    month: d.toLocaleDateString('en-IN', { month: 'short' }),
  }
})

const CalendarModal = ({ isOpen, onClose, onSelectDate, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    if (selected > today) {
      const dateStr = selected.toISOString().split('T')[0]
      onSelectDate(dateStr)
      onClose()
    }
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const today = new Date()
  const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-900">Select Date</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-slate-400" />
              </motion.button>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevMonth}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={18} className="text-slate-600" />
              </motion.button>
              <h4 className="text-sm font-bold text-slate-900">
                {currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </h4>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextMonth}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={18} className="text-slate-600 rotate-180" />
              </motion.button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-bold text-slate-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => {
                const isToday = isCurrentMonth && day === today.getDate()
                const isPast = isCurrentMonth && day < today.getDate()
                const dateStr = day ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0] : null
                const isSelected = dateStr === selectedDate

                return (
                  <motion.button
                    key={idx}
                    whileHover={day && !isPast ? { scale: 1.1 } : {}}
                    whileTap={day && !isPast ? { scale: 0.95 } : {}}
                    onClick={() => day && !isPast && handleDateClick(day)}
                    disabled={!day || isPast}
                    className={`py-2 rounded-lg border-2 text-sm font-bold transition-all ${
                      !day
                        ? 'border-transparent'
                        : isPast
                        ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                        : isSelected
                        ? 'border-primary bg-gradient-to-br from-primary/20 to-secondary/20 text-primary shadow-md ring-2 ring-primary/30'
                        : isToday
                        ? 'border-primary/40 bg-primary/5 text-slate-900'
                        : 'border-slate-100 hover:border-primary/40 text-slate-900'
                    }`}
                  >
                    {day}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const InputField = ({ label, error, ...props }) => (
  <div>
    <label className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>
    <input
      {...props}
      className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm focus:outline-none focus:bg-white transition-all ${
        error ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10'
      }`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
)

const TestRide = () => {
  const [step, setStep] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedScooter, setSelectedScooter] = useState(null)
  const [selectedShowroom, setSelectedShowroom] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [details, setDetails] = useState({ name: '', phone: '', email: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [bookingId] = useState(() => 'TR' + Math.random().toString(36).slice(2, 8).toUpperCase())
  const [isBooked, setIsBooked] = useState(false)

  // Load saved booking on mount
  useEffect(() => {
    const saved = localStorage.getItem('testRideBooking')
    if (saved) {
      const booking = JSON.parse(saved)
      setSelectedScooter(booking.scooter)
      setSelectedShowroom(booking.showroom)
      setSelectedDate(booking.date)
      setSelectedSlot(booking.slot)
      setDetails(booking.details)
      setIsBooked(true)
    }
  }, [])

  const dates = getDates()
  const availableShowrooms = selectedScooter
    ? showrooms.filter(s => s.brands.some(b => scooters.find(sc => sc.id === selectedScooter.id)?.brand === b))
    : []

  const validateDetails = () => {
    const newErrors = {}
    if (!details.name.trim()) newErrors.name = 'Name is required'
    if (!details.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^\d{10}$/.test(details.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits'
    if (!details.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) newErrors.email = 'Invalid email'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleScooterSelect = (scooter) => {
    setSelectedScooter(scooter)
    setTimeout(() => setStep(1), 300)
  }

  const handleLocationSelect = (showroom) => {
    setSelectedShowroom(showroom)
    setTimeout(() => setStep(2), 300)
  }

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedSlot) {
      setTimeout(() => setStep(3), 300)
    }
  }

  const handleBook = () => {
    if (validateDetails()) {
      const booking = {
        scooter: selectedScooter,
        showroom: selectedShowroom,
        date: selectedDate,
        slot: selectedSlot,
        details,
      }
      localStorage.setItem('testRideBooking', JSON.stringify(booking))
      setIsBooked(true)
    }
  }

  const handleReset = () => {
    localStorage.removeItem('testRideBooking')
    setStep(0)
    setSelectedScooter(null)
    setSelectedShowroom(null)
    setSelectedDate(null)
    setSelectedSlot(null)
    setDetails({ name: '', phone: '', email: '', notes: '' })
    setErrors({})
    setIsBooked(false)
  }

  const stepTitles = ['Select Scooter', 'Select Showroom', 'Select Date & Time', 'Your Details']
  const stepIcons = [Bike, MapPin, Clock, User]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary/5 to-secondary/5">
      {/* Hero */}
      <div className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary text-sm font-bold rounded-full mb-4">
              <CalendarCheck size={14} /> Free Test Ride Booking
            </span>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">
              Book Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Test Ride</span>
            </h1>
            <p className="text-slate-500">Experience your dream EV before you buy. 100% free, no commitment.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-20">
        {!isBooked ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-700">Step {step + 1} of 4</h3>
                <span className="text-xs text-slate-500">{stepTitles[step]}</span>
              </div>
              <div className="w-full h-12 bg-slate-100 rounded-full overflow-hidden flex items-center justify-between px-2">
                {/* Step 0: Scooter */}
                <motion.div
                  animate={{
                    scale: step >= 0 ? 1 : 0.8,
                    opacity: step >= 0 ? 1 : 0.5,
                  }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    step >= 0 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Bike size={18} />
                </motion.div>

                {/* Connector Line 1 */}
                <motion.div
                  animate={{
                    backgroundColor: step >= 1 ? '#10B981' : '#e2e8f0',
                  }}
                  className="flex-1 h-1 mx-1 rounded-full"
                />

                {/* Step 1: Location */}
                <motion.div
                  animate={{
                    scale: step >= 1 ? 1 : 0.8,
                    opacity: step >= 1 ? 1 : 0.5,
                  }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    step >= 1 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <MapPin size={18} />
                </motion.div>

                {/* Connector Line 2 */}
                <motion.div
                  animate={{
                    backgroundColor: step >= 2 ? '#10B981' : '#e2e8f0',
                  }}
                  className="flex-1 h-1 mx-1 rounded-full"
                />

                {/* Step 2: Date & Time */}
                <motion.div
                  animate={{
                    scale: step >= 2 ? 1 : 0.8,
                    opacity: step >= 2 ? 1 : 0.5,
                  }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    step >= 2 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Clock size={18} />
                </motion.div>

                {/* Connector Line 3 */}
                <motion.div
                  animate={{
                    backgroundColor: step >= 3 ? '#10B981' : '#e2e8f0',
                  }}
                  className="flex-1 h-1 mx-1 rounded-full"
                />

                {/* Step 3: Details */}
                <motion.div
                  animate={{
                    scale: step >= 3 ? 1 : 0.8,
                    opacity: step >= 3 ? 1 : 0.5,
                  }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    step >= 3 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <User size={18} />
                </motion.div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Card */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl border border-slate-200/70 shadow-lg p-6 sm:p-8"
                >
                  <AnimatePresence mode="wait">
                    {/* STEP 0: SCOOTER SELECTION */}
                    {step === 0 && (
                      <motion.div
                        key="step-0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-96"
                      >
                        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                          <Bike size={20} className="text-primary" /> Select Your Scooter
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
                          {scooters.map((s, idx) => (
                            <motion.button
                              key={s.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleScooterSelect(s)}
                              className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                                selectedScooter?.id === s.id
                                  ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md'
                                  : 'border-slate-100 hover:border-primary/40 bg-white hover:shadow-md'
                              }`}
                            >
                              <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                                <img src={s.image} alt={s.name} className="w-full h-full object-cover" onError={e => { e.target.src = EV_FALLBACK }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-400 font-medium">{s.brand}</p>
                                <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                                <p className="text-xs text-primary font-semibold">⚡ {s.range}km range</p>
                              </div>
                              {selectedScooter?.id === s.id && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                  <CheckCircle size={16} className="text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 1: LOCATION SELECTION */}
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-96"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <MapPin size={20} className="text-primary" /> Select Showroom
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStep(0)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <ChevronLeft size={18} className="text-slate-400" />
                          </motion.button>
                        </div>
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                          {availableShowrooms.map((s, idx) => (
                            <motion.button
                              key={s.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleLocationSelect(s)}
                              className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                                selectedShowroom?.id === s.id
                                  ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md'
                                  : 'border-slate-100 hover:border-primary/40 bg-white hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <p className="font-bold text-slate-900">{s.name}</p>
                                  <p className="text-xs text-slate-500">{s.area}, {s.city}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                  <Star size={12} className="text-amber-500 fill-amber-500" />
                                  <span className="text-xs font-bold text-amber-700">{s.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-600">
                                <span>🕐 {s.timing}</span>
                                <span>✓ Test ride available</span>
                              </div>
                              {selectedShowroom?.id === s.id && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                  <CheckCircle size={16} className="text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: DATE & TIME SELECTION */}
                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-96"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <Clock size={20} className="text-primary" /> Select Date & Time
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStep(1)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <ChevronLeft size={18} className="text-slate-400" />
                          </motion.button>
                        </div>

                        {/* Date Selection */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-bold text-slate-600">Select Date</p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowCalendar(true)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 text-primary text-xs font-bold rounded-lg hover:border-primary/50 transition-all"
                            >
                              <Calendar size={14} /> Calendar
                            </motion.button>
                          </div>
                          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                            {dates.map((d, idx) => (
                              <motion.button
                                key={d.date}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedDate(d.date)}
                                className={`p-2 rounded-xl border-2 text-center transition-all ${
                                  selectedDate === d.date
                                    ? 'border-primary bg-gradient-to-br from-primary/20 to-secondary/20 shadow-md ring-2 ring-primary/30'
                                    : 'border-slate-100 hover:border-primary/40 bg-white'
                                }`}
                              >
                                <p className="text-xs font-bold text-slate-600">{d.day}</p>
                                <p className="text-sm font-black text-slate-900">{d.num}</p>
                                <p className="text-xs text-slate-500">{d.month}</p>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Time Selection */}
                        <div>
                          <p className="text-xs font-bold text-slate-600 mb-3">Select Time Slot</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {TIME_SLOTS.map((slot, idx) => (
                              <motion.button
                                key={slot}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
                                  selectedSlot === slot
                                    ? 'border-primary bg-gradient-to-br from-primary/20 to-secondary/20 text-primary shadow-md ring-2 ring-primary/30'
                                    : 'border-slate-100 hover:border-primary/40 bg-white text-slate-700'
                                }`}
                              >
                                {slot}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {selectedDate && selectedSlot && (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleDateTimeSelect}
                            className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all"
                          >
                            Continue to Details
                          </motion.button>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 3: USER DETAILS */}
                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-96"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <User size={20} className="text-primary" /> Your Details
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStep(2)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <ChevronLeft size={18} className="text-slate-400" />
                          </motion.button>
                        </div>

                        <div className="space-y-4 mb-6">
                          <InputField
                            label="Full Name"
                            type="text"
                            placeholder="Enter your name"
                            value={details.name}
                            onChange={e => setDetails({ ...details, name: e.target.value })}
                            error={errors.name}
                          />
                          <InputField
                            label="Phone Number"
                            type="tel"
                            placeholder="10-digit mobile number"
                            value={details.phone}
                            onChange={e => setDetails({ ...details, phone: e.target.value })}
                            error={errors.phone}
                          />
                          <InputField
                            label="Email Address"
                            type="email"
                            placeholder="your@email.com"
                            value={details.email}
                            onChange={e => setDetails({ ...details, email: e.target.value })}
                            error={errors.email}
                          />
                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Notes (Optional)</label>
                            <textarea
                              placeholder="Any special requests or preferences?"
                              value={details.notes}
                              onChange={e => setDetails({ ...details, notes: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                              rows="3"
                            />
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleBook}
                          className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all"
                        >
                          Confirm Booking
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Sticky Summary Card */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="sticky top-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200/70 p-6 shadow-lg"
                >
                  <h4 className="text-sm font-black text-slate-900 mb-4">Booking Summary</h4>

                  {/* Scooter */}
                  <div className="mb-4 pb-4 border-b border-slate-200">
                    {selectedScooter ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-200">
                          <img src={selectedScooter.image} alt={selectedScooter.name} className="w-full h-full object-cover" onError={e => { e.target.src = EV_FALLBACK }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500">Scooter</p>
                          <p className="text-sm font-bold text-slate-900 truncate">{selectedScooter.name}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <p className="text-xs text-slate-400">Select a scooter</p>
                    )}
                  </div>

                  {/* Showroom */}
                  <div className="mb-4 pb-4 border-b border-slate-200">
                    {selectedShowroom ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xs text-slate-500">Showroom</p>
                        <p className="text-sm font-bold text-slate-900">{selectedShowroom.name}</p>
                        <p className="text-xs text-slate-500">{selectedShowroom.area}</p>
                      </motion.div>
                    ) : (
                      <p className="text-xs text-slate-400">Select a showroom</p>
                    )}
                  </div>

                  {/* Date & Time */}
                  <div className="mb-4 pb-4 border-b border-slate-200">
                    {selectedDate && selectedSlot ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xs text-slate-500">Date & Time</p>
                        <p className="text-sm font-bold text-slate-900">
                          {new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-slate-500 mb-2">{selectedSlot}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setStep(2)}
                          className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                        >
                          Change Date/Time →
                        </motion.button>
                      </motion.div>
                    ) : (
                      <p className="text-xs text-slate-400">Select date & time</p>
                    )}
                  </div>

                  {/* Progress Dots */}
                  <div className="flex gap-2">
                    {stepTitles.map((_, idx) => (
                      <motion.div
                        key={idx}
                        animate={{
                          scale: step === idx ? 1.2 : 1,
                          backgroundColor: step >= idx ? '#10B981' : '#e2e8f0',
                        }}
                        className="h-2 flex-1 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          /* INLINE CONFIRMATION CARD */
          <div className="flex justify-center py-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
              className="relative w-full max-w-2xl"
            >
              {/* Confetti - Scoped to card */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <Confetti scoped={true} />
              </div>

              {/* Floating Stickers */}
              <div className="absolute inset-0 pointer-events-none">
                <Sticker emoji="🎉" delay={0.3} x="5%" y="10%" />
                <Sticker emoji="🎊" delay={0.4} x="90%" y="15%" />
                <Sticker emoji="⭐" delay={0.5} x="8%" y="80%" />
                <Sticker emoji="✨" delay={0.6} x="85%" y="75%" />
              </div>

              {/* Confirmation Card */}
              <div className="relative bg-white rounded-3xl border-2 border-primary/30 shadow-lg p-6 sm:p-8 text-center overflow-hidden z-10">
                {/* Gradient Border Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

                {/* Floating Sparkles */}
                <FloatingSparkles />

                <div className="relative z-10">
                  {/* Success Checkmark */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <CheckCircle size={48} className="text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Heading */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl sm:text-3xl font-black text-slate-900 mb-1"
                  >
                    Test Ride Booked!
                  </motion.h2>

                  {/* Subheading */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-500 mb-6 text-xs sm:text-sm"
                  >
                    Get ready for an amazing experience
                  </motion.p>

                  {/* Booking Details Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-primary/8 via-secondary/8 to-primary/8 rounded-xl p-4 mb-6 text-left border border-primary/20"
                  >
                    {/* Booking ID */}
                    <div className="mb-4 pb-4 border-b border-primary/20">
                      <p className="text-xs text-slate-500 font-bold mb-1">BOOKING ID</p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-lg font-black text-primary tracking-wider"
                      >
                        {bookingId}
                      </motion.p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {/* Scooter */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <p className="text-slate-500 font-bold mb-1 flex items-center gap-1">
                          <Bike size={12} className="text-primary" /> SCOOTER
                        </p>
                        <p className="font-bold text-slate-900 line-clamp-1">{selectedScooter?.name}</p>
                      </motion.div>

                      {/* Showroom */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <p className="text-slate-500 font-bold mb-1 flex items-center gap-1">
                          <MapPin size={12} className="text-primary" /> SHOWROOM
                        </p>
                        <p className="font-bold text-slate-900 line-clamp-1">{selectedShowroom?.name}</p>
                      </motion.div>

                      {/* Date */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <p className="text-slate-500 font-bold mb-1 flex items-center gap-1">
                          <Calendar size={12} className="text-primary" /> DATE
                        </p>
                        <p className="font-bold text-slate-900">
                          {new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </p>
                      </motion.div>

                      {/* Time */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <p className="text-slate-500 font-bold mb-1 flex items-center gap-1">
                          <Clock size={12} className="text-primary" /> TIME
                        </p>
                        <p className="font-bold text-slate-900">{selectedSlot}</p>
                      </motion.div>

                      {/* Customer Name */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <p className="text-slate-500 font-bold mb-1 flex items-center gap-1">
                          <User size={12} className="text-primary" /> NAME
                        </p>
                        <p className="font-bold text-slate-900 line-clamp-1">{details.name}</p>
                      </motion.div>

                      {/* Phone */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <p className="text-slate-500 font-bold mb-1">PHONE</p>
                        <p className="font-bold text-slate-900">{details.phone}</p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Note */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6"
                  >
                    <p className="text-xs text-slate-700 font-medium">
                      ✓ Our showroom team will contact you soon.
                    </p>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col gap-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.location.href = '/bookings'}
                      className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-lg hover:shadow-lg transition-all"
                    >
                      View Booking
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      className="w-full py-2.5 border-2 border-primary text-primary font-bold text-sm rounded-lg hover:bg-primary/5 transition-all"
                    >
                      Book Another Test Ride
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.location.href = '/'}
                      className="w-full py-2.5 border-2 border-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-50 transition-all"
                    >
                      Back to Home
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <CalendarModal
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onSelectDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      <Footer />
    </div>
  )
}

export default TestRide
