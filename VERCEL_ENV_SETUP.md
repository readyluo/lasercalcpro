# Vercel环境变量配置指南

## ⚠️ 当前问题诊断

您的网站 Blog 和 Admin 页面显示 "Loading..." 或报错，是因为 **Vercel 生产环境缺少必需的数据库环境变量**。

---

## 🔧 立即修复步骤

### 步骤 1: 登录 Vercel Dashboard

1. 访问：https://vercel.com/yigetechs-projects/lasercalcpro
2. 点击顶部导航的 **"Settings"** 标签页
3. 在左侧菜单点击 **"Environment Variables"**

### 步骤 2: 添加必需的环境变量

添加以下变量（**所有三个环境都要勾选**: Production, Preview, Development）：

#### 数据库配置（必需）

| Variable Name | Value | 说明 |
|--------------|-------|------|
| `TURSO_DATABASE_URL` | `libsql://your-db.turso.io` | Turso 数据库 URL |
| `TURSO_AUTH_TOKEN` | `eyJ...` | Turso 认证 Token |

#### 后台认证（必需）

| Variable Name | Value | 说明 |
|--------------|-------|------|
| `JWT_SECRET` | 任意32位以上随机字符串 | 后台JWT加密密钥 |

#### 站点配置（推荐）

| Variable Name | Value |
|--------------|-------|
| `SITE_URL` | `https://www.lasercalcpro.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.lasercalcpro.com` |

### 步骤 3: 获取 Turso 数据库凭据

如果您还没有 Turso 数据库：

1. 访问 https://turso.tech/
2. 登录或注册账号
3. 创建新数据库
4. 在数据库详情页获取：
   - **Database URL**: `libsql://xxx.turso.io`
   - **Auth Token**: 点击 "Create Token" 生成

### 步骤 4: 在 Vercel 中添加变量

对于每个变量：

1. 点击 **"Add New"** 按钮
2. **Key**: 输入变量名（如 `TURSO_DATABASE_URL`）
3. **Value**: 粘贴对应的值
4. **Environments**: ✅ 勾选所有三个（Production, Preview, Development）
5. 点击 **"Save"**

### 步骤 5: 重新部署

添加完所有变量后：

1. 返回 **Deployments** 标签页
2. 找到最新的部署
3. 点击右侧的 **"..." 菜单**
4. 选择 **"Redeploy"**
5. 等待2-3分钟构建完成

---

## ✅ 验证修复

部署完成后，访问以下页面确认正常：

- ✅ Blog 列表：https://www.lasercalcpro.com/blog
- ✅ Admin 登录：https://www.lasercalcpro.com/admin/login
- ✅ 计算器列表：https://www.lasercalcpro.com/calculators

如果 Blog 显示 "No articles found"，这是正常的（数据库为空）。

---

## 🎯 本地开发设置

对于本地开发：

1. 复制 `.env.example` 为 `.env.local`
2. 填入相同的环境变量值
3. 运行 `npm run dev`

---

## 🔍 故障排查

### Blog 页面仍然显示 Loading...

1. 检查 Vercel Dashboard → Deployments → 最新部署 → Runtime Logs
2. 查找错误信息：
   - "TURSO_DATABASE_URL environment variable is not set"
   - "TURSO_AUTH_TOKEN environment variable is not set"
3. 确认环境变量已正确添加并且重新部署了

### Admin 页面无法登录

1. 确认 `JWT_SECRET` 已设置
2. 确认数据库中有管理员账户
3. 运行初始化脚本创建管理员：
   ```bash
   npm run create-admin
   ```

### 环境变量不生效

- ⚠️ **重要**：修改环境变量后必须重新部署才能生效
- 环境变量不会自动应用到已存在的部署

---

## 📋 完整环境变量清单

参考 `.env.example` 文件获取完整的环境变量列表和说明。

**必需变量（Blog/Admin功能）:**
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `JWT_SECRET`

**可选变量:**
- `NEXT_PUBLIC_GA_ID` - Google Analytics
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - 邮件发送
- `SITE_URL`, `NEXT_PUBLIC_SITE_URL` - 站点URL

---

## 🆘 需要帮助？

如果按照以上步骤操作后仍有问题：

1. 检查 Vercel 部署日志中的详细错误信息
2. 确认所有环境变量名称拼写正确（区分大小写）
3. 确认环境变量值中没有多余的空格或引号
4. 确认已勾选所有三个环境（Production, Preview, Development）

---

**最后更新**: 2025-10-30

