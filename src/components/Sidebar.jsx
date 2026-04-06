import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Logo = () => (
  <div className="flex items-center gap-3 px-2 py-4 mb-6">
    <div className="relative">
      {/* Ícone Estilizado */}
      <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 transform -rotate-6">
        <span className="text-white font-black text-xl tracking-tighter">F</span>
      </div>
      {/* Detalhe flutuante */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
    </div>
    
    <div className="flex flex-col">
      <h1 className="text-white font-bold text-lg leading-tight tracking-tight">
        Finance<span className="text-blue-500 font-black">Control</span>
      </h1>
      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">System v1.0</span>
    </div>
  </div>
);

function Sidebar() {
const [usuario, setUsuario] = useState({nome: "Usuario", perfil: "COMUM"});

useEffect(() =>{
const data = localStorage.getItem('usuarioLogado');
if(data){
    try{
        setUsuario(JSON.parse(data));
    }catch (e){
        console.error("Erro ao ler dados do usuário", e);
    }
}
},[]
);

  const navigate = useNavigate();

  const userName = localStorage.getItem('usuarioLogado?.nome') || 'Administrador';

  const handleLogout = () => {
    localStorage.clear(); // Limpa tudo
    window.location.href = "/";
    navigate('/');
  };

const btnClass = "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-700 hover:text-blue-400 font-medium flex items-center gap-3";

return (
  <div className="w-64 h-screen bg-slate-800 border-r fixed left-0 top-0 border-slate-700 p-4 flex flex-col shadow-2xl">
    <div className="px-4 py-8">
      <h2 className="text-xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Finance Control
      </h2>
      <p className="text-xs text-blue-400 mt-1">Logado como: {usuario.nome}</p>
      <p className="text-[10px] text-slate-500 italic">Nível: {usuario.perfil}</p>
    </div>
    
    <nav className="flex-1 space-y-2">
      <button onClick={() => navigate('/dashboard')} className={btnClass}>
        <span>📊</span> Dashboard
      </button>
      
      {/* Botão para a tela de cadastro de novos usuários */}
      <button onClick={() => navigate('/usuarios')} className={btnClass}>
        <span>👤</span> Gestão de Usuários
      </button>

      <button className={`${btnClass} opacity-40 cursor-not-allowed`}>
        <span>💸</span> Transações
      </button>
    </nav>

    <button onClick={handleLogout} 
    className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl
     text-rose-400 hover:bg-rose-400/10 font-semibold transition-all">
        🚪 Sair do Sistema
    </button>
  </div>
);
}

export default Sidebar;