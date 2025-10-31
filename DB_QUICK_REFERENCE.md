# 🚀 数据库快速参考

## 📌 连接信息

```bash
TURSO_DATABASE_URL="libsql://lasercalcpro-vercel-icfg-cdp8xu7otxy0ma4nyltz6age.aws-us-east-1.turso.io"
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjE4MDQzNjEsImlkIjoiZGMyYTA4MjEtM2RkNS00N2Y4LTg0OTAtOWU1YThiMDI0NTI3IiwicmlkIjoiMWJkZmFiZTgtZjQ0Yy00NzA4LTlhMjMtNmE5YWY4MGMyYzQwIn0.wDtkkfo9W3w56y2aU5NCtT6hGDLgZOFGexy3hNk2i9jwh2bXKLjLseMk35YM5mDb-rNolV8r-AB7pUvfNTlxDQ"
```

## 🔐 管理员账户

- **用户名**: admin
- **密码**: admin123
- **登录**: http://localhost:3000/admin/login

## ⚡ 常用命令

```bash
# 验证数据库
npm run db:verify

# 创建管理员
npm run create-admin

# 填充数据
npm run db:seed

# 完整设置
npm run db:setup

# 启动开发
npm run dev
```

## 📊 数据库状态

✅ 10 个表 | 26 个索引 | 2 个视图  
✅ 1 个管理员 | 4 篇文章 | 11 个设置  
✅ 数据库大小: 0.18 MB

## 📝 SQL 快捷查询

```sql
-- 查看管理员
SELECT * FROM admins;

-- 查看文章
SELECT title, status FROM articles;

-- 查看设置
SELECT setting_key, setting_value FROM settings;

-- 每日统计
SELECT * FROM daily_stats LIMIT 7;

-- 热门工具
SELECT * FROM popular_tools;
```

## 🔗 相关资源

- [完整文档](./DATABASE_SETUP_COMPLETE.md)
- [Turso 控制台](https://turso.tech/app)
- [项目 README](./README.md)
























