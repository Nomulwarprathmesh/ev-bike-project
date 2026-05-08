"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  color?: "emerald" | "blue" | "orange" | "red";
}

const colorMap = {
  emerald: "from-slate-900 to-slate-700",
  blue: "from-slate-800 to-slate-600",
  orange: "from-slate-700 to-slate-500",
  red: "from-slate-600 to-slate-400",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
  color = "emerald",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {change !== undefined && (
              <p
                className={`text-xs font-medium mt-2 ${
                  trend === "up" ? "text-slate-600" : "text-gray-600"
                }`}
              >
                {trend === "up" ? "↑" : "↓"} {Math.abs(change)}% from last month
              </p>
            )}
          </div>
          <div className={`bg-gradient-to-br ${colorMap[color]} p-3 rounded-2xl`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
