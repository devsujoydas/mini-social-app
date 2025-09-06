import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend,Filler  } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,Filler 
);

import { Bar } from "react-chartjs-2";

const TopActiveUsersChart = () => {
  const data = {
    labels: ["User A", "User B", "User C", "User D", "User E"],
    datasets: [
      {
        label: "Posts Created",
        data: [120, 98, 86, 75, 60],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
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
      <h2 className="text-lg font-semibold mb-3">Top Active Users</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopActiveUsersChart;
