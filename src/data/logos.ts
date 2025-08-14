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
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Eurostar_logo_%282023%29.svg',
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
  {
    name: 'RTM',
    publicId: 'rtm',
    url: 'https://cdn.worldvectorlogo.com/logos/rtm.svg',
    category: 'train',
    altText: 'RTM logo'
  },
  {
    name: 'Trainline',
    publicId: 'trainline',
    url: 'https://cdn.brandfetch.io/id1gWQQuEf/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1751343327857',
    category: 'train',
    altText: 'Trainline logo'
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
    url: 'https://www.supremeski.com/img/resorts/1707473959-icon-courchevel.svg',
    category: 'resort',
    altText: 'Courchevel ski resort logo'
  },
  {
    name: 'Méribel',
    publicId: 'meribel',
    url: 'https://www.supremeski.com/img/resorts/1708014593-logo_colored.svg',
    category: 'resort',
    altText: 'Méribel ski resort logo'
  },
  {
    name: 'Les Menuires',
    publicId: 'menuires',
    url: 'https://www.supremeski.com/img/resorts/1750693699-Les_menuires.svg',
    category: 'resort',
    altText: 'Les Menuires ski resort logo'
  },
  {
    name: 'Saint Martin de Belleville',
    publicId: 'stmartin',
    url: 'https://www.supremeski.com/img/resorts/1708086040-logo.svg',
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
  {
    name: 'AMS',
    publicId: 'ams',
    url: 'https://cdn.worldvectorlogo.com/logos/ams.svg',
    category: 'accommodation',
    altText: 'AMS Rentals logo'
  },
  {
    name: 'Alpine Answers',
    publicId: 'alpine-answers',
    url: 'https://www.alpineanswers.co.uk/assets/AlpineAnswers-Logo-ff65e52b3a375eda75de9546f55a3fcbe189aa47b379eb89c67effb5aacc87ce.svg',
    category: 'accommodation',
    altText: 'Alpine Answers logo'
  },
  {
    name: 'Ski Basics',
    publicId: 'ski-basics',
    url: 'https://www.skibasics.com/images/logo-2023.svg',
    category: 'accommodation',
    altText: 'Ski Basics logo'
  },
  {
    name: 'Elegant Resorts',
    publicId: 'elegant-resorts',
    url: 'https://www.elegantresorts.co.uk/images/headerImages/er-logo.svg',
    category: 'accommodation',
    altText: 'Elegant Resorts logo'
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
    url: 'https://cdn.worldvectorlogo.com/logos/newgen.svg',
    category: 'ski-school',
    altText: 'New Generation Ski School logo'
  },
  {
    name: 'Supreme Ski',
    publicId: 'supreme',
    url: 'https://www.supremeski.com/img/home/logo-supreme-blue.svg',
    category: 'ski-school',
    altText: 'Supreme Ski & Snowboard School logo'
  },
  
  // Wellness
  {
    name: 'Ski-Physio',
    publicId: 'ski-physio',
    url: 'https://www.ski-physio.com/assets/images/ski-physio-logo-full-white.svg',
    category: 'wellness',
    altText: 'Ski-Physio logo'
  },
  
  // Weather
  {
    name: 'Snow Forecast',
    publicId: 'snow-forecast',
    url: 'https://www.snow-forecast.com/favicon.svg',
    category: 'weather',
    altText: 'Snow Forecast logo'
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
