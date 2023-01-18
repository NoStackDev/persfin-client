import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import CategorySelector from "../../CategorySelector";
import DateFilterFixed from "../../DateFiter/DateFilterFixed";

import {
  InflowType,
  OutflowType,
  BudgetType,
  TimeRangeInterface,
} from "../../../TypeDefs";

import "./CategoryChart.style.scss";
import generateLabelsColorsAmount from "./helpers/generateLabelsColorsAmount";
import { Record } from "pocketbase";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  dataset: Array<
    | (InflowType | Record)[]
    | (OutflowType | Record)[]
    | (BudgetType | Record)[]
    | undefined
  >;
  showFixedDateFilter: boolean;
  heading?: string;
  category?: boolean;
};

const CategoryChart = ({
  dataset,
  showFixedDateFilter,
  heading,
  category,
}: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const labelsColorsAmount = useMemo(() => {
    return generateLabelsColorsAmount(dataset, filterRange, category);
  }, [dataset, filterRange, category]);

  const selectedData = selectedCategory
    ? labelsColorsAmount[selectedCategory]
    : null;

  const data = {
    labels: selectedData ? selectedData.labels : [],
    datasets: [
      {
        label: "",
        data: selectedData ? selectedData.amount : [],
        backgroundColor: selectedData ? selectedData.colors : [],
        borderColor: selectedData ? selectedData.colors : [],
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
          <CategorySelector
            categories={Object.keys(labelsColorsAmount)}
            setSelectedCategory={setSelectedCategory}
          />
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
          {selectedData ? <Doughnut data={data} options={options} /> : null}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
