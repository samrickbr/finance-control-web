import { useState, useEffect } from "react";
import api from "../services/api";
import { Input, Button } from "../components/ui/Input";
import { Trash2, Edit, AlertCircle } from "lucide-react";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [justificativa, setJustificativa] = useState("");
  const [catParaAcao, setCatParaAcao] = useState(null);
  const [tipoAcao, setTipoAcao] = useState("");

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data);
    } catch (e) {
      console.error("Erro ao carregar categorias");
    }
  };

  const handleSalvar = async () => {
    if (!nomeCategoria.trim()) return;
    if (editandoId) {
      setTipoAcao("EDITAR");
      setShowModal(true);
    } else {
      try {
        await api.post("/categorias", {
          categoria: nomeCategoria.toUpperCase(),
        });
        alert("Cadastrada com sucesso!");
        setNomeCategoria("");
        carregarCategorias();
      } catch (e) {
        alert(
          "Erro ao cadastrar: " +
            (e.response?.data?.message || "Verifique o console")
        );
      }
    }
  };

  const confirmarAcao = async () => {
    if (!justificativa.trim() || justificativa.trim().length < 5) {
      alert("Justificativa muito curta!");
      return;
    }

    try {
      if (tipoAcao === "EXCLUIR") {
        await api.put(`/categorias/${catParaAcao.id}/desativar`, {
          justificativa,
        });
        alert("Categoria desativada!");
      } else {
        await api.put(`/categorias/${editandoId}`, {
          categoria: nomeCategoria.toUpperCase(),
          justificativa: justificativa,
        });
        alert("Categoria alterada!");
      }

      setShowModal(false);
      setJustificativa("");
      setEditandoId(null);
      setNomeCategoria("");
      carregarCategorias();
    } catch (e) {
      alert("Erro na operação. Verifique o console.");
      console.error(e);
    }
  };

  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-4xl mx-auto">
      <h2 className="text-white text-2xl font-bold mb-6 text-center">
        {editandoId ? "📝 Alterar Categoria" : "📁 Nova Categoria"}
      </h2>

      <div className="flex gap-4 mb-8 bg-slate-900/50 p-6 rounded-xl border border-slate-700 items-end">
        <div className="flex-1">
          <label className="text-slate-400 text-[10px] uppercase font-bold ml-1 mb-2 block">
            Nome
          </label>
          <Input
            value={nomeCategoria}
            onChange={(e) => setNomeCategoria(e.target.value)}
            placeholder="Ex: ALIMENTAÇÃO"
          />
        </div>
        <Button onClick={handleSalvar} className="bg-blue-600 h-12 px-8">
          {editandoId ? "Salvar" : "Cadastrar"}
        </Button>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/80 text-slate-400 text-[10px] uppercase font-bold">
            <tr>
              <th className="p-4">Categoria</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {categorias.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-slate-700/30 transition-colors"
              >
                <td className="p-4 text-white font-medium uppercase">
                  {cat.nomeCategoria}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => {
                        setEditandoId(cat.id);
                        setNomeCategoria(cat.nomeCategoria);
                      }}
                      variant="outline"
                      className="border-amber-500/50 text-amber-500 flex items-center gap-2"
                    >
                      <Edit size={16} /> <span>Editar</span>
                    </Button>
                    <Button
                      onClick={() => {
                        setCatParaAcao(cat);
                        setTipoAcao("EXCLUIR");
                        setShowModal(true);
                      }}
                      variant="outline"
                      className="border-red-500/50 text-red-500 flex items-center gap-2"
                    >
                      <Trash2 size={16} /> <span>Excluir</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-sm border border-slate-700">
            <h3
              className={`font-bold flex items-center gap-2 mb-4 ${
                tipoAcao === "EDITAR" ? "text-amber-500" : "text-rose-500"
              }`}
            >
              <AlertCircle size={20} />{" "}
              {tipoAcao === "EDITAR" ? "Justificar Alteração" : "Confirmar Exclusão"}
            </h3>
            <textarea
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mb-4 h-24"
              placeholder="Motivo..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                onClick={() => setShowModal(false)}
                className="bg-slate-600 flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={confirmarAcao}
                className={`flex-1 flex items-center justify-center gap-2 ${
                  tipoAcao === "EDITAR" ? "bg-amber-600" : "bg-red-600"
                }`}
              >
                {tipoAcao === "EDITAR" ? (
                  <>
                    <Edit size={16} /> Salvar
                  </>
                ) : (
                  <>
                    <Trash2 size={16} /> Excluir
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categorias;