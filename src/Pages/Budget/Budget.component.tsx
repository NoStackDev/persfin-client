import FilterBar from "../../Components/FilterBar";
import BudgetCard from "./Components/BudgetCard";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import "./Budget.style.scss";

type Props = {};

const Budget = (props: Props) => {
  return (
    <main>
      <section>
        <FilterBar showTags={true} />
      </section>
      <section className="budget-cards">
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
      </section>
      <section>
        <DistributionChart />
      </section>
    </main>
  );
};

export default Budget;
