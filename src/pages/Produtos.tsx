import { useEffect, useState } from "react";
import api from "../api/api";
import ProdutoForm from "../components/ProdutoForm";
import "../index.css";

interface Produto {
  id?: number;
  nome: string;
  preco: number;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editProduto, setEditProduto] = useState<Produto | null>(null);

  const fetchProdutos = async () => {
    const res = await api.get("/produtos");
    setProdutos(res.data);
  };

  const salvarProduto = async (produto: Produto) => {
    if (produto.id) await api.put(`/produtos/${produto.id}`, produto);
    else await api.post("/produtos", produto);
    setEditProduto(null);
    fetchProdutos();
  };

  const deletarProduto = async (id?: number) => {
    if (!id) return;
    await api.delete(`/produtos/${id}`);
    fetchProdutos();
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Produtos</h1>
      <ProdutoForm produto={editProduto} onSalvar={salvarProduto} />
      <ul className="mt-6 space-y-3">
        {produtos.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="text-gray-700 font-medium">
              {p.nome} - R${p.preco.toFixed(2)}
            </span>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition-colors"
                onClick={() => setEditProduto(p)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                onClick={() => deletarProduto(p.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
