import { useEffect, useMemo, useState } from "react";


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

import { getActivities } from "../../../Queries";

import calculateAmount from "./helper/calculateAmount";

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

type Transaction = {
  title: string;
  amount: number;
  transactionType: string;
  category: string;
  budget: string;
  description: string;
  receiptImage: string[];
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

  const [transactions, setTransactions] = useState<null | Array<Transaction>>(
    null
  );

  const { inflowArray, outflowArray } = useMemo(
    () => calculateAmount(transactions),
    [transactions]
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getActivities("634f17f5fbf2c4979f8839be");
        setTransactions(data?.data.data.transactions);
      } catch (err: any) {
        console.log(err.message);
      }
    })();
  }, []);

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
        data: inflowArray,
        tension: 0.5,
        backgroundColor: "#49AB3B",
        borderColor: "#49AB3B",
      },
      {
        id: 2,
        label: "outflow",
        data: outflowArray,
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
