import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import DateFilterFixed from "../../DateFiter/DateFilterFixed";
import getLabelsColorsDataset from "./helpers/getLabelsColorsData";

import "./DistributionChart.style.scss";
import { FetchBudgets } from "../../../Queries";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "bottom" as const,
      align: "start" as const,
    },
    title: {
      display: false,
      text: "",
    },
  },
};

type Props = {};

type BudgetType = {
  _id: string;
  title: string;
  total: number;
  balance: number;
  status: string;
  description: string;
  time: string;
  items: BudgetItemsType[];
};

type BudgetItemsType = {
  _id: string;
  title: string;
  amount: number;
  balance: number;
  category: string;
  description: string;
};

interface rangeInterface {
  min: Date;
  max: Date;
}

interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}

const DistributionChart = (props: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";

  const {
    isLoading: isLoadingBudgetData,
    isSuccess: isSuccessBudgetData,
    data: budgetsData,
  } = FetchBudgets(userId);

  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );

  const budgetsDataset = useMemo(() => {
    return getLabelsColorsDataset(budgetsData, filterRange);
  }, [budgetsData, filterRange]);

  const data = {
    labels: budgetsDataset.labels,
    datasets: [
      {
        label: "",
        data: budgetsDataset.totals,
        backgroundColor: budgetsDataset.colors,
        borderColor: budgetsDataset.colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="distribution-chart-container">
      <div className="card">
        <div className="top">
          {/* <div className="duration">This month</div> */}
          <DateFilterFixed setFilterRange={setFilterRange} />
          <h2 className="title">Budget</h2>
        </div>

        <div className="bottom">
          <Pie data={data} options={options} />
          {budgetsDataset.budgetDataset.map((budget, index) => {
            return (
              <div className="legend" key={index}>
                <div>
                  <div className="legend-top">
                    <div
                      className="color"
                      style={{ backgroundColor: budgetsDataset.colors[index] }}
                    ></div>
                    <div className="text">{budgetsDataset.labels[index]}</div>
                  </div>
                  <div className="legend-bottom">
                    <div className="budgeted">
                      <div className="budgeted-text">Budgeted</div>
                      <div className="budgeted-amount">{budget.total}</div>
                    </div>
                    <div className="spent">
                      <div className="spent-text">Balance</div>
                      <div className="spent-amount">{budget.balance}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DistributionChart;
