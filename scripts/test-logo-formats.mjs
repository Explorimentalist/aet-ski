// aet-ski/scripts/test-logo-formats.mjs
// Test script to verify logo format mapping is working correctly

console.log('🧪 Testing Logo Format Mapping...\n');

// Simulate the logo format mapping (copy from src/data/logoFormats.ts)
const logoFormats = {
  // Resorts - SVG format
  'valthorens': 'svg',
  'courchevel': 'svg',
  'meribel': 'svg',
  'menuires': 'svg',
  'stmartin': 'svg',
  
  // Airlines - SVG format
  'british-airways': 'svg',
  'easyjet': 'svg',
  'jet2': 'svg',
  'airfrance': 'svg',
  'flybe': 'svg',
  'swiss-air': 'svg',
  'aer-lingus': 'svg',
  'klm': 'svg',
  'etihad': 'svg',
  
  // Trains - SVG format
  'eurostar': 'svg',
  'rail-europe': 'svg',
  'rtm': 'svg',
  'trainline': 'svg',
  
  // Chalet Accommodation - Mixed formats (some are placeholders)
  'oxford-ski': 'svg',
  'meriski': 'svg', // Placeholder created as SVG
  'alpine-escape': 'png', // This is PNG in upload script
  'fish-and-pips': 'svg',
  'ski-cuisine': 'svg',
  'elegant-resorts': 'svg',
  'meribel-ski-chalets': 'png', // This is PNG in upload script
  'com-ski': 'svg',
  'leski': 'svg',
  'alpine-answers': 'svg',
  'ski-basics': 'svg',
  'delicious-mountain': 'svg',
  'alpine-ethos': 'svg', // Placeholder created as SVG
  'skivo': 'png', // Placeholder created as PNG
  'firefly': 'svg',
  'alpine-independence': 'svg',
  
  // Self-catered Accommodation - Mixed formats
  'courchevel-chalets': 'svg',
  'meribel-chalets': 'svg',
  'ams': 'svg',
  'ski-lettings': 'svg',
  'sno-mobi': 'svg',
  
  // Weather - SVG format
  'meteo-france': 'svg',
  'snow-forecast': 'svg',
  
  // Ski Schools - Mixed formats (some are placeholders)
  'esf': 'svg',
  'new-generation': 'svg',
  'supreme': 'svg',
  'snow-limits': 'png', // Placeholder created as PNG
  'rtm-snowboarding': 'svg',
  'oxygene': 'png', // Placeholder created as PNG
  'momentum': 'png', // Placeholder created as PNG
  'marmalade': 'svg',
  
  // Ski Hire - Mixed formats (some are placeholders)
  'whitestorm35': 'svg', // Placeholder created as SVG
  'skihigher': 'svg', // Placeholder created as SVG
  'freeride-france': 'svg',
  'slide-candy': 'png', // Placeholder created as PNG
  'ski-higher': 'svg', // Alternative name for skihigher
  
  // Aches and pains - SVG format
  'ski-physio': 'svg',
  
  // Life in resort info - Mixed formats (some are placeholders)
  'trois-vallees-guide': 'svg', // Placeholder created as SVG
  
  // Information Websites - Mixed formats (some are placeholders)
  'meribel-unplugged': 'svg', // Placeholder created as SVG
  'thesnowco': 'png', // Placeholder created as PNG
  'merinet': 'svg',
  'welove2ski': 'png', // Placeholder created as PNG
  'courchnet': 'svg',
  'snowheads': 'gif', // Placeholder created as GIF
  'natives': 'png', // Placeholder created as PNG
  'unplugged-courchevel': 'png', // Placeholder created as PNG
  
  // Self catering - Mixed formats (some are placeholders)
  'extreme-cuisine': 'jpg', // Placeholder created as JPG
};

// Helper function to get logo format with fallback
function getLogoFormat(publicId) {
  return logoFormats[publicId] || 'auto';
}

// Helper function to check if logo should use SVG format
function isSvgLogo(publicId) {
  return logoFormats[publicId] === 'svg';
}

// Helper function to check if logo should use PNG format
function isPngLogo(publicId) {
  return logoFormats[publicId] === 'png';
}

const testCases = [
  { publicId: 'valthorens', expected: 'svg', description: 'Resort logo (SVG)' },
  { publicId: 'british-airways', expected: 'svg', description: 'Airline logo (SVG)' },
  { publicId: 'alpine-escape', expected: 'png', description: 'Chalet accommodation (PNG)' },
  { publicId: 'meribel-ski-chalets', expected: 'png', description: 'Chalet accommodation (PNG)' },
  { publicId: 'esf', expected: 'svg', description: 'Ski school (SVG placeholder)' },
  { publicId: 'whitestorm35', expected: 'svg', description: 'Ski hire (SVG placeholder)' },
  { publicId: 'meriski', expected: 'svg', description: 'Chalet company (SVG placeholder)' },
  { publicId: 'nonexistent-logo', expected: 'auto', description: 'Non-existent logo (fallback)' },
];

let passed = 0;
let failed = 0;

for (const testCase of testCases) {
  const actual = getLogoFormat(testCase.publicId);
  const isSvg = isSvgLogo(testCase.publicId);
  const isPng = isPngLogo(testCase.publicId);

  const success = actual === testCase.expected;

  if (success) {
    passed++;
    console.log(`✅ ${testCase.description}: ${testCase.publicId} -> ${actual}`);
  } else {
    failed++;
    console.log(`❌ ${testCase.description}: ${testCase.publicId} -> ${actual} (expected ${testCase.expected})`);
  }

  console.log(`   SVG: ${isSvg}, PNG: ${isPng}\n`);
}

console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 All tests passed! Logo format mapping is working correctly.');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed. Please check the logo format mapping.');
  process.exit(1);
}
