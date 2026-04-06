import { useState, useEffect } from "react";
import api from "../services/api";
import { Input, Button } from "../components/ui/Input"; // Corrigido de 'Imput'
import Layout from "../components/Layout";

function Usuarios() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    profissao: "",
    tiposVinculo: [],
    perfil: "",
    justificativa: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [opcoesVinculo, setOpcoesVinculo] = useState([]);
  const [opcoesPerfil, setOpcoesPerfil] = useState([]);

  const carregarUsuarios = async () => {
    try {
      const response = await api.get("/usuarios/busca?nome=");
      setListaUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao listar usuários", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");

    if (user) {
      try {
        setUsuarioLogado(JSON.parse(user));
      } catch (e) {
        console.error("Erro ao converter usuário logado.", e);
      }
    }

    const buscarMetadados = async () => {
      try {
        const [resVinculos, resPerfis] = await Promise.all([
          api.get("/usuarios/tipos-vinculo"),
          api.get("/usuarios/perfis"),
        ]);
        setOpcoesVinculo(resVinculos.data);
        setOpcoesPerfil(resPerfis.data);
      } catch (error) {
        console.error("Erro ao buscar opções:", error);
      }
    };
    buscarMetadados();
    carregarUsuarios();
  }, []);

  const prepararEdicao = (usuario) => {
    console.log("Dados do usuário vindos do BD:", usuario);
    setFormData({
      ...usuario,
      senha: "", // Senha limpa por segurança
      cpf: usuario.cpf || "",
      tiposVinculo: usuario.tiposVinculo || [],
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicao = () => {
    setFormData({
      id: null,
      nome: "",
      email: "",
      senha: "",
      cpf: "",
      profissao: "",
      tiposVinculo: [],
      perfil: "",
      justificativa: "",
    });
    setIsEditing(false);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let novosVinculos = [...formData.tiposVinculo];
    if (checked) {
      novosVinculos.push(value);
    } else {
      novosVinculos = novosVinculos.filter((v) => v !== value);
    }
    setFormData({ ...formData, tiposVinculo: novosVinculos });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const dadosParaEnviar = {
      ...formData,
      cpf: formData.cpf?.replace(/\D/g, "") || "",
    };

    console.log("JSON enviado:", JSON.stringify(dadosParaEnviar, null, 2));

    if (isEditing) {
      delete dadosParaEnviar.senha; // Não envia senha vazia
      delete dadosParaEnviar.dataUltimaAlteracao; // O Java gera isso sozinho
      delete dadosParaEnviar.usuarioUltimaAlteracao; // O Java gera isso sozinho
    }

    // Trava da senha
    if (isEditing && !dadosParaEnviar.senha) {
      delete dadosParaEnviar.senha;
    }

    try {
      if (isEditing) {
        // O campo justificativa já vai dentro de dadosParaEnviar
        await api.put(`/usuarios/${formData.id}`, dadosParaEnviar);
        alert("Usuário atualizado com sucesso!");
      } else {
        // Se for novo cadastro remove a justificativa
        delete dadosParaEnviar.justificativa;
        await api.post("/usuarios", dadosParaEnviar);
        alert("Usuário cadastrado!");
      }
      cancelarEdicao();
      carregarUsuarios();
    } catch (error) {
      const mensagem = error.response?.data?.message || "Erro desconhecido";
      alert("Erro: " + mensagem);
      console.error("Detalhes do erro 400:", error.response?.data);
    }
    };

    const handleDeletar = async (id) => {
      // 1. Confirmação simples do navegador
      const confirmar = window.confirm(
        "Tem certeza que deseja excluir este usuário?",
      );

      if (confirmar) {
        // 2. Captura a justificativa (exigida pelo seu back-end)
        const justificativa = window.prompt(
          "Por favor, informe o motivo da exclusão:",
        );

        if (!justificativa || justificativa.trim().length < 5) {
          alert(
            "A justificativa é obrigatória e deve ter pelo menos 5 caracteres.",
          );
          return;
        }

        try {
          // 3. Chamada ao seu endpoint de Soft Delete
          // Note que passamos a justificativa no corpo (body) ou como param, conforme seu back
          await api.delete(`/usuarios/${id}`, {
            data: { justificativa: justificativa },
          });

          alert("Usuário excluído com sucesso!");
          carregarUsuarios(); // Atualiza a lista na tela
        } catch (error) {
          const msg = error.response?.data?.message || "Erro ao excluir";
          alert("Erro: " + msg);
          console.error(error);
        }
      };
  };

  const usuariosFiltrados = listaUsuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      u.email.toLowerCase().includes(filtro.toLowerCase()),
  );

  return (
    <>
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl mb-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          {isEditing ? "📝 Alterar Usuário" : "👤 Novo Usuário"}
        </h2>

        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Nome Completo"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />
          <Input
            placeholder="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <Input
            placeholder="Senha"
            type="password"
            value={formData.senha}
            onChange={(e) =>
              setFormData({ ...formData, senha: e.target.value })
            }
            required={!isEditing}
          />
          <Input
            placeholder="CPF"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            disabled={isEditing}
            className={isEditing ? "opacity-50 cursor-not-allowed" : ""}
            required={!isEditing}
          />
          <Input
            placeholder="Profissão"
            className="col-span-2"
            value={formData.profissao}
            onChange={(e) =>
              setFormData({ ...formData, profissao: e.target.value })
            }
          />

          {/* Vínculos */}
          <div className="col-span-2 space-y-2">
            <label className="text-slate-400 text-sm ml-1">Vínculos:</label>
            <div className="flex flex-wrap gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              {opcoesVinculo.map((v) => (
                <label
                  key={v}
                  className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white transition-colors"
                >
                  <input
                    type="checkbox"
                    value={v}
                    checked={formData.tiposVinculo?.includes(v)}
                    onChange={handleCheckboxChange}
                    className="w-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{v}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Perfil - Condicional para Admin */}
          <div className="col-span-2">
            <label className="text-slate-400 text-sm ml-1">
              Perfil de Acesso
            </label>
            <select
              value={formData.perfil || ""}
              onChange={(e) =>
                setFormData({ ...formData, perfil: e.target.value })
              }
              disabled={usuarioLogado?.perfil !== "ADMIN"}
              className={`w-full p-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white transition-all 
      ${usuarioLogado?.perfil !== "ADMIN" ? "opacity-50 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-500"}`}
            >
              <option value="" disabled>
                Selecione um Perfil
              </option>
              {opcoesPerfil.map((perfil) => (
                <option key={perfil} value={perfil}>
                  {perfil}
                </option>
              ))}
            </select>

            {usuarioLogado?.perfil !== "ADMIN" && (
              <span className="text-[10px] text-amber-500 mt-1 ml-1 block italic">
                * Somente administradores podem alterar este campo.
              </span>
            )}
          </div>

          {/* Campo de Justificativa - Aparece apenas na edição */}
          {isEditing && (
            <div className="col-span-2 space-y-2">
              <label className="text-slate-400 text-sm ml-1">
                Justificativa da Alteração:
              </label>
              <textarea
                className="w-full p-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Descreva o motivo desta alteração..."
                rows="3"
                value={formData.justificativa}
                onChange={(e) =>
                  setFormData({ ...formData, justificativa: e.target.value })
                }
                required // Opcional: obriga o admin a explicar o que está fazendo
              />
            </div>
          )}

          <div className="col-span-2 flex gap-4 mt-6">
            <Button type="submit" className="flex-1 bg-blue-600">
              {isEditing ? "Confirmar Alteração" : "Cadastrar Usuário"}
            </Button>

            <Button
              variant="secondary"
              type="button"
              onClick={cancelarEdicao}
              className="flex-1 bg-slate-600"
            >
              {isEditing ? "Cancelar" : "Limpar"}
            </Button>
          </div>
        </form>
      </div>

      {/* LISTAGEM */}
      <div className="space-y-4">
        <Input
          placeholder="🔍 Buscar por nome ou e-mail..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-slate-700/50 text-slate-400 text-xs uppercase">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">E-mail</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {usuariosFiltrados.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="p-4 text-white font-medium">{u.nome}</td>
                  <td className="p-4 text-blue-400">{u.email}</td>
                  <td className="p-4 text-center flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => prepararEdicao(u)}
                      className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                    >
                      Editar
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleDeletar(u.id)} // Certifique-se de usar 'u.id' ou 'usuario.id' conforme seu map
                      className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                      title="Excluir Usuário"
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Usuarios;
