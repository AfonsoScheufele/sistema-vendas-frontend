import api from "./api";

export const login = async (email: string, senha: string) => {
  const res = await api.post("/auth/login", { email, senha });
  localStorage.setItem("token", res.data.token);
  return res.data.user;
};
