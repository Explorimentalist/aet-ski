// src/utils/uploadLogos.ts
// Utility to upload all logos to Cloudinary

import { batchUploadLogos } from '@/lib/cloudinary';
import { getLogosForUpload } from '@/data/logos';

/**
 * Upload all logos to Cloudinary
 * Run this function once to populate your Cloudinary logos folder
 * 
 * Usage:
 * - In a temporary page or script
 * - Call uploadAllLogos() and check console for results
 */
export async function uploadAllLogos() {
  console.log('🚀 Starting logo upload process...');
  
  const logosToUpload = getLogosForUpload();
  console.log(`📋 Found ${logosToUpload.length} logos to upload`);
  
  const results = await batchUploadLogos(logosToUpload);
  
  console.log('\n📊 Upload Results:');
  console.log('==================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful uploads: ${successful.length}`);
  successful.forEach(result => {
    if (result.success) {
      console.log(`   ✓ ${result.name} -> ${result.publicId}`);
    }
  });
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed uploads: ${failed.length}`);
    failed.forEach(result => {
      if (!result.success) {
        console.log(`   ✗ ${result.name}: ${result.error}`);
      }
    });
  }
  
  console.log('\n🎉 Logo upload process completed!');
  return results;
}

/**
 * Upload specific logos by category
 */
export async function uploadLogosByCategory(category: string) {
  const logosToUpload = getLogosForUpload().filter(logo => {
    // This is a simple approach - you might want to import the full logo data
    // to filter by actual category
    return logo.name.toLowerCase().includes(category.toLowerCase());
  });
  
  console.log(`🚀 Uploading ${logosToUpload.length} ${category} logos...`);
  return await batchUploadLogos(logosToUpload);
}
