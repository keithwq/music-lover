require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateNoteBasics() {
  // 查找"音符基础知识"课程
  const lesson = await prisma.lesson.findFirst({
    where: { title: '音符基础知识' }
  });

  if (!lesson) {
    console.log('未找到"音符基础知识"课程');
    await prisma.$disconnect();
    return;
  }

  const content = [
    {
      title: '🎵 欢迎来到音乐世界！',
      body: `
        <div class="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-xl mb-4">
          <h3 class="text-xl font-bold text-amber-800 mb-3">什么是音符？</h3>
          <p class="text-gray-700 mb-4">
            音符是音乐中最基本的元素，就像<span class="font-bold text-amber-600">文字是语言的基本单位</span>一样，
            音符是音乐的基本单位。我们用不同的符号来表示不同的音高和时值。
          </p>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <p class="text-sm text-gray-600 mb-2">💡 趣味小知识：</p>
            <p class="text-gray-700">
              你知道吗？最早的音符记录可以追溯到<span class="font-bold">公元9世纪</span>的修道院，
              修士们用简单的符号来记录圣歌的旋律！
            </p>
          </div>
        </div>
        <InteractivePiano />
      `
    },
    {
      title: '🎹 认识钢琴键盘',
      body: `
        <div class="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-xl mb-4">
          <h3 class="text-xl font-bold text-blue-800 mb-3">黑白键的秘密</h3>
          <p class="text-gray-700 mb-4">
            钢琴键盘由<span class="font-bold text-blue-600">白键</span>和<span class="font-bold text-gray-800">黑键</span>组成。
            白键代表自然音（Do, Re, Mi, Fa, Sol, La, Si），
            黑键代表升降音（Do#, Re#, Fa#, Sol#, La#）。
          </p>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h4 class="font-bold text-gray-800 mb-2">🎹 白键</h4>
              <p class="text-sm text-gray-600">代表自然音阶的7个音符</p>
              <p class="text-lg font-mono mt-2">C D E F G A B</p>
            </div>
            <div class="bg-gray-800 text-white p-4 rounded-lg shadow-sm">
              <h4 class="font-bold mb-2">🎹 黑键</h4>
              <p class="text-sm text-gray-300">代表升降音</p>
              <p class="text-lg font-mono mt-2">C# D# F# G# A#</p>
            </div>
          </div>
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p class="text-sm text-gray-700">
              <span class="font-bold">🎯 记忆技巧：</span>
              黑键总是两个一组、三个一组交替出现。
              两个黑键左边是<span class="font-bold text-red-600">Do</span>，
              三个黑键左边是<span class="font-bold text-red-600">Fa</span>！
            </p>
          </div>
        </div>
        <InteractivePiano />
      `
    },
    {
      title: '🎼 五线谱入门',
      body: `
        <div class="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl mb-4">
          <h3 class="text-xl font-bold text-purple-800 mb-3">五线谱是什么？</h3>
          <p class="text-gray-700 mb-4">
            五线谱是记录音乐的"纸张"，由<span class="font-bold text-purple-600">五条平行的横线</span>组成。
            从下往上数，分别是：第一线、第二线、第三线、第四线、第五线。
          </p>
          <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 class="font-bold text-gray-800 mb-3">📏 五线谱结构</h4>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <span class="w-8 h-0.5 bg-gray-400"></span>
                <span>第五线 - 最高音区</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-8 h-0.5 bg-gray-400"></span>
                <span>第四线</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-8 h-0.5 bg-gray-400"></span>
                <span>第三线</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-8 h-0.5 bg-gray-400"></span>
                <span>第二线</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-8 h-0.5 bg-gray-400"></span>
                <span>第一线 - 最低音区</span>
              </div>
            </div>
          </div>
          <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <p class="text-sm text-gray-700">
              <span class="font-bold">💡 小贴士：</span>
              线和间交替排列，就像楼梯一样，越往上音越高，越往下音越低！
            </p>
          </div>
        </div>
        <StaffVisualizer />
      `
    },
    {
      title: '🎵 高音谱号大揭秘',
      body: `
        <div class="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-xl mb-4">
          <h3 class="text-xl font-bold text-green-800 mb-3">认识高音谱号 𝄞</h3>
          <p class="text-gray-700 mb-4">
            高音谱号（Treble Clef）的形状像一个花体的"G"，
            它的中心围绕着<span class="font-bold text-green-600">第二线</span>，
            表示这条线是 <span class="font-bold">G音（Sol）</span>。
          </p>
          <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 class="font-bold text-gray-800 mb-3">🎯 高音谱号上的音符位置</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="font-bold text-gray-700 mb-2">在线上：</p>
                <ul class="space-y-1 text-gray-600">
                  <li>第一线 - E (Mi)</li>
                  <li>第二线 - G (Sol) ⭐</li>
                  <li>第三线 - B (Si)</li>
                  <li>第四线 - D (Re)</li>
                  <li>第五线 - F (Fa)</li>
                </ul>
              </div>
              <div>
                <p class="font-bold text-gray-700 mb-2">在间里：</p>
                <ul class="space-y-1 text-gray-600">
                  <li>第一间 - F (Fa)</li>
                  <li>第二间 - A (La)</li>
                  <li>第三间 - C (Do) ⭐</li>
                  <li>第四间 - E (Mi)</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
            <p class="text-sm text-gray-700">
              <span class="font-bold">🌟 中央C (Middle C)：</span>
              下加一线的C音是钢琴上最中间的C，也是高音谱号和低音谱号的分界点！
            </p>
          </div>
        </div>
        <StaffVisualizer />
      `
    },
    {
      title: '🎮 趣味练习时间！',
      body: `
        <div class="bg-gradient-to-r from-pink-100 to-rose-100 p-6 rounded-xl mb-4">
          <h3 class="text-xl font-bold text-pink-800 mb-3">巩固所学知识</h3>
          <p class="text-gray-700 mb-4">
            学习完音符基础知识，让我们来玩个小游戏巩固一下吧！
            点击卡片翻转，找到配对的音符和名称。
          </p>
        </div>
        <NoteMatchingGame />
        <div class="mt-6 p-4 bg-green-100 rounded-lg">
          <h4 class="font-bold text-green-800 mb-2">🎉 恭喜完成本课程！</h4>
          <p class="text-gray-700">
            你已经学会了音符的基础知识：什么是音符、钢琴键盘、五线谱和高音谱号。
            继续学习下一节课，探索更多音乐奥秘吧！
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

updateNoteBasics().catch(console.error);
