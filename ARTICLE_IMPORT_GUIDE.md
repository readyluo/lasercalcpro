# 文章导入系统使用指南

## 概述

我们创建了一个统一的文章导入系统，解决了之前逐篇导入的问题，让文章管理更加方便和高效。

## 系统架构

### 1. 文章内容管理 (`content/` 目录)

所有文章内容集中在 `content/` 目录下：

```
content/
├── index.ts                                      # 文章索引文件
├── article-01-laser-cutting-cost-complete-guide.ts
└── article-02-cnc-machining-cost-formula.ts
```

### 2. 文章导入 API

**端点**: `POST /api/admin/articles/import`

**功能**:
- 批量导入文章
- 自动检测文章是否存在（通过 slug）
- 已存在的文章会自动更新
- 返回详细的导入报告

**认证**: 需要管理员权限

### 3. 导入脚本

#### 统一批量导入
```bash
npm run import-articles
```
导入 `content/index.ts` 中定义的所有文章。

#### 单篇文章导入（向后兼容）
```bash
npm run import-article-1    # 导入第一篇文章
npm run import-article-2    # 导入第二篇文章
```

## 如何添加新文章

### 步骤 1: 创建文章内容文件

在 `content/` 目录下创建新文件，例如 `article-03-xxx.ts`:

```typescript
export const article = {
  title: '文章标题',
  slug: 'article-slug-url-friendly',
  category: 'tutorials', // 或 'industry', 'case-studies', 'news'
  excerpt: '文章摘要，简短描述...',
  content: `
    <div class="article-content">
      <h2>标题</h2>
      <p>内容...</p>
    </div>
  `,
  tags: '["标签1","标签2","标签3"]',
  status: 'published', // 或 'draft', 'archived'
  meta_title: 'SEO 标题',
  meta_description: 'SEO 描述',
  meta_keywords: 'SEO 关键词',
  author_id: 1,
  featured_image: '/images/blog/article-image.jpg' // 可选
};
```

### 步骤 2: 更新索引文件

编辑 `content/index.ts`:

```typescript
import { article as article01 } from './article-01-laser-cutting-cost-complete-guide';
import { article as article02 } from './article-02-cnc-machining-cost-formula';
import { article as article03 } from './article-03-xxx';  // 添加新文章

export const allArticles = [
  article01,
  article02,
  article03,  // 添加到数组
];

export { article01, article02, article03 };
```

### 步骤 3: 导入到数据库

```bash
npm run import-articles
```

导入脚本会：
- ✅ 自动创建新文章
- ♻️  自动更新已存在的文章
- ❌ 报告失败的文章及错误信息
- 📊 显示数据库中所有文章的列表

## 文章字段说明

### 必填字段
- `title`: 文章标题
- `slug`: URL 友好的标识符（唯一）
- `content`: 文章内容（HTML 格式）

### 可选字段
- `category`: 分类 (`tutorials`, `industry`, `case-studies`, `news`)
- `excerpt`: 文章摘要
- `tags`: 标签（JSON 字符串数组）
- `status`: 状态 (`draft`, `published`, `archived`)
- `featured_image`: 特色图片路径
- `meta_title`: SEO 标题
- `meta_description`: SEO 描述
- `meta_keywords`: SEO 关键词
- `author_id`: 作者 ID（默认 1）

## 使用 API 导入（高级）

### 请求示例

```bash
curl -X POST http://localhost:3000/api/admin/articles/import \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "articles": [
      {
        "title": "文章标题",
        "slug": "article-slug",
        "content": "<div>内容</div>",
        "category": "tutorials",
        "status": "published"
      }
    ]
  }'
```

### 响应示例

```json
{
  "success": true,
  "message": "Processed 1 articles: 1 imported, 0 updated, 0 failed",
  "imported": 1,
  "updated": 0,
  "failed": 0,
  "details": [
    {
      "slug": "article-slug",
      "action": "imported"
    }
  ]
}
```

## 前台访问

导入成功后，文章可以通过以下 URL 访问：

- **博客列表**: `http://localhost:3000/blog`
- **文章详情**: `http://localhost:3000/blog/[slug]`

例如：
- `http://localhost:3000/blog/complete-guide-laser-cutting-costs-7-factors`
- `http://localhost:3000/blog/cnc-machining-cost-formula-complete-breakdown`

## 验证导入结果

### 方法 1: 运行导入脚本
导入脚本会自动显示数据库中的所有文章。

### 方法 2: 使用验证脚本
```bash
npm run db:verify
```

### 方法 3: 直接访问前台
访问 `http://localhost:3000/blog` 查看文章列表。

## 常见问题

### Q: 文章没有显示在前台？
A: 检查：
1. 文章 `status` 是否为 `published`
2. 文章是否成功导入到数据库
3. 开发服务器是否正在运行
4. 浏览器缓存

### Q: 如何更新已发布的文章？
A: 直接修改 content 目录中的文章文件，然后再次运行 `npm run import-articles`。脚本会自动检测并更新已存在的文章。

### Q: 如何批量导入大量文章？
A: 
1. 将所有文章添加到 `content/` 目录
2. 在 `content/index.ts` 中导入并添加到 `allArticles` 数组
3. 运行 `npm run import-articles`

### Q: 可以从外部数据源导入吗？
A: 可以！使用 `/api/admin/articles/import` API 端点，传入文章数组即可。

## 优势

相比之前的逐篇导入方式：

✅ **统一管理**: 所有文章内容集中在 content 目录  
✅ **批量操作**: 一次命令导入所有文章  
✅ **自动更新**: 无需手动判断文章是否存在  
✅ **易于维护**: 清晰的文件结构和索引  
✅ **版本控制**: 文章内容可以通过 Git 进行版本管理  
✅ **API 支持**: 支持通过 API 进行程序化导入  

## 总结

新的文章导入系统大大简化了文章管理流程：
- 添加新文章只需 3 步
- 支持批量导入和更新
- 提供详细的导入报告
- 完整的 API 支持

开始使用吧！🚀
















