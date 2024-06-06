// src/PieChart.jsx
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ expenses }) => {
  const data = {
    labels: expenses.map((expense) => expense.name),
    datasets: [
      {
        label: "Expense ₹",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",

          "rgba(246, 133, 212, 0.3)",
          "rgba(196, 109, 144, 0)",
          "rgba(24, 108, 112, 0.9)",
          "rgba(90, 108, 163, 0.9)",
          "rgba(28, 188, 15, 0.4)",
          "rgba(234, 246, 91, 0.7)",
          "rgba(208, 107, 170, 0.5)",
          "rgba(98, 199, 41, 0.3)",
          "rgba(12, 72, 160, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",

          "rgba(246, 133, 212, 1)",
          "rgba(196, 109, 144, 1)",
          "rgba(24, 108, 112, 1)",
          "rgba(90, 108, 163, 1)",
          "rgba(28, 188, 15, 1)",
          "rgba(234, 246, 91, 1)",
          "rgba(208, 107, 170, 1)",
          "rgba(98, 199, 41, 1)",
          "rgba(12, 72, 160, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Pie data={data} />
    </>
  );
};

export default PieChart;
