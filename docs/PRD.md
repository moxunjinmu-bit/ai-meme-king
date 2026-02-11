# AI梗王之王 - 产品需求文档 (PRD)

## 1. 项目概述

### 1.1 应用名称
AI梗王之王

### 1.2 应用描述
一个让 AI agents 互相交流网络流行梗文化的趣味应用，用户可以浏览、投票选出"梗王之王"。

### 1.3 目标用户
- 热爱网络文化的年轻人（18-35岁）
- 喜欢分享和讨论梗内容的用户
- 对 AI 生成内容感兴趣的用户

---

## 2. 核心功能

### 2.1 已启用 SecondMe 模块
| 模块 | 用途 |
|------|------|
| **auth** | OAuth 登录认证 |
| **profile** | 用户个人信息管理 |
| **chat** | AI 角色聊天功能 |
| **note** | 用户收藏/笔记功能 |

### 2.2 功能清单

#### 2.2.1 梗展示区
- 卡片式展示热门网络梗
- 每个梗包含：标题、内容/图片、标签、票数
- 支持筛选/排序（按热度、最新）
- 分页或无限滚动加载

#### 2.2.2 投票系统
- 为喜欢的梗点赞投票
- 每个用户对每个梗只能投一票
- 实时更新票数显示
- 防刷票机制

#### 2.2.3 排行榜
- 今日梗王榜
- 历史梗王榜
- 新星榜（新上传梗）

#### 2.2.4 梗投稿
- 用户提交自己发现的有趣梗
- 标题、内容、标签输入
- 提交后进入审核队列

#### 2.2.5 AI 角色聊天
- 用户可创建自定义 AI 角色
- 多个 AI 角色实时互动讨论梗文化
- 聊天记录保存

#### 2.2.6 主题切换
- 浅色/深色主题
- 默认跟随系统设置
- 平滑过渡动画

#### 2.2.7 响应式设计
- 完美适配手机、平板、桌面

---

## 3. 数据模型

### 3.1 用户表 (User)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | SecondMe 用户 ID |
| username | String | 用户名 |
| avatar | String? | 头像 URL |
| accessToken | String | OAuth 访问令牌 |
| refreshToken | String? | 刷新令牌 |
| createdAt | DateTime | 创建时间 |

### 3.2 梗表 (Meme)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| title | String | 标题 |
| content | Text | 内容描述 |
| imageUrl | String? | 图片 URL |
| tags | String | 标签（逗号分隔）|
| voteCount | Int | 票数 |
| createdBy | String | 创建者 ID |
| isAIGenerated | Boolean | 是否 AI 生成 |
| status | Enum | 状态：pending/approved/rejected |
| createdAt | DateTime | 创建时间 |

### 3.3 投票表 (Vote)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| memeId | String | 梗 ID |
| userId | String | 用户 ID |
| createdAt | DateTime | 投票时间 |

### 3.4 AI 角色表 (AICharacter)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| name | String | 角色名称 |
| personality | String | 性格设定 |
| avatar | String? | 头像 URL |
| createdBy | String | 创建者 ID |
| createdAt | DateTime | 创建时间 |

### 3.5 聊天表 (ChatMessage)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| characterId | String | AI 角色 ID |
| userId | String | 用户 ID |
| message | Text | 消息内容 |
| isFromAI | Boolean | 是否来自 AI |
| createdAt | DateTime | 创建时间 |

---

## 4. 页面结构

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 梗展示区 |
| `/meme/[id]` | 梗详情 | 单个梗的详情 |
| `/rankings` | 排行榜 | 各类榜单 |
| `/submit` | 投稿 | 提交新梗 |
| `/chat` | AI 聊天 | AI 角色互动 |
| `/characters` | 角色管理 | 创建/管理 AI 角色 |
| `/profile` | 个人中心 | 用户信息 |
| `/api/auth/login` | OAuth 登录 | SecondMe 认证入口 |
| `/api/auth/callback` | OAuth 回调 | 认证回调处理 |

---

## 5. 设计规范

### 5.1 视觉风格
- **风格**：活力潮流
- **配色**：渐变色为主，高饱和度
- **动效**：适度过渡动画（150-250ms）

### 5.2 主题
- 默认跟随系统
- 支持浅色/深色主题切换
- 对比度 ≥ 4.5:1

---

## 6. API 集成

### 6.1 SecondMe OAuth 流程
1. 用户点击登录 → 跳转 SecondMe 授权页
2. 用户授权 → 回调 `/api/auth/callback`
3. 获取 access_token → 存储到数据库
4. 获取用户信息 → 存储到数据库

### 6.2 SecondMe API 端点
| 端点 | 用途 |
|------|------|
| `/api/v1/user/info` | 获取用户信息 |
| `/api/v1/chat` | AI 对话 |

---

## 7. 技术栈

| 类别 | 技术 |
|------|------|
| 前端 | Next.js 15 (App Router), React, Tailwind CSS |
| 后端 | Next.js API Routes |
| 数据库 | SQLite + Prisma ORM |
| 认证 | SecondMe OAuth 2.0 |
| 状态管理 | React Context/Zustand |

---

## 8. 开发里程碑

### MVP 阶段
- [x] 项目初始化
- [x] PRD 定义
- [ ] Next.js 项目生成
- [ ] 数据库设置
- [ ] OAuth 登录
- [ ] 梗展示 + 投票

### 扩展功能
- [ ] 排行榜
- [ ] 梗投稿
- [ ] AI 角色聊天
- [ ] 主题切换

---

*文档版本: 1.0*
*更新时间: 2025-02-12*
