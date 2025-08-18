// src/data/logos.ts
// Comprehensive logo mapping for travel partners

export interface LogoData {
  name: string;
  publicId: string;
  url: string;
  category: 'airline' | 'resort' | 'train' | 'accommodation' | 'equipment' | 'weather' | 'ski-school' | 'wellness' | 'resort-info' | 'grocery' | 'information' | 'self-catering';
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
    name: 'Flybe',
    publicId: 'flybe',
    url: 'https://www.logo.wine/a/logo/Flybe/Flybe-Logo.wine.svg',
    category: 'airline',
    altText: 'Flybe logo'
  },
  {
    name: 'Swiss Air',
    publicId: 'swiss-air',
    url: 'https://www.logo.wine/a/logo/Swiss_International_Air_Lines/Swiss_International_Air_Lines-Logo.wine.svg',
    category: 'airline',
    altText: 'Swiss International Air Lines logo'
  },
  {
    name: 'Aer Lingus',
    publicId: 'aer-lingus',
    url: 'https://www.logo.wine/a/logo/Aer_Lingus/Aer_Lingus-Logo.wine.svg',
    category: 'airline',
    altText: 'Aer Lingus logo'
  },
  {
    name: 'KLM',
    publicId: 'klm',
    url: 'https://www.logo.wine/a/logo/KLM/KLM-Logo.wine.svg',
    category: 'airline',
    altText: 'KLM Royal Dutch Airlines logo'
  },
  {
    name: 'Etihad',
    publicId: 'etihad',
    url: 'https://www.logo.wine/a/logo/Etihad_Airways/Etihad_Airways-Logo.wine.svg',
    category: 'airline',
    altText: 'Etihad Airways logo'
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
  {
    name: 'Rail Europe',
    publicId: 'rail-europe',
    url: 'https://assets.statics.raileurope.com/assets/logos/raileurope-1f1619bc542e53ec7a719e672bdf32495a0ffcd4694063889c0d8fe5aebbbf37.svg',
    category: 'train',
    altText: 'Rail Europe logo'
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
  {
    name: 'Oxford Ski',
    publicId: 'oxford-ski',
    url: 'https://www.oxfordski.com/images/oxford-ski-logo.svg',
    category: 'accommodation',
    altText: 'Oxford Ski Company logo'
  },
  {
    name: 'Meriski',
    publicId: 'meriski',
    url: 'https://www.meriski.com/images/meriski-logo.svg',
    category: 'accommodation',
    altText: 'Meriski logo'
  },
  {
    name: 'Alpine Escape',
    publicId: 'alpine-escape',
    url: 'https://www.alpine-escape.co.uk/images/alpine-escape-logo.svg',
    category: 'accommodation',
    altText: 'Alpine Escape logo'
  },
  {
    name: 'Fish and Pips',
    publicId: 'fish-and-pips',
    url: 'https://www.fandptravel.com/images/fish-and-pips-logo.svg',
    category: 'accommodation',
    altText: 'Fish & Pips logo'
  },
  {
    name: 'Ski Cuisine',
    publicId: 'ski-cuisine',
    url: 'https://www.skicuisine.com/images/ski-cuisine-logo.svg',
    category: 'accommodation',
    altText: 'Ski Cuisine logo'
  },
  {
    name: 'Méribel Ski Chalet',
    publicId: 'meribel-ski-chalets',
    url: 'https://www.meribel-chalets.co.uk/images/meribel-ski-chalets-logo.svg',
    category: 'accommodation',
    altText: 'Méribel Ski Chalet logo'
  },
  {
    name: 'com-ski.com',
    publicId: 'com-ski',
    url: 'https://www.com-ski.com/images/com-ski-logo.svg',
    category: 'accommodation',
    altText: 'com-ski.com logo'
  },
  {
    name: 'Le Ski',
    publicId: 'leski',
    url: 'https://www.leski.com/images/layout/le-ski-logo-colour.svg',
    category: 'accommodation',
    altText: 'Le Ski logo'
  },
  {
    name: 'Ski Blanc',
    publicId: 'ski-blanc',
    url: 'https://www.skiblanc.co.uk/images/ski-blanc-logo.svg',
    category: 'accommodation',
    altText: 'Ski Blanc logo'
  },
  {
    name: 'Delicious Mountain',
    publicId: 'delicious-mountain',
    url: 'https://www.deliciousmountain.com/images/delicious-mountain-logo.svg',
    category: 'accommodation',
    altText: 'Delicious Mountain logo'
  },
  {
    name: 'Alpine Ethos',
    publicId: 'alpine-ethos',
    url: 'https://www.alpineethos.com/images/alpine-ethos-logo.svg',
    category: 'accommodation',
    altText: 'Alpine Ethos logo'
  },
  {
    name: 'Skivo',
    publicId: 'skivo',
    url: 'https://www.skivo.co.uk/images/skivo-logo.svg',
    category: 'accommodation',
    altText: 'Skivo logo'
  },
  {
    name: 'Firefly',
    publicId: 'firefly',
    url: 'https://www.fireflyski.com/images/firefly-logo.svg',
    category: 'accommodation',
    altText: 'Firefly logo'
  },
  {
    name: 'Alpine Independence',
    publicId: 'alpine-independence',
    url: 'https://www.alpineindependence.com/images/alpine-independence-logo.svg',
    category: 'accommodation',
    altText: 'Alpine Independence logo'
  },
  {
    name: 'Courchevel Chalets Apartments',
    publicId: 'courchevel-chalets-apartments',
    url: 'https://www.courchevelchaletrentals.com/images/courchevel-chalets-apartments-logo.svg',
    category: 'accommodation',
    altText: 'Courchevel Chalets and Apartments logo'
  },
  {
    name: 'Meribel Chalets Apartments',
    publicId: 'meribel-chalets-apartments',
    url: 'https://www.meribelchaletrentals.com/images/meribel-chalets-apartments-logo.svg',
    category: 'accommodation',
    altText: 'Meribel Chalets and Apartments logo'
  },
  {
    name: 'Ski Lettings',
    publicId: 'ski-lettings',
    url: 'https://www.skilettings.com/images/ski-lettings-logo.svg',
    category: 'accommodation',
    altText: 'Ski Lettings logo'
  },
  {
    name: 'Sno.mobi',
    publicId: 'sno-mobi',
    url: 'https://www.sno.mobi/images/sno-mobi-logo.svg',
    category: 'accommodation',
    altText: 'Sno.mobi logo'
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
  {
    name: 'Freeride France',
    publicId: 'freeride-france',
    url: 'https://www.freeridefrance.com/images/freeride-france-logo.svg',
    category: 'equipment',
    altText: 'Freeride France logo'
  },
  {
    name: 'Slide Candy',
    publicId: 'slide-candy',
    url: 'https://www.slidecandy.com/images/slide-candy-logo.svg',
    category: 'equipment',
    altText: 'Slide Candy logo'
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
  {
    name: 'Snow Limits',
    publicId: 'snow-limits',
    url: 'https://www.snowlimits.com/images/snow-limits-logo.svg',
    category: 'ski-school',
    altText: 'Snow Limits logo'
  },
  {
    name: 'RTM Snowboarding',
    publicId: 'rtm-snowboarding',
    url: 'https://www.rtmsnowboarding.com/images/rtm-snowboarding-logo.svg',
    category: 'ski-school',
    altText: 'RTM Snowboarding logo'
  },
  {
    name: 'Oxygene',
    publicId: 'oxygene',
    url: 'https://www.oxygene.ski/images/oxygene-logo.svg',
    category: 'ski-school',
    altText: 'Oxygene logo'
  },
  {
    name: 'Momentum',
    publicId: 'momentum',
    url: 'https://www.momentumski.com/images/momentum-logo.svg',
    category: 'ski-school',
    altText: 'Momentum logo'
  },
  {
    name: 'Marmalade',
    publicId: 'marmalade',
    url: 'https://www.marmaladeski.com/images/marmalade-logo.svg',
    category: 'ski-school',
    altText: 'Marmalade logo'
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
    name: 'Météo France',
    publicId: 'meteo-france',
    url: 'https://upload.wikimedia.org/wikipedia/fr/4/47/Logo_M%C3%A9t%C3%A9o_France_2016.svg',
    category: 'weather',
    altText: 'Météo France logo'
  },
  {
    name: 'Snow Forecast',
    publicId: 'snow-forecast',
    url: 'https://www.snow-forecast.com/favicon.svg',
    category: 'weather',
    altText: 'Snow Forecast logo'
  },

  // Information Websites
  {
    name: 'Meribel Unplugged',
    publicId: 'meribel-unplugged',
    url: 'https://www.meribelunplugged.com/images/meribel-unplugged-logo.svg',
    category: 'information',
    altText: 'Meribel Unplugged logo'
  },
  {
    name: 'Thesnowco',
    publicId: 'thesnowco',
    url: 'https://www.thesnowco.com/images/thesnowco-logo.svg',
    category: 'information',
    altText: 'Thesnowco logo'
  },
  {
    name: 'Merinet',
    publicId: 'merinet',
    url: 'https://www.merinet.com/images/merinet-logo.svg',
    category: 'information',
    altText: 'Merinet logo'
  },
  {
    name: 'Welove2ski',
    publicId: 'welove2ski',
    url: 'https://www.welove2ski.com/images/welove2ski-logo.svg',
    category: 'information',
    altText: 'Welove2ski logo'
  },
  {
    name: 'Courchnet',
    publicId: 'courchnet',
    url: 'https://www.courchnet.com/images/courchnet-logo.svg',
    category: 'information',
    altText: 'Courchnet logo'
  },
  {
    name: 'Snowheads',
    publicId: 'snowheads',
    url: 'https://www.snowheads.co.uk/images/snowheads-logo.svg',
    category: 'information',
    altText: 'Snowheads logo'
  },
  {
    name: 'Natives.co.uk',
    publicId: 'natives',
    url: 'https://www.natives.co.uk/images/natives-logo.svg',
    category: 'information',
    altText: 'Natives.co.uk logo'
  },
  {
    name: 'Unplugged Courchevel',
    publicId: 'unplugged-courchevel',
    url: 'https://www.unpluggedcourchevel.com/images/unplugged-courchevel-logo.svg',
    category: 'information',
    altText: 'Unplugged Courchevel logo'
  },

  // Self-Catering Services
  {
    name: 'Extreme Cuisine',
    publicId: 'extreme-cuisine',
    url: 'https://www.extremecuisine.com/images/extreme-cuisine-logo.svg',
    category: 'self-catering',
    altText: 'Extreme Cuisine logo'
  },
  {
    name: 'Sherpa Livraison',
    publicId: 'sherpa-livraison',
    url: 'https://www.sherpa-courses.com/images/sherpa-logo.svg',
    category: 'self-catering',
    altText: 'Sherpa Livraison logo'
  },
  {
    name: 'Carrefour Montagne',
    publicId: 'carrefour-montagne',
    url: 'https://www.carrefour.fr/images/carrefour-montagne-logo.svg',
    category: 'self-catering',
    altText: 'Carrefour Montagne logo'
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
