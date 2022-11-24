import { useMemo, useState } from "react";
import DateFilterFixed from "../../DateFiter/DateFilterFixed";
import getLabelsAndDataset from "./helper/getLabelsAndDataset";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./InflowOutflowChart.style.scss";
import { FetchInflows, FetchOutflows } from "../../../Queries";

interface rangeInterface {
  min: Date;
  max: Date;
}

interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Transaction = {
  title: string;
  amount: number;
  transactionType: string;
  category: string;
  budget: string;
  description: string;
  receiptImage: string[];
  time: string;
};

interface datasetType {
  id: number;
  label: string;
  data: number[];
  tension?: number;
  backgroundColor?: string;
  borderColor?: string;
}

interface dataType {
  labels: string[];
  datasets: datasetType[];
}

type Props = {};

const InflowOutflowChart = (props: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );

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

  const { labels: labelsArr, data: dataArr } = useMemo(() => {
    return getLabelsAndDataset([inflowsData, outflowsData], filterRange);
  }, [inflowsData, outflowsData, filterRange]);

  const data: dataType = {
    labels: labelsArr,
    datasets: [
      {
        id: 1,
        label: "inflow",
        data: dataArr[0],
        tension: 0.5,
        backgroundColor: "#49AB3B",
        borderColor: "#49AB3B",
      },
      {
        id: 2,
        label: "outflow",
        data: dataArr[1],
        tension: 0.5,
        backgroundColor: "#EE0000",
        borderColor: "#EE0000",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
        align: "start" as const,
      },
      title: {
        display: false,
        text: "",
      },
    },
  };

  return (
    <div className="inflow-outflow-chart">
      <div className="card">
        <div className="top">
          <div className="legend">
            <div className="inflow-legend">
              <div className="legend-color"></div>
              <div className="legend-text">inflow</div>
            </div>
            <div className="outflow-legend">
              <div className="legend-color"></div>
              <div className="legend-text">outflow</div>
            </div>
          </div>
          <DateFilterFixed setFilterRange={setFilterRange} />
        </div>
        <div className="chart">
          <div className="chart-container">
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InflowOutflowChart;
