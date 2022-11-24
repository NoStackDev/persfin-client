import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { FetchInflows, FetchOutflows } from "../../../Queries";
import CategorySelector from "../../CategorySelector";
import DateFilterFixed from "../../DateFiter/DateFilterFixed";

import "./CategoryChart.style.scss";
import getLabelsColorsDataset from "./helpers/getLabelsColorsData";

ChartJS.register(ArcElement, Tooltip, Legend);

type Transaction = {
  title: string;
  amount: number;
  transactionType: string;
  category: TransactionCategory;
  budget: string;
  description: string;
  receiptImage: string[];
  time: string;
};

type TransactionCategory = {
  _id: string;
  title: string;
  categoryType: string;
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

const options = {
  responsive: true,
  // maintainAspectRatio: true,
  plugins: {
    legend: {
      // position: "top" as const,
      // align: "center" as const,
      display: false,
    },
    title: {
      display: false,
      text: "",
    },
  },
};

type Props = {};

const CategoryChart = (props: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";

  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("Outflow");
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

  const { inflow: inflowData, outflow: outflowData } = useMemo(() => {
    return getLabelsColorsDataset([inflowsData, outflowsData], filterRange);
  }, [inflowsData, outflowsData, filterRange]);

  const selectedData =
    selectedCategory.toLowerCase() === "inflow" ? inflowData : outflowData;

  const data = {
    labels:
      selectedCategory.toLowerCase() === "inflow"
        ? inflowData.labels
        : outflowData.labels,
    datasets: [
      {
        label: "",
        data: selectedData.amount,
        backgroundColor: selectedData.colors,
        borderColor: selectedData.colors,
        borderWidth: 0,
        cutout: "85%",
      },
    ],
  };

  return (
    <div className="category-chart">
      <div className="card">
        <div className="top">
          <DateFilterFixed setFilterRange={setFilterRange} />
          <CategorySelector setSelectedCategory={setSelectedCategory} />
        </div>
        <div className="legend-doughnut">
          <div className="legend-bar">
            {selectedData.labels.map((label, index) => {
              return (
                <div className="legend" key={index}>
                  <div
                    style={{ backgroundColor: selectedData.colors[index] }}
                  ></div>
                  <div>{label}</div>
                </div>
              );
            })}
          </div>
          {selectedData.amount.length > 0 ? (
            <Doughnut data={data} options={options} />
          ) : null}
          {/* <Doughnut data={data} options={options} /> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
