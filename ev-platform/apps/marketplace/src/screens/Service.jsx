import { CalendarCheck, Clock, MapPin, Wrench } from 'lucide-react'
import Footer from '../components/common/Footer'

const serviceSlots = [
  { id: 'SVC-001', type: 'Periodic service', showroom: 'Mumbai Main Showroom', status: 'booked', slot: 'Tomorrow, 11:00 AM' },
  { id: 'SVC-002', type: 'Battery health check', showroom: 'Delhi Service Center', status: 'in_progress', slot: 'Today, 3:00 PM' },
  { id: 'SVC-003', type: 'Warranty inspection', showroom: 'Bangalore EV Hub', status: 'completed', slot: 'Apr 29, 10:00 AM' },
]

const Service = () => {
  return (
    <div className="min-h-screen bg-primary-section pt-28">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Service Booking</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Book service at approved dealer showrooms and track service history from booking to completion.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <section className="rounded-3xl bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-slate-900">Service History</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {serviceSlots.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{item.type}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin size={14} /> {item.showroom}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {item.status.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-slate-600">
                      <Clock size={14} /> {item.slot}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl bg-white p-6 shadow-card">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Wrench size={22} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Book a Service</h2>
            <div className="mt-4 space-y-3">
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none">
                <option>Select scooter</option>
                <option>Ola S1 Pro</option>
                <option>Ather 450X</option>
              </select>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none">
                <option>Nearby showroom</option>
                <option>Mumbai Main Showroom</option>
                <option>Delhi Service Center</option>
              </select>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary py-3 text-sm font-bold text-white">
                <CalendarCheck size={16} /> Check Slots
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Service
