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
      className="bg-white p-6 rounded-lg shadow flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(Number(e.target.value))}
        required
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
      >
        Salvar
      </button>
    </form>
  );
}
