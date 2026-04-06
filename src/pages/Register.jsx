import { useState } from 'react';
import api from '../services/api'; //
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios/registrar', formData); // Ajuste conforme seu endpoint Java
      alert("Usuário cadastrado com sucesso!");
      navigate('/');
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className=" bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Criar Conta</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input 
            type="text" placeholder="Nome Completo" 
            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-blue-500"
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
          />
          <input 
            type="email" placeholder="E-mail" 
            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-blue-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Senha" 
            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-blue-500"
            onChange={(e) => setFormData({...formData, senha: e.target.value})}
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all">
            Cadastrar
          </button>
        </form>
        <p className="text-slate-400 text-center mt-6">
          Já tem conta? <button onClick={() => navigate('/')} className="text-blue-400 hover:underline">Entre aqui</button>
        </p>
      </div>
    </div>
  );
}

export default Register;