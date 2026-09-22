# Roteiro de Apresentação — ArenaHub

Guia para a defesa do Projeto Integrador. O item 10 do enunciado exige que
**todos os 5 integrantes participem** e que cada um consiga **localizar no
código** e explicar a parte pela qual ficou responsável.

Por isso este roteiro traz, para cada tópico, **o arquivo e a linha exata**.
Na hora da pergunta, abra o arquivo e aponte — é isso que o enunciado chama
de defesa individual.

> **Referência rápida do projeto**
> 4 páginas HTML (315 + 336 + 359 + 399 linhas) · 5 arquivos CSS (1770 linhas)
> 21 imagens locais · 4 arquivos de fonte · nenhuma dependência externa

---

## Índice

1. [Checklist antes de começar](#1-checklist-antes-de-começar)
2. [Como a nota é distribuída](#2-como-a-nota-é-distribuída)
3. [Divisão entre os 5 integrantes](#3-divisão-entre-os-5-integrantes)
4. [Roteiro de cada integrante](#4-roteiro-de-cada-integrante)
5. [Mapa completo: requisito → arquivo → linha](#5-mapa-completo-requisito--arquivo--linha)
6. [Roteiro da demonstração ao vivo](#6-roteiro-da-demonstração-ao-vivo)
7. [Perguntas difíceis e como responder](#7-perguntas-difíceis-e-como-responder)
8. [Erros que derrubam nota](#8-erros-que-derrubam-nota)

---

## 1. Checklist antes de começar

**Na véspera**

- [ ] Preencher a tabela de responsabilidades no `README.md` (seção 6)
- [ ] Cada integrante ler a própria seção deste roteiro e abrir os arquivos citados
- [ ] Ensaiar uma vez inteiro, cronometrando
- [ ] Conferir se o projeto abre com **duplo clique** em `arena-hub/index.html`

**No dia, antes de entrar**

- [ ] Abrir o editor com os 9 arquivos já em abas: as 4 páginas e os 5 CSS
- [ ] Abrir o navegador em `arena-hub/index.html`
- [ ] Abrir o DevTools (`F12`) e deixar no modo dispositivo (`Ctrl+Shift+M`)
- [ ] Aumentar a fonte do editor — a banca precisa enxergar
- [ ] Ter o `GUIA-CSS.md` aberto, caso perguntem algo que ninguém lembre

> **O projeto não precisa de internet.** Imagens e fontes estão dentro do
> repositório. Se o Wi-Fi da sala cair, a apresentação continua.

**Tempo sugerido:** 3 a 4 minutos por integrante, mais 5 de perguntas.

---

## 2. Como a nota é distribuída

| Critério | Pontos | Quem defende |
|---|---|---|
| HTML semântico, estrutura e navegação | 15 | Integrante 2 |
| Formulário, controles e validação HTML | 15 | Integrante 5 |
| Responsividade e Mobile First | 15 | Integrante 4 |
| CSS, seletores, cascata e organização | 10 | Integrante 3 |
| Identidade visual e consistência | 10 | Integrante 1 |
| Flexbox, Grid e Box Model | 10 | Integrante 3 |
| Pseudo-classes, estados, transition e transform | 10 | Integrante 4 |
| Acessibilidade e usabilidade | 10 | Integrante 5 |
| Apresentação e defesa | 5 | Todos |

---

## 3. Divisão entre os 5 integrantes

| # | Responsável por | Pontos cobertos |
|---|---|---|
| **1** | Abertura, proposta e identidade visual | 10 + abertura |
| **2** | HTML semântico, estrutura e navegação | 15 |
| **3** | CSS (seletores, cascata, Box Model) + Flexbox e Grid | 20 |
| **4** | Responsividade, Mobile First + pseudo-classes e animações | 25 |
| **5** | Formulário e validação + acessibilidade | 25 |

Escrevam os nomes na tabela do `README.md` antes da apresentação.

---

## 4. Roteiro de cada integrante

### Integrante 1 — Proposta e identidade visual

**Fala (≈3 min)**

> "O ArenaHub é um catálogo de quadras esportivas e organização de rachas.
>
> O **problema**: quem quer jogar hoje depende de grupo de mensagem e do
> contato pessoal do dono da quadra. Não existe um lugar único que mostre
> quais quadras existem, quanto custam e quais partidas ainda têm vaga.
>
> O **público-alvo** são praticantes amadores de esportes coletivos que jogam
> toda semana, e em segundo plano os donos de quadra com horários ociosos.
> Como eles acessam principalmente pelo celular, muitas vezes na rua, o
> projeto foi feito Mobile First e com alvos de toque grandes.
>
> A **arquitetura** são quatro páginas ligadas por uma navbar consistente,
> indo do geral para o específico: apresentação → catálogo → comunidade →
> formulário de reserva.
>
> A **identidade** é editorial esportiva, referência de cartaz de esporte:
> tipografia pesada, cantos retos, réguas grossas e sombra sólida, nunca
> desfocada. Todas as decisões visuais estão centralizadas em variáveis CSS."

**Onde está no código**

| O que mostrar | Arquivo | Linha |
|---|---|---|
| Paleta completa | `css/style.css` | **126** |
| Tipografia (2 famílias) | `css/style.css` | **147** |
| Escala de espaçamentos | `css/style.css` | **166** |
| Arredondamento (`--raio: 0`) | `css/style.css` | **175** |
| Bloco `:root` inteiro | `css/style.css` | **121** |
| Marca em SVG inline | `index.html` | **23** |

**Demonstre:** abra `css/style.css` na linha 126, troque `--cor-primaria` para
`#1b4f8a` e salve. Botões, links, etiquetas, logo e menu ativo mudam juntos.
**Desfaça antes de continuar.**

**Perguntas prováveis**

- *"Por que variáveis em vez de escrever a cor direto?"*
  → "A cor primária aparece em botões, links, etiquetas, logo e menu ativo.
  Sem variável, trocar exigiria caçar o código hexadecimal em cinco arquivos."
- *"Como escolheram as cores?"*
  → "Por contraste. Medimos todos os pares texto/fundo e o pior deles dá
  4.82:1, acima do mínimo de 4.5:1 da WCAG AA."

---

### Integrante 2 — HTML semântico, estrutura e navegação

**Fala (≈3 min)**

> "Usamos as sete tags semânticas em todas as páginas: `header`, `nav`,
> `main`, `section`, `article`, `aside` e `footer`. A diferença para uma
> `div` é que elas descrevem a **função** do bloco — o leitor de tela
> anuncia 'navegação' e permite pular direto para o conteúdo principal.
>
> Cada página tem **um único `h1`**, e a hierarquia desce sem pular níveis.
>
> Usamos `class` para estilo reutilizável e `id` para identificar um ponto
> único da página, que é o destino das âncoras.
>
> Sobre listas: onde a ordem faz parte do conteúdo, usamos `<ol>`. Os três
> passos da home são lista ordenada porque primeiro se escolhe a quadra,
> depois monta o time, depois reserva."

**Onde está no código**

| O que mostrar | Arquivo | Linha |
|---|---|---|
| `<header>` com `id="topo"` | `index.html` | **17** |
| `<nav>` com `aria-label` | `index.html` | **32** |
| `<main id="conteudo">` | `index.html` | **47** |
| `h1` único da página | `index.html` | **56** |
| `<ol class="passos">` | `index.html` | **121** |
| Link para âncora de outra página | `index.html` | **70** |
| `aria-current="page"` no menu | `quadras.html` | **36** |
| Imagem com `alt`, `srcset` e `sizes` | `quadras.html` | **82** |

**Demonstre:** no navegador, aperte `Tab` uma vez na home. Aparece "Pular
para o conteúdo principal" (`index.html` linha 14), que estava escondido.

**Perguntas prováveis**

- *"Qual a diferença entre `section` e `article`?"*
  → "`article` é conteúdo que faz sentido sozinho, fora da página — cada card
  de quadra é um `article`. `section` é um trecho temático da página, como
  'Catálogo' ou 'Como funciona'."
- *"Por que `id` no `main` se ele é único?"*
  → "Para ser destino de âncora. O link 'pular para o conteúdo' aponta para
  `#conteudo`."
- *"Por que `<ol>` e não `<ul>` nos passos?"*
  → "Porque a ordem é parte da informação. E o número nem está digitado no
  HTML: vem de um contador do CSS."

---

### Integrante 3 — CSS, cascata, Box Model, Flexbox e Grid

**Fala (≈4 min)**

> "O CSS é externo e dividido em cinco arquivos. Cada página carrega
> `style.css` e depois o CSS dela — a ordem importa, porque o da página vem
> depois e pode ajustar o global. Isso é cascata.
>
> Usamos os três tipos de seletor. **Elemento** define o padrão do site,
> **classe** é o estilo reutilizável, e **ID** identifica pontos únicos.
> Quando duas regras brigam, vence a mais específica, não a que está por
> último — ID vale mais que classe, que vale mais que elemento.
>
> No **Box Model**, a primeira regra do projeto é `box-sizing: border-box`.
> Sem ela, um campo com `width: 100%` mais padding e borda ocuparia mais que
> 100% e vazaria do formulário.
>
> Sobre **Flexbox e Grid**: a regra que seguimos é o número de eixos.
> Flexbox para uma direção, Grid para duas."

**Onde está no código**

| O que mostrar | Arquivo | Linha |
|---|---|---|
| Reset com `box-sizing` | `css/style.css` | **203** |
| Seletor de elemento (`body`) | `css/style.css` | **221** |
| Seletor de ID (âncoras agrupadas) | `css/style.css` | **314** |
| **Especificidade explicada no código** | `css/agendamento.css` | **74** |
| Flexbox — cabeçalho | `css/style.css` | **443** |
| Flexbox — `flex-wrap` no menu | `css/style.css` | **498** |
| Flexbox — `flex: 1` vira régua | `css/style.css` | **375** |
| Grid — catálogo | `css/style.css` | **634** |
| Grid — rodapé em 3 colunas | `css/style.css` | **795** |
| Grid — rótulo fixo + valor | `css/rachas.css` | **29** |

**A justificativa que o enunciado pede** (item 04, "Decisão técnica"):

| Componente | Técnica | Por quê |
|---|---|---|
| Cabeçalho | Flexbox | Logo e menu em **uma linha**, empurrados para os extremos |
| Menu | Flexbox | Itens em um eixo, com `flex-wrap` para quebrar no celular |
| Card (por dentro) | Flexbox | Empilhamento **vertical**: imagem, corpo, rodapé |
| Catálogo de quadras | **Grid** | **Linhas e colunas**: 1 no celular, 2 no tablet, 3 no desktop |
| Rodapé | **Grid** | Três colunas de largura igual |
| Detalhes do racha | **Grid** | `5rem 1fr` — rótulo fixo e valor flexível |

**Demonstre:** abra `css/agendamento.css` na linha 74. O comentário explica por que
`.subgrupo` sozinho não funcionaria: perde para `.formulario fieldset`, que
tem uma classe **e** um elemento. É especificidade na prática.

**Perguntas prováveis**

- *"Por que Grid no catálogo e Flexbox no card?"*
  → "O catálogo tem linhas e colunas, e o `gap` vale nos dois sentidos. Dentro
  do card é só empilhamento vertical, um eixo só."
- *"O que acontece sem `box-sizing: border-box`?"*
  → "Os campos do formulário têm `width: 100%` e padding. Sem a regra,
  ocupariam 100% mais o padding e vazariam para fora da caixa branca."
- *"Como resolvem um conflito de estilos?"*
  → Mostre `css/agendamento.css` na linha 74.

---

### Integrante 4 — Responsividade, Mobile First e interações

**Fala (≈4 min)**

> "A referência é **Mobile First**: o CSS principal é escrito para a tela
> pequena, e as media queries só **ampliam** em telas maiores. Nunca o
> contrário. Começando pelo aparelho mais limitado, o layout simples é o
> padrão e todo acréscimo é consciente.
>
> São dois pontos de quebra, em 768px e 1024px. E o que muda não é só
> tamanho: o cabeçalho passa de coluna para linha, a grade vai de 1 para 2 e
> depois 3 colunas, o hero vira duas colunas. É **reorganização**, que é o
> que o enunciado pede.
>
> Temos ainda três media queries que não perguntam pela largura: uma detecta
> tela operada com o dedo, outra detecta celular deitado, e a terceira
> respeita quem desativou animações no sistema.
>
> Nas interações, usamos as seis pseudo-classes de estado com `transition` e
> `transform`."

**Onde está no código**

| O que mostrar | Arquivo | Linha |
|---|---|---|
| Base mobile (1 coluna) | `css/style.css` | **634** |
| Media query 768px | `css/style.css` | **855** |
| Media query 1024px | `css/style.css` | **921** |
| Cabeçalho: coluna → linha | `css/style.css` | **443** e **855** |
| Hero em 2 colunas | `css/index.css` | **28** |
| Campos em 2 colunas | `css/agendamento.css` | **350** |
| Tela de toque (44px) | `css/style.css` | **950** |
| Celular deitado | `css/style.css` | **980** |
| Movimento reduzido | `css/style.css` | **1002** |
| `:hover` com `transform` | `css/style.css` | **649** |
| `:active` (botão afunda) | `css/style.css` | **594** |
| `:visited` | `css/style.css` | **272** |
| `:disabled` | `css/style.css` | **605** |
| `transition` | `css/style.css` | **264** |

**Demonstre (a parte mais forte da apresentação):**

1. `F12` → `Ctrl+Shift+M` → escolha "iPhone SE" (375px): uma coluna, menu
   quebrado em duas linhas.
2. Mude para "iPad" (768px): **o cabeçalho vira uma linha** e a grade ganha a
   segunda coluna.
3. Volte para desktop: terceira coluna, hero lado a lado.
4. Passe o mouse num card: ele desloca e revela a sombra sólida, e a foto
   aproxima 4%.

**Perguntas prováveis**

- *"Por que Mobile First e não o contrário?"*
  → "O celular é o aparelho mais limitado. Começando por ele, o layout simples
  é o padrão. No caminho inverso é fácil esquecer de desfazer algo e quebrar
  a tela pequena."
- *"Por que `transform` e não `margin` no hover?"*
  → "`margin` empurraria os vizinhos e a página pularia. `transform` desenha o
  elemento deslocado sem mexer no espaço que ele ocupa."
- *"Por que a `transition` está na regra normal e não no `:hover`?"*
  → "Para valer na ida e na volta. Se estivesse só no `:hover`, a animação
  aconteceria ao entrar, mas o retorno seria seco."

---

### Integrante 5 — Formulário, validação e acessibilidade

**Fala (≈4 min)**

> "O formulário tem todos os controles pedidos: texto, e-mail, telefone,
> número, data, hora, rádio, checkbox, `select` e `textarea`, agrupados em
> `fieldset` com `legend`.
>
> Toda `label` está ligada ao campo por `for` e `id`. Isso faz duas coisas:
> permite clicar no rótulo para focar no campo, e faz o leitor de tela
> anunciar rótulo e campo juntos.
>
> **A validação é 100% do navegador**, sem JavaScript. Vem dos atributos
> `required`, `min`, `max`, `minlength`, `maxlength` e `pattern`. O CSS só
> pinta o resultado.
>
> O cuidado principal foi **quando** mostrar o erro. Marcar tudo de vermelho
> quando a página abre confunde quem nem começou a preencher.
>
> Em acessibilidade: contraste mínimo de 4.82:1, foco visível por teclado,
> `alt` descritivo nas 13 imagens e link para pular direto ao conteúdo."

**Onde está no código**

| O que mostrar | Arquivo | Linha |
|---|---|---|
| `fieldset` + `legend` | `agendamento.html` | **79** |
| `label for` ↔ `id` | `agendamento.html` | **84** |
| Validação com `required` | `agendamento.html` | **94** |
| `select` com `optgroup` | `agendamento.html` | **135** |
| Rádios | `agendamento.html` | **219** |
| Checkboxes | `agendamento.html` | **252** |
| `textarea` | `agendamento.html` | **303** |
| `submit` e `reset` | `agendamento.html` | **325** |
| Forma dos campos | `css/agendamento.css` | **124** |
| `:invalid` só após digitar | `css/agendamento.css` | **177** |
| `:user-invalid` | `css/agendamento.css` | **199** |
| `:has()` na opção desabilitada | `css/agendamento.css` | **292** |
| `accent-color` | `css/agendamento.css` | **261** |
| Foco visível global | `css/style.css` | **297** |

**Demonstre:**

1. Abra o formulário. **Nenhum campo está vermelho** — ninguém preencheu nada.
2. Digite `abc` no e-mail: fica vermelho. Complete para um e-mail válido: a
   linha de baixo fica verde.
3. Em "Quantidade de jogadores", digite `99` (o máximo é 22): vermelho.
4. Clique em "Confirmar agendamento" com campos vazios: o **navegador** exibe
   a mensagem e leva o foco ao primeiro campo com problema.
5. Mostre o cupom desabilitado e a opção "Transmissão ao vivo", com borda
   tracejada.
6. Navegue o formulário inteiro **só com `Tab`**, mostrando o contorno laranja.

**Perguntas prováveis**

- *"Por que os campos não ficam vermelhos ao abrir a página?"*
  → Mostre a linha 177. "`:invalid` sozinho marcaria todo campo obrigatório
  vazio assim que a página carrega. Combinamos com `:not(:placeholder-shown)`,
  que só vale depois que a pessoa digitou. Data, hora e `select` não têm
  placeholder, então usamos `:user-invalid` para eles, na linha 199."
- *"Por que `label` associada e não só texto ao lado?"*
  → "Aumenta a área clicável e é o que faz o leitor de tela anunciar o rótulo
  junto do campo. Sem o `for`, o usuário ouviria 'campo de edição' sem saber
  do quê."
- *"Como garantem o contraste?"*
  → "Medimos todos os pares texto/fundo. O pior é a etiqueta de vagas, com
  4.82:1, acima do mínimo de 4.5:1 da WCAG AA."

---

## 5. Mapa completo: requisito → arquivo → linha

Tabela de emergência. Se a banca perguntar algo fora do roteiro, procure aqui.

### Item 02 — Estrutura e HTML

| Requisito | Arquivo | Linha |
|---|---|---|
| `DOCTYPE`, `lang="pt-BR"`, `charset`, `viewport` | todas as páginas | 1–8 |
| `<header>` | `index.html` | 17 |
| `<nav>` | `index.html` | 32 |
| `<main>` | `index.html` | 47 |
| `<h1>` único | `index.html` | 56 |
| `<ol>` com contador | `index.html` | 121 |
| Link para âncora de outra página | `index.html` | 70 |
| `alt` + `srcset` + `sizes` | `quadras.html` | 82 |
| `aria-current` | `quadras.html` | 36 |
| SVG inline | `index.html` | 23 |

### Item 03 — CSS e identidade

| Requisito | Arquivo | Linha |
|---|---|---|
| Variáveis `:root` | `css/style.css` | 121 |
| Paleta | `css/style.css` | 126 |
| Tipografia | `css/style.css` | 147 |
| Espaçamentos | `css/style.css` | 166 |
| Seletor de elemento | `css/style.css` | 221 |
| Seletor de ID | `css/style.css` | 314 |
| Cascata e especificidade | `css/agendamento.css` | 74 |
| `box-sizing` | `css/style.css` | 203 |

### Item 04 — Layout

| Requisito | Arquivo | Linha |
|---|---|---|
| Flexbox (cabeçalho) | `css/style.css` | 443 |
| Flexbox (botão) | `css/style.css` | 543 |
| `flex-wrap` | `css/style.css` | 498 |
| Grid (catálogo) | `css/style.css` | 634 |
| Grid (rodapé) | `css/style.css` | 795 |
| Grid (rótulo + valor) | `css/rachas.css` | 29 |
| `gap` | `css/style.css` | 636 |
| `margin-top: auto` | `css/style.css` | 697 |

### Item 05 — Formulário

| Requisito | Arquivo | Linha |
|---|---|---|
| `fieldset` / `legend` | `agendamento.html` | 79 |
| `label` + `for` | `agendamento.html` | 84 |
| `required` | `agendamento.html` | 94 |
| `select` / `optgroup` | `agendamento.html` | 135 |
| `radio` | `agendamento.html` | 219 |
| `checkbox` | `agendamento.html` | 252 |
| `textarea` | `agendamento.html` | 303 |
| `button` | `agendamento.html` | 325 |
| `:invalid` | `css/agendamento.css` | 177 |
| `:disabled` | `css/agendamento.css` | 292 |

### Itens 06 e 07 — Responsividade e interações

| Requisito | Arquivo | Linha |
|---|---|---|
| Media query 768px | `css/style.css` | 855 |
| Media query 1024px | `css/style.css` | 921 |
| `pointer: coarse` | `css/style.css` | 950 |
| `max-height` | `css/style.css` | 980 |
| `prefers-reduced-motion` | `css/style.css` | 1002 |
| `:hover` + `transform` | `css/style.css` | 649 |
| `:active` | `css/style.css` | 594 |
| `:visited` | `css/style.css` | 272 |
| `:focus` | `css/style.css` | 297 |
| `transition` | `css/style.css` | 264 |
| Contador CSS | `css/index.css` | 132 |

---

## 6. Roteiro da demonstração ao vivo

Ordem sugerida. Cada integrante assume a tela na sua vez.

**1. Home, no desktop** *(Integrante 1)*
Banner, os três passos numerados, os números de destaque. Cite a identidade:
cantos retos, tipografia pesada, sombra sólida.

**2. Estrutura no código** *(Integrante 2)*
Abra `index.html`, role do `<header>` ao `<footer>` mostrando as tags
semânticas. Aperte `Tab` no navegador para revelar o link de pular conteúdo.

**3. Catálogo e o CSS por trás** *(Integrante 3)*
Abra `quadras.html` no navegador e `css/style.css` na linha 634 ao lado.
"Esta é a grade que vocês estão vendo."

**4. Redimensionar ao vivo** *(Integrante 4)*
`F12` → modo dispositivo. Passe por 375px, 768px e desktop, narrando o que
**reorganiza** em cada faixa. Depois passe o mouse num card.

**5. Formulário** *(Integrante 5)*
Preencha errado de propósito, mostre o vermelho aparecendo só após digitar,
corrija e mostre o verde. Tente enviar vazio. Navegue com `Tab`.

**6. Fechamento** *(Integrante 1)*
"O projeto é autocontido: imagens e fontes estão no repositório, funciona
sem internet. A documentação está no `README.md` e no `GUIA-CSS.md`."

---

## 7. Perguntas difíceis e como responder

**"Vocês usaram alguma biblioteca ou framework?"**
> "Nenhuma. É HTML5 e CSS3 puro, sem JavaScript. Nem as fontes vêm de CDN:
> estão em `assets/fonts/`, o que faz o site funcionar offline."

**"Esse layout não daria para fazer só com Flexbox?"**
> "Daria, mas ficaria pior. No Flexbox, para ter 3 colunas seria preciso
> calcular a largura de cada card considerando o `gap`. No Grid, declaramos
> `repeat(3, 1fr)` e o navegador resolve. E o `gap` do Grid vale nos dois
> sentidos de uma vez."

**"Por que o número dos passos não está no HTML?"**
> "Usamos `counter-increment` do CSS. Se alguém inserir ou remover um passo,
> a numeração se corrige sozinha. Escrito na mão, seria preciso renumerar."
> *(`css/index.css`, linha 132)*

**"Por que o `quadras.css` tem uma regra só?"**
> "Porque a página é feita quase inteira de componentes compartilhados. Ela
> usa 37 classes: 36 vêm do `style.css` e 35 dessas também são usadas em
> `rachas.html` — `.card`, `.grade`, `.etiqueta`, `.botao`. Só o
> `.card__endereco` é exclusivo dela, porque no card de racha esse espaço
> mostra os detalhes da partida.
>
> Poderíamos ter duplicado o `.card` nos dois arquivos, mas aí mudar o card
> exigiria editar dois lugares. Um arquivo de página quase vazio é o
> resultado de a reutilização ter funcionado. Mantivemos o arquivo para o
> padrão ficar previsível: toda página tem o seu, e é ali que entra
> qualquer estilo novo que seja só dela."

**"E se o usuário desativar o CSS?"**
> "A página continua legível, porque a estrutura é semântica. Os títulos
> continuam títulos, as listas continuam listas e o formulário continua
> funcionando com os rótulos associados."

**"Como testaram a responsividade?"**
> "Nas três faixas: abaixo de 768, entre 768 e 1023, e 1024 ou mais.
> Verificamos que não aparece rolagem horizontal em nenhuma."

**"Por que `:visited` num site novo?"**
> "Para quem navega saber onde já esteve. Mas desligamos onde não faz
> sentido: o item do menu e os botões não mudam de cor só porque a página já
> foi aberta." *(`css/style.css`, linhas 272 e 515)*

**"O que é aquele `:has()` no CSS?"**
> "É o seletor de pai: estiliza um elemento pelo que existe **dentro** dele.
> Usamos para dar borda tracejada na opção inteira que contém um campo
> desabilitado. Sem ele, só o quadradinho ficaria diferente."

**Se não souberem responder:**
> "Não sei responder de cabeça, mas sei onde está no código — posso abrir."
> Isso vale mais que inventar.

---

## 8. Erros que derrubam nota

- **Ler slide ou o código em voz alta.** Explique a **decisão**, não a sintaxe.
- **Um integrante responder pelo outro.** O enunciado cobra defesa individual.
- **Dizer "achei na internet" ou "foi o que funcionou".** Toda decisão deste
  projeto tem um porquê — estão todos neste roteiro e no `GUIA-CSS.md`.
- **Esquecer de justificar Flexbox x Grid.** O item 04 pede isso
  explicitamente. É a pergunta mais provável da banca.
- **Mexer no código durante a apresentação e não desfazer.** Se demonstrar
  trocando uma variável, desfaça na hora (`Ctrl+Z`).
- **Depender do Wi-Fi.** Não precisa, mas confirme antes que está abrindo os
  arquivos locais, e não uma versão hospedada.
