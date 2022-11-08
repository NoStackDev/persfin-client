import React, { useEffect, useMemo, useState } from "react";
import ActivityCard from "../../Components/ActivityCard";
import InflowOutflowChart from "../../Components/Charts/LineChart/InflowOutflowChart.component";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component";
import recentActivities from "./recentAtivities";

import "./Overview.style.scss";
import { getInflows, getOutflows, getSavings } from "../../Queries";
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
  const [inflows, setInflows] = useState<Transaction[] | null>(null);
  const [outflows, setOutflows] = useState<Transaction[] | null>(null);
  const [savings, setSavings] = useState<Savings[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const inflowsArr = await getInflows("636ac4a250bbc5afa6004a8c");
        const outflowsArr = await getOutflows("636ac4a250bbc5afa6004a8c");
        const savingsArr = await getSavings("636ac4a250bbc5afa6004a8c");

        setInflows(inflowsArr);
        setOutflows(outflowsArr);
        setSavings(savingsArr);
      } catch (err: any) {
        console.log(err.message);
      }
    })();
  }, []);

  const data = useMemo(() => {
    return collateData([inflows, outflows, savings]);
  }, [inflows, outflows, savings]);

  return (
    <main>
      <section id="inflow-outflow-chart">
        <InflowOutflowChart />
      </section>
      <section id="category-chart">
        <CategoryChart />
      </section>
      <section id="recent-activity">
        <ActivityCard cardTitle="Recent Activity" activities={data.slice(0, 5)} />
      </section>
      <section id="distribution-chart">
        <DistributionChart />
      </section>
    </main>
  );
};

export default Overview;
