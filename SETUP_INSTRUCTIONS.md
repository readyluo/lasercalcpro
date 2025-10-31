# LaserCalc Pro - 数据库初始化指南

## 📋 前置准备

### 1. 获取 Turso 数据库凭据

访问 **Vercel Dashboard** 获取现有配置：

1. 登录 https://vercel.com/yigetechs-projects/lasercalcpro
2. 进入 **Settings** → **Environment Variables**
3. 查找并复制以下变量的值：
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `JWT_SECRET`

### 2. 配置本地环境变量

编辑 `.env.local` 文件，替换占位符为实际值：

```bash
# 必需：从 Vercel 复制实际值
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your-actual-jwt-secret-32-chars-or-more

# 可选：自定义管理员账户信息
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Change_Me_After_First_Login_123!
ADMIN_EMAIL=admin@lasercalcpro.com
ADMIN_DISPLAY_NAME=System Administrator
```

---

## 🚀 执行初始化步骤

### 步骤 1：初始化数据库文章内容

运行以下命令填充 10 篇高质量的制造业博客文章：

```bash
npm run seed-blog
```

**预期输出：**
```
🌱 Seeding blog articles...

✅ Complete Guide to Laser Cutting Costs: 7 Key Factors That Impact Pricing
✅ CNC Machining ROI Calculator: How to Justify Equipment Investment
✅ Material Utilization Optimization: Reduce Waste by 30% in Laser Cutting
✅ Fiber vs CO2 Lasers: Complete Comparison for Cost-Conscious Manufacturers
✅ Energy Cost Management for Manufacturing: 10 Proven Strategies
✅ Supply Chain Resilience: Building Buffer Stock Strategies for Sheet Metal
✅ Quality Control Best Practices: Achieving 99.5% First-Pass Yield
✅ Labor Shortage Solutions: Automation vs Skilled Worker Investment
✅ Preventive Maintenance ROI: Reducing Unplanned Downtime 80%
✅ Quoting Efficiency: Reduce Estimate Time from 2 Hours to 15 Minutes

✨ Seeding complete!
```

**如果文章已存在：**
```
⏭️  Skipped (exists): Complete Guide to Laser Cutting Costs...
```

---

### 步骤 2：创建管理员账户

运行以下命令创建或更新管理员账户：

```bash
npm run create-admin
```

**预期输出：**
```
🔧 Creating admin user...
   Username: admin
   Email: admin@lasercalcpro.com
   Display Name: System Administrator
✅ Admin user created successfully

🔐 Login Credentials:
   URL: http://localhost:3000/admin/login
   Username: admin
   Password: admin123

⚠️  IMPORTANT: Change the default password after first login!
```

**如果管理员已存在：**
```
⚠️  Admin user already exists
   Updating password...
✅ Admin password updated successfully
```

---

## ✅ 验证初始化结果

### 1. 本地验证

启动开发服务器：

```bash
npm run dev
```

访问以下页面确认：

- **Blog 页面**: http://localhost:3000/blog
  - 应该显示 10 篇文章
  - 包含分类过滤（tutorials, industry, case-studies, news）
  
- **管理后台登录**: http://localhost:3000/admin/login
  - 使用上述凭据登录
  - 应该能成功进入管理后台

- **文章管理**: http://localhost:3000/admin/articles
  - 应该能看到所有已发布的文章
  - 可以编辑、删除文章

### 2. 生产环境验证

访问线上地址确认：

- **Blog 页面**: https://www.lasercalcpro.com/blog
  - 确认文章已同步到生产环境
  
- **管理后台**: https://www.lasercalcpro.com/admin/login
  - 使用相同凭据登录

---

## 🔍 故障排查

### 问题 1：`TURSO_DATABASE_URL environment variable is not set`

**原因**：`.env.local` 文件中的环境变量未正确配置

**解决**：
1. 确认 `.env.local` 文件存在
2. 确认环境变量值已从 Vercel 正确复制
3. 重启终端或重新运行命令

### 问题 2：`Authentication failed`

**原因**：Turso 认证 Token 无效或过期

**解决**：
1. 访问 https://turso.tech/dashboard
2. 重新生成 Auth Token
3. 更新 `.env.local` 和 Vercel 环境变量

### 问题 3：`UNIQUE constraint failed: articles.slug`

**原因**：文章已存在于数据库中

**解决**：这是正常的，脚本会跳过已存在的文章

### 问题 4：管理员登录失败

**原因**：
- 密码错误
- JWT_SECRET 未配置
- 数据库连接失败

**解决**：
1. 重新运行 `npm run create-admin` 重置密码
2. 确认 `JWT_SECRET` 已配置在 `.env.local` 和 Vercel
3. 检查浏览器控制台和 Vercel 部署日志

---

## 📊 数据库表结构参考

### articles 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER PRIMARY KEY | 自增ID |
| title | TEXT NOT NULL | 文章标题 |
| slug | TEXT UNIQUE NOT NULL | URL slug (唯一) |
| category | TEXT | 分类 (tutorials, industry, case-studies, news) |
| excerpt | TEXT | 摘要 |
| content | TEXT | 文章内容 (HTML) |
| tags | TEXT | 标签 (JSON数组字符串) |
| status | TEXT DEFAULT 'draft' | 状态 (draft, published) |
| views | INTEGER DEFAULT 0 | 浏览次数 |
| published_at | TIMESTAMP | 发布时间 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### admins 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER PRIMARY KEY | 自增ID |
| username | TEXT UNIQUE NOT NULL | 用户名 |
| password | TEXT NOT NULL | 密码 (bcrypt hash) |
| email | TEXT UNIQUE NOT NULL | 邮箱 |
| display_name | TEXT | 显示名称 |
| role | TEXT DEFAULT 'admin' | 角色 |
| is_active | BOOLEAN DEFAULT TRUE | 是否激活 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

---

## 🎯 下一步操作

初始化完成后，你可以：

1. **自定义文章内容**
   - 访问 `/admin/articles` 编辑现有文章
   - 添加新文章、上传封面图片

2. **修改管理员密码**
   - 登录后台后立即修改默认密码
   - 使用强密码策略

3. **配置 Google Analytics**
   - 在 Vercel 添加 `NEXT_PUBLIC_GA_ID` 环境变量
   - 重新部署

4. **测试完整功能**
   - 计算器功能测试
   - 联系表单测试
   - SEO 优化验证

---

**最后更新**: 2025-10-30


































