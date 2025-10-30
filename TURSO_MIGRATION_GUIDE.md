# Turso 数据库迁移指南

## 📋 概述

本项目已从 Cloudflare D1 迁移到 **Turso** (LibSQL)，以更好地支持 Vercel 部署。

**Turso 优势**:
- ✅ 完美兼容 Vercel
- ✅ 基于 SQLite (LibSQL)
- ✅ 全球边缘复制
- ✅ 免费额度充足 (500 数据库，9GB 存储)
- ✅ 低延迟访问

## 🔧 本地设置

### 1. 安装依赖

```bash
cd /Users/luokun/Downloads/LaserCalcpro
npm install
```

新增的包:
- `@libsql/client` - Turso 客户端
- `nodemailer` - 邮件发送
- `tsx` - TypeScript 执行器

### 2. 配置环境变量

创建 `.env.local`:

```env
# Turso 数据库配置
TURSO_DATABASE_URL="libsql://lasercalcpro-vercel-icfg-cdp8xu7otxy0ma4nyltz6age.aws-us-east-1.turso.io"
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjE4MDQzNjEsImlkIjoiZGMyYTA4MjEtM2RkNS00N2Y4LTg0OTAtOWU1YThiMDI0NTI3IiwicmlkIjoiMWJkZmFiZTgtZjQ0Yy00NzA4LTlhMjMtNmE5YWY4MGMyYzQwIn0.wDtkkfo9W3w56y2aU5NCtT6hGDLgZOFGexy3hNk2i9jwh2bXKLjLseMk35YM5mDb-rNolV8r-AB7pUvfNTlxDQ"

# 网站配置
NEXT_PUBLIC_SITE_URL=https://lasercalcpro.com

# Google Analytics (可选)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense (可选)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

# 邮件配置 (可选 - 用于订阅确认)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@lasercalcpro.com

# NextAuth 配置 (管理后台)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl
```

生成 NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 3. 初始化数据库

```bash
npm run db:init
```

这会执行 `lib/db/schema.sql` 中的所有表创建语句。

预期输出:
```
🔄 Connecting to Turso database...
📝 Executing 4 SQL statements...
  [1/4] Executing...
  [2/4] Executing...
  [3/4] Executing...
  [4/4] Executing...

✅ Database initialized successfully!

📊 Verifying tables...

Created tables:
  - calculations
  - subscribers
  - calculation_history
  - admin_users

🎉 All done!
```

### 4. 启动开发服务器

```bash
npm run dev
```

## 🚀 Vercel 部署配置

### 1. 在 Vercel Dashboard 配置环境变量

进入项目 Settings → Environment Variables，添加：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `TURSO_DATABASE_URL` | `libsql://lasercalcpro-vercel-icfg-cdp8xu7otxy0ma4nyltz6age.aws-us-east-1.turso.io` | Production, Preview |
| `TURSO_AUTH_TOKEN` | `eyJhbGciOi...` (完整 token) | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://lasercalcpro.com` | Production |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Production |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-XXXXXXXXXXXXXXXX` | Production |
| `NEXTAUTH_URL` | `https://lasercalcpro.com` | Production |
| `NEXTAUTH_SECRET` | (生成的secret) | Production, Preview |

### 2. 初始化生产数据库

方式A: 使用 Turso CLI (推荐)
```bash
# 安装 Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# 登录
turso auth login

# 列出数据库
turso db list

# 执行 schema
turso db shell lasercalcpro-vercel-icfg < lib/db/schema.sql
```

方式B: 使用 Turso Web Dashboard
1. 访问 https://turso.tech/dashboard
2. 选择你的数据库
3. 使用 SQL Editor 执行 `lib/db/schema.sql` 的内容

### 3. 重新部署

```bash
git add .
git commit -m "feat: Migrate to Turso database"
git push origin main
```

Vercel 会自动检测推送并重新部署。

## 📊 数据库架构

### 已创建的表

#### 1. `subscribers`
邮件订阅用户表
```sql
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'pending',
  token TEXT UNIQUE,
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. `calculations`
计算记录表
```sql
CREATE TABLE IF NOT EXISTS calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_type TEXT NOT NULL,
  input_data TEXT NOT NULL,
  result_data TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. `calculation_history`
用户计算历史表（未来功能）
```sql
CREATE TABLE IF NOT EXISTS calculation_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  calculator_type TEXT NOT NULL,
  inputs TEXT NOT NULL,
  results TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. `admin_users`
管理员用户表
```sql
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 代码变更

### 数据库客户端

**旧代码 (D1)**:
```typescript
import { executeQuery, executeWrite } from '@/lib/db/client';
```

**新代码 (Turso)** - 无需修改！
```typescript
import { executeQuery, executeWrite } from '@/lib/db/client';
```

API 保持兼容，内部实现已切换到 Turso。

### Turso 客户端使用

```typescript
import { getTursoClient, executeQuery, executeWrite } from '@/lib/db/turso';

// 查询示例
const users = await executeQuery('SELECT * FROM subscribers WHERE status = ?', ['confirmed']);

// 写入示例
const result = await executeWrite(
  'INSERT INTO subscribers (email, name, token) VALUES (?, ?, ?)',
  ['test@example.com', 'Test User', 'token123']
);

console.log('Rows affected:', result.rowsAffected);
console.log('Last insert ID:', result.lastInsertRowid);
```

## ✅ 验证迁移

### 1. 本地测试

```bash
# 启动服务器
npm run dev

# 测试订阅功能
# 访问 http://localhost:3000
# 尝试邮件订阅
```

### 2. 数据库连接测试

创建测试脚本 `scripts/test-db.ts`:
```typescript
import { executeQuery } from '../lib/db/turso';

async function test() {
  const result = await executeQuery('SELECT 1 as test');
  console.log('Database connection successful:', result);
}

test();
```

运行:
```bash
npx tsx scripts/test-db.ts
```

### 3. 生产环境测试

部署后:
1. 访问网站
2. 测试订阅功能
3. 检查 Vercel Logs
4. 在 Turso Dashboard 查看数据

## 🐛 故障排除

### 问题 1: "TURSO_DATABASE_URL environment variable is not set"

**解决**:
1. 确认 `.env.local` 文件存在
2. 重启开发服务器
3. 在 Vercel 检查环境变量配置

### 问题 2: "Authentication failed"

**解决**:
1. 确认 TURSO_AUTH_TOKEN 正确
2. Token 可能过期，重新生成:
   ```bash
   turso db tokens create lasercalcpro-vercel-icfg
   ```

### 问题 3: "Table already exists"

这是正常的！初始化脚本会跳过已存在的表。

### 问题 4: Vercel 部署后数据库连接失败

**检查**:
1. Vercel 环境变量是否正确配置
2. TURSO_AUTH_TOKEN 是否包含完整内容（很长）
3. 查看 Vercel Function Logs

## 📚 相关资源

- [Turso 官方文档](https://docs.turso.tech/)
- [Turso Dashboard](https://turso.tech/dashboard)
- [LibSQL Client SDK](https://github.com/tursodatabase/libsql-client-ts)
- [Turso with Vercel Guide](https://docs.turso.tech/tutorials/vercel-setup)

## 🎯 下一步

数据库迁移完成后:

1. ✅ 测试所有计算器功能
2. ✅ 测试邮件订阅
3. ✅ 实现管理后台
4. ✅ 添加计算历史功能
5. ✅ 配置生产环境

---

**迁移完成日期**: 2025-10-30  
**Turso 数据库**: lasercalcpro-vercel-icfg  
**区域**: AWS US-East-1

🎉 **欢迎来到 Turso 时代！**

