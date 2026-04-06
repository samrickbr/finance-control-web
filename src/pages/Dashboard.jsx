import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [dados, setDados] = useState({ saldo: 0, entradas: 0, saidas: 0 });
  const [transacoes, setTransacoes] = useState([]); // Usaremos para a tabela depois
  const [loading, setLoading] = useState(true);

  // Pegamos o mês e ano atual para a busca
  const dataAtual = new Date();
  const mes = dataAtual.getMonth() + 1;
  const ano = dataAtual.getFullYear();

  useEffect(() => {
    const buscarDados = async () => {
      const token = localStorage.getItem('token');
      if(!token){
        console.log("Aguardando token...");
        return;
      }

      try {
        setLoading(true);

        const response = await api.get(`/relatorios/mensal?mes=${mes}&ano=${ano}`);        
        setDados({
          saldo: response.data.saldoFinal || 0,
          entradas: response.data.totalEntradas || 0,
          saidas: response.data.totalSaidas || 0
        });
      } catch (error) {
        console.error("Erro ao buscar dados do Java:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, [mes, ano]);

  if (loading) return <div className="m bg-slate-900 text-white p-10">Carregando dados do sistema...</div>;

  return (
    <div className=" bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-100">Resumo Financeiro</h1>

        {/* Cards com dados Reais do Java */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <p className="text-slate-400 text-sm mb-1 font-medium">Saldo Atual</p>
            <h2 className="text-3xl font-bold text-emerald-400">
              R$ {dados.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <p className="text-slate-400 text-sm mb-1 font-medium">Entradas do Mês</p>
            <h2 className="text-3xl font-bold text-blue-400">
              R$ {dados.entradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <p className="text-slate-400 text-sm mb-1 font-medium">Saídas do Mês</p>
            <h2 className="text-3xl font-bold text-rose-400">
              R$ {dados.saidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
          </div>
        </div>

        {/* Placeholder para a tabela - Vamos integrar o próximo endpoint aqui */}
        <div className="bg-slate-800/30 p-10 rounded-2xl border border-slate-700 border-dashed text-center text-slate-500">
          Abaixo aparecerá a lista detalhada de transações.
        </div>
      </div>
    </div>
  );
}

export default Dashboard;