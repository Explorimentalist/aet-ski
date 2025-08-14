/**
 * Unified Favicon Generator for AET
 * 
 * This script:
 * 1. Creates the SVG favicon in public/ and src/app/
 * 2. Converts SVG to PNG at various sizes (16x16, 32x32, 48x48, 64x64)
 * 3. Creates ICO files from 32x32 PNG
 * 4. Cleans up temporary PNG files
 * 
 * Usage: node scripts/generate-favicon.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// SVG content for the AET favicon
const svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" fill="#1D4747"/>
<path d="M13.4984 13.735C13.4984 13.735 3.50545 12.2281 8.50192 10.8799C8.50192 10.8799 -0.697928 12.3868 4.69508 13.8937C10.0881 15.4005 15.3225 16.8281 9.2157 18.1764C9.2157 18.1764 25.9499 16.1143 13.4984 13.735Z" fill="#F5F5F5"/>
<path d="M20.6362 12.8627C19.3672 12.0696 17.1466 9.69032 15.9569 6.91448C14.7673 4.13864 14.5294 4.6938 13.1811 6.59724C11.8329 8.50068 12.1501 9.37308 10.9605 8.02482C9.77084 6.67655 9.4536 10.7214 9.4536 10.7214C9.4536 10.7214 4.77437 11.7524 13.3397 13.0213C19.0382 13.8656 19.8573 14.3236 19.7672 14.5357C20.3879 14.2205 21.6103 13.4715 20.6362 12.8627Z" fill="#F5F5F5"/>
</svg>`;

// Define file paths
const publicDir = 'public';
const appDir = path.join('src', 'app');
const svgPublicPath = path.join(publicDir, 'site-icon.svg');
const icoPublicPath = path.join(publicDir, 'site-favicon.ico');

// Ensure directories exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generateFavicons() {
  try {
    console.log('Starting favicon generation...');

    // 1. Create SVG files
    fs.writeFileSync(svgPublicPath, svgContent);
    console.log(`Created SVG favicon at ${svgPublicPath}`);
    
    // 2. Convert to PNG at different sizes
    const sizes = [16, 32, 48, 64];
    const pngPaths = [];
    
    for (const size of sizes) {
      const pngPath = path.join(publicDir, `favicon-${size}x${size}.png`);
      pngPaths.push(pngPath);
      
      await sharp(Buffer.from(svgContent))
        .resize(size, size)
        .png()
        .toFile(pngPath);
      
      console.log(`Created ${size}x${size} PNG favicon`);
    }
    
    // 3. Create ICO files from 32x32 PNG
    await sharp(path.join(publicDir, 'favicon-32x32.png'))
      .toFile(icoPublicPath);
    console.log(`Created ICO favicon at ${icoPublicPath}`);
    
    // 4. Clean up temporary PNG files
    console.log('Cleaning up temporary files...');
    pngPaths.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`Removed temporary file: ${file}`);
      }
    });
    
    console.log('Favicon generation completed successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

