import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Produtos from "../pages/Produtos";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<Login />} />

        {/* Rota privada para produtos */}
        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <Produtos />
            </PrivateRoute>
          }
        />

        {/* Redireciona qualquer outra rota para login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
