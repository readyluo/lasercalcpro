# Quick Tools入口页深度审查报告

**页面路径：** `/calculators/quick`  
**页面性质：** 迷你计算器集合入口页（系统级导航）  
**审查时间：** 2025年11月19日

---

## 【整体评估】

### 功能深度：8/10
- **优点**：三种 Quick 工具（Price per Meter / Hourly Rate / Pierce Time）定位清晰，各自有 useCase
- **优点**：FAQ 明确说明 Quick vs Full Calculators 的差异
- **优点**：Workflow 部分把 Quick Reference → Quick Tools → Full Calculators 串成一个流程
- **问题**：对 Quick Tools 的"准确度"描述略乐观（"typically within 10%"），未说明依赖前提
- **问题**：未说明 Quick Tools 复用/简化了哪些底层模型（与 full calculators 的关系）

### 结构层次：8/10
- **优点**：结构分为 Header → 工具卡片 → When to Use → Quick vs Full → Workflow → Related Resources
- **优点**：卡片上有 Features + USE CASE，已经体现了“主功能 + 支持点”
- **问题**：三张卡片完全平级，没有引导“先从哪个开始”
- **问题**：Workflow 只讲流程，不讲“每步会暴露/隐藏哪些参数”

### 专业性：7/10
- **优点**：明确告诉用户 Quick Tools 适合“fast quotes / initial estimates / standard jobs”
- **优点**：有 Limitations 列表，说明“simplified calculations / typical efficiency assumed”
- **问题**：未说明 Quick Tools 底层假设（切割速度从何而来？废料率 10% 是否可调？）
- **问题**：Accuracy 表格给出了 +/-2-3% 对 full calculators，缺少误差来源解释

### 数据流：7/10
- **优点**：Workflow 描述了 Reference → Quick → Full 的宏观数据流
- **优点**：表格里提到了“3-8 inputs vs 15-30 inputs”，暗示输入维度差异
- **问题**：未对“用户从这个入口点击进入单个 Quick 工具后”的具体数据流做文字说明
- **问题**：缺少“Quick 结果 → 如何校准到自家车间数据”的说明

### 交互性：8/10
- **优点**：卡片层级、图标和 USE CASE 帮助用户快速判断选哪个
- **优点**：Limitations / Upgrade To / Workflow 形成了较完整的使用引导
- **问题**：缺少“第一步推荐”（例如先算 Hourly Rate，再用 Price per Meter）
- **问题**：未对“错误使用场景”（例如拿 Quick 结果直接做大型项目正式报价）做醒目提醒

### 综合评分：**7.8/10**（整体不错，适合作为“轻量工具系统”的入口）

---

## 【修改后正文（文案结构方案）】

> 说明：这里给的是“整页文案的结构与要点”，而不是直接贴 TSX 代码。你可以按此结构重写 / 调整现有英文文案。

### 一、页面主标题区（Hero）

- **H1：**
  - "Quick Tools for Fast Manufacturing Estimates"
- **副标题：**
  - "Mini calculators for price-per-meter, hourly rate, and pierce time. Ideal for quick quotes, phone calls, and early-stage planning—without filling in every engineering detail."
- **一句话透明度说明（加一行小字）：**
  - "Quick Tools trade some detail for speed. Use them for ballpark estimates, then verify with full calculators before sending formal quotes."

### 二、Quick Tools 卡片区（主功能 + 支持功能）

文案层级：
- 主标题："Choose a Quick Tool"
- 每张卡片明确：
  - 核心问题（What this tool solves）
  - 典型输入（Key inputs）
  - 核心输出（Key outputs）
  - 适用场景 + 不适用场景简短提示

示例（以 Price per Meter 为例，英文文案要点）：
- **Title:** "Price per Meter (Mini)"
- **Problem it solves:**
  - "Get a fast, all-in cutting cost per meter without building a full job in the main laser cutting calculator."
- **Key inputs (列为文本，不是表单)：**
  - Material type & thickness
  - Machine hourly rate (or use a typical range)
  - Typical cutting speed from reference tables
- **Key outputs：**
  - Operating cost per meter (energy + labor)
  - Suggested quote range per meter (with safety margin)
- **Use case / Not ideal tags：**
  - "Best for: Straight cuts, simple geometries, standard materials"
  - "Not ideal for: Complex nesting, multi-process jobs, high-value contracts—use the full laser cutting calculator instead."

对另外两个工具（Hourly Rate / Pierce Time）按同样结构写清：
- 解决的问题
- 输入简要列表
- 输出项目
- 适用 / 不适用场景

### 三、"When to Use Quick Tools"（场景与边界）

把现有三列改写成更“决策树”的感觉：
- **Best for（保留）**：
  - "First conversation with a new customer"
  - "Checking whether a job is roughly profitable"
  - "Ranking jobs by priority or margin"
- **Not for（新增一列或加在 Limitations 中）：**
  - "Long-term contracts and frame agreements"
  - "Highly customized, multi-step jobs"
  - "Quoting work where penalties apply for being late or over budget"
- **Upgrade to（保留但文案补强）：**
  - 明确："Before sending a formal quote or committing capacity, always re-run the job in the full calculator with your exact material, gas, nesting, and setup details."

### 四、"How Quick Tools Work"（数据流说明）

新增一个短 section，用自然语言解释 Quick 系统的数据流：

- **Inputs:**
  - "You provide a few high-impact parameters (material, thickness, basic rates)."
- **Processing:**
  - "Quick Tools combine your inputs with typical values from our reference tables (cutting speeds, pierce times, efficiency factors)."
  - "We deliberately hide dozens of secondary inputs to keep things fast. Those details live in the full calculators."
- **Outputs:**
  - "You get a ballpark number—price per meter, hourly rate, or pierce time—that is usually within 10–20% of a fully detailed calculation for standard jobs."
- **Next steps:**
  - "If the job moves forward, copy these assumptions into the full calculator to refine the estimate, add material, gas, and waste, and generate a quote-ready breakdown."

### 五、错误处理与限制说明（显式 Disclaimer 区块）

在当前表格和 Limitations 之外，单独加一个卡片，总结：
- **Quick Tools 并不：**
  - Track your actual shop data automatically
  - Include material, nesting, scrap value, or overhead in detail
  - Replace your own cost accounting or ERP
- **常见错误使用方式：**
  - 用默认时薪 / 费率直接对外报价
  - 把 Quick 结果当成“保底利润”而不是“估算基线”
  - 用于极端厚板、特殊材料、极复杂几何
- **清晰指示：**
  - "Treat Quick Tools as a fast first pass. For real money on the line, always upgrade to the detailed calculators and compare against your historical jobs."

---

## 【关键调整说明】

- **[系统定位更清晰]**：
  - 在 Hero 和 When to Use 部分，补上“Quick = 速度优先的估算层，Full = 精细报价层”的明确对比。
- **[卡片结构升级]**：
  - 每个 Quick 工具卡片中，增加“解决的问题 / 典型输入 / 主要输出 / 不适用场景”四个子块，让用户一眼看出业务逻辑而不是只看到 marketing 描述。
- **[数据流补完]**：
  - 新增 "How Quick Tools Work" 小节，按“输入 → 结合参考表 → 产出 → 升级到 Full calculators”的顺序讲完整数据流。
- **[错误与边界显性化]**：
  - 把现有 Limitations 从“隐性列表”升级为单独的风险提示卡片，列出 3–5 个典型误用场景，并给出正确做法。
- **[Accuracy 表述降温]**：
  - 把表格里 +/-5–10% 的说法，改写为“典型标准工况下通常在 10–20% 误差区间”，并在说明中强调“需用自家数据校准”。
- **[使用路径更可操作]**：
  - 在 Workflow 和 Related Resources 段落中，强化“Quick Reference → Quick Tools → Full Calculators”的三段式流程，并建议“先算 Hourly Rate，再用 Price per Meter 和主激光切割计算器联动”。
