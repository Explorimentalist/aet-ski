// aet-ski/scripts/upload-new-logos.mjs
// Upload new logos to Cloudinary "logos" folder using unsigned preset

/* eslint-disable no-console */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'aet-ski';
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'aet-ski-preset';

// New logos to upload with better sources
const newLogos = [
  // Airlines
  {
    name: 'Flybe',
    publicId: 'flybe',
    url: 'https://www.logo.wine/a/logo/Flybe/Flybe-Logo.wine.svg',
  },
  {
    name: 'Aer Lingus',
    publicId: 'aer-lingus',
    url: 'https://www.logo.wine/a/logo/Aer_Lingus/Aer_Lingus-Logo.wine.svg',
  },
  {
    name: 'Etihad',
    publicId: 'etihad',
    url: 'https://www.logo.wine/a/logo/Etihad_Airways/Etihad_Airways-Logo.wine.svg',
  },

  // Trains
  {
    name: 'Rail Europe',
    publicId: 'rail-europe',
    url: 'https://www.logo.wine/a/logo/Rail_Europe/Rail_Europe-Logo.wine.svg',
  },

  // Chalet Accommodation
  {
    name: 'Meriski',
    publicId: 'meriski',
    url: 'https://www.logo.wine/a/logo/Meriski/Meriski-Logo.wine.svg',
  },
  {
    name: 'Ski Cuisine',
    publicId: 'ski-cuisine',
    url: 'https://www.logo.wine/a/logo/Ski_Cuisine/Ski_Cuisine-Logo.wine.svg',
  },
  {
    name: 'com-ski.com',
    publicId: 'com-ski',
    url: 'https://www.logo.wine/a/logo/Com_Ski/Com_Ski-Logo.wine.svg',
  },
  {
    name: 'Ski Blanc',
    publicId: 'ski-blanc',
    url: 'https://www.logo.wine/a/logo/Ski_Blanc/Ski_Blanc-Logo.wine.svg',
  },
  {
    name: 'Delicious Mountain',
    publicId: 'delicious-mountain',
    url: 'https://www.logo.wine/a/logo/Delicious_Mountain/Delicious_Mountain-Logo.wine.svg',
  },
  {
    name: 'Alpine Ethos',
    publicId: 'alpine-ethos',
    url: 'https://www.logo.wine/a/logo/Alpine_Ethos/Alpine_Ethos-Logo.wine.svg',
  },
  {
    name: 'Skivo',
    publicId: 'skivo',
    url: 'https://www.logo.wine/a/logo/Skivo/Skivo-Logo.wine.svg',
  },
  {
    name: 'Firefly',
    publicId: 'firefly',
    url: 'https://www.logo.wine/a/logo/Firefly/Firefly-Logo.wine.svg',
  },
  {
    name: 'Alpine Independence',
    publicId: 'alpine-independence',
    url: 'https://www.logo.wine/a/logo/Alpine_Independence/Alpine_Independence-Logo.wine.svg',
  },

  // Self-Catered Accommodation
  {
    name: 'Ski Lettings',
    publicId: 'ski-lettings',
    url: 'https://www.logo.wine/a/logo/Ski_Lettings/Ski_Lettings-Logo.wine.svg',
  },
  {
    name: 'Sno.mobi',
    publicId: 'sno-mobi',
    url: 'https://www.logo.wine/a/logo/Sno_Mobi/Sno_Mobi-Logo.wine.svg',
  },

  // Ski Schools
  {
    name: 'Snow Limits',
    publicId: 'snow-limits',
    url: 'https://www.logo.wine/a/logo/Snow_Limits/Snow_Limits-Logo.wine.svg',
  },
  {
    name: 'RTM Snowboarding',
    publicId: 'rtm-snowboarding',
    url: 'https://www.logo.wine/a/logo/RTM_Snowboarding/RTM_Snowboarding-Logo.wine.svg',
  },
  {
    name: 'Oxygene',
    publicId: 'oxygene',
    url: 'https://www.logo.wine/a/logo/Oxygene/Oxygene-Logo.wine.svg',
  },
  {
    name: 'Momentum',
    publicId: 'momentum',
    url: 'https://www.logo.wine/a/logo/Momentum/Momentum-Logo.wine.svg',
  },
  {
    name: 'Marmalade',
    publicId: 'marmalade',
    url: 'https://www.logo.wine/a/logo/Marmalade/Marmalade-Logo.wine.svg',
  },

  // Ski Hire
  {
    name: 'Freeride France',
    publicId: 'freeride-france',
    url: 'https://www.logo.wine/a/logo/Freeride_France/Freeride_France-Logo.wine.svg',
  },
  {
    name: 'Slide Candy',
    publicId: 'slide-candy',
    url: 'https://www.logo.wine/a/logo/Slide_Candy/Slide_Candy-Logo.wine.svg',
  },

  // Information Websites
  {
    name: 'Meribel Unplugged',
    publicId: 'meribel-unplugged',
    url: 'https://www.logo.wine/a/logo/Meribel_Unplugged/Meribel_Unplugged-Logo.wine.svg',
  },
  {
    name: 'Thesnowco',
    publicId: 'thesnowco',
    url: 'https://www.logo.wine/a/logo/Thesnowco/Thesnowco-Logo.wine.svg',
  },
  {
    name: 'Merinet',
    publicId: 'merinet',
    url: 'https://www.logo.wine/a/logo/Merinet/Merinet-Logo.wine.svg',
  },
  {
    name: 'Welove2ski',
    publicId: 'welove2ski',
    url: 'https://www.logo.wine/a/logo/Welove2ski/Welove2ski-Logo.wine.svg',
  },
  {
    name: 'Courchnet',
    publicId: 'courchnet',
    url: 'https://www.logo.wine/a/logo/Courchnet/Courchnet-Logo.wine.svg',
  },
  {
    name: 'Snowheads',
    publicId: 'snowheads',
    url: 'https://www.logo.wine/a/logo/Snowheads/Snowheads-Logo.wine.svg',
  },
  {
    name: 'Natives.co.uk',
    publicId: 'natives',
    url: 'https://www.logo.wine/a/logo/Natives/Natives-Logo.wine.svg',
  },
  {
    name: 'Unplugged Courchevel',
    publicId: 'unplugged-courchevel',
    url: 'https://www.logo.wine/a/logo/Unplugged_Courchevel/Unplugged_Courchevel-Logo.wine.svg',
  },

  // Self-Catering Services
  {
    name: 'Extreme Cuisine',
    publicId: 'extreme-cuisine',
    url: 'https://www.logo.wine/a/logo/Extreme_Cuisine/Extreme_Cuisine-Logo.wine.svg',
  },
];

async function uploadLogo({ name, publicId, url }) {
  const formData = new FormData();
  formData.append('file', url);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'logos');
  formData.append('public_id', publicId);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const response = await fetch(endpoint, { method: 'POST', body: formData });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || response.statusText;
    throw new Error(`${name} (${publicId}) -> ${message}`);
  }

  return {
    name,
    publicId: data.public_id,
    secureUrl: data.secure_url,
    format: data.format,
    width: data.width,
    height: data.height,
  };
}

async function main() {
  console.log(`🚀 Starting upload of ${newLogos.length} new logos...`);
  console.log(`📁 Target folder: logos/`);
  console.log(`☁️  Cloudinary: ${CLOUD_NAME}`);
  console.log('');

  const results = [];
  for (const logo of newLogos) {
    try {
      console.log(`→ Uploading ${logo.name}...`);
      const res = await uploadLogo(logo);
      console.log(`   ✓ Uploaded: ${res.publicId} -> ${res.secureUrl}`);
      results.push({ success: true, ...res });
    } catch (err) {
      console.error(`   ✗ Failed: ${err.message}`);
      results.push({ success: false, name: logo.name, publicId: logo.publicId, error: err.message });
    }
  }

  const ok = results.filter(r => r.success).length;
  const fail = results.length - ok;
  
  console.log('');
  console.log('📊 Upload Results:');
  console.log('==================');
  console.log(`✅ Successful: ${ok}`);
  console.log(`❌ Failed: ${fail}`);
  
  if (fail > 0) {
    console.log('\n❌ Failed uploads:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`   • ${result.name}: ${result.error}`);
    });
  }
  
  console.log('\n🎉 Logo upload process completed!');
  
  if (fail > 0) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error('💥 Unexpected error:', e);
  process.exit(1);
});
