import { useMemo, useState } from "react";
import ActivityCard from "../../Components/ActivityCard";
import InflowOutflowChart from "../../Components/Charts/LineChart/InflowOutflowChart.component";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import Spinner from "../../Components/Spinner";

import "./Overview.style.scss";
import {
  useSavingsQuery,
  useInflowsQuery,
  useOutlflowsQuery,
  useBudgetsQuery,
} from "../../Queries";
import collateData from "./helpers";
import BudgetCard from "../Budget/Components/BudgetCard";
import { DeleteBudget, UpdateBudget } from "../../Mutations";
import { BudgetType } from "../../TypeDefs";
import Modal from "../../Components/Modal";
import { Record } from "pocketbase";

type Props = {};

const Overview = (props: Props) => {
  const [showMainModal, setShowMainModal] = useState<boolean>(false);
  const [selecedBudget, setSelectedBudget] = useState<
    (BudgetType | Record) | null
  >(null);

  // queries
  const { data: inflowsData } = useInflowsQuery();
  const { data: outflowsData } = useOutlflowsQuery();
  const { data: savingsData } = useSavingsQuery();
  const { data: budgetsData } = useBudgetsQuery();

  const data = useMemo(() => {
    return collateData([inflowsData, outflowsData, savingsData]);
  }, [inflowsData, outflowsData, savingsData]);

  // mutations
  const deleteBudgetMutation = DeleteBudget();
  const updateBudgetMutation = UpdateBudget();

  return (
    <>
      <main>
        <section id="inflow-outflow-chart">
          <InflowOutflowChart />
        </section>
        <section id="category-chart">
          <CategoryChart
            dataset={[inflowsData, outflowsData]}
            showFixedDateFilter={true}
          />
        </section>
        <section id="recent-activity">
          <ActivityCard
            cardTitle="Recent Activity"
            activities={data.slice(0, 25)}
          />
        </section>
        <section id="budgets">
          {budgetsData?.map((budget) => {
            if (budget.exhausted) return null;
            return (
              <BudgetCard
                budget={budget}
                key={budget.id}
                deleteMutation={deleteBudgetMutation}
                updateMutation={updateBudgetMutation}
                setShowMainModal={setShowMainModal}
                setSelectedBudget={setSelectedBudget}
              />
            );
          })}
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

export default Overview;
