import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Financeira</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Saldo Total</p>
          <h2 className="text-2xl font-bold text-green-400">R$ 0,00</h2>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Entradas</p>
          <h2 className="text-2xl font-bold text-blue-400">R$ 0,00</h2>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Saídas</p>
          <h2 className="text-2xl font-bold text-red-400">R$ 0,00</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;