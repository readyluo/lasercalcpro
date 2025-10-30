# LaserCalc Pro - 快速启动指南

**域名**: lasercalcpro.com  
**当前状态**: ✅ 规划完成 → 🚀 准备开发

---

## ⚡ 5分钟快速启动

### 第一步：购买域名（5分钟）

```bash
# 推荐: Cloudflare Registrar
# 访问: https://dash.cloudflare.com/domains
# 搜索并购买: lasercalcpro.com
# 价格: ~$9.77/年
```

### 第二步：初始化项目（5分钟）

```bash
# 1. 创建Next.js项目
npx create-next-app@latest lasercalcpro \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd lasercalcpro

# 2. 安装核心依赖
npm install next-auth bcryptjs chart.js jspdf \
  react-hook-form @hookform/resolvers zod \
  @cloudflare/next-on-pages

# 3. 安装开发依赖
npm install -D @types/bcryptjs @types/node

# 4. 创建基础目录结构
mkdir -p app/{admin,calculators,api} \
  components/{ui,calculators,admin,layout} \
  lib/{calculators,db,auth,i18n,utils,validations} \
  public/{images,fonts}
```

### 第三步：配置环境（2分钟）

```bash
# 创建 .env.local
cat > .env.local << EOL
# Site Configuration
SITE_URL=http://localhost:3000
NODE_ENV=development

# Database (稍后配置)
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Google Services (可选)
NEXT_PUBLIC_GA_ID=
ADSENSE_CLIENT_ID=
EOL

# 添加到 .gitignore
echo ".env.local" >> .gitignore
```

### 第四步：启动开发服务器（1分钟）

```bash
npm run dev

# 访问 http://localhost:3000
```

---

## 📁 第一天开发任务清单

### 任务1: 创建基础布局（2小时）

#### 1.1 创建语言文件

```typescript
// lib/i18n/en.ts
export const en = {
  nav: {
    home: 'Home',
    calculators: 'Calculators',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
  },
  hero: {
    title: 'Professional Manufacturing Cost Calculators',
    subtitle: 'Free, accurate tools for laser cutting and CNC machining',
    cta: 'Start Calculating',
  },
};

// lib/i18n/zh.ts
export const zh = {
  admin: {
    title: '管理后台',
    dashboard: '仪表板',
    login: '登录',
  },
};

// lib/i18n/index.ts
import { en } from './en';
import { zh } from './zh';

export const useEnglish = () => en;
export const useChinese = () => zh;
```

#### 1.2 创建导航组件

```typescript
// components/layout/Navigation.tsx
'use client';

import Link from 'next/link';
import { useEnglish } from '@/lib/i18n';

export function Navigation() {
  const t = useEnglish();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          LaserCalc Pro
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600">{t.nav.home}</Link>
          <Link href="/calculators" className="hover:text-blue-600">{t.nav.calculators}</Link>
          <Link href="/blog" className="hover:text-blue-600">{t.nav.blog}</Link>
          <Link href="/about" className="hover:text-blue-600">{t.nav.about}</Link>
          <Link href="/contact" className="hover:text-blue-600">{t.nav.contact}</Link>
        </div>
      </div>
    </nav>
  );
}
```

#### 1.3 更新首页

```typescript
// app/page.tsx
import { Navigation } from '@/components/layout/Navigation';
import { useEnglish } from '@/lib/i18n';

export const metadata = {
  title: 'LaserCalc Pro - Manufacturing Cost Calculators',
  description: 'Free laser cutting and CNC machining cost calculators',
};

export default function HomePage() {
  const t = useEnglish();
  
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">{t.hero.title}</h1>
            <p className="text-xl mb-8">{t.hero.subtitle}</p>
            <a 
              href="/calculators/laser-cutting" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              {t.hero.cta}
            </a>
          </div>
        </section>
        
        {/* More sections... */}
      </main>
    </>
  );
}
```

---

## 🔧 关键配置文件

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... 蓝色系色板
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 📊 Git工作流

### 初始化Git仓库

```bash
# 1. 初始化
git init

# 2. 创建 .gitignore
cat > .gitignore << EOL
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
.vercel

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# Cloudflare
.wrangler/
wrangler.toml

# IDE
.vscode/
.idea/
*.swp
*.swo
EOL

# 3. 首次提交
git add .
git commit -m "Initial commit: LaserCalc Pro project setup"

# 4. 创建GitHub仓库并推送
# 访问 https://github.com/new
# 创建私有仓库: lasercalcpro
git remote add origin https://github.com/yourusername/lasercalcpro.git
git branch -M main
git push -u origin main
```

### 开发分支策略

```bash
# 主分支
main        # 生产环境
develop     # 开发环境

# 功能分支
feature/calculator-laser-cutting
feature/admin-dashboard
feature/content-management

# 修复分支
fix/calculation-error
fix/responsive-layout

# 示例工作流
git checkout -b feature/calculator-laser-cutting
# 进行开发...
git add .
git commit -m "feat: add laser cutting calculator"
git push origin feature/calculator-laser-cutting
# 在GitHub创建Pull Request
```

---

## 🗄️ Cloudflare D1 数据库设置

### 创建数据库

```bash
# 1. 安装Wrangler CLI
npm install -g wrangler

# 2. 登录Cloudflare
wrangler login

# 3. 创建D1数据库
wrangler d1 create lasercalcpro-db

# 输出示例:
# [[d1_databases]]
# binding = "DB"
# database_name = "lasercalcpro-db"
# database_id = "xxxxx-xxxx-xxxx-xxxx-xxxxxxxxx"

# 4. 保存database_id到环境变量
echo "DATABASE_ID=xxxxx-xxxx-xxxx-xxxx-xxxxxxxxx" >> .env.local
```

### 初始化数据库Schema

```bash
# 1. 创建schema文件
cat > schema.sql << EOL
-- 管理员表
CREATE TABLE admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 计算历史表
CREATE TABLE calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_type TEXT NOT NULL,
  input_params TEXT NOT NULL,
  result TEXT NOT NULL,
  user_ip TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 订阅用户表
CREATE TABLE subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  source_tool TEXT,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
EOL

# 2. 执行SQL
wrangler d1 execute lasercalcpro-db --file=./schema.sql

# 3. 插入管理员账户（密码需要bcrypt加密）
# 在Node.js环境中生成密码hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('admin123', 10));"

# 4. 插入管理员
wrangler d1 execute lasercalcpro-db \
  --command="INSERT INTO admins (username, password, email) VALUES ('admin', '\$2a\$10\$...', 'admin@lasercalcpro.com');"
```

---

## 🚀 开发里程碑

### 第1周：基础设施
- [x] 项目初始化
- [ ] 基础布局和导航
- [ ] 首页Hero Section
- [ ] 配色和品牌设计

### 第2周：第一个计算器
- [ ] 激光切割计算器UI
- [ ] 计算引擎实现
- [ ] 表单验证
- [ ] 结果展示

### 第3周：核心功能
- [ ] CNC计算器
- [ ] ROI计算器
- [ ] 数据库集成

### 第4周：后台管理
- [ ] 管理员认证
- [ ] 仪表板
- [ ] 内容管理系统

---

## ✅ 每日开发检查清单

### 开发前
- [ ] 拉取最新代码: `git pull origin main`
- [ ] 检查依赖更新: `npm outdated`
- [ ] 查看任务清单

### 开发中
- [ ] 遵循代码规范
- [ ] 编写必要注释
- [ ] 测试新功能
- [ ] 检查控制台错误

### 开发后
- [ ] 运行 `npm run build` 确保构建成功
- [ ] 提交代码: 清晰的commit message
- [ ] 推送到远程仓库
- [ ] 更新任务进度

---

## 🆘 常见问题

### Q: npm install 报错？
```bash
# 清除缓存重试
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Q: TypeScript类型错误？
```bash
# 重启TypeScript服务器
# VS Code: Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

### Q: Tailwind CSS不生效？
```bash
# 检查tailwind.config.ts的content配置
# 确保包含了所有组件路径
```

### Q: 环境变量不生效？
```bash
# 重启开发服务器
# Ctrl+C 然后 npm run dev
```

---

## 📚 推荐学习资源

### 官方文档
- [Next.js 14 文档](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)
- [NextAuth.js](https://next-auth.js.org)

### 教程视频
- Next.js App Router完整教程
- Tailwind CSS快速入门
- Cloudflare D1数据库使用

### 社区支持
- Next.js Discord
- Cloudflare Discord
- Stack Overflow

---

## 🎯 第一周目标

**目标**: 完成项目基础架构，首页可以访问并展示

### Day 1: 项目初始化 ✅
- 创建Next.js项目
- 安装依赖
- 配置Git

### Day 2-3: 基础布局
- 导航栏组件
- 页脚组件
- 基础页面路由

### Day 4-5: 首页开发
- Hero Section
- 特性展示
- 工具卡片网格

### Day 6-7: 样式优化
- 响应式设计
- 暗色模式（可选）
- 动画效果

**周末检查点**: 首页完整，导航正常，响应式适配完成

---

## 💡 开发技巧

### 快捷命令别名

在 `package.json` 中添加：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "db:init": "wrangler d1 execute lasercalcpro-db --file=./schema.sql",
    "db:query": "wrangler d1 execute lasercalcpro-db --command"
  }
}
```

### VS Code推荐插件

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### 代码片段

创建 `.vscode/snippets.code-snippets`：

```json
{
  "React Client Component": {
    "prefix": "rcc",
    "body": [
      "'use client';",
      "",
      "export function ${1:ComponentName}() {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "}"
    ]
  }
}
```

---

## 🚀 准备就绪！

所有规划文档已完成：

✅ PRD.md - 产品需求  
✅ IMPLEMENTATION_PLAN.md - 详细实施计划  
✅ PROJECT_OVERVIEW.md - 项目概览  
✅ ARCHITECTURE.md - 系统架构（双语设计）  
✅ DOMAIN_SETUP.md - 域名配置指南  
✅ README.md - 项目说明  
✅ QUICK_START.md - 本快速启动指南（你在这里）

**下一步**: 执行上述命令，开始第一天的开发！

```bash
# 快速开始（复制整个命令块）
npx create-next-app@latest lasercalcpro --typescript --tailwind --app && \
cd lasercalcpro && \
npm install next-auth bcryptjs chart.js jspdf react-hook-form @hookform/resolvers zod && \
npm run dev
```

**域名**: lasercalcpro.com  
**Let's build something amazing! 🎉**


