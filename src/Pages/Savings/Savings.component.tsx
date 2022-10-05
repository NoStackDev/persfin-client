import savingsActivity from "./savingsflow";

import "./Savings.style.scss";
import FilterBar from "../../Components/FilterBar";
import ActivityCard from "../../Components/ActivityCard";
import DistributionChart from "../../Components/Charts/PieChart";
type Props = {};

const Savings = (props: Props) => {
  return (
    <div className="savings-container">
      <FilterBar />
      <main>
        <section>
          <ActivityCard cardTitle="Savings" activities={savingsActivity} />
        </section>
        <section>
          <DistributionChart />
        </section>
      </main>
    </div>
  );
};

export default Savings;
