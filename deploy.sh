#!/bin/bash
# Vercel 部署后执行脚本

echo "=== 拉取环境变量 ==="
vercel env pull .env.production.local

echo "=== 执行数据库迁移 ==="
npx prisma migrate deploy

echo "=== 填充种子数据 ==="
npx prisma db seed

echo "=== 完成 ==="
echo "请访问: https://ai-meme-king.vercel.app"
