import { useState, useEffect } from "react";
import api from "../services/api";
import { Input, Button } from "../components/ui/Input";

function Lancamentos() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  const estadoInicial = {
    tipo: "",
    valor: "", // Guardamos como string para a máscara
    dataLancamento: new Date().toISOString().split("T")[0],
    dataVencimento: "",
    dataPagamento: "",
    descricao: "",
    categoria: "",
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
      // Como o Java devolve ["NOME1", "NOME2"], usamos res.data direto
      setCategorias(res.data);
    } catch (e) {
      console.error("Erro ao buscar categorias");
    }
  };

  const carregarTipos = async () => {
    try {
      const res = await api.get("/lancamentos/tipos");
      setTipos(res.data);
    } catch (e) {
      console.error("Erro ao buscar tipos");
    }
  };

  // Máscara simples para permitir apenas números e formato monetário
  const handleValorChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove não números
    setFormData({ ...formData, valor: value });
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      const valorNumerico = parseFloat(formData.valor) / 100; // Converte centavos para decimal
      await api.post("/lancamentos", {
        ...formData,
        valor: valorNumerico,
      });
      alert("Lançamento salvo com sucesso!");
      setFormData(estadoInicial);
    } catch (error) {
      alert(
        "Erro ao salvar: " +
          (error.response?.data?.message || "Erro desconhecido"),
      );
    }
  };

  const ehAdmin = usuarioLogado?.perfil === "ADMIN";

  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl w-full">
      <h2 className="text-white text-2xl font-bold mb-8 flex items-center gap-2">
        💰 Nova Transação
      </h2>

      <form
        onSubmit={handleSalvar}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
      >
        {/* Tipo */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-400 text-[10px] uppercase font-bold ml-1">
            Tipo
          </label>
          <select
            className="w-full p-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            required
          >
            <option value="">Selecione...</option>
            {tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Valor com Máscara */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-400 text-[10px] uppercase font-bold ml-1">
            Valor (R$)
          </label>
          <Input
            placeholder="0,00"
            value={(parseFloat(formData.valor || 0) / 100).toLocaleString(
              "pt-BR",
              { minimumFractionDigits: 2 },
            )}
            onChange={handleValorChange}
            required
          />
        </div>

        {/* Datas */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-400 text-[10px] uppercase font-bold ml-1">
            Data Lançamento
          </label>
          <Input
            type="date"
            value={formData.dataLancamento}
            readOnly={!ehAdmin}
            onChange={(e) =>
              setFormData({ ...formData, dataLancamento: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-400 text-[10px] uppercase font-bold ml-1">
            Vencimento
          </label>
          <Input
            type="date"
            value={formData.dataVencimento}
            onChange={(e) =>
              setFormData({ ...formData, dataVencimento: e.target.value })
            }
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-400 text-[10px] uppercase font-bold ml-1">
            Pagamento (Opcional)
          </label>
          <Input
            type="date"
            value={formData.dataPagamento}
            onChange={(e) =>
              setFormData({ ...formData, dataPagamento: e.target.value })
            }
          />
        </div>

        {/* Categoria Ajustada para String pura */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-400 text-[10px] uppercase font-bold ml-1">
            Categoria
          </label>
          <div className="flex gap-2">
            <select
              className="flex-1 p-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
              value={formData.categoria}
              onChange={(e) =>
                setFormData({ ...formData, categoria: e.target.value })
              }
              required
            >
              <option value="">Selecione...</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nomeCategoria}>
                  {cat.nomeCategoria}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-4 bg-blue-600 text-white rounded-xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <Input
            placeholder="Descrição"
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
            required
          />
        </div>

        <Button type="submit" className="md:col-span-2 bg-blue-600 h-12">
          Salvar
        </Button>
      </form>
    </div>
  );
}

export default Lancamentos;
