const API_URL = window.location.port === '3000' ? '' : 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('form-agendamento');
  const selectQuadra = document.getElementById('quadraId');
  const infoQuadra = document.getElementById('info-quadra');
  const listaHorarios = document.getElementById('lista-horarios');
  const resumoValor = document.getElementById('resumo-valor');
  const inputId = document.getElementById('agendamento-id');
  const tituloPagina = document.getElementById('titulo-pagina');
  const btnSubmeter = document.getElementById('btn-submeter');

  const params = new URLSearchParams(window.location.search);
  const quadraIdParam = params.get('quadraId');
  const agendamentoIdParam = params.get('id');

  let listaQuadras = [];

  // gerar opcoes de horarios das 08h as 22h com intervalo de 1 hora
  function montarListaHorarios() {
    const itens = [];
    for (let hora = 8; hora <= 22; hora++) {
      const textoHora = `${String(hora).padStart(2, '0')}:00`;
      itens.push(`
        <label class="horario-item">
          <input type="checkbox" name="horarios" value="${textoHora}">
          <span>${textoHora}</span>
        </label>
      `);
    }
    listaHorarios.innerHTML = itens.join('');
  }

  // buscar todas as quadras para preencher o select
  async function carregarQuadras() {
    try {
      const resposta = await fetch(`${API_URL}/api/quadras`);
      if (!resposta.ok) throw new Error('erro ao carregar quadras');

      listaQuadras = await resposta.json();

      selectQuadra.innerHTML = '<option value="">Selecione uma quadra</option>' +
        listaQuadras.map(q =>
          `<option value="${q.id}">${q.nome} - ${q.modalidade} (R$ ${q.precoHora}/h)</option>`
        ).join('');

      // pre-selecionar a quadra se vier na url
      if (quadraIdParam) {
        selectQuadra.value = quadraIdParam;
        atualizarResumoQuadra(quadraIdParam);
      }
    } catch (erro) {
      console.error(erro);
      selectQuadra.innerHTML = '<option value="">Erro ao carregar quadras</option>';
    }
  }

  // mostrar banner com detalhes da quadra escolhida
  function atualizarResumoQuadra(id) {
    const quadra = listaQuadras.find(q => String(q.id) === String(id));
    if (!quadra) {
      infoQuadra.style.display = 'none';
      return;
    }

    infoQuadra.style.display = 'block';
    infoQuadra.innerHTML = `
      <strong>Quadra selecionada:</strong> ${quadra.nome} (${quadra.modalidade}) — 
      <strong>R$ ${quadra.precoHora}/hora</strong><br>
      <small>${quadra.endereco}</small>
    `;
  }

  selectQuadra.addEventListener('change', () => {
    atualizarResumoQuadra(selectQuadra.value);
    atualizarValorTotal();
  });

  listaHorarios.addEventListener('change', () => {
    atualizarValorTotal();
  });

  // calcular valor total baseado na quantidade de horarios e preco da quadra
  function atualizarValorTotal() {
    const quadra = listaQuadras.find(q => String(q.id) === String(selectQuadra.value));
    const qtdHorarios = form.querySelectorAll('input[name="horarios"]:checked').length;
    const total = quadra ? qtdHorarios * quadra.precoHora : 0;

    if (quadra && qtdHorarios > 0) {
      resumoValor.innerHTML = `Valor total: <strong>R$ ${total}</strong>`;
    } else {
      resumoValor.innerHTML = 'Valor total: <strong>R$ 0</strong>';
    }
  }

  // carregar dados do agendamento quando estiver em modo edicao
  async function carregarAgendamentoParaEdicao(id) {
    try {
      const resposta = await fetch(`${API_URL}/api/agendamentos/${id}`);
      if (!resposta.ok) throw new Error('agendamento nao encontrado');

      const agendamento = await resposta.json();

      inputId.value = agendamento.id;
      selectQuadra.value = agendamento.quadraId;
      atualizarResumoQuadra(agendamento.quadraId);

      form.nome.value = agendamento.nome || '';
      form.email.value = agendamento.email || '';
      form.telefone.value = agendamento.telefone || '';
      form.data.value = agendamento.data || '';

      form.querySelectorAll('input[name="horarios"]').forEach(cb => {
        cb.checked = Array.isArray(agendamento.horarios) && agendamento.horarios.includes(cb.value);
      });

      tituloPagina.textContent = 'Editar agendamento';
      btnSubmeter.textContent = 'Salvar alterações';
    } catch (erro) {
      console.error(erro);
      alert('Nao foi possivel carregar os dados do agendamento.');
    }
  }

  // enviar formulario para criar ou atualizar agendamento
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const horariosSelecionados = Array.from(
      form.querySelectorAll('input[name="horarios"]:checked')
    ).map(el => el.value);

    if (horariosSelecionados.length === 0) {
      alert('Selecione pelo menos um horário.');
      return;
    }

    const dados = {
      quadraId: Number(selectQuadra.value),
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      telefone: form.telefone.value.trim(),
      data: form.data.value,
      horarios: horariosSelecionados
    };

    const id = inputId.value;
    const ehEdicao = Boolean(id);
    const url = ehEdicao ? `${API_URL}/api/agendamentos/${id}` : `${API_URL}/api/agendamentos`;
    const method = ehEdicao ? 'PUT' : 'POST';

    try {
      const resposta = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      if (!resposta.ok) throw new Error('erro ao salvar agendamento');

      alert(ehEdicao ? 'Agendamento atualizado com sucesso!' : 'Agendamento realizado com sucesso!');
      window.location.href = 'agendamentos.html';
    } catch (erro) {
      console.error(erro);
      alert('Erro ao salvar agendamento.');
    }
  });

  // carregamento inicial
  montarListaHorarios();
  await carregarQuadras();
  if (agendamentoIdParam) {
    await carregarAgendamentoParaEdicao(agendamentoIdParam);
  }
  atualizarValorTotal();
});
