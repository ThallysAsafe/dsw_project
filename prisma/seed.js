const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const quadras = [
  { nome: 'Arena Jatiúca', modalidade: 'Futebol society', endereco: 'Rua Deputado José Lages, 210 · Jatiúca', descricao: 'Grama sintética, vestiário e estacionamento gratuito.', precoHora: 120 },
  { nome: 'Arena Ponta Verde', modalidade: 'Vôlei de praia', endereco: 'Avenida Álvaro Otacílio, 1500 · Ponta Verde', descricao: 'Quadra de areia à beira-mar com iluminação até as 22h.', precoHora: 80 },
  { nome: 'Beach Club Pajuçara', modalidade: 'Beach tennis', endereco: 'Rua Jangadeiros Alagoanos, 88 · Pajuçara', descricao: 'Duas quadras de areia com aluguel de raquetes.', precoHora: 70 },
  { nome: 'Ginásio Farol', modalidade: 'Basquete e futsal', endereco: 'Rua Cincinato Pinto, 305 · Farol', descricao: 'Quadra coberta com piso emborrachado e placar eletrônico.', precoHora: 95 },
  { nome: 'Tennis Park Gruta', modalidade: 'Tênis', endereco: 'Avenida Menino Marcelo, 940 · Gruta de Lourdes', descricao: 'Quadra de saibro com manutenção diária.', precoHora: 90 },
  { nome: 'Praça Benedito Bentes', modalidade: 'Basquete 3x3', endereco: 'Conjunto Village Campestre · Benedito Bentes', descricao: 'Quadra aberta com duas tabelas oficiais.', precoHora: 45 }
];

async function seed() {
  if ((await prisma.quadra.count()) === 0) {
    await prisma.quadra.createMany({ data: quadras });
  }
  console.log('Quadras cadastradas.');
}

seed().finally(() => prisma.$disconnect());
