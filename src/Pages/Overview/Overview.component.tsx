import React from "react";
import ActivityCard from "../../Components/ActivityCard";
import InflowOutflowChart from "../../Components/Charts/LineChart/InflowOutflowChart.component";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";
import recentActivities from "./recentAtivities";

import "./Overview.style.scss";
import QuickActionBar from "../../Components/QuickActionBar";

type Props = {};

const Overview = (props: Props) => {
  return (
    <main>
      <QuickActionBar />
      <section>
        <InflowOutflowChart />
      </section>
      <section>
        <CategoryChart />
      </section>
      <section>
        <ActivityCard
          cardTitle="Recent Activity"
          activities={recentActivities}
        />
      </section>
      <section>
        <DistributionChart />
      </section>
    </main>
  );
};

export default Overview;
