const API_URL = location.port === '3000' ? '' : 'http://localhost:3000';

const lista = document.getElementById('lista-quadras');
const estado = document.getElementById('status');

const imagens = ['futebol-society', 'volei-de-praia', 'beach-tennis', 'basquete-coberto', 'tenis-saibro', 'basquete-externo'];

async function carregarQuadras() {
  try {
    const resposta = await fetch(`${API_URL}/api/quadras`);
    if (!resposta.ok) throw new Error();
    const quadras = await resposta.json();

    estado.textContent = quadras.length === 0 ? 'nenhuma quadra cadastrada.' : '';
    lista.innerHTML = '';
    quadras.forEach((quadra, i) => {
      lista.innerHTML += `
        <article class="card">
          <img src="images/${imagens[i % imagens.length]}-800.jpg" alt="Quadra de ${quadra.modalidade}">
          <h2>${quadra.nome}</h2>
          <p><strong>${quadra.modalidade}</strong></p>
          <p>${quadra.endereco}</p>
          <p>${quadra.descricao}</p>
          <p>R$ ${quadra.precoHora} por hora</p>
          <a class="btn" href="agendamento.html?quadraId=${quadra.id}">Agendar</a>
        </article>`;
    });
  } catch (err) {
    console.error(err);
    estado.textContent = 'erro ao carregar as quadras. tente novamente.';
  }
}

carregarQuadras();
