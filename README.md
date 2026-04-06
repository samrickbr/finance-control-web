# Finance Control - Web 🚀

Interface web moderna para o sistema de controle financeiro pessoal, consumindo a API desenvolvida em Java/Spring Boot.

## 🛠 Tecnologias

- **React.js 19** (Frontend)
- **Vite** (Build Tool)
- **Axios** (Integração com API REST)
- **React Router Dom** (Gerenciamento de rotas)
- **Node.js** (Ambiente de execução)
- **Tailwind CSS v4** (Estilização)
- ***Lucide React** (Ícones dinâmicos)
- **Backend** (Java com Spring Boot e Mysql)

## 📌 Funcionalidades & Progresso (Roadmap)

- [x] Setup do Projeto: Inicialização com Vite e Tailwind v4.
- [x] Tela de Login: Interface construída e integrada ao Axios.
- [x] Autenticação JWT: Login integrado ao Spring Security com armazenamento de sessão.
- [x] Gestão de Usuários (CRUD Completo):
    - [x] Cadastro de novos usuários (com validação de CPF e senha criptografada).
    - [x] Edição de perfil com controle de permissões (ADMIN/COMUM).
    - [x] Vínculos dinâmicos (Multiselection) consumindo Enums do Backend.
    - [x] **Soft Delete**: Desativação de usuários com exigência de justificativa técnica.
- [x] Dashboard Principal: Cards de resumo financeiro e visão geral.
- [x] Configuração de Rotas: Implementação do React Router.
- [x] Integração de Extrato: Consumo dinâmico de lançamentos.
- [x] Dashboard de Gastos e Entradas
- [ ] **Cadastro de Movimentações**: Tela para novos lançamentos financeiros.
- [ ] Cadastro de novas movimentações

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado:

- [Node.js](https://nodejs.org/en/) (Versão LTS)
- Backend [Finance Control](https://github.com/samrickbr/financeControl.git) rodando localmente

## 🔧 Como rodar o projeto

1. Clone este repositório:
   ```bash
   git clone [https://github.com/samrickbr/finance-control-web.git](https://github.com/samrick/finance-control-web.git)

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

## 👨‍💻 Autor

### Rick (Ricardo)

Desenvolvedor Backend Java

🔗 Meu GitHub: [SAMRICKBR] (https://github.com/samrickbr)

---

🚀 Projeto em evolução contínua.
