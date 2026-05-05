"use client";

import { useState, useRef, useEffect, useCallback, DragEvent, ChangeEvent } from "react";
import {
  Plus, Search, Filter, Eye, Pencil, Ban, X,
  Package, Zap, Tag, Info, ImagePlus,
  CheckCircle, AlertTriangle, Archive, Layers, ChevronDown,
  ImageIcon, CloudUpload,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────
type Status = "active" | "draft" | "out_of_stock";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: string;
  discountPrice: string;
  stock: string;
  sku: string;
  range: string;
  battery: string;
  chargingTime: string;
  topSpeed: string;
  status: Status;
  image: string;
}

// ── Seed Data ─────────────────────────────────────────────────
const SEED: Product[] = [
  {
    id: "1", name: "Ola S1 Pro", brand: "Ola Electric", category: "Scooter",
    description: "Flagship electric scooter with 181km range.", price: "129999",
    discountPrice: "119999", stock: "42", sku: "EV-OLA-S1P-001",
    range: "181 km", battery: "3.97 kWh", chargingTime: "6.5 hrs", topSpeed: "120 km/h",
    status: "active", image: "",
  },
  {
    id: "2", name: "Ather 450X", brand: "Ather Energy", category: "Scooter",
    description: "Smart scooter with connected features.", price: "149900",
    discountPrice: "", stock: "5", sku: "EV-ATH-450X-002",
    range: "146 km", battery: "3.7 kWh", chargingTime: "5.5 hrs", topSpeed: "90 km/h",
    status: "active", image: "",
  },
  {
    id: "3", name: "TVS iQube S", brand: "TVS Motor", category: "Scooter",
    description: "Reliable city commuter with smart connectivity.", price: "109900",
    discountPrice: "99900", stock: "0", sku: "EV-TVS-IQS-003",
    range: "100 km", battery: "3.04 kWh", chargingTime: "4.5 hrs", topSpeed: "82 km/h",
    status: "out_of_stock", image: "",
  },
  {
    id: "4", name: "Revolt RV400", brand: "Revolt Motors", category: "Bike",
    description: "AI-enabled electric motorcycle.", price: "139900",
    discountPrice: "", stock: "18", sku: "EV-RVT-RV4-004",
    range: "150 km", battery: "3.24 kWh", chargingTime: "4.5 hrs", topSpeed: "85 km/h",
    status: "active", image: "",
  },
  {
    id: "5", name: "Hero Lectro C3", brand: "Hero Lectro", category: "Cycle",
    description: "Electric cycle for urban commuting.", price: "34999",
    discountPrice: "29999", stock: "3", sku: "EV-HRO-LC3-005",
    range: "50 km", battery: "0.36 kWh", chargingTime: "3 hrs", topSpeed: "25 km/h",
    status: "draft", image: "",
  },
];

const EMPTY: Omit<Product, "id"> = {
  name: "", brand: "", category: "", description: "",
  price: "", discountPrice: "", stock: "", sku: "",
  range: "", battery: "", chargingTime: "", topSpeed: "",
  status: "draft", image: "",
};

const REQUIRED: (keyof Omit<Product, "id">)[] = ["name", "brand", "category", "price", "stock"];

// ── Helpers ───────────────────────────────────────────────────
const inputCls = "border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 transition w-full bg-white";

const statusStyle: Record<Status, string> = {
  active: "bg-emerald-100 text-emerald-600",
  draft: "bg-gray-100 text-gray-500",
  out_of_stock: "bg-red-100 text-red-500",
};
const statusLabel: Record<Status, string> = {
  active: "Active", draft: "Draft", out_of_stock: "Out of Stock",
};

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl">
      <span>{message}</span>
      <button onClick={onClose}><X size={13} className="text-gray-400 hover:text-white" /></button>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function SectionHead({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mt-2">
      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
        <Icon size={12} className="text-white" />
      </div>
      <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">{title}</p>
    </div>
  );
}

// dot color per option value
const optionDot: Record<string, string> = {
  active: "bg-emerald-400",
  draft: "bg-gray-400",
  out_of_stock: "bg-red-400",
  Scooter: "bg-cyan-400",
  Bike: "bg-violet-400",
  Cycle: "bg-amber-400",
  Accessories: "bg-pink-400",
};

function CustomSelect({ value, onChange, options, placeholder, error }: {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 border rounded-xl px-3 py-2.5 text-sm bg-white cursor-pointer transition-all outline-none
          ${error
            ? "border-red-400 ring-2 ring-red-100"
            : open
            ? "border-emerald-400 ring-2 ring-emerald-100 shadow-sm"
            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"}`}
      >
        <span className="flex items-center gap-2 min-w-0">
          {selected && optionDot[selected.value] && (
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${optionDot[selected.value]}`} />
          )}
          <span className={`truncate ${selected ? "text-gray-800 font-medium" : "text-gray-400"}`}>
            {selected ? selected.label : placeholder ?? "Select"}
          </span>
        </span>
        <ChevronDown
          size={15}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-emerald-500" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
          {/* header strip */}
          <div className="px-4 pt-3 pb-2 border-b border-gray-50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {placeholder ?? "Select option"}
            </p>
          </div>
          <div className="py-1.5">
            {options.map((opt, i) => {
              const isSelected = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all
                    ${isSelected
                      ? "bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 text-emerald-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"}
                    ${i !== 0 ? "border-t border-gray-50" : ""}`}
                >
                  {/* dot */}
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    optionDot[opt.value] ?? "bg-gray-300"
                  }`} />
                  <span className="flex-1 text-left">{opt.label}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={11} className="text-white" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Image Uploader ───────────────────────────────────────────
function ImageUploader({
  images, onAdd, onRemove, max, dragging, setDragging, fileRef,
}: {
  images: string[];
  onAdd: (files: FileList | null) => void;
  onRemove: (index: number) => void;
  max: number;
  dragging: boolean;
  setDragging: (v: boolean) => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
}) {
  const isFull = images.length >= max;

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (!isFull) onAdd(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-3">

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); if (!isFull) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !isFull && fileRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl h-36 flex flex-col items-center justify-center gap-2 transition-all
          ${ isFull
            ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
            : dragging
            ? "border-emerald-400 bg-emerald-50 scale-[1.01] shadow-md cursor-copy"
            : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/40 cursor-pointer"
          }`}
      >
        {/* animated ring on drag */}
        {dragging && (
          <span className="absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping opacity-20 pointer-events-none" />
        )}

        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
          dragging ? "bg-emerald-100" : "bg-gray-100"
        }`}>
          <CloudUpload size={20} className={dragging ? "text-emerald-500" : "text-gray-400"} />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isFull ? "Maximum images reached" : (
              <>
                <span className="text-emerald-500 font-semibold">Click to browse</span>
                {" "}or drag & drop
              </>
            )}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP · Max {max} images</p>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => onAdd(e.target.files)}
        />
      </div>

      {/* Counter + previews */}
      {images.length > 0 && (
        <div className="flex flex-col gap-2">
          {/* count bar */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{images.length}</span> / {max} images uploaded
            </p>
            {images.length >= max && (
              <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                Limit reached
              </span>
            )}
          </div>

          {/* progress bar */}
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${(images.length / max) * 100}%` }}
            />
          </div>

          {/* thumbnails */}
          <div className="flex flex-wrap gap-2 mt-1">
            {images.map((src, i) => (
              <div
                key={i}
                className="group relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`img-${i}`} className="w-full h-full object-cover" />

                {/* hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />

                {/* index badge */}
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-md">
                    Cover
                  </span>
                )}

                {/* remove button */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onRemove(i); }}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150"
                >
                  <X size={10} />
                </button>
              </div>
            ))}

            {/* add more slot */}
            {!isFull && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 flex flex-col items-center justify-center gap-1 transition flex-shrink-0"
              >
                <ImageIcon size={16} className="text-gray-400" />
                <span className="text-[10px] text-gray-400">Add more</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(SEED);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(EMPTY);
  const [images, setImages] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Product, "id">, boolean>>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [catOpen, setCatOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setImages([]);
    setErrors({});
    setDrawerOpen(true);
    document.body.classList.add("modal-open");
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    const { id, ...rest } = p;
    setForm(rest);
    setImages(p.image ? [p.image] : []);
    setErrors({});
    setDrawerOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditId(null);
    document.body.classList.remove("modal-open");
  };

  const set = (key: keyof Omit<Product, "id">) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: false }));
    };

  const validate = () => {
    const errs: Partial<Record<keyof Omit<Product, "id">, boolean>> = {};
    REQUIRED.forEach((k) => { if (!String(form[k]).trim()) errs[k] = true; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editId) {
      setProducts((prev) => prev.map((p) => p.id === editId ? { ...form, id: editId, image: images[0] ?? "" } : p));
      showToast("✅ Product updated!");
    } else {
      const newProduct: Product = { ...form, id: Date.now().toString(), image: images[0] ?? "" };
      setProducts((prev) => [newProduct, ...prev]);
      showToast("✅ Product added successfully!");
    }
    closeDrawer();
  };

  const disableProduct = (id: string) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, status: "out_of_stock" } : p));
    showToast("🚫 Product disabled.");
  };

  const MAX_IMAGES = 5;

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;
    Array.from(files).slice(0, remaining).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => { if (e.target?.result) setImages((prev) => [...prev, e.target!.result as string]); };
      reader.readAsDataURL(file);
    });
  }, [images.length]);

  const errCls = (k: keyof Omit<Product, "id">) => errors[k] ? "border-red-400 focus:ring-red-300" : "";

  // ── Derived ──────────────────────────────────────────────────
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || p.category === catFilter;
    const matchStatus = statusFilter === "All" || p.status === statusFilter.toLowerCase().replace(" ", "_");
    return matchSearch && matchCat && matchStatus;
  });

  const total = products.length;
  const active = products.filter((p) => p.status === "active").length;
  const outOfStock = products.filter((p) => p.status === "out_of_stock").length;
  const lowStock = products.filter((p) => parseInt(p.stock) > 0 && parseInt(p.stock) <= 5).length;

  const summaryCards = [
    { label: "Total Products", value: total, icon: Layers, color: "from-emerald-500 to-cyan-500" },
    { label: "Active", value: active, icon: CheckCircle, color: "from-blue-500 to-indigo-500" },
    { label: "Out of Stock", value: outOfStock, icon: Archive, color: "from-red-400 to-pink-500" },
    { label: "Low Stock", value: lowStock, icon: AlertTriangle, color: "from-orange-400 to-amber-500" },
  ];

  const isPublishable = REQUIRED.every((k) => String(form[k]).trim() !== "");

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <p className="text-sm text-gray-400 mt-1">Manage EV bikes, scooters, and accessories.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition self-start sm:self-auto"
        >
          <Plus size={16} /> Add Product
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

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-gray-800">Products List</h2>
          <div className="flex flex-wrap gap-2">
            {/* Search */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-500">
              <Search size={14} />
              <input
                className="outline-none bg-transparent w-36 placeholder:text-gray-400 text-sm"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Category filter */}
            <div className="relative">
              <button
                onClick={() => setCatOpen((o) => !o)}
                className={`flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm transition bg-white ${
                  catOpen ? "border-emerald-400 ring-2 ring-emerald-100" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Filter size={13} className="text-gray-400" />
                <span className="text-gray-600">{catFilter}</span>
                <ChevronDown size={13} className={`text-gray-400 transition-transform ${catOpen ? "rotate-180" : ""}`} />
              </button>
              {catOpen && (
                <div className="absolute z-30 mt-1.5 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCatFilter(c); setCatOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition ${
                        catFilter === c
                          ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {c}
                      {catFilter === c && <CheckCircle size={13} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Status filter */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {["All", "Active", "Draft", "Out of Stock"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-xs font-medium px-3 py-1 rounded-lg transition-all ${
                    statusFilter === s
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
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
                <th className="text-left py-2 pr-4">Product</th>
                <th className="text-left py-2 pr-4">Category</th>
                <th className="text-left py-2 pr-4">Price</th>
                <th className="text-left py-2 pr-4">Stock</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400 text-sm">No products found.</td>
                </tr>
              )}
              {filtered.map((p) => {
                const isLow = parseInt(p.stock) > 0 && parseInt(p.stock) <= 5;
                return (
                  <tr
                    key={p.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition ${isLow ? "bg-orange-50/40" : ""}`}
                  >
                    {/* Product */}
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {p.image
                            // eslint-disable-next-line @next/next/no-img-element
                            ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            : <Package size={16} className="text-slate-400" />
                          }
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="py-3 pr-4 text-gray-500 text-xs">{p.category}</td>
                    {/* Price */}
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-gray-800">₹{parseInt(p.price).toLocaleString("en-IN")}</p>
                      {p.discountPrice && (
                        <p className="text-xs text-emerald-500">₹{parseInt(p.discountPrice).toLocaleString("en-IN")}</p>
                      )}
                    </td>
                    {/* Stock */}
                    <td className="py-3 pr-4">
                      <span className={`font-semibold ${isLow ? "text-orange-500" : "text-gray-700"}`}>
                        {p.stock}
                        {isLow && <span className="ml-1 text-xs font-normal text-orange-400">Low</span>}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[p.status]}`}>
                        {statusLabel[p.status]}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="py-3">
                      <div className="flex gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition" title="View">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition" title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => disableProduct(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition" title="Disable">
                          <Ban size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={closeDrawer}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  {editId ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the details below</p>
              </div>
              <button onClick={closeDrawer} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">

              {/* A. Basic Info */}
              <SectionHead icon={Info} title="Basic Info" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Product Name *">
                  <input type="text" value={form.name} onChange={set("name")} placeholder="e.g. Ola S1 Pro"
                    className={`${inputCls} ${errCls("name")}`} />
                </Field>
                <Field label="Brand *">
                  <input type="text" value={form.brand} onChange={set("brand")} placeholder="e.g. Ola Electric"
                    className={`${inputCls} ${errCls("brand")}`} />
                </Field>
                <Field label="Category *">
                  <CustomSelect
                    value={form.category}
                    onChange={(val) => { setForm((f) => ({ ...f, category: val })); setErrors((e) => ({ ...e, category: false })); }}
                    placeholder="Select category"
                    error={errors.category}
                    options={[
                      { label: "Scooter", value: "Scooter" },
                      { label: "Bike", value: "Bike" },
                      { label: "Cycle", value: "Cycle" },
                      { label: "Accessories", value: "Accessories" },
                    ]}
                  />
                </Field>
                <Field label="Status">
                  <CustomSelect
                    value={form.status}
                    onChange={(val) => setForm((f) => ({ ...f, status: val as Status }))}
                    options={[
                      { label: "Draft", value: "draft" },
                      { label: "Active", value: "active" },
                      { label: "Out of Stock", value: "out_of_stock" },
                    ]}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Description">
                    <textarea value={form.description} onChange={set("description")} placeholder="Short product description..."
                      rows={2} className={`${inputCls} resize-none`} />
                  </Field>
                </div>
              </div>

              {/* B. Pricing */}
              <SectionHead icon={Tag} title="Pricing & Inventory" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Price (₹) *">
                  <input type="number" value={form.price} onChange={set("price")} placeholder="125000"
                    className={`${inputCls} ${errCls("price")}`} />
                </Field>
                <Field label="Discount Price (₹)">
                  <input type="number" value={form.discountPrice} onChange={set("discountPrice")} placeholder="Optional"
                    className={inputCls} />
                </Field>
                <Field label="Stock Qty *">
                  <input type="number" value={form.stock} onChange={set("stock")} placeholder="50"
                    className={`${inputCls} ${errCls("stock")}`} />
                </Field>
                <Field label="SKU Code">
                  <input type="text" value={form.sku} onChange={set("sku")} placeholder="EV-OLA-001"
                    className={inputCls} />
                </Field>
              </div>

              {/* C. EV Specs */}
              <SectionHead icon={Zap} title="EV Specifications" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Range (km)">
                  <input type="text" value={form.range} onChange={set("range")} placeholder="181 km" className={inputCls} />
                </Field>
                <Field label="Battery (kWh)">
                  <input type="text" value={form.battery} onChange={set("battery")} placeholder="3.97 kWh" className={inputCls} />
                </Field>
                <Field label="Charging Time">
                  <input type="text" value={form.chargingTime} onChange={set("chargingTime")} placeholder="6.5 hrs" className={inputCls} />
                </Field>
                <Field label="Top Speed">
                  <input type="text" value={form.topSpeed} onChange={set("topSpeed")} placeholder="120 km/h" className={inputCls} />
                </Field>
              </div>

              {/* D. Images */}
              <SectionHead icon={ImagePlus} title="Product Images" />
              <ImageUploader
                images={images}
                onAdd={addFiles}
                onRemove={(i) => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                max={MAX_IMAGES}
                dragging={dragging}
                setDragging={setDragging}
                fileRef={fileRef}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={closeDrawer}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isPublishable}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
