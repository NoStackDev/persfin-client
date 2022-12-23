import React, { useEffect, useMemo, useState } from "react";
import ActivityCard from "../../Components/ActivityCard";
import InflowOutflowChart from "../../Components/Charts/LineChart/InflowOutflowChart.component";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import Spinner from "../../Components/Spinners";

import "./Overview.style.scss";
import {
  FetchSavings,
  FetchInflows,
  FetchOutflows,
  FetchBudgets,
} from "../../Queries";
import collateData from "./helpers";
import BudgetCard from "../Budget/Components/BudgetCard";
import { DeleteBudget } from "../../Mutations";

type Props = {};

type Transaction = {
  _id: string;
  title: string;
  amount: number;
  category: {
    _id: string;
    title: string;
    categoryType: string;
  };
  budget: string;
  description: string;
  receiptImage: string[];
  time: string;
  createdAt: Date;
  modelType: string;
};

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
  completed: boolean;
}

type Savings = {
  _id: string;
  amount: number;
  time: string;
  modelType: string;
};

const Overview = (props: Props) => {
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
            activities={data.slice(0, 5)}
          />
        </section>
        <section id="budgets">
          {budgetsData?.map((budget: BudgetInterface) => {
            return (
              <BudgetCard
                budget={budget}
                key={budget._id}
                deleteMutation={deleteBudgetMutation}
              />
            );
          })}
        </section>
      </main>
      <Spinner
        mutation={deleteBudgetMutation}
        message={"Deleting budget"}
      />
    </>
  );
};

export default Overview;
