import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaClipboard,
  FaCogs,
  FaTruck,
  FaFileAlt,
  FaChartBar,
  FaShoppingCart,
  FaDollarSign,
  FaWarehouse,
  FaTags,
  FaMoneyCheckAlt,
  FaGift,
  FaTruckLoading,
} from "react-icons/fa";
import logo from "../assets/logo.png";

interface MenuItem {
  name: string;
  to?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export default function Sidebar() {
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const menu: MenuItem[] = [
    { name: "Dashboard", to: "/dashboard", icon: <FaHome /> },

    // VENDAS
    {
      name: "VENDAS",
      icon: <FaShoppingCart />,
      children: [
        { name: "Pedidos", to: "/vendas/pedidos" },
        { name: "Orçamentos", to: "/vendas/orcamentos" },
        { name: "Clientes", to: "/vendas/clientes" },
        { name: "Fornecedores", to: "/vendas/fornecedores" },
        { name: "Produtos", to: "/vendas/produtos" },
        { name: "Categorias", to: "/vendas/categorias" },
        { name: "Promoções", to: "/vendas/promocoes" },
      ],
    },

    // ESTOQUE
    {
      name: "ESTOQUE",
      icon: <FaWarehouse />,
      children: [
        { name: "Produtos em Estoque", to: "/estoque/produtos" },
        { name: "Movimentações", to: "/estoque/movimentacoes" },
        { name: "Transferências", to: "/estoque/transferencias" },
        { name: "Ajustes", to: "/estoque/ajustes" },
        { name: "Validade / Lotes", to: "/estoque/lotes" },
        { name: "Fornecedores", to: "/estoque/fornecedores" },
      ],
    },

    // FINANCEIRO
    {
      name: "FINANCEIRO",
      icon: <FaDollarSign />,
      children: [
        { name: "Contas a Receber", to: "/financeiro/receber" },
        { name: "Contas a Pagar", to: "/financeiro/pagar" },
        { name: "Fluxo de Caixa", to: "/financeiro/fluxo" },
        { name: "Caixas / Bancos", to: "/financeiro/caixas" },
        { name: "Faturas", to: "/financeiro/faturas" },
        { name: "Comissões", to: "/financeiro/comissoes" },
      ],
    },

    // LOGÍSTICA
    {
      name: "LOGÍSTICA",
      icon: <FaTruckLoading />,
      children: [
        { name: "Expedição", to: "/logistica/expedicao" },
        { name: "Transportadoras", to: "/logistica/transportadoras" },
        { name: "Roteiros", to: "/logistica/roteiros" },
        { name: "Pedidos Entregues", to: "/logistica/pedidos-entregues" },
        { name: "Pedidos Pendentes", to: "/logistica/pedidos-pendentes" },
      ],
    },

    // RELATÓRIOS
    {
      name: "RELATÓRIOS",
      icon: <FaFileAlt />,
      children: [
        { name: "Vendas por Período", to: "/relatorios/vendas-periodo" },
        { name: "Clientes Ativos", to: "/relatorios/clientes-ativos" },
        { name: "Estoque Atual", to: "/relatorios/estoque-atual" },
        { name: "Financeiro", to: "/relatorios/financeiro" },
        { name: "Comissões", to: "/relatorios/comissoes" },
        { name: "Performance Vendedores", to: "/relatorios/performance-vendedores" },
      ],
    },

    // CONFIGURAÇÕES
    {
      name: "CONFIGURAÇÕES",
      icon: <FaCogs />,
      children: [
        { name: "Usuários", to: "/configuracoes/usuarios" },
        { name: "Perfis de Usuário", to: "/configuracoes/perfis" },
        { name: "Formas de Pagamento", to: "/configuracoes/formas-pagamento" },
        { name: "Transportadoras", to: "/configuracoes/transportadoras" },
        { name: "Impostos / Taxas", to: "/configuracoes/impostos" },
        { name: "Parâmetros Gerais", to: "/configuracoes/gerais" },
      ],
    },
  ];

  const renderMenu = (items: MenuItem[], level = 0) =>
    items.map((item) => (
      <div key={item.name} className={`pl-${level * 4}`}>
        {item.children ? (
          <>
            <button
              onClick={() => toggleGroup(item.name)}
              className="flex items-center justify-between w-full px-6 py-2 text-left text-gray-300 hover:bg-gray-700 rounded-md transition"
            >
              <span className="flex items-center gap-2">{item.icon} {item.name}</span>
              <span>{openGroups[item.name] ? "▲" : "▼"}</span>
            </button>
            {openGroups[item.name] && (
              <div className="ml-4 mt-1 space-y-1">{renderMenu(item.children!, level + 1)}</div>
            )}
          </>
        ) : (
          <NavLink
            to={item.to!}
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            {item.icon} {item.name}
          </NavLink>
        )}
      </div>
    ));

  return (
    <aside className="w-64 bg-[#0f172a] text-white min-h-screen flex flex-col shadow-xl border-r border-gray-700">
      <div className="p-6 flex items-center justify-center">
        <img src={logo} alt="Logo do Sistema" className="h-20 w-auto max-w-[160px] object-contain drop-shadow-md" />
      </div>
      <nav className="flex-1 mt-4 space-y-1 overflow-y-auto">{renderMenu(menu)}</nav>
    </aside>
  );
}
