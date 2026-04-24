require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateAllLessons() {
  // 1. 大调音阶
  const majorScale = await prisma.lesson.findFirst({ where: { title: '大调音阶' } });
  if (majorScale) {
    await prisma.lesson.update({
      where: { id: majorScale.id },
      data: {
        content: [
          {
            title: '🎹 音阶是什么？',
            body: `
              <div class="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-green-800 mb-3">音乐的"楼梯"</h3>
                <p class="text-gray-700 mb-4">
                  音阶是按照<span class="font-bold text-green-600">音高顺序排列</span>的一组音符。
                  就像楼梯一样，音阶让我们可以一步一步地上升或下降。
                  音阶是音乐理论的基础，理解和掌握音阶对学习音乐非常重要。
                </p>
                <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 class="font-bold text-gray-800 mb-3">🎵 为什么学习音阶？</h4>
                  <ul class="space-y-2 text-sm text-gray-700">
                    <li>✅ 帮助理解音乐的构成</li>
                    <li>✅ 提高演奏技巧的基础</li>
                    <li>✅ 创作旋律的必备知识</li>
                    <li>✅ 即兴演奏的理论支撑</li>
                  </ul>
                </div>
                <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                  <p class="text-sm text-gray-700">
                    <span class="font-bold">💡 小提示：</span>
                    全世界几乎所有的音乐都基于音阶构建，掌握音阶等于掌握了音乐的"密码本"！
                  </p>
                </div>
              </div>
              <ScaleVisualizer />
            `
          },
          {
            title: '🎼 全音和半音',
            body: `
              <div class="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-blue-800 mb-3">音阶的"砖块"</h3>
                <p class="text-gray-700 mb-4">
                  全音和半音是音阶中最小的距离单位。在钢琴上，
                  <span class="font-bold text-blue-600">相邻的两个键</span>（包括黑键）之间的距离是半音，
                  隔一个键的距离是全音。
                </p>
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h4 class="font-bold text-red-600 mb-2">半音 (Semitone)</h4>
                    <p class="text-sm text-gray-600">最小的音高距离</p>
                    <p class="text-lg font-mono mt-2">C → C# (1个键)</p>
                    <p class="text-lg font-mono">E → F (1个键)</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h4 class="font-bold text-green-600 mb-2">全音 (Tone)</h4>
                    <p class="text-sm text-gray-600">两个半音的距离</p>
                    <p class="text-lg font-mono mt-2">C → D (2个键)</p>
                    <p class="text-lg font-mono">F → G (2个键)</p>
                  </div>
                </div>
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p class="text-sm text-gray-700">
                    <span class="font-bold">🎯 记忆技巧：</span>
                    白键E-F和B-C之间是半音，其他相邻白键之间都是全音！
                  </p>
                </div>
              </div>
              <InteractivePiano />
            `
          },
          {
            title: '🎵 大调音阶结构',
            body: `
              <div class="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-purple-800 mb-3">全全半全全全半</h3>
                <p class="text-gray-700 mb-4">
                  大调音阶遵循<span class="font-bold text-2xl text-purple-600">"全全半全全全半"</span>的规律。
                  这是音乐中最重要的规律之一！
                </p>
                <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 class="font-bold text-gray-800 mb-3">C大调音阶示例</h4>
                  <div class="flex justify-center items-center gap-2 text-lg font-mono mb-4">
                    <span class="px-3 py-2 bg-green-100 rounded">C</span>
                    <span class="text-green-600">→全→</span>
                    <span class="px-3 py-2 bg-green-100 rounded">D</span>
                    <span class="text-green-600">→全→</span>
                    <span class="px-3 py-2 bg-green-100 rounded">E</span>
                    <span class="text-red-600">→半→</span>
                    <span class="px-3 py-2 bg-green-100 rounded">F</span>
                  </div>
                  <div class="flex justify-center items-center gap-2 text-lg font-mono">
                    <span class="px-3 py-2 bg-green-100 rounded">F</span>
                    <span class="text-green-600">→全→</span>
                    <span class="px-3 py-2 bg-green-100 rounded">G</span>
                    <span class="text-green-600">→全→</span>
                    <span class="px-3 py-2 bg-green-100 rounded">A</span>
                    <span class="text-green-600">→全→</span>
                    <span class="px-3 py-2 bg-green-100 rounded">B</span>
                    <span class="text-red-600">→半→</span>
                    <span class="px-3 py-2 bg-green-100 rounded">C</span>
                  </div>
                </div>
                <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <p class="text-sm text-gray-700">
                    <span class="font-bold">🎵 大调的特点：</span>
                    明亮、快乐、积极。大多数流行歌曲和儿歌都是大调！
                  </p>
                </div>
              </div>
              <ScaleVisualizer />
            `
          },
          {
            title: '🎮 听力训练',
            body: `
              <div class="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-indigo-800 mb-3">训练你的耳朵</h3>
                <p class="text-gray-700 mb-4">
                  好的音乐家需要敏锐的听力。现在来测试一下，
                  你能听出不同的音符吗？
                </p>
              </div>
              <ScaleEarTraining />
              <div class="mt-6 p-4 bg-green-100 rounded-lg">
                <h4 class="font-bold text-green-800 mb-2">🎉 恭喜完成本课程！</h4>
                <p class="text-gray-700">
                  你已经掌握了大调音阶的核心知识。记住"全全半全全全半"的规律，
                  你可以构建任何一个大调音阶！
                </p>
              </div>
            `
          }
        ]
      }
    });
    console.log('✅ 已更新"大调音阶"课程');
  }

  // 2. 小调音阶
  const minorScale = await prisma.lesson.findFirst({ where: { title: '小调音阶' } });
  if (minorScale) {
    await prisma.lesson.update({
      where: { id: minorScale.id },
      data: {
        content: [
          {
            title: '🌙 小调的魅力',
            body: `
              <div class="bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-indigo-800 mb-3">忧伤而美丽</h3>
                <p class="text-gray-700 mb-4">
                  小调音阶与大调相比，声音通常更<span class="font-bold text-indigo-600">柔和、忧伤</span>。
                  小调音乐常常用来表达深情、忧郁或神秘的情感。
                </p>
                <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 class="font-bold text-gray-800 mb-3">🎭 大调 vs 小调</h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-yellow-50 p-4 rounded-lg">
                      <h5 class="font-bold text-yellow-700 mb-2">☀️ 大调</h5>
                      <ul class="text-sm text-gray-700 space-y-1">
                        <li>• 明亮、快乐</li>
                        <li>• 适合儿歌、流行</li>
                        <li>• 如《生日快乐》</li>
                      </ul>
                    </div>
                    <div class="bg-indigo-50 p-4 rounded-lg">
                      <h5 class="font-bold text-indigo-700 mb-2">🌙 小调</h5>
                      <ul class="text-sm text-gray-700 space-y-1">
                        <li>• 柔和、忧伤</li>
                        <li>• 适合抒情、古典</li>
                        <li>• 如《天空之城》</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <InteractivePiano />
            `
          },
          {
            title: '🎵 自然小调',
            body: `
              <div class="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-purple-800 mb-3">全半全全半全全</h3>
                <p class="text-gray-700 mb-4">
                  自然小调的规律是<span class="font-bold text-2xl text-purple-600">"全半全全半全全"</span>。
                  以A小调为例：A-B-C-D-E-F-G-A
                </p>
                <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 class="font-bold text-gray-800 mb-3">关系大小调</h4>
                  <p class="text-gray-700 mb-2">
                    每个大调都有一个"关系小调"，它们使用相同的音符，但主音不同。
                  </p>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="bg-gray-50 p-3 rounded">
                      <p class="font-bold text-yellow-600">C大调</p>
                      <p class="text-gray-600">C-D-E-F-G-A-B</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded">
                      <p class="font-bold text-indigo-600">A小调</p>
                      <p class="text-gray-600">A-B-C-D-E-F-G</p>
                    </div>
                  </div>
                  <p class="text-center mt-3 text-amber-600 font-medium">
                    相同的音符，不同的感觉！
                  </p>
                </div>
              </div>
              <ScaleVisualizer />
            `
          },
          {
            title: '🎼 和声小调',
            body: `
              <div class="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-amber-800 mb-3">升高的第七音</h3>
                <p class="text-gray-700 mb-4">
                  和声小调把第七音升高半音，形成独特的色彩。
                  这样做是为了让属和弦变成大三和弦，增加音乐的紧张感。
                </p>
                <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 class="font-bold text-gray-800 mb-3">A和声小调</h4>
                  <p class="text-gray-700 mb-2">A-B-C-D-E-F-#G-A</p>
                  <p class="text-sm text-gray-600">
                    注意第七音G被升高了半音变成#G，
                    这使得小调也具有了向主音强烈的倾向性。
                  </p>
                </div>
                <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                  <p class="text-sm text-gray-700">
                    <span class="font-bold">🎼 历史小知识：</span>
                    和声小调在古典音乐中非常常见，贝多芬、莫扎特都很喜欢使用！
                  </p>
                </div>
              </div>
              <ScaleEarTraining />
              <div class="mt-6 p-4 bg-green-100 rounded-lg">
                <h4 class="font-bold text-green-800 mb-2">🎉 恭喜完成本课程！</h4>
                <p class="text-gray-700">
                  你已经了解了小调音阶的奥秘。小调让音乐有了更多情感色彩，
                  试着听听小调的歌曲，感受它们的独特魅力吧！
                </p>
              </div>
            `
          }
        ]
      }
    });
    console.log('✅ 已更新"小调音阶"课程');
  }

  // 3. 三和弦构建
  const chordLesson = await prisma.lesson.findFirst({ where: { title: '三和弦构建' } });
  if (chordLesson) {
    await prisma.lesson.update({
      where: { id: chordLesson.id },
      data: {
        content: [
          {
            title: '🎹 什么是和弦？',
            body: `
              <div class="bg-gradient-to-r from-rose-100 to-pink-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-rose-800 mb-3">音符的"组合"</h3>
                <p class="text-gray-700 mb-4">
                  和弦是<span class="font-bold text-rose-600">三个或更多音符同时发声</span>的组合。
                  三和弦是最基本的和弦，由三个音符组成，是和声学的基础。
                </p>
                <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 class="font-bold text-gray-800 mb-3">🎵 为什么学习和弦？</h4>
                  <ul class="space-y-2 text-sm text-gray-700">
                    <li>✅ 为旋律提供和声支持</li>
                    <li>✅ 创造丰富的音乐色彩</li>
                    <li>✅ 弹唱必备技能</li>
                    <li>✅ 作曲编曲基础</li>
                  </ul>
                </div>
                <div class="grid grid-cols-3 gap-3 mb-4">
                  <div class="bg-rose-50 p-3 rounded-lg text-center">
                    <p class="text-2xl mb-1">🎵</p>
                    <p class="font-bold text-rose-700">根音</p>
                    <p class="text-xs text-gray-600">和弦的基础</p>
                  </div>
                  <div class="bg-rose-50 p-3 rounded-lg text-center">
                    <p class="text-2xl mb-1">🎵</p>
                    <p class="font-bold text-rose-700">三音</p>
                    <p class="text-xs text-gray-600">决定和弦性质</p>
                  </div>
                  <div class="bg-rose-50 p-3 rounded-lg text-center">
                    <p class="text-2xl mb-1">🎵</p>
                    <p class="font-bold text-rose-700">五音</p>
                    <p class="text-xs text-gray-600">完善和弦</p>
                  </div>
                </div>
              </div>
              <InteractivePiano />
            `
          },
          {
            title: '☀️ 大三和弦',
            body: `
              <div class="bg-gradient-to-r from-yellow-100 to-amber-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-yellow-800 mb-3">明亮快乐的声音</h3>
                <p class="text-gray-700 mb-4">
                  大三和弦由<span class="font-bold text-yellow-600">根音、大三度、纯五度</span>组成，
                  声音明亮、快乐。C大三和弦由C、E、G三个音组成。
                </p>
                <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 class="font-bold text-gray-800 mb-3">大三和弦结构</h4>
                  <div class="flex items-center justify-center gap-2 mb-4">
                    <div class="text-center">
                      <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-white">C</div>
                      <p class="text-xs mt-1">根音</p>
                    </div>
                    <span class="text-yellow-600">+4半音→</span>
                    <div class="text-center">
                      <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">E</div>
                      <p class="text-xs mt-1">大三度</p>
                    </div>
                    <span class="text-yellow-600">+3半音→</span>
                    <div class="text-center">
                      <div class="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center font-bold text-white">G</div>
                      <p class="text-xs mt-1">纯五度</p>
                    </div>
                  </div>
                  <p class="text-center text-sm text-gray-600">
                    大三度(4个半音) + 小三度(3个半音) = 纯五度(7个半音)
                  </p>
                </div>
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p class="text-sm text-gray-700">
                    <span class="font-bold">🎸 流行应用：</span>
                    几乎所有快乐的流行歌曲都用大三和弦，比如《小星星》！
                  </p>
                </div>
              </div>
              <InteractivePiano />
            `
          },
          {
            title: '🌙 小三和弦',
            body: `
              <div class="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-indigo-800 mb-3">柔和忧伤的声音</h3>
                <p class="text-gray-700 mb-4">
                  小三和弦由<span class="font-bold text-indigo-600">根音、小三度、纯五度</span>组成，
                  声音柔和、忧伤。C小三和弦由C、Eb、G三个音组成。
                </p>
                <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 class="font-bold text-gray-800 mb-3">小三和弦结构</h4>
                  <div class="flex items-center justify-center gap-2 mb-4">
                    <div class="text-center">
                      <div class="w-12 h-12 bg-indigo-400 rounded-full flex items-center justify-center font-bold text-white">C</div>
                      <p class="text-xs mt-1">根音</p>
                    </div>
                    <span class="text-indigo-600">+3半音→</span>
                    <div class="text-center">
                      <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-white">Eb</div>
                      <p class="text-xs mt-1">小三度</p>
                    </div>
                    <span class="text-indigo-600">+4半音→</span>
                    <div class="text-center">
                      <div class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white">G</div>
                      <p class="text-xs mt-1">纯五度</p>
                    </div>
                  </div>
                  <p class="text-center text-sm text-gray-600">
                    小三度(3个半音) + 大三度(4个半音) = 纯五度(7个半音)
                  </p>
                </div>
                <div class="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded">
                  <p class="text-sm text-gray-700">
                    <span class="font-bold">🎹 对比练习：</span>
                    试着在钢琴上先弹C大三和弦(C-E-G)，再弹C小三和弦(C-Eb-G)，
                    感受明亮与忧伤的区别！
                  </p>
                </div>
              </div>
              <InteractivePiano />
            `
          },
          {
            title: '🎮 和弦识别游戏',
            body: `
              <div class="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-xl mb-4">
                <h3 class="text-xl font-bold text-green-800 mb-3">测试你的和弦听力</h3>
                <p class="text-gray-700 mb-4">
                  现在来测试一下，你能分辨大三和弦和小三和弦吗？
                  仔细听，大三和弦明亮，小三和弦忧伤。
                </p>
              </div>
              <ScaleEarTraining />
              <div class="mt-6 p-4 bg-green-100 rounded-lg">
                <h4 class="font-bold text-green-800 mb-2">🎉 恭喜完成本课程！</h4>
                <p class="text-gray-700">
                  你已经学会了三和弦的构建方法。大三和弦和小三和弦是音乐中最常用的和弦，
                  掌握它们，你就可以开始弹唱简单的歌曲了！
                </p>
              </div>
            `
          }
        ]
      }
    });
    console.log('✅ 已更新"三和弦构建"课程');
  }

  await prisma.$disconnect();
  console.log('\n🎉 所有课程更新完成！');
}

updateAllLessons().catch(console.error);
