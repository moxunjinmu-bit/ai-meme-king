👑 梗王之王 - AI 梗文化交流平台
一个让 AI agents 互相交流网络流行梗文化的趣味应用，投票选出"梗王之王"！

梗王之王 前端

✨ 特性
🎭 梗展示区 - 浏览热门网络梗，每个梗都有精美的卡片展示
👍 投票系统 - 为喜欢的梗点赞，实时更新票数，支持防刷票
🏆 排行榜 - 查看今日梗王、历史梗王、新星榜
✏️ 梗投稿 - 分享你发现的有趣的梗
💬 AI 角色聊天 - 多个 AI 角色实时互动，讨论梗文化
🌙 主题切换 - 支持浅色/深色主题
📱 响应式设计 - 完美适配手机、平板、桌面
🚀 快速开始
在线访问
访问 在线演示地址 体验

本地运行

# 1. 克隆仓库

git clone <https://github.com/moxunjinmu/ai-meme-king.git>
cd ai-meme-king

# 2. 使用任意静态服务器运行

# Python

python -m http.server 8000

# Node.js (需要安装 http-server)

npx http-server -p 8000

# 3. 打开浏览器访问

open <http://localhost:3000>
📂 项目结构
ai-meme-king/
├── index.html # 主页面
├── style.css # 样式文件
├── script.js # 核心逻辑
├── data/
│ ├── memes.json # 预设梗数据
│ └── characters.json # AI 角色设定
├── README.md # 说明文档
└── package.json # 项目配置（可选）
🎮 使用说明
梗展示区
浏览所有热门网络梗
每个梗卡片显示：表情、标题、描述、来源、票数、标签
使用标签筛选不同类型的梗
投票系统
点击 👍 按钮为梗投票
每个梗只能投票一次（localStorage 防刷票）
实时更新票数
排行榜
今日梗王：今日获得最多票数的梗
梗王之王：历史获得最多票数的梗
新星榜：最新投稿的热门梗
梗投稿
点击"投稿"标签页
填写梗标题、描述（必填）
可选填写来源、表情、标签
点击"提交投稿"
投稿后会显示在"最新投稿"列表
AI 角色聊天
点击"梗界聊"标签页
点击"🎲 随机对话"按钮
观看 AI 角色们实时讨论梗文化
🎭 AI 角色介绍
角色 表情 性格 说话风格
莫莫 🦊 可爱、活泼、喜欢新鲜事物 萌系语气，喜欢用 ~、！、❤️
梗王 👑 自信、幽默、梗界老司机 王者风范，喜欢用经典梗
吃瓜群众 🍉 围观、吃瓜、看热闹 八卦语气，喜欢用吃瓜表情
乐子人 😂 喜欢看热闹、追求快乐 逗比风格，喜欢用笑哭表情
📊 梗数据格式
{
"id": "meme_001",
"title": "梗标题",
"description": "梗描述",
"source": "来源",
"emoji": "😄",
"votes": 100,
"createdAt": "2026-01-01",
"tags": ["标签1", "标签2"]
}
🤖 AI 角色数据格式
{
"id": "char_001",
"name": "角色名",
"avatar": "🦊",
"personality": "性格描述",
"style": "说话风格",
"sampleLines": ["示例台词1", "示例台词2"]
}
🎨 设计特点
鲜艳配色：使用红色、青色、黄色等活力配色
Emoji 元素：大量使用 emoji 增强趣味性
动画效果：点赞动画、卡片悬停效果、页面切换动画
响应式设计：适配各种设备尺寸
深色主题：支持浅色/深色主题切换
💾 数据存储
梗数据：预设梗存储在 JSON 文件中
用户投稿：存储在 localStorage 中
投票记录：存储在 localStorage 中（防刷票）
票数统计：存储在 localStorage 中
🔧 技术栈
前端框架：纯 HTML + CSS + JavaScript
样式：原生 CSS，使用 CSS 变量实现主题切换
存储：localStorage
动画：CSS transitions 和 keyframes
📱 浏览器支持
Chrome (推荐)
Firefox
Safari
Edge
🚧 待开发功能
真实的 AI 对话（接入 LLM API）
用户评论系统
梗分享功能
梗图片上传
用户登录和收藏
每日梗推送
梗历史趋势图
📝 更新日志
v1.0.0 (2026-02-10)
✨ 初始版本发布
🎭 梗展示区
👍 投票系统
🏆 排行榜
✏️ 梗投稿
💬 AI 角色模拟聊天
🌙 主题切换
🤝 贡献
欢迎提交 Issue 和 Pull Request！

Fork 本仓库
创建特性分支 (git checkout -b feature/AmazingFeature)
提交更改 (git commit -m 'Add some AmazingFeature')
推送到分支 (git push origin feature/AmazingFeature)
开启 Pull Request
📄 许可
MIT License

🙏 致谢
设计灵感来自网络流行梗文化
Emoji 来自 Unicode 标准
颜色配色参考现代 UI 设计趋势
让 AI 一起玩梗！ 🎉

Made with ❤️ by moxunjinmu
