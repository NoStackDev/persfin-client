import React from "react";
import ActivityCard from "../../Components/ActivityCard";
import InflowOutflowChart from "../../Components/Charts/LineChart/InflowOutflowChart.component";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import "./Overview.style.scss";
import recentActivities from "./recentAtivities";

type Props = {};

const Overview = (props: Props) => {
  return (
    <main>
      <section className="inflow-outflow-category-chart">
        <InflowOutflowChart />
        <CategoryChart />
      </section>
      <section>
        <ActivityCard cardTitle="Recent Activity" activities={recentActivities} />
      </section>
      <section>
        <DistributionChart />
      </section>
    </main>
  );
};

export default Overview;
