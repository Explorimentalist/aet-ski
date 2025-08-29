// aet-ski/scripts/list-cloudinary-logos-admin.mjs
// List all logos in the Cloudinary logos folder using the Admin API

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createHash } from 'crypto';

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
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = envVars;

if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Function to create Cloudinary signature
function createSignature(params) {
  const sortedParams = Object.keys(params)
    .filter(key => key !== 'signature')
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  return createHash('sha1')
    .update(sortedParams + CLOUDINARY_API_SECRET)
    .digest('hex');
}

// Function to list all assets in the logos folder
async function listLogos() {
  try {
    console.log('🔍 Fetching logos from Cloudinary Admin API...\n');
    
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    const params = {
      type: 'upload',
      prefix: 'logos/',
      max_results: 500,
      timestamp: timestamp,
      api_key: CLOUDINARY_API_KEY
    };
    
    // Create signature
    params.signature = createSignature(params);
    
    // Build query string
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image?${queryString}`;
    
    console.log('📡 Making API request...');
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
    }
    
    const data = await response.json();
    
    if (data.resources && data.resources.length > 0) {
      console.log(`📊 Found ${data.resources.length} logos in the logos folder:\n`);
      
      // Group logos by format
      const logosByFormat = {};
      data.resources.forEach(logo => {
        const format = logo.format || 'unknown';
        if (!logosByFormat[format]) {
          logosByFormat[format] = [];
        }
        logosByFormat[format].push(logo);
      });
      
      // Display logos grouped by format
      Object.entries(logosByFormat).forEach(([format, logos]) => {
        console.log(`\n📁 ${format.toUpperCase()} Logos (${logos.length}):`);
        logos.forEach(logo => {
          const publicId = logo.public_id.replace('logos/', '');
          const size = logo.width && logo.height ? `${logo.width}x${logo.height}` : 'unknown size';
          const bytes = logo.bytes ? (logo.bytes / 1024).toFixed(1) + 'KB' : 'unknown size';
          const created = logo.created_at ? new Date(logo.created_at).toLocaleDateString() : 'unknown';
          console.log(`   ✅ ${publicId} (${size}, ${bytes}, created: ${created})`);
        });
      });
      
      // Summary
      console.log(`\n📈 Summary:`);
      console.log(`   Total logos: ${data.resources.length}`);
      Object.entries(logosByFormat).forEach(([format, logos]) => {
        console.log(`   ${format.toUpperCase()}: ${logos.length}`);
      });
      
      // Check for specific logos mentioned in errors
      console.log(`\n🔍 Checking for logos mentioned in browser errors:`);
      const errorLogos = ['esf', 'whitestorm35', 'meriski', 'skihigher', 'trois-vallees-guide'];
      errorLogos.forEach(logoId => {
        const found = data.resources.find(logo => logo.public_id === `logos/${logoId}`);
        if (found) {
          console.log(`   ✅ ${logoId}: Found (${found.format}, ${found.width}x${found.height})`);
        } else {
          console.log(`   ❌ ${logoId}: Missing`);
        }
      });
      
    } else {
      console.log('❌ No logos found in the logos folder');
    }
    
  } catch (error) {
    console.error('❌ Error fetching logos:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 Authentication failed. Check your API credentials.');
      console.log('   - API Key:', CLOUDINARY_API_KEY ? 'SET' : 'NOT SET');
      console.log('   - API Secret:', CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET');
      console.log('   - Cloud Name:', NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    } else if (error.message.includes('403')) {
      console.log('\n💡 Access denied. Check your API permissions.');
    }
  }
}

// Main execution
listLogos().catch(console.error);


