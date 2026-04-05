# Finance Control - Web 🚀

Interface web para o sistema de controle financeiro pessoal, consumindo a API desenvolvida em Java/Spring Boot.

## 🛠 Tecnologias
- **React.js 19** (Frontend)
- **Vite** (Build Tool)
- **Axios** (Integração com API REST)
- **React Router Dom** (Gerenciamento de rotas)
- **Node.js** (Ambiente de execução)
- **Tailwind CSS v4** (Estilização)
- **Spring Security**
- **Backend** (Java com Spring Boot e Mysql)

## 📌 Funcionalidades & Progresso (Roadmap)
- [x] Setup do Projeto: Inicialização com Vite e Tailwind v4.
- [x] Tela de Login: Interface construída e integrada ao Axios.
- [x] Autenticação JWT: Login integrado ao Spring Security.
- [ ] Dashboard Principal: Cards de resumo financeiro.
- [ ] Configuração de Rotas: Implementação do React Router.
- [ ] Integração de Extrato: Consumo do endpoint de lançamentos do Java.
- [ ] Dashboard de Gastos e Entradas
- [ ] Listagem de Transações (Consumindo Postgres)
- [ ] Cadastro de novas movimentações
- [ ] Cadastro de novos usuários
- [ ] Autenticação com JWT (Integrado ao Spring Security)

## ⚙️ Pré-requisitos
Antes de começar, você vai precisar ter instalado:
- [Node.js](https://nodejs.org/en/) (Versão LTS)
- Backend [Finance Control](https://github.com/samrickbr/financeControl.git) rodando localmente

## 🔧 Como rodar o projeto
1. Clone este repositório:
   ```bash
   git clone [https://github.com/samrickbr/finance-control-web.git](https://github.com/samrick/finance-control-web.git)
   
2. INstale as dependências:
    ```bash
   npm install

3. Configure o arquivo de API ('src/services/api.js') para apontar para o seu endereço local.

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev

5. Acesse: `http://localhost:5173`

---
## 👨‍💻 Autor

### Rick (Ricardo)

Desenvolvedor Backend Java 

🔗 Meu GitHub: https://github.com/samrickbr

---
🚀 Projeto em evolução contínua.