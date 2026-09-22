# Guia do CSS do ArenaHub

Este guia explica **o CSS que existe neste projeto** — não é uma apostila
genérica. Toda propriedade citada aqui está sendo usada de verdade em algum
arquivo de `arena-hub/css/`, e todo exemplo aponta para uma classe real.

O projeto usa **69 propriedades CSS** e **16 pseudo-classes/pseudo-elementos**.

> **Como usar:** procure o que você quer mudar no índice, leia a explicação e
> vá direto ao arquivo indicado. Se estiver com pressa, pule para a seção
> [**Onde alterar cada coisa?**](#13-onde-alterar-cada-coisa).

---

## Índice

1. [Como o CSS está organizado](#1-como-o-css-está-organizado)
2. [O painel de controle: variáveis](#2-o-painel-de-controle-variáveis)
3. [Cores](#3-cores)
4. [Texto](#4-texto)
5. [Espaçamento](#5-espaçamento)
6. [Dimensões](#6-dimensões)
7. [Box Model](#7-box-model)
8. [Layout: Flexbox e Grid](#8-layout-flexbox-e-grid)
9. [Posicionamento](#9-posicionamento)
10. [Interações e estados](#10-interações-e-estados)
11. [Responsividade](#11-responsividade)
12. [Recursos especiais](#12-recursos-especiais)
13. [Onde alterar cada coisa?](#13-onde-alterar-cada-coisa)
14. [Antes e depois da refatoração](#14-antes-e-depois-da-refatoração)

---

## 1. Como o CSS está organizado

### Os cinco arquivos

| Arquivo | Linhas | Guarda |
|---|---|---|
| `css/style.css` | ~1020 | Variáveis, reset, tipografia, cabeçalho, botões, cards, etiquetas, aside e rodapé — tudo que aparece em **mais de uma página** |
| `css/index.css` | ~278 | Hero, passos numerados e painel de proprietários |
| `css/quadras.css` | ~24 | Endereço da quadra no card |
| `css/rachas.css` | ~63 | Detalhes da partida e etiquetas de vagas |
| `css/agendamento.css` | ~380 | O formulário inteiro |

### A ordem de carregamento importa

Toda página carrega **dois** arquivos, nesta ordem:

```html
<link rel="stylesheet" href="css/style.css">      <!-- 1º: o global -->
<link rel="stylesheet" href="css/quadras.css">    <!-- 2º: o da página -->
```

O arquivo da página vem **depois**, então ele pode ajustar o que veio do
global. Isso é a **cascata**: quando duas regras têm a mesma força, vence a
que está por último.

### Como achar uma regra em 10 segundos

1. No navegador, clique com o botão direito no elemento → *Inspecionar*.
2. Veja o nome da classe (ex.: `card__preco`).
3. A classe diz onde procurar:
   - começa com o nome de um componente compartilhado (`card`, `botao`,
     `navbar`, `rodape`, `etiqueta`, `aside-info`) → **style.css**
   - `hero`, `passo`, `painel-destaque` → **index.css**
   - `campo`, `opcao`, `formulario` → **agendamento.css**
4. Todo arquivo tem um **ÍNDICE numerado** no topo, em comentário.

### Especificidade: quem vence quando duas regras brigam

Regra prática, do mais forte para o mais fraco:

```
#id  (ex.: #catalogo)        >  1 - 0 - 0   mais forte
.classe  (ex.: .card)        >  0 - 1 - 0
elemento  (ex.: p, h2)       >  0 - 0 - 1   mais fraco
```

Contam-se os três tipos. `.formulario fieldset` (1 classe + 1 elemento) vence
`.subgrupo` (1 classe), **mesmo estando escrita antes**. Por isso, em
`agendamento.css`, a regra do subgrupo precisou virar `.formulario .subgrupo`
(2 classes) — há um comentário explicando isso no próprio arquivo.

---

## 2. O painel de controle: variáveis

### O que é

Uma variável CSS é um valor guardado com um nome, declarado em `:root`
(que significa "a raiz do documento", ou seja, vale para a página inteira).

```css
:root {
  --cor-primaria: #14513a;
}
```

Para usar, chama-se com `var()`:

```css
.botao--primario {
  background-color: var(--cor-primaria);
}
```

### Para que serve

Para **mudar uma vez e valer em todo lugar**. A cor primária aparece em
botões, links, etiquetas, a marca do logo e o item ativo do menu. Sem
variável, trocar o verde exigiria caçar `#14513a` em cinco arquivos. Com
variável, muda-se **uma linha**.

### Onde é usado

`css/style.css`, **seção 02**. É o único lugar do projeto onde as variáveis
são declaradas.

### As variáveis do projeto

**Cores**

| Variável | Valor | Onde aparece |
|---|---|---|
| `--cor-tinta` | `#14150f` | Texto, bordas, fundo do rodapé |
| `--cor-tinta-media` | `#55584b` | Textos de apoio, dicas do formulário |
| `--cor-papel` | `#f2f0ea` | Fundo geral da página |
| `--cor-superficie` | `#ffffff` | Fundo de cards e do formulário |
| `--cor-linha` | `#d5d1c4` | Traços finos e bordas discretas |
| `--cor-linha-clara` | `rgba(242,240,234,.25)` | Traço sobre fundo escuro (rodapé e painel) |
| `--cor-primaria` | `#14513a` | Botões, links, etiquetas, logo |
| `--cor-primaria-escura` | `#0d3927` | `:hover` do botão, links visitados |
| `--cor-primaria-clara` | `#dce8e0` | Fundo de etiqueta e de campo em foco |
| `--cor-destaque` | `#b23a10` | Vagas, asterisco de obrigatório, contorno de foco |
| `--cor-destaque-clara` | `#f7e3d6` | Fundo da etiqueta de vagas e de campo com erro |
| `--cor-erro` | `#a8200f` | Borda de campo inválido |
| `--cor-sucesso` | `#14513a` | Borda de campo válido |

**Fontes e tamanhos**

| Variável | Valor | Onde aparece |
|---|---|---|
| `--fonte-display` | `"Archivo Black", ...` | Títulos, botões, rótulos, números |
| `--fonte-base` | `"Archivo", system-ui, ...` | Todo o texto corrido |
| `--tamanho-micro` | `0.75rem` (12px) | Rótulos em caixa-alta, dicas |
| `--tamanho-pequeno` | `0.875rem` (14px) | Textos de card, rodapé |
| `--tamanho-base` | `1rem` (16px) | Texto padrão do site |
| `--tamanho-medio` | `1.125rem` (18px) | Texto do hero, nome no logo |
| `--tamanho-h3` | `1.25rem` (20px) | `<h3>`, preço do card, legend |
| `--tamanho-h2` | `1.75rem` (28px) | `<h2>` — **cresce nas media queries** |
| `--tamanho-h1` | `2.25rem` (36px) | `<h1>` — **cresce nas media queries** |
| `--tamanho-numero` | `2.5rem` (40px) | Números do hero — **cresce nas media queries** |
| `--altura-linha` | `1.6` | Espaço entre linhas do texto |
| `--altura-linha-titulo` | `1.05` | Títulos com linhas bem juntas |
| `--espacamento-rotulo` | `0.12em` | `letter-spacing` das caixas-altas |

> ⚠️ **Atenção:** `--tamanho-h1`, `--tamanho-h2` e `--tamanho-numero` são
> **redefinidos** nas seções 13 e 14 do `style.css` para crescerem em telas
> maiores. Se um título não mudar de tamanho como você esperava, confira
> também lá embaixo.

**Espaçamentos, bordas e o resto**

| Variável | Valor | Onde aparece |
|---|---|---|
| `--espaco-xs` | `0.5rem` (8px) | `gap` de itens próximos |
| `--espaco-sm` | `0.75rem` (12px) | Padding de links do menu e campos |
| `--espaco-md` | `1.25rem` (20px) | Padding de card e container |
| `--espaco-lg` | `2rem` (32px) | Padding do painel, gap das grades |
| `--espaco-xl` | `3.5rem` (56px) | Espaço vertical entre seções |
| `--raio` | `0` | Arredondamento de **todas** as caixas |
| `--borda-fina` | `1px solid var(--cor-linha)` | Divisórias internas |
| `--borda-forte` | `2px solid var(--cor-tinta)` | Contorno de cards e botões |
| `--borda-grossa` | `4px solid var(--cor-tinta)` | Réguas de destaque |
| `--sombra-solida` | `5px 5px 0 var(--cor-tinta)` | `:hover` de botão e passo |
| `--sombra-solida-grande` | `8px 8px 0 var(--cor-tinta)` | `:hover` do card |
| `--largura-container` | `1120px` | Largura máxima do conteúdo |
| `--largura-leitura` | `62ch` | Largura máxima de parágrafo |
| `--altura-cabecalho` | `7rem` | Reserva das âncoras |
| `--transicao` | `all 0.2s ease` | Suaviza `:hover`, `:focus`, `:active` |

### Exemplo prático

Quer trocar o verde do projeto por azul? **Uma linha:**

```css
:root {
  --cor-primaria: #1b4f8a;   /* era #14513a */
}
```

Botões, links, etiquetas, logo e o item ativo do menu mudam juntos.

### O que acontece se eu alterar

- `--espaco-md: 1.25rem` → `2rem`: cards, container e campos ficam com mais
  espaço interno **ao mesmo tempo**, e o site inteiro fica mais "arejado".
- `--raio: 0` → `8px`: **todas** as caixas do site ficam arredondadas de uma
  vez (cards, botões, formulário, etiquetas, aside, painel, passos).
- `--largura-container: 1120px` → `1400px`: o conteúdo passa a ocupar mais
  espaço no monitor grande.

---

## 3. Cores

### `color`

**O que é:** a cor do **texto** de um elemento.
**Para que serve:** definir a cor das letras.
**Onde é usado:** em todos os 5 arquivos. Ex.: `body` (`style.css` seção 04),
`.card__texto`, `.rodape a`, `.obrigatorio` (`agendamento.css`).
**O que altera visualmente:** só as letras — fundo e borda não mudam.

```css
/* style.css, seção 04 */
body {
  color: var(--cor-tinta);       /* quase preto */
}
```

**Se eu alterar:** trocar para `var(--cor-tinta-media)` deixa **todo** o texto
do site mais claro e reduz o contraste — cuidado com legibilidade.

**Exemplo prático:** deixar o asterisco de obrigatório verde em vez de laranja:

```css
/* agendamento.css, seção 02 */
.obrigatorio {
  color: var(--cor-primaria);    /* era var(--cor-destaque) */
}
```

### `background-color`

**O que é:** a cor de **fundo** da caixa do elemento.
**Para que serve:** separar visualmente blocos da página.
**Onde é usado:** `body`, `.secao--papel`, `.card`, `.etiqueta`, `.rodape`,
`.painel-destaque`, `.opcao:hover`, campos em foco.
**O que altera visualmente:** preenche todo o retângulo do elemento,
**incluindo a área do `padding`**, mas não a do `margin`.

```css
/* style.css, seção 09 */
.card {
  background-color: var(--cor-superficie);   /* branco */
}
```

**Se eu alterar:** `.card { background-color: var(--cor-papel); }` faz o card
se misturar ao fundo da página — ele "some" visualmente, restando só a borda.

**Exemplo prático:** fundo verde-claro nos cards:

```css
.card {
  background-color: var(--cor-primaria-clara);
}
```

### `accent-color`

**O que é:** a cor da marca de "selecionado" em rádios e checkboxes.
**Para que serve:** pintar o controle nativo do navegador sem recriá-lo do zero.
**Onde é usado:** `agendamento.css`, seção 04, em
`.opcao input[type="radio"], .opcao input[type="checkbox"]`.
**O que altera visualmente:** a bolinha do rádio e o "✓" do checkbox quando
marcados — de azul padrão do sistema para o verde do projeto.
**Se eu alterar:** `accent-color: var(--cor-destaque)` deixa as marcas laranja.

### Contraste — uma regra que não dá para quebrar

Todos os pares texto/fundo do projeto foram medidos e atingem no mínimo
**4.5:1**, o exigido pela WCAG AA. O par mais apertado é a etiqueta de vagas
(`--cor-destaque` sobre `--cor-destaque-clara`), com **4.82:1**.

Se trocar cores, verifique o contraste antes de commitar. Qualquer par abaixo
de 4.5:1 reprova no critério de acessibilidade.

---

## 4. Texto

### `font-family`

**O que é:** a lista de fontes usadas, em ordem de preferência.
**Para que serve:** definir o desenho das letras. O navegador tenta a
primeira; se não tiver, vai para a próxima.
**Onde é usado:** `body` usa `--fonte-base`; títulos, botões e rótulos usam
`--fonte-display`.
**O que altera visualmente:** muda completamente a personalidade do texto.

```css
/* style.css, seção 04 */
h1, h2, h3 {
  font-family: var(--fonte-display);   /* "Archivo Black" */
}
```

**Se eu alterar:** trocar `--fonte-display` para `var(--fonte-base)` deixa os
títulos com o mesmo peso do texto — o site perde o ar de cartaz.

> As fontes são carregadas de `assets/fonts/` pelo `@font-face`
> (seção 01 do `style.css`), e não de um CDN. O site funciona offline.

### `font-size`

**O que é:** o tamanho da letra.
**Para que serve:** criar a hierarquia visual — título grande, apoio pequeno.
**Onde é usado:** nos 5 arquivos, quase sempre via variável.
**O que altera visualmente:** o tamanho das letras e, por consequência, a
altura da caixa que as contém.

```css
/* style.css, seção 04 */
h1 { font-size: var(--tamanho-h1); }   /* 36px no celular */
```

**Se eu alterar:** `--tamanho-h1: 3rem` deixa todos os `<h1>` maiores.
**Mas lembre** que esse valor é redefinido em 768px e 1024px — mudar só o
`:root` afeta apenas o celular.

> `rem` é relativo ao tamanho base do navegador (normalmente 16px). Assim,
> `1.25rem` = 20px. Quem aumenta a fonte do sistema vê o site acompanhar.

### `font-weight`

**O que é:** a espessura do traço da letra (400 = normal, 700 = negrito).
**Onde é usado:** `h1, h2, h3` (400), `.link-texto` (600), `.opcao label` (600).
**O que altera visualmente:** letras mais grossas ou mais finas.

```css
/* style.css, seção 04 */
h1, h2, h3 {
  font-weight: 400;   /* a fonte Archivo Black JÁ é pesada */
}
```

**Se eu alterar:** colocar `700` aqui faria o navegador engrossar
artificialmente uma fonte que já é preta — o resultado fica borrado.

### `line-height`

**O que é:** a altura de cada linha de texto.
**Para que serve:** dar respiro entre linhas e facilitar a leitura.
**Onde é usado:** `body` (1.6) e títulos (1.05).
**O que altera visualmente:** o espaço **vertical** entre as linhas.

**Se eu alterar:** `--altura-linha: 1.6` → `2.2` afasta muito as linhas e o
parágrafo parece desmontado. Abaixo de `1.3`, as linhas encostam.

### `letter-spacing`

**O que é:** o espaço entre as letras.
**Onde é usado:** `--espacamento-rotulo` (`0.12em`) em todos os textos em
caixa-alta; valor negativo (`-0.01em`) nos títulos.
**O que altera visualmente:** textos em caixa-alta grudados ficam difíceis de
ler; por isso os rótulos são espaçados. Nos títulos grandes acontece o
contrário: um valor negativo aperta as letras e dá o ar de cartaz.

```css
/* style.css, seção 06 */
.secao__numero {
  letter-spacing: var(--espacamento-rotulo);   /* "01 / CATÁLOGO" */
}
```

### `text-transform`

**O que é:** transforma o texto em maiúsculas, minúsculas ou capitalizado.
**Onde é usado:** `uppercase` em títulos, botões, etiquetas, menu e rótulos.
**O que altera visualmente:** só a **exibição** — o HTML continua escrito
normalmente, o que é melhor para leitores de tela e para editar o conteúdo.

```css
/* style.css, seção 08 */
.botao {
  text-transform: uppercase;   /* "Agendar horário" vira "AGENDAR HORÁRIO" */
}
```

**Se eu alterar:** trocar para `none` devolve o texto exatamente como está no
HTML — o visual fica bem mais suave e menos "esportivo".

### `text-align`

**O que é:** o alinhamento horizontal do texto.
**Onde é usado:** `.botao { text-align: center; }` (`style.css`, seção 08).
**O que altera visualmente:** centraliza o rótulo do botão quando ele quebra
em duas linhas.

### `text-decoration`, `text-decoration-color`, `text-decoration-thickness`, `text-underline-offset`

**O que são:** controlam o sublinhado dos links.
**Onde são usados:** `a` (seção 04), `.link-texto` (seção 06), `.rodape a`
(seção 12), `.botao` e `.navbar__link` (que usam `none`).
**O que alteram visualmente:**

| Propriedade | Efeito |
|---|---|
| `text-decoration: underline` | liga o sublinhado |
| `text-decoration: none` | desliga (botões e menu) |
| `text-underline-offset: 3px` | afasta o traço da letra, sem cortar o "g" e o "p" |
| `text-decoration-thickness: 2px` | engrossa o traço dos links de conteúdo |
| `text-decoration-color` | pinta só o traço (laranja no rodapé) |

**Por que manter sublinhado:** quem não distingue cores identifica o link pelo
traço. Remover o sublinhado dos links de texto prejudica a acessibilidade.

### `white-space`

**O que é:** controla como o texto quebra de linha.
**Onde é usado:** `.etiqueta { white-space: nowrap; }` (`style.css`, seção 10).
**O que altera visualmente:** impede que "FUTEBOL SOCIETY" quebre em duas
linhas dentro da etiqueta.
**Se eu alterar:** com `normal`, etiquetas longas quebram e a linha do card
fica torta.

### `font-style`

**O que é:** itálico ou normal.
**Onde é usado:** `.rodape address { font-style: normal; }` (seção 12).
**Por quê:** o navegador coloca `<address>` em itálico por padrão; aqui isso é
desfeito para manter o rodapé uniforme.

---

## 5. Espaçamento

A diferença essencial:

```
   margin  = espaço FORA da caixa (empurra os vizinhos)
   padding = espaço DENTRO da caixa (afasta o conteúdo da borda)
   gap     = espaço ENTRE filhos de um flex/grid
```

### `padding`

**O que é:** o espaço interno, entre o conteúdo e a borda.
**Para que serve:** impedir que o texto encoste na borda da caixa.
**Onde é usado:** `.container`, `.card__corpo`, `.botao`, `.campo input`,
`.secao`, `.aside-info`, `.opcao`.
**O que altera visualmente:** a caixa **cresce** e o conteúdo fica mais
afastado das bordas.

```css
/* style.css, seção 08 */
.botao {
  padding: var(--espaco-sm) var(--espaco-md);   /* 12px em cima/baixo, 20px nos lados */
}
```

Quando há dois valores, o primeiro é **vertical** e o segundo **horizontal**.

**Se eu alterar:** `padding: 20px 40px` deixa os botões bem maiores e mais
espaçosos. Para diminuir só de um lado, use `padding-top`, `padding-bottom`
etc. (o projeto usa `padding-top` em `.card__rodape` e `padding-bottom` em
`.rodape h2`).

**Exemplo prático:** cards mais compactos:

```css
/* style.css, seção 09 */
.card__corpo {
  padding: var(--espaco-sm);     /* era var(--espaco-md) */
}
```

### `margin`

**O que é:** o espaço externo, que empurra os elementos vizinhos.
**Onde é usado:** `.container { margin: 0 auto; }`, `.secao__cabecalho`,
`.hr`, `.rodape`, `.card__rodape`.
**O que altera visualmente:** afasta o elemento dos que estão ao redor, sem
mudar o tamanho da própria caixa.

```css
/* style.css, seção 06 */
.container {
  margin: 0 auto;     /* 0 em cima/baixo, "auto" nos lados = CENTRALIZA */
}
```

> `margin: 0 auto` é o jeito clássico de centralizar um bloco que tem
> `max-width`. O `auto` divide a sobra igualmente entre os dois lados.

**Truque usado no projeto:** `.card__rodape { margin-top: auto; }`
(`style.css`, seção 09). Dentro de um card em `display: flex` na vertical, o
`auto` empurra o rodapé para a base, fazendo o preço e o botão ficarem
alinhados em todos os cards, mesmo com textos de tamanhos diferentes.

### `gap`

**O que é:** o espaço entre os filhos de um container flex ou grid.
**Para que serve:** substituir a antiga gambiarra de dar `margin` em cada
filho e depois remover a do último.
**Onde é usado:** `.grade`, `.passos`, `.grupo-botoes`, `.navbar__lista`,
`.card__corpo`, `.rodape__colunas`, `.campo`.
**O que altera visualmente:** o vão entre cards, botões, colunas e campos.

```css
/* style.css, seção 09 */
.grade {
  display: grid;
  gap: var(--espaco-md);     /* 20px entre os cards */
}
```

Com dois valores, o primeiro é o vão **entre linhas** e o segundo **entre
colunas** — como em `agendamento.css`: `gap: var(--espaco-xs) var(--espaco-md)`.

**Se eu alterar:** `gap: 3rem` na `.grade` afasta bastante os cards e cabem
menos por linha antes de a tela ficar apertada.

---

## 6. Dimensões

### `width`

**O que é:** a largura do elemento.
**Onde é usado:** `.container` (`100%`), `.botao--bloco` (`100%`),
`.card__imagem` (`100%`), `.logo__marca` (`30px`), campos do formulário (`100%`).
**O que altera visualmente:** a largura da caixa.
**Dica:** `width: 100%` significa "toda a largura do elemento pai".

### `max-width`

**O que é:** um **limite** de largura. O elemento pode ser menor, nunca maior.
**Para que serve:** é a chave da responsividade — o elemento encolhe em telas
pequenas sozinho, e só para de crescer nas grandes.
**Onde é usado:** `.container` (`--largura-container`), `p`
(`--largura-leitura`), `img` (`100%`), `.hero__regua` (`200px`).

```css
/* style.css, seção 06 */
.container {
  width: 100%;                            /* ocupa tudo que puder... */
  max-width: var(--largura-container);    /* ...até 1120px */
}
```

**Por que `img { max-width: 100% }` é essencial:** sem isso, uma foto de 800px
estoura a tela de um celular de 390px e cria rolagem horizontal.

**Se eu alterar:** `--largura-leitura: 62ch` → `100ch` deixa as linhas de
texto bem mais longas e cansativas de ler. A unidade `ch` equivale à largura
do caractere "0" da fonte, então `62ch` ≈ 62 caracteres por linha.

### `height` e `min-height`

**O que é:** altura fixa (`height`) ou altura mínima (`min-height`).
**Onde é usado:** `.card__imagem` (`190px`), `.hero__imagem` (`240px`),
`.campo textarea` (`min-height: 130px`), alvos de toque (`min-height: 44px`).
**O que altera visualmente:** `height` fixa força todas as fotos dos cards a
ter a mesma altura — é isso que mantém a grade alinhada.

```css
/* style.css, seção 09 */
.card__imagem {
  height: 190px;
  object-fit: cover;    /* recorta em vez de espremer */
}
```

**Se eu alterar:** `height: 260px` deixa os cards mais altos e as fotos mais
presentes. **Sempre mantenha o `object-fit: cover` junto**, senão a imagem
distorce.

---

## 7. Box Model

Toda caixa tem quatro camadas, de dentro para fora:

```
 ┌─────────── margin (espaço externo) ───────────┐
 │  ┌───────── border (a borda) ─────────────┐   │
 │  │  ┌────── padding (espaço interno) ──┐  │   │
 │  │  │          CONTEÚDO                │  │   │
 │  │  └──────────────────────────────────┘  │   │
 │  └────────────────────────────────────────┘   │
 └───────────────────────────────────────────────┘
```

### `box-sizing`

**O que é:** define **o que entra na conta** da largura declarada.
**Para que serve:** evitar surpresas. É a primeira regra do projeto.
**Onde é usado:** `style.css`, seção 03, aplicado a **tudo** com o seletor `*`.

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

**O que altera visualmente:** com `border-box`, um elemento de
`width: 100%` + `padding: 20px` + `border: 2px` continua ocupando **exatamente
100%**. Sem isso (`content-box`, o padrão), ele ocuparia 100% **+ 44px** e
estouraria o container.

**Se eu remover:** os campos do formulário, que têm `width: 100%` e padding,
passariam a vazar para fora da caixa branca do formulário.

### `border`

**O que é:** a linha em volta da caixa. Tem espessura, estilo e cor.
**Onde é usado:** `.card`, `.botao`, `.aside-info`, `.opcao`, `.formulario`,
`.passo`. O projeto usa três variáveis prontas.

```css
--borda-fina:   1px solid var(--cor-linha);    /* divisórias internas */
--borda-forte:  2px solid var(--cor-tinta);    /* contorno de cards */
--borda-grossa: 4px solid var(--cor-tinta);    /* réguas de destaque */
```

**Variantes de um lado só:** `border-top`, `border-bottom`, `border-left` —
usadas para criar as faixas coloridas, como a do topo do `<aside>`:

```css
/* style.css, seção 11 */
.aside-info {
  border: var(--borda-forte);
  border-top: 8px solid var(--cor-primaria);   /* sobrescreve só o topo */
}
```

> A segunda linha vem **depois** e por isso vence só para o lado de cima.
> É a cascata funcionando dentro da mesma regra.

**Se eu alterar:** `--borda-forte: 2px` → `4px` engrossa o contorno de todos
os cards, botões e campos de uma vez — o visual fica mais pesado.

### `border-radius`

**O que é:** o arredondamento dos cantos.
**Onde é usado:** `.card`, `.botao`, `.etiqueta`, `.aside-info`, `.formulario`,
`.opcao`, `.passo`, `.painel-destaque`, `.hero__figura`, campos do formulário.
Todos usam `var(--raio)`.
**O que altera visualmente:** no projeto vale **`0`**, ou seja, cantos retos —
uma escolha da identidade "editorial esportiva".

**Exemplo prático:** arredondar o site inteiro com **uma linha**:

```css
:root {
  --raio: 10px;     /* era 0 */
}
```

### `box-shadow`

**O que é:** uma sombra projetada atrás do elemento.
**Onde é usado:** `.card:hover`, `.botao:hover`, `.passo:hover`.
**O que altera visualmente:** aqui a sombra é **sólida**, não desfocada.

```css
--sombra-solida: 5px 5px 0 var(--cor-tinta);
/*               ↑    ↑   ↑
                 |    |   └─ desfoque = 0  (sombra de traço firme)
                 |    └───── deslocamento vertical
                 └────────── deslocamento horizontal            */
```

**Se eu alterar:** trocar o terceiro valor de `0` para `12px` transforma a
sombra dura em sombra suave — e o projeto deixa de parecer cartaz impresso
para virar um site comum.

### `outline` e `outline-offset`

**O que é:** um contorno desenhado **por fora** da borda. Diferente do
`border`, ele **não ocupa espaço** e não empurra nada.
**Para que serve:** marcar o elemento em foco durante a navegação por teclado.
**Onde é usado:** `style.css`, seção 04.

```css
:focus,
:focus-visible {
  outline: 3px solid var(--cor-destaque);
  outline-offset: 3px;      /* afasta o contorno do elemento */
}
```

> **Nunca escreva `outline: none`** sem colocar outro indicador no lugar.
> Sem ele, quem navega por teclado fica sem saber onde está.

---

## 8. Layout: Flexbox e Grid

### A regra de escolha (cobrada na apresentação)

```
Flexbox  →  UMA direção   (uma linha OU uma coluna)
Grid     →  DUAS direções (linhas E colunas ao mesmo tempo)
```

| Componente | Técnica | Por quê |
|---|---|---|
| `.cabecalho__interno` | Flexbox | Logo e menu em **uma linha**, empurrados para os extremos |
| `.navbar__lista` | Flexbox | Itens em **uma linha**, com `flex-wrap` para quebrar no celular |
| `.grupo-botoes` | Flexbox | Botões lado a lado em **um eixo** |
| `.card` | Flexbox | Empilhamento **vertical** interno (imagem, corpo, rodapé) |
| `.card__rodape` | Flexbox | Preço e botão em **uma linha** |
| `.grade` | **Grid** | Catálogo com **linhas e colunas** (1 → 2 → 3) |
| `.passos` | **Grid** | Mesmo caso: grade de 3 cards |
| `.rodape__colunas` | **Grid** | Três colunas de largura igual |
| `.layout-conteudo` | **Grid** | Conteúdo + `<aside>` em proporção `2fr 1fr` |
| `.card__detalhes li` | **Grid** | Rótulo fixo + valor: `5rem 1fr` |

### `display`

**O que é:** define como o elemento se comporta e como organiza os filhos.
**Valores usados no projeto:**

| Valor | Onde | Efeito |
|---|---|---|
| `flex` | `.card`, `.navbar`, `.botao`, `.campo` | Vira container Flexbox |
| `grid` | `.grade`, `.passos`, `.rodape__colunas` | Vira container Grid |
| `block` | `.navbar__link`, `.card__preco span`, `.formulario legend` | Ocupa a linha inteira |
| `inline-flex` | `.botao` | Flexbox por dentro, mas fica na linha do texto |
| `inline-block` | `.etiqueta`, `.hero__rotulo` | Fica na linha, mas aceita largura e padding |

### Flexbox: as propriedades usadas

**`flex-direction`** — a direção do eixo principal.

```css
/* style.css, seção 07 */
.cabecalho__interno {
  display: flex;
  flex-direction: column;    /* celular: logo em cima, menu embaixo */
}

/* seção 13, a partir de 768px */
@media (min-width: 768px) {
  .cabecalho__interno {
    flex-direction: row;     /* tablet: lado a lado */
  }
}
```

Esse par de regras é **o coração do Mobile First** do projeto: a mesma classe
muda de direção conforme a largura.

**`justify-content`** — distribui no eixo principal (horizontal, se `row`).

```css
.cabecalho__interno { justify-content: space-between; }  /* extremos */
.navbar__lista      { justify-content: center; }         /* centro */
```

`space-between` joga o primeiro filho para o início, o último para o fim, e
divide a sobra no meio. É o que separa o logo do menu.

**`align-items`** — alinha no eixo perpendicular.

```css
.botao { align-items: center; }       /* centraliza verticalmente */
.opcao { align-items: flex-start; }   /* alinha o checkbox no topo do texto */
```

**`flex-wrap`** — permite quebrar em várias linhas.

```css
/* style.css, seção 07 */
.navbar__lista {
  display: flex;
  flex-wrap: wrap;    /* no celular o menu quebra em 2 linhas */
}
```

**Sem isso**, os 4 itens do menu tentariam caber numa linha só e criariam
rolagem horizontal no celular. Também é usado em `.grupo-botoes` e
`.hero__indicadores`.

**`flex`** — quanto um filho cresce em relação aos irmãos.

```css
/* style.css, seção 09 */
.card__corpo { flex: 1; }     /* estica e ocupa a sobra */

/* index.css, seção 05 */
.hero__texto  { flex: 1.2; }  /* 20% mais largo... */
.hero__figura { flex: 1; }    /* ...que a foto */
```

**`flex-shrink`** — impede que um filho encolha.

```css
/* agendamento.css, seção 04 */
.opcao input[type="checkbox"] { flex-shrink: 0; }
```

Sem isso, o quadradinho do checkbox seria espremido quando o texto ao lado
fosse longo.

### Grid: as propriedades usadas

**`grid-template-columns`** — define as colunas.

```css
/* style.css: a grade muda de colunas em cada tamanho de tela */
.grade       { grid-template-columns: 1fr; }               /* celular */
@media (min-width: 768px)  { .grade { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grade--tres { grid-template-columns: repeat(3, 1fr); } }
```

- `1fr` = "uma fração do espaço livre". Duas colunas `1fr 1fr` ficam iguais.
- `repeat(3, 1fr)` é o atalho para `1fr 1fr 1fr`.
- `2fr 1fr` (em `.layout-conteudo`) faz a primeira coluna ser o dobro da segunda.
- `5rem 1fr` (em `.card__detalhes li`) mistura medida fixa e flexível: o
  rótulo "LOCAL" tem sempre 5rem, e o valor ocupa o resto. É isso que mantém
  os rótulos alinhados entre cards diferentes.

**Exemplo prático:** quer 4 colunas no desktop?

```css
/* style.css, seção 14 */
@media (min-width: 1024px) {
  .grade--tres {
    grid-template-columns: repeat(4, 1fr);   /* era repeat(3, 1fr) */
  }
}
```

### `object-fit`

**O que é:** como a imagem preenche o espaço reservado para ela.
**Onde é usado:** `.card__imagem` e `.hero__imagem`.
**O que altera visualmente:** com `cover`, a foto **recorta** o excesso para
preencher a área sem distorcer.
**Se eu alterar:** `fill` (o padrão) **estica** a imagem e deforma as pessoas
na foto. `contain` mostra a imagem inteira, mas deixa faixas vazias.

### `overflow` e `overflow-x`

**O que é:** o que fazer com o conteúdo que passa do limite da caixa.
**Onde é usado:**

```css
/* style.css, seção 09 — recorta o zoom da foto no hover */
.card__figura { overflow: hidden; }

/* style.css, seção 04 — trava a rolagem horizontal da página */
body { overflow-x: hidden; }
```

O primeiro é o que faz o efeito de aproximação da foto ficar **dentro** da
moldura do card em vez de vazar por cima da borda.

---

## 9. Posicionamento

### `position`

**Valores usados no projeto:**

| Valor | Onde | O que faz |
|---|---|---|
| `sticky` | `.cabecalho`, `.aside-info--fixo` | Rola normal até encostar no topo, e ali **gruda** |
| `absolute` | `.pular-link` | Sai do fluxo e é posicionado por `top`/`left` |
| `static` | `.cabecalho` em telas baixas | Volta ao comportamento normal |

```css
/* style.css, seção 07 */
.cabecalho {
  position: sticky;
  top: 0;          /* obrigatório: diz ONDE grudar */
  z-index: 50;     /* fica por cima do conteúdo */
}
```

> `position: sticky` **exige** um `top` (ou `left`/`right`/`bottom`). Sem
> isso, ele simplesmente não gruda.

### `top`, `left` e `z-index`

- **`top: 0`** no cabeçalho: gruda encostado no topo da tela.
- **`left: -9999px`** no `.pular-link`: joga o link para fora da tela.
  Quando ele recebe foco, `left: 0` traz de volta. É a técnica que mantém o
  link de acessibilidade disponível para o teclado sem poluir o visual.
- **`z-index: 50`**: define quem fica na frente quando dois elementos se
  sobrepõem. Número maior = mais à frente. O cabeçalho (`50`) fica acima do
  conteúdo; o `.pular-link` (`100`) fica acima até do cabeçalho.

### `scroll-behavior` e `scroll-margin-top`

```css
/* style.css, seção 04 */
html { scroll-behavior: smooth; }   /* rolagem suave ao clicar em âncora */

/* style.css, seção 05 */
#conteudo, #como-funciona, #catalogo, #lista-rachas, #form-reserva {
  scroll-margin-top: var(--altura-cabecalho);
}
```

**O problema que o `scroll-margin-top` resolve:** o cabeçalho é fixo. Ao
clicar num link `href="#catalogo"`, o navegador rola até o título — e o
cabeçalho **cobre** o título. O `scroll-margin-top` reserva 7rem acima do
alvo, então ele para logo abaixo do cabeçalho.

**Se eu alterar:** aumente `--altura-cabecalho` se o cabeçalho ficar mais
alto; o destino das âncoras se ajusta sozinho.

---

## 10. Interações e estados

### As pseudo-classes usadas

| Pseudo-classe | Quando ativa | Onde no projeto |
|---|---|---|
| `:hover` | mouse em cima | botões, cards, links, menu, passos, opções |
| `:focus` / `:focus-visible` | elemento em foco (Tab) | contorno laranja global |
| `:active` | durante o clique | `.botao`, `.navbar__link` |
| `:visited` | link já aberto | `a`, `.navbar__link`, `.rodape a` |
| `:invalid` | campo que não atende à validação | campos do formulário |
| `:valid` | campo preenchido corretamente | campos do formulário |
| `:user-invalid` / `:user-valid` | idem, mas só **após** a pessoa mexer | campos do formulário |
| `:disabled` | controle desabilitado | `#cupom`, checkbox de transmissão, botão "Partida lotada" |
| `:not()` | inverte uma condição | `:not(:placeholder-shown)` |
| `:has()` | "o elemento que CONTÉM" | `.opcao:has(input:disabled)` |
| `:first-of-type` | o primeiro do seu tipo | `.formulario fieldset:first-of-type` |
| `:placeholder-shown` | a dica ainda está visível | validação do formulário |
| `:root` | a raiz do documento | declaração das variáveis |

### `:hover` — o feedback de mouse

```css
/* style.css, seção 09 */
.card:hover {
  transform: translate(-4px, -4px);       /* sobe e vai para a esquerda */
  box-shadow: var(--sombra-solida-grande); /* revela a sombra sólida */
}

.card:hover .card__imagem {
  transform: scale(1.04);                 /* a foto aproxima 4% */
}
```

A segunda regra é interessante: o `:hover` está no **card**, mas o efeito é
aplicado na **imagem dentro dele**. Ler como "quando o card estiver sob o
mouse, mude a imagem que está dentro dele".

**Exemplo prático:** deixar o movimento mais forte:

```css
.card:hover {
  transform: translate(-8px, -8px);
}
```

### `:focus` — acessibilidade por teclado

A regra fica sem seletor de elemento na frente, então vale para **qualquer
coisa** que receba foco:

```css
/* style.css, seção 04 */
:focus,
:focus-visible {
  outline: 3px solid var(--cor-destaque);
  outline-offset: 3px;
}
```

Teste: aperte `Tab` repetidamente na página. Você deve ver o contorno laranja
percorrendo links, botões e campos. Se sumir em algum ponto, há um problema de
acessibilidade.

### `:active` — o feedback do clique

```css
/* style.css, seção 08 */
.botao:active {
  transform: translate(0, 0);   /* volta ao lugar */
  box-shadow: none;             /* a sombra some */
}
```

O botão parece **afundar** no momento do clique, porque desfaz o deslocamento
que o `:hover` tinha aplicado.

### `:visited` — links já abertos

```css
/* style.css, seção 04 */
a:visited { color: var(--cor-primaria-escura); }
```

Ajuda quem está navegando a lembrar onde já esteve. No projeto ele é
**desligado** onde não faz sentido — o item do menu e os botões não devem
mudar de cor só porque a página já foi visitada:

```css
.navbar__link:visited     { color: var(--cor-tinta); }
.botao--primario:visited  { color: var(--cor-superficie); }
```

### `:invalid`, `:valid` e `:user-invalid` — validação sem JavaScript

Quem valida é o **navegador**, a partir dos atributos do HTML (`required`,
`min`, `max`, `minlength`, `maxlength`, `pattern`). O CSS só pinta o
resultado.

O cuidado principal é **quando** mostrar o erro. Marcar tudo de vermelho assim
que a página abre confunde quem nem começou a preencher. Por isso são três
situações, em `agendamento.css`, seção 03:

```css
/* (a) já digitaram algo e está inválido */
.campo input[placeholder]:invalid:not(:placeholder-shown),
.campo textarea[placeholder]:invalid:not(:placeholder-shown) {
  border-color: var(--cor-erro);
  background-color: var(--cor-destaque-clara);
}
```

Lendo o seletor da esquerda para a direita:

- `.campo input[placeholder]` → campo de texto que **tem** dica escrita dentro
  (é o que exclui data, hora e `<select>`, que não têm placeholder);
- `:invalid` → o navegador considera o valor incorreto;
- `:not(:placeholder-shown)` → a dica **sumiu**, ou seja, já digitaram algo.

```css
/* (b) campo inválido enquanto está em uso */
.campo input:focus:invalid { ... }

/* (c) o navegador marca sozinho depois que a pessoa saiu do campo */
.campo input:user-invalid,
.campo select:user-invalid { ... }
```

O `:user-invalid` é o que cobre data, hora e `<select>` — ele só age **depois**
da interação, que é exatamente o comportamento desejado.

### `:disabled` — controles indisponíveis

```css
/* agendamento.css, seção 03 */
.campo input:disabled {
  background-color: var(--cor-papel);
  color: var(--cor-tinta-media);
  cursor: not-allowed;
}

/* agendamento.css, seção 04 — :has() = "a opção QUE CONTÉM" */
.opcao:has(input:disabled) {
  background-color: var(--cor-papel);
  border-style: dashed;        /* borda tracejada na caixa inteira */
}
```

O `:has()` é o "seletor de pai": ele estiliza a **caixa** por causa do que
existe **dentro** dela. Sem ele, só o checkbox ficaria diferente.

### `transition`

**O que é:** faz a mudança de valor acontecer **gradualmente** em vez de num
salto seco.

```css
--transicao: all 0.2s ease;
/*           ↑    ↑    ↑
             |    |    └─ aceleração (começa devagar, termina devagar)
             |    └────── duração
             └─────────── quais propriedades (todas)                */
```

**Onde é usado:** `.botao`, `.card`, `.card__imagem`, `.navbar__link`,
`.passo`, `.opcao`, campos do formulário, `.logo__marca`, `a`.

**Importante:** a `transition` fica na regra **normal**, não na do `:hover`.
Assim ela vale tanto na ida (mouse entra) quanto na volta (mouse sai).

**Se eu alterar:** `0.2s` → `1s` deixa tudo lento e o site parece travado.
`0.05s` fica quase instantâneo. Entre `0.15s` e `0.3s` é a faixa confortável.

### `transform`

**O que é:** move, gira ou redimensiona o elemento **sem afetar o layout** —
os vizinhos não se mexem.
**Valores usados:**

| Uso | Onde | Efeito |
|---|---|---|
| `translate(-3px, -3px)` | `.botao:hover` | desloca 3px para cima e para a esquerda |
| `translate(-4px, -4px)` | `.card:hover` | mesmo efeito, mais forte |
| `translate(0, 0)` | `.botao:active` | volta ao lugar durante o clique |
| `scale(1.04)` | `.card:hover .card__imagem` | aproxima a foto em 4% |
| `none` | `.botao:disabled` | desliga o efeito no botão desabilitado |

**Por que `transform` e não `margin`:** mudar `margin` no `:hover` empurraria
os elementos vizinhos e a página inteira "pularia". O `transform` desenha o
elemento deslocado sem mexer no espaço que ele ocupa.

### `cursor`

**Onde é usado:** `.botao` e `.opcao` (`pointer`, a mãozinha), campos
desabilitados (`not-allowed`, o símbolo de proibido).
**O que altera visualmente:** só o desenho do ponteiro do mouse — mas é um
sinal importante de que algo é clicável ou está bloqueado.

---

## 11. Responsividade

### Mobile First — a estratégia do projeto

O CSS **principal** é escrito para a tela pequena. As media queries só
**ampliam** o layout em telas maiores. Nunca o contrário.

```css
/* BASE: celular — uma coluna */
.grade {
  display: grid;
  grid-template-columns: 1fr;
}

/* A PARTIR de 768px: duas colunas */
@media (min-width: 768px) {
  .grade { grid-template-columns: repeat(2, 1fr); }
}

/* A PARTIR de 1024px: três colunas */
@media (min-width: 1024px) {
  .grade--tres { grid-template-columns: repeat(3, 1fr); }
}
```

**Por que Mobile First:** o celular é o aparelho mais limitado. Começando por
ele, o layout simples é o padrão e os acréscimos são conscientes. No caminho
inverso, é fácil esquecer de desfazer algo e quebrar a tela pequena.

### As media queries do projeto

| Consulta | Onde | O que muda |
|---|---|---|
| `min-width: 768px` | style, index, agendamento | Cabeçalho vira linha; grades ganham 2 colunas; botões lado a lado; títulos maiores; campos em 2 colunas |
| `min-width: 1024px` | style, index, agendamento | Grades com 3 colunas; hero em 2 colunas; formulário + `<aside>` lado a lado; títulos ainda maiores |
| `pointer: coarse` | style.css, seção 15 | Alvos de toque de 44px em menu, botões e campos |
| `max-height: 500px` | style.css, seção 15 | Celular deitado: cabeçalho deixa de ser fixo |
| `prefers-reduced-motion` | style.css, seção 15 | Desliga deslocamentos e zoom para quem pediu menos animação |

As três últimas **não perguntam pela largura**. `pointer: coarse` pergunta se
a tela é operada com o dedo (vale para celular e tablet, de qualquer
tamanho); `max-height` pergunta pela altura; `prefers-reduced-motion` pergunta
uma preferência do sistema operacional.

### Variáveis dentro de media query

```css
/* style.css, seção 13 */
@media (min-width: 768px) {
  :root {
    --tamanho-h1: 3.25rem;    /* era 2.25rem */
  }
}
```

Redeclarar a variável faz **todos** os elementos que a usam crescerem de uma
vez. É mais simples do que reescrever a regra de cada título.

### Como testar

```bash
python3 -m http.server 8000 --directory arena-hub
```

No navegador: `F12` → ícone de celular (`Ctrl+Shift+M`) → escolha um aparelho.
Confira as três faixas: **abaixo de 768px**, **entre 768 e 1023px** e **1024px
ou mais**. Em nenhuma delas pode aparecer rolagem horizontal.

---

## 12. Recursos especiais

### `::before` e `::after` + `content`

**O que são:** pseudo-**elementos**. Criam uma caixa extra dentro do elemento,
sem precisar de HTML. Exigem a propriedade `content` para existir.

**Uso 1 — a régua do rótulo de seção** (`style.css`, seção 06):

```css
.secao__numero {
  display: flex;
}

.secao__numero::after {
  content: "";     /* vazio: é só um traço, não tem texto */
  flex: 1;         /* cresce e ocupa toda a largura restante */
  border-top: var(--borda-forte);
}
```

É o que produz o efeito `01 / CATÁLOGO ────────────────────`.

**Uso 2 — os números dos passos** (`index.css`, seção 02).

### `counter-reset` e `counter-increment`

**O que são:** um contador do próprio CSS. A numeração **não está digitada no
HTML**.

```css
/* index.css, seção 02 */
.passos { counter-reset: passo; }              /* cria e zera o contador */
.passo  { counter-increment: passo; }          /* soma 1 a cada <li> */
.passo::before {
  content: counter(passo, decimal-leading-zero);  /* 01, 02, 03 */
}
```

**Por que assim:** se alguém inserir um passo no meio ou remover um, a
numeração se corrige sozinha. Com números digitados no HTML, seria preciso
renumerar tudo na mão.

Usado também em `.lista-etapas` (`agendamento.css`, seção 06), lá com o
formato simples `1.` `2.` `3.`.

### `@font-face`, `src`, `font-display`, `unicode-range`

**O que é:** registra uma fonte que vem de um arquivo do projeto, e não das
que o sistema já tem.

```css
/* style.css, seção 01 */
@font-face {
  font-family: "Archivo";
  src: url("../assets/fonts/archivo-latin.woff2") format("woff2");
  font-weight: 400 700;      /* fonte variável: cobre do 400 ao 700 */
  font-display: swap;        /* mostra texto com fonte do sistema enquanto baixa */
  unicode-range: U+0000-00FF, ...;   /* quais letras existem neste arquivo */
}
```

- **`font-display: swap`** evita o "texto invisível" durante o carregamento.
- **`unicode-range`** divide a fonte em pedaços: o arquivo `latin` traz o
  alfabeto normal (com á, ç, ã) e o `latin-ext` traz acentos raros. O
  navegador só baixa o que a página realmente usa.
- O `../` no caminho é porque o CSS está em `css/` e precisa **subir um
  nível** para chegar em `assets/`.

### `list-style`

```css
/* style.css, seção 04 */
ul, ol { list-style: none; }
```

Remove as bolinhas e os números padrão. O projeto desenha as próprias marcas
(bordas superiores nos itens do `<aside>`, contadores nos passos).

### `resize`

```css
/* agendamento.css, seção 02 */
.campo textarea { resize: vertical; }
```

Permite que a pessoa estique o campo de observações **só na vertical**. Sem
isso, seria possível esticar na horizontal e quebrar o layout do formulário.

---

## 13. Onde alterar cada coisa?

Tabela de consulta rápida. Todos os caminhos são reais.

| Quero alterar... | Arquivo | Classe / variável | O que modificar |
|---|---|---|---|
| **Cor principal (verde)** | `css/style.css` §02 | `--cor-primaria` | Muda botões, links, etiquetas, logo e item ativo do menu de uma vez |
| **Cor de destaque (laranja)** | `css/style.css` §02 | `--cor-destaque` | Muda vagas, asterisco de obrigatório e contorno de foco |
| **Cor do fundo da página** | `css/style.css` §02 | `--cor-papel` | Fundo geral; `--cor-superficie` é o fundo branco dos cards |
| **Cor do texto** | `css/style.css` §02 | `--cor-tinta` / `--cor-tinta-media` | A primeira é o texto principal, a segunda os textos de apoio |
| **Fonte** | `css/style.css` §02 | `--fonte-display` / `--fonte-base` | Trocar a família. Para usar outro arquivo, ajuste também o `@font-face` na §01 |
| **Tamanho dos títulos** | `css/style.css` §02 **e** §13/§14 | `--tamanho-h1`, `--tamanho-h2` | São redefinidos nas media queries — altere nos **três** lugares |
| **Espaçamento geral** | `css/style.css` §02 | `--espaco-xs` … `--espaco-xl` | Toda a escala de padding, margin e gap do projeto |
| **Arredondamento das caixas** | `css/style.css` §02 | `--raio` | De `0` para `8px` arredonda o site inteiro |
| **Espessura das bordas** | `css/style.css` §02 | `--borda-forte` | Contorno de cards, botões e campos |
| **Velocidade das animações** | `css/style.css` §02 | `--transicao` | `all 0.2s ease` → mude a duração |
| **Navbar (cores e tamanho)** | `css/style.css` §07 | `.navbar__link`, `.navbar__link--ativo` | `padding` para o tamanho, `border-bottom-color` para o traço do item ativo |
| **Navbar (posição no tablet)** | `css/style.css` §13 | `.cabecalho__interno` | `flex-direction: row` |
| **Cabeçalho deixar de ser fixo** | `css/style.css` §07 | `.cabecalho` | Trocar `position: sticky` por `static` |
| **Botões (forma)** | `css/style.css` §08 | `.botao` | `padding`, `border`, `font-size` |
| **Botões (cores)** | `css/style.css` §08 | `.botao--primario`, `.botao--secundario` | `background-color` e `color` |
| **Botões (efeito hover)** | `css/style.css` §08 | `.botao--primario:hover` | `transform` e `box-shadow` |
| **Cards (tamanho e espaço)** | `css/style.css` §09 | `.card__corpo` | `padding` para o espaço interno |
| **Cards (altura da foto)** | `css/style.css` §09 | `.card__imagem` | `height: 190px` |
| **Cards (efeito hover)** | `css/style.css` §09 | `.card:hover` | `transform` e `box-shadow` |
| **Cards (nº de colunas)** | `css/style.css` §13 e §14 | `.grade`, `.grade--tres` | `grid-template-columns: repeat(N, 1fr)` |
| **Endereço no card de quadra** | `css/quadras.css` §01 | `.card__endereco` | `font-size`, `color` |
| **Detalhes do racha** | `css/rachas.css` §01 | `.card__detalhes li` | `grid-template-columns: 5rem 1fr` alinha os rótulos |
| **Etiqueta de vagas** | `css/rachas.css` §02 | `.etiqueta--vagas` | `background-color`, `color`, `border-left` |
| **Etiqueta de modalidade** | `css/style.css` §10 | `.etiqueta` | Forma e cores base de todas as etiquetas |
| **Hero (banner da home)** | `css/index.css` §01 | `.hero`, `.hero__titulo`, `.hero__imagem` | `padding`, `font-size`, `height` |
| **Hero (2 colunas no desktop)** | `css/index.css` §05 | `.hero__conteudo`, `.hero__texto` | `flex-direction: row` e `flex: 1.2` |
| **Passos numerados** | `css/index.css` §02 | `.passo`, `.passo::before` | `content: counter(...)` gera o número |
| **Painel de proprietários** | `css/index.css` §03 | `.painel-destaque` | `background-color`, `border-left` |
| **Formulário (moldura)** | `css/agendamento.css` §01 | `.formulario` | `padding`, `border` |
| **Formulário (campos)** | `css/agendamento.css` §02 | `.campo input, .campo select, .campo textarea` | `padding`, `border`, `font-size` |
| **Formulário (rótulos)** | `css/agendamento.css` §02 | `.campo label` | `font-size`, `text-transform` |
| **Formulário (cores de erro)** | `css/agendamento.css` §03 | `--cor-erro`, `--cor-sucesso` | As variáveis ficam em `style.css` §02 |
| **Formulário (2 colunas)** | `css/agendamento.css` §07 | `.campo-duplo`, `.grupo-opcoes` | `grid-template-columns` |
| **Rádios e checkboxes** | `css/agendamento.css` §04 | `.opcao`, `accent-color` | `padding` da caixa, `accent-color` da marca |
| **Rodapé** | `css/style.css` §12 | `.rodape`, `.rodape__colunas` | `background-color` e `grid-template-columns` |
| **Layout mobile (base)** | Todos os arquivos | Regras **fora** de `@media` | O CSS principal já É o mobile |
| **Layout tablet** | `style.css` §13, `index.css` §04, `agendamento.css` §07 | `@media (min-width: 768px)` | — |
| **Layout desktop** | `style.css` §14, `index.css` §05, `agendamento.css` §08 | `@media (min-width: 1024px)` | — |
| **Alvos de toque** | `css/style.css` §15 | `@media (pointer: coarse)` | `min-height: 44px` |
| **Contorno de foco** | `css/style.css` §04 | `:focus, :focus-visible` | `outline` — **nunca remova sem substituir** |
| **Destino das âncoras** | `css/style.css` §05 | `--altura-cabecalho` | Ajuste se o cabeçalho mudar de altura |

---

## 14. Antes e depois da refatoração

### Antes — o que era difícil

**1. A mesma explicação repetida em cinco arquivos.**
Cada página tinha seu próprio bloco de âncora (`#catalogo`, `#lista-rachas`,
`#form-reserva`…), cada um com um comentário de 4 linhas dizendo a mesma
coisa. Para entender o assunto, era preciso abrir cinco arquivos.

**2. Listas de seletores gigantes no formulário.**
A forma dos campos era declarada com **oito seletores**, repetidos mais duas
vezes nas regras de validação — 24 linhas só de seletor:

```css
.campo input[type="text"],
.campo input[type="email"],
.campo input[type="tel"],
.campo input[type="number"],
.campo input[type="date"],
.campo input[type="time"],
.campo select,
.campo textarea { ... }
```

**3. Um seletor com especificidade "artificial".**
`.secao__cabecalho .secao__numero` usava duas classes só para vencer a regra
`.secao__cabecalho p`. Nada no código explicava o motivo.

**4. Um seletor de três níveis.**
`.formulario fieldset fieldset legend` — difícil de ler e de descobrir a qual
elemento se refere.

**5. Dez seletores para uma regra de foco.**
`a:focus, a:focus-visible, button:focus, button:focus-visible, input:focus…`

**6. Valores mágicos soltos.**
`rgba(242, 240, 234, 0.25)` aparecia duas vezes, em arquivos diferentes, sem
nome que dissesse o que era.

**7. O índice do `style.css` estava errado** — pulava da seção 13 para a 15.

**8. `border-radius` inconsistente.** A variável `--raio` existia, mas só dois
componentes a usavam. Mudá-la não arredondava o site.

### Depois — como ficou

**1. Âncoras em um lugar só.** As seis âncoras do site estão reunidas em
`style.css`, seção 05, com uma explicação única:

```css
#conteudo,          /* início do <main>, usado pelo link "pular"     */
#como-funciona,     /* index.html   — seção dos 3 passos            */
#catalogo,          /* quadras.html — grade de quadras              */
#lista-rachas,      /* rachas.html  — grade de partidas             */
#form-reserva {     /* agendamento.html — formulário                */
  scroll-margin-top: var(--altura-cabecalho);
}
```

**2. Campos do formulário em três seletores.**

```css
.campo input,
.campo select,
.campo textarea { ... }
```

Foi possível porque **não existe rádio nem checkbox dentro de `.campo`** —
eles ficam dentro de `.opcao`. O comentário no arquivo registra esse motivo.

Nas regras de validação, `[placeholder]` substituiu a lista de tipos: ele
seleciona exatamente os campos que têm dica escrita dentro, que são os mesmos
que precisam do aviso em tempo real. Data, hora e `<select>` ficam de fora
naturalmente — e são cobertos por `:user-invalid`.

**3. Seletores de uma classe só.** O parágrafo descritivo ganhou a classe
`.secao__texto`, então `.secao__numero` não precisa mais da especificidade
extra. Ambos ficaram diretos.

**4. Subgrupo com nome próprio.** O fieldset aninhado recebeu
`class="subgrupo"`. Onde a especificidade ainda é necessária, há um comentário
explicando — virou material de estudo em vez de armadilha.

**5. Foco em dois seletores.**

```css
:focus,
:focus-visible { outline: 3px solid var(--cor-destaque); }
```

**6. `--cor-linha-clara`** deu nome ao valor que aparecia solto.

**7. Índice corrigido** e um **MAPA DOS ARQUIVOS** no topo do `style.css`,
dizendo o que procurar em cada um.

**8. `border-radius: var(--raio)`** aplicado a todas as caixas principais.
Agora mudar `--raio` para `8px` arredonda o site inteiro de uma vez.

**9. Comentários reescritos para ensinar.** Em vez de repetir o que o código
já diz, explicam **por quê**: por que Flexbox aqui e Grid ali, por que a régua
fica na `legend` e não no `fieldset`, por que `transform` e não `margin`.

### O que foi preservado — verificado, não prometido

A refatoração foi conferida com quatro medições:

**Comparação visual pixel a pixel.** As 4 páginas foram fotografadas em 3
larguras (500px, 768px e 1280px) antes e depois. **As 12 imagens saíram
idênticas** — diferença de zero pixel.

**Contagem de conteúdo no HTML:**

| Elemento | Antes | Depois |
|---|---|---|
| `<section>` | 17 | 17 |
| `<article>` | 17 | 17 |
| `<aside>` | 4 | 4 |
| `<img>` | 13 | 13 |
| `<a>` | 74 | 74 |
| `<ul>` / `<ol>` | 25 | 25 |
| `<li>` | 89 | 89 |
| `<input>` | 15 | 15 |
| `<select>` / `<option>` | 9 | 9 |
| `<textarea>` | 1 | 1 |
| `<button>` | 3 | 3 |
| `<fieldset>` / `<legend>` | 10 | 10 |
| `<label>` | 17 | 17 |
| `<h1>` / `<h2>` / `<h3>` | 45 | 45 |

O HTML mudou em **6 linhas**, todas **adições** de classe: cinco
`class="secao__texto"` e um `class="subgrupo"`. Nada foi apagado.

**Propriedades CSS:** as 69 propriedades usadas antes continuam sendo usadas.
Nenhuma variável foi removida; uma foi acrescentada (`--cor-linha-clara`).

**Teste funcional do formulário:** com a página carregada, foi verificado que
nenhum campo aparece marcado de erro no estado inicial; que e-mail inválido
marca erro e e-mail válido marca sucesso; que número fora do `min`/`max` marca
erro; que os 10 controles de texto recebem o estilo de caixa e nenhum
rádio/checkbox é pego por engano; e que o campo desabilitado responde ao
`:disabled`.

**Requisitos do documento da disciplina:** `:hover` (23 usos), `:focus` (11),
`:active` (5), `:visited` (9), `:invalid` (6), `:disabled` (11), `transition`
(9), `transform` (25), Flexbox (21), Grid (7), `flex-wrap` (3), `gap` (26),
`box-sizing`, `border-radius` (10), variáveis no `:root`, media queries em
768px e 1024px — todos presentes.

### Páginas, funcionalidades e recursos mantidos

- As 4 páginas: `index.html`, `quadras.html`, `rachas.html`, `agendamento.html`
- As 6 quadras do catálogo e os 6 rachas, com nomes e endereços de Maceió
- Os 3 passos da home, os indicadores numéricos e o painel de proprietários
- Os 4 blocos `<aside>` de conteúdo complementar
- O formulário completo: texto, e-mail, telefone, número (×2), data, hora,
  `select` com `optgroup`, `textarea`, rádios, checkboxes, enviar e limpar
- Toda a validação nativa e os estados `:focus`, `:invalid`, `:valid`,
  `:disabled`
- As 13 imagens com `alt` descritivo, `srcset` e `loading="lazy"`
- As fontes locais em `assets/fonts/` (o site funciona offline)
- O link "pular para o conteúdo", o contorno de foco e a navegação por teclado
- A identidade visual: paleta, tipografia, cantos retos e sombra sólida
