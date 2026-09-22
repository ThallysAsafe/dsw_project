# ArenaHub

Projeto Integrador de Desenvolvimento Web — site completo em **HTML5 semântico e
CSS3 puro**, sem frameworks, sem pré-processadores e sem JavaScript.

O código do site está em [`arena-hub/`](arena-hub/). O enunciado da disciplina
está em `docs_Projeto_Integrador.pdf`.

---

## 1. Definição do projeto

Itens exigidos no tópico 01 do enunciado ("definam antes da implementação").

| Item | Definição |
|---|---|
| **Tema** | Catálogo de quadras esportivas e organização de rachas (partidas avulsas). |
| **Problema / objetivo** | Encontrar quadra livre e completar time hoje depende de grupos de mensagem e do contato pessoal do dono do espaço. Não existe lugar único que mostre quais quadras existem, quanto custam e quais partidas ainda têm vaga. O site centraliza essa informação e recebe a solicitação de reserva. |
| **Público-alvo** | Praticantes amadores de esportes coletivos (18 a 45 anos) que jogam com frequência semanal; secundariamente, proprietários de quadras com horários ociosos. Acessam majoritariamente pelo celular, muitas vezes na rua — daí a prioridade para Mobile First e alvos de toque generosos. |
| **Proposta** | O usuário pode **consultar** o catálogo de quadras (modalidade, endereço, estrutura, preço/hora), **conhecer** o funcionamento da plataforma, **selecionar** um racha aberto com vagas e **preencher** o formulário de reserva com data, horário, tipo de reserva e serviços adicionais. |
| **Arquitetura** | Quatro páginas ligadas por uma navbar consistente, do geral para o específico: apresentação → catálogo → comunidade → conversão (formulário). Âncoras internas ligam as páginas a seções específicas. |

### Mapa de páginas

| Página | Papel | Seções |
|---|---|---|
| `index.html` | Apresentação e identidade | Hero, Como funciona (01), Modalidades (02), Donos de quadra (03) |
| `quadras.html` | Catálogo | Catálogo em grade (01), Regras de reserva (02) |
| `rachas.html` | Comunidade | Partidas da semana (01), Combinados (02) |
| `agendamento.html` | Conversão | Formulário de solicitação (01) |

---

## 2. Identidade visual

Direção **editorial esportiva**: referência de cartaz e revista de esporte.
O contraste vem de peso tipográfico e de régua, não de sombra difusa ou
gradiente.

| Elemento | Definição |
|---|---|
| **Marca** | ArenaHub — nome em caixa-alta acompanhado de uma marca vetorial (SVG inline) que representa a planta baixa de um campo. |
| **Paleta** | Tinta `#14150F` · Papel `#F2F0EA` · Primária (verde de campo) `#14513A` · Destaque (laranja) `#B23A10` · Linha `#D5D1C4`. Todos os pares texto/fundo utilizados foram conferidos e atingem no mínimo **4.5:1** (WCAG AA). |
| **Tipografia** | *Archivo Black* nos títulos e rótulos; *Archivo* (variável, 400–700) no texto corrido. Hospedadas em `assets/fonts/` — o site não depende de CDN e funciona offline. |
| **Botões** | Retângulos sólidos em caixa-alta. Primário: verde preenchido. Secundário: apenas contorno, preenchido no `:hover`. |
| **Cards** | Contorno de 2px, sem arredondamento. No `:hover`, deslocam-se e revelam sombra sólida. |
| **Inputs** | Borda inferior espessa, fundo verde-claro no `:focus`, vermelho apenas após interação. |
| **Links** | Sublinhados, com `:hover` em laranja e `:visited` em verde escuro. |

---

## 3. Decisões técnicas (para a defesa)

**Flexbox onde o eixo é único:** navbar (logo à esquerda, menu à direita),
grupos de botões, cabeçalho e rodapé dos cards, linhas de opções do formulário
e o rótulo de seção — cujo `::after` usa `flex: 1` para virar a régua que
preenche o espaço restante.

**Grid onde há linhas *e* colunas:** catálogo de quadras, lista de rachas,
passos da home, colunas do rodapé e os layouts de conteúdo + `<aside>`. O
número de colunas muda por breakpoint (1 → 2 → 3) e o `gap` é uniforme nos
dois eixos, o que o Flexbox não entrega sem cálculo de largura.

**Mobile First:** o bloco base do CSS atende telas pequenas em uma coluna. As
media queries em `768px` e `1024px` apenas **reorganizam a composição** —
cabeçalho vira linha, grades ganham colunas, o hero passa a duas colunas — em
vez de só reduzir elementos.

**Numerais por contador CSS:** os números dos passos e das etapas vêm de
`counter-increment` / `content: counter(...)`, não de texto digitado no HTML.
A numeração continua correta se um item for inserido ou removido.

**Validação sem JavaScript:** toda a validação é nativa (`required`, `min`,
`max`, `minlength`, `maxlength`, `pattern`). O feedback de erro só aparece
**após** a interação — `:invalid` é combinado com `:not(:placeholder-shown)`,
e `:user-invalid` cobre `date`, `time` e `<select>`, que não têm placeholder
visível. Sem isso, os campos obrigatórios ficariam vermelhos assim que a
página abrisse.

**IDs e classes:** `class` para estilo reutilizável; `id` para identificar um
ponto único do documento. Os IDs `#topo`, `#conteudo`, `#como-funciona`,
`#catalogo`, `#lista-rachas` e `#form-reserva` são alvos de âncora e recebem
`scroll-margin-top` no CSS para não ficarem encobertos pelo cabeçalho fixo.

---

## 4. Estrutura de arquivos

```
arena-hub/
├── index.html            Página inicial
├── quadras.html          Catálogo de quadras
├── rachas.html           Rachas abertos
├── agendamento.html      Formulário de reserva
│
├── css/                  Folhas de estilo (todas comentadas)
│   ├── style.css         Global: variáveis, reset, cabeçalho, botões,
│   │                     cards, etiquetas, aside e rodapé
│   ├── index.css         Hero, passos numerados, painel de proprietários
│   ├── quadras.css       Endereço da quadra no card
│   ├── rachas.css        Detalhes da partida e etiquetas de vagas
│   └── agendamento.css   Formulário
│
├── images/               21 fotos locais, 3 larguras de cada (ver README)
│
└── assets/
    └── fonts/            Fontes Archivo em .woff2
```

Cada página carrega `style.css` primeiro e depois o CSS da própria página.
O `GUIA-CSS.md`, na raiz do repositório, explica todo o CSS usado e indica
onde alterar cada coisa.

## 5. Como executar

O site é **estático e autocontido** — imagens e fontes estão no próprio
projeto, nada vem da internet. Basta abrir `arena-hub/index.html` no
navegador, com duplo clique.

Se preferir servir por HTTP (mais próximo de um ambiente real):

```bash
python3 -m http.server 8000 --directory arena-hub
```

Depois acesse `http://localhost:8000`.

---

## 6. Equipe

Grupo de 5 integrantes. Cada um deve conseguir localizar no código e explicar
as partes pelas quais ficou responsável.

| Integrante | Responsabilidade na apresentação |
|---|---|
| | Proposta, tema, público-alvo e arquitetura |
| | HTML semântico, títulos, links, imagens, classes e IDs |
| | CSS: seletores, cascata, especificidade e Box Model |
| | Layout: Flexbox, Grid e responsividade Mobile First |
| | Formulário, pseudo-classes, estados e acessibilidade |
