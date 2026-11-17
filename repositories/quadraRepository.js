const prisma = require('../prisma/client');
const { seedQuadras } = require('../prisma/seed');

const quadraRepository = {
  async listAll() {
    let quadras = await prisma.quadra.findMany({
      orderBy: { id: 'asc' }
    });

    // popula as quadras iniciais caso o banco esteja vazio
    if (quadras.length === 0) {
      await seedQuadras();
      quadras = await prisma.quadra.findMany({
        orderBy: { id: 'asc' }
      });
    }

    return quadras;
  },

  async findById(id) {
    return await prisma.quadra.findUnique({
      where: { id: Number(id) }
    });
  }
};

module.exports = quadraRepository;
