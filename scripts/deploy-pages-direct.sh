#!/bin/bash

# LaserCalc Pro - Cloudflare Pages 直接部署脚本
# 使用 @cloudflare/next-on-pages 构建和部署

set -e

echo "========================================="
echo "🚀 LaserCalc Pro - Cloudflare Pages 部署"
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

# ===== 步骤1: 构建项目 =====
echo "========================================="
echo "🔨 步骤 1/2: 构建 Next.js 项目"
echo "========================================="

echo "正在使用 @cloudflare/next-on-pages 构建..."
npx @cloudflare/next-on-pages --experimental-minify

echo "✅ 项目构建成功"
echo ""

# ===== 步骤2: 部署到 Cloudflare Pages =====
echo "========================================="
echo "🚀 步骤 2/2: 部署到 Cloudflare Pages"
echo "========================================="

echo "正在部署..."
npx wrangler pages deploy .vercel/output/static --project-name="$PROJECT_NAME"

echo ""
echo "========================================="
echo "✅ 部署完成！"
echo "========================================="
echo ""
echo "🌐 访问地址: https://$PROJECT_NAME.pages.dev"
echo ""
echo "⚠️ 后续步骤："
echo "1. 在 Cloudflare Dashboard 中配置 D1 绑定"
echo "   https://dash.cloudflare.com/"
echo ""
echo "2. 配置环境变量（如需要）"
echo ""
echo "========================================="

