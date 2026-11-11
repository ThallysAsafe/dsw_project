const NOMES_QUADRAS = {
  'arena-jatiuca': 'Arena Jatiúca — Futebol Society',
  'ginasio-farol-futsal': 'Ginásio Farol — Futsal',
  'arena-ponta-verde': 'Arena Ponta Verde — Vôlei de Praia',
  'beach-club-pajucara': 'Beach Club Pajuçara — Beach Tennis',
  'ginasio-farol-basquete': 'Ginásio Farol — Basquete',
  'praca-benedito-bentes': 'Praça Benedito Bentes — Basquete 3x3',
  'tennis-park-gruta': 'Tennis Park Gruta — Tênis'
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-agendamento');
  const inputId = document.getElementById('agendamento-id');
  const btnSubmeter = document.getElementById('btn-submeter');
  const btnCancelarEdicao = document.getElementById('btn-cancelar-edicao');
  const containerReservas = document.getElementById('lista-reservas');

  // carregar todos os agendamentos
  async function carregarAgendamentos() {
    try {
      const resposta = await fetch('/api/agendamentos');
      if (!resposta.ok) throw new Error('Erro ao buscar agendamentos.');

      const agendamentos = await resposta.json();
      renderizarAgendamentos(agendamentos);
    } catch (erro) {
      console.error(erro);
      if (containerReservas) {
        containerReservas.innerHTML = '<p class="secao__texto">Não foi possível carregar os agendamentos no momento.</p>';
      }
    }
  }

  // renderizar cartoes de agendamento na interface
  function renderizarAgendamentos(agendamentos) {
    if (!containerReservas) return;

    if (agendamentos.length === 0) {
      containerReservas.innerHTML = '<p class="secao__texto">Nenhum agendamento realizado até o momento.</p>';
      return;
    }

    containerReservas.innerHTML = agendamentos.map(item => {
      const nomeQuadra = NOMES_QUADRAS[item.quadra] || item.quadra || 'Quadra não especificada';
      const dataFormatada = item.data ? item.data.split('-').reverse().join('/') : '--/--/----';
      const servicosLista = Array.isArray(item.servicos) && item.servicos.length > 0
        ? item.servicos.join(', ')
        : (item.servicos || 'Nenhum');

      return `
        <article class="cartao" data-id="${item.id}">
          <div class="cartao__corpo">
            <p class="etiqueta etiqueta--verde">${item.tipoReserva === 'mensalista' ? 'Plano Mensalista' : 'Horário Avulso'}</p>
            <h3 style="margin-top: 0.5rem; margin-bottom: 0.5rem;">${nomeQuadra}</h3>
            
            <ul class="cartao__detalhes">
              <li><strong>Solicitante</strong> <span>${item.nome} (${item.email})</span></li>
              <li><strong>Data</strong> <span>${dataFormatada} às ${item.horario}</span></li>
              <li><strong>Duração</strong> <span>${item.horas}h (${item.jogadores} jogadores)</span></li>
              <li><strong>Serviços</strong> <span>${servicosLista}</span></li>
              ${item.observacoes ? `<li><strong>Obs</strong> <span>${item.observacoes}</span></li>` : ''}
            </ul>

            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
              <button type="button" class="botao botao--secundario btn-editar" data-id="${item.id}">
                Editar
              </button>
              <button type="button" class="botao botao--secundario btn-cancelar" data-id="${item.id}" style="border-color: var(--cor-destaque); color: var(--cor-destaque);">
                Cancelar Reserva
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // eventos botao editar e cancelar
    document.querySelectorAll('.btn-editar').forEach(btn => {
      btn.addEventListener('click', () => iniciarEdicao(btn.dataset.id, agendamentos));
    });

    document.querySelectorAll('.btn-cancelar').forEach(btn => {
      btn.addEventListener('click', () => excluirAgendamento(btn.dataset.id));
    });
  }

  // create agendamentos
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // coleta os valores do formulario
      const servicosMarcados = Array.from(
        form.querySelectorAll('input[name="servicos"]:checked')
      ).map(el => el.value);

      const dados = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        telefone: form.telefone ? form.telefone.value.trim() : '',
        quadra: form.quadra.value,
        data: form.data.value,
        horario: form.horario.value,
        jogadores: Number(form.jogadores.value),
        horas: Number(form.horas.value),
        tipoReserva: form['tipo-reserva'] ? form['tipo-reserva'].value : 'avulso',
        servicos: servicosMarcados,
        observacoes: form.observacoes ? form.observacoes.value.trim() : ''
      };

      const id = inputId.value;
      const ehEdicao = Boolean(id);

      const url = ehEdicao ? `/api/agendamentos/${id}` : '/api/agendamentos';
      const method = ehEdicao ? 'PUT' : 'POST';

      try {
        const resposta = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
          throw new Error('Falha ao processar solicitação.');
        }

        alert(ehEdicao ? 'Agendamento atualizado com sucesso!' : 'Agendamento realizado com sucesso!');
        cancelarEdicao();
        carregarAgendamentos();

        // rolar ate a lista de reservas
        const secaoLista = document.getElementById('secao-reservas');
        if (secaoLista) {
          secaoLista.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (erro) {
        console.error(erro);
        alert('Erro ao salvar agendamento. Verifique se o servidor está ativo.');
      }
    });
  }

  // preencher formulario para update
  function iniciarEdicao(id, lista) {
    const agendamento = lista.find(item => String(item.id) === String(id));
    if (!agendamento) return;

    inputId.value = agendamento.id;
    form.nome.value = agendamento.nome || '';
    form.email.value = agendamento.email || '';
    if (form.telefone) form.telefone.value = agendamento.telefone || '';
    form.quadra.value = agendamento.quadra || '';
    form.data.value = agendamento.data || '';
    form.horario.value = agendamento.horario || '';
    form.jogadores.value = agendamento.jogadores || 10;
    form.horas.value = agendamento.horas || 1;

    if (form['tipo-reserva']) {
      form['tipo-reserva'].value = agendamento.tipoReserva || 'avulso';
    }

    // checkboxes de servicos
    form.querySelectorAll('input[name="servicos"]').forEach(cb => {
      cb.checked = Array.isArray(agendamento.servicos) && agendamento.servicos.includes(cb.value);
    });

    if (form.observacoes) {
      form.observacoes.value = agendamento.observacoes || '';
    }

    // altera texto do botao e exibe botao de cancelar edicao
    btnSubmeter.textContent = 'Salvar alterações';
    if (btnCancelarEdicao) btnCancelarEdicao.style.display = 'inline-block';

    // rola a tela ate o formulario
    form.scrollIntoView({ behavior: 'smooth' });
  }

  // limpar estado de edicao
  function cancelarEdicao() {
    form.reset();
    inputId.value = '';
    btnSubmeter.textContent = 'Confirmar agendamento';
    if (btnCancelarEdicao) btnCancelarEdicao.style.display = 'none';
  }

  if (btnCancelarEdicao) {
    btnCancelarEdicao.addEventListener('click', cancelarEdicao);
  }

  // excluir agendamento
  async function excluirAgendamento(id) {
    const confirmar = confirm('Tem certeza que deseja cancelar este agendamento?');
    if (!confirmar) return;

    try {
      const resposta = await fetch(`/api/agendamentos/${id}`, {
        method: 'DELETE'
      });

      if (!resposta.ok) throw new Error('Erro ao excluir agendamento.');

      alert('Agendamento cancelado com sucesso.');
      if (inputId.value === String(id)) {
        cancelarEdicao();
      }
      carregarAgendamentos();
    } catch (erro) {
      console.error(erro);
      alert('Não foi possível cancelar o agendamento.');
    }
  }

  // carregamento inicial
  carregarAgendamentos();
});
