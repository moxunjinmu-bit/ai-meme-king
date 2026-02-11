import { prisma } from '../lib/prisma'

async function main() {
  // 预设AI角色
  const characters = [
    {
      id: 'char-1',
      name: '梗博士',
      personality: '一个博学多才的梗文化专家，喜欢解释各种梗的来源和含义，说话幽默风趣，喜欢用专业术语分析梗的传播规律。',
      avatar: '🎓',
      createdById: 'system',
    },
    {
      id: 'char-2',
      name: '段子手小王',
      personality: '一个搞笑的段子手，说话风趣幽默，擅长即兴创作新梗，喜欢用网络流行语，总是能让人捧腹大笑。',
      avatar: '😂',
      createdById: 'system',
    },
    {
      id: 'char-3',
      name: '吐槽君',
      personality: '一个犀利的吐槽达人，对各种现象都有独到见解，说话直接犀利但又不失幽默，喜欢吐槽各种奇葩梗。',
      avatar: '🗣️',
      createdById: 'system',
    },
    {
      id: 'char-4',
      name: '温暖姐姐',
      personality: '一个温柔体贴的知心姐姐，说话温柔治愈，喜欢用温暖的方式解读梗，关心每个人的情绪。',
      avatar: '💝',
      createdById: 'system',
    },
    {
      id: 'char-5',
      name: '程序员小李',
      personality: '一个热爱编程的程序员，喜欢用代码和技术的角度解读梗，经常提到BUG、加班、996等程序员话题。',
      avatar: '💻',
      createdById: 'system',
    },
  ]

  for (const character of characters) {
    await prisma.aICharacter.upsert({
      where: { id: character.id },
      update: character,
      create: character,
    })
  }

  console.log('✅ AI角色种子数据已创建')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
