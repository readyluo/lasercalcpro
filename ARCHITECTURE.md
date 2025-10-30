# LaserCalc Pro - 系统架构详细设计

**域名**: lasercalcpro.com  
**版本**: v1.0  
**更新日期**: 2025年10月30日

---

## 🌐 双语架构设计

### 语言分离策略

```
┌─────────────────────────────────────────────────┐
│           lasercalcpro.com                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  FRONTEND (Public)          BACKEND (Admin)    │
│  ✅ 纯英文界面                 ✅ 纯中文界面       │
│  ✅ SEO优化                   ✅ 管理友好         │
│  ✅ 面向国际用户                ✅ 运营便捷        │
│                                                 │
│  Routes:                    Routes:            │
│  /                          /admin              │
│  /calculators/*             /admin/login        │
│  /blog/*                    /admin/dashboard    │
│  /about                     /admin/content      │
│  /contact                   /admin/analytics    │
│  /privacy                   /admin/subscribers  │
│  /terms                     /admin/settings     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 语言文本管理

```typescript
// lib/i18n/en.ts - 前台英文文本
export const en = {
  nav: {
    home: 'Home',
    calculators: 'Calculators',
    blog: 'Blog',
    about: 'About Us',
    contact: 'Contact',
  },
  hero: {
    title: 'Professional Manufacturing Cost Calculators',
    subtitle: 'Free, accurate cost estimation tools for laser cutting, CNC machining, and equipment ROI analysis.',
    cta: {
      calculate: 'Start Calculating',
      learn: 'Learn More',
    },
  },
  calculators: {
    laserCutting: {
      title: 'Laser Cutting Cost Calculator',
      description: 'Calculate precise costs for laser cutting projects',
      fields: {
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
        gasCost: 'Assist Gas Cost',
        depreciation: 'Equipment Depreciation',
        totalCost: 'Total Cost',
        suggestedPrice: 'Suggested Retail Price',
        profitMargin: 'Profit Margin',
      },
      actions: {
        calculate: 'Calculate Cost',
        reset: 'Reset',
        exportPdf: 'Export PDF Report',
        saveHistory: 'Save to History',
      },
    },
    // 更多计算器...
  },
  footer: {
    description: 'Professional cost calculation tools for manufacturing industry',
    links: {
      tools: 'Tools',
      resources: 'Resources',
      company: 'Company',
      legal: 'Legal',
    },
    copyright: '© 2025 LaserCalc Pro. All rights reserved.',
    disclaimer: 'Results are estimates. Actual costs may vary.',
  },
};

// lib/i18n/zh.ts - 后台中文文本
export const zh = {
  admin: {
    login: {
      title: '管理员登录',
      username: '用户名',
      password: '密码',
      remember: '记住我',
      submit: '登录',
      error: '用户名或密码错误',
    },
    nav: {
      dashboard: '仪表板',
      content: '内容管理',
      analytics: '数据分析',
      subscribers: '订阅管理',
      calculations: '计算记录',
      settings: '系统设置',
      logout: '退出登录',
    },
    dashboard: {
      title: '数据概览',
      metrics: {
        todayVisits: '今日访问',
        totalUsers: '总用户数',
        calculations: '计算次数',
        subscribers: '订阅用户',
        revenue: 'AdSense收入',
      },
      charts: {
        trafficTrend: '流量趋势',
        popularTools: '热门工具',
        userSources: '用户来源',
      },
    },
    content: {
      title: '内容管理',
      articles: '文章列表',
      add: '新增文章',
      edit: '编辑',
      delete: '删除',
      publish: '发布',
      draft: '草稿',
      fields: {
        title: '标题',
        slug: '链接',
        category: '分类',
        tags: '标签',
        status: '状态',
        publishDate: '发布日期',
        author: '作者',
      },
    },
    analytics: {
      title: '数据分析',
      overview: '概览',
      traffic: '流量分析',
      tools: '工具使用',
      seo: 'SEO数据',
      revenue: '收入统计',
      filters: {
        today: '今天',
        week: '本周',
        month: '本月',
        year: '今年',
        custom: '自定义',
      },
    },
    subscribers: {
      title: '订阅用户管理',
      total: '总订阅数',
      verified: '已验证',
      unverified: '未验证',
      export: '导出列表',
      fields: {
        email: '邮箱',
        source: '来源',
        date: '订阅日期',
        status: '状态',
        actions: '操作',
      },
    },
    calculations: {
      title: '计算记录',
      total: '总计算次数',
      filters: {
        tool: '工具类型',
        date: '日期范围',
      },
      fields: {
        tool: '工具',
        params: '参数',
        result: '结果',
        userIp: '用户IP',
        time: '时间',
      },
    },
    settings: {
      title: '系统设置',
      general: '基本设置',
      seo: 'SEO设置',
      adsense: 'AdSense设置',
      email: '邮件设置',
      backup: '数据备份',
      fields: {
        siteName: '网站名称',
        siteUrl: '网站URL',
        adminEmail: '管理员邮箱',
        timezone: '时区',
        adsenseId: 'AdSense ID',
      },
    },
  },
};

// lib/i18n/index.ts - 语言切换逻辑
export function getTexts(locale: 'en' | 'zh') {
  return locale === 'zh' ? zh : en;
}

// 前台页面使用英文
export const useEnglish = () => en;

// 后台页面使用中文
export const useChinese = () => zh;
```

---

## 🔐 后台管理系统架构

### 1. 认证系统

```typescript
// lib/auth/config.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { getAdminUser } from '@/lib/db/admin';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '用户名', type: 'text' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await getAdminUser(credentials.username);
        if (!user) {
          return null;
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

// 中间件保护后台路由
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // 所有 /admin 路由需要认证（除了登录页）
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token != null;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};
```

### 2. 后台管理页面

```typescript
// app/admin/layout.tsx - 中文后台布局
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/Header';

export const metadata = {
  title: 'LaserCalc Pro - 管理后台',
  robots: 'noindex, nofollow', // 禁止搜索引擎索引
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader user={session.user} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// app/admin/page.tsx - 仪表板（纯中文）
'use client';

import { useChinese } from '@/lib/i18n';
import { MetricCard } from '@/components/admin/MetricCard';
import { TrafficChart } from '@/components/admin/TrafficChart';
import { PopularToolsChart } from '@/components/admin/PopularToolsChart';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const t = useChinese();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/metrics')
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        {t.admin.dashboard.title}
      </h1>

      {/* 数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title={t.admin.dashboard.metrics.todayVisits}
          value={metrics.todayVisits}
          icon="users"
          trend={+12.5}
        />
        <MetricCard
          title={t.admin.dashboard.metrics.calculations}
          value={metrics.calculations}
          icon="calculator"
          trend={+8.3}
        />
        <MetricCard
          title={t.admin.dashboard.metrics.subscribers}
          value={metrics.subscribers}
          icon="mail"
          trend={+15.2}
        />
        <MetricCard
          title={t.admin.dashboard.metrics.revenue}
          value={`$${metrics.revenue}`}
          icon="dollar"
          trend={+22.4}
        />
      </div>

      {/* 图表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t.admin.dashboard.charts.trafficTrend}
          </h2>
          <TrafficChart data={metrics.trafficData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t.admin.dashboard.charts.popularTools}
          </h2>
          <PopularToolsChart data={metrics.toolsData} />
        </div>
      </div>

      {/* 最近活动 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">最近活动</h2>
        <RecentActivity activities={metrics.recentActivities} />
      </div>
    </div>
  );
}

// app/admin/login/page.tsx - 登录页（中文）
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useChinese } from '@/lib/i18n';

export default function AdminLogin() {
  const t = useChinese();
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });

    if (result?.error) {
      setError(t.admin.login.error);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            LaserCalc Pro
          </h1>
          <p className="text-gray-600 mt-2">
            {t.admin.login.title}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.admin.login.username}
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.admin.login.password}
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '登录中...' : t.admin.login.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
```

### 3. 内容管理系统

```typescript
// app/admin/content/page.tsx - 内容管理（中文）
'use client';

import { useState, useEffect } from 'react';
import { useChinese } from '@/lib/i18n';
import { ArticleList } from '@/components/admin/ArticleList';
import { ArticleEditor } from '@/components/admin/ArticleEditor';

export default function ContentManagement() {
  const t = useChinese();
  const [articles, setArticles] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const res = await fetch('/api/admin/articles');
    const data = await res.json();
    setArticles(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这篇文章吗？')) {
      await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      fetchArticles();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t.admin.content.title}</h1>
        <button
          onClick={() => setEditing({})}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {t.admin.content.add}
        </button>
      </div>

      {editing ? (
        <ArticleEditor
          article={editing}
          onSave={() => {
            setEditing(null);
            fetchArticles();
          }}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <ArticleList
          articles={articles}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

// components/admin/ArticleEditor.tsx - 文章编辑器（中文富文本编辑器）
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useChinese } from '@/lib/i18n';

// 动态导入富文本编辑器（避免SSR问题）
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export function ArticleEditor({ article, onSave, onCancel }) {
  const t = useChinese();
  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    category: article?.category || '',
    tags: article?.tags?.join(', ') || '',
    metaTitle: article?.metaTitle || '',
    metaDescription: article?.metaDescription || '',
    status: article?.status || 'draft',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()),
    };

    const url = article?.id 
      ? `/api/admin/articles/${article.id}` 
      : '/api/admin/articles';
    
    const method = article?.id ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
      {/* 标题 */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t.admin.content.fields.title} *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="输入文章标题（英文）"
          required
        />
      </div>

      {/* URL Slug */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t.admin.content.fields.slug} *
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="url-friendly-slug"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          URL: lasercalcpro.com/blog/{formData.slug || 'article-slug'}
        </p>
      </div>

      {/* 分类和标签 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t.admin.content.fields.category}
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">选择分类</option>
            <option value="tutorials">教程指南</option>
            <option value="industry">行业知识</option>
            <option value="case-studies">案例分析</option>
            <option value="news">行业新闻</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t.admin.content.fields.tags}
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="laser cutting, CNC, cost"
          />
          <p className="text-sm text-gray-500 mt-1">用逗号分隔</p>
        </div>
      </div>

      {/* 摘要 */}
      <div>
        <label className="block text-sm font-medium mb-2">文章摘要</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
          placeholder="简短的文章摘要（150-200字符）"
        />
      </div>

      {/* 正文内容 - 富文本编辑器 */}
      <div>
        <label className="block text-sm font-medium mb-2">正文内容 *</label>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['blockquote', 'code-block'],
              ['link', 'image'],
              ['clean']
            ],
          }}
          className="bg-white"
          style={{ height: '400px', marginBottom: '50px' }}
        />
      </div>

      {/* SEO优化 */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">SEO优化设置</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Meta Title</label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="SEO标题（建议50-60字符）"
              maxLength={60}
            />
            <p className="text-sm text-gray-500 mt-1">
              字符数: {formData.metaTitle.length}/60
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Meta Description</label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
              placeholder="SEO描述（建议150-160字符）"
              maxLength={160}
            />
            <p className="text-sm text-gray-500 mt-1">
              字符数: {formData.metaDescription.length}/160
            </p>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-between items-center border-t pt-6">
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={formData.status === 'draft'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mr-2"
            />
            保存为草稿
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="status"
              value="published"
              checked={formData.status === 'published'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mr-2"
            />
            立即发布
          </label>
        </div>

        <div className="space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {article?.id ? '更新文章' : '创建文章'}
          </button>
        </div>
      </div>
    </form>
  );
}
```

---

## 📊 数据库Schema（完整版）

```sql
-- schema.sql

-- ============================================
-- 管理员表
-- ============================================
CREATE TABLE admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,  -- bcrypt加密
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  role TEXT DEFAULT 'admin',  -- admin, editor
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  INDEX idx_username (username)
);

-- 插入默认管理员（密码: admin123，需要在代码中bcrypt加密）
INSERT INTO admins (username, password, email, display_name) 
VALUES ('admin', '$2a$10$...', 'admin@lasercalcpro.com', '系统管理员');

-- ============================================
-- 计算历史表
-- ============================================
CREATE TABLE calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_type TEXT NOT NULL,  -- laser-cutting, cnc-machining, roi, etc.
  input_params TEXT NOT NULL,  -- JSON格式
  result TEXT NOT NULL,  -- JSON格式
  user_ip TEXT,
  user_agent TEXT,
  user_country TEXT,  -- 从IP获取
  session_id TEXT,  -- 匿名会话追踪
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tool_type (tool_type),
  INDEX idx_created_at (created_at),
  INDEX idx_session (session_id)
);

-- ============================================
-- 邮件订阅表
-- ============================================
CREATE TABLE subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  source_tool TEXT,  -- 来源计算器
  source_page TEXT,  -- 来源页面URL
  is_confirmed BOOLEAN DEFAULT FALSE,
  confirmation_token TEXT,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed_at DATETIME,
  unsubscribed_at DATETIME,
  INDEX idx_email (email),
  INDEX idx_confirmed (is_confirmed)
);

-- ============================================
-- 文章表
-- ============================================
CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,  -- HTML内容
  excerpt TEXT,
  category TEXT,
  tags TEXT,  -- JSON数组
  author_id INTEGER,
  status TEXT DEFAULT 'draft',  -- draft, published, archived
  meta_title TEXT,
  meta_description TEXT,
  featured_image TEXT,
  views INTEGER DEFAULT 0,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES admins(id),
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_published (published_at)
);

-- ============================================
-- 使用统计表（日度聚合）
-- ============================================
CREATE TABLE usage_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  metric_type TEXT NOT NULL,  -- visits, calculations, subscribers, etc.
  metric_value INTEGER DEFAULT 0,
  metadata TEXT,  -- JSON格式，存储额外信息
  INDEX idx_date_metric (date, metric_type)
);

-- ============================================
-- 页面浏览统计表
-- ============================================
CREATE TABLE page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_ip TEXT,
  user_agent TEXT,
  session_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_page_url (page_url),
  INDEX idx_created_at (created_at),
  INDEX idx_session (session_id)
);

-- ============================================
-- 系统设置表
-- ============================================
CREATE TABLE settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_key (key)
);

-- 插入默认设置
INSERT INTO settings (key, value, description) VALUES
('site_name', 'LaserCalc Pro', '网站名称'),
('site_url', 'https://lasercalcpro.com', '网站URL'),
('admin_email', 'admin@lasercalcpro.com', '管理员邮箱'),
('adsense_client_id', '', 'Google AdSense客户端ID'),
('ga_tracking_id', '', 'Google Analytics追踪ID'),
('maintenance_mode', 'false', '维护模式开关');

-- ============================================
-- SEO关键词追踪表
-- ============================================
CREATE TABLE seo_keywords (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  keyword TEXT NOT NULL,
  target_page TEXT,
  position INTEGER,
  search_volume INTEGER,
  difficulty INTEGER,
  checked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_keyword (keyword),
  INDEX idx_checked (checked_at)
);
```

---

## 🎨 前台英文UI示例

```typescript
// app/page.tsx - 前台首页（纯英文）
import { useEnglish } from '@/lib/i18n';
import { Hero } from '@/components/frontend/Hero';
import { ToolsGrid } from '@/components/frontend/ToolsGrid';
import { Features } from '@/components/frontend/Features';
import { Testimonials } from '@/components/frontend/Testimonials';
import { CTASection } from '@/components/frontend/CTASection';

export const metadata = {
  title: 'LaserCalc Pro - Professional Manufacturing Cost Calculators',
  description: 'Free, accurate cost estimation tools for laser cutting, CNC machining, and equipment ROI analysis. Trusted by manufacturers worldwide.',
  keywords: 'laser cutting calculator, CNC cost estimator, manufacturing cost, ROI calculator',
  alternates: {
    canonical: 'https://lasercalcpro.com',
  },
};

export default function HomePage() {
  const t = useEnglish();

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Tools Grid */}
      <ToolsGrid />

      {/* Features */}
      <Features />

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Tool</h3>
              <p className="text-gray-600">
                Choose the calculator that matches your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Parameters</h3>
              <p className="text-gray-600">
                Input your project specifications and costs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">
                Receive detailed cost breakdown and recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <CTASection />
    </main>
  );
}

// components/frontend/Hero.tsx
export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Manufacturing<br />Cost Calculators
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Free, accurate tools for laser cutting, CNC machining cost estimation,
            and equipment ROI analysis. Trusted by manufacturers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/calculators/laser-cutting"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Calculating →
            </a>
            <a
              href="/blog"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-blue-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No Sign-up Required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 🚀 部署配置

```bash
# .env.production
NODE_ENV=production
SITE_URL=https://lasercalcpro.com
DATABASE_URL=<cloudflare-d1-url>

# NextAuth
NEXTAUTH_URL=https://lasercalcpro.com
NEXTAUTH_SECRET=<生成的随机密钥>

# Google Services
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<bcrypt加密的密码>
```

```javascript
// wrangler.toml - Cloudflare配置
name = "lasercalcpro"
compatibility_date = "2024-01-01"

[env.production]
name = "lasercalcpro-production"
route = "lasercalcpro.com/*"

[[d1_databases]]
binding = "DB"
database_name = "lasercalcpro-db"
database_id = "<your-d1-database-id>"

[build]
command = "npm run build"

[build.upload]
format = "service-worker"
```

---

## 📝 总结

这个双语架构确保了：

✅ **前台**: 纯英文，SEO友好，面向全球用户  
✅ **后台**: 纯中文，管理便捷，运营高效  
✅ **安全性**: NextAuth认证，中间件保护  
✅ **可扩展**: 模块化设计，易于维护  
✅ **性能**: Next.js优化，Cloudflare CDN  

域名 **lasercalcpro.com** 已在所有文档中更新！









