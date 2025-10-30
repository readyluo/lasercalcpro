#!/bin/bash

echo "======================================"
echo "LaserCalc Pro - 数据库初始化检查"
echo "======================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查 .env.local 文件
echo "步骤 1: 检查环境变量文件..."
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ .env.local 文件不存在${NC}"
    echo "请先创建 .env.local 文件并配置必需的环境变量"
    exit 1
else
    echo -e "${GREEN}✅ .env.local 文件存在${NC}"
fi

# 检查必需的环境变量
echo ""
echo "步骤 2: 检查必需的环境变量..."
source .env.local

if [ -z "$TURSO_DATABASE_URL" ] || [ "$TURSO_DATABASE_URL" = "your-turso-database-url-here" ]; then
    echo -e "${RED}❌ TURSO_DATABASE_URL 未配置${NC}"
    echo "请在 .env.local 中设置实际的 Turso 数据库 URL"
    exit 1
else
    echo -e "${GREEN}✅ TURSO_DATABASE_URL 已配置${NC}"
fi

if [ -z "$TURSO_AUTH_TOKEN" ] || [ "$TURSO_AUTH_TOKEN" = "your-turso-auth-token-here" ]; then
    echo -e "${RED}❌ TURSO_AUTH_TOKEN 未配置${NC}"
    echo "请在 .env.local 中设置实际的 Turso 认证 Token"
    exit 1
else
    echo -e "${GREEN}✅ TURSO_AUTH_TOKEN 已配置${NC}"
fi

if [ -z "$JWT_SECRET" ] || [ "$JWT_SECRET" = "your-jwt-secret-here" ]; then
    echo -e "${YELLOW}⚠️  JWT_SECRET 未配置（后台登录需要）${NC}"
else
    echo -e "${GREEN}✅ JWT_SECRET 已配置${NC}"
fi

# 运行数据库初始化
echo ""
echo "步骤 3: 初始化博客文章..."
echo "======================================"
npm run seed-blog

echo ""
echo "步骤 4: 创建管理员账户..."
echo "======================================"
npm run create-admin

echo ""
echo "======================================"
echo -e "${GREEN}✅ 初始化完成！${NC}"
echo "======================================"
echo ""
echo "下一步操作："
echo "1. 启动开发服务器: npm run dev"
echo "2. 访问 Blog 页面: http://localhost:3000/blog"
echo "3. 访问管理后台: http://localhost:3000/admin/login"
echo ""
echo "生产环境访问："
echo "- Blog: https://www.lasercalcpro.com/blog"
echo "- Admin: https://www.lasercalcpro.com/admin/login"
echo ""
