import React from "react";
import ActivityCard from "../../Components/Cards/ActivityCard";
import InflowOutflowChart from "../../Components/Charts/LineChart/InflowOutflowChart.component";

import "./Overview.style.scss";
import recentActivities from "./recentAtivities";

type Props = {};

const Overview = (props: Props) => {
  return (
    <main>
      <section className="activity-container">
        <ActivityCard cardTitle="Activity" activities={recentActivities} />
      </section>
      <section className="inflow-outflow-chart">
        <InflowOutflowChart />
      </section>
    </main>
  );
};

export default Overview;
