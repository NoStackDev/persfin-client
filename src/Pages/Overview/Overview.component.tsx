import React, { useEffect, useMemo, useState } from "react";
import ActivityCard from "../../Components/ActivityCard";
import InflowOutflowChart from "../../Components/Charts/LineChart/InflowOutflowChart.component";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";

import "./Overview.style.scss";
import { FetchSavings, FetchInflows, FetchOutflows } from "../../Queries";
import collateData from "./helpers";

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

  const data = useMemo(() => {
    return collateData([inflowsData, outflowsData, savingsData]);
  }, [inflowsData, outflowsData, savingsData]);

  return (
    <main>
      <section id="inflow-outflow-chart">
        <InflowOutflowChart />
      </section>
      <section id="category-chart">
        <CategoryChart />
      </section>
      <section id="recent-activity">
        <ActivityCard
          cardTitle="Recent Activity"
          activities={data.slice(0, 5)}
        />
      </section>
      <section id="distribution-chart">
        <DistributionChart />
      </section>
    </main>
  );
};

export default Overview;
