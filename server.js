const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static('arena-hub'));

const PAGAMENTOS = ['Pix', 'Cartão', 'Dinheiro'];

function validar(d) {
  if (!d.nome || d.nome.trim().length < 3) return 'Informe um nome com pelo menos 3 letras.';
  if (!d.email || !d.email.includes('@')) return 'Informe um e-mail válido.';
  if (!Number.isInteger(Number(d.quadraId))) return 'Escolha uma quadra.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.data || '')) return 'Informe uma data válida.';
  if (!Array.isArray(d.horarios) || d.horarios.length === 0) return 'Escolha pelo menos um horário.';
  if (!Number.isInteger(d.jogadores) || d.jogadores < 2 || d.jogadores > 22) return 'Informe de 2 a 22 jogadores.';
  if (!PAGAMENTOS.includes(d.pagamento)) return 'Escolha a forma de pagamento.';
  return null;
}

function dadosAgendamento(d) {
  return {
    nome: d.nome.trim(),
    email: d.email.trim(),
    telefone: d.telefone || null,
    quadraId: Number(d.quadraId),
    data: d.data,
    horarios: d.horarios,
    jogadores: d.jogadores,
    pagamento: d.pagamento,
    observacoes: d.observacoes || null
  };
}

app.get('/api/quadras', async (req, res) => {
  res.json(await prisma.quadra.findMany({ orderBy: { id: 'asc' } }));
});

app.get('/api/agendamentos', async (req, res) => {
  res.json(await prisma.agendamento.findMany({ include: { quadra: true }, orderBy: { id: 'desc' } }));
});

app.post('/api/agendamentos', async (req, res) => {
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ mensagem: erro });
  const agendamento = await prisma.agendamento.create({ data: dadosAgendamento(req.body) });
  res.status(201).json(agendamento);
});

app.put('/api/agendamentos/:id', async (req, res) => {
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ mensagem: erro });
  const agendamento = await prisma.agendamento.update({
    where: { id: Number(req.params.id) },
    data: dadosAgendamento(req.body)
  });
  res.json(agendamento);
});

app.delete('/api/agendamentos/:id', async (req, res) => {
  await prisma.agendamento.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});

app.use((err, req, res, next) => {
  if (err.code === 'P2025') return res.status(404).json({ mensagem: 'Agendamento não encontrado.' });
  if (err.code === 'P2003') return res.status(400).json({ mensagem: 'Quadra inexistente.' });
  if (err.name === 'PrismaClientValidationError') return res.status(400).json({ mensagem: 'Dados inválidos.' });
  console.error(err);
  res.status(500).json({ mensagem: 'Erro interno no servidor.' });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
