import DashboardLayout from "../components/DashboardLayout";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "../index.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Vendas",
        data: [500, 1000, 750, 1250, 900],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold text-gray-700 mb-2">Total Vendas</h2>
          <p className="text-2xl">R$ 4.400</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold text-gray-700 mb-2">Clientes Ativos</h2>
          <p className="text-2xl">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <Bar data={data} />
        </div>
      </div>
    </DashboardLayout>
  );
}
