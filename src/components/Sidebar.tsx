import { NavLink } from "react-router-dom";
import { FaHome, FaBox, FaUsers } from "react-icons/fa";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Produtos", icon: <FaBox />, path: "/produtos" },
    { name: "Clientes", icon: <FaUsers />, path: "/clientes" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      <div className="text-2xl font-bold p-6">Sistema Vendas</div>
      <nav className="flex-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            {link.icon} {link.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-6 text-sm text-gray-400">© 2025 Afonso</div>
    </aside>
  );
}
