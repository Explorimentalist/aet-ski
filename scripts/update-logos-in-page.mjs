// aet-ski/scripts/update-logos-in-page.mjs
// Update placeholder logos with Cloudinary logos in the travel info page

import fs from 'fs';
import path from 'path';

const filePath = 'src/app/travel-info/page.tsx';

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Define replacements for uploaded logos
const replacements = [
  // Chalet Accommodation
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Meriski'", to: "getLogoUrl('meriski', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=com-ski'", to: "getLogoUrl('com-ski', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Blanc'", to: "getLogoUrl('ski-blanc', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Delicious+Mountain'", to: "getLogoUrl('delicious-mountain', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Alpine+Ethos'", to: "getLogoUrl('alpine-ethos', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Skivo'", to: "getLogoUrl('skivo', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Firefly'", to: "getLogoUrl('firefly', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Alpine+Independence'", to: "getLogoUrl('alpine-independence', { format: 'svg' })" },

  // Self-Catered Accommodation
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Lettings'", to: "getLogoUrl('ski-lettings', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Sno.mobi'", to: "getLogoUrl('sno-mobi', { format: 'svg' })" },

  // Ski Schools
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Snow+Limits'", to: "getLogoUrl('snow-limits', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=RTM+Snowboarding'", to: "getLogoUrl('rtm-snowboarding', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Oxygene'", to: "getLogoUrl('oxygene', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Momentum'", to: "getLogoUrl('momentum', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Marmalade'", to: "getLogoUrl('marmalade', { format: 'svg' })" },

  // Ski Hire
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Freeride+France'", to: "getLogoUrl('freeride-france', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Slide+Candy'", to: "getLogoUrl('slide-candy', { format: 'svg' })" },

  // Information Websites
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Meribel+Unplugged'", to: "getLogoUrl('meribel-unplugged', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Thesnowco'", to: "getLogoUrl('thesnowco', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Merinet'", to: "getLogoUrl('merinet', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Welove2ski'", to: "getLogoUrl('welove2ski', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Courchnet'", to: "getLogoUrl('courchnet', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Snowheads'", to: "getLogoUrl('snowheads', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Natives.co.uk'", to: "getLogoUrl('natives', { format: 'svg' })" },
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Unplugged+Courchevel'", to: "getLogoUrl('unplugged-courchevel', { format: 'svg' })" },

  // Self-Catering Services
  { from: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Extreme+Cuisine'", to: "getLogoUrl('extreme-cuisine', { format: 'svg' })" },
];

console.log('🔄 Updating logos in travel info page...');

// Apply all replacements
let updatedCount = 0;
replacements.forEach(replacement => {
  if (content.includes(replacement.from)) {
    content = content.replace(replacement.from, replacement.to);
    updatedCount++;
    console.log(`✅ Updated: ${replacement.from.split('text=')[1]?.split("'")[0] || 'Unknown'}`);
  } else {
    console.log(`⚠️  Not found: ${replacement.from.split('text=')[1]?.split("'")[0] || 'Unknown'}`);
  }
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('');
console.log(`🎉 Successfully updated ${updatedCount} logos in the travel info page!`);
console.log('📝 The page now uses Cloudinary logos for all uploaded items.');
