const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static('arena-hub'));

const PAGAMENTOS = ['Pix', 'Cartão', 'Dinheiro'];

async function validar(dados, id) {
  if (!dados.nome || dados.nome.trim().length < 3) return 'Informe um nome com pelo menos 3 letras.';
  if (!dados.email || !dados.email.includes('@')) return 'Informe um e-mail válido.';
  if (!Number.isInteger(Number(dados.quadraId))) return 'Escolha uma quadra.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dados.data || '')) return 'Informe uma data válida.';
  if (!Array.isArray(dados.horarios) || dados.horarios.length === 0) return 'Escolha pelo menos um horário.';
  if (!Number.isInteger(dados.jogadores) || dados.jogadores < 2 || dados.jogadores > 22) return 'Informe de 2 a 22 jogadores.';
  if (!PAGAMENTOS.includes(dados.pagamento)) return 'Escolha a forma de pagamento.';

  const quadra = await prisma.quadra.findUnique({ where: { id: Number(dados.quadraId) } });
  if (!quadra) return 'Quadra inexistente.';

  const reservado = await prisma.agendamento.findFirst({
    where: {
      id: { not: id },
      quadraId: quadra.id,
      data: dados.data,
      horarios: { hasSome: dados.horarios }
    }
  });
  if (reservado) return 'Algum desses horários já está reservado para essa quadra nessa data.';

  return null;
}

function dadosAgendamento(dados) {
  return {
    nome: dados.nome.trim(),
    email: dados.email.trim(),
    telefone: dados.telefone || null,
    quadraId: Number(dados.quadraId),
    data: dados.data,
    horarios: dados.horarios,
    jogadores: dados.jogadores,
    pagamento: dados.pagamento,
    observacoes: dados.observacoes || null
  };
}

async function buscarAgendamento(id) {
  if (!Number.isInteger(id)) return null;
  return prisma.agendamento.findUnique({ where: { id } });
}

app.get('/api/quadras', async (req, res) => {
  res.json(await prisma.quadra.findMany({ orderBy: { id: 'asc' } }));
});

app.get('/api/agendamentos', async (req, res) => {
  res.json(await prisma.agendamento.findMany({ include: { quadra: true }, orderBy: { id: 'desc' } }));
});

app.post('/api/agendamentos', async (req, res) => {
  const erro = await validar(req.body);
  if (erro) return res.status(400).json({ mensagem: erro });

  const agendamento = await prisma.agendamento.create({ data: dadosAgendamento(req.body) });
  res.status(201).json(agendamento);
});

app.put('/api/agendamentos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existe = await buscarAgendamento(id);
  if (!existe) return res.status(404).json({ mensagem: 'Agendamento não encontrado.' });

  const erro = await validar(req.body, id);
  if (erro) return res.status(400).json({ mensagem: erro });

  const agendamento = await prisma.agendamento.update({ where: { id }, data: dadosAgendamento(req.body) });
  res.json(agendamento);
});

app.delete('/api/agendamentos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existe = await buscarAgendamento(id);
  if (!existe) return res.status(404).json({ mensagem: 'Agendamento não encontrado.' });

  await prisma.agendamento.delete({ where: { id } });
  res.status(204).end();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ mensagem: 'Erro interno no servidor.' });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
