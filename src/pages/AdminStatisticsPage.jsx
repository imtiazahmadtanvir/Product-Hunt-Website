import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminStatisticsPage = () => {
  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    acceptedProducts: 0,
    pendingProducts: 0,
    totalReviews: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // Fetch statistics from backend API
    fetch("https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/admin/statistics")
      .then((res) => res.json())
      .then((data) => setStatistics(data))
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  const chartData = {
    labels: ["Accepted Products", "Pending Products", "All Products", "Reviews", "Users"],
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
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin Statistics</h2>
      <div className="w-full max-w-3xl mx-auto">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default AdminStatisticsPage;
