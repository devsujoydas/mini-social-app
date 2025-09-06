import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend, Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Filler);

import { Bar } from "react-chartjs-2";

const NewUsersPerMonthChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "New Users",
        data: [50, 100, 70, 90, 120, 140, 150],
        backgroundColor: "rgba(239, 68, 68, 0.7)",
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
      <h2 className="text-lg font-semibold mb-3">New Users Per Month</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default NewUsersPerMonthChart;
