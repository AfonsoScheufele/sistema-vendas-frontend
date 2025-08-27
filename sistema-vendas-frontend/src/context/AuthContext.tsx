import { createContext, useState, ReactNode, useEffect } from "react";
import api from "../services/api";

interface AuthContextProps {
  user: any;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, senha: string) => {
    const res = await api.post("/auth/login", { email, senha });
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
