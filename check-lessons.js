require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lessons = await prisma.lesson.findMany();
  console.log('总共 ' + lessons.length + ' 门课程:\n');
  lessons.forEach((l, i) => {
    const content = l.content;
    const sectionCount = Array.isArray(content) ? content.length : 0;
    const hasContent = sectionCount > 0;
    console.log((i+1) + '. ' + l.title);
    console.log('   分类: ' + l.categoryId);
    console.log('   内容: ' + (hasContent ? sectionCount + ' 节' : '无内容'));
    if (hasContent) {
      content.forEach((section, idx) => {
        console.log('      ' + (idx+1) + ') ' + section.title);
      });
    }
    console.log('');
  });
  await prisma.$disconnect();
}

main();
