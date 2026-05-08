import { motion } from 'framer-motion'
import { Zap, Mail, Phone, MapPin, Share2, MessageCircle, Video, Users, ArrowRight } from 'lucide-react'
import { Link } from '@/lib/router-compat'

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap size={15} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">VOLTRIX</span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">India's #1 AI-powered EV marketplace. Discover, compare, and buy your perfect electric scooter.</p>
          <div className="flex gap-2">
            {[Share2, MessageCircle, Video, Users].map((Icon, i) => (
              <motion.a key={i} href="#" whileHover={{ scale: 1.15, y: -2 }}
                className="w-9 h-9 bg-white/5 hover:bg-primary/20 border border-white/8 hover:border-primary/40 rounded-xl flex items-center justify-center transition-all duration-200">
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { label: 'Explore Scooters', to: '/scooters' },
              { label: 'Compare Models', to: '/compare' },
              { label: 'Finance & EMI', to: '/finance' },
              { label: 'Book Test Ride', to: '/test-ride' },
              { label: 'Find Showrooms', to: '/showrooms' },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-sm text-slate-500 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group">
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Support</h4>
          <ul className="space-y-3">
            {[
              { label: 'Help Center', to: '/' },
              { label: 'Order Tracking', to: '/order-tracking' },
              { label: 'My Account', to: '/account' },
              { label: 'Wishlist', to: '/wishlist' },
              { label: 'Contact Us', to: '/' },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-sm text-slate-500 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group">
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter + Contact */}
        <div>
          <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Stay Updated</h4>
          <div className="flex gap-2 mb-6">
            <input type="email" placeholder="Your email"
              className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/40 transition-colors" />
            <button className="px-3 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 transition-opacity">
              <Mail size={15} />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-sm">
              <Phone size={13} className="text-primary shrink-0" />
              <span>1800-123-VOLTRIX</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Mail size={13} className="text-primary shrink-0" />
              <span>support@voltrix.in</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin size={13} className="text-primary shrink-0 mt-0.5" />
              <span>Bangalore, Karnataka, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-slate-600">© 2025 Voltrix. All rights reserved. Built with ⚡ in India.</p>
        <div className="flex gap-5">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
            <a key={link} href="#" className="text-xs text-slate-600 hover:text-primary transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
