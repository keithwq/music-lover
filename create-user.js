const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser() {
  const hashedPassword = await bcrypt.hash('nji', 10);

  // Delete existing user if exists
  await prisma.user.deleteMany({
    where: { email: 'nji@nji.com' }
  });

  const user = await prisma.user.create({
    data: {
      email: 'nji@nji.com',
      password: hashedPassword,
      name: 'nji',
    },
  });

  await prisma.userProfile.create({
    data: {
      userId: user.id,
    },
  });

  console.log('User created:', user.email, '- password: nji');
  await prisma.$disconnect();
}

createUser();
