const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePassword() {
  const hashedPassword = await bcrypt.hash('nji', 10);

  const user = await prisma.user.update({
    where: { email: 'admin@example.com' },
    data: { password: hashedPassword, name: 'nji' },
  });

  console.log('User updated:', user.email, '- new password: nji');
  await prisma.$disconnect();
}

updatePassword();
