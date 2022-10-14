import React from "react";
import ActivityCard from "../../Components/ActivityCard";
import InflowOutflowChart from "../../Components/Charts/LineChart/InflowOutflowChart.component";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";
import recentActivities from "./recentAtivities";

import "./Overview.style.scss";

type Props = {};

const Overview = (props: Props) => {
  return (
    <main>
      <section id="inflow-outflow-chart">
        <InflowOutflowChart />
      </section>
      <section id="category-chart">
        <CategoryChart />
      </section>
      <section id="recent-activity">
        <ActivityCard
          cardTitle="Recent Activity"
          activities={recentActivities}
        />
      </section>
      <section id="distribution-chart">
        <DistributionChart />
      </section>
    </main>
  );
};

export default Overview;
