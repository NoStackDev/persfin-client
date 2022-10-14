import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import "./CategoryChart.style.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Transportation", "Food", "Utilities"],
  datasets: [
    {
      label: "# of Votes",
      data: [3000, 6000, 4000],
      backgroundColor: ["#F46E00", "#DD0408", "#F1F546"],
      borderColor: ["#F46E00", "#DD0408", "#F1F546"],
      borderWidth: 0,
      cutout: "85%",
    },
  ],
};

const options = {
  responsive: true,
  // maintainAspectRatio: false,
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

const CategoryChart = (props: Props) => {
  return (
    <div className="category-chart">
      <div className="card">
        <div className="top">
          <div className="duration">This month</div>
          <div className="category">
            <h2 className="title">Outflow</h2>
          </div>
        </div>
        <div className="legend-doughnut">
          <div className="legend-bar">
            <div className="legend">
              <div></div>
              <div>Transportation</div>
            </div>
            <div className="legend">
              <div></div>
              <div>Food</div>
            </div>
            <div className="legend">
              <div></div>
              <div>Utilities</div>
            </div>
          </div>

          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
