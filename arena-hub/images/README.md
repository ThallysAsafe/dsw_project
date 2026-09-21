# Pasta de imagens

As fotos das quadras e do banner são carregadas diretamente do Unsplash
(`https://images.unsplash.com/...`), com dimensões definidas na própria URL
(`w=800` para os cards e `w=1200` para o banner da página inicial).

Todas as imagens possuem atributo `alt` descritivo, que funciona como
conteúdo alternativo caso o navegador esteja offline ou a imagem não carregue.

Para usar arquivos locais em vez das URLs remotas:

1. Salve as imagens nesta pasta (ex.: `quadra-society.jpg`).
2. Troque o `src` no HTML pelo caminho relativo: `src="images/quadra-society.jpg"`.
3. Mantenha o mesmo texto do atributo `alt`.
