# Roteiro de apresentação — ArenaHub (Etapa 2)

A divisão segue os 5 critérios de avaliação do enunciado, um por pessoa, na ordem em que o sistema funciona.
Tempo sugerido: cerca de 3 minutos por pessoa (15 minutos no total).

Para cada pessoa há: o que mostrar na tela, uma sugestão de fala, onde está no código e as perguntas que o professor pode fazer.
A fala é só uma base: falem com as próprias palavras. Os trechos entre colchetes `[ ]` cada um completa.

| Ordem | Quem | Tema | Critério do enunciado | Pontos |
|---|---|---|---|---|
| 1 | [Pessoa 1] | Abertura, organização e catálogo | Organização e defesa do projeto | 10 |
| 2 | [Pessoa 2] | Formulário, eventos e DOM | Interações, DOM e formulários | 25 |
| 3 | [Pessoa 3] | `fetch`, estados e feedback | Comunicação com API, estados e feedback | 20 |
| 4 | [Pessoa 4] | Servidor, rotas e validações | Backend, rotas e validações | 25 |
| 5 | [Pessoa 5] | Banco, persistência e fechamento | Persistência e integridade dos dados | 20 |

O enunciado pede que todos expliquem sua contribuição: cada pessoa termina a sua parte dizendo o que fez no projeto.

---

## Antes de começar

- Banco e servidor rodando: `docker compose up -d` e `npm start` (reiniciado com o código mais recente).
- Navegador em `http://localhost:3000`, com o DevTools aberto na aba **Network**.
- VS Code aberto no projeto, para mostrar o código.
- Duas reservas já cadastradas:
  - **Reserva A:** Arena Ponta Verde, uma data futura (ex.: 10/12), horários 18:00 e 19:00. A Pessoa 4 usa para mostrar o horário ocupado, e a Pessoa 5 para mostrar que os dados continuam salvos.
  - **Reserva B:** qualquer quadra e horário. A Pessoa 3 exclui essa.
- Não parar o servidor no meio de um cadastro ou exclusão: nesse caso aparece a mensagem "Failed to fetch", que vem do navegador, e não a nossa.

---

## 1. [Pessoa 1] — Abertura, organização e catálogo

**Mostrar na tela**
1. A página inicial.
2. A página Quadras.
3. Clicar em **Agendar** na Arena Ponta Verde: o formulário abre com ela já selecionada.
4. Diminuir a janela do navegador para mostrar que o site continua responsivo.

**Sugestão de fala**

> Nosso projeto é o ArenaHub, um site de quadras esportivas de Maceió onde a pessoa vê as quadras e agenda um horário.
> Na Etapa 1 a gente fez as páginas em HTML e CSS. Nessa etapa mantivemos o mesmo visual e a mesma navegação, e o site virou uma aplicação completa: o navegador conversa com um servidor em Node, e o servidor salva tudo num banco PostgreSQL.
> A informação principal que escolhemos foi o agendamento: dá para cadastrar, consultar, editar e excluir.
> O projeto tem três partes: a pasta `arena-hub` é o site, o `server.js` é a API e a pasta `prisma` cuida do banco.
> Essa página de quadras já é montada pelo JavaScript: o `quadras.js` faz um `fetch` na rota `/api/quadras` e cria um card para cada quadra. Quando eu clico em Agendar, o link leva o id da quadra na URL, e o formulário já abre com ela escolhida.

**Onde está no código**
- `README.md`: estrutura do projeto, como rodar e tabela de rotas.
- `arena-hub/js/quadras.js`: `fetch` (linha 8), montagem dos cards (linha 14), lista vazia (linha 12) e erro (linha 26).
- `arena-hub/js/agendamentos.js`, linha 40: lê o `quadraId` da URL com `URLSearchParams`.

**Perguntas prováveis**
- *Como rodar o projeto?* `docker compose up -d`, `npm run prisma:push`, `npm run prisma:seed` e `npm start`, como está no README.
- *Por que separar site, servidor e banco?* O enunciado pede que só o backend acesse o banco. O navegador só conversa com a API.

**Minha contribuição:** [o que eu fiz no projeto]

**Passa a vez:** "Agora a [Pessoa 2] vai mostrar o formulário de agendamento."

---

## 2. [Pessoa 2] — Formulário, eventos e DOM

**Mostrar na tela** (CRIAR e EDITAR)
1. Clicar em **Cadastrar** com o formulário vazio: os campos ficam vermelhos e aparece "corrija os campos destacados.".
2. Preencher tudo (nome, e-mail, quadra, data, dois horários que não batam com a Reserva A, jogadores e pagamento) e cadastrar. O card aparece na lista.
3. Clicar em **Editar** no card: o formulário vem preenchido e o título muda. Alterar o número de jogadores e salvar.
4. Mostrar o botão **Cancelar edição**.

**Sugestão de fala**

> O formulário usa vários tipos de campo: texto, e-mail, telefone, select de quadra, data, checkbox para os horários, número de jogadores, radio para o pagamento e textarea para observações.
> Os horários não estão escritos no HTML: um `for` no JavaScript cria um checkbox para cada hora, das 8h às 22h.
> Tudo funciona com `addEventListener`. No evento `submit`, primeiro a gente cancela o envio padrão com `preventDefault` e valida antes de mandar: o `checkValidity()` confere as regras do HTML, como `required`, `min` e `max`, e a gente também confere se pelo menos um horário foi marcado. Se tiver erro, aparece a mensagem e os campos ficam vermelhos.
> A lista de reservas é montada pelo DOM: para cada agendamento, a função `renderizar` cria o card com `createElement` e coloca o texto com `textContent`.
> No Editar, a função `editar` preenche o formulário com os dados do card e guarda o id num campo oculto. É assim que o formulário sabe se é um cadastro novo ou uma edição.

**Onde está no código**
- `arena-hub/agendamentos.html`, linhas 27 a 63: os campos do formulário.
- `arena-hub/js/agendamentos.js`:
  - linhas 25 a 28: criação dos horários;
  - linhas 144 a 154: evento `submit` e validação antes do envio;
  - linhas 68 a 95: criação dos cards com `createElement`;
  - linha 100: `editar()`; linha 122: `limparFormulario()`.
- `arena-hub/css/agendamentos.css`: a regra `.form-enviado input:invalid`, que pinta os campos de vermelho.

**Perguntas prováveis**
- *Por que o formulário tem `novalidate` se os campos têm `required`?* Para o navegador não mostrar os avisos dele. Quem valida é o nosso JavaScript, com `checkValidity()`, e a mensagem é a nossa.
- *Por que `textContent` e não `innerHTML` no card?* O nome é digitado pelo usuário. Com `textContent` ele aparece como texto e nenhum código HTML é executado.
- *Como o formulário sabe se é cadastro ou edição?* Pelo campo oculto `id`: vazio é cadastro (POST), preenchido é edição (PUT).

**Minha contribuição:** [o que eu fiz no projeto]

**Passa a vez:** "A [Pessoa 3] vai mostrar como esses dados vão e voltam do servidor."

---

## 3. [Pessoa 3] — `fetch`, estados e feedback

**Mostrar na tela** (CONSULTAR e EXCLUIR)
1. Na aba **Network**, clicar no POST e no PUT feitos pela Pessoa 2: mostrar em **Payload** o JSON enviado e em **Response** o que o servidor devolveu.
2. **Busca:** digitar parte de um nome para filtrar. Depois digitar algo que não existe: aparece "nenhum agendamento encontrado.".
3. **Excluir** a Reserva B: aparece a confirmação, depois "agendamento excluído." e o card some, sem recarregar a página.
4. **Estado de erro:** na aba Network, clicar com o botão direito na requisição `agendamentos`, escolher **Block request URL** e recarregar a página. Aparece "erro ao carregar os agendamentos.". Depois desbloquear.

**Sugestão de fala**

> Toda a comunicação com o servidor é feita com `fetch`, trocando dados em JSON. No cadastro o método é POST, na edição é PUT e na exclusão é DELETE. Os dados do formulário viram texto com `JSON.stringify` e vão no corpo da requisição.
> A página nunca recarrega: depois de cada ação a gente chama `carregarAgendamentos()`, que busca a lista de novo e redesenha só os cards.
> Tratamos os três estados que o enunciado pede: enquanto busca aparece "carregando", se não tem nada aparece "nenhum agendamento encontrado" e, se der erro, aparece a mensagem de erro.
> Cada ação também dá retorno ao usuário: mensagem verde quando dá certo, vermelha quando dá errado, e o botão Salvar fica desabilitado até a resposta chegar, para ninguém enviar duas vezes.
> A busca filtra a lista que já está carregada, pelo nome da pessoa ou da quadra, a cada letra digitada.

**Onde está no código** (`arena-hub/js/agendamentos.js`)
- linhas 171 a 175: `fetch` do cadastro e da edição (`method`, `headers`, `JSON.stringify`);
- linha 134: `fetch` da exclusão;
- linhas 46 a 57: `carregarAgendamentos()` com os estados "carregando" e erro;
- linha 66: estado de lista vazia;
- linha 15: `mostrarMensagem()`;
- linhas 169 e 185: botão desabilitado durante o envio;
- linhas 138 e 181: recarrega a lista depois de excluir ou salvar;
- linhas 61 e 193: busca (`filter` e evento `input`).

**Perguntas prováveis**
- *Para que serve o `resposta.ok`?* O `fetch` não dá erro sozinho quando o servidor responde 400 ou 404. A gente confere o `ok` e, se for falso, mostra a mensagem que veio do servidor.
- *Para que serve o `try/catch`?* Se o servidor estiver fora do ar, o `fetch` falha, e o `catch` mostra a mensagem de erro em vez de a página travar.
- *A busca consulta o servidor?* Não. Ela filtra com `filter` a lista que já foi carregada.

**Minha contribuição:** [o que eu fiz no projeto]

**Passa a vez:** "A [Pessoa 4] vai mostrar o que acontece do lado do servidor."

---

## 4. [Pessoa 4] — Servidor, rotas e validações

**Mostrar na tela**
1. A tabela de rotas no `README.md`.
2. Tentar cadastrar na Arena Ponta Verde, na mesma data da Reserva A, às 19:00. Aparece "algum desses horários já está reservado para essa quadra nessa data.", e a aba Network mostra o código **400** com o JSON `{ "mensagem": ... }`.

**Sugestão de fala**

> O servidor é feito em Node com Express, tudo no `server.js`. O `express.json()` lê o JSON que chega, e o `express.static` entrega as páginas do site.
> Temos as rotas do CRUD de agendamentos: GET para listar, POST para cadastrar, PUT para atualizar e DELETE para excluir, além de um GET para as quadras.
> Antes de gravar, a função `validar` confere tudo de novo no servidor: nome com pelo menos 3 letras, e-mail com @, data no formato certo, pelo menos um horário, de 2 a 22 jogadores e uma forma de pagamento válida. Ela também confere se a quadra existe e se o horário já está ocupado: procura outro agendamento da mesma quadra, na mesma data, com algum horário igual.
> Cada resposta volta com o código HTTP certo: 201 quando cadastra, 200 quando atualiza, 204 quando exclui, 400 quando algum dado está errado e 404 quando o agendamento não existe.

**Onde está no código** (`server.js`)
- linhas 7 e 8: `express.json()` e `express.static`;
- linhas 56 a 91: as rotas;
- linhas 12 a 35: `validar()`, com a regra de horário ocupado nas linhas 24 a 32;
- linha 37: `dadosAgendamento()`, que monta só os campos que podem ser gravados;
- linha 51: `buscarAgendamento()`, usado para devolver 404;
- linha 93: resposta 500 para erros inesperados.

**Perguntas prováveis**
- *Por que validar no servidor se o formulário já valida?* Dá para mandar uma requisição sem usar o site, por exemplo pelo Postman. Quem garante as regras é o servidor.
- *Qual a diferença entre 400 e 404?* 400 é dado inválido; 404 é um agendamento que não existe.
- *Na edição, o próprio agendamento não conta como horário ocupado?* Não: a busca ignora o próprio id (`id: { not: id }`).
- *Para que serve o `dadosAgendamento()`?* Para gravar só os campos que a gente permite, mesmo que chegue outra coisa no JSON.

**Minha contribuição:** [o que eu fiz no projeto]

**Passa a vez:** "Para fechar, a [Pessoa 5] vai mostrar onde esses dados ficam guardados."

---

## 5. [Pessoa 5] — Banco, persistência e fechamento

**Mostrar na tela** (PERSISTÊNCIA)
1. No terminal, parar o servidor com Ctrl+C e rodar `npm start` de novo.
2. Atualizar a página: as reservas continuam lá (a cadastrada pela Pessoa 2 e a Reserva A).
3. Opcional: rodar `npx prisma studio` e mostrar as tabelas `quadras` e `agendamentos`.

**Sugestão de fala**

> Os dados ficam num banco PostgreSQL que roda no Docker. O `docker-compose.yml` sobe o banco e guarda os dados num volume chamado `postgres_data`. Por isso, mesmo parando o servidor, como acabei de fazer, os agendamentos continuam salvos.
> Para acessar o banco usamos o Prisma. No `schema.prisma` estão as duas tabelas, quadras e agendamentos. Cada agendamento guarda o `quadraId`, ligado à quadra, então o banco não aceita agendamento de uma quadra que não existe. Os campos obrigatórios também são obrigatórios no banco, não só no formulário. O `seed.js` cadastra as quadras iniciais.
> E só o servidor fala com o banco: o navegador nunca acessa o banco diretamente, só a API.

**Fechamento**

> Resumindo: no site temos eventos, formulário com validação e DOM; a comunicação é toda por `fetch` e JSON, com estados e mensagens de retorno; o servidor tem as rotas do CRUD, com validação e códigos HTTP; e os dados continuam salvos no PostgreSQL mesmo depois de reiniciar. Obrigado!

**Onde está no código**
- `docker-compose.yml`: PostgreSQL 16 na porta 5433 e o volume `postgres_data`.
- `prisma/schema.prisma`: modelo `Agendamento` (linhas 22 a 37), ligação com a quadra (linha 28) e campos obrigatórios (linhas 31 e 32).
- `prisma/seed.js`: cadastro das quadras iniciais.

**Perguntas prováveis**
- *Onde os dados ficam salvos?* No volume do Docker. Eles só são apagados com `docker compose down -v`.
- *O que garante a integridade dos dados?* A ligação com a quadra (chave estrangeira), os campos obrigatórios no banco, a validação do servidor e a regra de horário ocupado.
- *Por que usar o Prisma?* As tabelas ficam descritas num arquivo só, e as consultas são escritas em JavaScript, sem SQL na mão.

**Minha contribuição:** [o que eu fiz no projeto]
