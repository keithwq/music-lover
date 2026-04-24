const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLessonContent() {
  const lessons = await prisma.lesson.findMany();
  
  for (const lesson of lessons) {
    let content = [];
    
    if (lesson.title === '音符基础知识') {
      content = [
        { 
          title: '什么是音符', 
          body: '<p>音符是音乐中最基本的元素，用来表示音的高低和长短。就像文字是语言的基本单位一样，音符是音乐的基本单位。</p><p>在音乐中，我们用不同的符号来表示不同的音高和时值。这些符号组合在一起，就形成了美妙的旋律。</p>' 
        },
        { 
          title: '五线谱简介', 
          body: '<p>五线谱是记录音乐的一种方式，由五条平行的横线和四个间组成。从下往上数，分别是第一线、第二线、第三线、第四线、第五线。</p><p>音符可以放在线上，也可以放在间里。线的位置和间的高低决定了音的高低。</p>' 
        },
        { 
          title: '认识高音谱号', 
          body: '<p>高音谱号用于表示较高的音域，常用于钢琴右手和声乐。高音谱号的形状像一个花体的"G"，它的中心围绕着第二线，表示这条线是G音（sol）。</p><p>在高音谱号上，下加一线是中央C（do），这是钢琴上最中间的C音。</p>' 
        },
      ];
    } else if (lesson.title === '节奏与节拍') {
      content = [
        { 
          title: '节拍是什么', 
          body: '<p>节拍是音乐中有规律的时间单位。就像我们的心跳有规律的跳动一样，音乐也有规律的节拍。</p><p>节拍让音乐有了"脉搏"，让我们可以跟着音乐打拍子、跳舞或演奏。</p>' 
        },
        { 
          title: '认识节拍符号', 
          body: '<p>4/4拍表示每小节有4个四分音符。上面的数字表示每小节的拍数，下面的数字表示以什么音符为一拍。</p><p>常见的节拍还有3/4拍（华尔兹节拍）、2/4拍（进行曲节拍）等。</p>' 
        },
      ];
    } else if (lesson.title === '大调音阶') {
      content = [
        { 
          title: '音阶的定义', 
          body: '<p>音阶是按照音高顺序排列的一组音符。就像楼梯一样，音阶让我们可以一步一步地上升或下降。</p><p>音阶是音乐理论的基础，理解和掌握音阶对学习音乐非常重要。</p>' 
        },
        { 
          title: '全音和半音', 
          body: '<p>全音和半音是音阶中最小的距离单位。在钢琴上，相邻的两个键（包括黑键）之间的距离是半音，隔一个键的距离是全音。</p><p>C到C#是半音，C到D是全音。</p>' 
        },
        { 
          title: '大调音阶结构', 
          body: '<p>大调音阶遵循"全全半全全全半"的规律。以C大调为例：C-D-E-F-G-A-B-C。</p><p>C到D是全音，D到E是全音，E到F是半音，F到G是全音，G到A是全音，A到B是全音，B到C是半音。</p>' 
        },
      ];
    } else if (lesson.title === '小调音阶') {
      content = [
        { 
          title: '自然小调', 
          body: '<p>自然小调与大调相比，第三音、第六音、第七音降低半音。小调的声音通常比大调更柔和、更忧伤。</p><p>A小调是C大调的关系小调，它们使用相同的音，但主音不同。</p>' 
        },
        { 
          title: '和声小调', 
          body: '<p>和声小调的第七音被升高，形成独特的色彩。这样做是为了让属和弦变成大三和弦，增加音乐的紧张感。</p><p>和声小调在古典音乐中非常常见。</p>' 
        },
      ];
    } else if (lesson.title === '三和弦构建') {
      content = [
        { 
          title: '三和弦简介', 
          body: '<p>三和弦由三个音符组成，是和弦最基本的形式。这三个音分别称为根音、三音和五音。</p><p>三和弦是构建更复杂和弦的基础，几乎所有的流行音乐都使用三和弦。</p>' 
        },
        { 
          title: '大三和弦', 
          body: '<p>大三和弦由根音、大三度、纯五度组成，声音明亮、快乐。C大三和弦由C、E、G三个音组成。</p><p>大三度是指两个音之间相隔四个半音，纯五度是指相隔七个半音。</p>' 
        },
        { 
          title: '小三和弦', 
          body: '<p>小三和弦由根音、小三度、纯五度组成，声音柔和、忧伤。C小三和弦由C、Eb、G三个音组成。</p><p>小三度是指两个音之间相隔三个半音，比大三度少一个半音。</p>' 
        },
      ];
    }
    
    if (content.length > 0) {
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { content }
      });
      console.log(`Updated ${lesson.title} with ${content.length} sections`);
    }
  }
  
  await prisma.$disconnect();
}

updateLessonContent();
