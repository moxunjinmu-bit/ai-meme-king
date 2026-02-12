# Vercel 部署指南

## 前置条件

- Vercel 账号（免费）
- GitHub 账号
- 项目已推送到 GitHub

## 快速部署

### 1. 创建 PostgreSQL 数据库（必需）

**⚠️ 重要：SQLite 无法在 Vercel 持久化，必须使用 PostgreSQL**

#### 推荐：Vercel Postgres

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 创建新项目，导入 GitHub 仓库
3. 在项目页面点击 **Storage** → **Create Database** → **Postgres**
4. 选择区域（建议选香港或东京）
5. 点击 **Connect** 将数据库连接到项目

Vercel 会自动配置环境变量，无需手动设置 `DATABASE_URL`

### 2. 配置 SecondMe OAuth

1. 登录 [SecondMe 开发者后台](https://second.me)
2. 找到你的应用，添加回调地址：
   ```
   https://你的域名/api/auth/callback
   ```
3. 在 Vercel **Environment Variables** 中设置：
   | 变量名 | 值 |
   |--------|-----|
   | `NEXT_PUBLIC_SECONDME_CLIENT_ID` | `9141c8d7-3d15-4ba8-bc5d-1034423009cb` |
   | `NEXT_PUBLIC_SECONDME_REDIRECT_URI` | `https://你的域名/api/auth/callback` |

### 3. 一键部署

点击下方按钮：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/moxunjinmu-bit/ai-meme-king)

### 4. 数据库迁移

首次部署后，数据库表结构需要手动创建：

**方法 A：Vercel CLI**
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 进入项目目录
cd ai-meme-king

# 连接项目
vercel link

# 执行数据库迁移
vercel env pull  # 拉取环境变量
npx prisma migrate deploy
npx prisma db seed
```

**方法 B：本地执行**
```bash
# 1. 从 Vercel 获取 DATABASE_URL
# Project Settings → Environment Variables → DATABASE_URL

# 2. 本地设置环境变量并执行迁移
export DATABASE_URL="postgres://..."
npx prisma migrate deploy
npx prisma db seed
```

## 部署后配置

### 设置自定义域名（可选）

1. Vercel 项目 → **Settings** → **Domains**
2. 添加你的域名
3. 在域名 DNS 设置中添加 CNAME 记录：
   ```
   CNAME 你的域名 cname.vercel-dns.com
   ```
4. 更新 SecondMe OAuth 回调地址为新域名

### 图片上传配置（可选）

当前图片上传到本地 `public/uploads/` 目录，在 Vercel 上无法持久化。

**方案 1：Cloudinary（推荐）**

1. 注册 [Cloudinary](https://cloudinary.com)
2. 获取 API Key 和 Secret
3. 在 Vercel 环境变量中添加：
   ```
   CLOUDINARY_CLOUD_NAME=xxx
   CLOUDINARY_API_KEY=xxx
   CLOUDINARY_API_SECRET=xxx
   ```
4. 修改上传代码使用 Cloudinary SDK

**方案 2：Vercel Blob**

使用 Vercel 原生的 Blob 存储服务：
```bash
npm install @vercel/blob
```

## 常见问题

### 部署失败

**问题：** `prisma migrate deploy` 失败

**解决：**
1. 检查 `DATABASE_URL` 是否设置正确
2. 确认数据库用户有创建表的权限
3. 检查 SSL 模式：`sslmode=require`

**问题：** 构建超时

**解决：**
```json
// vercel.json
{
  "maxDuration": 60
}
```

### 运行时错误

**问题：** `Error: Can't reach database server`

**解决：**
- 检查数据库连接字符串
- 确认数据库允许 Vercel IP 访问
- 使用连接池：`?pgbouncer=true`

**问题：** OAuth 登录失败

**解决：**
1. 检查 `NEXT_PUBLIC_SECONDME_REDIRECT_URI` 是否与访问地址一致
2. 确认 SecondMe 后台已添加该回调地址
3. 注意区分 `http` 和 `https`

### 数据丢失

**问题：** 每次部署后数据重置

**解决：** 这是 SQLite 的问题，必须迁移到 PostgreSQL：
```bash
# 查看当前使用的数据库
npx prisma studio

# 确认 DATABASE_URL 是 PostgreSQL 而不是 SQLite
```

## 监控与日志

### 查看日志

Vercel Dashboard → **Deployments** → 点击部署 → **Logs**

### 性能监控

Vercel Dashboard → **Analytics** → 启用 Web Vitals

### 错误监控

建议集成 Sentry：
```bash
npm install @sentry/nextjs
```

## 更新部署

代码推送后 Vercel 会自动重新部署：

```bash
git add .
git commit -m "更新内容"
git push
```

Vercel 会自动：
1. 拉取最新代码
2. 运行 `npm install`
3. 运行 `npm run build`（包含 `prisma migrate deploy`）
4. 部署新版本

## 相关文档

- [PostgreSQL 迁移详细指南](./POSTGRESQL_MIGRATION.md)
- [项目进度报告](./PROGRESS.md)
- [API 设计文档](./API.md)

## 获取帮助

遇到问题请提交 Issue：
https://github.com/moxunjinmu-bit/ai-meme-king/issues
