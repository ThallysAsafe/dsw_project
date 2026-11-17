const prisma = require('./client');

const quadrasIniciais = [
  {
    nome: 'Arena Jatiúca',
    modalidade: 'Futebol society',
    endereco: 'Rua Deputado José Lages, 210 · Jatiúca',
    descricao: 'Grama sintética nova, vestiário com chuveiro quente e estacionamento gratuito para até 20 carros.',
    precoHora: 120
  },
  {
    nome: 'Arena Ponta Verde',
    modalidade: 'Vôlei de praia',
    endereco: 'Avenida Álvaro Otacílio, 1500 · Ponta Verde',
    descricao: 'Quadra de areia fina à beira-mar, com rede oficial regulável e iluminação para jogos até as 22h.',
    precoHora: 80
  },
  {
    nome: 'Beach Club Pajuçara',
    modalidade: 'Beach tennis',
    endereco: 'Rua Jangadeiros Alagoanos, 88 · Pajuçara',
    descricao: 'Duas quadras de areia compactada, com aluguel opcional de raquetes e bolinhas de beach tennis.',
    precoHora: 70
  },
  {
    nome: 'Ginásio Farol',
    modalidade: 'Basquete e futsal',
    endereco: 'Rua Cincinato Pinto, 305 · Farol',
    descricao: 'Quadra poliesportiva coberta com piso emborrachado, placar eletrônico e arquibancada para 120 pessoas.',
    precoHora: 95
  },
  {
    nome: 'Tennis Park Gruta',
    modalidade: 'Tênis',
    endereco: 'Avenida Menino Marcelo, 940 · Gruta de Lourdes',
    descricao: 'Quadra de saibro com manutenção diária, bancos cobertos e aulas avulsas com professor credenciado.',
    precoHora: 90
  },
  {
    nome: 'Praça Benedito Bentes',
    modalidade: 'Basquete 3x3',
    endereco: 'Conjunto Village Campestre · Benedito Bentes',
    descricao: 'Quadra aberta de basquete 3x3, com duas tabelas oficiais e bebedouro público ao lado do alambrado.',
    precoHora: 45
  }
];

async function seedQuadras() {
  const totalQuadras = await prisma.quadra.count();
  if (totalQuadras === 0) {
    await prisma.quadra.createMany({ data: quadrasIniciais });
  }
}

async function seed() {
  await seedQuadras();

  const totalAgendamentos = await prisma.agendamento.count();
  if (totalAgendamentos === 0) {
    const primeiraQuadra = await prisma.quadra.findFirst({ orderBy: { id: 'asc' } });
    if (primeiraQuadra) {
      await prisma.agendamento.create({
        data: {
          nome: 'Carlos Silva',
          email: 'carlos@email.com',
          telefone: '(82) 99999-1111',
          quadraId: primeiraQuadra.id,
          data: '2026-11-20',
          horarios: ['19:00', '20:00']
        }
      });
    }
  }

  console.log('dados iniciais inseridos com sucesso');
}

if (require.main === module) {
  seed()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
}

module.exports = { quadrasIniciais, seedQuadras, seed };
