import StatCard from "@/components/cards/StatCard";
import DashboardTrendChart from "@/components/charts/DashboardTrendChart";
import CityDemandShare from "@/components/cards/CityDemandShare";
import PendingVendorApprovals from "@/components/cards/PendingVendorApprovals";
import RiskAlerts from "@/components/cards/RiskAlerts";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Operations Center</h1>
        <p className="mt-1 text-sm text-gray-500">
          Admin controls scooter catalog, pricing, inventory distribution, dealer approvals, service analytics, and financial operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
        <StatCard title="TOTAL REVENUE" subLabel="SEP" value="Rs 824 Cr" growth="Up 18.4% MoM" positive={true} />
        <StatCard title="ORDERS" value="12,840" growth="Up 12.3% MoM" positive={true} />
        <StatCard title="ACTIVE DEALERS" value="450" growth="Up 8.1% MoM" positive={true} />
        <StatCard title="REGISTERED USERS" value="2.4M" growth="Up 22.5% MoM" positive={true} />
        <StatCard title="SERVICE JOBS" value="38,420" growth="Up 15.7% MoM" positive={true} dark={true} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
        <div className="xl:col-span-2">
          <DashboardTrendChart className="h-full" />
        </div>
        <div className="xl:col-span-1">
          <CityDemandShare className="h-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <PendingVendorApprovals />
        <RiskAlerts />
      </div>
    </div>
  );
}
