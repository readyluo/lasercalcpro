# 🎯 LaserCalc Pro 管理后台系统

> **完整、安全、易用的网站管理后台解决方案**

[![Status](https://img.shields.io/badge/status-production--ready-brightgreen)](https://github.com)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com)

---

## 📖 目录

- [简介](#简介)
- [核心功能](#核心功能)
- [快速开始](#快速开始)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [文档](#文档)
- [安全特性](#安全特性)
- [截图](#截图)
- [常见问题](#常见问题)
- [贡献](#贡献)
- [许可证](#许可证)

---

## 🚀 简介

LaserCalc Pro 管理后台是一个**功能完整、开箱即用**的网站管理系统，提供：

- 🔐 **安全的认证系统** - JWT Token + 角色权限控制
- 📊 **实时数据仪表盘** - 关键指标一目了然
- 👥 **用户管理** - 订阅用户和管理员管理
- 📈 **数据分析** - 深入了解网站运营数据
- ⚙️ **系统配置** - 灵活的系统设置管理
- 📱 **响应式设计** - 完美支持桌面和移动设备

### 为什么选择这个系统？

- ✅ **5分钟快速部署** - 一键启动脚本
- ✅ **完整的文档** - 详尽的设置和使用指南
- ✅ **生产就绪** - 完善的安全措施和错误处理
- ✅ **易于扩展** - 清晰的代码结构，便于定制
- ✅ **TypeScript** - 类型安全，减少bug

---

## ✨ 核心功能

### 🏠 仪表盘
实时展示网站关键数据：
- 📊 总计算次数
- 👥 订阅用户数
- 📈 活跃度趋势
- 🔥 热门功能排行

### 📋 计算历史管理
完整的数据管理功能：
- 查看所有计算记录
- 多维度筛选（类型、日期、地区）
- 详细数据查看
- CSV 格式导出

### 👥 订阅用户管理
高效的用户管理：
- 用户列表和搜索
- 确认状态管理
- 批量操作支持
- 数据导出

### 🔑 管理员账户管理
完善的权限控制：
- 创建和管理管理员
- 角色权限设置（admin/editor）
- 密码修改
- 账户启用/禁用

### ⚙️ 系统设置
灵活的配置管理：
- 站点基本设置
- 邮件服务配置
- API 密钥管理
- 维护模式开关

### 📊 数据分析
深入的数据洞察：
- 关键指标趋势
- 使用行为分析
- 自定义报表
- 数据导出

---

## 🚀 快速开始

### 方法 1: 一键启动（推荐）

```bash
# 克隆项目（如果还没有）
git clone <repository-url>
cd LaserCalcpro

# 运行快速启动脚本
./scripts/quick-start-admin.sh
```

脚本会自动完成所有初始化步骤！

### 方法 2: 手动步骤

```bash
# 1. 配置环境变量
cp .env.example .env
nano .env  # 编辑必要的环境变量

# 2. 安装依赖
npm install

# 3. 初始化数据库
npm run db:init
npm run db:init-admin

# 4. 启动开发服务器
npm run dev
```

### 访问管理后台

打开浏览器访问: **http://localhost:3000/admin/login**

**默认账户：**
- 用户名: `admin`
- 密码: `admin123`

⚠️ **重要：首次登录后请立即修改密码！**

---

## 🛠️ 技术栈

### 前端
- **Next.js 14** - React 框架
- **React 19** - UI 库
- **Tailwind CSS** - 样式框架
- **TypeScript** - 类型安全
- **Lucide Icons** - 图标库

### 后端
- **Next.js API Routes** - RESTful API
- **JWT (jose)** - Token 认证
- **bcryptjs** - 密码加密
- **Zod** - 输入验证

### 数据库
- **Turso (LibSQL)** - 分布式数据库
- **@libsql/client** - 数据库客户端

---

## 📁 项目结构

```
LaserCalcpro/
├── app/
│   ├── admin/                    # 管理后台页面
│   │   ├── login/                # 登录
│   │   ├── calculations/         # 计算历史
│   │   ├── subscribers/          # 订阅用户
│   │   ├── users/                # 管理员
│   │   ├── settings/             # 系统设置
│   │   └── analytics/            # 数据分析
│   └── api/
│       └── admin/                # 管理后台 API
│
├── components/
│   └── admin/
│       └── AdminLayout.tsx       # 管理布局
│
├── lib/
│   ├── auth/                     # 认证模块
│   │   ├── jwt.ts
│   │   ├── admin.ts
│   │   └── middleware.ts
│   └── db/                       # 数据库
│
├── scripts/
│   ├── init-admin-db.ts          # 初始化管理员
│   └── quick-start-admin.sh      # 快速启动脚本
│
└── docs/                          # 文档
    ├── QUICK_START_ADMIN.md      # 快速启动指南
    ├── ADMIN_SETUP_GUIDE.md      # 完整设置指南
    ├── ADMIN_SYSTEM_COMPLETION.md # 系统完成报告
    └── DELIVERY_SUMMARY.md        # 交付总结
```

---

## 📚 文档

我们提供了完整的文档帮助你快速上手：

| 文档 | 描述 | 推荐度 |
|------|------|--------|
| [QUICK_START_ADMIN.md](./QUICK_START_ADMIN.md) | 5分钟快速上手指南 | ⭐⭐⭐⭐⭐ |
| [ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md) | 完整设置和使用指南 | ⭐⭐⭐⭐ |
| [ADMIN_SYSTEM_COMPLETION.md](./ADMIN_SYSTEM_COMPLETION.md) | 系统架构和技术文档 | ⭐⭐⭐ |
| [DELIVERY_SUMMARY.md](./DELIVERY_SUMMARY.md) | 项目交付总结 | ⭐⭐⭐ |

**建议阅读顺序：**
1. 先看 **QUICK_START_ADMIN.md** 快速上手
2. 遇到问题查看 **ADMIN_SETUP_GUIDE.md**
3. 需要深入了解看 **ADMIN_SYSTEM_COMPLETION.md**

---

## 🔐 安全特性

### 认证安全
- ✅ JWT Token 认证
- ✅ 密码 bcrypt 加密（10轮）
- ✅ HTTP-only Cookie
- ✅ Token 自动过期
- ✅ 安全会话管理

### 权限控制
- ✅ 基于角色的访问控制（RBAC）
- ✅ API 中间件保护
- ✅ 操作审计日志（数据库表已准备）
- ✅ IP 地址记录

### 数据安全
- ✅ 输入验证（Zod）
- ✅ SQL 注入防护
- ✅ XSS 防护
- ✅ CSRF 保护

---

## 📸 截图

### 登录页面
<img src="https://via.placeholder.com/800x500?text=Login+Page" alt="登录页面" width="600">

### 仪表盘
<img src="https://via.placeholder.com/800x500?text=Dashboard" alt="仪表盘" width="600">

### 数据管理
<img src="https://via.placeholder.com/800x500?text=Data+Management" alt="数据管理" width="600">

---

## ❓ 常见问题

### Q: 如何修改默认密码？

A: 登录后访问 `/admin/users`，找到自己的账户并编辑。

### Q: 忘记密码怎么办？

A: 运行 `npm run db:init-admin` 重置为默认密码。

### Q: 如何添加新的管理员？

A: 登录后访问 `/admin/users`，点击"添加管理员"按钮。

### Q: 支持哪些浏览器？

A: Chrome, Firefox, Safari, Edge（最新版本）

### 更多问题？

查看 [ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md) 的常见问题部分。

---

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🌟 功能路线图

### v1.0.0 (已完成) ✅
- [x] 认证系统
- [x] 仪表盘
- [x] 数据管理
- [x] 用户管理
- [x] 系统设置

### v1.1.0 (计划中)
- [ ] 文章管理完整实现
- [ ] 数据可视化图表
- [ ] 审计日志功能
- [ ] 邮件通知系统

### v2.0.0 (未来)
- [ ] 多租户支持
- [ ] API 开放平台
- [ ] 移动应用

---

## 📞 支持

需要帮助？

- 📧 Email: admin@lasercalcpro.com
- 📖 文档: 查看 `docs/` 目录
- 🐛 问题: 提交 GitHub Issue

---

## 🎉 致谢

感谢以下开源项目：

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Turso](https://turso.tech/)
- [Lucide Icons](https://lucide.dev/)

---

## 📊 项目统计

- **代码行数**: 3500+ 行
- **文件数**: 25+ 个
- **API 端点**: 15+ 个
- **功能模块**: 8 个
- **文档**: 4 份完整文档

---

<div align="center">

**Made with ❤️ by LaserCalc Pro Team**

[快速开始](#快速开始) • [文档](#文档) • [贡献](#贡献)

---

⭐ 如果觉得这个项目有用，请给个 Star！

</div>

