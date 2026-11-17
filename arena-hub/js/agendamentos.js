const form = document.getElementById('form');
const campoId = document.getElementById('id');
const selectQuadra = document.getElementById('quadraId');
const caixaHorarios = document.getElementById('horarios');
const titulo = document.getElementById('titulo-form');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');
const mensagem = document.getElementById('mensagem');
const busca = document.getElementById('busca');
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

for (let hora = 8; hora <= 22; hora++) {
  const texto = (hora < 10 ? '0' + hora : hora) + ':00';
  caixaHorarios.innerHTML += `<label><input type="checkbox" name="horarios" value="${texto}"> ${texto}</label>`;
}

async function carregarQuadras() {
  try {
    const resposta = await fetch('/api/quadras');
    if (!resposta.ok) throw new Error();
    const quadras = await resposta.json();

    selectQuadra.innerHTML = '<option value="">Selecione</option>';
    quadras.forEach(quadra => {
      selectQuadra.innerHTML += `<option value="${quadra.id}">${quadra.nome} (${quadra.modalidade}) - R$ ${quadra.precoHora}/h</option>`;
    });
    selectQuadra.value = new URLSearchParams(location.search).get('quadraId') || '';
  } catch {
    mostrarMensagem('erro ao carregar as quadras.', 'erro');
  }
}

async function carregarAgendamentos() {
  estado.textContent = 'carregando...';
  try {
    const resposta = await fetch('/api/agendamentos');
    if (!resposta.ok) throw new Error();
    agendamentos = await resposta.json();
    renderizar();
  } catch {
    lista.innerHTML = '';
    estado.textContent = 'erro ao carregar os agendamentos.';
  }
}

function renderizar() {
  const termo = busca.value.trim().toLowerCase();
  const filtrados = agendamentos.filter(agendamento =>
    agendamento.nome.toLowerCase().includes(termo) ||
    agendamento.quadra.nome.toLowerCase().includes(termo));

  lista.innerHTML = '';
  estado.textContent = filtrados.length === 0 ? 'nenhum agendamento encontrado.' : '';

  filtrados.forEach(agendamento => {
    const card = document.createElement('article');
    card.className = 'card';

    const nomeQuadra = document.createElement('h3');
    nomeQuadra.textContent = agendamento.quadra.nome;

    const detalhes = document.createElement('p');
    detalhes.innerText =
      `${agendamento.nome} (${agendamento.email})\n` +
      `Data: ${formatarData(agendamento.data)}\n` +
      `Horários: ${agendamento.horarios.join(', ')}\n` +
      `Jogadores: ${agendamento.jogadores} · Pagamento: ${agendamento.pagamento}`;

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn btn-secundario';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => editar(agendamento));

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

function editar(agendamento) {
  campoId.value = agendamento.id;
  form.nome.value = agendamento.nome;
  form.email.value = agendamento.email;
  form.telefone.value = agendamento.telefone || '';
  selectQuadra.value = agendamento.quadraId;
  form.data.value = agendamento.data;
  form.jogadores.value = agendamento.jogadores;
  form.observacoes.value = agendamento.observacoes || '';
  form.querySelectorAll('[name=horarios]').forEach(checkbox => {
    checkbox.checked = agendamento.horarios.includes(checkbox.value);
  });
  form.querySelectorAll('[name=pagamento]').forEach(radio => {
    radio.checked = radio.value === agendamento.pagamento;
  });
  titulo.textContent = 'editar agendamento';
  btnSalvar.textContent = 'Salvar alterações';
  btnCancelar.style.display = 'inline-block';
  mostrarMensagem('', '');
  form.scrollIntoView();
}

function limparFormulario() {
  form.reset();
  form.classList.remove('form-enviado');
  campoId.value = '';
  titulo.textContent = 'Novo agendamento';
  btnSalvar.textContent = 'Cadastrar';
  btnCancelar.style.display = 'none';
}

async function excluir(id) {
  if (!confirm('Deseja excluir este agendamento?')) return;
  try {
    const resposta = await fetch(`/api/agendamentos/${id}`, { method: 'DELETE' });
    if (!resposta.ok) throw new Error((await resposta.json()).mensagem);
    if (campoId.value == id) limparFormulario();
    mostrarMensagem('Agendamento excluído.', 'sucesso');
    carregarAgendamentos();
  } catch (erro) {
    mostrarMensagem(erro.message || 'Erro ao excluir.', 'erro');
  }
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  form.classList.add('form-enviado');

  const horarios = [];
  for (const checkbox of form.querySelectorAll('[name=horarios]:checked')) {
    horarios.push(checkbox.value);
  }

  if (!form.checkValidity()) return mostrarMensagem('Corrija os campos destacados.', 'erro');
  if (horarios.length === 0) return mostrarMensagem('Escolha pelo menos um horário.', 'erro');

  const dados = {
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    telefone: form.telefone.value.trim(),
    quadraId: Number(selectQuadra.value),
    data: form.data.value,
    horarios: horarios,
    jogadores: Number(form.jogadores.value),
    pagamento: form.querySelector('[name=pagamento]:checked').value,
    observacoes: form.observacoes.value.trim()
  };

  const id = campoId.value;
  btnSalvar.disabled = true;
  try {
    const resposta = await fetch(id ? `/api/agendamentos/${id}` : '/api/agendamentos', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    const corpo = await resposta.json();
    if (!resposta.ok) throw new Error(corpo.mensagem);

    limparFormulario();
    mostrarMensagem(id ? 'Agendamento atualizado.' : 'Agendamento cadastrado.', 'sucesso');
    carregarAgendamentos();
  } catch (erro) {
    mostrarMensagem(erro.message || 'Erro ao salvar.', 'erro');
  } finally {
    btnSalvar.disabled = false;
  }
});

btnCancelar.addEventListener('click', () => {
  limparFormulario();
  mostrarMensagem('', '');
});
busca.addEventListener('input', renderizar);

carregarQuadras();
carregarAgendamentos();
