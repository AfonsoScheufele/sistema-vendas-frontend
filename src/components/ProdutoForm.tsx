import { useEffect, useState } from "react";

interface Produto {
  id?: number;
  nome: string;
  preco: number;
}

interface Props {
  produto: Produto | null;
  onSalvar: (produto: Produto) => void;
}

export default function ProdutoForm({ produto, onSalvar }: Props) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setPreco(produto.preco);
    } else {
      setNome("");
      setPreco(0);
    }
  }, [produto]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvar({ id: produto?.id, nome, preco });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      {/* Título dinâmico */}
      <h2 className="text-lg font-semibold text-gray-800 text-center">
        {produto ? "Editar Produto" : "Cadastrar Produto"}
      </h2>

      {/* Campo Nome */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          placeholder="Digite o nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition"
        />
      </div>

      {/* Campo Preço */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Preço</label>
        <input
          type="number"
          placeholder="Digite o preço"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          required
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition"
        />
      </div>

      {/* Botões */}
      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          {produto ? "Salvar Alterações" : "Cadastrar"}
        </button>
        {produto && (
          <button
            type="button"
            onClick={() => {
              setNome("");
              setPreco(0);
            }}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
