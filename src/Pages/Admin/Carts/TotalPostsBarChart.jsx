import React, { useContext, useMemo } from "react";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TotalPostsBarChart = ({ labels, postCounts }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Total Posts",
        data: postCounts,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Total Posts Per Month</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

const PostsChartWrapper = () => {
  const { postsData } = useContext(AuthContext);

  const { labels, counts } = useMemo(() => {
    const countsMap = {};

    postsData?.forEach(post => {
      const date = new Date(post.createdDate);
      if (isNaN(date)) return;

      const label = date.toLocaleString("en-US", { month: "short", year: "numeric" });
      countsMap[label] = (countsMap[label] || 0) + 1;
    });

    const sortedLabels = Object.keys(countsMap).sort((a, b) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");
      const dateA = new Date(`${monthA} 1, ${yearA}`);
      const dateB = new Date(`${monthB} 1, ${yearB}`);
      return dateA - dateB;
    });

    const sortedCounts = sortedLabels.map(label => countsMap[label]);

    return { labels: sortedLabels, counts: sortedCounts };
  }, [postsData]);

  if (!postsData || postsData.length === 0) {
    return <p className="text-gray-600">No posts data available to display.</p>;
  }

  return <TotalPostsBarChart labels={labels} postCounts={counts} />;
};

export default TotalPostsBarChart;
