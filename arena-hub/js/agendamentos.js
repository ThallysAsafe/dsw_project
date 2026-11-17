const API_URL = window.location.port === '3000' ? '' : 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const containerReservas = document.getElementById('lista-reservas');
  const campoBusca = document.getElementById('campo-busca');

  let todosAgendamentos = [];

  // buscar todos os agendamentos da api
  async function carregarAgendamentos() {
    try {
      const resposta = await fetch(`${API_URL}/api/agendamentos`);
      if (!resposta.ok) {
        throw new Error('erro ao buscar agendamentos');
      }

      todosAgendamentos = await resposta.json();
      renderizarAgendamentos(todosAgendamentos);
    } catch (erro) {
      console.error(erro);
      containerReservas.innerHTML = '<p>Nao foi possivel carregar os agendamentos no momento.</p>';
    }
  }

  // filtrar agendamentos pelo campo de busca
  if (campoBusca) {
    campoBusca.addEventListener('input', () => {
      const termo = campoBusca.value.trim().toLowerCase();
      const filtrados = todosAgendamentos.filter(item => {
        const nome = (item.nome || '').toLowerCase();
        const quadra = (item.quadra?.nome || '').toLowerCase();
        const modalidade = (item.quadra?.modalidade || '').toLowerCase();
        return nome.includes(termo) || quadra.includes(termo) || modalidade.includes(termo);
      });
      renderizarAgendamentos(filtrados);
    });
  }

  // renderizar os cards de reservas na tela
  function renderizarAgendamentos(agendamentos) {
    if (agendamentos.length === 0) {
      containerReservas.innerHTML = '<p>Nenhum agendamento realizado ate o momento.</p>';
      return;
    }

    containerReservas.innerHTML = agendamentos.map(item => {
      const nomeQuadra = item.quadra
        ? `${item.quadra.nome} (${item.quadra.modalidade})`
        : 'Quadra nao informada';
      const dataFormatada = item.data ? item.data.split('-').reverse().join('/') : '--/--/----';
      const horariosLista = Array.isArray(item.horarios) && item.horarios.length > 0
        ? item.horarios.join(', ')
        : 'Nenhum';

      return `
        <article class="card">
          <div class="card-corpo">
            <span class="tag">${item.quadra ? item.quadra.modalidade : 'Reserva'}</span>
            <h3>${nomeQuadra}</h3>

            <ul class="lista-detalhes">
              <li><strong>Solicitante:</strong> ${item.nome} (${item.email})</li>
              ${item.telefone ? `<li><strong>Telefone:</strong> ${item.telefone}</li>` : ''}
              <li><strong>Data:</strong> ${dataFormatada}</li>
              <li><strong>Horários:</strong> ${horariosLista}</li>
            </ul>

            <div class="botoes" style="margin-top: auto; padding-top: 10px;">
              <a class="btn btn-secundario" href="agendamento.html?id=${item.id}">Editar</a>
              <button type="button" class="btn btn-perigo btn-cancelar" data-id="${item.id}">Cancelar reserva</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // adicionar evento de exclusao nos botoes
    document.querySelectorAll('.btn-cancelar').forEach(btn => {
      btn.addEventListener('click', () => excluirAgendamento(btn.dataset.id));
    });
  }

  // cancelar agendamento via api
  async function excluirAgendamento(id) {
    const confirmar = confirm('Tem certeza que deseja cancelar este agendamento?');
    if (!confirmar) return;

    try {
      const resposta = await fetch(`${API_URL}/api/agendamentos/${id}`, {
        method: 'DELETE'
      });

      if (!resposta.ok) {
        throw new Error('erro ao cancelar agendamento');
      }

      alert('Agendamento cancelado com sucesso!');
      carregarAgendamentos();
    } catch (erro) {
      console.error(erro);
      alert('Nao foi possivel cancelar o agendamento.');
    }
  }

  // carregamento inicial
  carregarAgendamentos();
});
