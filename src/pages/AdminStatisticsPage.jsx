import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminStatisticsPage = () => {
  const [statistics] = useState({
    totalProducts: 20,
    acceptedProducts: 20,
    pendingProducts: 34,
    totalReviews: 10,
    totalUsers: 20,
  });

  // Prepare chart data for the pie chart
  const chartData = {
    labels: [
      "Accepted Products",
      "Pending Products",
      "All Products",
      "Reviews",
      "Users",
    ],
    datasets: [
      {
        label: "Site Statistics",
        data: [
          statistics.acceptedProducts,
          statistics.pendingProducts,
          statistics.totalProducts,
          statistics.totalReviews,
          statistics.totalUsers,
        ],
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="container  mx-auto p-4">
      <h2 className="text-xl text-black justify-center text-center font-bold mb-4">Admin Statistics</h2>
      <div className="w-full lg:pt-10 max-w-3xl mx-auto">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default AdminStatisticsPage;
