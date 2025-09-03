import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../index.css";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [mensagemRecuperacao, setMensagemRecuperacao] = useState("");
  const navigate = useNavigate();

  // Login normal
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, senha });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || "Erro ao fazer login");
    }
  };

  // Função para recuperação de senha
  const handleRecuperarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/recuperar-senha", { email: emailRecuperacao });
      setMensagemRecuperacao(
        "Se este email estiver cadastrado, você receberá as instruções para redefinir sua senha."
      );
    } catch (err: any) {
      setMensagemRecuperacao(
        err.response?.data?.mensagem || "Erro ao tentar recuperar senha."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
      <div className="bg-[#1e293b] p-10 rounded-2xl shadow-xl w-full max-w-sm border border-gray-700">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-24 rounded-full shadow-lg" />
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Bem-vindo 👋
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Faça login para acessar o sistema
        </p>

        {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}

        {/* Formulário de login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
          />

          <button
            type="submit"
            className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors shadow-md"
          >
            Entrar
          </button>
        </form>

        {/* Botão de recuperar senha */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="text-sm text-gray-400 hover:text-[#facc15] transition-colors"
          >
            Esqueci minha senha
          </button>
        </div>
      </div>

      {/* Modal de recuperação */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-xl w-96 border border-gray-700">
            <h2 className="text-xl text-white font-bold mb-4">Recuperar senha</h2>
            <p className="text-gray-300 text-sm mb-4">
              Informe seu email e enviaremos um link para redefinir sua senha.
            </p>
            <form onSubmit={handleRecuperarSenha} className="space-y-4">
              <input
                type="email"
                placeholder="Seu email"
                value={emailRecuperacao}
                onChange={(e) => setEmailRecuperacao(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
              <button
                type="submit"
                className="w-full bg-[#2563eb] text-white py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                Enviar link
              </button>
            </form>

            {mensagemRecuperacao && (
              <p className="mt-4 text-green-400 text-sm">{mensagemRecuperacao}</p>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setMensagemRecuperacao("");
                }}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
