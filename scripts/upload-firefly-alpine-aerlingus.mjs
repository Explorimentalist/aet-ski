// scripts/upload-firefly-alpine-aerlingus.mjs
// Upload the 3 specific logos the user provided URLs for

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

const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const logosToUpload = [
  {
    name: 'Firefly',
    publicId: 'firefly',
    url: 'https://fd505970.delivery.rocketcdn.me/wp-content/themes/FDRY-version-2/images/Firefly-logo-nobg.svg'
  },
  {
    name: 'Alpine Answers',
    publicId: 'alpine-answers',
    url: 'https://www.alpineanswers.co.uk/assets/AlpineAnswers-Logo-ff65e52b3a375eda75de9546f55a3fcbe189aa47b379eb89c67effb5aacc87ce.svg'
  },
  {
    name: 'Aer Lingus',
    publicId: 'aer-lingus',
    url: 'https://www.aerlingus.com/ei-ui-livery/svg/eiLogo_Teal.svg'
  }
];

async function uploadLogo(logo) {
  try {
    console.log(`Uploading ${logo.name}...`);
    
    // Create timestamp and signature for signed upload
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Create signature with only the required parameters
    const signatureParams = `public_id=logos/${logo.publicId}&timestamp=${timestamp}`;
    const signature = createHash('sha1').update(signatureParams + CLOUDINARY_API_SECRET).digest('hex');
    
    const formData = new FormData();
    formData.append('file', logo.url);
    formData.append('public_id', `logos/${logo.publicId}`);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log(`✅ ${logo.name} uploaded successfully:`, result.public_id);
    return result;
    
  } catch (error) {
    console.error(`❌ Failed to upload ${logo.name}:`, error.message);
    return null;
  }
}

async function uploadAllLogos() {
  console.log('🚀 Starting upload of 3 specific logos...\n');
  
  const results = [];
  
  for (const logo of logosToUpload) {
    const result = await uploadLogo(logo);
    results.push({ logo, result });
    
    // Small delay between uploads
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Upload Summary:');
  const successful = results.filter(r => r.result).length;
  const failed = results.filter(r => !r.result).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\nFailed uploads:');
    results.filter(r => !r.result).forEach(({ logo }) => {
      console.log(`- ${logo.name} (${logo.publicId})`);
    });
  }
  
  return results;
}

uploadAllLogos().catch(console.error);
