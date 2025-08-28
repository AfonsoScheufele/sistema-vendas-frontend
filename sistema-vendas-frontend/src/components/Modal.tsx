import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Produto } from "../types/produtos";

interface ModalProps {
  produto?: Produto | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ produto, onClose }) => {
  const [nome, setNome] = useState(produto?.nome || "");
  const [preco, setPreco] = useState(produto?.preco || 0);
  const [estoque, setEstoque] = useState(produto?.estoque || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (produto) {
      await api.put(`/produtos/${produto.id}`, { nome, preco, estoque });
    } else {
      await api.post("/produtos", { nome, preco, estoque });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 shadow">
        <h2 className="text-xl font-bold mb-4">
          {produto ? "Editar Produto" : "Novo Produto"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nome"
            className="border p-2"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            className="border p-2"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            required
          />
          <input
            type="number"
            placeholder="Estoque"
            className="border p-2"
            value={estoque}
            onChange={(e) => setEstoque(Number(e.target.value))}
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
