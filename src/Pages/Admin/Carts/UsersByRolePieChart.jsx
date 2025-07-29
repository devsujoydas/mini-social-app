import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UsersByRolePieChart = ({ adminCount = 1, userCount = 1200,  }) => {
  const data = {
    labels: ["Admin", "User"],
    datasets: [
      {
        label: "Users by Role",
        data: [adminCount, userCount],
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)",   // red
          "rgba(59, 130, 246, 0.7)",  // blue
          "rgba(34, 197, 94, 0.7)"    // green
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Users by Role</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default UsersByRolePieChart;
