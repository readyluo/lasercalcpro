# 🚀 管理后台快速启动指南

## 5分钟快速上手 LaserCalc Pro 管理后台

---

## 方法 1: 自动化脚本（推荐）

### MacOS/Linux

```bash
# 运行快速启动脚本
./scripts/quick-start-admin.sh
```

脚本会自动完成：
- ✅ 检查和创建 .env 文件
- ✅ 安装项目依赖
- ✅ 初始化数据库表结构
- ✅ 创建默认管理员账户
- ✅ 启动开发服务器

### Windows

```powershell
# 1. 安装依赖
npm install

# 2. 配置环境变量
copy .env.example .env
# 编辑 .env 文件，配置必要的环境变量

# 3. 初始化数据库
npm run db:init
npm run db:init-admin

# 4. 启动服务器
npm run dev
```

---

## 方法 2: 手动步骤

### 步骤 1: 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件
nano .env  # 或使用你喜欢的编辑器
```

**必需配置：**
```env
JWT_SECRET=your-secret-key-at-least-32-characters-long
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

💡 **生成安全的JWT密钥：**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 步骤 2: 安装依赖

```bash
npm install
```

### 步骤 3: 初始化数据库

```bash
# 创建数据库表结构
npm run db:init

# 创建默认管理员账户
npm run db:init-admin
```

### 步骤 4: 启动开发服务器

```bash
npm run dev
```

### 步骤 5: 访问管理后台

1. 打开浏览器访问: http://localhost:3000/admin/login
2. 使用默认账户登录：
   - 用户名: `admin`
   - 密码: `admin123`
3. **立即修改密码！**

---

## 📁 管理后台功能导航

登录成功后，你可以访问以下功能：

### 🏠 仪表盘
**URL**: `/admin`

查看网站运营的关键数据：
- 总计算次数
- 订阅用户数
- 周活跃度
- 系统状态
- 热门计算器排行

### 📊 计算历史
**URL**: `/admin/calculations`

管理所有计算记录：
- 查看详细计算数据
- 按类型、日期、地区筛选
- 导出CSV数据
- 删除无用记录

### 👥 订阅用户
**URL**: `/admin/subscribers`

管理订阅用户：
- 查看所有订阅者
- 确认/取消确认邮箱
- 搜索和筛选
- 导出订阅者列表

### 👤 管理员账户
**URL**: `/admin/users`

管理系统管理员：
- 创建新管理员
- 编辑账户信息
- 修改密码
- 设置角色权限
- 启用/禁用账户

### ⚙️ 系统设置
**URL**: `/admin/settings`

配置系统参数：
- 站点基本设置
- 邮件服务配置
- API密钥管理
- 维护模式开关

### 📈 数据分析
**URL**: `/admin/analytics`

深入分析数据：
- 关键指标展示
- 使用趋势分析
- 计算器排行
- 导出分析报告

### 📝 文章管理
**URL**: `/admin/articles`

管理博客内容（开发中）

---

## 🔐 安全提示

### ⚠️ 首次登录后必做事项

1. **修改默认密码**
   - 进入 `/admin/users`
   - 点击编辑自己的账户
   - 设置强密码（至少12位，包含大小写字母、数字、特殊字符）

2. **更新邮箱地址**
   - 将默认邮箱改为你的真实邮箱

3. **创建个人管理员账户**
   - 创建新的管理员账户
   - 使用自己的用户名和邮箱

4. **禁用默认账户**
   - 创建新账户后，禁用或删除默认的 `admin` 账户

### 🔑 密码安全建议

- ✅ 使用密码管理器
- ✅ 定期更换密码（建议每3个月）
- ✅ 不要在多个服务使用相同密码
- ✅ 启用浏览器密码保存功能（如果信任该设备）

### 🛡️ 生产环境部署前

1. **环境变量安全**
   ```bash
   # 生成新的JWT密钥
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # 更新 .env 文件
   JWT_SECRET=<新生成的密钥>
   ```

2. **数据库安全**
   - 使用强密码
   - 限制访问IP
   - 启用备份

3. **HTTPS**
   - 生产环境必须使用HTTPS
   - 配置SSL证书

---

## 🐛 常见问题

### Q: 登录后提示 "Unauthorized"

**原因：**
- JWT_SECRET 未配置
- Cookie 被阻止
- Token 已过期

**解决：**
1. 检查 `.env` 文件中的 `JWT_SECRET`
2. 清除浏览器 Cookie 和 LocalStorage
3. 重新登录

### Q: 数据库连接失败

**检查：**
1. `TURSO_DATABASE_URL` 格式是否正确
2. `TURSO_AUTH_TOKEN` 是否有效
3. 网络连接是否正常

### Q: 忘记管理员密码

**方法1：** 重新初始化
```bash
npm run db:init-admin
```

**方法2：** 数据库重置
```sql
-- 连接到数据库
turso db shell your-database

-- 重置密码（新密码: newpassword123）
UPDATE admins SET password = '$2a$10$...' WHERE username = 'admin';
```

### Q: 如何添加新的管理员？

1. 登录管理后台
2. 访问 `/admin/users`
3. 点击"添加管理员"按钮
4. 填写信息并提交

### Q: 如何修改管理员权限？

1. 访问 `/admin/users`
2. 点击要修改的管理员的"编辑"按钮
3. 修改角色：
   - `admin`: 完全管理权限
   - `editor`: 内容编辑权限

---

## 📱 移动端访问

管理后台支持移动设备访问：
- ✅ 响应式设计
- ✅ 触摸优化
- ✅ 侧边栏自动折叠

在移动设备上访问：
```
http://your-server-ip:3000/admin/login
```

---

## 🔄 更新和维护

### 更新项目

```bash
# 拉取最新代码
git pull origin main

# 更新依赖
npm install

# 更新数据库（如果有新的表结构）
npm run db:init
```

### 数据库备份

```bash
# 使用 Turso CLI 备份
turso db shell your-database ".backup backup.db"

# 或使用 SQL 导出
turso db shell your-database ".dump" > backup.sql
```

### 查看日志

开发环境日志会显示在终端中。

生产环境建议使用：
- Vercel Logs（如果部署在Vercel）
- CloudFlare Logs（如果使用CloudFlare Pages）

---

## 🎯 下一步

完成快速启动后，建议：

1. ✅ 阅读完整文档: `ADMIN_SETUP_GUIDE.md`
2. ✅ 了解系统架构: `ADMIN_SYSTEM_COMPLETION.md`
3. ✅ 配置邮件服务
4. ✅ 设置Google Analytics
5. ✅ 部署到生产环境

---

## 📞 获取帮助

遇到问题？

1. 查看 **[完整设置指南](./ADMIN_SETUP_GUIDE.md)**
2. 查看 **[系统文档](./ADMIN_SYSTEM_COMPLETION.md)**
3. 检查浏览器控制台错误
4. 查看服务器日志

---

## 🎉 开始使用

现在你已经完成了管理后台的设置！

访问 http://localhost:3000/admin/login 开始管理你的网站吧！

**祝使用愉快！** 🚀

