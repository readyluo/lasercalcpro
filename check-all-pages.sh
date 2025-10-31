#!/bin/bash

# 网站全面404检查脚本
# 检查所有页面是否返回200 OK

BASE_URL="http://localhost:3000"
FAILED=0
PASSED=0

# 定义所有需要检查的URL
URLS=(
  "/"
  "/about"
  "/contact"
  "/faq"
  "/search"
  "/accessibility"
  "/methodology"
  "/disclaimer"
  "/privacy"
  "/terms"
  "/cookie-policy"
  "/cookie-settings"
  
  # 计算器页面
  "/calculators"
  "/calculators/laser-cutting"
  "/calculators/cnc-machining"
  "/calculators/marking"
  "/calculators/welding"
  "/calculators/energy"
  "/calculators/roi"
  "/calculators/material-utilization"
  "/calculators/compare"
  
  # Quick系列
  "/calculators/quick"
  "/calculators/quick/hourly-rate"
  "/calculators/quick/pierce-time"
  "/calculators/quick/price-per-meter"
  
  # Quick Reference系列
  "/calculators/quick-reference"
  "/calculators/quick-reference/assist-gas"
  "/calculators/quick-reference/cutting-speeds"
  "/calculators/quick-reference/material-costs"
  "/calculators/quick-reference/power-consumption"
  "/calculators/quick-reference/processing-parameters"
  
  # Cost Center系列
  "/calculators/cost-center"
  "/calculators/cost-center/hourly-rate"
  "/calculators/cost-center/overhead-allocator"
  "/calculators/cost-center/setup-estimator"
  "/calculators/cost-center/pierce-estimator"
  "/calculators/cost-center/finishing-guide"
  "/calculators/cost-center/kerf-reference"
  "/calculators/cost-center/quotation-margin"
  
  # 指南页面
  "/guides"
  "/guides/hourly-cost-structure"
  "/guides/piercing-strategy"
  "/guides/kerf-width-reference"
  "/guides/finishing-time-cheatsheet"
  
  # 博客页面
  "/blog"
  "/blog/archive"
  "/blog/tutorials"
  
  # 案例研究
  "/case-studies"
  
  # 合作伙伴
  "/partners"
  "/partners/apply"
  
  # 订阅系统
  "/subscribe"
  
  # 管理后台
  "/admin/login"
)

echo "======================================"
echo "网站404检查开始"
echo "基础URL: $BASE_URL"
echo "总计 ${#URLS[@]} 个页面需要检查"
echo "======================================"
echo ""

# 检查每个URL
for url in "${URLS[@]}"; do
  full_url="${BASE_URL}${url}"
  
  # 使用curl获取HTTP状态码
  status_code=$(curl -o /dev/null -s -w "%{http_code}" -L "$full_url")
  
  # 判断状态码
  if [ "$status_code" -eq 200 ]; then
    echo "✓ $url - $status_code OK"
    ((PASSED++))
  else
    echo "✗ $url - $status_code FAILED"
    ((FAILED++))
  fi
done

echo ""
echo "======================================"
echo "检查完成"
echo "通过: $PASSED"
echo "失败: $FAILED"
echo "总计: ${#URLS[@]}"
echo "======================================"

# 退出码
if [ $FAILED -gt 0 ]; then
  exit 1
else
  exit 0
fi




