import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend ,Filler  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,Filler 
);

import { Line } from "react-chartjs-2";

const TotalUsersGrowthChart = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Total Users",
                data: [500, 650, 700, 850, 900, 1100, 1240],
                fill: false,
                borderColor: "rgba(34, 197, 94, 1)",
                tension: 0.3,
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
            <h2 className="text-lg font-semibold mb-3">Total Users Growth</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default TotalUsersGrowthChart;
