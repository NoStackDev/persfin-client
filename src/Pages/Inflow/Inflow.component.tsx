import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import inflows from "./inflows";
import "./Inflow.style.scss";

type Props = {};

const Inflow = (props: Props) => {
  return (
    <main>
      <section>
        <FilterBar />
      </section>
      <section>
        <ActivityCard cardTitle="Inflow" activities={inflows} />
      </section>
      <section>
        <DistributionChart />
      </section>
    </main>
  );
};

export default Inflow;
