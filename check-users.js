const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  const users = await prisma.user.findMany();
  console.log('Users in database:', users.length);
  users.forEach(u => {
    console.log(`- ${u.email} (password hash: ${u.password.substring(0, 20)}...)`);
  });
  await prisma.$disconnect();
}

checkUsers();
