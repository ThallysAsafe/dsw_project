# Pasta de imagens

As fotos das quadras e do banner são carregadas do Unsplash
(`https://images.unsplash.com/...`), com as dimensões definidas na própria URL
(`w=800` nos cards, `w=1200` no banner da página inicial).

Todas as imagens têm atributo `alt` descritivo, que funciona como conteúdo
alternativo caso o navegador esteja offline ou a imagem não carregue.

A marca do cabeçalho não é um arquivo de imagem: é um **SVG inline**, escrito
direto no HTML, o que evita uma requisição extra e permite que ele herde a cor
do CSS via `currentColor`.

As fontes do projeto ficam em `assets/fonts/` e são carregadas localmente, sem
CDN.

## Usar arquivos locais em vez das URLs remotas

1. Salve as imagens nesta pasta (ex.: `quadra-society.jpg`).
2. Troque o `src` no HTML pelo caminho relativo: `src="images/quadra-society.jpg"`.
3. Mantenha o mesmo texto do atributo `alt`.
