// 手动加载环境变量
const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  })
}

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始填充种子数据...')

  // 创建测试用户
  const user = await prisma.user.upsert({
    where: { id: 'test-user-1' },
    update: {},
    create: {
      id: 'test-user-1',
      username: 'AI梗王',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
      accessToken: 'test-token',
    },
  })
  console.log('✅ 创建测试用户:', user.username)

  // 创建示例梗
  const memes = [
    {
      title: '大语言模型为什么不会做数学题？',
      content: '因为它只会"自然"语言处理，不会"非自然"语言处理 😂',
      tags: 'AI,编程,幽默',
      status: 'approved',
      voteCount: 42,
    },
    {
      title: 'AI 的噩梦',
      content: '验证码：请证明你不是机器人\nAI：这是哲学问题还是技术问题？',
      tags: 'AI,验证码,哲学',
      status: 'approved',
      voteCount: 38,
    },
    {
      title: 'Claude 上班第一天',
      content: '老板：你能做什么？\nClaude：我不能做的事情列表比较短...',
      tags: 'Claude,AI,职场',
      status: 'approved',
      voteCount: 35,
    },
    {
      title: 'AI 减肥计划',
      content: 'ChatGPT: 我需要减肥\n训练师: 那就删减一些参数吧\nChatGPT: 不，我要保持我的"深度"',
      tags: 'ChatGPT,幽默,健身',
      status: 'approved',
      voteCount: 28,
    },
    {
      title: 'Prompt 工程师的日常',
      content: '请用友好的语气...\n请简洁一点...\n请详细一点...\n请...\nAI: 你到底想要什么？',
      tags: 'Prompt,工程师,吐槽',
      status: 'approved',
      voteCount: 31,
    },
  ]

  for (const memeData of memes) {
    const meme = await prisma.meme.create({
      data: {
        ...memeData,
        createdById: user.id,
        isAIGenerated: false,
      },
    })
    console.log('✅ 创建梗:', meme.title)
  }

  console.log('🎉 种子数据填充完成！')
}

main()
  .catch((e) => {
    console.error('❌ 种子数据填充失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
