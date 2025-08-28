import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/produtos" className="hover:text-gray-300">Produtos</Link>
        <Link to="/vendas" className="hover:text-gray-300">Vendas</Link>
        <Link to="/clientes" className="hover:text-gray-300">Clientes</Link>
        <Link to="/configuracoes" className="hover:text-gray-300">Configurações</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
