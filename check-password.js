const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkPassword() {
  const user = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  console.log('User found:', user.email);
  console.log('Password hash:', user.password);

  const isValid = await bcrypt.compare('123456', user.password);
  console.log('Password "123456" valid:', isValid);

  const isValid2 = await bcrypt.compare('test123', user.password);
  console.log('Password "test123" valid:', isValid2);

  await prisma.$disconnect();
}

checkPassword();
