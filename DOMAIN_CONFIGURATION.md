# 域名配置指南

## 📋 概述

本指南将帮助你将自定义域名 `lasercalcpro.com` 配置到 Vercel 部署上。

## 🌐 前提条件

- ✅ 已拥有域名 `lasercalcpro.com`
- ✅ 可以访问域名注册商的 DNS 设置
- ✅ Vercel 项目已成功部署

## 🚀 Vercel 域名配置

### 步骤 1: 添加域名到 Vercel

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目 `lasercalcpro`
3. 进入 **Settings** → **Domains**
4. 点击 **Add Domain**
5. 输入域名：
   - `lasercalcpro.com` (主域名)
   - `www.lasercalcpro.com` (WWW 子域名)
6. 点击 **Add**

### 步骤 2: 配置 DNS 记录

Vercel 会提供 DNS 配置说明。根据你的情况选择：

#### 选项 A: 使用 Vercel Nameservers（推荐）

**优点**: 自动管理、最快解析、免费 SSL

1. Vercel 会显示类似的 nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

2. 在你的域名注册商（例如 Cloudflare, GoDaddy, Namecheap）:
   - 找到 "Nameservers" 或"DNS 设置"
   - 将 nameservers 改为 Vercel 提供的值
   - 保存更改

3. 等待 DNS 传播（通常 10-30 分钟，最多 48 小时）

4. 回到 Vercel，点击 **Refresh** 验证

#### 选项 B: 使用 A 记录和 CNAME（如果不能更改 nameservers）

1. 在你的 DNS 提供商添加以下记录：

**对于根域名 (lasercalcpro.com)**:
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 300 (或最小值)
```

**对于 WWW 子域名**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300
```

2. 保存 DNS 记录

3. 等待 DNS 传播

4. 回到 Vercel 验证

## ☁️ 如果使用 Cloudflare DNS

### Cloudflare 特殊配置

由于你的域名已经使用 Cloudflare DNS，配置更简单：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择你的域名 `lasercalcpro.com`
3. 进入 **DNS** → **Records**

### 添加 DNS 记录

**记录 1: 根域名 A 记录**
```
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: DNS only (灰色云朵，关闭代理)
TTL: Auto
```

**记录 2: WWW CNAME 记录**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (灰色云朵，关闭代理)
TTL: Auto
```

⚠️ **重要**: 
- 必须设置为 "DNS only" (灰色云朵)
- 不要启用 Cloudflare 代理（橙色云朵），否则会与 Vercel 冲突

### 配置重定向（可选）

如果想让 `www.lasercalcpro.com` 自动跳转到 `lasercalcpro.com`:

1. 在 Cloudflare: **Rules** → **Page Rules**
2. 创建规则:
   ```
   URL: www.lasercalcpro.com/*
   Setting: Forwarding URL (301 Permanent Redirect)
   Destination: https://lasercalcpro.com/$1
   ```

或者在 Vercel 项目的 `next.config.js` 中已配置：
```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.lasercalcpro.com' }],
      destination: 'https://lasercalcpro.com/:path*',
      permanent: true,
    },
  ];
}
```

## 🔒 SSL 证书

### Vercel SSL（自动）

Vercel 会自动：
- ✅ 为你的域名申请 Let's Encrypt SSL 证书
- ✅ 自动更新证书
- ✅ 强制 HTTPS 重定向
- ✅ 支持 HTTP/2

### 验证 SSL

域名配置后，检查：
```bash
# 测试域名解析
nslookup lasercalcpro.com

# 测试 HTTPS
curl -I https://lasercalcpro.com

# 检查 SSL 证书
openssl s_client -connect lasercalcpro.com:443 -servername lasercalcpro.com
```

## ✅ 验证配置

### 检查清单

1. **DNS 解析**
   ```bash
   dig lasercalcpro.com
   dig www.lasercalcpro.com
   ```
   应该看到 Vercel 的 IP 地址

2. **HTTP 访问**
   ```bash
   curl http://lasercalcpro.com
   ```
   应该重定向到 HTTPS

3. **HTTPS 访问**
   ```bash
   curl https://lasercalcpro.com
   ```
   应该返回网站内容

4. **WWW 重定向**
   ```bash
   curl -I https://www.lasercalcpro.com
   ```
   应该 301 重定向到主域名

### 在线工具验证

- DNS 传播: https://dnschecker.org/
- SSL 检查: https://www.ssllabs.com/ssltest/
- 页面速度: https://pagespeed.web.dev/

## 🐛 常见问题

### Q: DNS 已配置但域名无法访问？
**A**: 
1. 检查 DNS 传播状态（使用 dnschecker.org）
2. 清除浏览器缓存和 DNS 缓存：
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   ```
3. 等待完全传播（最多 48 小时）

### Q: SSL 证书错误？
**A**: 
1. 确认 DNS 记录正确
2. 在 Vercel 点击 "Refresh" 重新申请证书
3. 等待 5-10 分钟让证书生效

### Q: Cloudflare 代理问题？
**A**: 
1. 确保 DNS 记录设为 "DNS only"（灰色云朵）
2. 不要同时使用 Cloudflare 代理和 Vercel
3. 如果需要 Cloudflare CDN，使用 Cloudflare Pages 而非 Vercel

### Q: 网站显示 404？
**A**: 
1. 确认 Vercel 部署成功
2. 检查域名是否正确添加到项目
3. 检查 `next.config.js` 中的域名配置

## 📊 性能优化

### CDN 配置

Vercel 自带全球 CDN，无需额外配置：
- ✅ 自动边缘缓存
- ✅ 智能路由
- ✅ 图片优化
- ✅ 压缩传输

### 缓存策略

在 `next.config.js` 中已配置：
```javascript
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

## 📝 配置后清单

部署完成后：

- [ ] lasercalcpro.com 可以访问
- [ ] www.lasercalcpro.com 重定向到主域名
- [ ] HTTPS 正常工作（绿色锁）
- [ ] 所有页面正常加载
- [ ] 移动端响应式正常
- [ ] 计算器功能正常
- [ ] Google Analytics 正常追踪
- [ ] SSL Labs 评级 A+

## 🎯 下一步

域名配置完成后：

1. **更新环境变量**
   ```env
   NEXT_PUBLIC_SITE_URL=https://lasercalcpro.com
   ```

2. **提交 Sitemap 到 Google**
   - Google Search Console
   - Sitemap URL: https://lasercalcpro.com/sitemap.xml

3. **配置分析工具**
   - Google Analytics
   - Google Search Console
   - Vercel Analytics

4. **社交媒体更新**
   - Twitter
   - LinkedIn
   - Facebook

## 📚 参考资源

- [Vercel 自定义域名文档](https://vercel.com/docs/concepts/projects/domains)
- [Cloudflare DNS 文档](https://developers.cloudflare.com/dns/)
- [Let's Encrypt SSL 文档](https://letsencrypt.org/docs/)

---

**需要帮助？** 
- Vercel Support: https://vercel.com/support
- GitHub Issues: https://github.com/readyluo/lasercalcpro/issues
- Email: support@lasercalcpro.com

祝你配置顺利！🚀

