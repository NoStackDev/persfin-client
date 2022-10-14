import FilterBar from "../../Components/FilterBar";
import BudgetCard from "./Components/BudgetCard";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import "./Budget.style.scss";

type Props = {};

const Budget = (props: Props) => {
  return (
    <main>
      <section className="filter-bar-section">
        <FilterBar showTags={true} />
      </section>
      <section id="budget-cards-section">
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
      </section>
      <section id='distribution-chart-section'>
        <DistributionChart />
      </section>
    </main>
  );
};

export default Budget;
