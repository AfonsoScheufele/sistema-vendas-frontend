import { FaBell, FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "Dashboard";
    if (path.startsWith("/produtos")) return "Produtos";
    if (path.startsWith("/clientes")) return "Clientes";
    return "Sistema de Vendas";
  };

  // Fecha dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Função para lidar com itens do perfil
  const handleProfileAction = (action: string) => {
    setShowProfileMenu(false);
    switch (action) {
      case "perfil":
        navigate("/perfil"); // rota para perfil do usuário
        break;
      case "configuracoes":
        navigate("/configuracoes"); // rota de configurações
        break;
      case "sair":
        // Aqui você pode limpar token / logout
        localStorage.removeItem("token"); // exemplo
        navigate("/login"); // redireciona para login
        break;
    }
  };

  return (
    <header className="flex justify-between items-center bg-[#0f172a] shadow-md px-6 py-4 border-b border-gray-700">
      <h1 className="text-xl font-bold text-white tracking-wide">{getPageTitle()}</h1>

      <div className="flex items-center gap-5 relative">
        {/* Notificações */}
        <div ref={notifRef} className="relative">
          <FaBell
            className="text-gray-300 text-xl cursor-pointer hover:text-blue-400 transition duration-200"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200 font-semibold">Notificações</div>
              <ul>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">Nova venda registrada</li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">Produto em estoque baixo</li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">Atualização disponível</li>
              </ul>
            </div>
          )}
        </div>

        {/* Perfil */}
        <div ref={profileRef} className="relative">
          <FaUserCircle
            className="text-gray-300 text-2xl cursor-pointer hover:text-blue-400 transition duration-200"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
              <ul>
                <li
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProfileAction("perfil")}
                >
                  Meu Perfil
                </li>
                <li
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProfileAction("configuracoes")}
                >
                  Configurações
                </li>
                <li
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProfileAction("sair")}
                >
                  Sair
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
