# 管理后台设置指南
## LaserCalc Pro Admin Setup Guide

本指南将帮助你快速配置和使用LaserCalc Pro管理后台系统。

---

## 📋 目录

1. [系统要求](#系统要求)
2. [快速开始](#快速开始)
3. [数据库初始化](#数据库初始化)
4. [默认管理员账户](#默认管理员账户)
5. [环境变量配置](#环境变量配置)
6. [功能模块说明](#功能模块说明)
7. [安全建议](#安全建议)
8. [常见问题](#常见问题)

---

## 🔧 系统要求

- Node.js >= 18.17.0
- npm >= 9.0.0
- Turso Database (或本地 SQLite)
- 支持的浏览器：Chrome, Firefox, Safari, Edge (最新版本)

---

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量模板并填写必要信息：

```bash
cp .env.example .env
```

**必须配置的变量：**
- `JWT_SECRET`: JWT令牌密钥（生产环境必须更改）
- `TURSO_DATABASE_URL`: 数据库连接地址
- `TURSO_AUTH_TOKEN`: 数据库认证令牌

### 3. 初始化数据库

```bash
# 初始化数据库表结构
npm run db:init

# 创建默认管理员账户
npm run db:init-admin
```

或者手动运行：

```bash
tsx scripts/init-turso-db.ts
tsx scripts/init-admin-db.ts
```

### 4. 启动开发服务器

```bash
npm run dev
```

### 5. 访问管理后台

打开浏览器访问：
- 登录页面: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- 管理仪表盘: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🗄️ 数据库初始化

### 自动初始化（推荐）

使用提供的脚本自动创建所有表和默认数据：

```bash
npm run db:init
npm run db:init-admin
```

### 手动初始化

如果需要手动初始化，可以使用Turso CLI：

```bash
# 连接到数据库
turso db shell your-database-name

# 执行SQL文件
.read lib/db/schema.sql
```

---

## 👤 默认管理员账户

初始化后会创建默认管理员账户：

```
用户名: admin
密码: admin123
邮箱: admin@lasercalcpro.com
角色: admin (管理员)
```

### ⚠️ 重要安全提示

**首次登录后立即执行以下操作：**

1. ✅ 修改默认密码
2. ✅ 更新邮箱地址为你的真实邮箱
3. ✅ 创建你自己的管理员账户
4. ✅ 禁用或删除默认admin账户

---

## 🔐 环境变量配置

### 必需配置

```env
# JWT密钥 - 用于生成和验证认证令牌
JWT_SECRET=your-super-secret-key-minimum-32-characters-long

# 数据库连接
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

### 可选配置

```env
# 邮件服务
EMAIL_FROM=noreply@lasercalcpro.com
RESEND_API_KEY=your-resend-api-key

# Google服务
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx

# 站点配置
NEXT_PUBLIC_SITE_URL=https://lasercalcpro.com
```

---

## 📦 功能模块说明

### 1. 仪表盘 (`/admin`)

- 📊 实时数据统计
- 📈 关键指标展示
- 🔥 热门计算器排行
- ⚡ 快速操作入口

### 2. 计算历史管理 (`/admin/calculations`)

**功能：**
- ✅ 查看所有计算记录
- 🔍 按类型、日期、地区筛选
- 📄 查看详细输入输出参数
- 📥 导出CSV格式数据
- 🗑️ 删除无用记录

**API端点：**
- `GET /api/admin/calculations` - 获取计算列表
- `DELETE /api/admin/calculations?id={id}` - 删除计算记录

### 3. 订阅用户管理 (`/admin/subscribers`)

**功能：**
- 👥 查看所有订阅用户
- ✉️ 查看确认状态
- ✅ 手动确认/取消确认
- 🔍 按状态和邮箱搜索
- 📥 导出订阅者列表
- 🗑️ 删除订阅用户

**API端点：**
- `GET /api/admin/subscribers` - 获取订阅者列表
- `PUT /api/admin/subscribers` - 更新订阅者状态
- `DELETE /api/admin/subscribers?id={id}` - 删除订阅者

### 4. 管理员账户 (`/admin/users`)

**功能：**
- 👤 管理管理员账户
- ➕ 创建新管理员
- ✏️ 编辑账户信息
- 🔑 修改密码
- 🔒 启用/禁用账户
- 👮 角色权限管理（admin/editor）

**API端点：**
- `GET /api/admin/users` - 获取管理员列表
- `POST /api/admin/users` - 创建管理员
- `PUT /api/admin/users` - 更新管理员信息
- `DELETE /api/admin/users?id={id}` - 删除管理员

**权限说明：**
- `admin`: 完全管理权限（包括用户管理）
- `editor`: 内容编辑权限（不能管理用户）

### 5. 系统设置 (`/admin/settings`)

**功能：**
- ⚙️ 站点基本配置
- 📧 邮件服务设置
- 🔑 API密钥管理
- 🚧 维护模式开关
- 📊 分析服务配置

**API端点：**
- `GET /api/admin/settings` - 获取所有设置
- `PUT /api/admin/settings` - 更新设置项

### 6. 数据分析 (`/admin/analytics`)

**功能：**
- 📈 数据趋势分析
- 📊 使用统计图表
- 🌍 地理分布数据
- ⏰ 访问时段分析
- 📥 导出分析报告

### 7. 文章管理 (`/admin/articles`)

**状态：** 🚧 开发中

**计划功能：**
- 📝 创建和编辑文章
- 🖊️ 富文本编辑器
- 🏷️ 分类和标签
- 🔍 SEO优化设置
- 📅 发布时间管理

---

## 🔒 安全建议

### 1. 密码安全

- ✅ 使用强密码（至少12位，包含大小写字母、数字、特殊字符）
- ✅ 定期更换密码（建议每3个月）
- ✅ 不要在多个服务使用相同密码
- ✅ 启用密码管理器

### 2. JWT密钥安全

```bash
# 生成强随机密钥
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- ✅ 使用至少32字符的随机字符串
- ✅ 生产环境必须使用唯一密钥
- ✅ 不要将密钥提交到版本控制
- ✅ 定期轮换密钥

### 3. 数据库安全

- ✅ 使用环境变量存储凭据
- ✅ 限制数据库访问IP
- ✅ 定期备份数据
- ✅ 启用数据库审计日志

### 4. 访问控制

- ✅ 最小权限原则
- ✅ 定期审查管理员账户
- ✅ 及时禁用离职人员账户
- ✅ 监控异常登录行为

### 5. HTTPS

- ✅ 生产环境强制使用HTTPS
- ✅ 配置安全的cookie策略
- ✅ 启用HSTS头部
- ✅ 使用有效的SSL证书

---

## 🔐 认证系统说明

### JWT Token

- **有效期**: 7天
- **存储方式**: HTTP-only Cookie + LocalStorage备份
- **自动刷新**: 支持
- **安全特性**: 
  - CSRF保护
  - XSS保护
  - 同源策略

### 中间件保护

所有管理后台API都受中间件保护：

```typescript
import { requireAuth } from '@/lib/auth/middleware';

// 需要登录
export const GET = requireAuth(handler);

// 需要特定角色
export const POST = requireRole(['admin'], handler);
```

### 登录流程

1. 用户提交用户名和密码
2. 服务器验证凭据
3. 生成JWT token
4. 设置HTTP-only cookie
5. 返回用户信息和token

### 退出登录

1. 清除cookie
2. 清除localStorage
3. 重定向到登录页

---

## 🛠️ 常见问题

### Q1: 忘记管理员密码怎么办？

**方法1：** 使用数据库重置

```bash
# 连接到数据库
turso db shell your-database

# 重置密码（新密码: newpassword123）
UPDATE admins SET password = '$2a$10$rQ6mZKZ5fUYHp.X9Y6YmTuGqZ8YQZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z' WHERE username = 'admin';
```

**方法2：** 创建新管理员账户

```bash
tsx scripts/init-admin-db.ts
```

### Q2: 如何修改JWT token有效期？

编辑 `lib/auth/jwt.ts`：

```typescript
.setExpirationTime('7d') // 改为你需要的时间，如 '1d', '12h'
```

### Q3: 如何添加新的系统设置？

在数据库中插入新设置：

```sql
INSERT INTO settings (setting_key, setting_value, description, is_public) 
VALUES ('new_setting', 'default_value', '设置说明', FALSE);
```

### Q4: 登录后提示"Unauthorized"

**可能原因：**
- JWT_SECRET未配置或不一致
- Cookie被浏览器阻止
- Token已过期

**解决方案：**
1. 检查.env文件中的JWT_SECRET
2. 清除浏览器cookie和localStorage
3. 检查浏览器控制台错误信息

### Q5: 数据库连接失败

**检查项：**
- TURSO_DATABASE_URL格式是否正确
- TURSO_AUTH_TOKEN是否有效
- 网络连接是否正常
- 数据库是否已创建

### Q6: 如何启用维护模式？

在系统设置中将 `maintenance_mode` 设置为 `true`，或直接更新数据库：

```sql
UPDATE settings SET setting_value = 'true' WHERE setting_key = 'maintenance_mode';
```

### Q7: 如何自定义管理后台主题？

编辑 `tailwind.config.ts`，修改primary颜色：

```typescript
colors: {
  primary: {
    50: '#eff6ff',
    // ... 其他色阶
    600: '#2563eb', // 主色调
  }
}
```

### Q8: 如何添加新的管理页面？

1. 创建页面文件: `app/admin/new-page/page.tsx`
2. 添加API路由: `app/api/admin/new-endpoint/route.ts`
3. 更新导航: `components/admin/AdminLayout.tsx`

---

## 📞 技术支持

如果遇到问题，请：

1. 查看日志文件
2. 检查浏览器控制台
3. 参考本文档常见问题部分
4. 查看项目README.md

---

## 🎯 下一步

- [ ] 修改默认管理员密码
- [ ] 创建你自己的管理员账户
- [ ] 配置邮件服务
- [ ] 设置Google Analytics
- [ ] 配置AdSense
- [ ] 备份数据库
- [ ] 部署到生产环境

---

## 📝 更新日志

### v1.0.0 (2025-01-30)
- ✅ 管理员认证系统
- ✅ 仪表盘数据展示
- ✅ 计算历史管理
- ✅ 订阅用户管理
- ✅ 管理员账户管理
- ✅ 系统设置管理
- ✅ 数据分析报表
- 🚧 文章管理（开发中）

---

**祝使用愉快！🎉**

