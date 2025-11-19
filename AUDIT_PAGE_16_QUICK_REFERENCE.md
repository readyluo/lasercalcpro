# Quick Reference入口页深度审查报告

**页面路径：** `/calculators/quick-reference`  
**页面性质：** 静态参考数据与参数表集合入口  
**审查时间：** 2025年11月19日

---

## 【整体评估】

### 功能深度：8/10
- **优点**：覆盖 Cutting Speeds / Assist Gas / Material Costs / Power Consumption / Processing Parameters 五大类核心参考
- **优点**：每张卡片有 dataPoints 统计，暗示数据量级
- **优点**：Reference vs Calculators 对比清晰区分了“表”与“算”的边界
- **问题**：缺少对“表中数据的典型适用范围与失效场景”的显式说明
- **问题**：数据更新频率只在 FAQ 有一句话，没有落到“每张表”的说明上

### 结构层次：8/10
- **优点**：结构为 Header → Grid 列表 → How to Use → Reference vs Calculators → Workflow → Data Quality → Related
- **优点**：How to Use 从 Planning / Quoting / Optimization 三个维度组织使用场景
- **问题**：作为“系统级入口”，未给出“建议先看哪几个表”的学习路径
- **问题**：对“SEO 价值”的说明出现在 FAQ，偏运营视角，对终端用户帮助有限

### 专业性：8/10
- **优点**：数据来源部分明确列出“设备厂商 / 协会 / 实际产线数据 / 材料供应商”
- **优点**：Data Quality 段落强调“多源交叉验证 / 定期更新 / 保守估计”
- **问题**：未给出误差范围（例如 Cutting Speeds 典型 ±10%）
- **问题**：未区分“严肃设计计算 vs 粗略工艺规划”的不同用途

### 数据流：7/10
- **优点**：Operational Workflow 把“先查表→再进 calculator→再回写 SOP”讲了一遍
- **问题**：没有针对每类表（速度/材料/气体/功率/参数）给出“如何把表里数值带入哪个具体 calculator”的清晰映射
- **问题**：没有告诉用户“如何用自家机台数据校准这些表”

### 交互性：7/10
- **优点**：卡片信息量适中，图标/颜色有助于区分用途
- **优点**：BEST FOR 小块帮助用户快速理解适配场景
- **问题**：缺少搜索/筛选（随着表增加可读性会下降）
- **问题**：缺少“单位提醒、使用示例截图”等降低误用风险的元素

### 综合评分：**7.6/10**（作为“参考库入口”已经不错，但还可以更教科书化和可验证）

---

## 【修改后正文（文案结构方案）】

### 一、主标题区：定位从“表”到“可验证的基线”

- **H1：**
  - "Quick Reference Tables for Laser Processing"
- **副标题：**
  - "Curated speed, cost, and parameter tables you can use as a starting point—then calibrate with your own shop data."
- **一行透明度说明：**
  - "These tables show typical industry values, not guarantees. Always test on your own equipment and record the results."

### 二、Reference 卡片区：从“列功能”到“列验证方式”

每张卡片在现有基础上增加一行“Validation & Limits”说明（文字而非代码）：
- Cutting Speeds：
  - "Typical cutting speeds for new-generation fiber lasers (3–10kW). Older machines may run 10–30% slower. Always cut test coupons on your own machine."
- Assist Gas：
  - "Gas prices vary widely by region and supplier. Use our ranges as a sanity check, then confirm with your actual contracts."
- Material Costs：
  - "Prices updated quarterly. For volatile markets, treat these as order-of-magnitude references only."
- Power Consumption：
  - "Based on nameplate and measured data from typical installations. Your actual kWh usage depends on duty cycle and efficiency."
- Processing Parameters：
  - "Parameter sets are conservative to favor stable cutting over maximum speed. Fine-tune for your specific nozzle, optics, and assist gas."

### 三、"How to Use"：补完“表 → 算 → 实测 → 回写”的闭环

在现有 Planning/Quoting/Optimization 三列下，增加一段整体说明：

- **Plan:** "Use these tables to design jobs, choose materials, and estimate cycle times before programming."
- **Calculate:** "Feed table values into the calculators (laser cutting, energy, hourly rate) to convert speeds and parameters into dollars."
- **Validate:** "Run test parts, compare actual times and quality against the table assumptions, and note the differences."
- **Refine:** "Update your internal SOPs and quoting templates with calibrated values for your machines."

### 四、"Reference vs Calculators"：把数据流讲得更像系统

在现有对比的基础上，增加一段简短的系统说明：

- "Think of Reference Tables as the library of raw numbers (mm/min, $/kg, kW, bar), and Calculators as the engines that turn those numbers into time and money. The most reliable quotes come from using both together: trusted tables + your own rates + our calculators."

### 五、"数据质量与误差范围"：给出可验证标尺

在 "Reference Data Quality & Sources" 卡片下追加一小节：

- 针对不同类型的数据给出典型误差：
  - Cutting speeds: "Typically within ±10–15% of well-tuned machines"
  - Material costs: "May vary ±15–30% depending on region and timing"
  - Gas costs: "Contract-dependent, treat ranges as sanity checks only"
  - Power consumption: "±10–20% depending on duty cycle and auxiliary loads"
- 明确建议："Use these ranges to judge whether your own numbers are in a reasonable band. Large deviations may indicate data entry errors or misconfigured equipment."

### 六、"从参考表到具体 calculator 的映射"（新增简短 section）

新增一个小表格，纯文案即可：

- Cutting Speeds → Laser Cutting Calculator（feed rate, cycle time）
- Assist Gas → Laser Cutting Calculator & Energy Calculator（gas cost, pressure, flow）
- Material Costs → Laser Cutting / Material Utilization / Cost Center（material $/kg, $/sheet）
- Power Consumption → Energy Calculator（kW, duty cycle）
- Processing Parameters → Laser Cutting Calculator（speed, focus, nozzle, gas）

---

## 【关键调整说明】

- **[强调“可验证基线”而非“标准答案”]**：
  - 在 Hero 和 Data Quality 部分强调“typical values + 必须用自家机台验证”，避免用户把表当成“厂商承诺”。
- **[每张表都有“验证与限制”一句话]**：
  - 为五类 Reference 卡片统一增加 "Validation & Limits" 子句，讲清适用机型、代际、波动范围。
- **[补完闭环数据流]**：
  - 把 "查表 → 进 calculator → 实测 → 回写 SOP" 的路径写清楚，让用户知道如何一步步用好“表 + 算”。
- **[增加误差刻度]**：
  - 为不同数据类型给出典型误差区间（±10–30%），作为用户判断自己数据是否合理的标尺。
- **[建立表到具体 calculator 的映射]**：
  - 明确告诉用户：这张表主要是为哪几个计算器服务的，以及具体把哪几列数据带入哪几个输入框。这样入口页不再只是“列表”，而是“导航图”。
- **[SEO 相关内容下沉到次要位置]**：
  - FAQ 中关于 SEO 的条目可以弱化或移到底部，主文案更多从“使用者如何提高决策与报价质量”角度来写。
