#!/bin/bash

# LaserCalc Pro 管理后台快速启动脚本
# Quick Start Script for Admin System

set -e

echo "======================================"
echo "  LaserCalc Pro 管理后台快速启动"
echo "  Admin System Quick Start"
echo "======================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 .env 文件
echo "📋 检查环境配置..."
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  未找到 .env 文件，正在创建...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ .env 文件已创建${NC}"
        echo -e "${YELLOW}⚠️  请编辑 .env 文件，配置必要的环境变量：${NC}"
        echo "   - JWT_SECRET"
        echo "   - TURSO_DATABASE_URL"
        echo "   - TURSO_AUTH_TOKEN"
        echo ""
        read -p "配置完成后按 Enter 继续..."
    else
        echo -e "${RED}❌ 未找到 .env.example 文件${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env 文件已存在${NC}"
fi

# 检查 node_modules
echo ""
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  未找到 node_modules，正在安装依赖...${NC}"
    npm install
    echo -e "${GREEN}✅ 依赖安装完成${NC}"
else
    echo -e "${GREEN}✅ 依赖已安装${NC}"
fi

# 初始化数据库
echo ""
echo "🗄️  初始化数据库..."
echo -e "${BLUE}正在创建数据库表...${NC}"
npm run db:init

echo ""
echo -e "${BLUE}正在创建默认管理员账户...${NC}"
npm run db:init-admin

echo ""
echo -e "${GREEN}======================================"
echo "  ✅ 初始化完成！"
echo "======================================${NC}"
echo ""
echo -e "${BLUE}📝 默认管理员账户：${NC}"
echo "   用户名: admin"
echo "   密码:   admin123"
echo "   邮箱:   admin@lasercalcpro.com"
echo ""
echo -e "${RED}⚠️  重要：首次登录后请立即修改密码！${NC}"
echo ""
echo -e "${GREEN}🚀 启动开发服务器...${NC}"
echo ""

# 启动开发服务器
npm run dev

