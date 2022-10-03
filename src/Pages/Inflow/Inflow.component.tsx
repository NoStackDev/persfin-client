import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import inflows from "./inflows";
import "./Inflow.style.scss";

type Props = {};

const Inflow = (props: Props) => {
  return (
    <div className="inflow-container">
      <FilterBar />

      <main>
        <section>
          <ActivityCard cardTitle="Inflow" activities={inflows} />
        </section>
        <section>
          <DistributionChart />
        </section>
      </main>
    </div>
  );
};

export default Inflow;
