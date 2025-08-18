// aet-ski/scripts/upload-remaining-logos.mjs
// Upload the final 2 remaining placeholder logos to Cloudinary

/* eslint-disable no-console */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'aet-ski';
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'aet-ski-preset';

// Final logos to upload
const remainingLogos = [
  {
    name: 'Courchevel Chalets',
    publicId: 'courchevel-chalets',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Courchevel+Chalets',
  },
  {
    name: 'Meribel Chalets',
    publicId: 'meribel-chalets',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Meribel+Chalets',
  },
];

console.log(`🚀 Starting upload of ${remainingLogos.length} remaining logos...`);
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
  for (const logo of remainingLogos) {
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
