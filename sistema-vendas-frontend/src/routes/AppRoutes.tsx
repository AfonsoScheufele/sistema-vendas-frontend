import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Produtos from "../pages/Produtos";
import Vendas from "../pages/Vendas";
import Clientes from "../pages/Clientes";
import Configuracoes from "../pages/Configuracoes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="vendas" element={<Vendas />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
    </Routes>
  );
}
