// aet-ski/scripts/list-cloudinary-logos.mjs
// List all logos in the Cloudinary logos folder using the API

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
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = envVars;

if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Function to list all assets in the logos folder
async function listLogos() {
  try {
    console.log('🔍 Fetching logos from Cloudinary...\n');
    
    // Create authentication signature
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = createSignature(timestamp);
    
    const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image?type=upload&prefix=logos/&max_results=500&signature=${signature}&timestamp=${timestamp}&api_key=${CLOUDINARY_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
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
          const size = `${logo.width}x${logo.height}`;
          const bytes = (logo.bytes / 1024).toFixed(1);
          console.log(`   ✅ ${publicId} (${size}, ${bytes}KB)`);
        });
      });
      
      // Summary
      console.log(`\n📈 Summary:`);
      console.log(`   Total logos: ${data.resources.length}`);
      Object.entries(logosByFormat).forEach(([format, logos]) => {
        console.log(`   ${format.toUpperCase()}: ${logos.length}`);
      });
      
    } else {
      console.log('❌ No logos found in the logos folder');
    }
    
  } catch (error) {
    console.error('❌ Error fetching logos:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 Authentication failed. Check your API credentials.');
    } else if (error.message.includes('403')) {
      console.log('\n💡 Access denied. Check your API permissions.');
    }
  }
}

// Create Cloudinary signature for API authentication
function createSignature(timestamp) {
  // This is a simplified version - in production you'd use proper crypto
  // For now, we'll use the API key as a basic authentication
  return CLOUDINARY_API_KEY;
}

// Main execution
listLogos().catch(console.error);


