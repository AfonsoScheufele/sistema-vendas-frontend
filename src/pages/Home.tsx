import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Vendas</h1>
      <Link to="/produtos">Ver Produtos</Link>
    </div>
  );
}
