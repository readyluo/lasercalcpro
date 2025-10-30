# 环境变量配置指南

## 📋 概述

LaserCalc Pro 使用环境变量来配置各种服务和功能。本指南将帮助你正确设置所有必需的环境变量。

## 🔧 配置步骤

### 1. 创建本地环境文件

在项目根目录创建 `.env.local` 文件：

```bash
touch .env.local
```

### 2. 基础配置

```env
# 网站 URL
NEXT_PUBLIC_SITE_URL=https://lasercalcpro.com
SITE_URL=https://lasercalcpro.com
```

### 3. Google Analytics 配置

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的 GA4 属性
3. 获取测量 ID（格式：G-XXXXXXXXXX）
4. 添加到环境变量：

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Google AdSense 配置

1. 访问 [Google AdSense](https://www.google.com/adsense/)
2. 申请账号并等待审核通过
3. 获取发布商 ID（格式：ca-pub-XXXXXXXXXXXXXXXX）
4. 添加到环境变量：

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

## 🚀 Vercel 部署配置

在 Vercel Dashboard 中配置环境变量：

1. 进入项目 Settings → Environment Variables
2. 添加以下变量：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `NEXT_PUBLIC_SITE_URL` | `https://lasercalcpro.com` | Production, Preview, Development |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Production |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-XXXXXXXXXXXXXXXX` | Production |

3. 点击 Save

## ☁️ Cloudflare Pages 配置

在 Cloudflare Dashboard 中配置环境变量：

1. 进入 Pages → 你的项目 → Settings → Environment variables
2. 添加以下变量：

**Production 环境**:
```
NEXT_PUBLIC_SITE_URL = https://lasercalcpro.com
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID = ca-pub-XXXXXXXXXXXXXXXX
```

**Preview 环境**:
```
NEXT_PUBLIC_SITE_URL = https://preview.lasercalcpro.com
```

3. 点击 Save

## 📊 D1 数据库配置

D1 数据库通过 `wrangler.toml` 配置，无需环境变量。

当前配置：
- **Database Name**: lasercalcpro-db
- **Database ID**: 028b72d6-7e87-4e27-ba37-1e3a8d250226
- **Binding**: DB

## 🔐 可选配置

### Email 通知（可选）

如果需要发送订阅确认邮件：

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@lasercalcpro.com
```

### Admin 认证（可选）

如果需要启用管理后台认证：

```env
NEXTAUTH_URL=https://lasercalcpro.com
NEXTAUTH_SECRET=your-secret-key-here
ADMIN_EMAIL=admin@lasercalcpro.com
ADMIN_PASSWORD=your-secure-password
```

生成 NEXTAUTH_SECRET：
```bash
openssl rand -base64 32
```

## ✅ 验证配置

### 本地验证

```bash
# 启动开发服务器
npm run dev

# 检查环境变量是否生效
# 打开 http://localhost:3000
# 检查浏览器控制台是否有 GA 初始化信息
```

### 生产验证

部署后访问网站：
1. 打开浏览器开发者工具 → Network 标签
2. 过滤 `google-analytics` 或 `adsense`
3. 确认请求正常发送

## 🔍 常见问题

### Q: Google Analytics 不工作？
**A**: 
1. 确认 `NEXT_PUBLIC_GA_ID` 格式正确（必须是 `G-` 开头）
2. 检查浏览器是否安装了广告拦截器
3. 等待 24-48 小时让 GA 开始收集数据

### Q: AdSense 广告不显示？
**A**: 
1. 确认 AdSense 账号已审核通过
2. 网站必须有一定流量才能投放广告
3. 检查广告代码是否正确放置
4. 确认没有被广告拦截器屏蔽

### Q: D1 数据库连接失败？
**A**: 
1. 确认 `wrangler.toml` 中的 database_id 正确
2. 确认已运行 `npm run db:init` 初始化数据库
3. 检查 Cloudflare Workers 绑定配置

### Q: 部署后环境变量不生效？
**A**: 
1. 确认在部署平台（Vercel/Cloudflare）配置了环境变量
2. 重新部署项目
3. 清除浏览器缓存

## 📝 环境变量清单

打印出来的检查清单：

- [ ] `NEXT_PUBLIC_SITE_URL` 已配置
- [ ] `NEXT_PUBLIC_GA_ID` 已配置（如使用 GA）
- [ ] `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 已配置（如使用 AdSense）
- [ ] Vercel/Cloudflare 环境变量已同步
- [ ] 本地 `.env.local` 已创建
- [ ] D1 数据库已初始化
- [ ] 环境变量在生产环境已验证

## 🚀 快速配置命令

```bash
# 1. 复制环境变量模板（如果存在）
cp .env.example .env.local

# 2. 编辑环境变量
nano .env.local

# 3. 初始化 D1 数据库
npm run db:init

# 4. 启动开发服务器测试
npm run dev

# 5. 构建生产版本测试
npm run build
```

## 📚 相关文档

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration#environment-variables)
- [Google Analytics Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Google AdSense Getting Started](https://support.google.com/adsense/answer/6242051)

---

**需要帮助？** 查看 [GitHub Issues](https://github.com/readyluo/lasercalcpro/issues) 或联系 support@lasercalcpro.com

