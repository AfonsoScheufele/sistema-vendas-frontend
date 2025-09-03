// src/pages/Clientes.tsx
import { useEffect, useState } from "react";
import "../index.css";

interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [novoCliente, setNovoCliente] = useState<Cliente>({ nome: "", email: "", telefone: "" });
  const [mostrarForm, setMostrarForm] = useState(false);

  // Simulando fetch de API
  useEffect(() => {
    // Aqui você pode trocar por api.get("/clientes")
    setClientes([
      { id: 1, nome: "João Silva", email: "joao@gmail.com", telefone: "11999999999" },
      { id: 2, nome: "Maria Souza", email: "maria@gmail.com", telefone: "11988888888" },
    ]);
  }, []);

  const salvarCliente = () => {
    if (!novoCliente.nome) return alert("Nome é obrigatório");
    setClientes((prev) => [...prev, { ...novoCliente, id: Date.now() }]);
    setNovoCliente({ nome: "", email: "", telefone: "" });
    setMostrarForm(false);
  };

  const deletarCliente = (id?: number) => {
    if (!id) return;
    if (!confirm("Deseja realmente excluir este cliente?")) return;
    setClientes((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Clientes</h1>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          {mostrarForm ? "Fechar" : "Novo Cliente"}
        </button>
      </div>

      {mostrarForm && (
        <div className="mb-6 bg-white p-6 rounded-xl shadow-md border">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nome"
              className="border p-2 rounded"
              value={novoCliente.nome}
              onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={novoCliente.email}
              onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Telefone"
              className="border p-2 rounded"
              value={novoCliente.telefone}
              onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
            />
            <button
              onClick={salvarCliente}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      {clientes.length === 0 ? (
        <p className="text-gray-500 mt-10 text-center">Nenhum cliente cadastrado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientes.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-all border"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{c.nome}</h2>
                <p className="text-gray-600 mt-1">{c.email}</p>
                <p className="text-gray-600">{c.telefone}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => deletarCliente(c.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
