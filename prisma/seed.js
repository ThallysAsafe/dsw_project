const prisma = require('./client');

const dadosIniciais = [
  {
    nome: "Carlos Silva",
    email: "carlos@email.com",
    telefone: "(82) 99999-1111",
    quadra: "arena-jatiuca",
    data: "2026-11-20",
    horario: "19:00",
    jogadores: 10,
    horas: 2,
    tipoReserva: "avulso",
    servicos: ["colete", "bola-oficial"],
    observacoes: "Levar coletes extras se possível."
  }
];

async function seed() {
  for (const item of dadosIniciais) {
    await prisma.agendamento.create({ data: item });
  }
  console.log('Dados iniciais inseridos com sucesso!');
}

if (require.main === module) {
  seed()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
}

module.exports = { dadosIniciais, seed };

