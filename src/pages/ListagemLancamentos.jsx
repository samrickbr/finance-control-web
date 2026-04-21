import { useState, useEffect } from "react";
import api from "../services/api";
import { Input, Button } from "../components/ui/Input";

function ListagemLancamentos() {
  const [lancamentos, setLancamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroDescricao, setFiltroDescricao] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  const formatarMoeda = (valor) => {
    const num = parseFloat(valor);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(isNaN(num) ? 0 : num);
  };

  const formatarData = (data) => {
    if (!data) return "--/--/----";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const carregarLancamentos = async () => {
    try {
      const res = await api.get("/lancamentos");
      setLancamentos(res.data.dados || res.data || []);
    } catch (e) {
      console.error("Erro ao buscar lançamentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarLancamentos();
  }, []);

  const dadosFiltrados = lancamentos.filter(
    (l) =>
      l.descricao.toLowerCase().includes(filtroDescricao.toLowerCase()) &&
      (filtroTipo === "" || l.tipo === filtroTipo),
  );

  return (
    <>
      {/* BLOCO DE CABEÇALHO E FILTROS - IGUAL AO PADRÃO USUÁRIOS */}
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl mb-8 border border-slate-700 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold flex items-center gap-2">
            📄 Extrato de Movimentações
          </h2>
          <Button
            onClick={() => (window.location.href = "/lancamentos")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            + Novo Registro
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-[10px] uppercase font-bold ml-1">
              Buscar por descrição
            </label>
            <Input
              placeholder="Ex: Aluguel, Supermercado..."
              value={filtroDescricao}
              onChange={(e) => setFiltroDescricao(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-[10px] uppercase font-bold ml-1">
              Filtrar por tipo
            </label>
            <select
              className="w-full p-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="">Todos os Tipos</option>
              <option value="RECEITA">Somente Receitas</option>
              <option value="DESPESA">Somente Despesas</option>
            </select>
          </div>
        </div>
      </div>

      {/* LISTAGEM - IGUAL AO PADRÃO USUÁRIOS */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden w-full">
        <table className="w-full text-left">
          <thead className="bg-slate-700/50 text-slate-400 text-xs uppercase">
            <tr>
              <th className="p-4">Data</th>
              <th className="p-4">Descrição / Categoria</th>
              <th className="p-4 text-right">Valor</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {dadosFiltrados.length > 0 ? (
              dadosFiltrados.map((l) => (
                <tr
                  key={l.id}
                  className="hover:bg-slate-700/30 transition-colors group"
                >
                  <td className="p-4 text-slate-400 text-sm">
                    {formatarData(l.dataLancamento)}
                  </td>

                  {/*Categorias:*/}

                  <td className="p-4">
                    <div className="text-white font-medium uppercase text-sm">
                      {l.descricao}
                    </div>
                    <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                      {(() => {
                        const cat = l.categoria;

                        // 1. Se for nulo ou "null" (em string), mostra a mensagem
                        if (!cat || cat === "null") {
                          return "Lançamento sem categoria";
                        }

                        // 2. Se for aquela string de erro do Java (com o pacote samrick)
                        if (
                          typeof cat === "string" &&
                          cat.includes("samrick.financeControl")
                        ) {
                          return "Lançamento sem categoria";
                        }

                        // 3. Se for um objeto (caso o Java mude no futuro), tenta pegar o nome
                        if (typeof cat === "object" && cat.nomeCategoria) {
                          return cat.nomeCategoria;
                        }

                        // 4. Se for uma string limpa (o nome da categoria vindo do @JsonValue)
                        if (typeof cat === "string" && cat.trim() !== "") {
                          return cat;
                        }

                        return "Lançamento sem categoria";
                      })()}
                    </div>
                  </td>

                  {/* fim da categoria*/}

                  <td
                    className={`p-4 text-right font-bold ${l.tipo === "RECEITA" ? "text-green-400" : "text-red-400"}`}
                  >
                    {l.tipo === "RECEITA" ? "+ " : "- "}
                    {formatarMoeda(l.valor)}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-amber-500 hover:text-amber-400 transition-colors"
                        title="Editar"
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-500 hover:text-red-400 transition-colors"
                        title="Excluir"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-10 text-center text-slate-500 italic"
                >
                  {loading ? "Carregando..." : "Nenhum lançamento encontrado."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListagemLancamentos;
