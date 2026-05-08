"use client";

export default function Error({ reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-500">Please retry the page.</p>
        <button onClick={reset} className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white">
          Retry
        </button>
      </div>
    </div>
  );
}
