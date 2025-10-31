# 批次 1 实施说明

## 完成功能

### ✅ 1.1 FAQ 常见问题页面
- **路径**: `/faq`
- **组件**: `app/faq/page.tsx`, `components/faq/FAQAccordion.tsx`
- **功能**:
  - 4个分类：关于平台、使用指南、技术问题、业务合作
  - 总计 22 个问答对
  - 手风琴交互（可折叠/展开）
  - FAQ Schema 结构化数据（SEO 优化）
  - 响应式设计
  - 锚点链接（可复制单个问题链接）
  - 快速导航（跳转到分类）

### ✅ 1.2 计算器对比/推荐页面
- **路径**: `/calculators/compare`
- **组件**: 
  - `app/calculators/compare/page.tsx`
  - `components/calculators/ComparisonTable.tsx`
  - `components/calculators/ScenarioRecommendations.tsx`
  - `components/calculators/CalculatorQuiz.tsx`
- **功能**:
  - **交互式问卷**: 4步问卷自动推荐合适的计算器
  - **对比表格**: 5个核心计算器功能对比（桌面表格+移动卡片）
  - **场景推荐**: 6个典型使用场景及推荐工具组合
  - 进度条显示
  - 个性化推荐（基于问卷回答）
  - 信心指数展示

### ✅ 1.3 增强计算器导出/分享功能
- **组件**: `components/calculators/ShareExportButtons.tsx`
- **API 路由**:
  - `/api/share/create` - 生成短链
  - `/api/share/email` - 邮件发送
- **数据库**:
  - `lib/db/shared-calculations.ts` - 数据库操作
  - `scripts/migrate-shared-calculations.ts` - 数据库迁移脚本
- **邮件**:
  - `lib/email/send-calculation.ts` - 邮件发送功能
- **功能**:
  - **PDF 导出**: 使用现有 jsPDF 库生成专业报告
  - **短链分享**: 生成30天有效的只读分享链接
  - **邮件发送**: 发送 HTML 格式的计算结果邮件
  - **分享页面**: `/shared/[code]` - 查看分享的计算结果
  - 模态框 UI（分享链接、邮件表单）
  - 一键复制链接
  - 加载状态与成功提示

---

## 待安装依赖

### NPM 包
```bash
# 短链生成（可选，已实现简单版本）
npm install nanoid
```

### 环境变量

在 `.env.local` 添加以下配置：

```env
# SMTP Configuration (邮件发送)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@lasercalcpro.com
```

**邮件服务选项**:
- **Gmail**: 使用应用专用密码（需启用2FA）
- **SendGrid**: `SMTP_HOST=smtp.sendgrid.net`, API Key 作为密码
- **AWS SES**: 配置 SES SMTP 凭证
- **Resend**: 更现代的选择，提供简单 API

---

## 数据库迁移

### 运行迁移脚本

```bash
# 创建 shared_calculations 表
npm run tsx scripts/migrate-shared-calculations.ts
```

### 表结构

```sql
CREATE TABLE shared_calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  short_code TEXT UNIQUE NOT NULL,
  tool_type TEXT NOT NULL,
  calculation_data TEXT NOT NULL,  -- JSON: { inputData, results, chartDataUrl, recommendations }
  expires_at TEXT NOT NULL,        -- ISO 8601 格式
  views INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shared_calculations_short_code ON shared_calculations(short_code);
CREATE INDEX idx_shared_calculations_expires_at ON shared_calculations(expires_at);
```

---

## 使用示例

### 在计算器页面集成

替换原有的 `ExportButton` 为 `ShareExportButtons`:

```tsx
import { ShareExportButtons } from '@/components/calculators/ShareExportButtons';

// 在计算器组件中
<ShareExportButtons
  title="Laser Cutting Cost Report"
  calculationType="Laser Cutting"
  inputData={{
    materialType: 'Stainless Steel',
    thickness: 3,
    cuttingLength: 1500,
    // ...
  }}
  results={{
    totalCost: 125.50,
    materialCost: 45.20,
    // ...
  }}
  chartDataUrl={chartRef.current?.toDataURL()}
  recommendations={[
    'Consider batch production to reduce setup costs',
    'Optimize nesting to improve material utilization'
  ]}
/>
```

---

## 待办（批次 1.4）

### 订阅偏好管理页面
- **路径**: `/subscribe/preferences`, `/subscribe/unsubscribe`
- **功能**:
  - 邮件类型选择（工具更新、教程、产品新闻、合作推广）
  - 频率设置（实时、每周、每月）
  - 取消订阅流程
  - Token 验证（安全性）
  - 取消原因反馈

---

## 技术说明

### PDF 导出
- 使用 `jsPDF` 和 `jspdf-autotable`
- 已实现专业报告生成器（`lib/pdf/generator.ts`）
- 支持表格、图表、推荐、免责声明

### 短链生成
- 当前使用简单随机字符串（8位）
- 生产环境建议使用 `nanoid` 确保唯一性和安全性
- 示例: `lasercalcpro.com/shared/abc123XY`

### 邮件发送
- 使用 `nodemailer`（已安装）
- HTML 邮件模板（响应式）
- 包含输入参数和计算结果表格
- 品牌化设计（LaserCalc Pro 配色）

### 数据库
- 使用 Turso (libSQL) - 已配置
- shared_calculations 表存储分享数据
- 索引优化查询性能
- 30天自动过期（需定期清理）

### 清理任务（可选）
创建定时任务删除过期链接：

```typescript
// scripts/cleanup-expired-shares.ts
import { deleteExpiredSharedCalculations } from '@/lib/db/shared-calculations';

async function cleanup() {
  const deleted = await deleteExpiredSharedCalculations();
  console.log(`Deleted ${deleted} expired shared calculations`);
}

cleanup();
```

可配置 Cloudflare Workers Cron 每天运行一次。

---

## 测试清单

### FAQ 页面
- [ ] 访问 `/faq` 页面正常加载
- [ ] 22 个问答对全部显示
- [ ] 手风琴展开/折叠正常
- [ ] 快速导航跳转准确
- [ ] 移动端响应式良好
- [ ] Schema 结构化数据通过 Google Rich Results Test

### 对比页面
- [ ] 访问 `/calculators/compare` 正常
- [ ] 问卷 4 步流程完整
- [ ] 推荐逻辑准确
- [ ] 对比表格清晰（桌面+移动）
- [ ] 场景推荐卡片完整
- [ ] 所有链接可点击

### 导出/分享功能
- [ ] PDF 导出成功，内容完整
- [ ] 短链生成成功（8位代码）
- [ ] 分享链接可访问 `/shared/[code]`
- [ ] 分享页面显示正确数据
- [ ] 邮件发送成功（配置SMTP后）
- [ ] 邮件 HTML 格式正确
- [ ] 模态框交互流畅
- [ ] 复制链接功能正常

---

## SEO & 性能

### SEO
- FAQ 页面: FAQPage Schema
- 对比页面: 自定义 title/description
- 分享页面: `noindex, nofollow`

### 性能
- 所有组件客户端按需渲染
- 分享数据服务端获取（RSC）
- 图片和图表按需加载
- PDF 在浏览器端生成（无服务器压力）

---

## 下一步

完成批次 1.4 后，批次 1 全部完成。然后进入批次 2（内容深化与信任建设）：
- Blog 分类/标签系统
- 作者页面
- 案例研究页面
- 方法学文档页面

---

**文档最后更新**: 2025-10-31

