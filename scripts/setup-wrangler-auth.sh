#!/bin/bash

# Cloudflare Wrangler 认证配置脚本
# 使用 Email + Global API Key 方式

echo "========================================="
echo "🔐 配置 Wrangler 认证信息"
echo "========================================="

# Cloudflare 凭据
export CLOUDFLARE_EMAIL="yigetech@gmail.com"
export CLOUDFLARE_API_KEY="d70a07155b7e29ba4c0fe1ac05e976fe6852f"

echo "✅ 环境变量已设置"
echo ""
echo "📋 Email: $CLOUDFLARE_EMAIL"
echo "📋 API Key: ${CLOUDFLARE_API_KEY:0:20}..."
echo ""
echo "现在可以使用 wrangler 命令了！"
echo ""
echo "常用命令："
echo "  npx wrangler whoami              # 查看当前账户"
echo "  npx wrangler d1 list             # 列出 D1 数据库"
echo "  npx wrangler pages project list  # 列出 Pages 项目"
echo ""

