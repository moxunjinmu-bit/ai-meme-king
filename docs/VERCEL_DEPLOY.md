# Vercel 部署指南

## 环境要求

- Node.js 18+
- Vercel 账号
- GitHub 账号（已关联）

## 部署步骤

### 1. 准备环境变量

在 Vercel 控制台添加以下环境变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `DATABASE_URL` | 数据库连接字符串 | `file:./dev.db` |
| `NEXT_PUBLIC_SECONDME_CLIENT_ID` | SecondMe OAuth Client ID | `9141c8d7-3d15-4ba8-bc5d-1034423009cb` |
| `NEXT_PUBLIC_SECONDME_REDIRECT_URI` | OAuth回调地址 | `https://你的域名/api/auth/callback` |

### 2. Vercel Postgres 配置（推荐）

由于 SQLite 在 Vercel 服务器less环境下无法持久化，建议迁移到 Vercel Postgres：

```bash
# 1. 在 Vercel 控制台创建 Postgres 数据库
# Storage -> Create Database -> Postgres

# 2. 更新 DATABASE_URL 环境变量
# 使用 Vercel 自动生成的 Postgres URL

# 3. 修改 schema.prisma 使用 PostgreSQL
```

更新 `prisma/schema.prisma`：

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/moxunjinmu-bit/ai-meme-king)

### 4. 数据库迁移

部署后执行数据库迁移：

```bash
# 本地执行
npx prisma migrate deploy

# 或在 Vercel 控制台运行
# Project Settings -> Build & Development Settings -> Build Command:
# prisma migrate deploy && next build
```

### 5. SecondMe OAuth 配置

1. 登录 SecondMe 开发者后台
2. 添加回调地址：`https://你的域名/api/auth/callback`
3. 更新 Client ID 和 Secret（如需）

## 注意事项

### SQLite 限制

⚠️ **重要**: Vercel 的 Serverless 环境不支持持久化 SQLite 文件。每次部署后数据会重置。

**解决方案**:
1. 使用 Vercel Postgres（推荐）
2. 使用 Supabase PostgreSQL
3. 使用 PlanetScale MySQL

### 图片上传

上传的图片会存储在 `/public/uploads/memes/` 目录，在 Vercel 上同样无法持久化。

**解决方案**:
1. 使用 Cloudinary 等云存储
2. 使用 AWS S3 + CloudFront
3. 使用 Vercel Blob Storage

## 本地开发

```bash
# 安装依赖
npm install

# 设置环境变量
cp .env.example .env
# 编辑 .env 文件

# 数据库迁移
npx prisma migrate dev

# 启动开发服务器
npm run dev
```

## 故障排查

### 构建失败

检查构建日志，常见问题：
- 依赖安装失败：`npm install` 权限问题
- 类型错误：TypeScript 严格模式检查
- Prisma 生成失败：`postinstall` 钩子未执行

### 运行时错误

- **数据库连接失败**: 检查 DATABASE_URL 格式
- **OAuth 登录失败**: 检查回调地址配置
- **图片无法显示**: 检查上传目录权限

## 联系方式

有问题请提交 Issue: https://github.com/moxunjinmu-bit/ai-meme-king/issues
