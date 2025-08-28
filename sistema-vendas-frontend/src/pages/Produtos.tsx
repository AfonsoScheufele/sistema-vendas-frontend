import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Produto } from "../types/produtos";
import Modal from "../components/Modal";

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduto, setCurrentProduto] = useState<Produto | null>(null);

  const fetchProdutos = async () => {
    const res = await api.get("/produtos");
    setProdutos(res.data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleEdit = (produto: Produto) => {
    setCurrentProduto(produto);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    await api.delete(`/produtos/${id}`);
    fetchProdutos();
  };

  const handleModalClose = () => {
    setCurrentProduto(null);
    setModalOpen(false);
    fetchProdutos();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Produtos</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Novo Produto
        </button>
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Preço</th>
            <th className="p-2 border">Estoque</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} className="hover:bg-gray-100">
              <td className="p-2 border">{p.id}</td>
              <td className="p-2 border">{p.nome}</td>
              <td className="p-2 border">R$ {p.preco.toFixed(2)}</td>
              <td className="p-2 border">{p.estoque}</td>
              <td className="p-2 border">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(p.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <Modal produto={currentProduto} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Produtos;
