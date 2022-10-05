import FilterBar from "../../Components/FilterBar";
import BudgetCard from "./Components/BudgetCard";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import "./Budget.style.scss"

type Props = {};

const Budget = (props: Props) => {
  return (
    <div className="budget-container">
      <FilterBar showTags={true}/>
      <main>
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

    </div>
  );
};

export default Budget;
