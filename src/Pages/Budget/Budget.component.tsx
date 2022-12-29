import FilterBar from "../../Components/FilterBar";
import BudgetCard from "./Components/BudgetCard";
import "./Budget.style.scss";
import { useMemo, useState } from "react";
import { FetchBudgets } from "../../Queries";
import filterDate from "./helpers/filterDate";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import Spinner from "../../Components/Spinner";
import { DeleteBudget } from "../../Mutations";
import { TimeRangeInterface } from "../../TypeDefs";

type Props = {};

const Budget = (props: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";

  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );

  const {
    isLoading: isLoadingBudgetsData,
    isSuccess: isSuccessBudgetsData,
    data: budgetsData,
  } = FetchBudgets(userId);

  const dateFiltered = useMemo(() => {
    return filterDate(budgetsData, filterRange);
  }, [budgetsData, filterRange]);

  // mutations
  const deleteBudgetMutation = DeleteBudget();

  return (
    <>
      <main>
        <section className="filter-bar-section">
          <FilterBar setFilterRange={setFilterRange} showTags={true} />
        </section>
        <section id="budget-cards-section">
          {dateFiltered?.map((budget) => {
            return (
              <div key={budget._id}>
                <BudgetCard budget={budget} deleteMutation={deleteBudgetMutation}/>
              </div>
            );
          })}
        </section>
        <section id="distribution-chart-section">
          {/* <DistributionChart /> */}
          <CategoryChart dataset={[dateFiltered]} showFixedDateFilter />
        </section>
      </main>
      <Spinner mutation={deleteBudgetMutation} message={"deleted"} />
    </>
  );
};

export default Budget;
