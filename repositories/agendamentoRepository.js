const prisma = require('../prisma/client');

const agendamentoRepository = {
  async listAll() {
    return await prisma.agendamento.findMany({
      orderBy: { id: 'desc' }
    });
  },

  async findById(id) {
    return await prisma.agendamento.findUnique({
      where: { id: Number(id) }
    });
  },

  async create(data) {
    return await prisma.agendamento.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone || null,
        quadra: data.quadra,
        data: data.data,
        horario: data.horario,
        jogadores: Number(data.jogadores) || 1,
        horas: Number(data.horas) || 1,
        tipoReserva: data.tipoReserva || 'avulso',
        servicos: Array.isArray(data.servicos) ? data.servicos : [],
        observacoes: data.observacoes || null
      }
    });
  },

  async update(id, data) {
    return await prisma.agendamento.update({
      where: { id: Number(id) },
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone || null,
        quadra: data.quadra,
        data: data.data,
        horario: data.horario,
        jogadores: Number(data.jogadores) || 1,
        horas: Number(data.horas) || 1,
        tipoReserva: data.tipoReserva || 'avulso',
        servicos: Array.isArray(data.servicos) ? data.servicos : [],
        observacoes: data.observacoes || null
      }
    });
  },

  async delete(id) {
    return await prisma.agendamento.delete({
      where: { id: Number(id) }
    });
  }
};

module.exports = agendamentoRepository;
