# PostgreSQL 迁移指南

本文档指导如何将项目从 SQLite 迁移到 PostgreSQL，以实现 Vercel 部署时的数据持久化。

## 迁移步骤

### 1. 创建 PostgreSQL 数据库

#### 方案 A: Vercel Postgres (推荐)

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 点击 **Storage** → **Create Database** → **Postgres**
4. 选择区域（建议选与你项目相同的区域）
5. 创建完成后，点击 **Connect** 将数据库连接到你的项目

Vercel 会自动设置环境变量 `DATABASE_URL` 和 `DATABASE_URL_UNPOOLED`

#### 方案 B: Supabase PostgreSQL

1. 登录 [Supabase](https://supabase.com)
2. 创建新项目
3. 进入 **Settings** → **Database** → **Connection string**
4. 复制 **URI** 格式的连接字符串
5. 在 Vercel 环境变量中设置 `DATABASE_URL`

连接字符串格式：
```
postgresql://postgres:[密码]@db.[项目ID].supabase.co:5432/postgres
```

#### 方案 C: 本地 PostgreSQL

本地开发时使用：

```bash
# 使用 Docker 启动 PostgreSQL
docker run -d \
  --name aimemeking-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=aimemeking \
  -p 5432:5432 \
  postgres:15-alpine
```

### 2. 更新环境变量

在项目根目录创建 `.env` 文件：

```bash
# PostgreSQL 连接字符串
DATABASE_URL="postgresql://user:password@localhost:5432/aimemeking"

# Vercel Postgres 示例 (自动设置)
# DATABASE_URL="postgres://username:password@host:5432/database?sslmode=require"

# SecondMe OAuth
NEXT_PUBLIC_SECONDME_CLIENT_ID="9141c8d7-3d15-4ba8-bc5d-1034423009cb"
NEXT_PUBLIC_SECONDME_REDIRECT_URI="http://localhost:3000/api/auth/callback"
```

### 3. 执行数据库迁移

```bash
# 安装依赖
npm install

# 生成 Prisma Client
npx prisma generate

# 执行数据库迁移（创建表结构）
npx prisma migrate dev --name init

# 填充种子数据
npx prisma db seed
```

### 4. 本地测试

```bash
# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 测试各项功能是否正常。

### 5. 部署到 Vercel

#### 方案 A: Vercel Postgres (已集成)

如果你使用 Vercel Postgres，部署时会自动连接数据库：

1. 提交代码到 GitHub
2. Vercel 自动部署
3. 首次部署后，在 Vercel Console 的 **Deployments** 中查看最新部署
4. 点击 **Redeploy** 重新部署以应用数据库迁移

#### 方案 B: 外部 PostgreSQL (Supabase等)

1. 在 Vercel Project Settings → **Environment Variables** 中添加：
   - `DATABASE_URL`: 你的 PostgreSQL 连接字符串
   - `NEXT_PUBLIC_SECONDME_CLIENT_ID`: SecondMe Client ID
   - `NEXT_PUBLIC_SECONDME_REDIRECT_URI`: `https://你的域名/api/auth/callback`

2. 在 Vercel Console 的 **Deployments** 中点击 **Redeploy**

## 常见问题

### 1. 连接超时

如果使用 Supabase，确保在连接字符串中添加 `pgbouncer=true`：

```
postgresql://user:pass@host:5432/db?pgbouncer=true&connection_limit=1
```

### 2. SSL 问题

Vercel 要求使用 SSL 连接 PostgreSQL。连接字符串中需包含 `sslmode=require`：

```
postgresql://user:pass@host:5432/db?sslmode=require
```

### 3. 迁移失败

如果 `prisma migrate deploy` 失败，检查：

1. 数据库连接字符串是否正确
2. 数据库用户是否有创建表的权限
3. 数据库是否已存在同名表

### 4. 数据库重置

如果需要重置数据库：

```bash
# 删除所有表并重新迁移
npx prisma migrate reset

# 重新填充种子数据
npx prisma db seed
```

## 性能优化

### 添加连接池

Vercel Serverless 函数需要连接池来优化数据库连接：

```env
# 使用 Prisma Connection Pool
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=5&pool_timeout=10"
```

### 索引优化

当前的 schema 已包含常用索引：
- `@@index([status])` - 梗状态筛选
- `@@index([voteCount])` - 排行榜排序
- `@@index([memeId, createdAt])` - 评论查询
- `@@index([userId, createdAt])` - 用户收藏查询

## 备份策略

### Vercel Postgres
- 自动每日备份
- 可在 Vercel Console 中恢复

### Supabase
- 使用 Supabase Dashboard 导出
- 或使用 pg_dump 命令行备份

```bash
pg_dump "postgresql://user:pass@host:5432/db" > backup.sql
```

## 切换回 SQLite (开发环境)

如果需要在本地使用 SQLite：

```bash
# 修改 prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

# 重新生成
cd prisma
mv schema.prisma schema.postgresql.prisma
mv schema.sqlite.prisma schema.prisma
npx prisma generate
```

（注：需要提前保存 SQLite 版本的 schema 文件）
