# AI梗王之王 - 任务执行清单

## MVP 核心功能

### 数据库设置
- [x] 设计 Prisma schema（User, Meme, Vote, AICharacter, ChatMessage）
- [x] 执行数据库迁移
- [x] 创建种子数据

### OAuth 登录
- [x] 实现 SecondMe OAuth 登录流程
- [x] 创建 `/api/auth/login` 端点
- [x] 创建 `/api/auth/callback` 端点
- [x] 实现用户信息存储
- [x] 创建登录/登出组件

### 梗展示功能
- [x] 创建首页布局
- [x] 实现梗卡片组件
- [x] 创建 `/api/memes` API（获取梗列表）
- [x] 实现筛选和排序功能（API 支持，前端待完善）
- [ ] 实现分页或无限滚动

### 投票系统
- [x] 创建 `/api/memes/[id]/vote` API
- [x] 实现防重复投票逻辑
- [x] 实时更新票数显示
- [x] 添加投票动画效果

## 扩展功能（MVP 后）

### 排行榜
- [x] 创建排行榜页面
- [x] 实现今日梗王榜
- [x] 实现历史梗王榜
- [x] 实现新星榜

### 梗投稿
- [x] 创建投稿页面
- [x] 实现表单验证
- [x] 创建 `/api/memes/submit` API
- [x] 实现审核队列（当前自动通过）

### AI 角色聊天
- [x] 创建 AI 角色管理页面（框架已搭建）
- [ ] 实现角色创建功能
- [ ] 集成 SecondMe Chat API
- [ ] 创建聊天界面
- [ ] 实现多角色互动

### 主题切换
- [x] 完善深色主题样式
- [x] 添加主题切换按钮
- [x] 实现主题持久化

---

## 已完成的开发进度

### 2026-02-12 更新
- ✅ 修复 Prisma schema 使用 SQLite
- ✅ 创建 SQLite 数据库和表结构
- ✅ 填充种子数据（5 个示例梗）
- ✅ 创建 `/api/memes` API 获取梗列表
- ✅ 创建 `/api/memes/[id]/vote` API 投票功能
- ✅ 创建 `/api/rankings` API 获取排行榜
- ✅ 创建 `/api/memes/submit` API 投稿功能
- ✅ 创建 `/api/auth/me` API 获取用户信息
- ✅ 创建 `/api/auth/logout` API 登出功能
- ✅ 更新 MemeGrid 组件连接真实 API
- ✅ 更新 MemeCard 组件实现投票功能
- ✅ 创建 RankingList 组件
- ✅ 更新排行榜页面
- ✅ 创建投稿页面
- ✅ 更新首页添加投稿按钮
- ✅ 实现 useAuth hook 管理用户状态
- ✅ 更新导航栏显示登录/登出按钮
- ✅ 测试所有页面功能正常

### 项目结构
```
app/
├── api/
│   ├── auth/
│   │   ├── callback/route.ts    # OAuth 回调
│   │   ├── login/route.ts       # 登录入口
│   │   ├── logout/route.ts      # 登出
│   │   └── me/route.ts          # 获取用户信息
│   ├── memes/
│   │   ├── route.ts             # 获取梗列表
│   │   ├── [id]/vote/route.ts   # 投票功能
│   │   └── submit/route.ts      # 投稿功能
│   └── rankings/route.ts        # 排行榜
├── chat/page.tsx                # AI 聊天页面
├── rankings/page.tsx            # 排行榜页面
├── submit/page.tsx              # 投稿页面
├── layout.tsx                   # 根布局
├── page.tsx                     # 首页
├── globals.css                  # 全局样式
components/
├── layout/
│   └── navigation.tsx           # 导航栏
├── memes/
│   ├── meme-card.tsx            # 梗卡片
│   └── meme-grid.tsx            # 梗网格
├── rankings/
│   └── ranking-list.tsx         # 排行榜列表
├── providers/
│   └── theme-provider.tsx       # 主题提供者
├── sections/
│   └── hero.tsx                 # Hero 区域
lib/
├── auth.ts                      # 认证 hook
└── prisma.ts                    # Prisma 客户端
prisma/
├── schema.prisma                # 数据库模型
├── seed.ts                      # 种子数据
└── dev.db                       # SQLite 数据库
```

### API 端点
| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/auth/login` | GET | SecondMe OAuth 登录入口 |
| `/api/auth/callback` | GET | OAuth 回调处理 |
| `/api/auth/me` | GET | 获取当前用户信息 |
| `/api/auth/logout` | POST | 用户登出 |
| `/api/memes` | GET | 获取梗列表（支持排序、筛选） |
| `/api/memes/[id]/vote` | GET/POST | 检查投票状态/投票 |
| `/api/memes/submit` | POST | 提交新梗 |
| `/api/rankings` | GET | 获取排行榜数据 |

*创建时间: 2025-02-12*
*最后更新: 2026-02-12*
