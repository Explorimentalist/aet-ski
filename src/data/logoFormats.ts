// src/data/logoFormats.ts
// Logo format mapping for Cloudinary assets
// This ensures the correct format is requested for each logo

export const logoFormats: Record<string, 'svg' | 'png' | 'auto'> = {
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
  'snowheads': 'png', // Placeholder created as PNG (converted from GIF)
  'natives': 'png', // Placeholder created as PNG
  'unplugged-courchevel': 'png', // Placeholder created as PNG
  
  // Self catering - Mixed formats (some are placeholders)
  'extreme-cuisine': 'png', // Placeholder created as PNG (converted from JPG)
};

// Helper function to get logo format with fallback
export function getLogoFormat(publicId: string): 'svg' | 'png' | 'auto' {
  return logoFormats[publicId] || 'auto';
}

// Helper function to check if logo should use SVG format
export function isSvgLogo(publicId: string): boolean {
  return logoFormats[publicId] === 'svg';
}

// Helper function to check if logo should use PNG format
export function isPngLogo(publicId: string): boolean {
  return logoFormats[publicId] === 'png';
}
