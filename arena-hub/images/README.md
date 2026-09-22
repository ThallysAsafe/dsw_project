# Pasta de imagens

Todas as fotos usadas no site estão aqui, em arquivos locais. O projeto
**não depende de internet** para exibir as imagens: basta abrir
`index.html` no navegador.

## Por que três arquivos de cada foto

Cada foto existe em três larguras. O HTML oferece as opções pelo atributo
`srcset` e o navegador escolhe sozinho a mais adequada ao tamanho da tela:

```html
<img src="images/futebol-society-800.jpg"
     srcset="images/futebol-society-400.jpg 400w,
             images/futebol-society-600.jpg 600w,
             images/futebol-society-800.jpg 800w"
     sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
     width="800" height="600"
     alt="...">
```

Assim um celular baixa a versão de 400px (~35 KB) em vez da de 800px
(~110 KB). Os atributos `width` e `height` reservam o espaço da foto antes
de ela carregar, evitando que o texto "pule" na tela.

## Arquivos

| Arquivo | Onde aparece | Dimensões |
|---|---|---|
| `campo-noturno-{600,900,1200}.jpg` | Banner da home | 3:2 |
| `futebol-society-{400,600,800}.jpg` | Arena Jatiúca / Futebol das Terças | 4:3 |
| `volei-de-praia-{400,600,800}.jpg` | Arena Ponta Verde / Vôlei da Galera | 4:3 |
| `beach-tennis-{400,600,800}.jpg` | Beach Club Pajuçara / Beach Tennis | 4:3 |
| `basquete-coberto-{400,600,800}.jpg` | Ginásio Farol / Racha de Futsal | 4:3 |
| `tenis-saibro-{400,600,800}.jpg` | Tennis Park Gruta / Tênis de Domingo | 4:3 |
| `basquete-externo-{400,600,800}.jpg` | Praça Benedito Bentes / Basquete 3x3 | 4:3 |

Total: 21 arquivos, cerca de 1,4 MB.

## Procedência

Fotos do **Unsplash**, que permite uso gratuito inclusive comercial, sem
exigir atribuição ([licença](https://unsplash.com/license)). Ainda assim,
as fontes ficam registradas aqui:

| Arquivo | Foto original |
|---|---|
| `campo-noturno` | unsplash.com/photos/1431324155629-1a6deb1dec8d |
| `futebol-society` | unsplash.com/photos/1551958219-acbc608c6377 |
| `volei-de-praia` | unsplash.com/photos/1612872087720-bb876e2e67d1 |
| `beach-tennis` | unsplash.com/photos/1592656094267-764a45160876 |
| `basquete-coberto` | unsplash.com/photos/1577471488278-16eec37ffcc2 |
| `tenis-saibro` | unsplash.com/photos/1554068865-24cecd4e34b8 |
| `basquete-externo` | unsplash.com/photos/1521412644187-c49fa049e84d |

## Trocar uma foto

1. Coloque o novo arquivo nesta pasta, nas três larguras, seguindo o mesmo
   padrão de nome (`nome-400.jpg`, `nome-600.jpg`, `nome-800.jpg`).
2. Mantenha a proporção 4:3 nos cards (ex.: 400x300, 600x450, 800x600) para
   não alterar o enquadramento.
3. No HTML, troque o `src` e as três linhas do `srcset`.
4. **Atualize o `alt`** descrevendo a nova foto — ele é o que leitores de
   tela anunciam e o que aparece se a imagem não carregar.

> A marca do cabeçalho não é um arquivo desta pasta: é um **SVG escrito
> direto no HTML**, o que evita uma requisição extra e permite que ele herde
> a cor do CSS pelo `currentColor`.
