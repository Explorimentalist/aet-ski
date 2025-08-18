// aet-ski/scripts/replace-missing-logos.mjs
// Replace missing logo references with placeholder logos

import fs from 'fs';
import path from 'path';

const filePath = 'src/app/travel-info/page.tsx';

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Define replacements for missing logos
const replacements = [
  // Accommodation
  { from: "getLogoUrl('meriski', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Meriski'" },
  { from: "getLogoUrl('ski-cuisine', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Cuisine'" },
  { from: "getLogoUrl('com-ski', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=com-ski'" },
  { from: "getLogoUrl('ski-blanc', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Blanc'" },
  { from: "getLogoUrl('delicious-mountain', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Delicious+Mountain'" },
  { from: "getLogoUrl('alpine-ethos', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Alpine+Ethos'" },
  { from: "getLogoUrl('skivo', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Skivo'" },
  { from: "getLogoUrl('firefly', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Firefly'" },
  { from: "getLogoUrl('alpine-independence', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Alpine+Independence'" },
  { from: "getLogoUrl('ski-lettings', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Lettings'" },
  { from: "getLogoUrl('sno-mobi', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Sno.mobi'" },
  { from: "getLogoUrl('courchevel-chalets-apartments', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Courchevel+Chalets'" },
  { from: "getLogoUrl('meribel-chalets-apartments', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Meribel+Chalets'" },

  // Equipment
  { from: "getLogoUrl('freeride-france', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Freeride+France'" },
  { from: "getLogoUrl('slide-candy', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Slide+Candy'" },

  // Ski Schools
  { from: "getLogoUrl('snow-limits', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Snow+Limits'" },
  { from: "getLogoUrl('rtm-snowboarding', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=RTM+Snowboarding'" },
  { from: "getLogoUrl('oxygene', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Oxygene'" },
  { from: "getLogoUrl('momentum', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Momentum'" },
  { from: "getLogoUrl('marmalade', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Marmalade'" },

  // Information Websites
  { from: "getLogoUrl('meribel-unplugged', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Meribel+Unplugged'" },
  { from: "getLogoUrl('thesnowco', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Thesnowco'" },
  { from: "getLogoUrl('merinet', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Merinet'" },
  { from: "getLogoUrl('welove2ski', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Welove2ski'" },
  { from: "getLogoUrl('courchnet', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Courchnet'" },
  { from: "getLogoUrl('snowheads', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Snowheads'" },
  { from: "getLogoUrl('natives', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Natives.co.uk'" },
  { from: "getLogoUrl('unplugged-courchevel', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Unplugged+Courchevel'" },

  // Self-Catering Services
  { from: "getLogoUrl('extreme-cuisine', { format: 'svg' })", to: "'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Extreme+Cuisine'" },
];

// Apply all replacements
let replacementsMade = 0;
replacements.forEach(({ from, to }) => {
  if (content.includes(from)) {
    content = content.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
    replacementsMade++;
    console.log(`✓ Replaced: ${from} -> ${to}`);
  } else {
    console.log(`⚠ Not found: ${from}`);
  }
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\n🎉 Completed! Made ${replacementsMade} replacements in ${filePath}`);
console.log('📝 The travel info page now uses placeholder logos for missing items.');
console.log('🚀 You can now run the page and see all the missing items displayed.');
