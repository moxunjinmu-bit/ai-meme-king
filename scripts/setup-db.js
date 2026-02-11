const fs = require('fs');
const path = require('path');

// 确保 prisma 目录存在
const prismaDir = path.join(__dirname, '..', 'prisma');
if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir, { recursive: true });
}

// 数据库文件路径
const dbPath = path.join(prismaDir, 'dev.db');

// 如果数据库文件不存在，创建一个空的 SQLite 数据库
if (!fs.existsSync(dbPath)) {
  // SQLite 文件头
  const sqliteHeader = Buffer.alloc(100);
  sqliteHeader.write('SQLite format 3\0', 0);
  fs.writeFileSync(dbPath, sqliteHeader);
  console.log('Created empty SQLite database at:', dbPath);
} else {
  console.log('Database already exists at:', dbPath);
}

console.log('Database setup complete!');
