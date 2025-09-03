import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Conteúdo */}
        <main className="flex-1 bg-gray-100 px-4 py-3 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-4 min-h-[calc(100vh-64px)]">
            {children ?? <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
