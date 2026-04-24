require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateRhythmContent() {
  const lesson = await prisma.lesson.findFirst({
    where: { title: '节奏与节拍' }
  });

  if (!lesson) {
    console.log('未找到"节奏与节拍"课程');
    await prisma.$disconnect();
    return;
  }

  const content = [
    {
      title: '🥁 节拍是什么？',
      body: `
        <div class="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-xl mb-4">
          <h3 className="text-xl font-bold text-red-800 mb-3">感受音乐的"心跳"</h3>
          <p class="text-gray-700 mb-4">
            节拍是音乐中有规律的<span class="font-bold text-red-600">时间单位</span>。
            就像我们的心跳有规律的跳动一样，音乐也有规律的节拍。
            节拍让音乐有了"脉搏"，让我们可以跟着音乐打拍子、跳舞或演奏。
          </p>
          <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 class="font-bold text-gray-800 mb-3">💡 生活中的节拍</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-2xl">💓</span>
                <span>心跳：每分钟60-100次</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">🚶</span>
                <span>走路：一步一拍</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">🕐</span>
                <span>钟表：滴答滴答</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">🚂</span>
                <span>火车：咔嗒咔嗒</span>
              </div>
            </div>
          </div>
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p class="text-sm text-gray-700">
              <span class="font-bold">🎯 练习：</span>
              试着拍手，第一拍重一些，后面三拍轻一些：
              <span class="font-bold text-red-600">强</span>-弱-弱-弱
            </p>
          </div>
        </div>
        <RhythmMetronome />
      `
    },
    {
      title: '🎵 认识节拍符号',
      body: `
        <div class="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl mb-4">
          <h3 class="text-xl font-bold text-blue-800 mb-3">拍号大揭秘</h3>
          <p class="text-gray-700 mb-4">
            拍号看起来像一个分数，比如 <span class="font-bold text-2xl text-blue-600">4/4</span>。
            上面的数字表示每小节有几拍，下面的数字表示以什么音符为一拍。
          </p>
          <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 class="font-bold text-gray-800 mb-3">常见拍号</h4>
            <div class="space-y-3">
              <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span class="text-3xl font-bold text-blue-600 w-16">4/4</span>
                <div>
                  <p class="font-medium">四四拍（常用拍）</p>
                  <p class="text-sm text-gray-600">每小节4拍，四分音符为一拍</p>
                  <p class="text-sm text-amber-600">强-弱-次强-弱</p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span class="text-3xl font-bold text-blue-600 w-16">3/4</span>
                <div>
                  <p class="font-medium">三四拍（华尔兹）</p>
                  <p class="text-sm text-gray-600">每小节3拍，四分音符为一拍</p>
                  <p class="text-sm text-amber-600">强-弱-弱</p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span class="text-3xl font-bold text-blue-600 w-16">2/4</span>
                <div>
                  <p class="font-medium">二四拍（进行曲）</p>
                  <p class="text-sm text-gray-600">每小节2拍，四分音符为一拍</p>
                  <p class="text-sm text-amber-600">强-弱</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <p class="text-sm text-gray-700">
              <span class="font-bold">🎼 记忆口诀：</span>
              "上拍下值"——上面是每小节的拍数，下面是音符的时值。
            </p>
          </div>
        </div>
        <RhythmMetronome />
      `
    },
    {
      title: '🎮 节奏模仿挑战',
      body: `
        <div class="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl mb-4">
          <h3 class="text-xl font-bold text-purple-800 mb-3">测试你的节奏感</h3>
          <p class="text-gray-700 mb-4">
            好的节奏感是学习音乐的基础。现在来玩一个节奏模仿游戏，
            听听电脑播放的节奏，然后跟着模仿！
          </p>
          <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 class="font-bold text-gray-800 mb-2">游戏规则</h4>
            <ol class="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>点击"开始游戏"听节奏</li>
              <li>仔细记住强弱拍的变化</li>
              <li>节奏播放完后，用按钮模仿</li>
              <li>💪 代表强拍，👆 代表弱拍</li>
              <li>答对得分，挑战更高分！</li>
            </ol>
          </div>
        </div>
        <RhythmTapGame />
        <div class="mt-6 p-4 bg-green-100 rounded-lg">
          <h4 class="font-bold text-green-800 mb-2">🎉 恭喜完成本课程！</h4>
          <p class="text-gray-700">
            你已经学会了节拍的基本概念和常见拍号。节奏感需要多加练习，
            平时可以多听音乐，跟着打拍子哦！
          </p>
        </div>
      `
    }
  ];

  await prisma.lesson.update({
    where: { id: lesson.id },
    data: { content }
  });

  console.log(`✅ 已更新"${lesson.title}"课程，共 ${content.length} 节`);
  content.forEach((section, idx) => {
    console.log(`  ${idx + 1}. ${section.title}`);
  });

  await prisma.$disconnect();
}

updateRhythmContent().catch(console.error);
