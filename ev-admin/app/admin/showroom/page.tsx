"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  Plus, Search, Eye, Pencil, Ban, X, CheckCircle,
  AlertTriangle, Building2, MapPin, ChevronDown,
  Phone, Mail, Car, Filter,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────
type ShowroomStatus = "active" | "pending" | "closed";

interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  vendor: string;
  phone: string;
  email: string;
  vehicles: string[];
  status: ShowroomStatus;
}

// ── Seed Data ─────────────────────────────────────────────────
const SEED: Showroom[] = [
  { id: "1", name: "EV Hub Andheri", city: "Mumbai", address: "Shop 12, Andheri West, Mumbai 400058", vendor: "Rajesh Motors", phone: "+91 98200 11111", email: "andheri@evhub.in", vehicles: ["Ola S1 Pro", "Ather 450X"], status: "active" },
  { id: "2", name: "GreenDrive Pune", city: "Pune", address: "FC Road, Shivajinagar, Pune 411005", vendor: "GreenDrive Pvt Ltd", phone: "+91 98200 22222", email: "pune@greendrive.in", vehicles: ["TVS iQube", "Revolt RV400"], status: "active" },
  { id: "3", name: "Volt Zone Bangalore", city: "Bangalore", address: "MG Road, Bangalore 560001", vendor: "Volt Enterprises", phone: "+91 98200 33333", email: "blr@voltzone.in", vehicles: ["Ola S1 Pro", "Hero Lectro"], status: "pending" },
  { id: "4", name: "EV Point Chennai", city: "Chennai", address: "Anna Salai, Chennai 600002", vendor: "EV Point India", phone: "+91 98200 44444", email: "chennai@evpoint.in", vehicles: ["Ather 450X"], status: "active" },
  { id: "5", name: "Spark Motors Hyderabad", city: "Hyderabad", address: "Banjara Hills, Hyderabad 500034", vendor: "Spark Auto", phone: "+91 98200 55555", email: "hyd@sparkmotors.in", vehicles: ["Revolt RV400", "TVS iQube"], status: "closed" },
];

const VEHICLE_OPTIONS = ["Ola S1 Pro", "Ather 450X", "TVS iQube", "Revolt RV400", "Hero Lectro", "Bajaj Chetak"];

const EMPTY: Omit<Showroom, "id"> = {
  name: "", city: "", address: "", vendor: "",
  phone: "", email: "", vehicles: [], status: "pending",
};

const REQUIRED: (keyof Omit<Showroom, "id">)[] = ["name", "city", "address", "vendor", "phone"];

// ── Helpers ───────────────────────────────────────────────────
const inputCls = "border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 transition w-full bg-white";

const statusStyle: Record<ShowroomStatus, string> = {
  active: "bg-emerald-100 text-emerald-600",
  pending: "bg-orange-100 text-orange-500",
  closed: "bg-red-100 text-red-500",
};
const statusLabel: Record<ShowroomStatus, string> = {
  active: "Active", pending: "Pending", closed: "Closed",
};
const optionDot: Record<string, string> = {
  active: "bg-emerald-400", pending: "bg-orange-400", closed: "bg-red-400",
};

// ── Sub-components ────────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl">
      <span>{message}</span>
      <button onClick={onClose}><X size={13} className="text-gray-400 hover:text-white" /></button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function CustomSelect({ value, onChange, options, placeholder, error }: {
  value: string; onChange: (v: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string; error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button type="button" onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 border rounded-xl px-3 py-2.5 text-sm bg-white transition-all outline-none
          ${error ? "border-red-400 ring-2 ring-red-100" : open ? "border-emerald-400 ring-2 ring-emerald-100" : "border-gray-200 hover:border-gray-300"}`}>
        <span className="flex items-center gap-2">
          {selected && optionDot[selected.value] && <span className={`w-2 h-2 rounded-full ${optionDot[selected.value]}`} />}
          <span className={selected ? "text-gray-800 font-medium" : "text-gray-400"}>{selected?.label ?? placeholder ?? "Select"}</span>
        </span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? "rotate-180 text-emerald-500" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 top-[calc(100%+6px)] w-full bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-4 pt-3 pb-2 border-b border-gray-50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{placeholder ?? "Select"}</p>
          </div>
          <div className="py-1.5">
            {options.map((opt, i) => {
              const isSel = value === opt.value;
              return (
                <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all
                    ${isSel ? "bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 text-emerald-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}
                    ${i !== 0 ? "border-t border-gray-50" : ""}`}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${optionDot[opt.value] ?? "bg-gray-300"}`} />
                  <span className="flex-1 text-left">{opt.label}</span>
                  {isSel && <span className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center"><CheckCircle size={11} className="text-white" /></span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ShowroomPage() {
  const [showrooms, setShowrooms] = useState<Showroom[]>(SEED);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Showroom, "id">>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Showroom, "id">, boolean>>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [cityOpen, setCityOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const openAdd = () => {
    setEditId(null); setForm(EMPTY); setErrors({});
    setModalOpen(true); document.body.classList.add("modal-open");
  };
  const openEdit = (s: Showroom) => {
    setEditId(s.id); const { id, ...rest } = s; setForm(rest); setErrors({});
    setModalOpen(true); document.body.classList.add("modal-open");
  };
  const closeModal = () => {
    setModalOpen(false); setEditId(null);
    document.body.classList.remove("modal-open");
  };

  const set = (key: keyof Omit<Showroom, "id">) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: false }));
    };

  const validate = () => {
    const errs: Partial<Record<keyof Omit<Showroom, "id">, boolean>> = {};
    REQUIRED.forEach((k) => { if (!String(form[k]).trim()) errs[k] = true; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editId) {
      setShowrooms((prev) => prev.map((s) => s.id === editId ? { ...form, id: editId } : s));
      showToast("✅ Showroom updated!");
    } else {
      setShowrooms((prev) => [{ ...form, id: Date.now().toString() }, ...prev]);
      showToast("✅ Showroom added!");
    }
    closeModal();
  };

  const disableShowroom = (id: string) => {
    setShowrooms((prev) => prev.map((s) => s.id === id ? { ...s, status: "closed" } : s));
    showToast("🚫 Showroom closed.");
  };

  const toggleVehicle = (v: string) => {
    setForm((f) => ({
      ...f,
      vehicles: f.vehicles.includes(v) ? f.vehicles.filter((x) => x !== v) : [...f.vehicles, v],
    }));
  };

  const errCls = (k: keyof Omit<Showroom, "id">) => errors[k] ? "border-red-400 focus:ring-red-300" : "";

  // Derived
  const cities = ["All", ...Array.from(new Set(showrooms.map((s) => s.city)))];
  const filtered = showrooms.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || s.vendor.toLowerCase().includes(q);
    const matchCity = cityFilter === "All" || s.city === cityFilter;
    const matchStatus = statusFilter === "All" || s.status === statusFilter.toLowerCase();
    return matchSearch && matchCity && matchStatus;
  });

  const total = showrooms.length;
  const active = showrooms.filter((s) => s.status === "active").length;
  const citiesCovered = new Set(showrooms.map((s) => s.city)).size;
  const pending = showrooms.filter((s) => s.status === "pending").length;

  const summaryCards = [
    { label: "Total Showrooms", value: total, icon: Building2, color: "from-emerald-500 to-cyan-500" },
    { label: "Active", value: active, icon: CheckCircle, color: "from-blue-500 to-indigo-500" },
    { label: "Cities Covered", value: citiesCovered, icon: MapPin, color: "from-violet-500 to-purple-500" },
    { label: "Pending Approvals", value: pending, icon: AlertTriangle, color: "from-orange-400 to-amber-500" },
  ];

  const isSubmittable = REQUIRED.every((k) => String(form[k]).trim() !== "");

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Showroom Management</h1>
          <p className="text-sm text-gray-400 mt-1">Manage all EV showroom locations and vendors.</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition self-start sm:self-auto">
          <Plus size={16} /> Add Showroom
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">{c.label}</p>
                <p className="text-2xl font-bold text-gray-800">{c.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-gray-800">Showrooms List</h2>
          <div className="flex flex-wrap gap-2">

            {/* Search */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5">
              <Search size={14} className="text-gray-400" />
              <input className="outline-none bg-transparent w-40 text-sm placeholder:text-gray-400"
                placeholder="Search showrooms..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* City filter */}
            <div ref={cityRef} className="relative">
              <button onClick={() => setCityOpen((o) => !o)}
                className={`flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm bg-white transition
                  ${cityOpen ? "border-emerald-400 ring-2 ring-emerald-100" : "border-gray-200 hover:border-gray-300"}`}>
                <Filter size={13} className="text-gray-400" />
                <span className="text-gray-600">{cityFilter}</span>
                <ChevronDown size={13} className={`text-gray-400 transition-transform ${cityOpen ? "rotate-180" : ""}`} />
              </button>
              {cityOpen && (
                <div className="absolute z-30 mt-1.5 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
                  {cities.map((c, i) => (
                    <button key={c} onClick={() => { setCityFilter(c); setCityOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition
                        ${cityFilter === c ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold" : "text-gray-700 hover:bg-gray-50"}
                        ${i !== 0 ? "border-t border-gray-50" : ""}`}>
                      {c}
                      {cityFilter === c && <CheckCircle size={13} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {["All", "Active", "Pending", "Closed"].map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`text-xs font-medium px-3 py-1 rounded-lg transition-all
                    ${statusFilter === s ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="text-left py-2 pr-4">Showroom</th>
                <th className="text-left py-2 pr-4">City</th>
                <th className="text-left py-2 pr-4">Vendor</th>
                <th className="text-left py-2 pr-4">Contact</th>
                <th className="text-left py-2 pr-4">Vehicles</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="py-10 text-center text-gray-400 text-sm">No showrooms found.</td></tr>
              )}
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition">

                  {/* Showroom */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Building2 size={15} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[160px]">{s.address}</p>
                      </div>
                    </div>
                  </td>

                  {/* City */}
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-1 text-gray-600 text-xs">
                      <MapPin size={12} className="text-gray-400" />{s.city}
                    </span>
                  </td>

                  {/* Vendor */}
                  <td className="py-3 pr-4 text-gray-600 text-xs font-medium">{s.vendor}</td>

                  {/* Contact */}
                  <td className="py-3 pr-4">
                    <p className="flex items-center gap-1 text-xs text-gray-500"><Phone size={11} />{s.phone}</p>
                    <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5"><Mail size={11} />{s.email}</p>
                  </td>

                  {/* Vehicles */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1">
                      <Car size={13} className="text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{s.vehicles.length} vehicle{s.vehicles.length !== 1 ? "s" : ""}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[120px]">{s.vehicles.join(", ") || "—"}</p>
                  </td>

                  {/* Status */}
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[s.status]}`}>
                      {statusLabel[s.status]}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3">
                    <div className="flex gap-1.5">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition" title="View"><Eye size={14} /></button>
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition" title="Edit"><Pencil size={14} /></button>
                      <button onClick={() => disableShowroom(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition" title="Disable"><Ban size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={closeModal}>
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-modal"
            onClick={(e) => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="text-base font-bold text-gray-800">{editId ? "Edit Showroom" : "Add New Showroom"}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the showroom details below</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition"><X size={18} /></button>
            </div>

            {/* Form Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Showroom Name *">
                  <input type="text" value={form.name} onChange={set("name")} placeholder="e.g. EV Hub Andheri"
                    className={`${inputCls} ${errCls("name")}`} />
                </Field>
                <Field label="City *">
                  <input type="text" value={form.city} onChange={set("city")} placeholder="e.g. Mumbai"
                    className={`${inputCls} ${errCls("city")}`} />
                </Field>
              </div>

              {/* Address */}
              <Field label="Address *">
                <input type="text" value={form.address} onChange={set("address")} placeholder="Full showroom address"
                  className={`${inputCls} ${errCls("address")}`} />
              </Field>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Vendor Name *">
                  <input type="text" value={form.vendor} onChange={set("vendor")} placeholder="e.g. Rajesh Motors"
                    className={`${inputCls} ${errCls("vendor")}`} />
                </Field>
                <Field label="Status">
                  <CustomSelect
                    value={form.status}
                    onChange={(val) => setForm((f) => ({ ...f, status: val as ShowroomStatus }))}
                    options={[
                      { label: "Pending", value: "pending" },
                      { label: "Active", value: "active" },
                      { label: "Closed", value: "closed" },
                    ]}
                  />
                </Field>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Phone *">
                  <input type="text" value={form.phone} onChange={set("phone")} placeholder="+91 98200 00000"
                    className={`${inputCls} ${errCls("phone")}`} />
                </Field>
                <Field label="Email">
                  <input type="email" value={form.email} onChange={set("email")} placeholder="showroom@example.com"
                    className={inputCls} />
                </Field>
              </div>

              {/* Vehicles multi-select */}
              <Field label="Vehicles Available">
                <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-xl bg-white min-h-[48px]">
                  {VEHICLE_OPTIONS.map((v) => {
                    const selected = form.vehicles.includes(v);
                    return (
                      <button key={v} type="button" onClick={() => toggleVehicle(v)}
                        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all
                          ${selected
                            ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-transparent shadow-sm"
                            : "border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600"}`}>
                        <Car size={11} />
                        {v}
                        {selected && <X size={10} />}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-400">Click to select / deselect vehicles</p>
              </Field>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
              <button onClick={closeModal}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={!isSubmittable}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed">
                {editId ? "Update Showroom" : "Add Showroom"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
