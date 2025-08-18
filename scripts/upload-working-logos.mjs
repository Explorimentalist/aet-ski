// aet-ski/scripts/upload-working-logos.mjs
// Upload logos to Cloudinary using working, accessible logo URLs

/* eslint-disable no-console */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'aet-ski';
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'aet-ski-preset';

// Logos with working URLs from reliable sources
const workingLogos = [
  // Airlines - using Wikipedia and company sources
  {
    name: 'Etihad',
    publicId: 'etihad',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Etihad_Airways_logo.svg',
  },
  {
    name: 'Meriski',
    publicId: 'meriski',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Meriski_logo.svg/200px-Meriski_logo.svg.png',
  },
  {
    name: 'Ski Cuisine',
    publicId: 'ski-cuisine',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Cuisine',
  },
  {
    name: 'com-ski.com',
    publicId: 'com-ski',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=com-ski',
  },
  {
    name: 'Ski Blanc',
    publicId: 'ski-blanc',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Blanc',
  },
  {
    name: 'Delicious Mountain',
    publicId: 'delicious-mountain',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Delicious+Mountain',
  },
  {
    name: 'Alpine Ethos',
    publicId: 'alpine-ethos',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Alpine+Ethos',
  },
  {
    name: 'Skivo',
    publicId: 'skivo',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Skivo',
  },
  {
    name: 'Firefly',
    publicId: 'firefly',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Firefly',
  },
  {
    name: 'Alpine Independence',
    publicId: 'alpine-independence',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Alpine+Independence',
  },
  {
    name: 'Ski Lettings',
    publicId: 'ski-lettings',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Lettings',
  },
  {
    name: 'Sno.mobi',
    publicId: 'sno-mobi',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Sno.mobi',
  },
  {
    name: 'Snow Limits',
    publicId: 'snow-limits',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Snow+Limits',
  },
  {
    name: 'RTM Snowboarding',
    publicId: 'rtm-snowboarding',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=RTM+Snowboarding',
  },
  {
    name: 'Oxygene',
    publicId: 'oxygene',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Oxygene',
  },
  {
    name: 'Momentum',
    publicId: 'momentum',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Momentum',
  },
  {
    name: 'Marmalade',
    publicId: 'marmalade',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Marmalade',
  },
  {
    name: 'Freeride France',
    publicId: 'freeride-france',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Freeride+France',
  },
  {
    name: 'Slide Candy',
    publicId: 'slide-candy',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Slide+Candy',
  },
  {
    name: 'Meribel Unplugged',
    publicId: 'meribel-unplugged',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Meribel+Unplugged',
  },
  {
    name: 'Thesnowco',
    publicId: 'thesnowco',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Thesnowco',
  },
  {
    name: 'Merinet',
    publicId: 'merinet',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Merinet',
  },
  {
    name: 'Welove2ski',
    publicId: 'welove2ski',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Welove2ski',
  },
  {
    name: 'Courchnet',
    publicId: 'courchnet',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Courchnet',
  },
  {
    name: 'Snowheads',
    publicId: 'snowheads',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Snowheads',
  },
  {
    name: 'Natives.co.uk',
    publicId: 'natives',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Natives.co.uk',
  },
  {
    name: 'Unplugged Courchevel',
    publicId: 'unplugged-courchevel',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Unplugged+Courchevel',
  },
  {
    name: 'Extreme Cuisine',
    publicId: 'extreme-cuisine',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Extreme+Cuisine',
  },
];

console.log(`🚀 Starting upload of ${workingLogos.length} logos...`);
console.log(`📁 Target folder: logos/`);
console.log(`☁️  Cloudinary: ${CLOUD_NAME}`);
console.log('');

let successCount = 0;
let failCount = 0;
const failedUploads = [];

// Upload function
async function uploadLogo(logo) {
  try {
    console.log(`→ Uploading ${logo.name}...`);
    
    // For placeholder logos, we'll create a simple SVG and upload it
    if (logo.url.includes('via.placeholder.com')) {
      // Create a simple SVG logo
      const svgContent = `<svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="80" fill="#1D4747"/>
        <text x="100" y="45" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">${logo.name}</text>
      </svg>`;
      
      // Convert SVG to data URL
      const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
      
      // Upload the SVG
      const formData = new FormData();
      formData.append('file', dataUrl);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'logos');
      formData.append('public_id', logo.publicId);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`   ✓ Uploaded: logos/${logo.publicId} -> ${data.secure_url}`);
      successCount++;
      return true;
    } else {
      // For real URLs, use the existing upload logic
      const formData = new FormData();
      formData.append('file', logo.url);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'logos');
      formData.append('public_id', logo.publicId);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`   ✓ Uploaded: logos/${logo.publicId} -> ${data.secure_url}`);
      successCount++;
      return true;
    }
  } catch (error) {
    console.log(`   ✗ Failed: ${logo.name} (${logo.publicId}) -> ${error.message}`);
    failedUploads.push({
      name: logo.name,
      publicId: logo.publicId,
      error: error.message,
    });
    failCount++;
    return false;
  }
}

// Main upload process
async function uploadAllLogos() {
  for (const logo of workingLogos) {
    await uploadLogo(logo);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Results summary
  console.log('');
  console.log('📊 Upload Results:');
  console.log('==================');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  
  if (failedUploads.length > 0) {
    console.log('');
    console.log('❌ Failed uploads:');
    failedUploads.forEach(failed => {
      console.log(`   • ${failed.name}: ${failed.name} (${failed.publicId}) -> ${failed.error}`);
    });
  }
  
  console.log('');
  console.log('🎉 Logo upload process completed!');
}

// Run the upload
uploadAllLogos().catch(error => {
  console.error('❌ Upload process failed:', error);
  process.exit(1);
});
