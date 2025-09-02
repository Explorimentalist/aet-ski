// aet-ski/scripts/create-placeholder-logos.mjs
// Create placeholder logos for missing logos that failed to upload

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

// Missing logos that need placeholder generation
const missingLogos = [
  // Ski Schools
  { name: 'ESF', publicId: 'esf', description: 'École du Ski Français' },
  { name: 'New Generation', publicId: 'new-generation', description: 'Ski School' },
  { name: 'Snow Limits', publicId: 'snow-limits', description: 'Ski School' },
  { name: 'RTM Snowboarding', publicId: 'rtm-snowboarding', description: 'Snowboard School' },
  { name: 'Oxygene', publicId: 'oxygene', description: 'Ski School' },
  { name: 'Momentum', publicId: 'momentum', description: 'Ski School' },
  { name: 'Marmalade', publicId: 'marmalade', description: 'Ski School' },
  
  // Ski Hire
  { name: 'White Storm', publicId: 'whitestorm35', description: 'Ski Hire' },
  { name: 'Ski Higher', publicId: 'skihigher', description: 'Ski Hire' },
  { name: 'Freeride France', publicId: 'freeride-france', description: 'Ski Hire' },
  { name: 'Slide Candy', publicId: 'slide-candy', description: 'Ski Hire' },
  
  // Chalet Accommodation
  { name: 'Meriski', publicId: 'meriski', description: 'Chalet Company' },
  { name: 'Ski Blanc', publicId: 'ski-blanc', description: 'Chalet Company' },
  { name: 'Alpine Ethos', publicId: 'alpine-ethos', description: 'Chalet Company' },
  { name: 'Skivo', publicId: 'skivo', description: 'Chalet Company' },
  { name: 'Alpine Independence', publicId: 'alpine-independence', description: 'Chalet Company' },
  
  // Information Websites
  { name: 'Meribel Unplugged', publicId: 'meribel-unplugged', description: 'Resort Guide' },
  { name: 'Thesnowco', publicId: 'thesnowco', description: 'Ski Guide' },
  { name: 'Welove2ski', publicId: 'welove2ski', description: 'Ski Community' },
  { name: 'Snowheads', publicId: 'snowheads', description: 'Ski Forum' },
  { name: 'Natives.co.uk', publicId: 'natives', description: 'Resort Guide' },
  { name: 'Unplugged Courchevel', publicId: 'unplugged-courchevel', description: 'Resort Guide' },
  
  // Self Catering
  { name: 'Extreme Cuisine', publicId: 'extreme-cuisine', description: 'Food Delivery' },
  
  // Resort Info
  { name: 'Three Valleys Guide', publicId: 'trois-vallees-guide', description: 'Resort Guide' },
];

// Generate SVG placeholder for each missing logo
function generatePlaceholderSVG(logoName, description) {
  const text = logoName.length > 20 ? logoName.substring(0, 20) + '...' : logoName;
  const desc = description.length > 30 ? description.substring(0, 30) + '...' : description;
  
  return `<svg width="300" height="80" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="80" fill="#1D4747" rx="8"/>
  <text x="150" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">${text}</text>
  <text x="150" y="55" font-family="Arial, sans-serif" font-size="10" fill="#CCCCCC" text-anchor="middle">${desc}</text>
</svg>`;
}

// Upload placeholder logo to Cloudinary
async function uploadPlaceholderLogo(logoName, publicId, svgContent) {
  try {
    // Convert SVG to data URI
    const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
    
    const formData = new FormData();
    formData.append('file', dataUri);
    formData.append('upload_preset', 'aet-ski-preset');
    formData.append('folder', 'logos');
    formData.append('public_id', publicId);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      success: true,
      publicId: data.public_id,
      secureUrl: data.secure_url,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Main function
async function main() {
  console.log('🎨 Creating placeholder logos for missing logos...\n');
  
  const results = [];
  
  for (const logo of missingLogos) {
    console.log(`→ Creating placeholder for ${logo.name}...`);
    
    const svgContent = generatePlaceholderSVG(logo.name, logo.description);
    const result = await uploadPlaceholderLogo(logo.name, logo.publicId, svgContent);
    
    if (result.success) {
      console.log(`   ✅ Created: ${result.publicId} -> ${result.secureUrl}`);
    } else {
      console.log(`   ❌ Failed: ${result.error}`);
    }
    
    results.push({
      name: logo.name,
      publicId: logo.publicId,
      ...result
    });
  }
  
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;
  
  console.log(`\n📊 Results: ${successful} created, ${failed} failed`);
  
  if (failed > 0) {
    console.log('\n❌ Failed logos:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.name} (${r.publicId}): ${r.error}`);
    });
  }
  
  if (successful > 0) {
    console.log('\n✅ Successfully created logos:');
    results.filter(r => r.success).forEach(r => {
      console.log(`   - ${r.name} (${r.publicId})`);
    });
  }
}

main().catch(console.error);




