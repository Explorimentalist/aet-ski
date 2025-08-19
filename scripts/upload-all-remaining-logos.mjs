// scripts/upload-all-remaining-logos.mjs
// Upload all remaining logos that still have external URLs

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables
const envPath = join(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = envVars;

if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// All logos that need to be uploaded (excluding the 3 we just uploaded and the 7 that were already uploaded)
const logosToUpload = [
  // Airlines
  {
    name: 'British Airways',
    publicId: 'british-airways',
    url: 'https://www.logo.wine/a/logo/British_Airways/British_Airways-Logo.wine.svg'
  },
  {
    name: 'easyJet',
    publicId: 'easyjet',
    url: 'https://www.logo.wine/a/logo/EasyJet/EasyJet-Logo.wine.svg'
  },
  {
    name: 'Jet2',
    publicId: 'jet2',
    url: 'https://www.logo.wine/a/logo/Jet2.com/Jet2.com-Logo.wine.svg'
  },
  {
    name: 'Air France',
    publicId: 'airfrance',
    url: 'https://www.logo.wine/a/logo/Air_France/Air_France-Logo.wine.svg'
  },
  {
    name: 'Flybe',
    publicId: 'flybe',
    url: 'https://www.logo.wine/a/logo/Flybe/Flybe-Logo.wine.svg'
  },
  {
    name: 'Swiss Air',
    publicId: 'swiss-air',
    url: 'https://www.logo.wine/a/logo/Swiss_International_Air_Lines/Swiss_International_Air_Lines-Logo.wine.svg'
  },
  {
    name: 'KLM',
    publicId: 'klm',
    url: 'https://www.logo.wine/a/logo/KLM/KLM-Logo.wine.svg'
  },
  {
    name: 'Etihad',
    publicId: 'etihad',
    url: 'https://www.logo.wine/a/logo/Etihad_Airways/Etihad_Airways-Logo.wine.svg'
  },
  
  // Trains
  {
    name: 'Eurostar',
    publicId: 'eurostar',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Eurostar_logo_%282023%29.svg'
  },
  {
    name: 'TGV',
    publicId: 'tgv',
    url: 'https://www.logo.wine/a/logo/TGV/TGV-Logo.wine.svg'
  },
  {
    name: 'RTM',
    publicId: 'rtm',
    url: 'https://cdn.worldvectorlogo.com/logos/rtm.svg'
  },
  {
    name: 'Trainline',
    publicId: 'trainline',
    url: 'https://cdn.brandfetch.io/id1gWQQuEf/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1751343327857'
  },
  {
    name: 'Rail Europe',
    publicId: 'rail-europe',
    url: 'https://assets.statics.raileurope.com/assets/logos/raileurope-1f1619bc542e53ec7a719e672bdf32495a0ffcd4694063889c0d8fe5aebbbf37.svg'
  },
  
  // Resorts
  {
    name: 'Val Thorens',
    publicId: 'valthorens',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Val+Thorens'
  },
  {
    name: 'Courchevel',
    publicId: 'courchevel',
    url: 'https://www.supremeski.com/img/resorts/1707473959-icon-courchevel.svg'
  },
  {
    name: 'Méribel',
    publicId: 'meribel',
    url: 'https://www.supremeski.com/img/resorts/1708014593-logo_colored.svg'
  },
  {
    name: 'Les Menuires',
    publicId: 'menuires',
    url: 'https://www.supremeski.com/img/resorts/1750693699-Les_menuires.svg'
  },
  {
    name: 'Saint Martin de Belleville',
    publicId: 'stmartin',
    url: 'https://www.supremeski.com/img/resorts/1708086040-logo.svg'
  },
  {
    name: 'La Tania',
    publicId: 'la-tania',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=La+Tania'
  },
  
  // Accommodation
  {
    name: 'Ski Total',
    publicId: 'ski-total',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Total'
  },
  {
    name: 'AMS',
    publicId: 'ams',
    url: 'https://cdn.worldvectorlogo.com/logos/ams.svg'
  },
  {
    name: 'Ski Basics',
    publicId: 'ski-basics',
    url: 'https://www.skibasics.com/images/logo-2023.svg'
  },
  {
    name: 'Elegant Resorts',
    publicId: 'elegant-resorts',
    url: 'https://www.elegantresorts.co.uk/images/headerImages/er-logo.svg'
  },
  {
    name: 'Oxford Ski',
    publicId: 'oxford-ski',
    url: 'https://www.oxfordski.com/images/oxford-ski-logo.svg'
  },
  {
    name: 'Meriski',
    publicId: 'meriski',
    url: 'https://www.meriski.com/images/meriski-logo.svg'
  },
  {
    name: 'Alpine Escape',
    publicId: 'alpine-escape',
    url: 'https://www.alpine-escape.co.uk/images/alpine-escape-logo.svg'
  },
  {
    name: 'Fish and Pips',
    publicId: 'fish-and-pips',
    url: 'https://www.fandptravel.com/images/fish-and-pips-logo.svg'
  },
  {
    name: 'Méribel Ski Chalet',
    publicId: 'meribel-ski-chalets',
    url: 'https://www.meribel-chalets.co.uk/images/meribel-ski-chalets-logo.svg'
  },
  {
    name: 'com-ski.com',
    publicId: 'com-ski',
    url: 'https://www.com-ski.com/images/com-ski-logo.svg'
  },
  {
    name: 'Le Ski',
    publicId: 'leski',
    url: 'https://www.leski.com/images/layout/le-ski-logo-colour.svg'
  },
  {
    name: 'Ski Blanc',
    publicId: 'ski-blanc',
    url: 'https://www.skiblanc.co.uk/images/ski-blanc-logo.svg'
  },
  {
    name: 'Alpine Ethos',
    publicId: 'alpine-ethos',
    url: 'https://www.alpineethos.com/images/alpine-ethos-logo.svg'
  },
  {
    name: 'Skivo',
    publicId: 'skivo',
    url: 'https://www.skivo.co.uk/images/skivo-logo.svg'
  },
  {
    name: 'Alpine Independence',
    publicId: 'alpine-independence',
    url: 'https://www.alpineindependence.com/images/alpine-independence-logo.svg'
  },
  {
    name: 'Courchevel Chalets Apartments',
    publicId: 'courchevel-chalets-apartments',
    url: 'https://www.courchevelchaletrentals.com/images/courchevel-chalets-apartments-logo.svg'
  },
  {
    name: 'Meribel Chalets Apartments',
    publicId: 'meribel-chalets-apartments',
    url: 'https://www.meribelchaletrentals.com/images/meribel-chalets-apartments-logo.svg'
  },
  {
    name: 'Ski Lettings',
    publicId: 'ski-lettings',
    url: 'https://www.skilettings.com/images/ski-lettings-logo.svg'
  },
  {
    name: 'Sno.mobi',
    publicId: 'sno-mobi',
    url: 'https://www.sno.mobi/images/sno-mobi-logo.svg'
  },
  
  // Equipment
  {
    name: 'Ski Higher',
    publicId: 'skihigher',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=Ski+Higher'
  },
  {
    name: 'White Storm',
    publicId: 'whitestorm35',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=White+Storm'
  },
  {
    name: 'Freeride France',
    publicId: 'freeride-france',
    url: 'https://www.freeridefrance.com/images/freeride-france-logo.svg'
  },
  {
    name: 'Slide Candy',
    publicId: 'slide-candy',
    url: 'https://www.slidecandy.com/images/slide-candy-logo.svg'
  },
  
  // Ski Schools
  {
    name: 'ESF',
    publicId: 'esf',
    url: 'https://via.placeholder.com/200x80/1D4747/FFFFFF?text=ESF'
  },
  {
    name: 'Supreme Ski',
    publicId: 'supreme',
    url: 'https://www.supremeski.com/img/home/logo-supreme-blue.svg'
  },
  {
    name: 'Snow Limits',
    publicId: 'snow-limits',
    url: 'https://www.snowlimits.com/images/snow-limits-logo.svg'
  },
  {
    name: 'RTM Snowboarding',
    publicId: 'rtm-snowboarding',
    url: 'https://www.rtmsnowboarding.com/images/rtm-snowboarding-logo.svg'
  },
  {
    name: 'Oxygene',
    publicId: 'oxygene',
    url: 'https://www.oxygene.ski/images/oxygene-logo.svg'
  },
  {
    name: 'Momentum',
    publicId: 'momentum',
    url: 'https://www.momentumski.com/images/momentum-logo.svg'
  },
  
  // Wellness
  {
    name: 'Ski-Physio',
    publicId: 'ski-physio',
    url: 'https://www.ski-physio.com/assets/images/ski-physio-logo-full-white.svg'
  },
  
  // Weather
  {
    name: 'Météo France',
    publicId: 'meteo-france',
    url: 'https://upload.wikimedia.org/wikipedia/fr/4/47/Logo_M%C3%A9t%C3%A9o_France_2016.svg'
  },
  {
    name: 'Snow Forecast',
    publicId: 'snow-forecast',
    url: 'https://www.snow-forecast.com/favicon.svg'
  },
  
  // Information Websites
  {
    name: 'Meribel Unplugged',
    publicId: 'meribel-unplugged',
    url: 'https://www.meribelunplugged.com/images/meribel-unplugged-logo.svg'
  },
  {
    name: 'Thesnowco',
    publicId: 'thesnowco',
    url: 'https://www.thesnowco.com/images/thesnowco-logo.svg'
  },
  {
    name: 'Welove2ski',
    publicId: 'welove2ski',
    url: 'https://www.welove2ski.com/images/welove2ski-logo.svg'
  },
  {
    name: 'Snowheads',
    publicId: 'snowheads',
    url: 'https://www.snowheads.co.uk/images/snowheads-logo.svg'
  },
  {
    name: 'Natives.co.uk',
    publicId: 'natives',
    url: 'https://www.natives.co.uk/images/natives-logo.svg'
  },
  {
    name: 'Unplugged Courchevel',
    publicId: 'unplugged-courchevel',
    url: 'https://www.unpluggedcourchevel.com/images/unplugged-courchevel-logo.svg'
  },
  
  // Self-Catering Services
  {
    name: 'Extreme Cuisine',
    publicId: 'extreme-cuisine',
    url: 'https://www.extremecuisine.com/images/extreme-cuisine-logo.svg'
  },
  {
    name: 'Sherpa Livraison',
    publicId: 'sherpa-livraison',
    url: 'https://www.sherpa-courses.com/images/sherpa-logo.svg'
  },
  {
    name: 'Carrefour Montagne',
    publicId: 'carrefour-montagne',
    url: 'https://www.carrefour.fr/images/carrefour-montagne-logo.svg'
  }
];

async function uploadLogo(logo) {
  try {
    console.log(`Uploading ${logo.name}...`);
    
    // Create timestamp and signature for signed upload
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Create signature with only the required parameters
    const signatureParams = `public_id=logos/${logo.publicId}&timestamp=${timestamp}`;
    const signature = createHash('sha1').update(signatureParams + CLOUDINARY_API_SECRET).digest('hex');
    
    const formData = new FormData();
    formData.append('file', logo.url);
    formData.append('public_id', `logos/${logo.publicId}`);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log(`✅ ${logo.name} uploaded successfully:`, result.public_id);
    return result;
    
  } catch (error) {
    console.error(`❌ Failed to upload ${logo.name}:`, error.message);
    return null;
  }
}

async function uploadAllLogos() {
  console.log(`🚀 Starting upload of ${logosToUpload.length} remaining logos...\n`);
  
  const results = [];
  
  for (const logo of logosToUpload) {
    const result = await uploadLogo(logo);
    results.push({ logo, result });
    
    // Small delay between uploads to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Upload Summary:');
  const successful = results.filter(r => r.result).length;
  const failed = results.filter(r => !r.result).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\nFailed uploads:');
    results.filter(r => !r.result).forEach(({ logo }) => {
      console.log(`- ${logo.name} (${logo.publicId})`);
    });
  }
  
  return results;
}

uploadAllLogos().catch(console.error);

