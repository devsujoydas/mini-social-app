import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,Filler 
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,Filler 
);

import { Line } from "react-chartjs-2";

const PostsCreatedPerDayChart = () => {
  const data = {
    labels: ["July 1", "July 2", "July 3", "July 4", "July 5", "July 6", "July 7"],
    datasets: [
      {
        label: "Posts Created",
        data: [12, 15, 10, 17, 20, 18, 22],
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        borderColor: "rgba(59, 130, 246, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Posts Created Per Day</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default PostsCreatedPerDayChart;
