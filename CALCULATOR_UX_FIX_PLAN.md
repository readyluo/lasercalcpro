# 计算器首屏优化计划

## 问题
计算器表单被大量说明文字推到首屏之外，用户需要滚动才能看到表单。

## 修复策略
1. **顶部**：只保留简洁的标题 + 一行说明 + 简短警告提示
2. **中间**：立即显示计算器表单（首屏可见）
3. **底部**：移动详细的"When to use"和完整disclaimer到页面底部

## 需要修复的页面

### 已完成 ✅
- [x] `/app/calculators/laser-cutting/page.tsx` - 已优化

### 待修复 🔄
- [ ] `/app/calculators/welding/page.tsx` - 有"When to Choose Laser Welding"大块说明
- [ ] `/app/calculators/marking/page.tsx` - 待检查
- [ ] `/app/calculators/roi/page.tsx` - 有"When to use"说明
- [ ] `/app/calculators/cnc-machining/page.tsx` - 有"When to use"说明
- [ ] `/app/calculators/material-utilization/page.tsx` - 待检查
- [ ] `/app/calculators/energy/page.tsx` - 待检查

## 修复模板

### 顶部精简格式
```tsx
<div className="mb-6">
  <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
  <p className="text-sm text-gray-600">
    {description}
    <span className="ml-2 text-xs text-amber-600">⚠️ Estimates only</span>
  </p>
</div>
```

### 底部详细说明
```tsx
{/* When to use - Moved to bottom */}
<div className="mt-12 rounded-2xl bg-blue-50 border-l-4 border-blue-500 px-6 py-4">
  ...详细说明内容...
</div>
```
