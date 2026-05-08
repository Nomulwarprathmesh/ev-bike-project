"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Filter,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Store,
  UserRound,
  X,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────
type Status = "Pending" | "Approved" | "Rejected" | "Fraud";
type DocStatus = "Verified" | "Pending" | "Failed";
type SiteVisit = "Completed" | "Pending" | "Not Scheduled";

interface Document {
  name: string;
  status: DocStatus;
}

interface Vendor {
  id: number;
  name: string;
  owner: string;
  city: string;
  phone: string;
  email: string;
  address: string;
  gst: string;
  pan: string;
  businessType: string;
  appliedDate: string;
  status: Status;
  gstStatus: DocStatus;
  docsCount: number;
  evModels: string[];
  siteVisit: SiteVisit;
  riskScore: number;
  riskAlerts: string[];
  documents: Document[];
  checklist: Record<string, boolean>;
}

// ── Static Data ───────────────────────────────────────────────
const vendors: Vendor[] = [
  {
    id: 1,
    name: "Electric Motors Hub",
    owner: "Rajesh Sharma",
    city: "Mumbai",
    phone: "+91 98200 11234",
    email: "rajesh@emhub.in",
    address: "Shop 12, Andheri West, Mumbai - 400053",
    gst: "27AABCE1234F1Z5",
    pan: "AABCE1234F",
    businessType: "Proprietorship",
    appliedDate: "2 days ago",
    status: "Pending",
    gstStatus: "Verified",
    docsCount: 12,
    evModels: ["Ola S1 Pro", "Ather 450X"],
    siteVisit: "Completed",
    riskScore: 18,
    riskAlerts: ["Mumbai already has 3 active vendors nearby"],
    documents: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Trade License", status: "Verified" },
      { name: "Cancelled Cheque", status: "Pending" },
      { name: "Address Proof", status: "Verified" },
      { name: "Owner ID Proof", status: "Verified" },
    ],
    checklist: {
      "GST Verified": true,
      "PAN Verified": true,
      "Bank Verified": false,
      "Address Verified": true,
      "Photos Uploaded": true,
      "Site Visit Completed": true,
    },
  },
  {
    id: 2,
    name: "EV Galleria",
    owner: "Priya Mehta",
    city: "Pune",
    phone: "+91 97300 55678",
    email: "priya@evgalleria.in",
    address: "Plot 8, Kothrud, Pune - 411038",
    gst: "27BBBCE5678G2Z6",
    pan: "BBBCE5678G",
    businessType: "Partnership",
    appliedDate: "5 days ago",
    status: "Pending",
    gstStatus: "Pending",
    docsCount: 9,
    evModels: ["Bajaj Chetak", "TVS iQube"],
    siteVisit: "Pending",
    riskScore: 42,
    riskAlerts: ["Pending GST verification", "Missing showroom photos"],
    documents: [
      { name: "GST Certificate", status: "Pending" },
      { name: "PAN Card", status: "Verified" },
      { name: "Trade License", status: "Pending" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Pending" },
      { name: "Owner ID Proof", status: "Verified" },
    ],
    checklist: {
      "GST Verified": false,
      "PAN Verified": true,
      "Bank Verified": true,
      "Address Verified": false,
      "Photos Uploaded": false,
      "Site Visit Completed": false,
    },
  },
  {
    id: 3,
    name: "SpeedRide Motors",
    owner: "Anil Reddy",
    city: "Hyderabad",
    phone: "+91 96400 99012",
    email: "anil@speedride.in",
    address: "H.No 45, Banjara Hills, Hyderabad - 500034",
    gst: "36CCCDE9012H3Z7",
    pan: "CCCDE9012H",
    businessType: "Pvt Ltd",
    appliedDate: "1 day ago",
    status: "Fraud",
    gstStatus: "Failed",
    docsCount: 7,
    evModels: ["Hero Vida V1"],
    siteVisit: "Not Scheduled",
    riskScore: 88,
    riskAlerts: [
      "GST mismatch detected",
      "PAN linked with previously rejected vendor",
      "Duplicate city application",
    ],
    documents: [
      { name: "GST Certificate", status: "Failed" },
      { name: "PAN Card", status: "Failed" },
      { name: "Trade License", status: "Pending" },
      { name: "Cancelled Cheque", status: "Pending" },
      { name: "Address Proof", status: "Pending" },
      { name: "Owner ID Proof", status: "Pending" },
    ],
    checklist: {
      "GST Verified": false,
      "PAN Verified": false,
      "Bank Verified": false,
      "Address Verified": false,
      "Photos Uploaded": false,
      "Site Visit Completed": false,
    },
  },
  {
    id: 4,
    name: "GreenRide Motors",
    owner: "Sneha Kulkarni",
    city: "Bangalore",
    phone: "+91 99100 33456",
    email: "sneha@greenride.in",
    address: "No 22, Koramangala, Bangalore - 560034",
    gst: "29DDDFE3456I4Z8",
    pan: "DDDFE3456I",
    businessType: "Proprietorship",
    appliedDate: "10 days ago",
    status: "Approved",
    gstStatus: "Verified",
    docsCount: 14,
    evModels: ["Ola S1 Pro", "Bajaj Chetak", "Ather 450X"],
    siteVisit: "Completed",
    riskScore: 10,
    riskAlerts: [],
    documents: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Trade License", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Verified" },
      { name: "Owner ID Proof", status: "Verified" },
    ],
    checklist: {
      "GST Verified": true,
      "PAN Verified": true,
      "Bank Verified": true,
      "Address Verified": true,
      "Photos Uploaded": true,
      "Site Visit Completed": true,
    },
  },
  {
    id: 5,
    name: "VoltDrive",
    owner: "Karan Joshi",
    city: "Delhi",
    phone: "+91 98700 77890",
    email: "karan@voltdrive.in",
    address: "Block C, Lajpat Nagar, Delhi - 110024",
    gst: "07EEEGF7890J5Z9",
    pan: "EEEGF7890J",
    businessType: "Partnership",
    appliedDate: "15 days ago",
    status: "Rejected",
    gstStatus: "Failed",
    docsCount: 6,
    evModels: ["TVS iQube"],
    siteVisit: "Not Scheduled",
    riskScore: 65,
    riskAlerts: ["GST mismatch", "Incomplete documentation"],
    documents: [
      { name: "GST Certificate", status: "Failed" },
      { name: "PAN Card", status: "Verified" },
      { name: "Trade License", status: "Failed" },
      { name: "Cancelled Cheque", status: "Pending" },
      { name: "Address Proof", status: "Pending" },
      { name: "Owner ID Proof", status: "Verified" },
    ],
    checklist: {
      "GST Verified": false,
      "PAN Verified": true,
      "Bank Verified": false,
      "Address Verified": false,
      "Photos Uploaded": false,
      "Site Visit Completed": false,
    },
  },
];

const showroomPhotos = ["Front View", "Interior", "Service Area", "Storage Area"];
const cities = ["All Cities", ...Array.from(new Set(vendors.map((v) => v.city)))] as const;
const riskLevels = ["All Risk", "Low", "Medium", "High"] as const;
const tabs: { label: string; value: Status | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
  { label: "Fraud", value: "Fraud" },
];

// ── Helpers ───────────────────────────────────────────────────
const statusStyle: Record<Status, string> = {
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
  Fraud: "border-red-200 bg-red-50 text-red-700",
};

const docStyle: Record<DocStatus, string> = {
  Verified: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Failed: "border-rose-200 bg-rose-50 text-rose-700",
};

const riskTone = (score: number) => {
  if (score > 60) return "text-red-600 bg-red-500";
  if (score >= 30) return "text-amber-600 bg-amber-500";
  return "text-emerald-600 bg-emerald-500";
};

const riskLabel = (score: number) => {
  if (score > 60) return "High risk";
  if (score >= 30) return "Medium risk";
  return "Low risk";
};

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

function ActionButton({
  children,
  variant = "secondary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "dark" | "secondary";
  onClick?: () => void;
}) {
  const styles = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-100",
    danger: "border border-rose-200 bg-white text-rose-600 hover:bg-rose-50",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default function VendorApprovalsPage() {
  const [activeTab, setActiveTab] = useState<Status | "All">("Pending");
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState<(typeof cities)[number]>("All Cities");
  const [riskFilter, setRiskFilter] = useState<(typeof riskLevels)[number]>("All Risk");
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [statuses, setStatuses] = useState<Record<number, Status>>(
    Object.fromEntries(vendors.map((v) => [v.id, v.status]))
  );

  const cityCounts = useMemo(() => {
    return vendors.reduce<Record<string, number>>((acc, vendor) => {
      acc[vendor.city] = (acc[vendor.city] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vendors.filter((vendor) => {
      const currentStatus = statuses[vendor.id];
      const matchesTab = activeTab === "All" || currentStatus === activeTab;
      const matchesSearch = !query || [vendor.name, vendor.owner, vendor.city, vendor.gst, vendor.pan]
        .join(" ")
        .toLowerCase()
        .includes(query);
      const matchesCity = cityFilter === "All Cities" || vendor.city === cityFilter;
      const matchesRisk =
        riskFilter === "All Risk" ||
        (riskFilter === "Low" && vendor.riskScore < 30) ||
        (riskFilter === "Medium" && vendor.riskScore >= 30 && vendor.riskScore <= 60) ||
        (riskFilter === "High" && vendor.riskScore > 60);

      return matchesTab && matchesSearch && matchesCity && matchesRisk;
    });
  }, [activeTab, cityFilter, riskFilter, search, statuses]);

  const stats = useMemo(() => {
    const byStatus = vendors.reduce<Record<Status, number>>(
      (acc, vendor) => {
        acc[statuses[vendor.id]] += 1;
        return acc;
      },
      { Pending: 0, Approved: 0, Rejected: 0, Fraud: 0 }
    );

    return [
      { label: "Pending review", value: byStatus.Pending, icon: Clock3, helper: "Need decision today" },
      { label: "Approved vendors", value: byStatus.Approved, icon: Check, helper: "Ready for onboarding" },
      { label: "Fraud alerts", value: byStatus.Fraud, icon: ShieldAlert, helper: "Needs investigation" },
      { label: "Duplicate cities", value: Object.values(cityCounts).filter((count) => count > 1).length, icon: MapPin, helper: "City overlap found" },
    ];
  }, [cityCounts, statuses]);

  function updateStatus(id: number, status: Status) {
    setStatuses((prev) => ({ ...prev, [id]: status }));
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
  }

  function clearFilters() {
    setSearch("");
    setCityFilter("All Cities");
    setRiskFilter("All Risk");
    setActiveTab("All");
  }

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Header */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative p-6 sm:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-emerald-100/70" />
            <div className="absolute right-20 top-6 h-24 w-24 rounded-full bg-cyan-100/70" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <Store size={14} /> Dealer onboarding control center
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Dealer Approvals
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Review applications, verify documents, check city conflicts, and approve only trusted EV showroom partners.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <ActionButton>
                  <SlidersHorizontal size={16} /> Export Report
                </ActionButton>
                <ActionButton variant="primary">
                  <Check size={16} /> Bulk Review
                </ActionButton>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{item.label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-950">{item.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.helper}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Filters */}
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex overflow-x-auto rounded-2xl bg-slate-100 p-1">
                {tabs.map((tab) => {
                  const count = tab.value === "All" ? vendors.length : vendors.filter((v) => statuses[v.id] === tab.value).length;
                  const isActive = activeTab === tab.value;
                  return (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setActiveTab(tab.value)}
                      className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        isActive ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tab.label} <span className="ml-1 text-xs text-slate-400">{count}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="text-left text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Clear all filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_180px_auto]">
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 focus-within:border-emerald-300 focus-within:bg-white">
                <Search size={17} />
                <input
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  placeholder="Search vendor, owner, city, GST or PAN..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <select
                value={cityFilter}
                onChange={(event) => setCityFilter(event.target.value as (typeof cities)[number])}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 outline-none focus:border-emerald-300"
              >
                {cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>

              <select
                value={riskFilter}
                onChange={(event) => setRiskFilter(event.target.value as (typeof riskLevels)[number])}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 outline-none focus:border-emerald-300"
              >
                {riskLevels.map((risk) => (
                  <option key={risk}>{risk}</option>
                ))}
              </select>

              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                <Filter size={16} /> More filters
              </button>
            </div>
          </div>
        </section>

        {/* Vendor list */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <div className="flex flex-col gap-4">
            {filtered.map((vendor) => {
              const status = statuses[vendor.id];
              const doneCount = Object.values(vendor.checklist).filter(Boolean).length;
              const completion = Math.round((doneCount / Object.keys(vendor.checklist).length) * 100);
              const duplicateCity = cityCounts[vendor.city] > 1;
              const tone = riskTone(vendor.riskScore);

              return (
                <article
                  key={vendor.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
                    <div className="flex min-w-0 gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-base font-bold text-white shadow-sm">
                        {vendor.name.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="truncate text-lg font-bold text-slate-950">{vendor.name}</h2>
                          <Badge className={statusStyle[status]}>{status}</Badge>
                          {duplicateCity && (
                            <Badge className="border-orange-200 bg-orange-50 text-orange-700">
                              <AlertTriangle size={12} className="mr-1" /> City overlap
                            </Badge>
                          )}
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                          <span className="inline-flex items-center gap-1.5"><UserRound size={14} /> {vendor.owner}</span>
                          <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {vendor.city}</span>
                          <span className="inline-flex items-center gap-1.5"><Clock3 size={14} /> Applied {vendor.appliedDate}</span>
                        </div>

                        {vendor.riskAlerts.length > 0 && (
                          <div className="mt-4 grid gap-2">
                            {vendor.riskAlerts.slice(0, 2).map((alert) => (
                              <div key={alert} className="flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                                <AlertTriangle size={15} className="mt-0.5 flex-shrink-0" />
                                <span>{alert}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                          <InfoTile label="GST" value={vendor.gstStatus} tone={docStyle[vendor.gstStatus]} />
                          <InfoTile label="Documents" value={`${vendor.docsCount} docs`} tone="border-blue-200 bg-blue-50 text-blue-700" />
                          <InfoTile label="Site visit" value={vendor.siteVisit} tone={vendor.siteVisit === "Completed" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"} />
                          <InfoTile label="Checklist" value={`${completion}% done`} tone="border-slate-200 bg-slate-50 text-slate-700" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-500">Risk score</span>
                          <span className={`font-bold ${tone.split(" ")[0]}`}>{vendor.riskScore}/100</span>
                        </div>
                        <div className="h-2 rounded-full bg-white">
                          <div className={`h-2 rounded-full ${tone.split(" ")[1]}`} style={{ width: `${vendor.riskScore}%` }} />
                        </div>
                        <p className="mt-2 text-xs font-semibold text-slate-500">{riskLabel(vendor.riskScore)}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {status === "Pending" && (
                          <>
                            <ActionButton variant="primary" onClick={() => updateStatus(vendor.id, "Approved")}>
                              <Check size={15} /> Approve
                            </ActionButton>
                            <ActionButton variant="danger" onClick={() => updateStatus(vendor.id, "Rejected")}>
                              <X size={15} /> Reject
                            </ActionButton>
                          </>
                        )}
                        {status === "Fraud" && (
                          <ActionButton variant="dark" onClick={() => updateStatus(vendor.id, "Rejected")}>
                            <ShieldAlert size={15} /> Investigate
                          </ActionButton>
                        )}
                        <ActionButton onClick={() => setSelected(vendor)}>
                          <Eye size={15} /> Details
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {filtered.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                  <Search size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No vendors found</h3>
                <p className="mt-1 text-sm text-slate-500">Try changing search, city, risk, or status filters.</p>
                <button onClick={clearFilters} className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Side helper */}
          <aside className="hidden h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:block">
            <h3 className="font-bold text-slate-950">Review checklist</h3>
            <p className="mt-1 text-sm text-slate-500">Use this before approving any vendor.</p>
            <div className="mt-5 space-y-3">
              {[
                "GST and PAN must match owner details",
                "Bank cheque should match business name",
                "Address proof must match showroom city",
                "Photos should show frontage and storage area",
                "High-risk vendors need investigation first",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                  <Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>

      {/* Details drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <aside
            className="ml-auto flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge className={statusStyle[statuses[selected.id]]}>{statuses[selected.id]}</Badge>
                  <h2 className="mt-3 text-2xl font-bold text-slate-950">{selected.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{selected.city} · Applied {selected.appliedDate}</p>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <div className="space-y-6">
                <section>
                  <h3 className="mb-3 font-bold text-slate-950">Owner & business details</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Detail icon={UserRound} label="Owner" value={selected.owner} />
                    <Detail icon={Building2} label="Business type" value={selected.businessType} />
                    <Detail icon={Phone} label="Phone" value={selected.phone} />
                    <Detail icon={Mail} label="Email" value={selected.email} />
                    <Detail icon={FileText} label="GST Number" value={selected.gst} />
                    <Detail icon={FileText} label="PAN Number" value={selected.pan} />
                    <div className="sm:col-span-2">
                      <Detail icon={MapPin} label="Address" value={selected.address} />
                    </div>
                  </div>
                </section>

                {selected.riskAlerts.length > 0 && (
                  <section>
                    <h3 className="mb-3 font-bold text-slate-950">Risk alerts</h3>
                    <div className="space-y-2">
                      {selected.riskAlerts.map((alert) => (
                        <div key={alert} className="flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-700">
                          <AlertTriangle size={17} className="mt-0.5 flex-shrink-0" />
                          {alert}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section>
                  <h3 className="mb-3 font-bold text-slate-950">Documents</h3>
                  <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                    {selected.documents.map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between gap-3 bg-white p-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-xl bg-slate-100 p-2 text-slate-500">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{doc.name}</p>
                            <p className="text-xs text-slate-400">Tap view to inspect uploaded proof</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={docStyle[doc.status]}>{doc.status}</Badge>
                          <button className="hidden items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800 sm:inline-flex">
                            View <ChevronRight size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="mb-3 font-bold text-slate-950">Showroom photos</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {showroomPhotos.map((photo) => (
                      <div key={photo} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex h-24 items-center justify-center rounded-xl bg-white text-slate-300">
                          <Camera size={24} />
                        </div>
                        <p className="mt-2 text-center text-xs font-semibold text-slate-500">{photo}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="mb-3 font-bold text-slate-950">Approval checklist</h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {Object.entries(selected.checklist).map(([key, done]) => (
                      <div key={key} className={`flex items-center gap-3 rounded-2xl p-3 text-sm font-semibold ${done ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-400"}`}>
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full ${done ? "bg-emerald-600 text-white" : "bg-slate-200"}`}>
                          {done && <Check size={13} />}
                        </span>
                        {key}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-white p-4 sm:p-6">
              {statuses[selected.id] === "Pending" ? (
                <div className="grid grid-cols-2 gap-3">
                  <ActionButton variant="danger" onClick={() => updateStatus(selected.id, "Rejected")}>
                    <X size={16} /> Reject
                  </ActionButton>
                  <ActionButton variant="primary" onClick={() => updateStatus(selected.id, "Approved")}>
                    <Check size={16} /> Approve Vendor
                  </ActionButton>
                </div>
              ) : statuses[selected.id] === "Fraud" ? (
                <ActionButton variant="dark" onClick={() => updateStatus(selected.id, "Rejected")}>
                  <ShieldAlert size={16} /> Mark Investigated & Reject
                </ActionButton>
              ) : (
                <p className="text-center text-sm font-medium text-slate-500">No pending action for this vendor.</p>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function InfoTile({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <Badge className={`mt-2 ${tone}`}>{value}</Badge>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="h-fit rounded-xl bg-white p-2 text-slate-500 shadow-sm">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
