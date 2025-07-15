import React from "react";
import { ActivityChart } from "./component/activity-chart";
import { MetricCard } from "@/components/custom/metric-card";

export default function Overview() {
  return (
    <section className="p-5 relative space-y-5">
      <div className="bg-white px-5 py-7 grid md:grid-cols-2 gap-x-3 gap-y-5 rounded-ms">
        <MetricCard
          title={"total users"}
          value={"300"}
          transactions="120 Active Users"
        />
        <MetricCard
          title={"total profit"}
          value={"N10,000.00"}
          icon="sell"
          transactions="100 Transactions"
        />
        <MetricCard title={"Total Customers"} value={"400"} transactions=" " />
        <MetricCard
          title={"Total transaction Value"}
          value={"N60,000.00"}
          transactions="2340 Transactions"
        />
      </div>
      <ActivityChart />
    </section>
  );
}
