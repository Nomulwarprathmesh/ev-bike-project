import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function StockSummaryCard({ label, value, icon: Icon, color }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
