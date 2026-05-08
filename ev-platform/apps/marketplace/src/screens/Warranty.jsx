import { ShieldCheck, Wrench, FileText } from 'lucide-react'
import Footer from '../components/common/Footer'

const Warranty = () => {
  return (
    <div className="min-h-screen bg-primary-section pt-28">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Warranty And Ownership</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Manage warranty coverage, claims, service records, and dealer support for approved EV purchases.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'Battery Warranty', text: 'Track battery coverage, claim status, and inspection requirements.' },
            { icon: Wrench, title: 'Service Records', text: 'Keep showroom service history connected to your scooter profile.' },
            { icon: FileText, title: 'Documents', text: 'Store invoices, warranty documents, and delivery handover notes.' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-3xl bg-white p-6 shadow-card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
              </div>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Warranty
