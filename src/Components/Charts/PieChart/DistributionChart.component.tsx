import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import "./DistributionChart.style.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [30000, 40000, 20000],
      backgroundColor: ["#F46E00", "#DD0408", "#F4B926"],
      borderColor: ["#F46E00", "#DD0408", "#F4B926"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
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

const DistributionChart = (props: Props) => {
  return (
    <div className="distribution-chart-container">
      <div className="card">
      <div className="top">
        <div className="duration">This month</div>
        <h2 className="title">Budget Distribution</h2>
      </div>
      <Pie data={data} options={options} />
      <div className="legend">
      <div>
          <div className="legend-top">
            <div className="color"></div>
            <div className="text">Party</div>
          </div>
          <div className="legend-bottom">
            <div className="budgeted">
              <div className="budgeted-text">Budgeted</div>
              <div className="budgeted-amount">30000</div>
            </div>
            <div className="spent">
                <div className="spent-text">Spent</div>
                <div className="spent-amount">20000</div>
            </div>
          </div>
        </div>
        <div>
          <div className="legend-top">
            <div className="color"></div>
            <div className="text">Party</div>
          </div>
          <div className="legend-bottom">
            <div className="budgeted">
              <div className="budgeted-text">Budgeted</div>
              <div className="budgeted-amount">30000</div>
            </div>
            <div className="spent">
                <div className="spent-text">Spent</div>
                <div className="spent-amount">20000</div>
            </div>
          </div>
        </div>
        <div>
          <div className="legend-top">
            <div className="color"></div>
            <div className="text">Party</div>
          </div>
          <div className="legend-bottom">
            <div className="budgeted">
              <div className="budgeted-text">Budgeted</div>
              <div className="budgeted-amount">30000</div>
            </div>
            <div className="spent">
                <div className="spent-text">Spent</div>
                <div className="spent-amount">20000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DistributionChart;
