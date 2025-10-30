#!/usr/bin/env node
/**
 * Unified Article Import Script
 * Imports all articles from the content directory to the database
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from '@libsql/client';
import { allArticles } from '../content/index';

// Validate environment variables
if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  console.error('❌ 错误: 缺少必需的环境变量');
  console.error('   请确保 .env.local 文件中包含:');
  console.error('   - TURSO_DATABASE_URL');
  console.error('   - TURSO_AUTH_TOKEN');
  process.exit(1);
}

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

interface ImportResult {
  success: number;
  updated: number;
  failed: number;
  errors: string[];
}

async function importArticles(): Promise<ImportResult> {
  const result: ImportResult = {
    success: 0,
    updated: 0,
    failed: 0,
    errors: []
  };

  console.log(`\n📚 开始导入 ${allArticles.length} 篇文章...\n`);

  for (const article of allArticles) {
    try {
      console.log(`📝 处理: ${article.title}`);
      console.log(`   Slug: ${article.slug}`);
      
      const now = new Date().toISOString();
      
      // Try to insert the article
      try {
        await client.execute({
          sql: `INSERT INTO articles (
            title, slug, category, excerpt, content, tags, status, 
            meta_title, meta_description, meta_keywords, author_id, 
            featured_image, views, published_at, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)`,
          args: [
            article.title,
            article.slug,
            article.category || null,
            article.excerpt || null,
            article.content,
            article.tags || null,
            article.status || 'published',
            article.meta_title || article.title,
            article.meta_description || article.excerpt || null,
            article.meta_keywords || null,
            article.author_id || 1,
            article.featured_image || null,
            now, // published_at
            now, // created_at
            now  // updated_at
          ]
        });
        
        result.success++;
        console.log(`   ✅ 导入成功\n`);
        
      } catch (insertError: any) {
        // If article exists (UNIQUE constraint), update it
        if (insertError.message?.includes('UNIQUE')) {
          await client.execute({
            sql: `UPDATE articles SET 
              title = ?, category = ?, excerpt = ?, content = ?, tags = ?,
              status = ?, meta_title = ?, meta_description = ?, meta_keywords = ?,
              featured_image = ?, updated_at = ?
              WHERE slug = ?`,
            args: [
              article.title,
              article.category || null,
              article.excerpt || null,
              article.content,
              article.tags || null,
              article.status || 'published',
              article.meta_title || article.title,
              article.meta_description || article.excerpt || null,
              article.meta_keywords || null,
              article.featured_image || null,
              now,
              article.slug
            ]
          });
          
          result.updated++;
          console.log(`   ♻️  更新成功\n`);
        } else {
          throw insertError;
        }
      }
      
    } catch (error: any) {
      result.failed++;
      const errorMsg = `${article.slug}: ${error.message}`;
      result.errors.push(errorMsg);
      console.log(`   ❌ 失败: ${error.message}\n`);
    }
  }

  return result;
}

async function verifyImport() {
  console.log('\n🔍 验证导入结果...\n');
  
  try {
    const articlesResult = await client.execute(
      'SELECT id, title, slug, status, views, created_at FROM articles ORDER BY created_at DESC'
    );
    
    console.log(`📊 数据库中的文章 (${articlesResult.rows.length} 篇):\n`);
    
    articlesResult.rows.forEach((row: any) => {
      console.log(`   ${row.id}. ${row.title}`);
      console.log(`      Slug: ${row.slug}`);
      console.log(`      状态: ${row.status} | 浏览: ${row.views}`);
      console.log(`      创建: ${new Date(row.created_at).toLocaleString('zh-CN')}\n`);
    });
    
  } catch (error: any) {
    console.error('❌ 验证失败:', error.message);
  }
}

async function main() {
  try {
    // Import articles
    const result = await importArticles();
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📈 导入摘要');
    console.log('='.repeat(60));
    console.log(`✅ 成功导入: ${result.success} 篇`);
    console.log(`♻️  更新: ${result.updated} 篇`);
    console.log(`❌ 失败: ${result.failed} 篇`);
    console.log('='.repeat(60) + '\n');
    
    if (result.errors.length > 0) {
      console.log('❌ 错误详情:');
      result.errors.forEach(error => console.log(`   - ${error}`));
      console.log('');
    }
    
    // Verify import
    await verifyImport();
    
    console.log('🎉 文章导入流程完成！\n');
    
    if (result.failed > 0) {
      process.exit(1);
    }
    
  } catch (error: any) {
    console.error('\n❌ 导入过程出错:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the import
main();

