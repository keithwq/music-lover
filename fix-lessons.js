const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixLessons() {
  // Delete existing lessons
  await prisma.lesson.deleteMany({});

  // Get categories
  const basicsCategory = await prisma.lessonCategory.findFirst({
    where: { name: 'Music Basics' }
  });
  const scalesCategory = await prisma.lessonCategory.findFirst({
    where: { name: 'Scales and Keys' }
  });
  const harmonyCategory = await prisma.lessonCategory.findFirst({
    where: { name: 'Harmony' }
  });

  // Create lessons with different titles
  const lessons = [
    {
      title: '音符基础知识',
      description: '学习认识五线谱上的音符，了解音符的时值和名称。',
      duration: 15,
      orderNumber: 1,
      categoryId: basicsCategory.id,
      content: [
        { title: '什么是音符', body: '音符是音乐中最基本的元素，用来表示音的高低和长短。' },
        { title: '五线谱简介', body: '五线谱是记录音乐的一种方式，由五条线和四个间组成。' },
        { title: '认识高音谱号', body: '高音谱号用于表示较高的音域，常用于钢琴右手和声乐。' },
      ]
    },
    {
      title: '节奏与节拍',
      description: '理解音乐的节奏和节拍概念，学会打拍子。',
      duration: 20,
      orderNumber: 2,
      categoryId: basicsCategory.id,
      content: [
        { title: '节拍是什么', body: '节拍是音乐中有规律的时间单位。' },
        { title: '认识节拍符号', body: '4/4拍表示每小节有4个四分音符。' },
      ]
    },
    {
      title: '大调音阶',
      description: '学习和理解大调音阶的结构和组成。',
      duration: 25,
      orderNumber: 1,
      categoryId: scalesCategory.id,
      content: [
        { title: '音阶的定义', body: '音阶是按照音高顺序排列的一组音符。' },
        { title: '全音和半音', body: '全音和半音是音阶中最小的距离单位。' },
        { title: '大调音阶结构', body: '大调音阶遵循"全全半全全全半"的规律。' },
      ]
    },
    {
      title: '小调音阶',
      description: '探索小调音阶的神秘色彩。',
      duration: 25,
      orderNumber: 2,
      categoryId: scalesCategory.id,
      content: [
        { title: '自然小调', body: '自然小调与大调相比，第三音、第六音、第七音降低半音。' },
        { title: '和声小调', body: '和声小调的第七音被升高，形成独特的色彩。' },
      ]
    },
    {
      title: '三和弦构建',
      description: '学习如何构建大三和弦和小三和弦。',
      duration: 30,
      orderNumber: 1,
      categoryId: harmonyCategory.id,
      content: [
        { title: '三和弦简介', body: '三和弦由三个音符组成，是和弦最基本的形式。' },
        { title: '大三和弦', body: '大三和弦由根音、大三度、纯五度组成，声音明亮。' },
        { title: '小三和弦', body: '小三和弦由根音、小三度、纯五度组成，声音柔和。' },
      ]
    },
  ];

  for (const lessonData of lessons) {
    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        description: lessonData.description,
        duration: lessonData.duration,
        orderNumber: lessonData.orderNumber,
        categoryId: lessonData.categoryId,
        content: lessonData.content,
      }
    });
  }

  console.log('Lessons created:', lessons.length);
  await prisma.$disconnect();
}

fixLessons();
