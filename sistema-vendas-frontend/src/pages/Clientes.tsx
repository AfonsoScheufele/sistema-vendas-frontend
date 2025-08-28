import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Cliente } from "../types/clientes";
import ModalCliente from "../components/ModalCliente";

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState<Cliente | null>(null);

  const fetchClientes = async () => {
    const res = await api.get("/clientes");
    setClientes(res.data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEdit = (cliente: Cliente) => {
    setCurrentCliente(cliente);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este cliente?")) return;
    await api.delete(`/clientes/${id}`);
    fetchClientes();
  };

  const handleModalClose = () => {
    setCurrentCliente(null);
    setModalOpen(false);
    fetchClientes();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Novo Cliente
        </button>
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Telefone</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id} className="hover:bg-gray-100">
              <td className="p-2 border">{c.id}</td>
              <td className="p-2 border">{c.nome}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.telefone}</td>
              <td className="p-2 border">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(c)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(c.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <ModalCliente cliente={currentCliente} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Clientes;
