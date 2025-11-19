# 审查报告实施清单

**创建时间：** 2025年11月19日  
**预计完成时间：** 2周内  
**责任人：** 开发团队

---

## 📋 实施概览

### 审查范围
- ✅ 首页 (/)
- ✅ 计算器总览 (/calculators)
- ✅ Laser Cutting Calculator
- ✅ Cost Center Hub
- ⏳ Material Utilization（待创建报告）
- ⏳ ROI Calculator（待创建报告）
- ⏳ About页面（待创建报告）

### 已完成报告
1. `SITE_AUDIT_SUMMARY.md` - 总体总结和优先级
2. `AUDIT_PAGE_01_HOMEPAGE.md` - 首页详细审查
3. `AUDIT_PAGE_02_CALCULATORS.md` - 计算器总览
4. `AUDIT_PAGE_03_LASER_CUTTING.md` - 激光切割计算器
5. `AUDIT_PAGE_04_COST_CENTER.md` - 成本中心Hub

---

## 🔴 第1优先级：立即修复（本周完成）

### 1.1 删除所有绝对准确率声称

**文件：** `app/page.tsx`, `app/calculators/page.tsx`

**搜索关键词：**
- "98%"
- "95-98%"
- "accuracy rate"

**修改：**
```tsx
// ❌ 删除
<div className="text-3xl font-bold">98%</div>
<div className="text-sm">Accuracy</div>

// ✅ 替换为
<div className="text-3xl font-bold">15+</div>
<div className="text-sm">Professional Tools</div>
```

**预计工作量：** 30分钟  
**测试要求：** 全站搜索确认无残留  
**完成标志：** ☐

---

### 1.2 首页增加透明度声明框

**文件：** `app/page.tsx`  
**位置：** Hero Section，CTA按钮上方（Line ~100-110之间）

**代码：**
```tsx
{/* 新增：透明度声明 */}
<div className="mb-8 mx-auto max-w-2xl">
  <div className="rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
    <p className="flex items-start gap-2">
      <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <span>
        <strong>How These Tools Work:</strong> Our calculators use simplified 
        industry formulas combined with your specific input data to generate 
        cost estimates. Results are approximations for planning and comparison—
        actual costs depend on your equipment, processes, and local conditions. 
        Always validate estimates against your own production data.
      </span>
    </p>
  </div>
</div>
```

**预计工作量：** 20分钟  
**测试要求：** 移动端显示正常  
**完成标志：** ☐

---

### 1.3 计算器页面标准化免责声明

**文件：** 所有`app/calculators/*/page.tsx`

**检查清单：**
- ☐ Laser Cutting - ✅ 已有（参考模板）
- ☐ CNC Machining - 检查并标准化
- ☐ Marking - 检查并标准化
- ☐ Welding - 检查并标准化
- ☐ Material Utilization - ✅ 已有
- ☐ Energy - 检查并标准化
- ☐ ROI - 检查并标准化（使用蓝色风格，非amber）

**标准模板（Laser Cutting style）：**
```tsx
<div className="mb-4 border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
  <p className="text-sm text-amber-900">
    <Info className="mr-2 inline h-4 w-4" />
    <strong>Estimates Only:</strong> Results use simplified formulas. 
    Actual costs depend on your equipment, materials, and rates. 
    Validate with your own data before quoting.
  </p>
</div>
```

**预计工作量：** 1.5小时（7个计算器）  
**测试要求：** 每个计算器页面截图验证  
**完成标志：** ☐

---

### 1.4 首页增加数据隐私说明

**文件：** `app/page.tsx`  
**位置：** Features section → Additional Features部分

**代码：**
```tsx
<div className="card text-center">
  <Shield className="mx-auto mb-3 h-10 w-10 text-blue-600" />
  <h4 className="mb-2 text-lg font-semibold text-gray-900">
    Your Data Stays Private
  </h4>
  <p className="text-sm text-gray-600">
    Calculations run in your browser. We don't store your input parameters 
    or business-sensitive data. What you enter stays on your device.
  </p>
</div>
```

**预计工作量：** 15分钟  
**测试要求：** 确认措辞准确（检查是否真的是客户端计算）  
**完成标志：** ☐

---

## 🟡 第2优先级：结构优化（下周完成）

### 2.1 首页Features重组为两层

**文件：** `app/page.tsx`  
**工作量：** 1.5小时

**结构：**
```
Features Section
├── Core Benefits (3个)
│   ├── Always Free
│   ├── Industry-Standard Formulas  
│   └── Instant Results
└── Additional Features (3个)
    ├── Professional Reports
    ├── Your Data Stays Private
    └── Transparent Methodology
```

**参考：** `AUDIT_PAGE_01_HOMEPAGE.md` Line 200-300  
**测试要求：** 视觉层次清晰，移动端响应  
**完成标志：** ☐

---

### 2.2 计算器页增加工具分类导航

**文件：** `app/calculators/page.tsx`  
**工作量：** 2-3小时

**新增元素：**
1. 3个分类导航卡片（Quick / Full / Reference）
2. 工具网格按类别重新组织
3. 每个section有说明文字

**参考：** `AUDIT_PAGE_02_CALCULATORS.md` Line 150-250  
**测试要求：** 
- 分类逻辑正确
- 链接正常跳转
- 视觉区分明显  
**完成标志：** ☐

---

### 2.3 Laser Cutting增加"Typical Values"参考

**文件：** `app/calculators/laser-cutting/page.tsx`  
**位置：** 输入表单右侧或collapsible panel  
**工作量：** 1小时

**内容：**
- Material Price ranges
- Electricity Rate by region
- Labor Rate ranges
- Gas consumption typical values

**参考：** `AUDIT_PAGE_03_LASER_CUTTING.md` Line 450-500  
**测试要求：** 数值准确，来源可验证  
**完成标志：** ☐

---

### 2.4 Cost Center增加工具工作流程图

**文件：** `app/calculators/cost-center/page.tsx`  
**位置：** "How to Use These Tools"之后  
**工作量：** 2-3小时

**元素：**
- 3步workflow（Monthly → Per Quote → Pricing）
- 工具之间的数据流动箭头
- 可点击的工具标签

**参考：** `AUDIT_PAGE_04_COST_CENTER.md` Line 300-400  
**测试要求：** 交互流畅，视觉清晰  
**完成标志：** ☐

---

## 🟢 第3优先级：持续改进（两周后）

### 3.1 术语解释Hover提示系统

**影响文件：** 全站  
**工作量：** 4-5小时

**技术实现：**
```tsx
// 创建 TermTooltip 组件
<TermTooltip term="npv">
  NPV (Net Present Value)
</TermTooltip>

// 术语库（lib/glossary.ts）
export const glossary = {
  npv: {
    short: "Net Present Value",
    long: "The present value of future cash flows discounted at your chosen rate...",
    example: "An NPV of $50K means the investment is worth $50K more than its cost..."
  },
  // ...
}
```

**优先术语清单：**
- NPV, IRR, ROI
- Kerf, Pierce, Nesting
- Depreciation, Amortization
- Utilization, Throughput

**完成标志：** ☐

---

### 3.2 Laser Cutting增加"Quick Sanity Check"

**文件：** `app/calculators/laser-cutting/page.tsx`  
**位置：** Results Summary下方  
**工作量：** 2-3小时

**功能：**
- 检测material cost占比>60%
- 检测cost per meter异常高
- 检测utilization异常低
- 给出警告和建议

**参考：** `AUDIT_PAGE_03_LASER_CUTTING.md` Line 600-650  
**完成标志：** ☐

---

### 3.3 建立内容审核Checklist

**文件：** 新建 `CONTENT_REVIEW_CHECKLIST.md`  
**工作量：** 1小时

**清单内容：**
- [ ] 有免责声明
- [ ] 无绝对准确率声称
- [ ] 术语有解释
- [ ] FAQ诚实负责
- [ ] 有"validate against own data"提示
- [ ] 移动端测试通过

**用途：** 新页面/新功能上线前检查  
**完成标志：** ☐

---

## 📊 进度跟踪

### 第1优先级进度

| 任务 | 预计工时 | 实际工时 | 状态 | 完成日期 |
|------|---------|---------|------|---------|
| 1.1 删除准确率声称 | 0.5h | - | ⏳ | - |
| 1.2 首页透明度声明 | 0.3h | - | ⏳ | - |
| 1.3 标准化免责声明 | 1.5h | - | ⏳ | - |
| 1.4 数据隐私说明 | 0.3h | - | ⏳ | - |
| **小计** | **2.6h** | - | - | - |

### 第2优先级进度

| 任务 | 预计工时 | 实际工时 | 状态 | 完成日期 |
|------|---------|---------|------|---------|
| 2.1 Features重组 | 1.5h | - | ⏳ | - |
| 2.2 工具分类导航 | 2.5h | - | ⏳ | - |
| 2.3 Typical Values | 1h | - | ⏳ | - |
| 2.4 Workflow图 | 2.5h | - | ⏳ | - |
| **小计** | **7.5h** | - | - | - |

### 第3优先级进度

| 任务 | 预计工时 | 实际工时 | 状态 | 完成日期 |
|------|---------|---------|------|---------|
| 3.1 术语Tooltip | 4.5h | - | ⏳ | - |
| 3.2 Sanity Check | 2.5h | - | ⏳ | - |
| 3.3 Review Checklist | 1h | - | ⏳ | - |
| **小计** | **8h** | - | - | - |

**总预计工时：** 18小时（约2-3个工作日）

---

## ✅ 验收标准

### 第1优先级验收

- [ ] 全站搜索"98%", "95-98%"无结果
- [ ] 首页有蓝色透明度声明框
- [ ] 7个主要计算器都有amber免责声明
- [ ] 首页Features有数据隐私卡片
- [ ] 移动端显示正常
- [ ] 无console error

### 第2优先级验收

- [ ] 首页Features分为Core + Additional两层
- [ ] 计算器页有3个分类导航卡片
- [ ] 工具按类别分组显示
- [ ] Laser Cutting有Typical Values参考
- [ ] Cost Center有workflow diagram
- [ ] 所有链接正常工作

### 第3优先级验收

- [ ] 10+个术语有tooltip
- [ ] Laser Cutting有Sanity Check功能
- [ ] 有Content Review Checklist文档
- [ ] 团队熟悉checklist使用

---

## 📝 实施注意事项

### 代码质量

1. **保持一致性**
   - 免责声明用amber配色（除ROI用blue）
   - 卡片间距用统一的`gap-6`或`gap-8`
   - Icon大小统一为`h-4 w-4`或`h-5 w-5`

2. **组件复用**
   - 免责声明框 → 抽取为`<DisclaimerBox>`组件
   - 工具分类卡片 → 抽取为`<ToolCategoryCard>`
   - Typical Values → 抽取为`<TypicalValuesPanel>`

3. **测试覆盖**
   - 每个修改后运行`npm run build`
   - 检查TypeScript错误
   - 测试移动端响应
   - 验证所有链接

### Git Commit规范

```bash
# 第1优先级
git commit -m "fix: remove unverified accuracy claims from homepage"
git commit -m "feat: add transparency notice to homepage hero"
git commit -m "feat: standardize disclaimer across calculators"

# 第2优先级
git commit -m "refactor: reorganize homepage features into core + additional"
git commit -m "feat: add tool classification navigation to calculators page"

# 第3优先级
git commit -m "feat: add terminology tooltip system"
git commit -m "feat: add sanity check to laser cutting results"
```

### 部署检查

- [ ] Staging环境测试通过
- [ ] 性能无明显下降
- [ ] SEO metadata未受影响
- [ ] Analytics tracking正常
- [ ] PDF export功能正常

---

## 🆘 遇到问题时

### 技术问题

1. **查看详细报告**
   - 每个页面有独立的详细审查报告
   - 包含具体代码示例和实现说明

2. **参考最佳实践**
   - Laser Cutting免责声明（Line 126-131）
   - Cost Center工具分类（Line 26-75）
   - Material Utilization FAQ（Line 49-64）

3. **团队讨论**
   - 不确定的措辞找产品经理确认
   - 技术实现难点找团队讨论
   - 优先级冲突找项目经理决策

### 内容问题

1. **措辞不确定**
   - 参考现有好的FAQ（Laser Cutting, ROI）
   - 原则：诚实>营销，限定>绝对
   - 避免："一定"、"总是"、"保证"

2. **数据不确定**
   - Typical Values需要行业研究支持
   - 无法验证的数字不要写
   - 用范围而非单一数字

3. **优先级冲突**
   - 参考`SITE_AUDIT_SUMMARY.md`总体优先级
   - 红色问题>黄色问题>绿色优化
   - 有疑问找项目经理确认

---

## 📅 里程碑

### Week 1（本周）
- ✅ 完成所有审查报告
- ⏳ 实施第1优先级所有任务
- ⏳ 部署到staging测试

### Week 2（下周）
- ⏳ 实施第2优先级所有任务
- ⏳ 代码审查和测试
- ⏳ 部署到production

### Week 3-4（持续）
- ⏳ 实施第3优先级任务
- ⏳ 收集用户反馈
- ⏳ 迭代优化

---

**实施开始日期：** ___________  
**目标完成日期：** ___________  
**实际完成日期：** ___________

---

**备注：** 此清单应与审查报告配合使用。每完成一项打勾，并记录实际工时和完成日期。
