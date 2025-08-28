import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Venda } from "../types/vendas";
import Modal from "../components/ModalVenda";

const Vendas: React.FC = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVenda, setCurrentVenda] = useState<Venda | null>(null);

  const fetchVendas = async () => {
    const res = await api.get("/vendas");
    setVendas(res.data);
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  const handleEdit = (venda: Venda) => {
    setCurrentVenda(venda);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir esta venda?")) return;
    await api.delete(`/vendas/${id}`);
    fetchVendas();
  };

  const handleModalClose = () => {
    setCurrentVenda(null);
    setModalOpen(false);
    fetchVendas();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vendas</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Nova Venda
        </button>
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Vendedor</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((v) => (
            <tr key={v.id} className="hover:bg-gray-100">
              <td className="p-2 border">{v.id}</td>
              <td className="p-2 border">{v.clienteNome}</td>
              <td className="p-2 border">{v.vendedorNome}</td>
              <td className="p-2 border">R$ {v.total.toFixed(2)}</td>
              <td className="p-2 border">{new Date(v.data).toLocaleDateString()}</td>
              <td className="p-2 border">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(v)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(v.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && <Modal venda={currentVenda} onClose={handleModalClose} />}
    </div>
  );
};

export default Vendas;
