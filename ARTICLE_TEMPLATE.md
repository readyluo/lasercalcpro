# LaserCalc Pro 文章撰写规则

## 核心标准

### 文章质量要求
- **字数**: 1800-3000+ 字
- **专业度**: 工业级内容，包含实际数据和公式
- **实用性**: 可操作的建议和真实案例
- **SEO优化**: 关键词密度 2-3%，自然分布

### 内容结构（强制）

```
1. 引言 (200-300字)
   - 问题陈述
   - 读者价值
   - 文章概览

2. 主体内容 (1400-2500字)
   - 3-7个主要章节
   - 每章节包含：
     * 理论解释
     * 实际数据/公式
     * 真实案例
     * 可视化表格/列表
   
3. 实践应用 (200-300字)
   - 操作步骤
   - 优化策略
   - 常见错误

4. 结论 (150-200字)
   - 要点总结
   - 行动建议
   - 相关工具链接
```

## 文章模板

```typescript
export const article = {
  // === 基本信息 ===
  title: '主标题：清晰、包含关键词、50-70字符',
  slug: 'url-friendly-slug-with-keywords',
  category: 'tutorials' | 'industry' | 'case-studies' | 'news',
  
  // === 摘要 (120-160字) ===
  excerpt: '吸引人的摘要，包含核心价值点和关键词。突出读者能获得什么具体知识或技能。',
  
  // === 正文内容 ===
  content: `
<div class="article-content">

<h2>Introduction: [问题/挑战描述]</h2>

<p>[开篇段落：阐述问题的重要性，引起共鸣]</p>

<p>[第二段：说明本文将解决什么问题，读者将获得什么]</p>

<h2>1. [第一个核心概念/因素]</h2>

<p>[理论解释：清晰、专业、易懂]</p>

<h3>Key Points / Formulas</h3>

<p><strong>Formula:</strong> [如果有公式，用清晰的格式展示]</p>

<ul>
<li><strong>要点1:</strong> [具体数据或说明]</li>
<li><strong>要点2:</strong> [具体数据或说明]</li>
<li><strong>要点3:</strong> [具体数据或说明]</li>
</ul>

<h3>Real-World Example</h3>

<p>[实际案例，包含具体数字]</p>

<table>
<tr><th>参数</th><th>数值</th><th>说明</th></tr>
<tr><td>示例数据1</td><td>100</td><td>解释</td></tr>
<tr><td>示例数据2</td><td>200</td><td>解释</td></tr>
</table>

<h2>2. [第二个核心概念/因素]</h2>

[重复上述结构...]

<h2>Practical Implementation</h2>

<h3>Step-by-Step Guide</h3>

<ol>
<li><strong>步骤1:</strong> [具体操作]</li>
<li><strong>步骤2:</strong> [具体操作]</li>
<li><strong>步骤3:</strong> [具体操作]</li>
</ol>

<h3>Optimization Strategies</h3>

<ul>
<li><strong>策略1:</strong> [具体方法和预期效果]</li>
<li><strong>策略2:</strong> [具体方法和预期效果]</li>
</ul>

<h3>Common Mistakes to Avoid</h3>

<ol>
<li>[错误1及如何避免]</li>
<li>[错误2及如何避免]</li>
<li>[错误3及如何避免]</li>
</ol>

<h2>Conclusion</h2>

<p>[总结核心要点，强调价值]</p>

<p>[行动号召，引导使用相关工具]</p>

<h3>Related Tools</h3>

<ul>
<li><a href="/calculators/laser-cutting">Laser Cutting Calculator</a> - [工具说明]</li>
<li><a href="/calculators/cnc-machining">CNC Cost Estimator</a> - [工具说明]</li>
<li><a href="/calculators/roi">ROI Calculator</a> - [工具说明]</li>
</ul>

</div>
  `,
  
  // === SEO元数据 ===
  tags: '["主关键词","次关键词1","次关键词2","行业术语","应用场景"]',
  status: 'published',
  meta_title: 'SEO标题 (50-60字符，包含核心关键词) | LaserCalc Pro',
  meta_description: 'SEO描述 (150-160字符，包含关键词，突出价值主张和行动号召)',
  meta_keywords: '主关键词, 长尾关键词1, 长尾关键词2, 行业术语, 解决方案',
  
  // === 作者和图片 ===
  author_id: 1,
  featured_image: '/images/blog/descriptive-filename.jpg'
};
```

## 内容要求细则

### 数据和案例
- ✅ 使用真实的行业数据（2024-2025）
- ✅ 价格范围合理且可验证
- ✅ 公式正确且实用
- ✅ 案例具体且完整

### 语言风格
- ✅ 专业但易懂
- ✅ 主动语态为主
- ✅ 具体数字代替模糊描述
- ✅ 使用小标题提高可读性

### SEO优化
- ✅ H2标签包含关键词变体
- ✅ 首段包含主关键词
- ✅ 内部链接到相关计算器
- ✅ 表格和列表提高结构化

### HTML格式规范
```html
<!-- 段落 -->
<p>正常段落文本。</p>

<!-- 强调 -->
<p><strong>重要内容加粗</strong></p>

<!-- 列表 -->
<ul>
<li><strong>标题:</strong> 描述</li>
</ul>

<!-- 表格 -->
<table>
<tr><th>列头1</th><th>列头2</th></tr>
<tr><td>数据1</td><td>数据2</td></tr>
</table>

<!-- 链接 -->
<a href="/calculators/laser-cutting">链接文本</a>

<!-- 代码/公式 -->
<p><strong>Formula:</strong> Total Cost = Material + Labor + Overhead</p>
```

## 文章主题库

### Tutorials (教程)
1. ✅ Laser Cutting Cost Guide (已完成)
2. ✅ CNC Machining Cost Formula (已完成)
3. Material Utilization Optimization
4. ROI Calculation for Equipment
5. Energy Efficiency Strategies
6. Advanced Nesting Techniques
7. Tool Life Management
8. Quality Control Methods
9. Production Scheduling
10. Maintenance Best Practices

### Industry (行业)
1. Manufacturing Trends 2025
2. Automation ROI Analysis
3. Supply Chain Optimization
4. Industry 4.0 Implementation
5. Sustainable Manufacturing

### Case Studies (案例研究)
1. Cost Reduction Success Stories
2. Equipment Upgrade Analysis
3. Process Optimization Results
4. Automation Implementation
5. Quality Improvement Cases

## 关键词策略

### 主关键词示例
- laser cutting cost
- CNC machining pricing
- manufacturing cost calculation
- equipment ROI
- material utilization
- energy efficiency manufacturing

### 长尾关键词
- how to calculate laser cutting cost per hour
- CNC machining cost formula breakdown
- reduce manufacturing overhead costs
- improve material utilization rate
- calculate equipment payback period

## 质量检查清单

写作完成后检查：

### 内容质量
- [ ] 字数达到 1800+ 字
- [ ] 包含 3-7 个主要章节
- [ ] 每章节有理论+数据+案例
- [ ] 至少 2 个表格或列表
- [ ] 包含实际价格/数据
- [ ] 有具体操作步骤

### SEO优化
- [ ] Title 包含主关键词
- [ ] Meta description 吸引人
- [ ] 首段包含主关键词
- [ ] H2 标签分布合理
- [ ] 内部链接 2-4 个
- [ ] 关键词密度 2-3%

### 技术规范
- [ ] HTML 格式正确
- [ ] 无拼写错误
- [ ] 链接有效
- [ ] Tags JSON 格式正确
- [ ] Slug URL 友好

### 读者价值
- [ ] 解决实际问题
- [ ] 提供可操作建议
- [ ] 包含避坑指南
- [ ] 引导使用工具

## 快速创建流程

1. **选择主题** (从主题库)
2. **研究关键词** (确定 SEO 策略)
3. **列大纲** (3-7 个主章节)
4. **写内容** (按模板结构)
5. **添加数据** (表格、案例、公式)
6. **优化 SEO** (检查关键词密度)
7. **质量检查** (对照清单)
8. **创建文件** (`content/article-XX-slug.ts`)
9. **更新索引** (`content/index.ts`)
10. **导入数据库** (`npm run import-articles`)

## 示例参考

查看已完成的高质量文章：
- `content/article-01-laser-cutting-cost-complete-guide.ts`
- `content/article-02-cnc-machining-cost-formula.ts`

这两篇是标准范本，新文章应达到相同质量水平。

