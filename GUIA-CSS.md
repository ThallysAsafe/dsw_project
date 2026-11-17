# Guia do CSS do ArenaHub

Este guia explica **cada escolha** do CSS, no formato "o que é → onde está →
por que usamos". A ideia é que qualquer integrante consiga responder à
pergunta "por que vocês usaram isso?" durante a apresentação.

Regras que seguimos ao escrever o CSS:

- **só entra o que dá para justificar**: se uma propriedade não resolve um
  problema concreto do site, ela não está lá;
- **só recursos tradicionais de CSS**, os que aparecem em qualquer material da
  disciplina. Nada de propriedades novas ou pouco conhecidas.

---

## Índice

1. [Organização dos arquivos](#1-organização-dos-arquivos)
2. [Variáveis no `:root`](#2-variáveis-no-root)
3. [Seletores, cascata e especificidade](#3-seletores-cascata-e-especificidade)
4. [Box Model](#4-box-model)
5. [Flexbox ou Grid? (decisão técnica)](#5-flexbox-ou-grid-decisão-técnica)
6. [Responsividade e Mobile First](#6-responsividade-e-mobile-first)
7. [Pseudo-classes, `transition` e `transform`](#7-pseudo-classes-transition-e-transform)
8. [Formulário: estados e validação](#8-formulário-estados-e-validação)
9. [Acessibilidade no CSS](#9-acessibilidade-no-css)
10. [Outras propriedades e por que estão lá](#10-outras-propriedades-e-por-que-estão-lá)
11. [O que tiramos na simplificação (e por quê)](#11-o-que-tiramos-na-simplificação-e-por-quê)
12. [Onde alterar cada coisa](#12-onde-alterar-cada-coisa)

---

## 1. Organização dos arquivos

| Arquivo | O que tem | Carregado em |
|---|---|---|
| `css/style.css` | Fontes, variáveis, base, cabeçalho, botões, cards, aside, rodapé | Todas as páginas |
| `css/index.css` | Destaque (hero), passos, painel para donos de quadra | `index.html` |
| `css/quadras.css` | Endereço da quadra no card | `quadras.html` |
| `css/rachas.css` | Cores das etiquetas de vagas | `rachas.html` |
| `css/agendamento.css` | Formulário | `agendamento.html` |

**Por quê?** O que se repete em várias páginas fica em `style.css` (reuso,
pedido no enunciado). O que só existe em uma página fica no arquivo dela, para
que uma página não carregue CSS que não usa.

**Ordem de carregamento:** cada página carrega `style.css` **primeiro** e o
CSS da página **depois**. Na cascata, quando duas regras têm a mesma
especificidade, vence a que vem depois — então o arquivo da página pode
complementar o geral.

**Ordem dentro do `style.css`:** fontes → variáveis → base → componentes
(cabeçalho, botões, cards, aside, rodapé) → media queries. As media queries
ficam no fim para vencerem as regras de celular que vêm antes.

**Nomes das classes:** seguimos o padrão BEM em português:

- `.cartao` → o bloco (componente)
- `.cartao__corpo` → um elemento de dentro do bloco (`__`)
- `.botao--primario` → uma variação do bloco (`--`)

Por quê? Só de ler o nome já se sabe a quem a classe pertence. E todas as
classes têm especificidade igual (uma classe só), o que evita brigas na cascata.

---

## 2. Variáveis no `:root`

```css
:root {
  --cor-primaria: #14513a;
  --borda: 2px solid var(--cor-tinta);
  --raio: 4px;
}

.botao--primario { background-color: var(--cor-primaria); }
```

**O que é:** um valor com nome, definido uma vez e usado com `var(...)`.
`:root` é o elemento `<html>`, então a variável vale para a página toda.

**Por que usamos:** o enunciado pede variáveis para "cores e valores
recorrentes". Se o verde mudar, troca-se em **um lugar só**.

**Quais variáveis temos e por quê:**

| Variável | Uso |
|---|---|
| `--cor-tinta` / `--cor-tinta-media` | Texto principal / secundário |
| `--cor-papel` / `--cor-branco` | Fundo da página / fundo de cards e formulário |
| `--cor-linha` | Bordas finas e divisórias |
| `--cor-primaria` (+ `-escura`, `-clara`) | Verde: botões, links, foco dos campos |
| `--cor-destaque` (+ `-clara`) | Laranja: hover, contorno de foco, vagas |
| `--cor-erro` | Campo inválido |
| `--fonte-titulo` / `--fonte-texto` | As duas famílias tipográficas |
| `--borda` | A borda de 2px que aparece em quase todo componente |
| `--raio` | O arredondamento dos cantos |
| `--sombra` | A sombra sólida do hover dos cards |

Espaçamentos e tamanhos de fonte **não** viraram variável: estão escritos em
`rem` direto na regra, porque assim fica mais fácil ler cada regra sozinha.

---

## 3. Seletores, cascata e especificidade

### Tipos de seletor usados

| Tipo | Exemplo no projeto | Por quê |
|---|---|---|
| Elemento | `body`, `h1`, `a`, `img`, `ul` | Estilo padrão de todas as tags daquele tipo |
| Classe | `.cartao`, `.botao` | Estilo reutilizável — a maior parte do CSS |
| ID | `#lista-reservas` (`agendamento.css`) | Elemento único da página, que o JavaScript também encontra pelo id |
| Universal | `*` | Reset: vale para todos os elementos |
| Descendente | `.rodape a` | "links que estão dentro do rodapé" |
| Irmão adjacente | `legend + p`, `input:disabled + label` | "o elemento logo depois de" |
| Pseudo-classe | `:hover`, `:focus`, `:disabled` | Estados (ver seção 7) |

### Especificidade: quem vence

```
#id                1-0-0   mais forte
.classe  :hover    0-1-0
elemento           0-0-1   mais fraco
```

Empate → vence a regra que aparece **por último**.

**Por que quase não usamos ID no CSS?** Porque o ID é forte demais (1-0-0):
para mudar um estilo feito com ID, só outro ID ou um seletor ainda maior
vence. Por isso o estilo fica em classes, e os IDs ficam para âncoras
(`quadras.html#catalogo`), para os `label for="..."` do formulário e para o
JavaScript. O único estilo por ID é o `#lista-reservas`, porque ele é um
elemento único da página.

### Exemplos reais do projeto (bons para a apresentação)

**1) Precisar "subir" a especificidade de propósito** — `agendamento.css`:

```css
.formulario fieldset { margin-bottom: 2rem; }   /* 0-1-1 */
.formulario .subgrupo { margin-bottom: 0; }     /* 0-2-0 → vence */
```

Só `.subgrupo` (0-1-0) perderia para `.formulario fieldset` (0-1-1). Por isso
colocamos `.formulario` na frente.

**2) Empate decidido pela ordem** — `style.css`, rodapé:

```css
.rodape p       { font-size: 0.9rem; }   /* 0-1-1 */
.rodape__base p { font-size: 0.75rem; }  /* 0-1-1, vem depois → vence */
```

**3) A ordem dos estados do link** — `style.css`:

```css
.link-texto:visited { color: var(--cor-primaria-escura); }
.link-texto:hover   { color: var(--cor-destaque); }
```

As duas têm 0-2-0. O `:hover` vem depois, então continua funcionando em link já
visitado. Se invertêssemos, o link visitado nunca mudaria de cor no hover.

**4) `:disabled` depois dos outros estados do botão** — `style.css`:

`.botao:disabled` foi escrito **depois** de `.botao:hover` e
`.botao--primario:hover` (mesma especificidade). Assim, um botão desabilitado
não "sobe" nem muda de cor quando o mouse passa.

---

## 4. Box Model

Todo elemento é uma caixa: **conteúdo → padding → border → margin**.

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

- **`box-sizing: border-box`**: a `width` passa a incluir padding e borda. Um
  campo com `width: 100%` e `padding: 0.75rem` continua com 100% — sem isso ele
  ficaria mais largo que o formulário e causaria rolagem horizontal.
- **`margin: 0; padding: 0`**: cada navegador coloca margens diferentes em
  `h1`, `p`, `ul`, `figure`... Zeramos tudo e colocamos só o espaço que
  queremos.

**Uso consciente no projeto:**

- `padding` = espaço **interno** (ex.: `.cartao__corpo { padding: 1.25rem; }`,
  o texto não encosta na borda).
- `margin` = espaço **externo** entre blocos (ex.: `.secao__cabecalho
  { margin-bottom: 2rem; }`).
- `gap` = espaço entre itens de flex/grid (ver seção 5). Preferimos `gap` a
  `margin` nos itens porque ele não deixa sobra no último item.
- `border` = quase todos os componentes usam `var(--borda)` (2px).
- `border-radius: var(--raio)` = cantos levemente arredondados (4px) em
  botões, cards, campos e etiquetas — o mesmo valor em todo lugar, para
  manter a consistência visual.
- `margin: 0 auto` no `.container` = centraliza o conteúdo na tela.

---

## 5. Flexbox ou Grid? (decisão técnica)

**A regra que seguimos:**

- **Flexbox** quando os itens ficam em **uma direção só** (uma linha ou uma
  coluna).
- **Grid** quando a estrutura tem **linhas e colunas** ao mesmo tempo.

### Onde usamos Flexbox

| Componente | Classe | Por quê |
|---|---|---|
| Cabeçalho | `.cabecalho__interno` | Logo e menu numa linha (desktop) ou coluna (celular) |
| Logo | `.logo`, `.logo__marca` | Ícone ao lado do nome, centralizados |
| Menu | `.menu__lista` | Links em linha; `flex-wrap` quebra se não couber |
| Grupos de botões | `.grupo-botoes`, `.formulario__acoes`, `.cartao__acoes` | Botões lado a lado, quebrando linha se faltar espaço |
| Corpo do card | `.cartao`, `.cartao__corpo` | Conteúdo em coluna; `margin-top: auto` empurra o preço para o fim |
| Topo e rodapé do card | `.cartao__cabecalho`, `.cartao__rodape` | Etiquetas / preço e botão nas pontas (`space-between`) |
| Destaque da home | `.destaque__conteudo` | Texto e imagem: coluna no celular, linha no desktop |
| Números da home | `.destaque__indicadores` | Três números em linha, com `flex-wrap` |
| Campo do formulário | `.campo` | Rótulo, campo e dica empilhados com `gap` |
| Opção de rádio/checkbox | `.opcao` | Caixinha ao lado do texto |
| Base do rodapé | `.rodape__base` | Copyright à esquerda, "voltar ao topo" à direita |

### Onde usamos Grid

| Componente | Classe | Colunas (celular → tablet → desktop) |
|---|---|---|
| Catálogo de quadras, rachas e reservas | `.grade`, `.grade--tres` | 1 → 2 → 3 |
| Cards de modalidades (home) | `.grade` | 1 → 2 |
| Passos da home | `.passos` | 1 → 2 → 3 |
| Colunas do rodapé | `.rodape__colunas` | 1 → 3 |
| Conteúdo + aside | `.area-conteudo`, `.area-formulario` | 1 → `2fr 1fr` no desktop |
| Campos lado a lado | `.campo-duplo` | 1 → 2 |
| Opções de rádio/checkbox | `.grupo-opcoes` | 1 → 2 |

**Por que Grid no catálogo e não Flexbox?** Com Grid basta dizer
`grid-template-columns: repeat(3, 1fr)` e todos os cards ficam com a mesma
largura, alinhados em linhas e colunas, com o mesmo `gap` nos dois sentidos.
Com Flexbox teríamos que calcular a largura de cada card na mão.

### Propriedades usadas

- Flexbox: `display: flex`, `flex-direction`, `justify-content`,
  `align-items`, `flex-wrap`, `gap`, `flex: 1`, `flex-shrink: 0`.
- Grid: `display: grid`, `grid-template-columns`, `repeat()`, `fr`, `gap`,
  `align-items: start`.
- `gap: 0 1.25rem` (em `.campo-duplo`) = 0 entre linhas e 1.25rem entre
  colunas.
- `fr` = "fração do espaço livre". `2fr 1fr` = a primeira coluna tem o dobro
  da segunda.

---

## 6. Responsividade e Mobile First

**Mobile First:** o CSS escrito **fora** das media queries é o layout do
celular (uma coluna). As media queries usam `min-width`, ou seja, só
**acrescentam** coisas quando a tela fica maior.

**Por quê?** O público do site acessa principalmente pelo celular (ver
README). E é mais simples partir do layout de uma coluna e ir abrindo colunas
do que o contrário.

Usamos só **dois pontos de quebra**:

| Media query | O que muda (reorganização, não só redução) |
|---|---|
| `@media (min-width: 768px)` — tablet | Cabeçalho vira uma linha (logo à esquerda, menu à direita); grades ganham 2 colunas; preço e botão do card ficam lado a lado; botão deixa de ocupar a largura toda; rodapé ganha 3 colunas; campos do formulário ficam em dupla; títulos crescem |
| `@media (min-width: 1024px)` — desktop | Catálogo e rachas ganham 3 colunas; destaque da home fica texto ao lado da imagem; aside vai para a direita do conteúdo; passos ficam em 3 colunas; `h1` cresce mais |

**Sem rolagem horizontal:** `img { max-width: 100%; }`, `box-sizing:
border-box`, `textarea { resize: vertical; }` e o `flex-wrap` do menu garantem
que nada fique mais largo que a tela.

**Como testar:** no navegador, F12 → ícone de celular (modo responsivo) e
testar 375px, 768px e 1280px.

---

## 7. Pseudo-classes, `transition` e `transform`

Todas as interações são discretas e têm função: mostrar ao usuário o que é
clicável e o que está acontecendo.

| Recurso | Onde | Para quê |
|---|---|---|
| `:hover` | Links, menu, botões, cards, passos, opções do formulário | Mostrar que o elemento é clicável |
| `:focus` | Todos os elementos; campos do formulário; `.link-pular` | Contorno laranja para quem navega com Tab; destacar o campo sendo preenchido; mostrar o link de pular |
| `:active` | `.botao:active` | O botão "afunda" de volta no clique |
| `:visited` | `.link-texto:visited` | Links de texto já visitados ficam verde-escuro |
| `:invalid` | `.campo input:focus:invalid` | Borda vermelha no campo que está sendo preenchido com valor errado |
| `:disabled` | Botão "Partida lotada", cupom, "Transmissão ao vivo" | Mostrar que o controle está indisponível |

### `transition`

```css
.cartao { transition: transform 0.2s, box-shadow 0.2s; }
```

Suaviza a mudança em 0,2 segundo em vez de "pular". Listamos **só as
propriedades que mudam** (em vez de `all`), assim fica claro o que anima.

### `transform`

```css
.cartao:hover  { transform: translateY(-4px); box-shadow: var(--sombra); }
.botao:hover   { transform: translateY(-2px); }
.botao:active  { transform: translateY(0); }
```

`translateY` move o elemento para cima sem empurrar os vizinhos (diferente de
mudar a `margin`). O card "levanta" e a sombra sólida aparece embaixo, como se
ele saísse da página.

---

## 8. Formulário: estados e validação

A validação é **do HTML** (`required`, `min`, `max`, `minlength`,
`maxlength`, `pattern`). O CSS só **mostra** o resultado.

```css
/* campo sendo preenchido */
.campo input:focus { border-color: var(--cor-primaria); background-color: var(--cor-primaria-clara); }

/* campo em foco com valor que não passa na validação */
.campo input:focus:invalid { border-color: var(--cor-erro); background-color: var(--cor-destaque-clara); }

/* campo indisponível */
.campo input:disabled { background-color: var(--cor-papel); cursor: not-allowed; }
```

**Por que `:focus:invalid` e não só `:invalid`?** Porque um campo
obrigatório vazio já é `:invalid` assim que a página abre: o formulário
inteiro apareceria vermelho antes de o usuário digitar qualquer coisa.
Juntando com `:focus`, o vermelho aparece **só no campo que o usuário está
preenchendo**, e some quando o valor fica certo. A dica embaixo do campo
(`.campo__dica`) explica a regra ("mínimo de 5 caracteres").

Se o usuário tentar enviar com erro, o próprio navegador mostra a mensagem e
leva o foco ao campo errado, que fica vermelho pela mesma regra.

**Outras escolhas do formulário:**

- `font-family: inherit` nos campos: `input`, `select` e `textarea` **não**
  herdam a fonte da página por padrão.
- `flex-shrink: 0` no rádio/checkbox: sem isso, quando o texto é longo, o
  Flexbox encolhe a caixinha.
- `cursor: not-allowed` em campos desabilitados e `cursor: pointer` nos
  rótulos das opções.
- `legend + p`: pega o parágrafo de explicação que vem logo depois do título de
  cada grupo.

---

## 9. Acessibilidade no CSS

- **Foco visível:** `:focus` com contorno laranja de 3px (`outline`) em
  qualquer elemento. Quem navega com Tab sempre vê onde está.
- **Link "pular para o conteúdo"** (`.link-pular`): fica fora da tela
  (`left: -9999px`) e aparece no `:focus`. É o primeiro Tab da página e leva
  direto ao `<main>`, sem passar pelo menu.
- **Contraste:** os pares texto/fundo usados atingem no mínimo 4.5:1 (WCAG AA).
  Ex.: no rodapé escuro, o hover dos links tira o sublinhado em vez de usar
  laranja, porque laranja sobre preto ficaria com contraste baixo.
- **Alvos de toque:** `.botao--bloco` ocupa a largura toda no celular, e os
  botões têm cerca de 48px de altura.

---

## 10. Outras propriedades e por que estão lá

| Propriedade | Onde | Por quê |
|---|---|---|
| `@font-face` | `style.css` | A fonte dos títulos (Archivo Black) fica em `assets/fonts/`; o site funciona sem internet |
| `font-family: Arial, Helvetica, sans-serif` | Texto comum | Fonte que já existe em todo computador; as outras são reserva, caso a primeira falte |
| `font-weight: 400` nos títulos | `h1, h2, h3` | A Archivo Black já é grossa; o navegador deixaria títulos em negrito e "engrossaria" a fonte de novo |
| `text-transform: uppercase` | Títulos, botões, menu | Identidade visual (estilo cartaz esportivo) sem digitar em maiúsculas no HTML |
| `line-height: 1.6` / `1.1` | Texto / títulos | Texto corrido precisa de respiro; títulos grandes ficam melhores juntos |
| `max-width: 700px` | `.secao__texto`, `.pagina-titulo p` | Linhas de texto muito longas cansam a leitura |
| `position: absolute` + `z-index` | `.link-pular` | Tira o link do fluxo e o coloca por cima de tudo quando aparece |
| `max-width: 100%; height: auto` | `img` | A imagem nunca passa da largura da tela e mantém a proporção. Todas as fotos dos cards têm a mesma proporção (4:3), então ficam com a mesma altura |
| `overflow: hidden` | `.cartao`, `.destaque__figura` | A foto não passa por cima do canto arredondado do card |
| `min-height` | `#lista-reservas` | A seção não "pula" enquanto o JavaScript carrega as reservas |
| `list-style: none` | `ul` | Menus e listas de informação não precisam de bolinha |
| `list-style-position: inside` | `ol` | O número dos passos e etapas fica dentro da caixa |
| `font-style: normal` | `.rodape address` | `<address>` vem em itálico por padrão |
| `resize: vertical` | `textarea` | Deixa aumentar a altura, mas não a largura (evita quebrar o layout) |

---

## 11. O que tiramos na simplificação (e por quê)

Se o professor perguntar por que algo **não** está no CSS:

| Removido | Motivo |
|---|---|
| `unicode-range` e arquivos `latin-ext` das fontes | Todos os acentos do português (á, ç, ã, ê...) já estão no arquivo `latin` |
| Fonte variável Archivo no texto | Exigia `font-weight: 400 700` no `@font-face`; trocamos por Arial |
| ~20 variáveis de tamanho e espaçamento | Ficava mais difícil ler as regras; usamos `rem` direto |
| Contadores CSS (`counter-reset`/`counter-increment`) | A própria `<ol>` já numera os itens |
| `:has()`, `:valid`, `:placeholder-shown`, `:user-invalid`, `:focus-visible` | Pseudo-classes novas ou pouco conhecidas; `:focus` e `:invalid` resolvem |
| `::marker`, `accent-color`, `object-fit`, `scroll-margin-top`, unidade `ch` | Recursos menos conhecidos; não fazem falta para o layout |
| Cabeçalho fixo (`position: sticky`) | Precisava de `z-index` e `scroll-margin-top` para não cobrir os títulos das âncoras |
| Media queries `pointer: coarse`, `max-height`, `prefers-reduced-motion` | Ajustes finos que não mudavam a composição do layout |
| Zoom na imagem do card no hover | Efeito sem função (o enunciado pede interações com propósito) |
| `position: sticky` no aside | O aside é curto; não precisava acompanhar a rolagem |
| Várias regras `:visited` em botões | Agora `:visited` é aplicado só aos links de texto, onde faz sentido |
| `style="..."` dentro do JavaScript | O enunciado pede CSS externo; viraram as classes `.cartao__acoes` e `.botao--perigo` |

---

## 12. Onde alterar cada coisa

| Quero mudar... | Arquivo | O que mexer |
|---|---|---|
| Cor verde (botões, links) | `style.css` | `--cor-primaria` no `:root` |
| Cor laranja (hover, foco, vagas) | `style.css` | `--cor-destaque` no `:root` |
| Fonte dos títulos ou do texto | `style.css` | `--fonte-titulo` / `--fonte-texto` |
| Arredondamento dos cantos | `style.css` | `--raio` |
| Espessura das bordas | `style.css` | `--borda` |
| Tamanho dos títulos | `style.css` | `h1`, `h2`, `h3` (e dentro das media queries) |
| Colunas do catálogo | `style.css` | `.grade` (tablet) e `.grade--tres` (desktop) |
| Altura das fotos dos cards | `style.css` | `.cartao__imagem { height }` |
| Efeito de hover dos cards | `style.css` | `.cartao:hover` |
| Botões | `style.css` | `.botao`, `.botao--primario`, `.botao--secundario` |
| Destaque da home | `index.css` | `.destaque...` |
| Visual dos campos | `agendamento.css` | `.campo input, .campo select, .campo textarea` |
| Cor de erro do formulário | `style.css` | `--cor-erro` |
| Cores da etiqueta de vagas | `rachas.css` | `.etiqueta--vagas` |
