import FilterBar from "../../Components/FilterBar";
import BudgetCard from "./Components/BudgetCard";
import "./Budget.style.scss";
import { useMemo, useState } from "react";
import { useBudgetsQuery } from "../../Queries";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import Spinner from "../../Components/Spinner";
import { DeleteBudget, UpdateBudget } from "../../Mutations";
import { BudgetType, TimeRangeInterface } from "../../TypeDefs";
import Modal from "../../Components/Modal";
import { filterByDate, filterByText } from "../../Helpers";
import { filterTag } from "./helpers";
import { Record } from "pocketbase";

type Props = {};

const Budget = (props: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [textFilter, setTextFilter] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<boolean | null>(false);
  const [showMainModal, setShowMainModal] = useState<boolean>(false);
  const [selecedBudget, setSelectedBudget] = useState<
    (BudgetType | Record) | null
  >(null);

  const { data: budgetsData } = useBudgetsQuery();

  const tagFiltered = useMemo(() => {
    return filterTag(budgetsData, tagFilter);
  }, [budgetsData, tagFilter]);

  const dateFiltered = useMemo(() => {
    return filterByDate(tagFiltered, filterRange) as BudgetType[];
  }, [tagFiltered, filterRange]);

  const textFiltered = useMemo(() => {
    return filterByText(dateFiltered, textFilter) as BudgetType[];
  }, [dateFiltered, textFilter]);

  // mutations
  const deleteBudgetMutation = DeleteBudget();
  const updateBudgetMutation = UpdateBudget();

  return (
    <>
      <main>
        <section className="filter-bar-section">
          <FilterBar
            setTextFilter={setTextFilter}
            setFilterRange={setFilterRange}
            showTags={true}
            setTagFilter={setTagFilter}
          />
        </section>
        <section id="budget-cards-section">
          {textFiltered?.map((budget) => {
            return (
              <div key={budget.id}>
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
          <CategoryChart dataset={[budgetsData]} showFixedDateFilter />
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
      <Spinner
        mutation={updateBudgetMutation}
        loadingMessage={"updating budget"}
        successMessage={"updated budget"}
        failMessage={"failed to update budget"}
      />
      <Spinner
        mutation={deleteBudgetMutation}
        loadingMessage={"deleting budget"}
        successMessage={"deleted budget"}
        failMessage={"failed to delete budget"}
      />
    </>
  );
};

export default Budget;
