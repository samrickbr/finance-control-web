import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, senha: password }); // Enviando 'senha' para o Java
      localStorage.clear();
      localStorage.setItem("token", response.data.token); // Guardando o JWT

      // Verificando se o perfil veio na resposta
      {
        /*  if (response.data.perfil) {
        console.log("👤 Perfil identificado pelo Back:", response.data.perfil);
      } else {
        console.warn(
          "⚠️ ATENÇÃO: O campo 'perfil' não veio na resposta do Java!",
        );
      }
      */
      }

      const usuarioReal = {
        nome: response.data.nome || "Usuário",
        email: email,
        perfil: response.data.perfil || "COMUM",
      };

      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioReal));

      alert("Login efetuado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao conectar com o backend Java.");
    }
    useEffect(() => {
      if (token) {
        console.log("Usuario jáautenticado. Redirecionando...");
        window.location.href = "/dashboard";
      }
    }, []);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Finance Control
        </h2>
        <p className="text-slate-400 text-center mb-8">
          Gestão inteligente para suas finanças
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              E-mail
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg active:transform active:scale-95"
          >
            Acessar Sistema
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
