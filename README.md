# Finance Control - Web 🚀

Interface web moderna para o sistema de controle financeiro pessoal, consumindo a API desenvolvida em Java/Spring Boot. O foco deste projeto é a gestão eficiente de lançamentos financeiros com uma experiência de usuário (UX) fluida e intuitiva.

## 🛠 Tecnologias

- **React.js 19** & **Vite**
- **Tailwind CSS v4** (Estilização moderna e responsiva)
- **Axios** (Comunicação com API REST)
- **Lucide React** (Ícones)
- **React Router Dom** (Navegação)

## 📌 Funcionalidades Implementadas

### 👤 Gestão de Usuários (Admin)
- **CRUD Completo**: Cadastro, listagem e edição de usuários.
- **Segurança**: Integração com Spring Security e validação de CPF.
- **Controle de Acesso**: Diferenciação entre perfis ADMIN e COMUM.
- **Soft Delete**: Sistema de desativação de contas com obrigatoriedade de justificativa técnica.

### 📄 Extrato e Movimentações
- **Visualização Dinâmica**: Listagem de lançamentos com layout adaptável (Wide).
- **Filtros Inteligentes**: Busca por descrição e filtragem por tipo (Receita/Despesa).
- **Tratamento de Dados**: Integração robusta com o Backend para exibição de categorias, tratando estados nulos ou objetos complexos.
- **Status Visual**: Indicadores coloridos para entradas (verde) e saídas (vermelho).

### 📊 Dashboard & Autenticação
- **Autenticação JWT**: Fluxo seguro de login com armazenamento de sessão.
- **Resumo Financeiro**: Cards informativos com saldo, total de receitas e despesas.

## ⚙️ Pré-requisitos

- **Node.js** (LTS)
- **Backend Finance Control** rodando (Java 17+ / Spring Boot 3)

## 🔧 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/samrickbr/finance-control-web.git](https://github.com/samrickbr/finance-control-web.git)

   ```
2. INstale as dependências:

   ```bash
   npm install

   ```

3. Configure o arquivo de API ('src/services/api.js') para apontar para o seu endereço local.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev

   ```

5. Acesse: `http://localhost:5173`

---

Desenvolvido como parte do ecossistema Finance Control.

---


## 👨‍💻 Autor

### Rick (Ricardo)

Desenvolvedor Backend Java

🔗 Meu GitHub: [SAMRICKBR] (https://github.com/samrickbr)

---

🚀 Projeto em evolução contínua.
