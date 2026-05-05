import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, Zap } from 'lucide-react'

const NotFound = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-cyan-50/20 flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-md"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="text-8xl mb-6"
      >
        ⚡
      </motion.div>
      <h1 className="text-7xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">404</h1>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Page Not Found</h2>
      <p className="text-slate-500 mb-8 leading-relaxed">Looks like this page ran out of charge. Let's get you back on the road.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link to="/"
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-btn hover:shadow-btn-hover hover:opacity-95 active:scale-95 transition-all duration-200">
            <Home size={16} /> Go Home
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link to="/scooters"
            className="flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-primary/30 text-primary font-bold rounded-full hover:bg-primary hover:text-white hover:border-primary active:scale-95 transition-all duration-200">
            <Zap size={16} /> Explore Scooters
          </Link>
        </motion.div>
      </div>
    </motion.div>
  </div>
)

export default NotFound
