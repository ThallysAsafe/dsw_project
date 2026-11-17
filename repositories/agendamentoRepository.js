const prisma = require('../prisma/client');

const agendamentoRepository = {
  async listAll() {
    return await prisma.agendamento.findMany({
      include: { quadra: true },
      orderBy: { id: 'desc' }
    });
  },

  async findById(id) {
    return await prisma.agendamento.findUnique({
      where: { id: Number(id) },
      include: { quadra: true }
    });
  },

  async create(data) {
    return await prisma.agendamento.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone || null,
        quadraId: Number(data.quadraId),
        data: data.data,
        horarios: Array.isArray(data.horarios) ? data.horarios : []
      },
      include: { quadra: true }
    });
  },

  async update(id, data) {
    return await prisma.agendamento.update({
      where: { id: Number(id) },
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone || null,
        quadraId: Number(data.quadraId),
        data: data.data,
        horarios: Array.isArray(data.horarios) ? data.horarios : []
      },
      include: { quadra: true }
    });
  },

  async delete(id) {
    return await prisma.agendamento.delete({
      where: { id: Number(id) }
    });
  }
};

module.exports = agendamentoRepository;
