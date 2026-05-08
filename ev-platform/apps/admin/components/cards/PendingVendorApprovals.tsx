import Link from "next/link";

const vendors = [
  {
    initials: "EM",
    name: "Electric Motors Hub",
    location: "Mumbai",
    meta: "Applied 2 days ago · GST verified · 12 docs",
    status: "normal",
  },
  {
    initials: "EG",
    name: "EV Galleria",
    location: "Pune",
    meta: "Applied 5 days ago · Pending GST verification",
    status: "normal",
  },
  {
    initials: "SM",
    name: "SpeedRide Motors",
    location: "Hyderabad",
    meta: "Fraud flag: GST mismatch",
    status: "fraud",
  },
];

export default function PendingVendorApprovals() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Pending vendor approvals</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full">
            7 pending
          </span>
          <Link href="/admin/bikes" className="text-xs font-semibold text-emerald-500 hover:text-emerald-600 transition-colors">
            See all →
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {vendors.map((v) => (
          <div
            key={v.name}
            className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 ${
              v.status === "fraud" ? "bg-red-50" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {v.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {v.name} · <span className="font-normal text-gray-500">{v.location}</span>
                </p>
                <p className={`text-xs mt-0.5 ${v.status === "fraud" ? "text-red-500 font-medium" : "text-gray-400"}`}>
                  {v.meta}
                </p>
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              {v.status === "fraud" ? (
                <button className="text-xs font-semibold bg-gray-800 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  Investigate →
                </button>
              ) : (
                <>
                  <button className="text-xs font-semibold bg-emerald-500 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-colors">
                    Approve
                  </button>
                  <button className="text-xs font-semibold border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
