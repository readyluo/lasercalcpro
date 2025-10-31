#!/usr/bin/env node
/**
 * Script to seed initial data into the database
 * Usage: npm run seed-data
 */

import { createClient } from '@libsql/client';

async function seedData() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error('❌ TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set');
    process.exit(1);
  }

  console.log('🌱 Seeding database with initial data...');
  const client = createClient({ url, authToken });

  try {
    // Insert default settings
    console.log('\n⚙️  Inserting default settings...');
    const settings = [
      ['site_name', 'LaserCalc Pro', 'Website name', 'true'],
      ['site_url', 'https://lasercalcpro.com', 'Website URL', 'true'],
      ['admin_email', 'admin@lasercalcpro.com', 'Administrator email', 'false'],
      ['adsense_client_id', '', 'Google AdSense Client ID', 'false'],
      ['ga_tracking_id', '', 'Google Analytics Tracking ID', 'false'],
      ['maintenance_mode', 'false', 'Maintenance mode enabled', 'false'],
      ['maintenance_message', 'We are currently under maintenance. Please check back soon.', 'Maintenance mode message', 'false'],
      ['email_from_name', 'LaserCalc Pro', 'Email sender name', 'false'],
      ['email_from_address', 'noreply@lasercalcpro.com', 'Email sender address', 'false'],
      ['max_calculations_per_day', '100', 'Max calculations per IP per day', 'false'],
      ['enable_pdf_export', 'true', 'Enable PDF report export', 'false']
    ];

    for (const [key, value, desc, isPublic] of settings) {
      try {
        await client.execute({
          sql: 'INSERT OR IGNORE INTO settings (setting_key, setting_value, description, is_public) VALUES (?, ?, ?, ?)',
          args: [key, value, desc, isPublic === 'true' ? 1 : 0]
        });
        console.log(`  ✓ ${key}`);
      } catch (error: any) {
        if (!error.message.includes('UNIQUE constraint')) {
          console.error(`  ✗ ${key}: ${error.message}`);
        }
      }
    }

    // Insert welcome article
    console.log('\n📝 Inserting welcome article...');
    const welcomeArticle = {
      title: 'Welcome to LaserCalc Pro',
      slug: 'welcome-to-lasercalcpro',
      excerpt: 'Learn how to use our professional manufacturing cost calculators to optimize your production planning and reduce costs.',
      content: `<h2>Welcome to LaserCalc Pro</h2>
<p>Your ultimate tool for calculating manufacturing costs with precision and ease.</p>

<h3>What is LaserCalc Pro?</h3>
<p>LaserCalc Pro is a comprehensive suite of professional calculators designed specifically for manufacturing professionals. Whether you're working with laser cutting, CNC machining, or planning equipment investments, our tools help you make informed decisions based on accurate cost calculations.</p>

<h3>Available Calculators</h3>
<ul>
<li><strong>Laser Cutting Calculator</strong> - Calculate precise cutting costs based on material, thickness, and machine parameters</li>
<li><strong>CNC Machining Calculator</strong> - Estimate machining time and costs for various operations</li>
<li><strong>ROI Calculator</strong> - Analyze equipment investments and payback periods</li>
<li><strong>Energy Cost Calculator</strong> - Calculate and optimize energy consumption</li>
<li><strong>Material Utilization Calculator</strong> - Maximize material efficiency and reduce waste</li>
</ul>

<h3>Key Features</h3>
<ul>
<li>Accurate cost calculations based on industry standards</li>
<li>PDF report export for professional documentation</li>
<li>Real-time calculations as you type</li>
<li>Mobile-friendly interface</li>
<li>No registration required for basic use</li>
</ul>

<h3>Getting Started</h3>
<p>Simply navigate to any calculator from the menu and start entering your parameters. All calculations are performed instantly, and you can export your results as a professional PDF report.</p>

<p>For questions or support, please contact us through our contact form.</p>`,
      category: 'tutorials',
      status: 'published',
      author_id: 1,
      meta_title: 'Welcome to LaserCalc Pro | Manufacturing Cost Calculators',
      meta_description: 'Professional cost calculation tools for laser cutting, CNC machining, ROI analysis, and more. Optimize your manufacturing operations with accurate calculations.',
      meta_keywords: 'laser cutting calculator, CNC machining costs, manufacturing calculator, ROI calculator',
      published_at: new Date().toISOString()
    };

    try {
      await client.execute({
        sql: `INSERT OR IGNORE INTO articles 
          (title, slug, excerpt, content, category, status, author_id, meta_title, meta_description, meta_keywords, published_at) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          welcomeArticle.title,
          welcomeArticle.slug,
          welcomeArticle.excerpt,
          welcomeArticle.content,
          welcomeArticle.category,
          welcomeArticle.status,
          welcomeArticle.author_id,
          welcomeArticle.meta_title,
          welcomeArticle.meta_description,
          welcomeArticle.meta_keywords,
          welcomeArticle.published_at
        ]
      });
      console.log('  ✓ Welcome article created');
    } catch (error: any) {
      if (!error.message.includes('UNIQUE constraint')) {
        console.error(`  ✗ Error: ${error.message}`);
      } else {
        console.log('  ⚠️  Welcome article already exists');
      }
    }

    // Insert a few tutorial articles
    console.log('\n📚 Inserting tutorial articles...');
    const tutorials = [
      {
        title: 'How to Calculate Laser Cutting Costs',
        slug: 'how-to-calculate-laser-cutting-costs',
        excerpt: 'Learn the key factors that affect laser cutting costs and how to calculate them accurately.',
        content: `<h2>Understanding Laser Cutting Costs</h2>
<p>Laser cutting costs depend on several key factors including material type, thickness, cutting speed, and machine parameters.</p>
<h3>Key Cost Factors</h3>
<ul>
<li>Material cost per square meter</li>
<li>Cutting time (based on path length and speed)</li>
<li>Machine hourly rate (including depreciation and maintenance)</li>
<li>Energy consumption</li>
<li>Setup and programming time</li>
</ul>
<p>Use our Laser Cutting Calculator to get accurate estimates for your projects.</p>`,
        category: 'tutorials',
        tags: '["laser cutting", "cost calculation", "manufacturing"]'
      },
      {
        title: 'Maximizing CNC Machining Efficiency',
        slug: 'maximizing-cnc-machining-efficiency',
        excerpt: 'Tips and strategies to optimize your CNC machining operations and reduce costs.',
        content: `<h2>CNC Machining Efficiency Guide</h2>
<p>Improving CNC machining efficiency can significantly reduce costs and increase productivity.</p>
<h3>Best Practices</h3>
<ul>
<li>Optimize tool paths to minimize travel time</li>
<li>Use appropriate cutting speeds and feeds</li>
<li>Batch similar parts together</li>
<li>Maintain machines regularly</li>
<li>Train operators on efficient techniques</li>
</ul>
<p>Calculate your machining costs with our CNC Machining Calculator.</p>`,
        category: 'tutorials',
        tags: '["CNC", "efficiency", "manufacturing"]'
      },
      {
        title: 'Understanding Manufacturing ROI',
        slug: 'understanding-manufacturing-roi',
        excerpt: 'A comprehensive guide to calculating and improving return on investment for manufacturing equipment.',
        content: `<h2>Manufacturing ROI Explained</h2>
<p>Return on Investment (ROI) is crucial for making informed equipment purchase decisions.</p>
<h3>ROI Calculation Components</h3>
<ul>
<li>Initial equipment cost</li>
<li>Operating costs (energy, maintenance, consumables)</li>
<li>Labor costs</li>
<li>Revenue generated</li>
<li>Payback period</li>
</ul>
<h3>Improving ROI</h3>
<ul>
<li>Maximize machine utilization</li>
<li>Reduce downtime</li>
<li>Optimize processes</li>
<li>Consider total cost of ownership</li>
</ul>
<p>Use our ROI Calculator to analyze your equipment investments.</p>`,
        category: 'tutorials',
        tags: '["ROI", "investment", "equipment"]'
      }
    ];

    for (const tutorial of tutorials) {
      try {
        await client.execute({
          sql: `INSERT OR IGNORE INTO articles 
            (title, slug, excerpt, content, category, tags, status, author_id, meta_title, meta_description, published_at) 
            VALUES (?, ?, ?, ?, ?, ?, 'published', 1, ?, ?, ?)`,
          args: [
            tutorial.title,
            tutorial.slug,
            tutorial.excerpt,
            tutorial.content,
            tutorial.category,
            tutorial.tags,
            tutorial.title + ' | LaserCalc Pro',
            tutorial.excerpt,
            new Date().toISOString()
          ]
        });
        console.log(`  ✓ ${tutorial.title}`);
      } catch (error: any) {
        if (!error.message.includes('UNIQUE constraint')) {
          console.error(`  ✗ ${tutorial.title}: ${error.message}`);
        }
      }
    }

    // Verify data
    console.log('\n📊 Verifying seeded data...');
    
    const settingsCount = await client.execute('SELECT COUNT(*) as count FROM settings');
    console.log(`  - Settings: ${(settingsCount.rows[0] as any).count} records`);
    
    const articlesCount = await client.execute('SELECT COUNT(*) as count FROM articles');
    console.log(`  - Articles: ${(articlesCount.rows[0] as any).count} records`);
    
    const adminsCount = await client.execute('SELECT COUNT(*) as count FROM admins');
    console.log(`  - Admins: ${(adminsCount.rows[0] as any).count} records`);

    await client.close();
    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Summary:');
    console.log('  - Default settings configured');
    console.log('  - Welcome article created');
    console.log('  - Tutorial articles added');
    console.log('  - Admin user ready');
    console.log('\n🚀 Your database is now ready to use!');

  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    await client.close();
    process.exit(1);
  }
}

// Run the script
seedData()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });

















