# ArenaHub — Projeto Integrador (Etapa 2)

Site de catálogo de quadras esportivas com agendamento online.
A entidade principal é o **Agendamento**, com cadastro, consulta, edição e exclusão (CRUD).

## Tecnologias

- **Frontend:** HTML5, CSS3 e JavaScript puro (`fetch`, DOM e eventos).
- **Backend:** Node.js com Express.
- **Banco de dados:** PostgreSQL (Docker), acessado pelo Prisma ORM. Somente o backend acessa o banco.

## Estrutura

```text
dsw_project/
├── arena-hub/                # Frontend
│   ├── index.html            # Início
│   ├── quadras.html          # Catálogo de quadras (GET /api/quadras)
│   ├── agendamentos.html     # Formulário e lista de reservas (CRUD)
│   ├── css/style.css         # Estilos (mobile first, Grid, Flexbox)
│   ├── js/quadras.js         # Monta os cards do catálogo
│   ├── js/agendamentos.js    # Formulário, busca, edição e exclusão
│   └── images/               # Fotos das quadras
├── prisma/
│   ├── schema.prisma         # Tabelas quadras e agendamentos
│   └── seed.js               # Cadastra as quadras iniciais
├── server.js                 # API Express
└── docker-compose.yml        # PostgreSQL na porta 5433
```

## Rotas da API

| Método | Rota | Ação | Respostas |
|---|---|---|---|
| `GET` | `/api/quadras` | Lista as quadras | 200 |
| `GET` | `/api/agendamentos` | Lista os agendamentos | 200 |
| `POST` | `/api/agendamentos` | Cadastra um agendamento | 201, 400 |
| `PUT` | `/api/agendamentos/:id` | Atualiza um agendamento | 200, 400, 404 |
| `DELETE` | `/api/agendamentos/:id` | Exclui um agendamento | 204, 404 |

Corpo JSON do `POST` e do `PUT`:

```json
{
  "nome": "Ana Souza",
  "email": "ana@email.com",
  "telefone": "(82) 99999-0000",
  "quadraId": 1,
  "data": "2026-12-01",
  "horarios": ["18:00", "19:00"],
  "jogadores": 10,
  "pagamento": "Pix",
  "observacoes": "Opcional"
}
```

Regras de validação no servidor: nome com 3 letras ou mais, e-mail com `@`, quadra existente,
data `AAAA-MM-DD`, pelo menos um horário, de 2 a 22 jogadores e pagamento `Pix`, `Cartão` ou `Dinheiro`.
Se um dado for inválido, a API devolve `400` com `{ "mensagem": "..." }`.

## Como executar

Pré-requisitos: Node.js 18 ou superior e Docker Desktop em execução.

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o PostgreSQL:
   ```bash
   docker compose up -d
   ```
3. Crie as tabelas:
   ```bash
   npm run prisma:push
   ```
4. Cadastre as quadras iniciais:
   ```bash
   npm run prisma:seed
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```
6. Abra `http://localhost:3000` no navegador.

Os dados ficam no volume Docker `postgres_data`. Eles continuam salvos depois de reiniciar o servidor.
