const fs = require('fs');
const path = require('path');

// Regex to detect Chinese characters
const chineseRegex = /[\u4e00-\u9fa5]/g;

function scanFile(filePath, isAdmin = false) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const matches = [];

  lines.forEach((line, index) => {
    const chineseChars = line.match(chineseRegex);
    if (chineseChars) {
      matches.push({
        line: index + 1,
        content: line.trim(),
        chars: chineseChars.join('')
      });
    }
  });

  return matches;
}

function scanDirectory(dir, baseDir, results, isAdmin = false) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const relativePath = path.relative(baseDir, filePath);

    // Skip node_modules, .next, etc.
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'dist') {
      return;
    }

    if (stat.isDirectory()) {
      // Check if entering admin directory
      const isAdminDir = file === 'admin' || isAdmin;
      scanDirectory(filePath, baseDir, results, isAdminDir);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      // Skip declaration files
      if (file.endsWith('.d.ts')) return;

      const matches = scanFile(filePath, isAdmin);
      if (matches.length > 0) {
        results.push({
          file: relativePath,
          isAdmin,
          matches
        });
      }
    }
  });
}

function main() {
  const projectRoot = path.join(__dirname, '..');
  const results = [];

  console.log('🔍 Scanning for Chinese characters...\n');

  // Scan app directory
  scanDirectory(path.join(projectRoot, 'app'), projectRoot, results);
  
  // Scan components directory
  scanDirectory(path.join(projectRoot, 'components'), projectRoot, results);

  // Separate frontend and admin results
  const frontendIssues = results.filter(r => !r.isAdmin);
  const adminFiles = results.filter(r => r.isAdmin);

  console.log('='.repeat(80));
  console.log('📊 SCAN RESULTS');
  console.log('='.repeat(80));
  console.log(`Total files scanned: ${results.length}`);
  console.log(`Frontend files with Chinese: ${frontendIssues.length}`);
  console.log(`Admin files with Chinese: ${adminFiles.length}`);
  console.log('='.repeat(80));
  console.log();

  if (frontendIssues.length > 0) {
    console.log('🚨 FRONTEND ISSUES (Should be English only):');
    console.log('-'.repeat(80));
    frontendIssues.forEach(({ file, matches }) => {
      console.log(`\n📄 ${file}`);
      matches.forEach(({ line, content, chars }) => {
        console.log(`   Line ${line}: ${chars}`);
        console.log(`   → ${content.substring(0, 100)}${content.length > 100 ? '...' : ''}`);
      });
    });
    console.log('\n' + '='.repeat(80));
  } else {
    console.log('✅ No Chinese characters found in frontend files!\n');
  }

  if (adminFiles.length > 0) {
    console.log('ℹ️  ADMIN FILES (Chinese is expected):');
    console.log('-'.repeat(80));
    adminFiles.forEach(({ file, matches }) => {
      console.log(`   ✓ ${file} (${matches.length} instances)`);
    });
    console.log('\n' + '='.repeat(80));
  }

  // Exit with error if frontend has Chinese
  if (frontendIssues.length > 0) {
    console.log('\n⚠️  Action required: Remove Chinese from frontend files\n');
    process.exit(1);
  } else {
    console.log('\n✨ All checks passed!\n');
    process.exit(0);
  }
}

main();

