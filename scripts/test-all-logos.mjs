// aet-ski/scripts/test-all-logos.mjs
// Test all logos systematically to create an inventory

console.log('🔍 Testing All Logos in Cloudinary...\n');

// All logos from our format mapping
const allLogos = [
  // Resorts
  'valthorens', 'courchevel', 'meribel', 'menuires', 'stmartin',
  
  // Airlines
  'british-airways', 'easyjet', 'jet2', 'airfrance', 'flybe', 'swiss-air', 'aer-lingus', 'klm', 'etihad',
  
  // Trains
  'eurostar', 'rail-europe', 'rtm', 'trainline',
  
  // Chalet Accommodation
  'oxford-ski', 'meriski', 'alpine-escape', 'fish-and-pips', 'ski-cuisine', 'elegant-resorts', 
  'meribel-ski-chalets', 'com-ski', 'leski', 'alpine-answers', 'ski-basics', 'delicious-mountain', 
  'alpine-ethos', 'skivo', 'firefly', 'alpine-independence',
  
  // Self-catered Accommodation
  'courchevel-chalets', 'meribel-chalets', 'ams', 'ski-lettings', 'sno-mobi',
  
  // Weather
  'meteo-france', 'snow-forecast',
  
  // Ski Schools
  'esf', 'new-generation', 'supreme', 'snow-limits', 'rtm-snowboarding', 'oxygene', 'momentum', 'marmalade',
  
  // Ski Hire
  'whitestorm35', 'skihigher', 'freeride-france', 'slide-candy', 'ski-higher',
  
  // Aches and pains
  'ski-physio',
  
  // Life in resort info
  'trois-vallees-guide',
  
  // Information Websites
  'meribel-unplugged', 'thesnowco', 'merinet', 'welove2ski', 'courchnet', 'snowheads', 'natives', 'unplugged-courchevel',
  
  // Self catering
  'extreme-cuisine'
];

// Test a single logo
async function testLogo(logoId) {
  try {
    // Test SVG first
    let response = await fetch(`https://res.cloudinary.com/dzrn3khsd/image/upload/logos/${logoId}.svg`);
    if (response.ok) {
      return { logoId, format: 'svg', status: response.status, working: true };
    }
    
    // Test PNG
    response = await fetch(`https://res.cloudinary.com/dzrn3khsd/image/upload/logos/${logoId}.png`);
    if (response.ok) {
      return { logoId, format: 'png', status: response.status, working: true };
    }
    
    // Test JPG
    response = await fetch(`https://res.cloudinary.com/dzrn3khsd/image/upload/logos/${logoId}.jpg`);
    if (response.ok) {
      return { logoId, format: 'jpg', status: response.status, working: true };
    }
    
    // Test GIF
    response = await fetch(`https://res.cloudinary.com/dzrn3khsd/image/upload/logos/${logoId}.gif`);
    if (response.ok) {
      return { logoId, format: 'gif', status: response.status, working: true };
    }
    
    // Test without extension (auto)
    response = await fetch(`https://res.cloudinary.com/dzrn3khsd/image/upload/logos/${logoId}`);
    if (response.ok) {
      return { logoId, format: 'auto', status: response.status, working: true };
    }
    
    return { logoId, format: 'none', status: 404, working: false };
    
  } catch (error) {
    return { logoId, format: 'error', status: 'error', working: false, error: error.message };
  }
}

// Main function
async function testAllLogos() {
  console.log(`🧪 Testing ${allLogos.length} logos...\n`);
  
  const results = [];
  let working = 0;
  let missing = 0;
  
  for (const logoId of allLogos) {
    process.stdout.write(`Testing ${logoId}... `);
    const result = await testLogo(logoId);
    results.push(result);
    
    if (result.working) {
      console.log(`✅ ${result.format.toUpperCase()}`);
      working++;
    } else {
      console.log(`❌ Missing`);
      missing++;
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Summary
  console.log(`\n📊 Results Summary:`);
  console.log(`   ✅ Working: ${working}`);
  console.log(`   ❌ Missing: ${missing}`);
  console.log(`   📈 Success Rate: ${((working / allLogos.length) * 100).toFixed(1)}%`);
  
  // Group by format
  const byFormat = {};
  results.filter(r => r.working).forEach(r => {
    if (!byFormat[r.format]) byFormat[r.format] = [];
    byFormat[r.format].push(r.logoId);
  });
  
  console.log(`\n📁 Logos by Format:`);
  Object.entries(byFormat).forEach(([format, logos]) => {
    console.log(`   ${format.toUpperCase()}: ${logos.length} logos`);
  });
  
  // Missing logos
  const missingLogos = results.filter(r => !r.working).map(r => r.logoId);
  if (missingLogos.length > 0) {
    console.log(`\n❌ Missing Logos (${missingLogos.length}):`);
    missingLogos.forEach(logoId => {
      console.log(`   - ${logoId}`);
    });
  }
  
  // Working logos
  const workingLogos = results.filter(r => r.working).map(r => r.logoId);
  if (workingLogos.length > 0) {
    console.log(`\n✅ Working Logos (${workingLogos.length}):`);
    workingLogos.forEach(logoId => {
      const result = results.find(r => r.logoId === logoId);
      console.log(`   - ${logoId} (${result.format.toUpperCase()})`);
    });
  }
}

// Run the test
testAllLogos().catch(console.error);

