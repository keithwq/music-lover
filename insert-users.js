require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function insertUsers() {
  const users = [
    { email: '1@nji.cn', password: '$2b$10$SeyKQYqcfd67GiW18yvAzuBvkQg/7SFU8yTTnTwbTSqWs2zcS0X.K', name: 'User 1' },
    { email: '2@nji.cn', password: '$2b$10$Yh6a5to4vSKVsw0ySGv6teBa9oZSf8JYVtPiAX0dOA7rxo3TteGZ6', name: 'User 2' }
  ];

  for (const user of users) {
    try {
      const existing = await prisma.user.findUnique({
        where: { email: user.email }
      });

      if (existing) {
        console.log(`User ${user.email} already exists`);
        continue;
      }

      await prisma.user.create({
        data: user
      });
      console.log(`Created user: ${user.email}`);
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error.message);
    }
  }

  await prisma.$disconnect();
}

insertUsers();
