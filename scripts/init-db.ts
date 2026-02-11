import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

async function main() {
  console.log('Initializing database...')

  // 先执行迁移
  try {
    execSync('npx prisma db push --accept-data-loss', {
      stdio: 'inherit',
      cwd: process.cwd()
    })
  } catch (e) {
    console.error('Migration failed:', e)
  }

  // 测试连接
  try {
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Database connection successful:', result)
  } catch (e) {
    console.error('Database connection failed:', e)
  }

  await prisma.$disconnect()
}

main()
