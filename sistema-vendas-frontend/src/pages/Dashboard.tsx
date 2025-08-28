import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Venda } from "../types/vendas";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard: React.FC = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    api.get("/vendas").then(res => setVendas(res.data));
  }, []);

  const vendasPorCliente = vendas.reduce<{ name: string; total: number }[]>((acc, v) => {
    const cliente = acc.find(c => c.name === v.clienteNome);
    if (cliente) {
      cliente.total += v.total;
    } else {
      acc.push({ name: v.clienteNome, total: v.total });
    }
    return acc;
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">Total Vendas: {vendas.length}</div>
        <div className="bg-white p-4 rounded shadow">
          Clientes Ativos: {Array.from(new Set(vendas.map(v => v.clienteNome))).length}
        </div>
        <div className="bg-white p-4 rounded shadow">
          Total Receita: R$ {vendas.reduce((acc, v) => acc + v.total, 0).toFixed(2)}
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-2">Vendas por Cliente</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vendasPorCliente}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
