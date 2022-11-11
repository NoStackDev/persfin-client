import FilterBar from "../../Components/FilterBar";
import BudgetCard from "./Components/BudgetCard";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import "./Budget.style.scss";
import { useEffect, useMemo, useState } from "react";
import { getBudgets } from "../../Queries";
import filterDate from "./helpers/filterDate";

interface rangeInterface {
  min: Date;
  max: Date;
}

interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}

interface BudgetInterface {
  _id: string;
  title: string;
  balance: number;
  total: number;
  time: string;
  items: {
    _id: string;
    title: string;
    amount: number;
    balance: number;
    category: string;
  }[];
  modelType: string;
}

type Props = {};

const Budget = (props: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [budgets, setBudgets] = useState<BudgetInterface[] | null>(null);

  const dateFiltered = useMemo(() => {
    return filterDate(budgets, filterRange);
  }, [budgets, filterRange]);

  useEffect(() => {
    (async () => {
      try {
        const budgetArr = await getBudgets("636ac4a250bbc5afa6004a8c");
        setBudgets(budgetArr);
      } catch (err: any) {
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <main>
      <section className="filter-bar-section">
        <FilterBar setFilterRange={setFilterRange} showTags={true} />
      </section>
      <section id="budget-cards-section">
        {dateFiltered?.map((budget) => {
          return (
            <div key={budget._id}>
              <BudgetCard budget={budget} />
            </div>
          );
        })}
      </section>
      <section id="distribution-chart-section">
        <DistributionChart />
      </section>
    </main>
  );
};

export default Budget;
