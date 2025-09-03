import { useEffect, useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import api from "../api/api";
import ProdutoForm from "../components/ProdutoForm";
import "../index.css";

interface Produto {
  id?: number;
  nome: string;
  preco: number;
  descricao?: string;
  estoque?: number;
  categoria?: string;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editProduto, setEditProduto] = useState<Produto | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  // Busca produtos do backend
  const fetchProdutos = async () => {
    try {
      const res = await api.get("/produtos");
      // Converte preco para number
      const data = res.data.map((p: Produto) => ({
        ...p,
        preco: Number(p.preco) || 0,
      }));
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos", err);
      alert("Erro ao buscar produtos do servidor");
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Salvar produto (adicionar ou atualizar)
  const salvarProduto = async (produto: Produto) => {
    try {
      if (produto.id) {
        await api.put(`/produtos/${produto.id}`, produto);
      } else {
        await api.post("/produtos", produto);
      }
      setEditProduto(null);
      setMostrarForm(false);
      fetchProdutos();
    } catch (err) {
      console.error("Erro ao salvar produto", err);
      alert("Erro ao salvar produto");
    }
  };

  // Deletar produto
  const deletarProduto = async (id?: number) => {
    if (!id) return;
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      await api.delete(`/produtos/${id}`);
      fetchProdutos();
    } catch (err) {
      console.error("Erro ao excluir produto", err);
      alert("Erro ao excluir produto");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Produtos</h1>
        <button
          onClick={() => {
            setEditProduto(null);
            setMostrarForm(!mostrarForm);
          }}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <PlusCircle size={20} />
          {mostrarForm ? "Fechar" : "Novo Produto"}
        </button>
      </div>

      {mostrarForm && (
        <div className="mb-6 bg-white p-6 rounded-xl shadow-md border">
          <ProdutoForm produto={editProduto} onSalvar={salvarProduto} />
        </div>
      )}

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Nenhum produto cadastrado.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-all border"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{p.nome}</h2>
                <p className="text-gray-600 text-lg mt-1">
                  R$ {Number(p.preco).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditProduto(p);
                    setMostrarForm(true);
                  }}
                  className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  <Pencil size={16} />
                  Editar
                </button>
                <button
                  onClick={() => deletarProduto(p.id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
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
