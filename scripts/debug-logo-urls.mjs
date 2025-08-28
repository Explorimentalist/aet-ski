// aet-ski/scripts/debug-logo-urls.mjs
// Debug script to test logo URL generation

console.log('🔍 Debugging Logo URL Generation...\n');

// Test logo URLs
const testLogos = [
  'valthorens',
  'courchevel', 
  'meribel',
  'alpine-escape',
  'meribel-ski-chalets',
  'nonexistent-logo'
];

console.log('Generated Logo URLs:');
for (const logoId of testLogos) {
  // Simulate the getLogoUrl function logic
  const cloudName = 'dzrn3khsd'; // From your .env.local
  
  // SVG format
  const svgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/logos/${logoId}.svg`;
  
  // PNG format  
  const pngUrl = `https://res.cloudinary.com/${cloudName}/image/upload/logos/${logoId}.png`;
  
  // Auto format
  const autoUrl = `https://res.cloudinary.com/${cloudName}/image/upload/logos/${logoId}`;
  
  console.log(`\n${logoId}:`);
  console.log(`  SVG: ${svgUrl}`);
  console.log(`  PNG: ${pngUrl}`);
  console.log(`  Auto: ${autoUrl}`);
}

console.log('\n🔍 Check these URLs in your browser to see which ones work!');
console.log('💡 If you see 404 errors, the logos may not be uploaded yet.');
console.log('💡 If you see the wrong cloud name, check your environment variables.');
console.log('\n📝 To test a specific URL, copy and paste it into your browser.');
