# ArenaHub — Projeto Integrador (Etapa 2)

Sistema web para catálogo de quadras esportivas e gerenciamento de agendamentos online, desenvolvido para a disciplina de Desenvolvimento Web.

---

## 1. Tecnologias Utilizadas

* **Frontend:** HTML5 semântico, CSS3 puro (sem frameworks) e JavaScript puro (DOM, eventos e `fetch`).
* **Backend:** Node.js com Express.
* **ORM e Banco de Dados:** Prisma ORM com banco de dados relacional PostgreSQL (rodando via Docker).

---

## 2. Estrutura do Projeto

```text
dsw_project/
├── arena-hub/             # Frontend estático (HTML, CSS, JS e imagens)
│   ├── css/style.css      # Estilização limpa e responsiva do site
│   ├── js/
│   │   ├── quadras.js     # Consome GET /api/quadras e renderiza o catálogo
│   │   ├── agendamento.js # Formulário com cálculo dinâmico de valor e envio POST/PUT
│   │   └── agendamentos.js# Listagem (GET), busca/filtro e cancelamento (DELETE)
│   ├── index.html         # Apresentação do sistema
│   ├── quadras.html       # Catálogo de quadras disponíveis
│   ├── agendamento.html   # Formulário de criação/edição de agendamento
│   └── agendamentos.html  # Tela de acompanhamento e listagem das reservas
├── prisma/
│   ├── schema.prisma      # Modelos das tabelas Quadra e Agendamento
│   ├── client.js          # Instância do PrismaClient
│   └── seed.js            # Script para popular quadras e agendamentos iniciais
├── repositories/          # Padrão Repository para encapsular as consultas
│   ├── quadraRepository.js
│   └── agendamentoRepository.js
├── docker-compose.yml     # Configuração do container PostgreSQL (porta 5433:5432)
├── server.js              # Servidor Express e rotas da API REST
└── package.json
```

---

## 3. Rotas da API (CRUD de Agendamentos e Consulta de Quadras)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/quadras` | Lista todas as quadras cadastradas |
| `GET` | `/api/quadras/:id` | Retorna os detalhes de uma quadra por ID |
| `GET` | `/api/agendamentos` | **Read:** Lista todos os agendamentos cadastrados |
| `GET` | `/api/agendamentos/:id` | Retorna um agendamento específico para edição |
| `POST` | `/api/agendamentos` | **Create:** Cadastra um novo agendamento |
| `PUT` | `/api/agendamentos/:id` | **Update:** Atualiza os dados de um agendamento |
| `DELETE` | `/api/agendamentos/:id` | **Delete:** Remove/cancela um agendamento |

---

## 4. Instruções de Execução

### Pré-requisitos
* Node.js instalado (versão 18 ou superior)
* Docker Desktop instalado e em execução

### Passo a Passo

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o banco de dados PostgreSQL com Docker:**
   ```bash
   docker compose up -d
   ```

3. **Criar as tabelas e sincronizar o banco com o Prisma:**
   ```bash
   npx prisma db push
   ```

4. **Popular os dados iniciais de teste (opcional):**
   ```bash
   npm run prisma:seed
   ```

5. **Iniciar a aplicação:**
   ```bash
   npm start
   ```

6. **Acessar no navegador:**
   Abra `http://localhost:3000`
