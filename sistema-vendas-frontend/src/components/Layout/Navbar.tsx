import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow">
      <h1 className="text-xl font-bold">Sistema de Vendas</h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => auth?.logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
