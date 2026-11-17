const API_URL = location.port === '3000' ? '' : 'http://localhost:3000';

const mensagem = document.getElementById('mensagem');
const estado = document.getElementById('status');
const lista = document.getElementById('lista');

let agendamentos = [];

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

function formatarData(data) {
  const partes = data.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

async function carregarAgendamentos() {
  estado.textContent = 'carregando...';
  try {
    const resposta = await fetch(`${API_URL}/api/agendamentos`);
    if (!resposta.ok) throw new Error();
    agendamentos = await resposta.json();
    renderizar();
  } catch {
    lista.innerHTML = '';
    estado.textContent = 'erro ao carregar os agendamentos.';
  }
}

function renderizar() {
  lista.innerHTML = '';
  estado.textContent = agendamentos.length === 0 ? 'nenhum agendamento encontrado.' : '';

  agendamentos.forEach(agendamento => {
    const card = document.createElement('article');
    card.className = 'card';

    const nomeQuadra = document.createElement('h3');
    nomeQuadra.textContent = agendamento.quadra.nome;

    const total = agendamento.horarios.length * agendamento.quadra.precoHora;
    const telefoneTexto = agendamento.telefone ? ` · ${agendamento.telefone}` : '';

    const detalhes = document.createElement('p');
    detalhes.innerText =
      `${agendamento.nome} (${agendamento.email}${telefoneTexto})\n` +
      `Data: ${formatarData(agendamento.data)}\n` +
      `Horários: ${agendamento.horarios.join(', ')}\n` +
      `Valor total: R$ ${total}`;

    const btnEditar = document.createElement('a');
    btnEditar.className = 'btn btn-secundario';
    btnEditar.textContent = 'Editar';
    btnEditar.href = `agendamento.html?id=${agendamento.id}`;

    const btnExcluir = document.createElement('button');
    btnExcluir.className = 'btn';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => excluir(agendamento.id));

    const botoes = document.createElement('p');
    botoes.append(btnEditar, ' ', btnExcluir);

    card.append(nomeQuadra, detalhes, botoes);
    lista.append(card);
  });
}

async function excluir(id) {
  if (!confirm('deseja excluir este agendamento?')) return;
  try {
    const resposta = await fetch(`${API_URL}/api/agendamentos/${id}`, { method: 'DELETE' });
    if (!resposta.ok) throw new Error((await resposta.json()).mensagem);
    mostrarMensagem('agendamento excluído.', 'sucesso');
    carregarAgendamentos();
  } catch (erro) {
    mostrarMensagem(erro.message || 'erro ao excluir.', 'erro');
  }
}

carregarAgendamentos();
