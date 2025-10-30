#!/bin/bash

# LaserCalc Pro - 最终Cloudflare Pages部署脚本
# 使用标准Next.js构建 + 直接上传

set -e

echo "========================================="
echo "🚀 LaserCalc Pro - Cloudflare部署"
echo "========================================="
echo ""

# 配置信息
export CLOUDFLARE_EMAIL="yigetech@gmail.com"
export CLOUDFLARE_API_KEY="d70a07155b7e29ba4c0fe1ac05e976fe6852f"
export CLOUDFLARE_ACCOUNT_ID="c94f5ebfe9fe77f87281ad8c7933dc8d"
PROJECT_NAME="lasercalcpro"
DATABASE_ID="028b72d6-7e87-4e27-ba37-1e3a8d250226"

cd /Users/luokun/Downloads/LaserCalcpro

echo "📁 项目目录: $(pwd)"
echo "📦 数据库 ID: $DATABASE_ID"
echo ""

# ===== 步骤1: 清理 =====
echo "========================================="
echo "🧹 步骤 1/4: 清理旧构建"
echo "========================================="
rm -rf .next out .vercel
echo "✅ 清理完成"
echo ""

# ===== 步骤2: 标准Next.js构建 =====
echo "========================================="
echo "🔨 步骤 2/4: Next.js构建"
echo "========================================="
npm run build

echo "✅ 构建完成"
echo ""

# ===== 步骤3: 部署到Cloudflare Pages =====
echo "========================================="
echo "🚀 步骤 3/4: 部署到Cloudflare Pages"
echo "========================================="

# 使用out目录（如果是静态导出）或.next目录
if [ -d "out" ]; then
    DEPLOY_DIR="out"
else
    DEPLOY_DIR=".next/static"
fi

echo "部署目录: $DEPLOY_DIR"
npx wrangler pages deploy "$DEPLOY_DIR" --project-name="$PROJECT_NAME" --branch=main

echo "✅ 部署完成"
echo ""

# ===== 步骤4: 配置说明 =====
echo "========================================="
echo "📝 步骤 4/4: 后续配置"
echo "========================================="
echo ""
echo "⚠️ 重要：需要在Cloudflare Dashboard中配置："
echo ""
echo "1. D1数据库绑定："
echo "   - 访问: https://dash.cloudflare.com/$CLOUDFLARE_ACCOUNT_ID/pages/view/$PROJECT_NAME"
echo "   - 进入 Settings -> Functions"
echo "   - 添加 D1 Database Binding:"
echo "     • Variable name: DB"
echo "     • D1 Database: lasercalcpro-db ($DATABASE_ID)"
echo ""
echo "2. 环境变量（可选）："
echo "   - Settings -> Environment variables"
echo "   - 添加 NEXT_PUBLIC_GA_ID 等"
echo ""
echo "3. 自定义域名："
echo "   - Custom domains"
echo "   - 添加你的域名"
echo ""
echo "========================================="
echo "✅ 部署完成！"
echo "========================================="
echo ""
echo "🌐 访问地址: https://$PROJECT_NAME.pages.dev"
echo ""

