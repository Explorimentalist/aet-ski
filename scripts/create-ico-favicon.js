const svgToIco = require('svg-to-ico');
const fs = require('fs');
const path = require('path');

// Paths
const svgPath = path.join('public', 'icon.svg');
const icoPublicPath = path.join('public', 'favicon.ico');
const icoAppPath = path.join('src', 'app', 'favicon.ico');

async function convertSvgToIco() {
  try {
    // Generate ICO buffer
    const buffer = await svgToIco(svgPath, {
      sizes: [16, 32, 48, 64],
      resize: true
    });

    // Save to public directory
    fs.writeFileSync(icoPublicPath, buffer);
    console.log(`Created ICO file at ${icoPublicPath}`);

    // Save to app directory
    fs.writeFileSync(icoAppPath, buffer);
    console.log(`Created ICO file at ${icoAppPath}`);
  } catch (error) {
    console.error('Error converting SVG to ICO:', error);
    process.exit(1);
  }
}

convertSvgToIco();

