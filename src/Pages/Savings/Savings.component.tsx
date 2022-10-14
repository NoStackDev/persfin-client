import savingsActivity from "./savingsflow";

import "./Savings.style.scss";
import FilterBar from "../../Components/FilterBar";
import ActivityCard from "../../Components/ActivityCard";
import DistributionChart from "../../Components/Charts/PieChart";
type Props = {};

const Savings = (props: Props) => {
  return (
    <main>
      <section className="filter-bar-section">
        <FilterBar />
      </section>
      <section id='savings-activity-section'>
        <ActivityCard cardTitle="Savings" activities={savingsActivity} />
      </section>
      <section id='distribution-chart-section'>
        <DistributionChart />
      </section>
    </main>
  );
};

export default Savings;
