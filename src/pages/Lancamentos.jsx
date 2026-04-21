import { useState, useEffect } from "react";
import api from "../services/api";
import { Input, Button } from "../components/ui/Input";
import Layout from "../components/Layout";

function Lancamentos() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [tipos, setTipos] = useState([]); // Busca do Enum TipoLancamento
  const [showModal, setShowModal] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  const estadoInicial = {
    tipo: "",
    valor: "",
    dataLancamento: new Date().toISOString().split("T")[0],
    dataVencimento: "",
    dataPagamento: "",
    descricao: "",
    categoria: "", // Aqui enviaremos o NOME da categoria para o Service
  };

  const [formData, setFormData] = useState(estadoInicial);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    setUsuarioLogado(user);
    
    carregarCategorias();
    carregarTipos();
  }, []);

  const carregarCategorias = async () => {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data);
    } catch (e) {
      console.error("Erro ao buscar categorias");
    }
  };

  const carregarTipos = async () => {
    try {
      // Ajuste o endpoint conforme seu controller (ex: /lancamentos/tipos)
      const res = await api.get("/lancamentos/tipos");
      setTipos(res.data);
    } catch (e) {
      console.error("Erro ao buscar tipos de lançamento");
    }
  };

  const handleCancelar = () => {
    if (window.confirm("Deseja limpar todos os campos?")) {
      setFormData(estadoInicial);
    }
  };

  const handleAddCategoria = async () => {
    if (!novaCategoria.trim()) return;
    try {
      // Salva no BD de Categorias
      await api.post("/categorias", { categoria: novaCategoria.toUpperCase() });
      setNovaCategoria("");
      setShowModal(false);
      await carregarCategorias(); 
      alert("Categoria cadastrada!");
    } catch (e) {
      alert("Erro ao criar categoria. Verifique se ela já existe.");
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      const dadosParaEnviar = {
        ...formData,
        valor: parseFloat(formData.valor.toString().replace(",", ".")),
      };
      
      await api.post("/lancamentos", dadosParaEnviar);
      alert("Lançamento realizado com sucesso!");
      setFormData(estadoInicial);
    } catch (error) {
      alert("Erro: " + (error.response?.data?.message || "Erro ao salvar"));
    }
  };

  const ehAdmin = usuarioLogado?.perfil === "ADMIN";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
            💰 Nova Transação
          </h2>

          <form onSubmit={handleSalvar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tipo buscado do Back */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm">Tipo</label>
              <select 
                className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                required
              >
                <option value="">Selecione o tipo...</option>
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm">Valor (R$)</label>
              <Input 
                placeholder="0,00" 
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
                required 
              />
            </div>

            {/* Data Lançamento - Protegida para comuns */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm">Data Lançamento</label>
              <Input 
                type="date" 
                value={formData.dataLancamento}
                readOnly={!ehAdmin}
                className={!ehAdmin ? "opacity-50 cursor-not-allowed" : ""}
                onChange={(e) => setFormData({...formData, dataLancamento: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm">Vencimento</label>
              <Input 
                type="date" 
                value={formData.dataVencimento}
                onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
                required 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm">Pagamento (Opcional)</label>
              <Input 
                type="date" 
                value={formData.dataPagamento}
                onChange={(e) => setFormData({...formData, dataPagamento: e.target.value})}
              />
            </div>

            {/* Categoria com Pop-up */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm">Categoria</label>
              <div className="flex gap-2">
                <select 
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  required
                >
                  <option value="">Selecione...</option>
                  {categorias.map(cat => (
                    <option key={cat.nome} value={cat.nomeCategoria}>{cat.nomeCategoria}</option>
                  ))}
                </select>
                <button 
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <Input 
                placeholder="Descrição" 
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                required 
              />
            </div>

            <div className="md:col-span-2 flex gap-4 mt-4">
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                Salvar
              </Button>
              <Button type="button" onClick={handleCancelar} className="flex-1 bg-slate-600 hover:bg-slate-700">
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Nova Categoria */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-white text-xl font-bold mb-4">Nova Categoria</h3>
            <Input 
              placeholder="Ex: MERCADO" 
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              autoFocus
            />
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAddCategoria} className="flex-1 bg-green-600">Adicionar</Button>
              <Button onClick={() => setShowModal(false)} className="flex-1 bg-slate-600">Fechar</Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Lancamentos;