const form = document.getElementById('form');
const campoId = document.getElementById('id');
const selectQuadra = document.getElementById('quadraId');
const caixaHorarios = document.getElementById('horarios');
const titulo = document.getElementById('titulo-form');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');
const mensagem = document.getElementById('mensagem');
const busca = document.getElementById('busca');
const status = document.getElementById('status');
const lista = document.getElementById('lista');

let agendamentos = [];

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

for (let hora = 8; hora <= 22; hora++) {
  const texto = String(hora).padStart(2, '0') + ':00';
  caixaHorarios.insertAdjacentHTML('beforeend',
    `<label><input type="checkbox" name="horarios" value="${texto}"> ${texto}</label>`);
}

async function carregarQuadras() {
  try {
    const resposta = await fetch('/api/quadras');
    if (!resposta.ok) throw new Error();
    const quadras = await resposta.json();
    selectQuadra.add(new Option('Selecione', ''));
    quadras.forEach(q => selectQuadra.add(new Option(`${q.nome} (${q.modalidade}) - R$ ${q.precoHora}/h`, q.id)));
    selectQuadra.value = new URLSearchParams(location.search).get('quadraId') || '';
  } catch {
    mostrarMensagem('Erro ao carregar as quadras.', 'erro');
  }
}

async function carregarAgendamentos() {
  status.textContent = 'Carregando...';
  try {
    const resposta = await fetch('/api/agendamentos');
    if (!resposta.ok) throw new Error();
    agendamentos = await resposta.json();
    renderizar();
  } catch {
    lista.innerHTML = '';
    status.textContent = 'Erro ao carregar os agendamentos.';
  }
}

function renderizar() {
  const termo = busca.value.trim().toLowerCase();
  const filtrados = agendamentos.filter(a =>
    a.nome.toLowerCase().includes(termo) || a.quadra.nome.toLowerCase().includes(termo));

  lista.innerHTML = '';
  status.textContent = filtrados.length === 0 ? 'Nenhum agendamento encontrado.' : '';

  filtrados.forEach(a => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3></h3>
      <p class="detalhes"></p>
      <p>
        <button type="button" class="btn btn-secundario">Editar</button>
        <button type="button" class="btn">Excluir</button>
      </p>`;
    card.querySelector('h3').textContent = a.quadra.nome;
    card.querySelector('.detalhes').innerText =
      `${a.nome} (${a.email})\n` +
      `Data: ${a.data.split('-').reverse().join('/')}\n` +
      `Horários: ${a.horarios.join(', ')}\n` +
      `Jogadores: ${a.jogadores ?? '-'} · Pagamento: ${a.pagamento ?? '-'}`;
    const [btnEditar, btnExcluir] = card.querySelectorAll('button');
    btnEditar.addEventListener('click', () => editar(a));
    btnExcluir.addEventListener('click', () => excluir(a.id));
    lista.append(card);
  });
}

function editar(a) {
  campoId.value = a.id;
  form.nome.value = a.nome;
  form.email.value = a.email;
  form.telefone.value = a.telefone || '';
  selectQuadra.value = a.quadraId;
  form.data.value = a.data;
  form.jogadores.value = a.jogadores ?? '';
  form.observacoes.value = a.observacoes || '';
  form.querySelectorAll('[name=horarios]').forEach(c => { c.checked = a.horarios.includes(c.value); });
  form.querySelectorAll('[name=pagamento]').forEach(r => { r.checked = r.value === a.pagamento; });
  titulo.textContent = 'Editar agendamento';
  btnSalvar.textContent = 'Salvar alterações';
  btnCancelar.hidden = false;
  mostrarMensagem('', '');
  form.scrollIntoView();
}

function limparFormulario() {
  form.reset();
  form.classList.remove('form-enviado');
  campoId.value = '';
  titulo.textContent = 'Novo agendamento';
  btnSalvar.textContent = 'Cadastrar';
  btnCancelar.hidden = true;
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

  const horarios = [...form.querySelectorAll('[name=horarios]:checked')].map(c => c.value);

  if (!form.checkValidity()) return mostrarMensagem('Corrija os campos destacados.', 'erro');
  if (horarios.length === 0) return mostrarMensagem('Escolha pelo menos um horário.', 'erro');

  const dados = {
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    telefone: form.telefone.value.trim(),
    quadraId: Number(selectQuadra.value),
    data: form.data.value,
    horarios,
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
