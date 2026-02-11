// 手动加载环境变量
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 读取 .env.local 文件
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

console.log('Running Prisma db push...')
console.log('DATABASE_URL:', process.env.DATABASE_URL)

try {
  execSync('npx prisma db push --accept-data-loss', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: process.env
  })
  console.log('Migration completed!')
} catch (error) {
  console.error('Migration failed:', error)
  process.exit(1)
}
