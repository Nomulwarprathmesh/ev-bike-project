import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  subLabel?: string;
  value: string;
  growth: string;
  positive?: boolean;
  dark?: boolean;
}

export default function StatCard({ title, subLabel, value, growth, positive = true, dark = false }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 shadow-sm flex flex-col gap-3",
        dark
          ? "bg-gradient-to-br from-[#0B1F3A] to-[#0e3460] text-white"
          : "bg-white text-gray-800"
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn("text-xs font-semibold uppercase tracking-widest", dark ? "text-slate-300" : "text-gray-400")}>
          {title}
        </span>
        {subLabel && (
          <span className={cn("text-xs font-medium", dark ? "text-slate-400" : "text-gray-400")}>
            {subLabel}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
      <p className={cn("text-sm font-medium", positive ? "text-emerald-500" : "text-red-400")}>
        {growth}
      </p>
    </div>
  );
}
