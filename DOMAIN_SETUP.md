# LaserCalc Pro - 域名配置与双语架构指南

**域名**: lasercalcpro.com  
**更新日期**: 2025年10月30日

---

## 🌐 域名配置步骤

### 1. 购买域名

推荐注册商：
- **Cloudflare Registrar** (推荐，$9.77/年，无隐藏费用)
- **Namecheap** ($10.98/年)
- **GoDaddy** ($11.99/年)

**域名**: lasercalcpro.com

### 2. Cloudflare DNS配置

登录Cloudflare Dashboard，添加站点 lasercalcpro.com：

```
A记录配置：
类型: A
名称: @
内容: 192.0.2.1 (Cloudflare Pages会自动处理)
代理: 已开启（橙色云朵）
TTL: 自动

A记录配置（www）:
类型: CNAME
名称: www
内容: lasercalcpro.com
代理: 已开启
TTL: 自动
```

### 3. Cloudflare Pages绑定

1. 进入 Cloudflare Dashboard > Pages
2. 选择你的项目 > Custom domains
3. 添加 lasercalcpro.com 和 www.lasercalcpro.com
4. 系统自动配置SSL/TLS证书（Let's Encrypt）

### 4. SSL/TLS设置

```
SSL/TLS加密模式: Full (strict)
最低TLS版本: TLS 1.2
自动HTTPS重写: 开启
始终使用HTTPS: 开启
```

### 5. 性能优化设置

```bash
# Cloudflare 速度优化
Caching > Configuration:
- 缓存级别: Standard
- 浏览器缓存TTL: 4小时

Speed > Optimization:
- Auto Minify: HTML, CSS, JS全选
- Brotli: 开启
- Early Hints: 开启
- Rocket Loader: 关闭（Next.js已优化）

# Cloudflare Workers
- 使用Workers处理API请求
- 边缘计算加速数据库查询
```

---

## 🌍 双语架构详细说明

### 语言分离原则

```
前台（面向用户）                  后台（面向管理员）
────────────────                 ────────────────
✓ 纯英文界面                      ✓ 纯中文界面
✓ SEO优化                        ✓ 管理便捷
✓ 国际化友好                      ✓ 快速上手
✓ 专业术语                        ✓ 直观易懂
```

### URL路由结构

```
前台英文路由 (Public):
├── /                           # 首页 - Home
├── /calculators                # 计算器列表
│   ├── /laser-cutting          # 激光切割计算器
│   ├── /cnc-machining          # CNC加工估算器
│   ├── /roi                    # ROI计算器
│   ├── /energy                 # 能源成本计算器
│   └── /material-utilization   # 材料利用率计算器
├── /blog                       # 博客文章
│   ├── /tutorials              # 教程分类
│   ├── /industry-news          # 行业新闻
│   └── /case-studies           # 案例研究
├── /about                      # 关于我们
├── /contact                    # 联系我们
├── /privacy                    # 隐私政策
├── /terms                      # 使用条款
└── /disclaimer                 # 免责声明

后台中文路由 (Admin Only):
├── /admin                      # 仪表板（需要登录）
├── /admin/login                # 登录页（唯一公开页面）
├── /admin/dashboard            # 数据概览
├── /admin/content              # 内容管理
│   ├── /admin/content/articles # 文章列表
│   ├── /admin/content/new      # 新建文章
│   └── /admin/content/edit/:id # 编辑文章
├── /admin/analytics            # 数据分析
│   ├── /admin/analytics/traffic    # 流量统计
│   ├── /admin/analytics/tools      # 工具使用
│   └── /admin/analytics/revenue    # 收入报表
├── /admin/subscribers          # 订阅用户管理
├── /admin/calculations         # 计算记录查询
├── /admin/seo                  # SEO监控
└── /admin/settings             # 系统设置
```

### 文本管理系统

```typescript
// lib/i18n/en.ts - 前台英文
export const en = {
  // 导航
  nav: {
    home: 'Home',
    calculators: 'Calculators',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
  },

  // 首页
  home: {
    hero: {
      title: 'Professional Manufacturing Cost Calculators',
      subtitle: 'Free, accurate tools for laser cutting, CNC machining, and equipment ROI analysis.',
      cta: 'Start Calculating',
    },
    features: {
      title: 'Why Choose LaserCalc Pro?',
      free: {
        title: '100% Free',
        desc: 'No hidden fees, no credit card required',
      },
      accurate: {
        title: 'Industry Accurate',
        desc: 'Based on real manufacturing data',
      },
      instant: {
        title: 'Instant Results',
        desc: 'Get detailed cost breakdown in seconds',
      },
    },
  },

  // 计算器通用
  calculator: {
    calculate: 'Calculate',
    reset: 'Reset',
    exportPdf: 'Export PDF',
    saveHistory: 'Save to History',
    loading: 'Calculating...',
    error: 'Please check your inputs',
  },

  // 激光切割计算器
  laserCutting: {
    title: 'Laser Cutting Cost Calculator',
    description: 'Calculate precise costs for your laser cutting projects',
    inputs: {
      materialType: 'Material Type',
      thickness: 'Thickness (mm)',
      cuttingLength: 'Cutting Length (mm)',
      laserPower: 'Laser Power (kW)',
      electricityRate: 'Electricity Rate ($/kWh)',
      laborRate: 'Labor Rate ($/hour)',
    },
    results: {
      title: 'Cost Breakdown',
      materialCost: 'Material Cost',
      powerCost: 'Power Cost',
      laborCost: 'Labor Cost',
      totalCost: 'Total Cost',
      suggestedPrice: 'Suggested Retail Price',
    },
  },

  // 页脚
  footer: {
    description: 'Professional cost calculation tools for the manufacturing industry',
    copyright: '© 2025 LaserCalc Pro. All rights reserved.',
    disclaimer: 'All calculations are estimates. Actual costs may vary.',
  },
};

// lib/i18n/zh.ts - 后台中文
export const zh = {
  // 登录
  login: {
    title: '管理员登录',
    username: '用户名',
    password: '密码',
    remember: '记住登录状态',
    submit: '登录',
    forgotPassword: '忘记密码？',
  },

  // 侧边栏导航
  sidebar: {
    dashboard: '仪表板',
    content: '内容管理',
    analytics: '数据分析',
    subscribers: '订阅管理',
    calculations: '计算记录',
    seo: 'SEO监控',
    settings: '系统设置',
    logout: '退出登录',
  },

  // 仪表板
  dashboard: {
    title: '数据概览',
    welcome: '欢迎回来',
    metrics: {
      todayVisits: '今日访问',
      totalUsers: '总用户数',
      calculations: '计算次数',
      subscribers: '订阅用户',
      revenue: 'AdSense收入',
      conversionRate: '转化率',
    },
    charts: {
      trafficTrend: '流量趋势（最近30天）',
      popularTools: '热门工具排行',
      userSources: '用户来源分布',
      revenueChart: '收入趋势',
    },
    recentActivity: '最近活动',
  },

  // 内容管理
  content: {
    title: '内容管理',
    articles: '文章列表',
    addNew: '新建文章',
    edit: '编辑',
    delete: '删除',
    publish: '发布',
    unpublish: '取消发布',
    draft: '草稿',
    published: '已发布',
    filters: {
      all: '全部',
      published: '已发布',
      draft: '草稿',
      archived: '已归档',
    },
    fields: {
      title: '文章标题',
      slug: 'URL路径',
      category: '分类',
      tags: '标签',
      author: '作者',
      status: '状态',
      publishDate: '发布日期',
      views: '浏览量',
    },
    editor: {
      title: '文章编辑器',
      basicInfo: '基本信息',
      content: '正文内容',
      seo: 'SEO优化',
      preview: '预览',
      save: '保存',
      cancel: '取消',
    },
  },

  // 数据分析
  analytics: {
    title: '数据分析',
    overview: '概览',
    traffic: '流量分析',
    tools: '工具使用统计',
    seo: 'SEO数据',
    revenue: '收入统计',
    export: '导出报表',
    dateRange: {
      today: '今天',
      yesterday: '昨天',
      last7days: '最近7天',
      last30days: '最近30天',
      thisMonth: '本月',
      lastMonth: '上月',
      custom: '自定义',
    },
  },

  // 订阅管理
  subscribers: {
    title: '订阅用户管理',
    total: '总订阅数',
    confirmed: '已确认',
    unconfirmed: '未确认',
    export: '导出列表',
    search: '搜索邮箱',
    fields: {
      email: '邮箱地址',
      source: '订阅来源',
      date: '订阅日期',
      status: '状态',
      actions: '操作',
    },
    actions: {
      view: '查看',
      sendEmail: '发送邮件',
      unsubscribe: '取消订阅',
      delete: '删除',
    },
  },

  // 计算记录
  calculations: {
    title: '计算记录',
    total: '总计算次数',
    today: '今日计算',
    filters: {
      tool: '工具类型',
      dateRange: '日期范围',
      country: '国家/地区',
    },
    fields: {
      tool: '使用工具',
      params: '输入参数',
      result: '计算结果',
      userIp: '用户IP',
      location: '位置',
      time: '时间',
    },
  },

  // SEO监控
  seo: {
    title: 'SEO监控',
    keywords: '关键词排名',
    backlinks: '外链监控',
    indexStatus: '索引状态',
    performance: '性能指标',
    addKeyword: '添加关键词',
    fields: {
      keyword: '关键词',
      position: '排名',
      change: '变化',
      volume: '搜索量',
      difficulty: '难度',
      url: '目标页面',
    },
  },

  // 系统设置
  settings: {
    title: '系统设置',
    general: '基本设置',
    seo: 'SEO设置',
    adsense: 'AdSense配置',
    email: '邮件设置',
    backup: '数据备份',
    fields: {
      siteName: '网站名称',
      siteUrl: '网站URL',
      adminEmail: '管理员邮箱',
      timezone: '时区',
      language: '默认语言',
    },
    save: '保存设置',
    saved: '设置已保存',
  },

  // 通用
  common: {
    actions: '操作',
    view: '查看',
    edit: '编辑',
    delete: '删除',
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    close: '关闭',
    loading: '加载中...',
    noData: '暂无数据',
    search: '搜索',
    filter: '筛选',
    export: '导出',
    import: '导入',
    refresh: '刷新',
    success: '操作成功',
    error: '操作失败',
    confirmDelete: '确定要删除吗？此操作不可恢复。',
  },
};
```

---

## 🔐 安全配置

### robots.txt 配置

```txt
# lasercalcpro.com/robots.txt

# 允许搜索引擎索引前台
User-agent: *
Allow: /
Allow: /calculators/
Allow: /blog/

# 禁止索引后台管理
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: https://lasercalcpro.com/sitemap.xml
Sitemap: https://lasercalcpro.com/blog-sitemap.xml
```

### 中间件保护（middleware.ts）

```typescript
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // 后台路由需要认证
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const token = req.nextauth.token;
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // /admin/login 可以访问
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        // 其他 /admin 路由需要token
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token;
        }
        // 其他路由都允许
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## 📊 性能监控

### Cloudflare Analytics

```javascript
// 在 Cloudflare Dashboard 中启用
Analytics > Web Analytics
- 跟踪页面浏览量
- 用户地理位置
- 设备类型
- 浏览器分布

// 自定义事件追踪
window.cloudflareAnalytics = {
  track: (eventName, eventData) => {
    if (window.CloudflareInsight) {
      window.CloudflareInsight.track(eventName, eventData);
    }
  }
};
```

### Google Analytics 4

```typescript
// app/layout.tsx - 仅在前台添加
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🚀 部署清单

### 域名购买后立即执行

- [ ] 将域名添加到Cloudflare
- [ ] 配置DNS记录（A记录和CNAME）
- [ ] 开启SSL/TLS（Full Strict模式）
- [ ] 配置重定向规则（www → non-www）
- [ ] 开启Always Use HTTPS
- [ ] 配置页面规则（缓存策略）

### Cloudflare Pages部署

- [ ] 连接GitHub仓库
- [ ] 设置构建命令：`npm run build`
- [ ] 设置输出目录：`.next`
- [ ] 添加环境变量
- [ ] 绑定自定义域名 lasercalcpro.com
- [ ] 测试部署预览

### 环境变量配置

```bash
# Cloudflare Pages环境变量
NODE_ENV=production
SITE_URL=https://lasercalcpro.com

# 数据库
DATABASE_URL=<D1_DATABASE_URL>

# NextAuth
NEXTAUTH_URL=https://lasercalcpro.com
NEXTAUTH_SECRET=<生成的随机密钥>

# Google Services
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx

# 管理员（首次设置）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<强密码>
```

### DNS传播检查

部署后使用以下工具检查DNS：
- https://dnschecker.org
- https://www.whatsmydns.net

预期传播时间：24-48小时（通常几小时内完成）

---

## 📝 域名使用总结

### 主域名
- **lasercalcpro.com** - 主站点，所有前台和后台流量

### 子域名（可选，未来扩展）
- **api.lasercalcpro.com** - API服务（如需独立API）
- **cdn.lasercalcpro.com** - 静态资源CDN
- **blog.lasercalcpro.com** - 独立博客（如需）

### 邮箱配置（可选）
- **admin@lasercalcpro.com** - 管理员邮箱
- **support@lasercalcpro.com** - 客户支持
- **noreply@lasercalcpro.com** - 系统邮件

---

**配置完成后，访问**:
- 🌍 前台: https://lasercalcpro.com
- 🔐 后台: https://lasercalcpro.com/admin/login

**域名正式启用！** 🎉

