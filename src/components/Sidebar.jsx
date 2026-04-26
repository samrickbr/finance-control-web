import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Certifique-se de ter instalado: npm install lucide-react

function Sidebar() {
  const [usuario, setUsuario] = useState({ nome: "Usuario", perfil: "COMUM" });
  const [isTransacoesOpen, setIsTransacoesOpen] = useState(false); // Estado do submenu

  useEffect(() => {
    const data = localStorage.getItem("usuarioLogado");
    if (data) {
      try {
        setUsuario(JSON.parse(data));
      } catch (e) {
        console.error("Erro ao ler dados do usuário", e);
      }
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const btnClass = "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-700 hover:text-blue-400 font-medium flex items-center gap-3";
  const subBtnClass = "w-full text-left pl-12 pr-4 py-2 rounded-lg text-slate-400 hover:bg-slate-700/50 hover:text-blue-300 text-sm transition-all";

  return (
    <div className="w-64 h-screen bg-slate-800 border-r border-slate-700 p-4 flex flex-col shadow-2xl">
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Finance Control
        </h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">
          {usuario.nome} ({usuario.perfil})
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        <button onClick={() => navigate("/dashboard")} className={btnClass}>
          <span>📊</span> Dashboard
        </button>

        <button onClick={() => navigate("/usuarios")} className={btnClass}>
          <span>👤</span> Gestão de Usuários
        </button>

        {/* Menu Transações com Submenu */}
        <div>
          <button 
            onClick={() => setIsTransacoesOpen(!isTransacoesOpen)} 
            className={`${btnClass} justify-between`}
          >
            <div className="flex items-center gap-3">
              <span>💸</span> Transações
            </div>
            {isTransacoesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isTransacoesOpen && (
            <div className="mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <button onClick={() => navigate("/lancamentos")} className={subBtnClass}>
                Novo Lançamento
              </button>
              <button onClick={() => navigate("/categorias")} className={subBtnClass}>
                Categorias
              </button>
              <button onClick={() => navigate("/tipos")} className={subBtnClass}>
                Tipos
              </button>
            </div>
          )}
        </div>

        <button onClick={() => navigate("/extrato")} className={btnClass}>
          <span>📄</span> Extrato
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-400/10 font-semibold transition-all"
      >
        🚪 Sair do Sistema
      </button>
    </div>
  );
}

export default Sidebar;