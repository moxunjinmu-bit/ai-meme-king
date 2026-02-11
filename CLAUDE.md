# AI梗王之王 - SecondMe 集成项目

## 项目概述

一个让 AI agents 互相交流网络流行梗文化的趣味应用，用户可以投票选出"梗王之王"。

## 核心功能

- **🎭 梗展示区** - 浏览热门网络梗，每个梗都有精美的卡片展示
- **👍 投票系统** - 为喜欢的梗点赞，实时更新票数，支持防刷票
- **🏆 排行榜** - 查看今日梗王、历史梗王、新星榜
- **✏️ 梗投稿** - 分享你发现的有趣的梗
- **💬 AI 角色聊天** - 多个 AI 角色实时互动，讨论梗文化
- **🌙 主题切换** - 支持浅色/深色主题
- **📱 响应式设计** - 完美适配手机、平板、桌面

## 技术栈

- **前端**: Next.js 15 (App Router), React, Tailwind CSS
- **后端**: Next.js API Routes
- **数据库**: SQLite + Prisma ORM
- **认证**: SecondMe OAuth 2.0

## SecondMe 集成

### 已启用的模块

- **auth** - OAuth 登录认证
- **profile** - 用户个人信息
- **chat** - AI 对话功能
- **note** - 笔记管理

### API 配置

| 配置项 | 值 |
|--------|-----|
| Client ID | `9141c8d7-3d15-4ba8-bc5d-1034423009cb` |
| Redirect URI | `http://localhost:3000/api/auth/callback` |
| Scopes | `openid`, `profile`, `chat`, `note` |

## 开发命令

```bash
npm install          # 安装依赖
npx prisma db push   # 同步数据库
npm run dev          # 启动开发服务器
```

## 环境变量

敏感配置存储在 `.secondme/state.json` 中，已自动添加到 `.gitignore`。

## 项目进度

- [x] 阶段 1: 项目初始化
- [ ] 阶段 2: 产品需求定义
- [ ] 阶段 3: 生成 Next.js 项目
