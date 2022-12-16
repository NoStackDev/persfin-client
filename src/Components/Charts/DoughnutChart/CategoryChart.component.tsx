import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { FetchInflows, FetchOutflows } from "../../../Queries";
import CategorySelector from "../../CategorySelector";
import DateFilterFixed from "../../DateFiter/DateFilterFixed";

import "./CategoryChart.style.scss";
import generateLabelsColorsAmount from "./helpers/generateLabelsColorsAmount";

ChartJS.register(ArcElement, Tooltip, Legend);

type InflowType = {
  _id: string;
  title: string;
  amount: number;
  category: CategoryType;
  description: string;
  time: string;
  createdAt: string;
  modelType: string;
};

type OutflowType = {
  _id: string;
  title: string;
  amount: number;
  category: CategoryType;
  budget: string;
  item: string;
  description: string;
  receiptImage: string[];
  time: string;
  createdAt: string;
  modelType: string;
};

type BudgetType = {
  _id: string;
  title: string;
  total: number;
  balance: number;
  status: string;
  description: string;
  items: BudgetItemType[];
  time: string;
  completed: boolean;
  createdAt: string;
  modelType: string;
};

type BudgetItemType = {
  _id: string;
  title: string;
  amount: number;
  category: string;
  balance: number;
  description: string;
};

type CategoryType = {
  _id: string;
  title: string;
  categoryType: string;
  description: string;
  createdAt: string;
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

type Props = {
  dataset: Array<InflowType[] | OutflowType[] | BudgetType[]|null>;
  showFixedDateFilter: boolean;
  heading?: string;
  category?: boolean
};

const CategoryChart = ({ dataset, showFixedDateFilter, heading, category }: Props) => {

  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const labelsColorsAmount = useMemo(() => {
    return generateLabelsColorsAmount(dataset, filterRange, category);
  }, [dataset, filterRange]);

  const selectedData = selectedCategory? labelsColorsAmount[selectedCategory]: null

  const data = {
    labels:
      selectedData? selectedData.labels: [],
    datasets: [
      {
        label: "",
        data: selectedData? selectedData.amount : [],
        backgroundColor: selectedData? selectedData.colors : [],
        borderColor: selectedData? selectedData.colors : [],
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
          <CategorySelector categories={Object.keys(labelsColorsAmount)} setSelectedCategory={setSelectedCategory} />
        </div>
        <div className="legend-doughnut">
          <div className="legend-bar">
            {selectedData?.labels.map((label, index) => {
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
          {selectedData ? (
            <Doughnut data={data} options={options} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
