#!/bin/bash

# LaserCalc Pro - Cloudflare 完整部署脚本
# 使用 Email + Global API Key 认证

set -e  # 遇到错误立即退出

echo "========================================="
echo "🚀 LaserCalc Pro - Cloudflare 部署脚本"
echo "========================================="
echo ""

# ===== 配置信息 =====
export CLOUDFLARE_EMAIL="yigetech@gmail.com"
export CLOUDFLARE_API_KEY="d70a07155b7e29ba4c0fe1ac05e976fe6852f"
PROJECT_NAME="lasercalcpro"

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "📁 项目目录: $PROJECT_ROOT"
echo "📧 Cloudflare Email: $CLOUDFLARE_EMAIL"
echo ""

# ===== 步骤1: 检查环境 =====
echo "========================================="
echo "📋 步骤 1/7: 检查环境"
echo "========================================="

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未找到 Node.js，请先安装 Node.js"
    exit 1
fi
echo "✅ Node.js 版本: $(node --version)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 未找到 npm"
    exit 1
fi
echo "✅ npm 版本: $(npm --version)"

echo ""

# ===== 步骤2: 安装依赖 =====
echo "========================================="
echo "📦 步骤 2/7: 安装依赖"
echo "========================================="

if [ ! -d "node_modules" ]; then
    echo "正在安装项目依赖..."
    npm install --legacy-peer-deps
else
    echo "✅ 依赖已安装"
fi

echo ""

# ===== 步骤3: 检查现有资源 =====
echo "========================================="
echo "📋 步骤 3/7: 检查 Cloudflare 资源"
echo "========================================="

echo "正在检查账户信息..."
npx wrangler whoami || echo "⚠️ 无法获取账户信息，继续..."

echo ""
echo "正在检查 D1 数据库..."
npx wrangler d1 list || echo "⚠️ 无法获取数据库列表，继续..."

echo ""
echo "正在检查 Pages 项目..."
npx wrangler pages project list || echo "⚠️ 无法获取项目列表，继续..."

echo ""

# ===== 步骤4: 创建或获取 D1 数据库 =====
echo "========================================="
echo "🗄️ 步骤 4/7: 设置 D1 数据库"
echo "========================================="

# 检查数据库是否存在
DB_NAME="lasercalcpro-db"
DB_EXISTS=$(npx wrangler d1 list | grep -c "$DB_NAME" || true)

if [ "$DB_EXISTS" -eq 0 ]; then
    echo "📦 创建新数据库: $DB_NAME"
    npx wrangler d1 create "$DB_NAME"
else
    echo "✅ 数据库已存在: $DB_NAME"
fi

echo ""
echo "⚠️ 请手动更新 wrangler.toml 中的 database_id"
echo "   运行: npx wrangler d1 list"
echo "   然后复制数据库 ID 到 wrangler.toml"
echo ""
read -p "是否已更新 database_id？(y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 请先更新 database_id，然后重新运行脚本"
    exit 1
fi

# ===== 步骤5: 初始化数据库 Schema =====
echo "========================================="
echo "📝 步骤 5/7: 初始化数据库 Schema"
echo "========================================="

if [ -f "lib/db/schema.sql" ]; then
    echo "正在执行 Schema..."
    npx wrangler d1 execute "$DB_NAME" --file=./lib/db/schema.sql || echo "⚠️ Schema 可能已初始化"
    echo "✅ Schema 初始化完成"
else
    echo "⚠️ 未找到 schema.sql 文件，跳过"
fi

echo ""

# ===== 步骤6: 构建项目 =====
echo "========================================="
echo "🔨 步骤 6/7: 构建项目"
echo "========================================="

echo "正在构建 Next.js 项目..."
npm run pages:build

echo "✅ 项目构建成功"
echo ""

# ===== 步骤7: 部署到 Cloudflare Pages =====
echo "========================================="
echo "🚀 步骤 7/7: 部署到 Cloudflare Pages"
echo "========================================="

echo "正在部署到 Cloudflare Pages..."
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
echo "   - 访问: https://dash.cloudflare.com/"
echo "   - 进入 Pages 项目: $PROJECT_NAME"
echo "   - Settings -> Functions -> D1 database bindings"
echo "   - 添加绑定: Variable name = DB, Database = $DB_NAME"
echo ""
echo "2. 配置自定义域名（如果需要）"
echo "   - Pages 项目 -> Custom domains"
echo "   - 添加你的域名"
echo ""
echo "3. 配置环境变量（如果需要）"
echo "   - Settings -> Environment variables"
echo "   - 添加 Google Analytics ID 等"
echo ""
echo "========================================="

