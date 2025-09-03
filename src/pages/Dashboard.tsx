import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import "../index.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("vendas");

  const vendasMensais = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      { label: "Vendas (R$)", data: [500, 1000, 750, 1250, 900, 1100], backgroundColor: "rgba(59, 130, 246, 0.7)", borderRadius: 6 },
    ],
  };

  const clientesNovos = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      { label: "Clientes Novos", data: [5, 8, 12, 6, 15, 10], backgroundColor: "rgba(147, 51, 234, 0.7)", borderRadius: 6 },
    ],
  };

  const produtosMaisVendidos = {
    labels: ["Produto A", "Produto B", "Produto C", "Produto D", "Produto E"],
    datasets: [
      { label: "Qtd Vendida", data: [120, 90, 60, 30, 15], backgroundColor: "rgba(16, 185, 129, 0.7)", borderRadius: 6 },
    ],
  };

  const faturamentoDiario = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      { label: "Faturamento Diário (R$)", data: [800, 950, 700, 1200, 1500, 400, 300], borderColor: "rgba(239, 68, 68, 0.8)", backgroundColor: "rgba(239, 68, 68, 0.3)", tension: 0.4, fill: true },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#E5E7EB", font: { weight: "500" } }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "#E5E7EB", font: { weight: "500" } }, grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  return (
    <div className="p-4 flex flex-col h-screen gap-4">
      {/* Cards KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-shrink-0">
        <div className="bg-blue-600 p-4 rounded-xl shadow-lg flex flex-col justify-center h-20">
          <span className="text-gray-100 text-sm">Total Vendas</span>
          <span className="text-white font-bold text-xl">R$ 5.500</span>
        </div>
        <div className="bg-purple-600 p-4 rounded-xl shadow-lg flex flex-col justify-center h-20">
          <span className="text-gray-100 text-sm">Clientes Ativos</span>
          <span className="text-white font-bold text-xl">135</span>
        </div>
        <div className="bg-green-600 p-4 rounded-xl shadow-lg flex flex-col justify-center h-20">
          <span className="text-gray-100 text-sm">Produtos em Estoque</span>
          <span className="text-white font-bold text-xl">540</span>
        </div>
      </div>

      {/* Botões de seção */}
      <div className="flex gap-3 flex-wrap flex-shrink-0">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${activeSection === "vendas" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setActiveSection("vendas")}
        >
          Vendas Mensais
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${activeSection === "clientes" ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setActiveSection("clientes")}
        >
          Clientes Novos
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${activeSection === "produtos" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setActiveSection("produtos")}
        >
          Produtos Mais Vendidos
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${activeSection === "faturamento" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setActiveSection("faturamento")}
        >
          Faturamento Diário
        </button>
      </div>

      {/* Gráficos */}
      <div className="flex-1 min-h-0 flex flex-col gap-4">
        {activeSection === "vendas" && (
          <div className="bg-[#1E1E2E] p-2 rounded-xl shadow-lg border border-gray-800 flex-1 flex flex-col">
            <h2 className="text-gray-200 font-semibold text-lg mb-1">Vendas Mensais</h2>
            <div className="flex-1 min-h-0">
              <Bar data={vendasMensais} options={options} />
            </div>
          </div>
        )}
        {activeSection === "clientes" && (
          <div className="bg-[#1E1E2E] p-2 rounded-xl shadow-lg border border-gray-800 flex-1 flex flex-col">
            <h2 className="text-gray-200 font-semibold text-lg mb-1">Clientes Novos por Mês</h2>
            <div className="flex-1 min-h-0">
              <Bar data={clientesNovos} options={options} />
            </div>
          </div>
        )}
        {activeSection === "produtos" && (
          <div className="bg-[#1E1E2E] p-2 rounded-xl shadow-lg border border-gray-800 flex-1 flex flex-col">
            <h2 className="text-gray-200 font-semibold text-lg mb-1">Produtos Mais Vendidos</h2>
            <div className="flex-1 min-h-0">
              <Bar data={produtosMaisVendidos} options={options} />
            </div>
          </div>
        )}
        {activeSection === "faturamento" && (
          <div className="bg-[#1E1E2E] p-2 rounded-xl shadow-lg border border-gray-800 flex-1 flex flex-col">
            <h2 className="text-gray-200 font-semibold text-lg mb-1">Faturamento Diário</h2>
            <div className="flex-1 min-h-0">
              <Line data={faturamentoDiario} options={options} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
