# Compare Calculators页面深度审查报告

**页面路径：** `/calculators/compare`  
**页面性质：** 计算器选择向导 + 对比导航页（系统级路由器）  
**审查时间：** 2025年11月19日

---

## 【整体评估】

### 功能深度：7/10
- **优点**：提供三个核心模块：CalculatorQuiz（问答推荐）、ScenarioRecommendations（场景推荐）、ComparisonTable（特性对比）
- **优点**：从“我不知道用哪个工具”到“我会用多个工具组合”的过渡路径是清晰的
- **问题**：页面文案几乎不解释推荐逻辑，用户不知道“系统是怎么想的”
- **问题**：没有明确指出，当推荐结果不匹配用户实际场景时该怎么办

### 结构层次：8/10
- **优点**：Hero → Key Benefits → Quiz → Scenarios → Comparison → CTA 的结构非常清楚
- **优点**：CTA 指向 calculators / guides，完成一个“学习 + 使用”的闭环
- **问题**：缺少一个“本页如何工作 / 推荐流程总览”的总览段落
- **问题**：Key Benefits 偏营销，没有和后面的三个系统模块（Quiz/Scenario/Table）做结构性绑定

### 专业性：7/10
- **优点**：围绕真实决策问题组织内容（场景、对比、推荐）
- **优点**：强调“choose the right tool for your needs”，而不是单纯功能罗列
- **问题**：未体现任何“行业经验”或“典型使用模式”（例如：新购设备评估时常用 ROI+Energy+Laser Cutting 组合）
- **问题**：Quiz 和 ScenarioRecommendations 背后的“规则”在文案中是黑盒，专业性难以感知

### 数据流：6/10
- **当前隐含数据流（依代码推断）：**
  - 用户 → 选择：Quiz 或直接看 Comparison → 点击推荐项 → 跳转到具体 calculator
- **问题**：无“输入 → 推荐 → 再验证”的显式说明
- **问题**：没有告诉用户“推荐只是起点，需要在具体计算器内完善参数并查看限制 / 免责声明”
- **问题**：未说明“一个场景往往需要组合使用多个计算器”的整体工作流（例如：先算 Hourly Rate，再用 Laser Cutting）

### 交互性：8/10
- **优点**：首屏两个 CTA（Take the Quick Quiz / View Full Comparison）给了清晰起点
- **优点**：结构段落清晰，滚动体验顺畅
- **问题**：对第一次来网站的用户而言，不知道“先 quiz 还是先 comparison”更合适
- **问题**：缺少对“推荐结果的可靠度”和“下一步操作”的文字引导

### 综合评分：**7.2/10**（结构优秀，逻辑清楚，但推荐逻辑和专业边界需要在文案层面讲透）

---

## 【修改后正文（文案结构方案）】

> 说明：以下是建议的文案结构与要点，方便你在现有英文页面上重写或补充说明，保持 UI 结构不大改，只增强“系统思维”和“边界感”。

### 一、Hero 区：从“找工具”升级为“选择路径”的说明

- **标题：**
  - "Find the Right Calculator for Your Job"
- **副标题：**
  - "Answer a few questions or browse a side-by-side comparison to see which calculators fit your current decision—costing a job, buying a machine, or improving utilization."
- **补充一行（透明度 & 边界）：**
  - "Recommendations are guidance, not rules. Many real-world decisions use 2–3 calculators together."
- **按钮文案微调：**
  - Quiz 按钮副文案："Best if you’re not sure where to start"
  - Comparison 按钮副文案："Best if you already know roughly what you’re looking for"

### 二、"How This Page Works" 概览（新增小节）

紧接 Hero 之下，增加一个简短卡片，解释本页是一个“选择路由器”：

- **小标题：** "How This Page Helps You Choose"
- **三步说明：**
  1. "Tell us about your situation" – via a short quiz or by scanning common scenarios.
  2. "See recommended calculators" – we map your situation to 1–3 tools that match your goal.
  3. "Deep-dive in the calculators" – open the suggested tools, enter your real shop data, and review detailed results and limitations.
- **提醒：**
  - "For critical decisions (equipment purchases, long-term contracts), always run more than one calculator—e.g., Laser Cutting + ROI + Energy."

### 三、Quiz 模块：补充数据流与限制说明

在 Quiz 标题与组件之间增加一小段文字：

- **说明 "What the quiz does":**
  - "This quiz groups your answers into a few common manufacturing decision patterns (job costing, equipment selection, utilization, energy), then suggests calculators that typically help with those patterns."
- **说明 "What it doesn’t do":**
  - "It doesn’t know your exact shop layout, machine list, or pricing strategy. Treat the results as a starting point, not a final answer."
- **使用步骤（1-2 句）：**
  - "Answer 4–6 questions in plain language. You’ll get 1–3 calculators recommended for your current goal, plus a short explanation of why."
- **错误/异常场景提醒：**
  - "If none of the suggested calculators feel right, browse the full comparison table below or visit the calculators overview page. Your situation may span multiple tools."

### 四、Scenario Recommendations：把“场景 → 工具组合”写清楚

在 ScenarioRecommendations 上方增加一段总览说明：

- **小标题：** "Typical Scenarios & Tool Combos"
- **文字要点：**
  - "Each scenario below describes a real-world decision (e.g., quoting a laser job, evaluating a machine purchase). Instead of pointing you to a single calculator, we recommend a small stack of tools that work well together."

针对每个场景（在组件内部文案中实现），建议统一结构：
- **场景标题：** 如 "Quoting a new laser cutting job"
- **简述：** 2–3 句，说明业务背景
- **建议工具组合：**
  - 必选："Laser Cutting Calculator"（主工具）
  - 支持："Hourly Rate (Quick)", "Material Costs Reference", "Pierce Time (Quick)" 等
- **顺序建议：**
  - "Step 1: Use Hourly Rate (Quick) to confirm your shop rate"
  - "Step 2: Run the Laser Cutting Calculator with real geometry"
  - "Step 3: Use Material Costs Reference to sanity-check material pricing"
- **限制说明：**
  - "If your job includes bending, welding, or machining, you’ll need to combine this with other tools—this page focuses on the laser portion only."

### 五、Comparison Table：从“功能表”升级为“决策维度清单”

在 ComparisonTable 顶部增加一段解释：

- **说明列的含义：**
  - "Use the table below to compare calculators across a few decision-making dimensions: what they estimate (time, cost, ROI), how many inputs they require, and when they’re typically used in a project."
- **建议增加/强调的对比维度（在组件内实现）：**
  - Primary output: Time / Cost / ROI / Utilization / Energy
  - Typical use phase: Early quoting / Detailed quoting / Investment decision / Continuous improvement
  - Typical user: Estimator / Production planner / Owner/GM / Process engineer
  - Required input quality: Rough ranges / Exact numbers / Historical data

### 六、错误处理与限制说明（新增专门卡片）

在 Comparison Table 与 CTA 之间新增一个 Error & Limits 区块，用人话讲清边界：

- **标题：** "Limitations & How to Use Recommendations Safely"
- **要点：**
  - "The quiz and scenarios are based on common patterns from shops we’ve worked with. Your situation may be different."
  - "Some decisions—like buying a laser and hiring staff—span multiple calculators. Don’t expect a single tool to answer everything."
  - "Always check the assumptions and disclaimers on each calculator page before making commitments to customers or banks."
  - "When in doubt, run 2–3 related calculators and compare how sensitive your decision is to each cost driver."

### 七、CTA 区：给出清晰的下一步操作路径

在现有 CTA 文案基础上，增加一句说明：

- 在按钮下增加一行小字：
  - "New to this? Start with the quiz, then read the Methodology page to understand how calculations work."
  - 并在 CTA 区增加指向 `/methodology` 的文本链接（非主按钮）。

---

## 【关键调整说明】

- **[系统视角补强]**：
  - 新增 "How This Page Works"，把 Quiz / Scenario / Table 三个模块串成一个清晰的数据流，而不是三个彼此独立的“版块”。
- **[推荐逻辑透明化]**：
  - 在 Quiz 和 Scenario Recommendations 前增加说明：我们是如何根据“决策类型”来选出 1–3 个推荐工具的，避免给人“玄学推荐”的感觉。
- **[多工具组合意识]**：
  - 场景推荐里明确写出典型的工具组合和使用顺序（主工具 + 支持工具），强调“一个问题往往需要多个计算器协同”。
- **[决策维度明确化]**：
  - Comparison Table 不再只是“功能表”，而是围绕“输出类型 / 项目阶段 / 典型用户 / 输入精度要求”等决策维度组织，让用户按决策思路筛选工具。
- **[错误处理与边界说明]**：
  - 新增 Limitations 卡片，集中说明“推荐仅供参考”“复杂决策需多工具联合”“必须阅读各计算器自身免责声明”等，防止误用。
- **[起步路径明确]**：
  - 在 Hero CTA 和底部 CTA 中，用短句明确：
    - 不知道从哪开始 → 先做 Quiz
    - 已有经验、想细看 → 直接看 Comparison Table
    - 想了解计算逻辑 → 去 Methodology 页面。

整体上，这些调整让 Compare 页面从一个“漂亮的导航页”，变成一个**讲清系统如何思考、推荐边界在哪里、用户下一步怎么做**的专业向导页。
