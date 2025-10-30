#!/usr/bin/env node

/**
 * Cloudflare API 部署脚本
 * 使用 Email + Global API Key 方式进行认证
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ===== Cloudflare API 配置 =====
const CLOUDFLARE_EMAIL = 'yigetech@gmail.com';
const CLOUDFLARE_API_KEY = 'd70a07155b7e29ba4c0fe1ac05e976fe6852f';
const PROJECT_NAME = 'lasercalcpro';
const ACCOUNT_ID = ''; // 将从API自动获取

// ===== API 请求封装 =====
function makeCloudflareRequest(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4${endpoint}`,
      method: method,
      headers: {
        'X-Auth-Email': CLOUDFLARE_EMAIL,
        'X-Auth-Key': CLOUDFLARE_API_KEY,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(responseData);
          if (jsonData.success) {
            resolve(jsonData);
          } else {
            reject(new Error(`API Error: ${JSON.stringify(jsonData.errors)}`));
          }
        } catch (error) {
          reject(new Error(`Failed to parse response: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// ===== 步骤1: 获取账户ID =====
async function getAccountId() {
  console.log('\n📋 正在获取 Cloudflare 账户信息...');
  
  try {
    const response = await makeCloudflareRequest('GET', '/accounts');
    
    if (response.result && response.result.length > 0) {
      const account = response.result[0];
      console.log(`✅ 账户 ID: ${account.id}`);
      console.log(`✅ 账户名称: ${account.name}`);
      return account.id;
    } else {
      throw new Error('No accounts found');
    }
  } catch (error) {
    console.error('❌ 获取账户信息失败:', error.message);
    throw error;
  }
}

// ===== 步骤2: 检查现有 Pages 项目 =====
async function listPagesProjects(accountId) {
  console.log('\n📋 正在检查现有的 Pages 项目...');
  
  try {
    const response = await makeCloudflareRequest('GET', `/accounts/${accountId}/pages/projects`);
    
    console.log(`✅ 找到 ${response.result.length} 个现有项目:`);
    response.result.forEach(project => {
      console.log(`  - ${project.name} (${project.production_branch || 'no branch'})`);
    });
    
    return response.result;
  } catch (error) {
    console.error('❌ 获取项目列表失败:', error.message);
    return [];
  }
}

// ===== 步骤3: 检查现有 D1 数据库 =====
async function listD1Databases(accountId) {
  console.log('\n📋 正在检查现有的 D1 数据库...');
  
  try {
    const response = await makeCloudflareRequest('GET', `/accounts/${accountId}/d1/database`);
    
    console.log(`✅ 找到 ${response.result.length} 个现有数据库:`);
    response.result.forEach(db => {
      console.log(`  - ${db.name} (ID: ${db.uuid})`);
    });
    
    return response.result;
  } catch (error) {
    console.error('❌ 获取数据库列表失败:', error.message);
    return [];
  }
}

// ===== 步骤4: 创建或获取 D1 数据库 =====
async function ensureD1Database(accountId) {
  console.log('\n🗄️ 正在设置 D1 数据库...');
  
  const databases = await listD1Databases(accountId);
  const dbName = 'lasercalcpro-db';
  
  // 查找现有数据库
  const existingDb = databases.find(db => db.name === dbName);
  
  if (existingDb) {
    console.log(`✅ 使用现有数据库: ${existingDb.name} (ID: ${existingDb.uuid})`);
    return existingDb;
  }
  
  // 创建新数据库
  console.log(`📦 创建新数据库: ${dbName}...`);
  try {
    const response = await makeCloudflareRequest('POST', `/accounts/${accountId}/d1/database`, {
      name: dbName,
    });
    
    console.log(`✅ 数据库创建成功: ${response.result.uuid}`);
    return response.result;
  } catch (error) {
    console.error('❌ 创建数据库失败:', error.message);
    throw error;
  }
}

// ===== 步骤5: 初始化数据库 Schema =====
async function initializeD1Schema(accountId, databaseId) {
  console.log('\n📝 正在初始化数据库 Schema...');
  
  const schemaPath = path.join(__dirname, '../lib/db/schema.sql');
  
  if (!fs.existsSync(schemaPath)) {
    console.log('⚠️ Schema 文件不存在，跳过初始化');
    return;
  }
  
  try {
    // 使用 wrangler CLI 初始化 Schema
    console.log('使用 wrangler 执行 Schema...');
    execSync(`npx wrangler d1 execute ${databaseId} --file=${schemaPath}`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    console.log('✅ Schema 初始化成功');
  } catch (error) {
    console.log('⚠️ Schema 初始化失败 (数据库可能已初始化)');
  }
}

// ===== 步骤6: 更新 wrangler.toml =====
async function updateWranglerToml(databaseId) {
  console.log('\n📝 正在更新 wrangler.toml...');
  
  const wranglerPath = path.join(__dirname, '../wrangler.toml');
  let content = fs.readFileSync(wranglerPath, 'utf8');
  
  // 更新主数据库 ID
  content = content.replace(
    /database_id = ""  # 运行 wrangler d1 create 后获取/,
    `database_id = "${databaseId}"`
  );
  
  // 更新生产环境数据库 ID
  content = content.replace(
    /database_id = ""  # 创建数据库后填入/,
    `database_id = "${databaseId}"`
  );
  
  // 更新开发环境数据库 ID (如果使用同一个数据库)
  content = content.replace(
    /database_id = ""  # 开发数据库 ID/,
    `database_id = "${databaseId}"`
  );
  
  fs.writeFileSync(wranglerPath, content);
  console.log('✅ wrangler.toml 更新成功');
}

// ===== 步骤7: 构建项目 =====
async function buildProject() {
  console.log('\n🔨 正在构建项目...');
  
  try {
    // 安装依赖（如果需要）
    if (!fs.existsSync(path.join(__dirname, '../node_modules'))) {
      console.log('📦 正在安装依赖...');
      execSync('npm install --legacy-peer-deps', {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      });
    }
    
    // 构建项目
    console.log('🔨 正在构建 Next.js 项目...');
    execSync('npm run pages:build', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    
    console.log('✅ 项目构建成功');
    return true;
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    return false;
  }
}

// ===== 步骤8: 部署到 Cloudflare Pages =====
async function deployToPages(accountId) {
  console.log('\n🚀 正在部署到 Cloudflare Pages...');
  
  try {
    // 使用 wrangler 部署
    execSync(`npx wrangler pages deploy .vercel/output/static --project-name=${PROJECT_NAME}`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
      env: {
        ...process.env,
        CLOUDFLARE_ACCOUNT_ID: accountId,
        CLOUDFLARE_API_TOKEN: CLOUDFLARE_API_KEY,
      },
    });
    
    console.log('✅ 部署成功!');
    console.log(`\n🌐 访问你的站点: https://${PROJECT_NAME}.pages.dev`);
    return true;
  } catch (error) {
    console.error('❌ 部署失败:', error.message);
    return false;
  }
}

// ===== 步骤9: 配置 D1 绑定 =====
async function configureD1Binding(accountId, projectName, databaseId) {
  console.log('\n🔗 正在配置 D1 数据库绑定...');
  
  try {
    // 注意：Pages 的 D1 绑定需要通过 Dashboard 或者部署时的配置
    console.log('⚠️ D1 绑定需要在 Cloudflare Dashboard 中手动配置:');
    console.log('1. 访问: https://dash.cloudflare.com/');
    console.log(`2. 进入 Pages 项目: ${projectName}`);
    console.log('3. 进入 Settings -> Functions');
    console.log('4. 添加 D1 Database Binding:');
    console.log(`   - Variable name: DB`);
    console.log(`   - D1 Database: lasercalcpro-db`);
  } catch (error) {
    console.error('❌ 配置绑定失败:', error.message);
  }
}

// ===== 主函数 =====
async function main() {
  console.log('========================================');
  console.log('🚀 LaserCalc Pro - Cloudflare 部署脚本');
  console.log('========================================');
  
  try {
    // 步骤1: 获取账户ID
    const accountId = await getAccountId();
    
    // 步骤2: 列出现有项目（不删除）
    await listPagesProjects(accountId);
    
    // 步骤3: 设置D1数据库
    const database = await ensureD1Database(accountId);
    
    // 步骤4: 初始化Schema
    await initializeD1Schema(accountId, database.uuid);
    
    // 步骤5: 更新配置文件
    await updateWranglerToml(database.uuid);
    
    // 步骤6: 构建项目
    const buildSuccess = await buildProject();
    if (!buildSuccess) {
      throw new Error('构建失败，停止部署');
    }
    
    // 步骤7: 部署到Pages
    await deployToPages(accountId);
    
    // 步骤8: 配置说明
    await configureD1Binding(accountId, PROJECT_NAME, database.uuid);
    
    console.log('\n========================================');
    console.log('✅ 部署完成！');
    console.log('========================================');
    console.log(`\n📊 账户 ID: ${accountId}`);
    console.log(`📦 数据库 ID: ${database.uuid}`);
    console.log(`🌐 项目名称: ${PROJECT_NAME}`);
    console.log(`🔗 访问地址: https://${PROJECT_NAME}.pages.dev`);
    console.log('\n⚠️ 记得在 Cloudflare Dashboard 中配置 D1 绑定！');
    
  } catch (error) {
    console.error('\n❌ 部署过程出错:', error.message);
    process.exit(1);
  }
}

// 运行主函数
main();

