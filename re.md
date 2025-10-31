## 激光加工成本计算中心（行业级）系统方案（硬编码实现版）

本文件为最终交付版本，直接用于实施。围绕“开发快、SEO高、强实用、零数据库负担”，在不重复现有站内功能的前提下，设计一套以页面和工具为核心的“成本计算中心”。

---

### 1) 具体可执行的任务步骤分解

1. 基线盘点（避免重复）
   - 审阅现有功能：`/app/calculators/laser-cutting`、`/app/calculators/energy`、`/app/calculators/roi`、`/app/calculators/material-utilization`、`/app/calculators/quick-reference/*`、`/app/calculators/marking`、`/app/calculators/welding`。
   - 标记禁止重复的主题：完整激光切割计算、能耗、电费、ROI、材料利用率、通用切割速度/功率/材料价格/助气参考。

2. 成本计算中心的信息架构与URL策略（英文前台、硬编码）
   - 新增“行业成本中心”入口页：`/calculators/cost-center`（Hub，聚合+导航）。
   - 新增轻量硬编码工具与高价值参考，不与现有重复：
     - Hourly Shop Rate Builder（小时产线成本构成器）：`/calculators/cost-center/hourly-rate`
     - Overhead Allocator（管理费/场地费分摊器）：`/calculators/cost-center/overhead-allocator`
     - Setup & Changeover Time Estimator（换型/装夹时间预估）：`/calculators/cost-center/setup-estimator`
     - Piercing Time & Count Estimator（穿孔次数与时间估算）：`/calculators/cost-center/pierce-estimator`
     - Edge Finishing Time Guide（边缘处理/去毛刺时间指导）：`/calculators/cost-center/finishing-guide`
     - Kerf Width Reference（割缝宽度参考，未在站内出现）：`/calculators/cost-center/kerf-reference`
     - Quotation Margin Simulator（报价毛利模拟器）：`/calculators/cost-center/quotation-margin`
   - 新增高SEO价值页面（How-to/Reference，非重复主题，硬编码数据+说明）：
     - “Laser Hourly Cost Structure: Complete Reference”（小时成本结构全解）
     - “Piercing Strategy for Laser Cutting: Time & Quality Trade-offs”（穿孔策略与时间质量权衡）
     - “Kerf Width vs. Thickness & Nozzle: Practical Reference”（割缝与厚度/喷嘴关系参考）
     - “Post-cut Finishing Time Cheat Sheet”（后处理时间速查）

3. 严格的数据与计算要求（硬编码且可追溯）
   - 工具类页面仅使用前端常量与公式，不写库、不同步到API、不中台。
   - 输入使用 Zod 验证；输出标注单位与公式；给出“适用范围/假设条件”。
   - 仅采用通行的计算框架（如制造业小时费率分解：折旧/人工/能耗/耗材/维护/房租/保险/管理费），并允许用户输入本地参数。
   - 参考数据仅做“默认占位常量”，需在页面显著标注“可被用户现场数据覆盖，以保证100%准确率”。

4. 页面与组件实现规范（Next.js 14 + 无数据库）
   - 全部 Server Components 优先；含交互则 Client，并置顶 `'use client'` 与 Zod 校验。
   - 仅用硬编码常量（`/lib/calculators/constants/*.ts` 新增）与纯函数（`/lib/calculators/cost-center/*.ts` 新增）。
   - 表单控件复用 `components/ui/*`；SEO 复用 `components/seo/*` 与结构化数据组件。
   - 不调用 `/api/*` 保存记录；导出PDF/CSV可直接在客户端生成（已有 `ExportButton` 可复用或新增简化版）。

5. SEO与可见度落地
   - 每页提供 `metadata`、`HowTo`/`FAQ` 结构化数据（硬编码文本，英文）。
   - URL 层级扁平清晰、标题含关键词、内容含“公式/步骤/示例/限制条件”。
   - Hub页内链指向各工具与参考，相关计算器之间交叉内链，避免孤页。

6. 质量校验与验证路径
   - 计算类公式：在组件顶部注释“公式来源与适用边界”，并在UI中以“Assumptions”块展示。
   - 单元测试：对核心纯函数做输入/输出快照与边界值测试（不涉及IO）。
   - 可用性测试：三类典型场景（薄板快切、厚板慢切、多孔件）样例校验。

---

### 2) 更新后的任务清单（面向实施）

- 规划与对齐
  - [ ] 完成现有功能排重清单（已列目录与主题，确认不复用）
  - [ ] 确认成本中心导航与URL策略

- 基础设施（零DB）
  - [ ] 新建 `lib/calculators/constants/*` 常量文件（小时成本分解默认值、穿孔时间默认区间、割缝典型范围等）
  - [ ] 新建 `lib/calculators/cost-center/*` 纯函数模块（小时费率构建、分摊计算、穿孔时间估算、毛利模拟等）

- 页面与功能（首批）
  - [ ] `/calculators/cost-center` Hub（英文文案+结构化数据+导航）
  - [ ] `hourly-rate`（小时成本构成器，含折旧/人工/能耗/维护/场地/管理分摊）
  - [ ] `overhead-allocator`（多订单/工序的管理/场地成本分摊）
  - [ ] `setup-estimator`（装夹与换型时间估算器）

- 页面与功能（次批）
  - [ ] `pierce-estimator`（穿孔次数/时间估算，按厚度/材料类型区间）
  - [ ] `kerf-reference`（割缝宽度参考：厚度/喷嘴/材料关联的静态表+可视化）
  - [ ] `finishing-guide`（去毛刺/清洗/倒角时间指导，区间+影响因子）
  - [ ] `quotation-margin`（报价毛利/折扣敏感度模拟器）

- SEO与内容
  - [ ] Hub与各工具页的 `metadata` 与 `HowTo/FAQ` Schema
  - [ ] 四篇参考长文（小时成本结构/穿孔策略/割缝参考/后处理速查）

- 质量与交付
  - [ ] 为纯函数新增单元测试
  - [ ] 关键页面无障碍/移动端适配检查
  - [ ] 文案与假设条款复核（英文前台）

---

### 3) 按批次顺序的自动化开发流程（可直接执行）

批次A：基线与框架（1-2人日）
1. 建立目录与骨架
   - 新建：`lib/calculators/constants/`、`lib/calculators/cost-center/`
   - 新建Hub：`app/calculators/cost-center/page.tsx`（Server）
2. 常量/类型定义
   - `constants/hourly.ts`：设备造价、寿命、年工时、人工、能耗、维护、房租、保险、管理费等默认值（均可被用户输入覆盖）
   - `types.ts`：各工具Input/Result类型、Zod Schema
3. 纯函数实现
   - `hourlyRate.ts`、`overhead.ts`、`setupTime.ts` 基础实现与测试

批次B：首批工具与SEO（2-3人日）
1. 页面实现
   - `/calculators/cost-center/hourly-rate`（Client，Zod校验，导出CSV/PDF）
   - `/calculators/cost-center/overhead-allocator`（Client）
   - `/calculators/cost-center/setup-estimator`（Client）
2. SEO落地
   - 每页 `metadata`、`HowTo`、`FAQ` 结构化数据（硬编码英文）
3. 内链
   - Hub → 三个工具；工具之间相互推荐，避免与现有页面主题重叠

批次C：次批工具与参考（2-3人日）
1. 页面实现
   - `pierce-estimator`、`kerf-reference`、`finishing-guide`、`quotation-margin`
2. 参考长文（内容页）
   - 四篇How-to/Reference添加到 `app/blog`（英文，前台）并与工具页互链

批次D：验证与上线（1人日）
1. 测试
   - 纯函数单测通过；表单Zod校验通过；移动端UI检查
2. 上线
   - Pages部署，无数据库迁移；首页/计算器目录页添加入口

---

附：核心计算框架（仅做实现指导，页面显示需标注“可被用户数据覆盖”）
- 小时成本（Shop Rate）= 折旧/小时 + 人工/小时 + 能耗/小时 + 维护/小时 + 耗材/小时 + 场地/小时 + 管理/小时
- 分摊（Overhead Allocation）= 待分摊总额 ×（工时占比 或 机器占用占比）
- 换型/装夹时间：按“部件数量、夹具复杂度、首件检验”加权的经验区间模型
- 穿孔时间：单孔时间（材料×厚度区间）× 孔数（依据图纸统计/用户输入）
- 割缝宽度：按材料/喷嘴/厚度的区间静态表，仅用于路径补偿与质量评估参考
- 报价毛利：毛利率/折扣对比曲线 + 目标价反推

说明：以上均为行业通用的成本分解与估算框架，最终准确率依赖用户在页面中输入本企业真实参数。系统默认值仅为起算基线，不作为“事实数据”。


