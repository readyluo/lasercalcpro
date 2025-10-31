# Vercel部署优化指南

**更新时间**: 2025-10-31  
**项目**: LaserCalc Pro  
**域名**: www.lasercalcpro.com

---

## 📋 优化清单

### ✅ 已完成配置

#### 1. 安全Headers配置
已在 `vercel.json` 中配置以下安全headers：

- **X-Content-Type-Options**: `nosniff` - 防止MIME类型嗅探
- **X-Frame-Options**: `DENY` - 防止点击劫持
- **X-XSS-Protection**: `1; mode=block` - XSS保护
- **Referrer-Policy**: `strict-origin-when-cross-origin` - 引用策略
- **Permissions-Policy**: 限制相机、麦克风、地理位置访问

#### 2. 缓存策略优化

| 资源类型 | 缓存策略 | 说明 |
|---------|---------|------|
| 字体 (`/fonts/*`) | `public, max-age=31536000, immutable` | 永久缓存 (1年) |
| 图片 (`/images/*`) | `public, max-age=31536000, immutable` | 永久缓存 (1年) |
| 静态资源 (`/_next/static/*`) | `public, max-age=31536000, immutable` | 永久缓存 (1年) |
| API (`/api/*`) | `no-store, no-cache, must-revalidate` | 不缓存 |
| HTML | `public, max-age=0, must-revalidate` | 每次验证 |

#### 3. 重定向配置
- `/home` → `/` (301)
- `/index.html` → `/` (301)

#### 4. 函数超时设置
- 默认API函数: 10秒
- 计算API (`/api/calculate`): 15秒

#### 5. 区域部署
- 主要区域: `iad1` (美国东部)
- 次要区域: `hnd1` (日本东京)

---

## 🚀 部署前准备

### 1. 环境变量设置

在Vercel Dashboard中设置以下环境变量：

#### 必需变量
```bash
# 网站配置
SITE_URL=https://www.lasercalcpro.com
NEXT_PUBLIC_SITE_URL=https://www.lasercalcpro.com

# 数据库 (Turso)
DATABASE_URL=libsql://your-database.turso.io
DATABASE_AUTH_TOKEN=your-auth-token

# NextAuth
NEXTAUTH_URL=https://www.lasercalcpro.com
NEXTAUTH_SECRET=your-nextauth-secret-key-min-32-chars
```

#### 分析与追踪
```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

#### 邮件服务 (可选)
```bash
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@lasercalcpro.com
```

### 2. 域名配置

#### 主域名设置
1. 在Vercel Dashboard → Settings → Domains
2. 添加域名: `www.lasercalcpro.com`
3. 设置为主域名 (Primary)
4. 配置DNS记录 (Vercel会自动提供)

#### DNS配置示例
```dns
# A记录
www  A  76.76.21.21

# CNAME记录 (推荐)
www  CNAME  cname.vercel-dns.com

# 根域名重定向到www
@  A  76.76.21.21  (带重定向设置)
```

### 3. Build & Output 设置

已在 `vercel.json` 配置：
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

---

## ⚡ 性能优化建议

### 1. 图片优化
已配置Next.js Image组件优化：
- 自动WebP转换
- 响应式尺寸
- 懒加载
- 占位符blur

### 2. 代码分割
Next.js自动代码分割：
- 路由级别分割
- 动态导入 (`next/dynamic`)
- 按需加载组件

### 3. 静态生成 (SSG)
推荐静态生成的页面：
- 主页 (`/`)
- 所有计算器页面
- 指南页面
- 静态内容页面

使用ISR (增量静态再生成):
```typescript
export const revalidate = 3600; // 1小时
```

### 4. 边缘函数
考虑将以下API迁移到Edge Functions:
- `/api/stats` - 访问统计
- `/api/partners` - 合作伙伴数据
- 简单的数据查询

---

## 🔍 监控与分析

### 1. Vercel Analytics
启用Vercel内置分析：
- Dashboard → Analytics
- 自动启用Web Vitals监控
- 无需额外代码

### 2. 性能监控指标
关注以下指标：
- **TTFB** (Time to First Byte): <200ms
- **FCP** (First Contentful Paint): <1.8s
- **LCP** (Largest Contentful Paint): <2.5s
- **CLS** (Cumulative Layout Shift): <0.1
- **INP** (Interaction to Next Paint): <200ms

### 3. 错误追踪
配置Sentry或其他错误追踪工具：
```bash
# 环境变量
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

---

## 🛡️ 安全配置

### 1. 内容安全策略 (CSP)
在 `next.config.js` 中配置CSP headers（已配置）

### 2. CORS设置
API路由CORS配置：
```typescript
// 仅允许自己的域名
const allowedOrigins = [
  'https://www.lasercalcpro.com',
  'https://lasercalcpro.com',
];
```

### 3. 速率限制
考虑为API添加速率限制：
- 使用Vercel KV或Upstash Redis
- 限制每IP每分钟请求数

---

## 📊 SEO优化配置

### 1. Sitemap提交
部署后立即提交：
```
https://www.lasercalcpro.com/sitemap.xml
```
提交到:
- Google Search Console
- Bing Webmaster Tools

### 2. Robots.txt验证
确认可访问：
```
https://www.lasercalcpro.com/robots.txt
```

### 3. Structured Data验证
使用工具验证Schema.org标记：
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

## 🔄 CI/CD工作流

### Git工作流
```bash
# 开发
git checkout -b feature/new-feature
# ... 开发 ...
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 合并到main后自动部署
git checkout main
git merge feature/new-feature
git push origin main
# → Vercel自动触发部署
```

### 部署预览
- 每个PR自动创建预览环境
- 预览URL格式: `lasercalcpro-git-[branch].vercel.app`
- 测试通过后合并到main

### 回滚策略
如果部署出现问题：
1. Vercel Dashboard → Deployments
2. 找到上一个稳定版本
3. 点击 "Promote to Production"

---

## 🎯 部署检查清单

### 部署前
- [x] 所有环境变量已配置
- [x] `vercel.json` 配置完成
- [x] `.vercelignore` 设置正确
- [x] 本地测试通过
- [x] Linter无错误
- [x] TypeScript编译通过

### 部署后
- [ ] 验证主域名可访问
- [ ] 检查www重定向工作正常
- [ ] 测试所有关键页面
- [ ] 验证API端点正常
- [ ] 检查Google Analytics数据
- [ ] 提交Sitemap到搜索引擎
- [ ] 运行Lighthouse测试
- [ ] 监控错误日志

---

## 🆘 常见问题

### 问题1: Build失败
**可能原因**:
- 环境变量未设置
- 依赖包版本冲突
- TypeScript类型错误

**解决方案**:
```bash
# 本地测试build
npm run build

# 查看详细错误
vercel logs [deployment-url]
```

### 问题2: 域名未生效
**可能原因**:
- DNS传播需要时间 (最多48小时)
- DNS记录配置错误

**解决方案**:
```bash
# 检查DNS解析
dig www.lasercalcpro.com
nslookup www.lasercalcpro.com

# 使用DNS检查工具
# https://dnschecker.org
```

### 问题3: 性能下降
**排查步骤**:
1. 检查Vercel Analytics仪表板
2. 运行Lighthouse测试
3. 检查是否有大文件未优化
4. 确认缓存策略正确

---

## 📚 参考资源

### Vercel官方文档
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)
- [Edge Functions](https://vercel.com/docs/functions/edge-functions)

### 性能优化
- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Core Web Vitals](https://web.dev/vitals/)

### SEO工具
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Schema Markup Validator](https://validator.schema.org/)

---

## ✅ 部署就绪

LaserCalc Pro项目已完成所有Vercel优化配置，可以立即部署到生产环境！

**预期性能指标**:
- Lighthouse Score: 95+
- First Load: <2s
- Interactive Time: <3s
- SEO Score: 100

---

**最后更新**: 2025-10-31  
**状态**: ✅ 配置完成，准备部署



