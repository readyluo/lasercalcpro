# CNC Machining Calculator深度审查报告

**页面路径：** `/calculators/cnc-machining`  
**审查时间：** 2025年11月19日

---

## 【整体评估】

### 功能深度：7/10
- **优点**：覆盖铣削、车削、钻孔三种主要工艺
- **优点**：包含刀具成本、setup time、材料移除率
- **问题**：未区分粗加工/精加工的不同参数
- **问题**：未说明复杂几何（undercut, 深腔）的影响
- **问题**：刀具寿命计算过于简化

### 结构层次：7/10
- **优点**：输入分5组（Operation/Material/Dimensions/Tooling/Costs）
- **优点**：Results包含Time/Cost/Tooling breakdown
- **问题**：缺少"工艺选择指南"（何时用铣/车/钻）
- **问题**：缺少"加工策略建议"（粗精分离、多刀具）

### 专业性：7/10
- **优点**：材料硬度影响切削速度（HSS vs Carbide）
- **优点**：包含刀具磨损和更换成本
- **问题**：未说明表面粗糙度要求的影响
- **问题**：未说明冷却液/切削液成本
- **问题**：未说明夹具时间和成本

### 数据流：6/10
- **优点**：有基本disclaimer
- **问题**：未说明"材料可加工性"差异（铝vs钛）
- **问题**：未说明"刀具选择"的影响（HSS vs Carbide vs Cermet）
- **缺失**：无错误处理（负值、超限值）

### 交互性：6/10
- **优点**：操作类型选择清晰
- **问题**：缺少"典型案例"快速填充
- **问题**：缺少"加工可视化"（刀路示意）
- **问题**：缺少"优化建议"（提速、降本）

### 综合评分：**6.6/10**（及格，但偏基础）

---

## 【关键调整说明】

### 1. 增加"粗加工vs精加工"区分

```tsx
{/* 在Operation Type选择后增加 */}
{watchValues.operationType === 'milling' && (
  <div className="mt-4 space-y-3">
    <label className="block text-sm font-medium text-gray-700">
      Machining Strategy
    </label>
    
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => setMachiningStrategy('roughing')}
        className={`p-3 border-2 rounded-lg text-left ${
          machiningStrategy === 'roughing'
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <p className="font-semibold text-gray-900 text-sm">Roughing (Bulk Removal)</p>
        <p className="text-xs text-gray-600 mt-1">
          High MRR, lower surface finish<br/>
          Typical: 70-80% of total time
        </p>
      </button>
      
      <button
        type="button"
        onClick={() => setMachiningStrategy('finishing')}
        className={`p-3 border-2 rounded-lg text-left ${
          machiningStrategy === 'finishing'
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <p className="font-semibold text-gray-900 text-sm">Finishing (Final Pass)</p>
        <p className="text-xs text-gray-600 mt-1">
          High precision, slow feed<br/>
          Typical: 20-30% of total time
        </p>
      </button>
    </div>
    
    {machiningStrategy && (
      <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
        <p className="font-semibold text-blue-900 mb-1">
          Recommended Parameters for {machiningStrategy === 'roughing' ? 'Roughing' : 'Finishing'}:
        </p>
        <div className="text-xs text-blue-800 space-y-0.5">
          {machiningStrategy === 'roughing' ? (
            <>
              <p>• Depth of Cut (DOC): 50-70% of tool diameter</p>
              <p>• Feed Rate: 0.1-0.25 mm/tooth (aggressive)</p>
              <p>• Spindle Speed: 60-80% of max for tool life</p>
              <p>• Surface Finish: Ra 6.3-12.5 μm (acceptable roughness)</p>
            </>
          ) : (
            <>
              <p>• Depth of Cut (DOC): 0.1-0.5mm (light passes)</p>
              <p>• Feed Rate: 0.05-0.1 mm/tooth (fine)</p>
              <p>• Spindle Speed: 80-100% of max for finish</p>
              <p>• Surface Finish: Ra 0.8-3.2 μm (smooth)</p>
            </>
          )}
        </div>
      </div>
    )}
  </div>
)}
```

### 2. 增加"材料可加工性"系数

```tsx
{/* 在Material Type选择后增加 */}
{watchValues.materialType && (
  <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
    <p className="text-sm font-semibold text-amber-900 mb-2">
      Material Machinability Index:
    </p>
    <div className="flex items-center gap-3">
      {(() => {
        const machinability = {
          'aluminum': { index: 5.0, color: 'green', note: 'Excellent - Fast cutting, long tool life' },
          'mild_steel': { index: 3.5, color: 'blue', note: 'Good - Standard machining' },
          'stainless_steel': { index: 2.0, color: 'yellow', note: 'Moderate - Work hardens, slower' },
          'titanium': { index: 1.0, color: 'red', note: 'Difficult - Slow, high tool wear' },
          'hardened_steel': { index: 0.8, color: 'red', note: 'Very difficult - Carbide/Ceramic required' }
        };
        
        const mat = machinability[watchValues.materialType as keyof typeof machinability];
        if (!mat) return null;
        
        return (
          <>
            <div className="flex-shrink-0">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold
                ${mat.color === 'green' ? 'bg-green-100 text-green-700' :
                  mat.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                  mat.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'}`}
              >
                {mat.index}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {MATERIAL_LABELS[watchValues.materialType]}
              </p>
              <p className="text-xs text-gray-700">{mat.note}</p>
              <p className="text-xs text-gray-600 mt-1">
                Compared to free-cutting brass (6.0 baseline). 
                Lower index = slower speeds + higher costs.
              </p>
            </div>
          </>
        );
      })()}
    </div>
  </div>
)}
```

### 3. 增加"刀具选择指南"

```tsx
{/* 在Tooling Cost输入区增加 */}
<div className="mb-4 p-4 bg-purple-50 rounded-lg">
  <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
    <Tool className="h-5 w-5" />
    Tool Material Selection Guide
  </h4>
  
  <div className="space-y-2 text-sm">
    <div className="bg-white rounded p-3">
      <p className="font-semibold text-gray-900 mb-1">High-Speed Steel (HSS)</p>
      <div className="text-xs text-gray-700">
        <p><strong>Cost:</strong> $10-30 per tool</p>
        <p><strong>Life:</strong> 2-5 hours (mild steel, aluminum)</p>
        <p><strong>Best for:</strong> Low-volume, general purpose, manual machines</p>
        <p className="text-green-700 mt-1">✓ Cheap, versatile, regrindable</p>
        <p className="text-red-700">✗ Slow cutting speeds, frequent changes</p>
      </div>
    </div>
    
    <div className="bg-white rounded p-3">
      <p className="font-semibold text-gray-900 mb-1">Carbide (Uncoated/Coated)</p>
      <div className="text-xs text-gray-700">
        <p><strong>Cost:</strong> $30-150 per insert/tool</p>
        <p><strong>Life:</strong> 10-30 hours (TiN/TiAlN coated)</p>
        <p><strong>Best for:</strong> Production machining, CNC, hard materials</p>
        <p className="text-green-700 mt-1">✓ 2-5× faster speeds, longer life, consistent</p>
        <p className="text-red-700">✗ Expensive, brittle (no shock loads)</p>
      </div>
    </div>
    
    <div className="bg-white rounded p-3">
      <p className="font-semibold text-gray-900 mb-1">Ceramic/CBN/PCD</p>
      <div className="text-xs text-gray-700">
        <p><strong>Cost:</strong> $150-500+ per insert</p>
        <p><strong>Life:</strong> 30-100+ hours (hard materials)</p>
        <p><strong>Best for:</strong> Hardened steel, superalloys, high-volume</p>
        <p className="text-green-700 mt-1">✓ Ultra-long life, extreme hardness</p>
        <p className="text-red-700">✗ Very expensive, limited geometries</p>
      </div>
    </div>
  </div>
  
  <div className="mt-3 text-xs text-gray-600 bg-white rounded p-2">
    <strong>💡 Cost Optimization:</strong> For production runs >100 parts, 
    carbide pays for itself despite higher upfront cost. For prototypes or 
    <50 parts, HSS is often more economical.
  </div>
</div>
```

### 4. 增加"冷却液和切削液"成本

```tsx
{/* 在Operating Costs部分增加 */}
<div className="space-y-4">
  <Input
    {...register('coolantCostPerLiter', { valueAsNumber: true })}
    type="number"
    step="0.50"
    label="Coolant/Cutting Fluid Cost ($/liter)"
    helperText="Typical: $5-15/liter for synthetic/semi-synthetic"
    leftIcon={<Droplet className="h-4 w-4" />}
  />
  
  <Input
    {...register('coolantFlowRateLPM', { valueAsNumber: true })}
    type="number"
    step="0.5"
    label="Coolant Flow Rate (L/min)"
    helperText="Typical: 5-20 L/min depending on operation"
  />
  
  <div className="text-xs text-gray-600 bg-blue-50 rounded p-3">
    <p className="font-semibold text-blue-900 mb-1">Coolant Types & Costs:</p>
    <ul className="space-y-0.5 ml-4">
      <li>• <strong>Straight oil:</strong> $8-12/L (best finish, messy, slow evaporation)</li>
      <li>• <strong>Soluble oil:</strong> $5-8/L (good all-purpose, 5-10% concentration)</li>
      <li>• <strong>Semi-synthetic:</strong> $10-15/L (balanced performance, low residue)</li>
      <li>• <strong>Full synthetic:</strong> $12-20/L (best for aluminum, long life)</li>
    </ul>
    <p className="mt-2">
      💡 <strong>Cost savings:</strong> Recirculating systems reduce coolant consumption 
      by 80-90% vs. flood cooling. Initial cost: $3K-10K, payback: 1-2 years for production shops.
    </p>
  </div>
</div>
```

### 5. 增加"夹具时间"计算

```tsx
{/* 在Setup Time输入旁增加 */}
<div className="space-y-4">
  <Input
    {...register('setupTimeMachineMin', { valueAsNumber: true })}
    type="number"
    step="5"
    label="Machine Setup Time (min)"
    helperText="Program load, tool changes, first part setup"
  />
  
  <Input
    {...register('fixtureTimePerPartMin', { valueAsNumber: true })}
    type="number"
    step="0.5"
    label="Fixturing Time Per Part (min)"
    helperText="Load, clamp, align, unload each part"
  />
  
  <div className="text-xs text-gray-600 bg-amber-50 rounded p-3">
    <p className="font-semibold text-amber-900 mb-2">Fixturing Time Guidelines:</p>
    <div className="space-y-1">
      <p>• <strong>Simple vise:</strong> 1-3 min (manual, 1-2 clamps)</p>
      <p>• <strong>Modular fixture:</strong> 3-8 min (multiple features, complex geometry)</p>
      <p>• <strong>Custom fixture:</strong> 0.5-2 min (optimized for specific part)</p>
      <p>• <strong>Automated:</strong> 0.1-0.5 min (pallet changer, robot load)</p>
    </div>
    <p className="mt-2 text-amber-800">
      ⚠️ <strong>Hidden cost:</strong> Fixturing often accounts for 20-40% of cycle time 
      in low-volume production. Automation justified at >200 parts/month.
    </p>
  </div>
</div>
```

### 6. 增加"优化建议"自动生成

```tsx
{result && (
  <div className="card border-l-4 border-green-500 bg-green-50">
    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <TrendingUp className="h-5 w-5 text-green-600" />
      Optimization Opportunities
    </h3>
    
    <div className="space-y-3">
      {/* 根据计算结果自动生成建议 */}
      {result.machiningTimeMin > result.fixtureTimeMin * 2 && (
        <div className="bg-white rounded p-3 text-sm">
          <p className="font-semibold text-green-700 mb-1">
            ✓ Good machining efficiency
          </p>
          <p className="text-gray-700 text-xs">
            Machining time ({result.machiningTimeMin.toFixed(1)} min) is much longer than 
            fixturing ({result.fixtureTimeMin.toFixed(1)} min). Fixture time is well-optimized.
          </p>
        </div>
      )}
      
      {result.fixtureTimeMin > result.machiningTimeMin * 0.5 && (
        <div className="bg-amber-50 rounded p-3 text-sm border-l-4 border-amber-500">
          <p className="font-semibold text-amber-700 mb-1">
            ⚠️ High fixturing time detected
          </p>
          <p className="text-gray-700 text-xs mb-2">
            Fixturing takes {((result.fixtureTimeMin / result.totalTimeMin) * 100).toFixed(0)}% 
            of cycle time. Consider:
          </p>
          <ul className="text-xs text-gray-600 ml-4 space-y-0.5">
            <li>• Quick-clamp vises or modular fixtures</li>
            <li>• Part-specific soft jaws (amortize over batch)</li>
            <li>• Pallet systems for >50 parts/month</li>
          </ul>
        </div>
      )}
      
      {result.toolCostPerPart > result.machineeCostPerPart * 0.3 && (
        <div className="bg-blue-50 rounded p-3 text-sm border-l-4 border-blue-500">
          <p className="font-semibold text-blue-700 mb-1">
            💰 Tool cost is {((result.toolCostPerPart / result.totalCostPerPart) * 100).toFixed(0)}% of total
          </p>
          <p className="text-gray-700 text-xs mb-2">
            High tool wear. Options:
          </p>
          <ul className="text-xs text-gray-600 ml-4 space-y-0.5">
            <li>• Reduce cutting speed by 10-20% to extend tool life 2×</li>
            <li>• Switch to coated carbide if using uncoated</li>
            <li>• Check coolant flow and concentration</li>
          </ul>
        </div>
      )}
      
      {watchValues.materialType === 'stainless_steel' && result.machiningTimeMin > 10 && (
        <div className="bg-purple-50 rounded p-3 text-sm">
          <p className="font-semibold text-purple-700 mb-1">
            🔧 Stainless steel machining tips
          </p>
          <ul className="text-xs text-gray-700 ml-4 space-y-0.5">
            <li>• Keep feed rate constant (avoid dwellrubbing/work hardening)</li>
            <li>• Use sharp tools (dull = rapid wear)</li>
            <li>• High-pressure coolant reduces built-up edge</li>
            <li>• Consider climb milling over conventional</li>
          </ul>
        </div>
      )}
    </div>
  </div>
)}
```

---

## 【修改后正文】

### 新增：粗加工vs精加工选择（Operation部分）

双按钮选择策略，自动推荐DOC/Feed/Speed参数

### 新增：材料可加工性指数（Material部分）

1.0-5.0评分，颜色编码，说明加工难度和影响

### 新增：刀具材料选择指南

HSS/Carbide/Ceramic对比（成本、寿命、适用场景）

### 新增：冷却液成本计算

流量、类型、成本，说明不同冷却液的优缺点

### 新增：夹具时间独立输入

区分Machine Setup vs Per-Part Fixturing，提供典型时间范围

### 新增：优化建议自动生成（Results区）

基于结果自动识别瓶颈，给出4-5条改进建议

### 优化：Disclaimer更详细

说明不含夹具、冷却液、复杂几何的额外成本

---

**总结：**CNC Machining偏基础（6.6/10），增加粗精分离、材料可加工性、刀具选择、冷却液、夹具时间、优化建议后可达8.0分。核心是提供"可操作的优化方向"，不只算成本。
