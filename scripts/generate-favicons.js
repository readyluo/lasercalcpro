const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SVG content for blue L logo
const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#2563EB" rx="64"/>
  <text x="256" y="400" font-family="Arial, sans-serif" font-size="380" font-weight="bold" fill="white" text-anchor="middle">L</text>
</svg>
`;

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

async function generateFavicons() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  console.log('Generating favicons...');
  
  for (const { size, name } of sizes) {
    try {
      await sharp(Buffer.from(svgContent))
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }
  
  // Generate ICO file (32x32)
  try {
    await sharp(Buffer.from(svgContent))
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✓ Generated favicon.ico (32x32)');
  } catch (error) {
    console.error('✗ Failed to generate favicon.ico:', error.message);
  }
  
  // Save SVG
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent.trim());
  console.log('✓ Saved icon.svg');
  
  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);

