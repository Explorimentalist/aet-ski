// aet-ski/scripts/fix-missing-esf.mjs
// Fix the missing ESF logo by creating and uploading a proper SVG placeholder

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables
const envPath = join(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
} = envVars;

const CLOUDINARY_UPLOAD_PRESET = 'aet-ski-preset';

if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Create ESF SVG placeholder
function createESFSVG() {
  return `<svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="80" rx="8" fill="#1e40af"/>
  <text x="100" y="30" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">ESF</text>
  <text x="100" y="50" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12">École du Ski</text>
  <text x="100" y="65" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12">Français</text>
</svg>`;
}

// Upload to Cloudinary
async function uploadESFLogo() {
  try {
    console.log('🔧 Fixing missing ESF logo...');
    
    const svgContent = createESFSVG();
    const svgDataUri = `data:image/svg+xml;base64,${Buffer.from(svgContent, 'utf8').toString('base64')}`;
    
    const formData = new FormData();
    formData.append('file', svgDataUri);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'logos');
    formData.append('public_id', 'esf');
    formData.append('invalidate', '1');
    formData.append('use_filename', '0');
    
    const endpoint = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const response = await fetch(endpoint, { method: 'POST', body: formData });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Upload failed: ${data.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ ESF logo uploaded successfully!');
    console.log(`   Public ID: ${data.public_id}`);
    console.log(`   URL: ${data.secure_url}`);
    console.log(`   Format: ${data.format}`);
    
    // Test the uploaded logo
    console.log('\n🧪 Testing uploaded logo...');
    const testResponse = await fetch(`https://res.cloudinary.com/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/logos/esf.svg`);
    
    if (testResponse.ok) {
      console.log('✅ Logo is now accessible!');
    } else {
      console.log('❌ Logo still not accessible');
    }
    
  } catch (error) {
    console.error('❌ Error uploading ESF logo:', error.message);
  }
}

// Main execution
uploadESFLogo().catch(console.error);
