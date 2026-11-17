const lista = document.getElementById('lista-quadras');
const status = document.getElementById('status');

const imagens = ['futebol-society', 'volei-de-praia', 'beach-tennis', 'basquete-coberto', 'tenis-saibro', 'basquete-externo'];

async function carregarQuadras() {
  try {
    const resposta = await fetch('/api/quadras');
    if (!resposta.ok) throw new Error();
    const quadras = await resposta.json();

    status.textContent = quadras.length === 0 ? 'Nenhuma quadra cadastrada.' : '';
    quadras.forEach((q, i) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="images/${imagens[i % imagens.length]}-800.jpg" alt="">
        <h2></h2>
        <p><strong></strong></p>
        <p class="endereco"></p>
        <p class="descricao"></p>
        <p>R$ ${q.precoHora} por hora</p>
        <a class="btn" href="agendamentos.html?quadraId=${q.id}">Agendar</a>`;
      card.querySelector('img').alt = `Quadra de ${q.modalidade}`;
      card.querySelector('h2').textContent = q.nome;
      card.querySelector('strong').textContent = q.modalidade;
      card.querySelector('.endereco').textContent = q.endereco;
      card.querySelector('.descricao').textContent = q.descricao;
      lista.append(card);
    });
  } catch {
    status.textContent = 'Erro ao carregar as quadras. Tente novamente.';
    status.className = 'erro';
  }
}

carregarQuadras();
