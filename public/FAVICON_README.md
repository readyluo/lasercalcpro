# Favicon 图标说明

## 需要的图标文件

请使用专业设计工具（如 Figma、Adobe Illustrator 或在线工具 https://realfavicongenerator.net/）创建以下图标：

### 必需文件：
- `favicon.ico` - 传统浏览器图标（16x16, 32x32, 48x48 多尺寸合并）
- `favicon-16x16.png` - 小尺寸浏览器标签图标
- `favicon-32x32.png` - 标准浏览器标签图标
- `apple-touch-icon.png` - iOS设备主屏幕图标（180x180）
- `android-chrome-192x192.png` - Android设备图标（192x192）
- `android-chrome-512x512.png` - Android设备高清图标（512x512）
- `mstile-150x150.png` - Windows磁贴图标（150x150）

## 设计建议

**主题**: 激光切割/制造业相关
- 颜色: 使用网站主色调 #2563eb（蓝色）
- 图形: 激光光束、切割图案、或字母 "LC"
- 风格: 简洁、现代、专业

## 快速生成方法

1. 访问 https://realfavicongenerator.net/
2. 上传一个 512x512 的PNG图标（正方形，透明背景）
3. 自定义各平台图标样式
4. 下载生成的图标包
5. 替换 `/public/` 目录下的所有图标文件

## 临时占位符

当前使用 Next.js 默认 favicon.ico，建议尽快替换为品牌图标。

## 验证方法

上线后，访问以下工具验证图标：
- https://realfavicongenerator.net/favicon_checker
- Chrome DevTools > Application > Manifest
- iOS Safari: 添加到主屏幕查看效果
- Android Chrome: 添加到主屏幕查看效果

