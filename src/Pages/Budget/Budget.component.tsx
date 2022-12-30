import FilterBar from "../../Components/FilterBar";
import BudgetCard from "./Components/BudgetCard";
import "./Budget.style.scss";
import { useMemo, useState } from "react";
import { FetchBudgets } from "../../Queries";
import filterDate from "./helpers/filterDate";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import Spinner from "../../Components/Spinner";
import { DeleteBudget, UpdateBudget } from "../../Mutations";
import { BudgetType, TimeRangeInterface } from "../../TypeDefs";
import Modal from "../../Components/Modal";

type Props = {};

const Budget = (props: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";

  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [showMainModal, setShowMainModal] = useState<boolean>(false);
  const [selecedBudget, setSelectedBudget] = useState<BudgetType | null>(null);

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
  const updateBudgetMutation = UpdateBudget();

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
                <BudgetCard
                  budget={budget}
                  deleteMutation={deleteBudgetMutation}
                  updateMutation={updateBudgetMutation}
                  setShowMainModal={setShowMainModal}
                  setSelectedBudget={setSelectedBudget}
                />
              </div>
            );
          })}
        </section>
        <section id="distribution-chart-section">
          <CategoryChart dataset={[dateFiltered]} showFixedDateFilter />
        </section>
      </main>
      {showMainModal ? (
        <Modal
          quickActionId={4}
          setShowMainModal={setShowMainModal}
          mutation={updateBudgetMutation}
          prefillData={selecedBudget}
        />
      ) : null}
      <Spinner mutation={updateBudgetMutation} message={"updating budget"} />
      <Spinner mutation={deleteBudgetMutation} message={"deleting budget"} />
    </>
  );
};

export default Budget;
