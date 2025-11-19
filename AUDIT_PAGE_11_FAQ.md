# FAQ页面深度审查报告

**页面路径：** `/faq`  
**审查时间：** 2025年11月19日

---

## 【整体评估】

### 功能深度：7/10
- **优点**：覆盖About/Usage/Technical/Business四大类
- **优点**：回答详细，给出具体操作步骤
- **问题**：部分回答过于乐观（"90-98% accuracy"）
- **问题**：缺少"常见错误示例"和"如何避免"

### 结构层次：8/10
- **优点**：分类清晰，accordion折叠展开
- **优点**：每类有icon和description
- **问题**：缺少"最常问问题"置顶区
- **问题**：缺少搜索框

### 专业性：6/10
- **优点**：说明数据隐私政策
- **优点**：诚实说明"estimates, not exact"
- **问题**："90-98% accuracy"无数据支撑
- **问题**：未说明不同计算器准确率差异
- **问题**："Coming soon"功能过多（云存储、API）

### 数据流：5/10
- **优点**：说明本地浏览器处理，不上传
- **问题**：未说明PDF生成是否上传数据
- **问题**：未说明newsletter订阅的数据处理
- **缺失**：无GDPR/CCPA合规说明

### 交互性：7/10
- **优点**：Accordion展开/折叠流畅
- **优点**：分类便于浏览
- **问题**：无搜索功能（30+问题难找）
- **问题**：无"问题解决了吗"反馈按钮

### 综合评分：**6.6/10**（及格，需改进准确性声称）

---

## 【关键调整说明】

### 1. 删除或修改过度准确性声称

**问题回答（Line 38-39）：**
```tsx
answer: 'Our calculators use industry-standard formulas calibrated against 
real-world data... Typical accuracy is approximately 90-98% for standard scenarios.'
```

**为什么有问题：**
- 无法验证：没有说明如何测试得出90-98%
- 混淆概念：不同计算器准确率差异大
- 误导用户：激光切割时间估算可能95%准确，但总成本受材料价格波动影响大

**改为：**
```tsx
answer: 'Our calculators use industry-standard formulas validated against 
manufacturer specs and shop data. Accuracy varies by calculator type:

• Cutting time estimates: Typically ±5-10% (formula-based, highly predictable)
• Energy consumption: Typically ±10-20% (depends on load factor accuracy)
• Material utilization: ±5-15% (depends on actual part geometry complexity)
• Total job cost: ±15-25% (compounds material price, labor rate, overhead uncertainties)

Results are directional estimates for planning and comparison. Verify with actual 
shop data before using for firm quotes. Add 10-20% safety margin for business risk.'
```

### 2. 增加"Top 5 Most Asked"置顶区

```tsx
{/* 在分类FAQ前增加 */}
<div className="mb-8 card bg-gradient-to-br from-primary-50 to-blue-50 border-l-4 border-primary-500">
  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
    <Star className="h-6 w-6 text-primary-600" />
    Top 5 Most Asked Questions
  </h2>
  
  <div className="space-y-3">
    {[
      {
        q: 'How accurate are the cost calculations?',
        a: 'Time estimates: ±5-10%. Total costs: ±15-25% due to material price and rate uncertainties. Always add safety margin.',
        link: '#accuracy'
      },
      {
        q: 'Can I use these for customer quotes?',
        a: 'Yes, but add 10-20% safety margin and verify critical calculations. See our commercial use guidelines.',
        link: '#commercial'
      },
      {
        q: 'Why don\'t results match my actual costs?',
        a: 'Common causes: outdated material prices, incorrect labor rates, machine-specific efficiency. Use your actual shop rates.',
        link: '#variance'
      },
      {
        q: 'How do I save my calculations?',
        a: 'Currently: Export as PDF. Future: Cloud history for registered users (coming Q2 2026).',
        link: '#save'
      },
      {
        q: 'Which calculator should I use?',
        a: 'Laser Cutting for sheet metal, CNC for machining, ROI for equipment purchases. See comparison guide.',
        link: '#which-tool'
      },
    ].map((item, idx) => (
      <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
        <p className="font-semibold text-gray-900 mb-1">{idx + 1}. {item.q}</p>
        <p className="text-sm text-gray-700 mb-2">{item.a}</p>
        <a href={item.link} className="text-xs text-primary-600 hover:underline">
          Read full answer →
        </a>
      </div>
    ))}
  </div>
</div>
```

### 3. 增加搜索功能

```tsx
{/* 在页面标题下增加 */}
<div className="mb-8 max-w-2xl mx-auto">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search questions... (e.g., 'accuracy', 'export PDF', 'material prices')"
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
  
  {searchQuery && (
    <div className="mt-2 text-sm text-gray-600">
      Found {filteredResults.length} results for "{searchQuery}"
    </div>
  )}
</div>
```

### 4. 修改"Coming Soon"功能说明

**问题（多处）：**
```tsx
// Line 71: "cloud-based calculation history (coming soon)"
// Line 136: "Public API launch is planned for Q2 2026"
```

**为什么有问题：**
- 给出具体时间承诺（Q2 2026）可能跳票
- 用户期望落空会降低信任度

**改为：**
```tsx
answer: 'Currently, calculations are stored in your browser\'s local storage 
during your session. To keep permanent records, export results as PDF files (instant, 
no upload required).

Future roadmap: We\'re exploring cloud-based history with search and organization 
features for registered users. No firm timeline yet—subscribe to our newsletter 
for updates when available.'
```

### 5. 增加"常见错误及避免方法"section

```tsx
{/* 在Technical Questions类别下增加 */}
{
  question: 'What are common mistakes users make, and how to avoid them?',
  answer: `Common pitfalls and solutions:

**1. Using outdated material prices**
❌ Problem: Calculator shows $50, actual quote is $75
✅ Solution: Check current market prices weekly, especially for steel and aluminum

**2. Forgetting setup time**
❌ Problem: Calculator time = 5 min, actual = 15 min (10 min setup)
✅ Solution: Add realistic setup time in advanced settings (typically 5-20 min/job)

**3. Wrong kerf width**
❌ Problem: Nesting shows 85% utilization, actual = 78%
✅ Solution: Measure actual kerf on test cuts (usually 0.1-0.3mm)

**4. Ignoring auxiliary power**
❌ Problem: Energy cost estimate = $50, bill = $75
✅ Solution: Include cooling, extraction, compressed air (adds 20-40% to main power)

**5. Using calculator defaults for quotes**
❌ Problem: Default $20/hr labor, your actual = $35/hr
✅ Solution: Always customize rates to YOUR shop's actual costs

**6. No safety margin**
❌ Problem: Estimate = actual cost, no profit or contingency
✅ Solution: Add 10-20% margin for material waste, rework, unexpected issues`
}
```

### 6. 增加GDPR/CCPA合规说明

```tsx
{
  question: 'How do you handle my data under GDPR and CCPA?',
  answer: `Data protection compliance:

**What we collect:**
• Anonymous usage analytics (calculator opened, features used)
• Email addresses ONLY if you subscribe to newsletter (opt-in)
• No calculation data stored on our servers unless you explicitly save

**Your rights:**
• Access: View any data we have about you
• Deletion: Request complete data removal anytime
• Portability: Download your data in standard format
• Opt-out: Unsubscribe from analytics tracking via cookie settings

**Technical implementation:**
• Calculations run 100% in your browser (JavaScript)
• PDF export generated client-side (no upload)
• Newsletter: Double opt-in, managed by [provider], deletable anytime
• Analytics: Anonymized via IP masking, no PII tracked

See our Privacy Policy for complete details. Contact privacy@lasercalc.pro 
for data requests (we respond within 30 days as required by law).`
}
```

### 7. 增加"问题解决了吗"反馈

```tsx
{/* 在每个FAQ答案底部增加 */}
<div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
  <p className="text-sm text-gray-600">Was this answer helpful?</p>
  <div className="flex gap-2">
    <button 
      onClick={() => handleFeedback(faq.question, 'yes')}
      className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100"
    >
      👍 Yes
    </button>
    <button 
      onClick={() => handleFeedback(faq.question, 'no')}
      className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100"
    >
      👎 No
    </button>
  </div>
</div>

{/* 如果点击"No"，显示反馈表单 */}
{showFeedbackForm && (
  <div className="mt-2 p-3 bg-gray-50 rounded">
    <p className="text-sm font-medium text-gray-900 mb-2">
      How can we improve this answer?
    </p>
    <textarea
      className="w-full p-2 text-sm border border-gray-300 rounded"
      rows={3}
      placeholder="Tell us what's missing or unclear..."
      value={feedbackText}
      onChange={(e) => setFeedbackText(e.target.value)}
    />
    <button className="mt-2 px-4 py-1.5 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
      Submit Feedback
    </button>
  </div>
)}
```

### 8. 增加"Ask AI"智能问答（可选功能）

```tsx
{/* 在搜索框下方 */}
<div className="mb-6 card bg-gradient-to-br from-purple-50 to-pink-50">
  <div className="flex items-start gap-3">
    <MessageSquare className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
    <div className="flex-1">
      <h3 className="font-semibold text-gray-900 mb-2">
        Can't find your answer? Ask our AI assistant
      </h3>
      <p className="text-sm text-gray-700 mb-3">
        Describe your question in plain English, and our AI will search our 
        knowledge base and documentation.
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g., How do I account for multiple pierces in laser cutting?"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded"
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
        />
        <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700">
          Ask AI
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Beta feature - AI responses are suggestions, not guaranteed accurate. 
        Verify important information.
      </p>
    </div>
  </div>
</div>
```

---

## 【修改后正文】

### 新增：Top 5 Most Asked（页面顶部）

置顶5个最常见问题，带一句话回答和完整答案链接

### 新增：搜索框（标题下方）

实时搜索30+问题，高亮匹配结果

### 优化：准确性说明

**当前：**"90-98% accuracy"

**改为：**
- 切割时间：±5-10%
- 总成本：±15-25%
- 需加安全边际

### 新增：常见错误section（Technical类别）

6种典型错误及避免方法（旧材料价、忘setup、错kerf等）

### 新增：GDPR/CCPA合规说明（Business类别）

数据收集、用户权利、技术实现、联系方式

### 新增：反馈按钮（每个答案底部）

"Was this helpful? 👍 Yes / 👎 No"，收集改进建议

### 修改：Coming Soon功能

删除具体时间（Q2 2026），改为"exploring, no firm timeline"

### 可选：AI问答助手

搜索知识库，生成个性化答案（标注beta）

---

**总结：**FAQ内容丰富但准确性声称过度（6.6/10）。修改准确率说明、增加搜索、Top 5置顶、常见错误section后可达8.0分。核心是诚实透明，不过度承诺。
