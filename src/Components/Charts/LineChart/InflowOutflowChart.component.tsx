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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const data: dataType = {
  labels: [
    "Jun",
    "Jul",
    "Aug",
    "sep",
    "oct",
    "nov",
    "dec",
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
  ],
  datasets: [
    {
      id: 1,
      label: "inflow",
      data: [1, 3, 1, 2, 4, 2, 1, 2, 3, 4, 5, 7],
      tension: 0.5,
      backgroundColor: "#49AB3B",
      borderColor: "#49AB3B",
    },
    {
      id: 2,
      label: "outflow",
      data: [4, 5, 7, 6, 3, 1, 3, 2, 4, 3, 5, 7],
      tension: 0.5,
      backgroundColor: "#EE0000",
      borderColor: "#EE0000",
    },
  ],
};

const options = {
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

type Props = {};

const InflowOutflowChart = (props: Props) => {
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
          <div className="duration">1 year</div>
        </div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default InflowOutflowChart;
