const alerts = [
  {
    type: "FRAUD",
    title: "Duplicate orders",
    desc: "User vmenon22 · 3 cards · 5 min",
    bar: "bg-red-500",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-600",
  },
  {
    type: "REFUND",
    title: "₹2.4L pending > 7 days",
    desc: "12 customers · auto-escalation due",
    bar: "bg-orange-400",
    bg: "bg-orange-50",
    badge: "bg-orange-100 text-orange-600",
  },
  {
    type: "LOW STOCK",
    title: "Across 8 vendors",
    desc: "Ola S1 Pro most affected · 18 SKUs",
    bar: "bg-yellow-400",
    bg: "bg-yellow-50",
    badge: "bg-yellow-100 text-yellow-700",
  },
];

export default function RiskAlerts() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-base font-semibold text-gray-800">⚠ Risk alerts</h2>

      <div className="flex flex-col gap-3">
        {alerts.map((alert) => (
          <div key={alert.type} className={`flex gap-3 rounded-xl overflow-hidden ${alert.bg}`}>
            <div className={`w-1 flex-shrink-0 rounded-l-xl ${alert.bar}`} />
            <div className="py-3 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${alert.badge}`}>
                  {alert.type}
                </span>
                <span className="text-sm font-semibold text-gray-800">{alert.title}</span>
              </div>
              <p className="text-xs text-gray-500">{alert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
