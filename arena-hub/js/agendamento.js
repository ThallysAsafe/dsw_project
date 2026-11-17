const API_URL = location.port === '3000' ? '' : 'http://localhost:3000';

const form = document.getElementById('form');
const campoId = document.getElementById('id');
const selectQuadra = document.getElementById('quadraId');
const caixaHorarios = document.getElementById('horarios');
const valorTotal = document.getElementById('valor-total');
const titulo = document.getElementById('titulo-form');
const btnSalvar = document.getElementById('btn-salvar');
const mensagem = document.getElementById('mensagem');

const params = new URLSearchParams(location.search);
const quadraIdParam = params.get('quadraId');
const idParam = params.get('id');

let quadras = [];

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

// gerar checkboxes de horarios das 08h as 22h
for (let hora = 8; hora <= 22; hora++) {
  const texto = (hora < 10 ? '0' + hora : hora) + ':00';
  caixaHorarios.innerHTML += `<label><input type="checkbox" name="horarios" value="${texto}"> ${texto}</label>`;
}

// calcular valor total com base nos horarios e preco da quadra
function atualizarValorTotal() {
  const quadra = quadras.find(q => String(q.id) === String(selectQuadra.value));
  const qtdHorarios = form.querySelectorAll('[name=horarios]:checked').length;
  const total = quadra ? qtdHorarios * quadra.precoHora : 0;
  valorTotal.textContent = `Valor total: R$ ${total}`;
}

async function carregarQuadras() {
  try {
    const resposta = await fetch(`${API_URL}/api/quadras`);
    if (!resposta.ok) throw new Error();
    quadras = await resposta.json();

    selectQuadra.innerHTML = '<option value="">Selecione</option>';
    quadras.forEach(quadra => {
      selectQuadra.innerHTML += `<option value="${quadra.id}">${quadra.nome} (${quadra.modalidade}) - R$ ${quadra.precoHora}/h</option>`;
    });

    if (quadraIdParam) {
      selectQuadra.value = quadraIdParam;
    }
    atualizarValorTotal();
  } catch {
    mostrarMensagem('erro ao carregar as quadras.', 'erro');
  }
}

async function carregarAgendamento(id) {
  try {
    const resposta = await fetch(`${API_URL}/api/agendamentos/${id}`);
    if (!resposta.ok) throw new Error();
    const agendamento = await resposta.json();

    campoId.value = agendamento.id;
    form.nome.value = agendamento.nome;
    form.email.value = agendamento.email;
    form.telefone.value = agendamento.telefone || '';
    selectQuadra.value = agendamento.quadraId;
    form.data.value = agendamento.data;

    form.querySelectorAll('[name=horarios]').forEach(checkbox => {
      checkbox.checked = agendamento.horarios.includes(checkbox.value);
    });

    titulo.textContent = 'Editar agendamento';
    btnSalvar.textContent = 'Salvar alterações';
    atualizarValorTotal();
  } catch {
    mostrarMensagem('erro ao carregar agendamento.', 'erro');
  }
}

selectQuadra.addEventListener('change', atualizarValorTotal);
caixaHorarios.addEventListener('change', atualizarValorTotal);

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  form.classList.add('form-enviado');

  const horarios = [];
  for (const checkbox of form.querySelectorAll('[name=horarios]:checked')) {
    horarios.push(checkbox.value);
  }

  if (!form.checkValidity()) return mostrarMensagem('corrija os campos destacados.', 'erro');
  if (horarios.length === 0) return mostrarMensagem('escolha pelo menos um horário.', 'erro');

  const dados = {
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    telefone: form.telefone.value.trim(),
    quadraId: Number(selectQuadra.value),
    data: form.data.value,
    horarios: horarios
  };

  const id = campoId.value;
  btnSalvar.disabled = true;
  try {
    const resposta = await fetch(id ? `${API_URL}/api/agendamentos/${id}` : `${API_URL}/api/agendamentos`, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    const corpo = await resposta.json();
    if (!resposta.ok) throw new Error(corpo.mensagem);

    location.href = 'agendamentos.html';
  } catch (erro) {
    mostrarMensagem(erro.message || 'erro ao salvar.', 'erro');
    btnSalvar.disabled = false;
  }
});

// carregamento inicial
(async () => {
  await carregarQuadras();
  if (idParam) {
    await carregarAgendamento(idParam);
  }
})();
