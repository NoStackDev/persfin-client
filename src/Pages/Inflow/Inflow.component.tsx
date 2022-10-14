import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import inflows from "./inflows";
import "./Inflow.style.scss";

type Props = {};

const Inflow = (props: Props) => {
  return (
    <main>
      <section className="filter-bar-section">
        <FilterBar />
      </section>
      <section id='inflow-activity-section'>
        <ActivityCard cardTitle="Inflow" activities={inflows} />
      </section>
      <section id='distribution-chart-section'>
        <DistributionChart />
      </section>
    </main>
  );
};

export default Inflow;
