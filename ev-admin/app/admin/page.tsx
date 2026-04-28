import StatCard from "@/components/cards/StatCard";
import DashboardTrendChart from "@/components/charts/DashboardTrendChart";
import CityDemandShare from "@/components/cards/CityDemandShare";
import PendingVendorApprovals from "@/components/cards/PendingVendorApprovals";
import RiskAlerts from "@/components/cards/RiskAlerts";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
        <StatCard title="TOTAL REVENUE" subLabel="SEP" value="₹824 Cr" growth="▲ 18.4% MoM" positive={true} />
        <StatCard title="ORDERS" value="12,840" growth="▲ 12.3% MoM" positive={true} />
        <StatCard title="ACTIVE VENDORS" value="450" growth="▲ 8.1% MoM" positive={true} />
        <StatCard title="REGISTERED USERS" value="2.4M" growth="▲ 22.5% MoM" positive={true} />
        <StatCard title="TEST RIDES" value="38,420" growth="▲ 15.7% MoM" positive={true} dark={true} />
      </div>

      {/* Row 2: Trend Chart + City Demand Share + City Demand */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
        <div className="xl:col-span-2">
          <DashboardTrendChart className="h-full" />
        </div>
        <div className="xl:col-span-1">
          <CityDemandShare className="h-full" />
        </div>
      </div>
      {/* Row 3: Pending Vendor Approvals + Risk Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <PendingVendorApprovals />
        <RiskAlerts />
      </div>
    </div>
  );
}
