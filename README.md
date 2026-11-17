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
│   ├── agendamento.html      # Formulário de criação e edição de reserva
│   ├── agendamentos.html     # Lista, busca e exclusão de reservas
│   ├── css/style.css         # Estilos (mobile first, Grid, Flexbox)
│   ├── js/quadras.js         # Monta os cards do catálogo
│   ├── js/agendamento.js     # Formulário de reserva e cálculo do valor total
│   ├── js/agendamentos.js    # Listagem, busca e exclusão
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
| `GET` | `/api/agendamentos/:id` | Busca um agendamento por ID | 200, 404 |
| `POST` | `/api/agendamentos` | Cadastra um agendamento | 201, 400 |
| `PUT` | `/api/agendamentos/:id` | Atualiza um agendamento | 200, 400, 404 |
| `DELETE` | `/api/agendamentos/:id` | Exclui um agendamento | 204, 404 |

Corpo JSON do `POST` e do `PUT`:

```json
{
  "nome": "Ana Souza",
  "email": "ana@email.com",
  "telefone": "82999990000",
  "quadraId": 1,
  "data": "2026-12-01",
  "horarios": ["18:00", "19:00"]
}
```

Regras de validação no servidor: nome com 3 letras ou mais, e-mail com `@`, quadra existente,
data `AAAA-MM-DD` e pelo menos um horário.
Também não é permitido reservar a mesma quadra, na mesma data, em um horário que já esteja ocupado.
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
