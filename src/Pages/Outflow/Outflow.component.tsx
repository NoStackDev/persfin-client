import ActivityCard from "../../Components/ActivityCard";
import FilterBar from "../../Components/FilterBar";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import outflows from "./outflows";

import "./Outflow.style.scss";

type Props = {};

const Outflow = (props: Props) => {
  return (
    <main>
      <section>
        <FilterBar />
      </section>
      <section>
        <ActivityCard cardTitle="Outflow" activities={outflows} />
      </section>
      <section>
        <DistributionChart />
      </section>
    </main>
  );
};

export default Outflow;
