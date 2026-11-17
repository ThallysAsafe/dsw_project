const API_URL = window.location.port === '3000' ? '' : 'http://localhost:3000';

const IMAGENS_QUADRAS = [
  'images/futebol-society-800.jpg',
  'images/volei-de-praia-800.jpg',
  'images/beach-tennis-800.jpg',
  'images/basquete-coberto-800.jpg',
  'images/tenis-saibro-800.jpg',
  'images/basquete-externo-800.jpg'
];

document.addEventListener('DOMContentLoaded', () => {
  const containerQuadras = document.getElementById('lista-quadras');

  // buscar todas as quadras da api
  async function carregarQuadras() {
    try {
      const resposta = await fetch(`${API_URL}/api/quadras`);
      if (!resposta.ok) {
        throw new Error('erro ao buscar quadras');
      }

      const quadras = await resposta.json();
      renderizarQuadras(quadras);
    } catch (erro) {
      console.error(erro);
      containerQuadras.innerHTML = '<p>Nao foi possivel carregar as quadras no momento.</p>';
    }
  }

  // montar os cards com imagens aleatorias mesmo
  function renderizarQuadras(quadras) {
    if (quadras.length === 0) {
      containerQuadras.innerHTML = '<p>Nenhuma quadra disponivel no momento.</p>';
      return;
    }

    const imagensSorteadas = [...IMAGENS_QUADRAS].sort(() => Math.random() - 0.5);

    containerQuadras.innerHTML = quadras.map((quadra, index) => {
      const imagem = imagensSorteadas[index % imagensSorteadas.length];

      return `
        <article class="card">
          <img src="${imagem}" alt="${quadra.nome} - ${quadra.modalidade}">
          <div class="card-corpo">
            <span class="tag">${quadra.modalidade}</span>
            <h3>${quadra.nome}</h3>
            <p class="endereco">${quadra.endereco}</p>
            <p>${quadra.descricao}</p>
            <p class="preco">R$ ${quadra.precoHora} <span>por hora</span></p>
            <a class="btn btn-primario btn-bloco" href="agendamento.html?quadraId=${quadra.id}">
              Agendar horário
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  // carregamento inicial
  carregarQuadras();
});
