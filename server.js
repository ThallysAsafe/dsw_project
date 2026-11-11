const express = require('express');
const path = require('path');

const agendamentoRepository = require('./repositories/agendamentoRepository');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'arena-hub')));

app.get('/api/agendamentos', async (req, res) => {
  try {
    const agendamentos = await agendamentoRepository.listAll();
    res.json(agendamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar agendamentos.' });
  }
});

app.post('/api/agendamentos', async (req, res) => {
  try {
    const novoAgendamento = await agendamentoRepository.create(req.body);
    res.status(201).json(novoAgendamento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar agendamento.' });
  }
});

app.put('/api/agendamentos/:id', async (req, res) => {
  try {
    const agendamentoAtualizado = await agendamentoRepository.update(req.params.id, req.body);
    res.json(agendamentoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar agendamento.' });
  }
});

app.delete('/api/agendamentos/:id', async (req, res) => {
  try {
    await agendamentoRepository.delete(req.params.id);
    res.json({ mensagem: 'Agendamento cancelado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cancelar agendamento.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
