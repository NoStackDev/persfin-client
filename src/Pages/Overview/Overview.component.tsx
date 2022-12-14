import React, { useEffect, useMemo, useState } from "react";
import ActivityCard from "../../Components/ActivityCard";
import InflowOutflowChart from "../../Components/Charts/LineChart/InflowOutflowChart.component";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import Spinner from "../../Components/Spinner";

import "./Overview.style.scss";
import {
  FetchSavings,
  FetchInflows,
  FetchOutflows,
  FetchBudgets,
} from "../../Queries";
import collateData from "./helpers";
import BudgetCard from "../Budget/Components/BudgetCard";
import { DeleteBudget, UpdateBudget } from "../../Mutations";
import { BudgetType } from "../../TypeDefs";
import Modal from "../../Components/Modal";

type Props = {};

const Overview = (props: Props) => {
  const [showMainModal, setShowMainModal] = useState<boolean>(false);
  const [selecedBudget, setSelectedBudget] = useState<BudgetType | null>(null);

  const userId = "636ac4a250bbc5afa6004a8c";
  const {
    isLoading: isLoadingInflowsData,
    isSuccess: isSuccessInflowsData,
    data: inflowsData,
  } = FetchInflows(userId);
  const {
    isLoading: isLoadingOutflowsData,
    isSuccess: isSuccessOutflowsData,
    data: outflowsData,
  } = FetchOutflows(userId);

  const {
    isLoading: isLoadingSavingsData,
    isSuccess: isSuccessSavingsData,
    data: savingsData,
  } = FetchSavings(userId);

  const {
    isLoading: isLoadingBudgetsData,
    isSuccess: isSuccessBudgetsData,
    data: budgetsData,
  } = FetchBudgets(userId);

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
            category
          />
        </section>
        <section id="recent-activity">
          <ActivityCard
            cardTitle="Recent Activity"
            activities={data.slice(0, 25)}
          />
        </section>
        <section id="budgets">
          {budgetsData?.map((budget: BudgetType) => {
            return (
              <BudgetCard
                budget={budget}
                key={budget._id}
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
      ) : null}{" "}
      <Spinner mutation={updateBudgetMutation} message={"updating budget"} />
      <Spinner mutation={deleteBudgetMutation} message={"deleting budget"} />
    </>
  );
};

export default Overview;
