const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// First, let's convert our SVG to PNG at different sizes
async function createFavicons() {
  try {
    const svgBuffer = fs.readFileSync(path.join('public', 'icon.svg'));
    
    // Create PNG versions at different sizes
    const sizes = [16, 32, 48, 64];
    
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join('public', `favicon-${size}x${size}.png`));
      
      console.log(`Created ${size}x${size} PNG favicon`);
    }
    
    // Create a 32x32 favicon.ico in the public directory
    await sharp(path.join('public', 'favicon-32x32.png'))
      .toFile(path.join('public', 'favicon.ico'));
    
    // Copy to the app directory as well
    fs.copyFileSync(
      path.join('public', 'favicon.ico'),
      path.join('src', 'app', 'favicon.ico')
    );
    
    console.log('Created favicon.ico files in public/ and src/app/');
  } catch (error) {
    console.error('Error creating favicons:', error);
    process.exit(1);
  }
}

createFavicons();

