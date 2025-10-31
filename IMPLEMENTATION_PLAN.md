# LaserCalc Pro - 缺失页面实施清单与信息架构规格

## 文档版本
- 版本: 1.0
- 创建日期: 2025-10-31
- 最后更新: 2025-10-31
- 负责人: 开发团队

---

## 执行概览

### 批次规划
本实施计划按照优先级分为 4 个批次，每个批次包含相关的页面开发任务。

**批次 1（P0 - 核心转化与用户体验）** — 立即执行
**批次 2（P1 - 内容深化与信任建设）** — 第二周
**批次 3（P2 - 运营效率与后台增强）** — 第三周
**批次 4（P3 - 长期优化与合规）** — 第四周

---

## 批次 1: 核心转化与用户体验 (P0)

### 1.1 FAQ 常见问题页面

**路径**: `/faq`

**业务目标**:
- 降低新用户上手门槛，减少咨询成本
- 提升 SEO（FAQ 结构化数据）
- 增加用户信任与停留时间

**用户故事**:
> "作为首次访问者，我想快速了解这些计算器是否适合我的需求，以及如何使用它们。"

**信息架构**:
```
FAQ 页面结构
├── 页面标题: "Frequently Asked Questions - LaserCalc Pro"
├── 搜索框（可选，第一版可省略）
└── 分类手风琴布局
    ├── 关于平台 (5 问)
    │   ├── Q1: 什么是 LaserCalc Pro？
    │   ├── Q2: 计算器是否免费使用？
    │   ├── Q3: 计算结果的准确性如何保证？
    │   ├── Q4: 我需要注册账户吗？
    │   └── Q5: 你们如何保护我的数据？
    ├── 使用指南 (7 问)
    │   ├── Q1: 如何使用激光切割成本计算器？
    │   ├── Q2: 我应该选择哪个计算器？
    │   ├── Q3: 如何导出计算结果？
    │   ├── Q4: 如何保存我的计算历史？
    │   ├── Q5: 计算器支持哪些材料类型？
    │   ├── Q6: 如何理解成本分项？
    │   └── Q7: 移动端体验如何？
    ├── 技术问题 (5 问)
    │   ├── Q1: 为什么计算结果与实际有偏差？
    │   ├── Q2: 计算公式的依据是什么？
    │   ├── Q3: 如何调整默认参数？
    │   ├── Q4: 页面加载缓慢怎么办？
    │   └── Q5: 浏览器兼容性如何？
    └── 业务合作 (3 问)
        ├── Q1: 我可以在我的网站嵌入你们的工具吗？
        ├── Q2: 提供 API 接口吗？
        └── Q3: 如何联系商务合作？
```

**内容要求**:
- 每个问题：简洁标题 + 150-250 字详细回答
- 在回答中嵌入内部链接（指向相关工具/文章）
- 至少 20 个问答对
- 使用 Schema.org FAQPage 结构化数据

**技术要求**:
- 手风琴组件（点击展开/折叠）
- 锚点链接（每个问题有独立 URL，如 `/faq#q-how-to-use`）
- 快速跳转目录（移动端固定顶部）
- 响应式设计（移动端优先）

**SEO 要求**:
- Title: "FAQ - Laser Cutting & CNC Cost Calculator | LaserCalc Pro"
- Meta Description: "Find answers to common questions about laser cutting cost calculators, CNC machining estimators, and manufacturing cost analysis tools."
- H1: "Frequently Asked Questions"
- 结构化数据: FAQPage Schema

**UI/UX 设计**:
- 设计风格：清爽、易读
- 颜色：使用品牌色系
- 图标：每个分类有代表性图标（FontAwesome/Heroicons）
- 交互：平滑展开动画（300ms）

**验收标准**:
- [ ] 所有 20+ 问答对完整呈现
- [ ] 手风琴交互流畅
- [ ] 结构化数据通过 Google Rich Results Test
- [ ] 移动端体验良好（无横向滚动）
- [ ] 页面加载时间 < 2 秒

---

### 1.2 计算器对比/推荐页面

**路径**: `/calculators/compare`

**业务目标**:
- 帮助用户快速选择合适的工具
- 增加页面互动与停留时间
- 提升工具使用率

**用户故事**:
> "作为用户，我不确定应该使用激光切割计算器还是 CNC 加工计算器，我需要一个对比页面帮我决策。"

**信息架构**:
```
对比页面结构
├── 页面标题: "Calculator Comparison & Recommendation"
├── 场景化推荐模块
│   ├── 场景 1: 金属薄板切割 → 推荐激光切割计算器
│   ├── 场景 2: 厚板加工 → 推荐 CNC 加工计算器
│   ├── 场景 3: 复杂零件加工 → 推荐 CNC + ROI 计算器组合
│   └── 场景 4: 设备采购决策 → 推荐 ROI 计算器
├── 工具对比表格
│   └── 对比维度：适用场景、输入参数、输出结果、精度、适用行业
└── 推荐流程（交互式问卷）
    ├── 问题 1: 你的主要需求是什么？（成本估算/设备采购/能耗分析）
    ├── 问题 2: 加工类型？（激光切割/CNC加工/焊接/打标）
    └── 推荐结果 → 跳转对应工具
```

**内容要求**:
- 4-6 个典型场景描述（每个 200-300 字）
- 对比表格：至少 5 个核心工具对比
- 交互式问卷：3-5 个选择题

**技术要求**:
- 响应式表格（移动端卡片式布局）
- 交互式问卷（使用 React 状态管理）
- 推荐算法：基于用户选择匹配工具
- CTA 按钮：直接跳转到推荐工具

**SEO 要求**:
- Title: "Calculator Comparison - Choose the Right Cost Estimator | LaserCalc Pro"
- Meta Description: "Compare laser cutting, CNC machining, and ROI calculators. Find the best tool for your manufacturing cost analysis needs."
- H1: "Calculator Comparison & Recommendation"

**UI/UX 设计**:
- 对比表格：高亮推荐项
- 推荐流程：进度条显示（第 1/3 步）
- 结果页面：大按钮引导至工具

**验收标准**:
- [ ] 对比表格完整且易读
- [ ] 推荐问卷逻辑准确
- [ ] 移动端体验良好
- [ ] CTA 点击率 > 15%

---

### 1.3 计算结果分享/导出功能增强

**路径**: 在现有计算器页面增加功能（`/calculators/*`）

**业务目标**:
- 增加用户粘性与二次传播
- 提升工具价值感知
- 收集用户数据（邮箱订阅）

**用户故事**:
> "作为报价员，我需要将计算结果导出为 PDF 报告，发送给客户和上级审批。"

**功能要求**:
```
导出功能模块
├── PDF 导出
│   ├── 包含内容：公司 Logo、计算参数、分项成本、总计、免责声明
│   ├── 格式：A4 尺寸、专业排版
│   └── 下载文件名：LaserCalc_[ToolName]_[Date].pdf
├── 链接分享
│   ├── 生成唯一短链（如 lasercalc.pro/s/abc123）
│   ├── 链接有效期：30 天
│   └── 分享页面：显示完整计算结果（只读）
├── 邮件发送（需订阅）
│   ├── 发送到用户邮箱
│   ├── 邮件内容：计算结果摘要 + PDF 附件
│   └── 引导订阅：未订阅用户提示"订阅后解锁邮件发送"
└── 社交分享（可选）
    ├── LinkedIn 分享（B2B 用户）
    └── Twitter/X 分享
```

**技术要求**:
- PDF 生成：使用 `jsPDF` 或 `react-pdf`
- 短链生成：Cloudflare Workers KV 存储
- 邮件发送：Resend API 或 Cloudflare Email Workers
- 数据持久化：D1 数据库存储分享记录

**UI/UX 设计**:
- 导出按钮位置：计算结果下方，醒目但不干扰
- 分享弹窗：简洁的模态框，展示短链和复制按钮
- 成功提示：Toast 通知（"PDF 已下载" / "链接已复制"）

**验收标准**:
- [ ] PDF 生成准确、排版专业
- [ ] 短链生成成功率 100%
- [ ] 邮件发送成功率 > 95%
- [ ] 分享功能使用率 > 10%

---

### 1.4 订阅偏好管理与取消订阅页面

**路径**: `/subscribe/preferences` 和 `/subscribe/unsubscribe`

**业务目标**:
- 合规要求（GDPR/CAN-SPAM）
- 减少垃圾邮件投诉
- 提升用户满意度

**用户故事**:
> "作为订阅用户，我希望能够选择接收哪些类型的邮件，或者随时取消订阅。"

**信息架构**:

```
订阅偏好页面 (/subscribe/preferences)
├── 页面标题: "Email Preferences"
├── 用户邮箱显示（只读）
├── 邮件类型选择
│   ├── [ ] 每周工具更新（新计算器功能）
│   ├── [ ] 教程与指南（行业知识文章）
│   ├── [ ] 产品新闻与公告
│   └── [ ] 合作伙伴推广（可选退出）
├── 频率设置
│   ├── ( ) 实时（有更新即发送）
│   ├── ( ) 每周摘要（推荐）
│   └── ( ) 每月摘要
├── 保存按钮
└── 取消所有订阅链接（红色警告）

取消订阅页面 (/subscribe/unsubscribe)
├── 页面标题: "We're Sorry to See You Go"
├── 取消原因（可选反馈）
│   ├── ( ) 邮件太频繁
│   ├── ( ) 内容不相关
│   ├── ( ) 不再需要这些工具
│   └── ( ) 其他（文本框）
├── 确认取消按钮（大按钮）
├── 或者调整偏好链接（次级 CTA）
└── 取消成功确认页面
    ├── "You've been unsubscribed"
    ├── 感谢使用的话语
    └── 返回首页链接
```

**技术要求**:
- 偏好页面：需要 token 验证（邮件中的加密链接）
- 取消订阅：一键取消（无需登录）
- 数据库更新：实时更新 `subscribers` 表
- 安全性：防止 CSRF 攻击

**内容要求**:
- 语气：友好、尊重用户选择
- 取消订阅页面：挽留但不强迫（可提供"暂停 30 天"选项）

**SEO 要求**:
- 这些页面设置 `noindex, nofollow`（不需要 SEO）

**验收标准**:
- [ ] 偏好保存成功率 100%
- [ ] 取消订阅立即生效
- [ ] 邮件中的链接正确跳转
- [ ] 无安全漏洞（token 验证有效）

---

## 批次 2: 内容深化与信任建设 (P1)

### 2.1 Blog 分类/标签系统

**路径**: `/blog/category/[slug]` 和 `/blog/tag/[slug]`

**业务目标**:
- 改善内容可发现性
- 提升 SEO（聚合页面）
- 增加页面停留时间

**用户故事**:
> "作为读者，我想浏览所有关于'激光切割'的文章，而不是在博客列表中逐个翻找。"

**信息架构**:
```
分类页面 (/blog/category/[slug])
├── 分类标题（如 "Laser Cutting Articles"）
├── 分类描述（150-200 字，SEO 优化）
├── 文章列表（分页，每页 12 篇）
├── 侧边栏
│   ├── 热门标签云
│   ├── 相关分类
│   └── 订阅 CTA
└── 分页导航

标签页面 (/blog/tag/[slug])
├── 标签标题（如 "Articles Tagged: CNC Machining"）
├── 标签描述（100 字）
├── 文章列表
└── 相关标签

分类/标签数据结构建议
├── 核心分类（5-7 个）
│   ├── Laser Cutting（激光切割）
│   ├── CNC Machining（CNC 加工）
│   ├── Cost Analysis（成本分析）
│   ├── Equipment ROI（设备投资）
│   ├── Manufacturing Guides（制造指南）
│   └── Industry News（行业新闻）
└── 标签（15-20 个）
    ├── Stainless Steel, Aluminum, Copper（材料）
    ├── Energy Efficiency, Cost Optimization（优化）
    ├── Small Business, Enterprise（规模）
    └── ...
```

**技术要求**:
- 动态路由：`[slug].tsx`
- 数据库扩展：文章表增加 `category` 和 `tags` 字段（JSON 或多对多关联表）
- 聚合查询：高效的标签筛选查询
- 分页：每页 12 篇，使用 URL 参数（`?page=2`）

**SEO 要求**:
- 分类页 Title: "[Category Name] Articles - LaserCalc Pro Blog"
- Meta Description: 动态生成（包含分类描述）
- Canonical URL: 确保分页页面指向首页
- 内部链接：分类页之间互链

**验收标准**:
- [ ] 分类页面正确显示对应文章
- [ ] 标签筛选准确无误
- [ ] 分页功能正常
- [ ] SEO 优化到位

---

### 2.2 作者页面

**路径**: `/blog/author/[slug]`

**业务目标**:
- 建立专家权威感
- 提升内容可信度
- 人性化品牌形象

**用户故事**:
> "作为读者，我想了解文章作者的背景，以判断内容是否值得信赖。"

**信息架构**:
```
作者页面
├── 作者头像（150×150px）
├── 作者名称
├── 职位/头衔（如 "Senior Manufacturing Engineer"）
├── 个人简介（250-400 字）
│   ├── 专业背景
│   ├── 行业经验
│   └── 专长领域
├── 社交媒体链接
│   ├── LinkedIn
│   ├── Twitter/X
│   └── GitHub（如有）
├── 统计数据
│   ├── 发表文章数
│   ├── 总阅读量（可选）
│   └── 加入日期
└── 文章列表（该作者的所有文章）
```

**内容要求**:
- 初期 2-3 个作者资料（可虚拟但真实）
- 每个作者至少 5 篇文章
- 头像使用专业照片（或高质量插画）

**技术要求**:
- 数据库：`authors` 表（id, name, slug, bio, avatar_url, social_links）
- 关联：文章表增加 `author_id` 外键
- 动态路由：`/blog/author/[slug]`

**SEO 要求**:
- Title: "[Author Name] - Articles & Guides | LaserCalc Pro"
- Meta Description: 作者简介前 150 字
- 结构化数据：Person Schema

**验收标准**:
- [ ] 作者页面完整展示信息
- [ ] 文章列表正确关联
- [ ] 头像和社交链接正常
- [ ] 结构化数据通过验证

---

### 2.3 案例研究页面

**路径**: `/case-studies` 和 `/case-studies/[slug]`

**业务目标**:
- 展示工具实际应用价值
- 增强潜在客户信心
- 提供行业用例参考

**用户故事**:
> "作为决策者，我想看到真实的案例，了解这些工具如何帮助其他企业。"

**信息架构**:
```
案例研究列表页 (/case-studies)
├── 页面标题: "Case Studies - Real Manufacturing Cost Success Stories"
├── 筛选器
│   ├── 行业（汽车/航空/建筑/通用）
│   ├── 工具类型（激光切割/CNC/ROI）
│   └── 企业规模（小型/中型/大型）
├── 案例卡片网格（3 列）
│   ├── 案例标题
│   ├── 行业标签
│   ├── 关键结果（如 "节省 30% 成本"）
│   ├── 缩略图
│   └── 阅读更多按钮
└── 分页

案例详情页 (/case-studies/[slug])
├── 案例标题（如 "How Company X Reduced Laser Cutting Costs by 30%"）
├── 元信息（发布日期、行业、工具）
├── 客户背景（匿名化）
│   ├── 行业
│   ├── 企业规模
│   └── 挑战描述（200-300 字）
├── 解决方案
│   ├── 使用的工具
│   ├── 实施过程（300-400 字）
│   └── 关键步骤
├── 成果与数据
│   ├── 量化结果（成本节省、效率提升）
│   ├── 对比图表（前后对比）
│   └── 客户评价（引用）
├── 关键要点（3-5 条）
├── CTA: "使用同样的工具" → 跳转计算器
└── 相关案例推荐（2-3 个）
```

**内容要求**:
- 初期 5 个案例（可基于虚拟但合理的场景）
- 每个案例 1,500-2,000 字
- 必须有量化数据（成本节省百分比、时间节省等）
- 配图：流程图、对比图表、工具截图

**技术要求**:
- 数据库：`case_studies` 表
- Markdown 支持（用于案例内容）
- 图表渲染：使用 Chart.js 或 Recharts
- 筛选功能：客户端或服务端筛选

**SEO 要求**:
- 列表页 Title: "Manufacturing Cost Reduction Case Studies | LaserCalc Pro"
- 详情页 Title: "[Case Title] - Case Study | LaserCalc Pro"
- 结构化数据：Article Schema

**验收标准**:
- [ ] 至少 5 个高质量案例
- [ ] 筛选功能正常
- [ ] 图表显示正确
- [ ] CTA 跳转准确

---

### 2.4 方法学/假设说明文档页面

**路径**: `/methodology` 或每个计算器下的 `/calculators/[tool]/methodology`

**业务目标**:
- 建立计算结果可信度
- 展示专业性与透明度
- 提供学术/行业参考

**用户故事**:
> "作为工程师，我需要了解计算公式的来源和假设，以验证结果是否适用于我的场景。"

**信息架构**:
```
方法学页面 (统一页面或每个工具独立)
├── 页面标题: "Calculation Methodology & Assumptions"
├── 总览（300 字）
│   ├── 我们的方法学原则
│   ├── 数据来源
│   └── 更新频率
└── 各工具方法学详解
    ├── 激光切割成本计算器
    │   ├── 计算公式（LaTeX 或清晰的数学表达式）
    │   ├── 变量定义
    │   ├── 关键假设（如 "假设设备满负荷运行"）
    │   ├── 数据来源（行业标准、文献引用）
    │   ├── 误差范围（±10-15%）
    │   └── 适用场景与限制
    ├── CNC 加工成本估算器
    │   └── （同上结构）
    └── ...（其他工具）
```

**内容要求**:
- 每个工具：600-800 字方法学说明
- 引用至少 3-5 个权威来源（行业报告、学术论文、制造标准）
- 使用 LaTeX 或清晰的数学符号展示公式
- 诚实说明局限性（如 "不包括物流成本"）

**技术要求**:
- 公式渲染：使用 KaTeX 或 MathJax
- 可折叠章节（手风琴式，避免页面过长）
- 内部锚点链接（快速跳转到具体工具）

**SEO 要求**:
- Title: "Calculation Methodology & Data Sources | LaserCalc Pro"
- Meta Description: "Learn about the formulas, assumptions, and data sources behind our laser cutting and CNC cost calculators."
- 结构化数据：HowTo Schema（可选）

**验收标准**:
- [ ] 所有核心工具方法学完整
- [ ] 公式正确渲染
- [ ] 至少 3 个权威引用
- [ ] 用户反馈认可可信度

---

## 批次 3: 运营效率与后台增强 (P2)

### 3.1 后台：角色与权限管理（RBAC）

**路径**: `/admin/roles` 和 `/admin/permissions`

**业务目标**:
- 支持多用户后台管理
- 降低误操作风险
- 提升数据安全性

**用户故事**:
> "作为管理员，我需要为不同的团队成员分配不同的权限（如内容编辑、数据分析师），而不是所有人都是超级管理员。"

**功能要求**:
```
角色管理
├── 预设角色
│   ├── Super Admin（超级管理员）- 所有权限
│   ├── Content Editor（内容编辑）- 文章、指南编辑
│   ├── Data Analyst（数据分析师）- 查看 Analytics、Calculations
│   └── Customer Support（客服）- 查看订阅者、回复咨询
├── 自定义角色创建
├── 权限矩阵（细粒度控制）
│   ├── 文章管理（查看/创建/编辑/删除/发布）
│   ├── 用户管理（查看/编辑/删除）
│   ├── 订阅者管理（查看/导出/删除）
│   ├── 系统设置（查看/修改）
│   └── 计算记录（查看/导出）
└── 角色分配
    └── 用户列表 → 分配角色 → 保存
```

**技术要求**:
- 数据库扩展：
  - `roles` 表（id, name, permissions_json）
  - `users` 表增加 `role_id` 外键
- 中间件：验证用户权限（API 路由保护）
- UI 组件：权限矩阵 Checkbox Grid

**UI/UX 设计**:
- 角色管理页面：表格展示角色列表
- 权限编辑：模态框或独立页面（Matrix 布局）
- 用户分配：下拉选择角色

**验收标准**:
- [ ] 角色创建/编辑/删除功能正常
- [ ] 权限验证准确（无权限用户被拒绝）
- [ ] UI 清晰易懂
- [ ] 无安全漏洞

---

### 3.2 后台：审计日志

**路径**: `/admin/audit-logs`

**业务目标**:
- 合规要求（SOC 2、GDPR）
- 追踪操作历史
- 问题排查与安全监控

**用户故事**:
> "作为系统管理员,我需要查看谁在什么时候修改了系统设置，以便追踪问题根源。"

**功能要求**:
```
审计日志页面
├── 筛选器
│   ├── 日期范围（默认最近 7 天）
│   ├── 用户（下拉选择）
│   ├── 操作类型（创建/编辑/删除/登录/导出）
│   └── 模块（文章/用户/设置/订阅者）
├── 日志列表（表格）
│   ├── 时间戳（精确到秒）
│   ├── 用户（姓名 + 邮箱）
│   ├── 操作类型（图标 + 文字）
│   ├── 模块（如 "文章管理"）
│   ├── 详细描述（如 "编辑文章: 'How to Calculate Laser Cutting Cost'"）
│   ├── IP 地址
│   └── 详情按钮（查看完整 payload）
├── 导出功能（CSV 格式）
└── 分页（每页 50 条）
```

**记录的操作类型**:
- 用户管理：登录、登出、创建用户、删除用户
- 内容管理：创建文章、编辑文章、删除文章、发布文章
- 数据操作：导出订阅者、删除计算记录
- 系统设置：修改配置、更新 SEO 设置

**技术要求**:
- 数据库：`audit_logs` 表
  - `id`, `user_id`, `action`, `module`, `description`, `ip_address`, `payload_json`, `created_at`
- 自动记录：中间件或服务层拦截器
- 查询优化：索引 `created_at` 和 `user_id`

**UI/UX 设计**:
- 表格：密集布局（信息量大）
- 颜色编码：创建（绿）、编辑（蓝）、删除（红）
- 详情弹窗：JSON Viewer 展示完整 payload

**验收标准**:
- [ ] 所有关键操作被记录
- [ ] 筛选功能准确
- [ ] 导出 CSV 格式正确
- [ ] 性能良好（100k+ 日志时查询 < 2 秒）

---

### 3.3 后台：订阅统计与漏斗分析

**路径**: `/admin/analytics/subscriptions`

**业务目标**:
- 优化订阅转化率
- 识别流失节点
- 数据驱动决策

**用户故事**:
> "作为增长负责人，我需要了解订阅用户的来源、留存率和流失原因，以优化订阅策略。"

**功能要求**:
```
订阅统计页面
├── 关键指标卡片（大数字展示）
│   ├── 总订阅数
│   ├── 本月新增订阅
│   ├── 取消订阅数
│   ├── 净增长率（本月）
│   └── 平均留存天数
├── 订阅来源分析
│   ├── 饼图：来源工具分布（激光切割计算器 35%、博客 25%...）
│   ├── 表格：各来源订阅数、转化率
│   └── 趋势图：每周新增订阅（按来源堆叠）
├── 转化漏斗
│   ├── 步骤 1: 页面访问 → 10,000
│   ├── 步骤 2: 订阅框显示 → 3,000 (30%)
│   ├── 步骤 3: 提交邮箱 → 500 (16.7%)
│   ├── 步骤 4: 确认邮箱 → 400 (80%)
│   └── 最终转化率: 4%
├── 留存分析
│   ├── 月度留存曲线（Cohort Analysis）
│   └── 流失原因分析（基于取消订阅反馈）
└── 导出功能（详细报表）
```

**技术要求**:
- 数据查询：从 `subscribers` 表和 `audit_logs` 聚合
- 图表库：Recharts 或 Chart.js
- 计算逻辑：
  - 转化率 = (订阅数 / 页面访问数) × 100%
  - 留存率 = (仍活跃用户 / 初始订阅用户) × 100%

**UI/UX 设计**:
- 仪表盘风格：多图表并列
- 颜色：统一配色方案
- 交互：点击图表可下钻（如点击"博客"来源查看具体文章）

**验收标准**:
- [ ] 所有指标计算准确
- [ ] 图表清晰易读
- [ ] 漏斗分析识别关键流失点
- [ ] 导出报表格式专业

---

### 3.4 后台：文章状态与草稿工作流

**路径**: `/admin/articles`（现有页面增强）

**业务目标**:
- 支持内容协作流程
- 避免误发布未完成内容
- 提升内容质量管控

**用户故事**:
> "作为内容编辑，我需要将文章保存为草稿，让审核人员审阅后再发布。"

**功能要求**:
```
文章状态系统
├── 状态类型
│   ├── Draft（草稿）- 仅编辑者可见
│   ├── In Review（审核中）- 通知审核者
│   ├── Scheduled（定时发布）- 设置发布时间
│   ├── Published（已发布）- 公开可见
│   └── Archived（已归档）- 不再显示但保留
├── 状态流转
│   ├── Draft → In Review（提交审核按钮）
│   ├── In Review → Published（批准按钮）
│   ├── In Review → Draft（退回修改按钮，含备注）
│   └── Published → Archived（归档按钮）
├── 定时发布
│   ├── 发布时间选择器（日期 + 时间）
│   ├── Cron 任务或 Workers Scheduled 触发
│   └── 发布前预览功能
└── 版本历史（可选，高级功能）
    └── 查看文章历史版本，支持回滚
```

**技术要求**:
- 数据库扩展：`articles` 表增加字段
  - `status` (ENUM: draft, in_review, scheduled, published, archived)
  - `scheduled_at` (TIMESTAMP)
  - `reviewer_notes` (TEXT)
- 定时发布：Cloudflare Workers Cron 或 Next.js API Cron
- 权限控制：仅管理员可批准，编辑者可提交审核

**UI/UX 设计**:
- 文章列表：状态徽章（草稿-灰色、审核中-黄色、已发布-绿色）
- 编辑页面：状态切换按钮（大按钮，明确操作）
- 预览功能：独立窗口或模态框，显示发布后效果

**验收标准**:
- [ ] 状态流转逻辑正确
- [ ] 定时发布准确（误差 < 1 分钟）
- [ ] 权限验证无漏洞
- [ ] 审核备注功能可用

---

## 批次 4: 长期优化与合规 (P3)

### 4.1 Cookie Policy 与偏好设置

**路径**: `/cookie-policy` 和页面底部 Cookie Banner

**业务目标**:
- 合规要求（GDPR、ePrivacy Directive）
- 避免法律风险
- 提升用户信任

**用户故事**:
> "作为欧盟用户，我需要明确知道网站使用了哪些 Cookie，并能够选择退出非必要 Cookie。"

**功能要求**:
```
Cookie Policy 页面
├── 页面标题: "Cookie Policy"
├── 总览（300 字）
│   ├── 什么是 Cookie
│   ├── 我们为什么使用 Cookie
│   └── 如何管理 Cookie
├── Cookie 类型详解
│   ├── 必要 Cookie（Strictly Necessary）
│   │   ├── 用途：网站基本功能（如登录状态）
│   │   ├── 示例：session_id
│   │   └── 可否退出：否
│   ├── 功能 Cookie（Functional）
│   │   ├── 用途：记住用户偏好（如语言、主题）
│   │   ├── 示例：user_preferences
│   │   └── 可否退出：是
│   ├── 分析 Cookie（Analytics）
│   │   ├── 用途：Google Analytics、热图
│   │   ├── 示例：_ga, _gid
│   │   └── 可否退出：是
│   └── 广告 Cookie（Advertising）
│       ├── 用途：Google AdSense
│       ├── 示例：_gcl_au, IDE
│       └── 可否退出：是（但影响广告相关性）
├── 第三方 Cookie
│   ├── Google Analytics
│   ├── Google AdSense
│   └── Cloudflare（性能优化）
├── 如何管理 Cookie
│   ├── 浏览器设置指南
│   └── 我们的 Cookie 偏好中心链接
└── 联系方式（Cookie 相关问题）

Cookie Banner（首次访问弹出）
├── 标题: "We Value Your Privacy"
├── 简短说明（100 字）
├── 按钮
│   ├── [接受所有 Cookie]（主按钮）
│   ├── [仅必要 Cookie]（次级按钮）
│   └── [自定义偏好]（打开详细设置）
└── 详细设置模态框
    ├── 必要 Cookie（开关禁用，始终开启）
    ├── 功能 Cookie（开关）
    ├── 分析 Cookie（开关）
    ├── 广告 Cookie（开关）
    └── [保存偏好] 按钮
```

**技术要求**:
- Cookie Banner 组件：使用 `react-cookie-consent` 或自定义
- 偏好存储：LocalStorage 或 Cookie（ironically）
- 条件加载：根据用户偏好动态加载 Google Analytics/AdSense 脚本
- 延迟加载：用户同意前不加载非必要脚本

**合规要求**:
- GDPR 合规：默认不加载非必要 Cookie（Opt-in，而非 Opt-out）
- 明确告知：列出所有使用的 Cookie 名称和用途
- 易于撤回：提供 Cookie 偏好中心链接（页脚）

**UI/UX 设计**:
- Banner 位置：底部固定（不遮挡主要内容）
- 设计：简洁、不侵入
- 移动端：响应式，按钮易点击

**验收标准**:
- [ ] Cookie Policy 完整且准确
- [ ] Banner 首次访问显示
- [ ] 用户偏好正确保存和应用
- [ ] 脚本条件加载正确（用户拒绝 Analytics 则不加载 GA）
- [ ] 通过 GDPR 合规检查工具验证

---

### 4.2 无障碍访问（Accessibility）说明页面

**路径**: `/accessibility`

**业务目标**:
- 合规要求（ADA、WCAG 2.1 AA）
- 扩大用户群体（包括残障用户）
- 展示社会责任

**用户故事**:
> "作为使用屏幕阅读器的用户，我需要了解网站是否支持无障碍访问，以及如何获得帮助。"

**信息架构**:
```
无障碍访问页面
├── 页面标题: "Accessibility Statement"
├── 承诺声明（200 字）
│   ├── 我们的无障碍目标
│   └── 遵循的标准（WCAG 2.1 AA）
├── 已实施的无障碍功能
│   ├── 键盘导航支持（Tab、Enter、Esc）
│   ├── 屏幕阅读器优化（ARIA 标签）
│   ├── 高对比度模式
│   ├── 文字缩放支持（至少 200%）
│   ├── 替代文本（所有图片）
│   └── 表单标签清晰
├── 已知限制（诚实说明）
│   ├── 部分第三方嵌入内容（如 YouTube）可能不完全无障碍
│   └── 正在改进的功能列表
├── 反馈机制
│   ├── 如发现无障碍问题，请联系我们
│   ├── 承诺响应时间（48 小时）
│   └── 联系表单链接
├── 第三方工具
│   ├── 推荐的辅助技术（如 NVDA、JAWS）
│   └── 浏览器无障碍设置指南
└── 最后更新日期
```

**技术要求**:
- 页面本身必须完全无障碍（使用 axe DevTools 验证）
- 所有交互元素可键盘访问
- 合理的 ARIA 标签和 Landmark

**合规要求**:
- 符合 WCAG 2.1 AA 标准
- ADA Title III 合规（如适用于美国业务）

**验收标准**:
- [ ] 页面通过 axe DevTools 0 错误
- [ ] 屏幕阅读器测试通过（NVDA/VoiceOver）
- [ ] 键盘导航流畅
- [ ] 反馈机制可用

---

### 4.3 归档页面（按年月）

**路径**: `/blog/archive/[year]/[month]` 或 `/blog/archive`

**业务目标**:
- 改善旧内容可发现性
- 提升 SEO（聚合页面）
- 完善博客导航结构

**用户故事**:
> "作为读者，我想浏览 2025 年 3 月的所有文章，回顾那段时间的行业动态。"

**信息架构**:
```
归档主页 (/blog/archive)
├── 页面标题: "Blog Archive"
├── 年份列表（手风琴）
│   ├── 2026
│   │   ├── January (12 篇文章)
│   │   ├── February (10 篇文章)
│   │   └── ...
│   ├── 2025
│   │   ├── December (8 篇文章)
│   │   └── ...
│   └── ...
└── 日历视图（可选，视觉化展示）

归档详情页 (/blog/archive/2025/12)
├── 页面标题: "Articles from December 2025"
├── 面包屑导航: Home > Blog > Archive > 2025 > December
├── 文章列表（按发布日期倒序）
│   ├── 文章标题
│   ├── 发布日期
│   ├── 分类标签
│   └── 摘要
└── 导航（上一月 / 下一月）
```

**技术要求**:
- 动态路由：`/blog/archive/[year]/[month]`
- 数据库查询：按月份聚合文章
- 生成静态页面（ISR，按需生成）

**SEO 要求**:
- Title: "Articles from [Month Year] - LaserCalc Pro Blog"
- Meta Description: 动态生成（如 "Browse all laser cutting and CNC articles published in December 2025"）
- Canonical URL: 确保唯一性

**验收标准**:
- [ ] 归档页面正确显示文章
- [ ] 导航流畅（年/月切换）
- [ ] 移动端体验良好
- [ ] SEO 优化到位

---

### 4.4 合作伙伴/集成页面

**路径**: `/partnerships` 或 `/integrations`

**业务目标**:
- 展示生态系统
- 吸引 B2B 合作伙伴
- 增强工具价值感知

**用户故事**:
> "作为 ERP 软件用户，我想知道 LaserCalc Pro 是否可以与我的系统集成，以自动化成本估算流程。"

**信息架构**:
```
合作伙伴/集成页面
├── 页面标题: "Partnerships & Integrations"
├── 总览（300 字）
│   ├── 我们的合作理念
│   └── 集成的价值
├── 现有集成（如有）
│   ├── ERP 系统（如 SAP、Oracle）
│   ├── CAD/CAM 软件（如 AutoCAD、SolidWorks）
│   └── 会计软件（如 QuickBooks）
├── 即将推出的集成（Roadmap）
├── API 文档链接（如提供）
├── 合作伙伴展示
│   ├── Logo 墙（合作企业 Logo）
│   └── 简短描述
├── 成为合作伙伴
│   ├── 合作模式（技术集成、内容合作、联合营销）
│   ├── 申请表单
│   └── 联系方式
└── 案例研究（集成后的成功故事）
```

**内容要求**:
- 初期可能没有实际集成，可描述"计划中"或"概念验证"
- 至少 3-5 个潜在合作伙伴 Logo（已获授权）
- 技术文档草稿（如 API 文档）

**技术要求**:
- 静态页面（Markdown 或 CMS）
- 表单：合作申请表（发送到指定邮箱）

**SEO 要求**:
- Title: "Partnerships & Integrations - LaserCalc Pro"
- Meta Description: "Integrate LaserCalc Pro with your ERP, CAD/CAM, or accounting software. Explore partnership opportunities."

**验收标准**:
- [ ] 页面内容完整且专业
- [ ] 合作申请表单正常
- [ ] Logo 展示清晰
- [ ] 吸引至少 1 个合作咨询

---

## 批次 5: 增强功能（可选，未来迭代）

以下功能不在当前批次范围内，但列出供未来参考：

### 5.1 多语言支持
- 中文版本（中国市场）
- 德语版本（德国工业强国）

### 5.2 高级功能（付费订阅）
- 无限计算历史保存
- 团队协作功能（多用户共享项目）
- 白标定制（为企业客户）

### 5.3 移动 App
- iOS/Android 原生应用
- 离线计算功能

### 5.4 AI 辅助
- 基于历史数据的成本预测
- 智能推荐最优加工方案

---

## 实施优先级矩阵

| 功能 | 优先级 | 影响 | 工作量 | ROI | 批次 |
|------|--------|------|--------|-----|------|
| FAQ 页面 | P0 | 高 | 中 | 高 | 批次 1 |
| 计算器对比页面 | P0 | 高 | 中 | 高 | 批次 1 |
| 导出/分享功能 | P0 | 高 | 高 | 高 | 批次 1 |
| 订阅偏好管理 | P0 | 高 | 中 | 高 | 批次 1 |
| Blog 分类/标签 | P1 | 中 | 中 | 中 | 批次 2 |
| 作者页面 | P1 | 中 | 低 | 中 | 批次 2 |
| 案例研究 | P1 | 高 | 高 | 高 | 批次 2 |
| 方法学文档 | P1 | 高 | 中 | 高 | 批次 2 |
| RBAC 权限管理 | P2 | 中 | 高 | 中 | 批次 3 |
| 审计日志 | P2 | 中 | 中 | 中 | 批次 3 |
| 订阅统计分析 | P2 | 中 | 中 | 中 | 批次 3 |
| 文章草稿工作流 | P2 | 中 | 中 | 中 | 批次 3 |
| Cookie Policy | P3 | 高 | 低 | 中 | 批次 4 |
| 无障碍说明页 | P3 | 中 | 低 | 低 | 批次 4 |
| 归档页面 | P3 | 低 | 低 | 低 | 批次 4 |
| 合作伙伴页面 | P3 | 中 | 低 | 中 | 批次 4 |

---

## 数据库扩展需求

### 新增表

```sql
-- 作者表
CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  social_links JSON, -- {"linkedin": "url", "twitter": "url"}
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 分类表
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 标签表
CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 文章-标签关联表
CREATE TABLE article_tags (
  article_id INTEGER,
  tag_id INTEGER,
  PRIMARY KEY (article_id, tag_id)
);

-- 案例研究表
CREATE TABLE case_studies (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  industry TEXT,
  company_size TEXT, -- small, medium, large
  tools_used JSON, -- ["laser-cutting", "roi"]
  challenge TEXT,
  solution TEXT,
  results TEXT,
  key_metrics JSON, -- {"cost_savings": "30%", "time_saved": "20 hours"}
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 角色表
CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  permissions JSON, -- {"articles": ["view", "create", "edit"], "users": ["view"]}
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 审计日志表
CREATE TABLE audit_logs (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  action TEXT, -- create, edit, delete, login, export
  module TEXT, -- articles, users, settings
  description TEXT,
  ip_address TEXT,
  payload JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 分享链接表（用于计算结果分享）
CREATE TABLE shared_calculations (
  id INTEGER PRIMARY KEY,
  short_code TEXT UNIQUE NOT NULL, -- 短链代码（如 "abc123"）
  tool_type TEXT,
  calculation_data JSON,
  expires_at TIMESTAMP,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 现有表扩展

```sql
-- articles 表增加字段
ALTER TABLE articles ADD COLUMN author_id INTEGER;
ALTER TABLE articles ADD COLUMN category_id INTEGER;
ALTER TABLE articles ADD COLUMN status TEXT DEFAULT 'draft'; -- draft, in_review, scheduled, published, archived
ALTER TABLE articles ADD COLUMN scheduled_at TIMESTAMP;
ALTER TABLE articles ADD COLUMN reviewer_notes TEXT;

-- users 表增加字段
ALTER TABLE users ADD COLUMN role_id INTEGER DEFAULT 1; -- 默认为普通用户

-- subscribers 表增加字段
ALTER TABLE subscribers ADD COLUMN preferences JSON; -- {"weekly_updates": true, "tutorials": true, "promotions": false}
ALTER TABLE subscribers ADD COLUMN frequency TEXT DEFAULT 'weekly'; -- realtime, weekly, monthly
ALTER TABLE subscribers ADD COLUMN unsubscribed_at TIMESTAMP;
ALTER TABLE subscribers ADD COLUMN unsubscribe_reason TEXT;
```

---

## 技术栈补充

### 新增依赖包

```json
{
  "dependencies": {
    "jspdf": "^2.5.1", // PDF 生成
    "jspdf-autotable": "^3.8.0", // PDF 表格
    "nanoid": "^5.0.0", // 短链生成
    "katex": "^0.16.0", // 数学公式渲染
    "react-katex": "^3.0.0",
    "recharts": "^2.10.0", // 图表库（如已有可忽略）
    "react-cookie-consent": "^9.0.0", // Cookie Banner
    "zod": "^3.22.0" // 表单验证（如已有可忽略）
  }
}
```

---

## 内容创作清单

### 需要撰写的内容

| 页面 | 字数 | 优先级 | 负责人 | 截止日期 |
|------|------|--------|--------|----------|
| FAQ（20 问） | 4,000 | P0 | 内容团队 | 周 1 |
| 计算器对比页 | 1,500 | P0 | 产品团队 | 周 1 |
| 案例研究（5 篇） | 10,000 | P1 | 内容团队 | 周 2-3 |
| 方法学文档 | 5,000 | P1 | 技术团队 | 周 2 |
| Cookie Policy | 2,000 | P3 | 法务/内容 | 周 4 |
| 无障碍声明 | 1,000 | P3 | 技术/内容 | 周 4 |
| 合作伙伴页 | 1,500 | P3 | 商务团队 | 周 4 |

---

## 质量保证检查清单

### 每个页面发布前必须通过

- [ ] **功能测试**：所有交互正常（表单提交、按钮点击、导航）
- [ ] **响应式测试**：移动端（375px）、平板（768px）、桌面（1440px）
- [ ] **浏览器兼容**：Chrome、Safari、Firefox、Edge 最新版本
- [ ] **SEO 检查**：Title、Meta、H1、结构化数据、Canonical
- [ ] **性能测试**：Lighthouse 评分 > 90（Performance、Accessibility、Best Practices、SEO）
- [ ] **无障碍测试**：axe DevTools 0 错误、键盘导航、屏幕阅读器
- [ ] **内容审核**：无拼写错误、语法正确、内部链接有效、图片 Alt 文本
- [ ] **安全检查**：无 XSS/SQL 注入风险、表单验证、HTTPS
- [ ] **数据库测试**：CRUD 操作正确、索引优化、查询性能
- [ ] **日志记录**：关键操作被记录到审计日志

---

## 风险与依赖

### 关键风险

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| PDF 生成性能问题 | 高 | 中 | 使用 Web Worker 后台生成，或服务端生成 |
| 短链碰撞（nanoid） | 中 | 低 | 使用更长的 ID（8 位），数据库唯一约束 |
| GDPR 合规复杂性 | 高 | 高 | 咨询法律顾问，使用成熟的 Cookie 管理库 |
| 内容创作延迟 | 中 | 中 | 提前开始内容创作，使用 AI 辅助（ChatGPT 生成初稿） |
| 后台权限系统复杂 | 高 | 中 | 分阶段实施（先 3 个固定角色，再扩展自定义） |

### 外部依赖

- **内容团队**：案例研究、FAQ、方法学文档需要专业内容
- **法务团队**：Cookie Policy、隐私政策更新需要法律审核
- **设计团队**：新页面 UI/UX 设计（如有专职设计师）
- **第三方服务**：Resend（邮件）、Cloudflare（Workers/KV）

---

## 成功指标（KPIs）

### 批次 1 完成后（核心转化）
- FAQ 页面月访问量 > 500
- 计算器对比页转化率 > 15%（访问者点击工具）
- PDF 导出使用率 > 10%（计算器用户）
- 订阅取消率 < 5%（有偏好管理后）

### 批次 2 完成后（内容深化）
- 案例研究页面平均停留时间 > 3 分钟
- Blog 分类页 SEO 流量增长 > 20%
- 方法学页面外链引用 > 3 个

### 批次 3 完成后（运营效率）
- 后台用户操作错误率 < 1%（权限清晰）
- 审计日志覆盖 100% 关键操作
- 内容发布流程时间缩短 50%（草稿工作流）

### 批次 4 完成后（合规优化）
- Cookie Banner 接受率 > 70%
- 无障碍问题投诉 = 0
- GDPR 合规审核通过

---

## 下一步行动

1. **批次 1 启动**：立即开始 FAQ 页面和计算器对比页面的内容创作
2. **技术准备**：安装新依赖包（jsPDF、nanoid 等）
3. **数据库迁移**：执行 SQL 脚本创建新表和扩展字段
4. **设计资源**：为新页面准备 UI 设计稿（如需要）
5. **内容日历**：排期案例研究和方法学文档的创作计划

---

## 附录：参考资料

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [GDPR Cookie Compliance](https://gdpr.eu/cookies/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Cloudflare Workers KV](https://developers.cloudflare.com/workers/runtime-apis/kv/)

---

**文档结束** 🎯
