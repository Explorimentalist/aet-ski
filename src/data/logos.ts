// src/data/logos.ts
// Comprehensive logo mapping for travel partners

export interface LogoData {
  name: string;
  publicId: string;
  url: string;
  category: 'airline' | 'resort' | 'train' | 'accommodation' | 'equipment' | 'weather' | 'ski-school' | 'wellness' | 'resort-info' | 'grocery';
  altText: string;
}

export const logoMappings: LogoData[] = [
  // Airlines
  {
    name: 'British Airways',
    publicId: 'british-airways',
    url: 'https://www.logo.wine/a/logo/British_Airways/British_Airways-Logo.wine.svg',
    category: 'airline',
    altText: 'British Airways logo'
  },
  {
    name: 'easyJet',
    publicId: 'easyjet',
    url: 'https://www.logo.wine/a/logo/EasyJet/EasyJet-Logo.wine.svg',
    category: 'airline',
    altText: 'easyJet logo'
  },
  {
    name: 'Jet2',
    publicId: 'jet2',
    url: 'https://www.logo.wine/a/logo/Jet2.com/Jet2.com-Logo.wine.svg',
    category: 'airline',
    altText: 'Jet2.com logo'
  },
  {
    name: 'Air France',
    publicId: 'airfrance',
    url: 'https://www.logo.wine/a/logo/Air_France/Air_France-Logo.wine.svg',
    category: 'airline',
    altText: 'Air France logo'
  },
  {
    name: 'Swiss Air',
    publicId: 'swiss-air',
    url: 'https://www.logo.wine/a/logo/Swiss_International_Air_Lines/Swiss_International_Air_Lines-Logo.wine.svg',
    category: 'airline',
    altText: 'Swiss International Air Lines logo'
  },
  {
    name: 'KLM',
    publicId: 'klm',
    url: 'https://www.logo.wine/a/logo/KLM/KLM-Logo.wine.svg',
    category: 'airline',
    altText: 'KLM Royal Dutch Airlines logo'
  },

  // Trains
  {
    name: 'Eurostar',
    publicId: 'eurostar',
    url: 'https://www.logo.wine/a/logo/Eurostar/Eurostar-Logo.wine.svg',
    category: 'train',
    altText: 'Eurostar logo'
  },
  {
    name: 'TGV',
    publicId: 'tgv',
    url: 'https://www.logo.wine/a/logo/TGV/TGV-Logo.wine.svg',
    category: 'train',
    altText: 'TGV high-speed rail logo'
  },

  // Resorts (using placeholder for ski resort logos that may not be available)
  {
    name: 'Val Thorens',
    publicId: 'valthorens',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Val+Thorens',
    category: 'resort',
    altText: 'Val Thorens ski resort logo'
  },
  {
    name: 'Courchevel',
    publicId: 'courchevel',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Courchevel',
    category: 'resort',
    altText: 'Courchevel ski resort logo'
  },
  {
    name: 'Méribel',
    publicId: 'meribel',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Méribel',
    category: 'resort',
    altText: 'Méribel ski resort logo'
  },
  {
    name: 'Les Menuires',
    publicId: 'menuires',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Les+Menuires',
    category: 'resort',
    altText: 'Les Menuires ski resort logo'
  },
  {
    name: 'Saint Martin de Belleville',
    publicId: 'stmartin',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=St+Martin',
    category: 'resort',
    altText: 'Saint Martin de Belleville logo'
  },
  {
    name: 'La Tania',
    publicId: 'la-tania',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=La+Tania',
    category: 'resort',
    altText: 'La Tania ski resort logo'
  },

  // Accommodation
  {
    name: 'Ski Total',
    publicId: 'ski-total',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Total',
    category: 'accommodation',
    altText: 'Ski Total logo'
  },

  // Equipment
  {
    name: 'Ski Higher',
    publicId: 'skihigher',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Higher',
    category: 'equipment',
    altText: 'Ski Higher equipment rental logo'
  },
  {
    name: 'White Storm',
    publicId: 'whitestorm35',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=White+Storm',
    category: 'equipment',
    altText: 'White Storm equipment rental logo'
  },

  // Ski Schools
  {
    name: 'ESF',
    publicId: 'esf',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=ESF',
    category: 'ski-school',
    altText: 'École du Ski Français logo'
  },
  {
    name: 'New Generation',
    publicId: 'newgen',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=New+Generation',
    category: 'ski-school',
    altText: 'New Generation Ski School logo'
  },
];

// Helper function to get logos by category
export function getLogosByCategory(category: LogoData['category']): LogoData[] {
  return logoMappings.filter(logo => logo.category === category);
}

// Helper function to find logo by public ID
export function getLogoByPublicId(publicId: string): LogoData | undefined {
  return logoMappings.find(logo => logo.publicId === publicId);
}

// Available logos for upload
export function getLogosForUpload(): Array<{ name: string; url: string; publicId: string }> {
  return logoMappings.map(logo => ({
    name: logo.name,
    url: logo.url,
    publicId: logo.publicId
  }));
}
