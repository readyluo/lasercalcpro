# 推送到 GitHub 指南

## 📦 当前状态

✅ Git 仓库已初始化
✅ 所有文件已提交
✅ 远程仓库已配置

## 🚀 推送步骤

### 步骤 1: 在 GitHub 创建仓库

1. 访问：https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `lasercalcpro`
   - **Description**: `Professional Manufacturing Cost Calculators - LaserCalc Pro`
   - **Public** 或 **Private** (根据你的需求)
   - ⚠️ **不要勾选** "Initialize this repository with a README"
3. 点击 **"Create repository"**

### 步骤 2: 推送代码

打开终端，运行：

```bash
cd /Users/luokun/Downloads/LaserCalcpro
./push-to-github.sh
```

或者手动执行：

```bash
cd /Users/luokun/Downloads/LaserCalcpro
git branch -M main
git push -u origin main
```

### 步骤 3: 验证

推送成功后，访问：
https://github.com/readyluo/lasercalcpro

## 🔧 如果遇到问题

### 问题 1: Token 权限不足

如果推送失败，需要创建新的 Personal Access Token：

1. 访问：https://github.com/settings/tokens/new
2. 勾选权限：
   - ✅ `repo` (完整权限)
   - ✅ `workflow`
3. 点击 "Generate token"
4. 复制新 token
5. 更新远程仓库：

```bash
cd /Users/luokun/Downloads/LaserCalcpro
git remote set-url origin https://YOUR_NEW_TOKEN@github.com/readyluo/lasercalcpro.git
git push -u origin main
```

### 问题 2: 仓库已存在

如果仓库已存在但为空：

```bash
git push -u origin main --force
```

### 问题 3: 远程仓库有内容

如果远程仓库已有内容：

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## 📝 推送后的后续步骤

1. **设置 GitHub Pages** (如果需要)
2. **配置 GitHub Actions** (自动部署)
3. **添加 README 徽章**
4. **设置分支保护规则**

## 🎯 直接部署到 Vercel

推送到 GitHub 后，可以立即部署到 Vercel：

```bash
vercel --prod
```

或者在 Vercel Dashboard 中连接 GitHub 仓库。

---

**准备好了吗？** 

1. 先在 https://github.com/new 创建仓库
2. 然后运行 `./push-to-github.sh`

就这么简单！

