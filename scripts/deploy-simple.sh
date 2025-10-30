#!/bin/bash

# LaserCalc Pro - 简化版 Cloudflare Pages 部署
# 跳过数据库功能，仅部署静态计算器页面

set -e

echo "========================================="
echo "🚀 LaserCalc Pro - 简化版部署"
echo "========================================="
echo ""

# 配置信息
export CLOUDFLARE_EMAIL="yigetech@gmail.com"
export CLOUDFLARE_API_KEY="d70a07155b7e29ba4c0fe1ac05e976fe6852f"
export CLOUDFLARE_ACCOUNT_ID="c94f5ebfe9fe77f87281ad8c7933dc8d"
PROJECT_NAME="lasercalcpro"

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "📁 项目目录: $PROJECT_ROOT"
echo ""

# ===== 步骤1: 临时移除 API routes =====
echo "========================================="
echo "📝 步骤 1/3: 准备构建环境"
echo "========================================="

# 创建临时备份
if [ -d "app/api" ]; then
    echo "备份 API routes..."
    mv app/api app/api.backup
    echo "✅ API routes 已备份"
fi

echo ""

# ===== 步骤2: 构建项目 =====
echo "========================================="
echo "🔨 步骤 2/3: 构建静态站点"
echo "========================================="

npm run build

echo "✅ 构建完成"
echo ""

# ===== 步骤3: 恢复 API routes =====
if [ -d "app/api.backup" ]; then
    echo "恢复 API routes..."
    mv app/api.backup app/api
fi

# ===== 步骤4: 部署到 Cloudflare Pages =====
echo "========================================="
echo "🚀 步骤 3/3: 部署到 Cloudflare Pages"
echo "========================================="

npx wrangler pages deploy out --project-name="$PROJECT_NAME"

echo ""
echo "========================================="
echo "✅ 部署完成！"
echo "========================================="
echo ""
echo "🌐 访问地址: https://$PROJECT_NAME.pages.dev"
echo ""
echo "⚠️ 注意：当前版本不包含数据库功能"
echo "   如需完整功能，请配置 D1 数据库并使用动态部署"
echo ""
echo "========================================="

