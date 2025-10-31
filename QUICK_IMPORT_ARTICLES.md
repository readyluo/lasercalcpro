# 快速导入文章指南

## 最快速的方式

### 1. 导入所有文章到数据库

```bash
npm run import-articles
```

就这么简单！✨

## 查看结果

### 访问前台博客页面
```
http://localhost:3000/blog
```

### 访问具体文章
```
http://localhost:3000/blog/complete-guide-laser-cutting-costs-7-factors
http://localhost:3000/blog/cnc-machining-cost-formula-complete-breakdown
```

## 已导入的文章

目前系统中已经准备好 2 篇高质量文章：

1. **激光切割成本完整指南**
   - Slug: `complete-guide-laser-cutting-costs-7-factors`
   - 分类: Tutorials
   - 字数: 2500+
   - 涵盖: 7大成本因素详解

2. **CNC加工成本计算公式详解**
   - Slug: `cnc-machining-cost-formula-complete-breakdown`
   - 分类: Tutorials
   - 字数: 2000+
   - 涵盖: 完整的报价公式和实例

## 添加新文章

### 快速流程

1. **创建文章文件** (如 `content/article-03-xxx.ts`)
   
2. **更新索引** (`content/index.ts`)
   ```typescript
   import { article as article03 } from './article-03-xxx';
   export const allArticles = [article01, article02, article03];
   ```

3. **导入**
   ```bash
   npm run import-articles
   ```

完成！🎉

## 文章模板

```typescript
export const article = {
  title: '你的文章标题',
  slug: 'your-article-slug',
  category: 'tutorials',
  excerpt: '简短描述...',
  content: `<div class="article-content">
    <h2>标题</h2>
    <p>内容...</p>
  </div>`,
  tags: '["标签1","标签2"]',
  status: 'published',
  meta_title: 'SEO标题',
  meta_description: 'SEO描述',
  meta_keywords: 'SEO关键词',
  author_id: 1
};
```

详细信息请参考 [ARTICLE_IMPORT_GUIDE.md](./ARTICLE_IMPORT_GUIDE.md)














