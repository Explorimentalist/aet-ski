// aet-ski/scripts/upload-cloudinary-logos.mjs
// Upload specific SVG logos to Cloudinary "logos" folder using unsigned preset

/* eslint-disable no-console */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'aet-ski';
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'aet-ski-preset';

// Helper to package inline SVG content as a data URI string for upload
function svgDataUri(svg) {
  const b64 = Buffer.from(svg, 'utf8').toString('base64');
  return `data:image/svg+xml;base64,${b64}`;
}

// Provided inline SVGs that should be uploaded as files
const TRAINLINE_PACKAGED_SVG = `<svg width="824px" height="142px" viewBox="0 0 824 142" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><image id="Trainline_Logo_2019_CMYK_Mint" x="-70" y="-71" width="964" height="284" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8QAAAEcCAYAAAABXn2cAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAADxKADAAQAAAABAAABHAAAAABT7IKaAABAAElEQVR4A...SNIP...QmCC"></image></g></svg>`;

const VALTHORENS_SVG = `<svg width="341" height="91" viewBox="0 0 341 91" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M45.3 0.799805C20.5 0.799805 0.400024 20.7998 0.400024 45.4998C0.400024 70.1998 20.5 90.1998 45.3 90.1998C70.1 90.1998 90.1 70.1998 90.1 45.4998C90.1 20.7998 70.1 0.799805 45.3 0.799805ZM45.3 85.6998C23 85.6998 4.90002 67.6998 4.90002 45.4998C4.90002 23.2998 23 5.2998 45.3 5.2998C67.6 5.2998 85.7 23.2998 85.7 45.4998C85.7 67.6998 67.6 85.6998 45.3 85.6998Z" fill="#C10024"/><path d="M327.3 62.9996C323.3 62.9996 319.8 62.4996 317.3 59.2996L320 56.9996L321.5 55.6996C321.5 55.6996 322.2 55.0996 322.8 55.5996C323.3 55.9996 323.8 56.3996 324.3 56.5996C325.7 57.2996 327.2 57.3996 328.5 57.3996C330.7 57.3996 333.1 56.6996 333.5 54.6996C333.8 53.3996 333.3 52.4996 331.3 52.2996L327.4 51.8996C322.9 51.4996 320.5 49.3996 321.5 44.5996C322.6 39.1996 327.1 36.7996 332.2 36.6996C335.7 36.5996 339.3 38.0996 340.2 39.8996C341.4 42.2996 336.7 43.8996 336.7 43.8996C336.5 43.4996 336.2 43.1996 335.9 42.8996C334.9 42.0996 333.4 41.6996 331.8 41.6996C329.3 41.6996 328 42.8996 327.7 44.1996C327.5 45.0996 327.7 46.1996 329.9 46.3996L333.8 46.7996C338.7 47.2996 340.7 49.9996 339.8 54.3996C338.6 60.1996 333.3 62.9996 327.3 62.9996ZM135.8 38.1996C139.3 31.7996 134.9 27.6996 134.9 27.6996L121.9 50.7996L121.5 38.5996C121.4 31.0996 114.1 27.6996 114.1 27.6996L116.1 63.0996H121.1C121.1 62.9996 132.2 44.5996 135.8 38.1996ZM148.3 52.0996L147.9 53.4996C147.5 55.0996 147 56.0996 146.1 56.7996C144.7 57.8996 143.5 57.9996 141.8 57.9996C139.3 57.9996 138.5 56.7996 139 54.9996C139.5 53.1996 141 52.0996 143.3 52.0996H148.3ZM151.7 62.9996L156.2 45.9996C157.8 39.8996 154.9 36.8996 147.9 36.8996C143.7 36.8996 141.1 37.6996 137.8 40.4996C137.8 40.4996 139.3 41.9996 140.9 42.4996C142.6 42.9996 143.8 42.3996 146.2 42.3996C149.5 42.3996 150.6 43.5996 149.8 46.4996L149.5 47.7996H143.5C137.6 47.7996 134 51.1996 132.9 55.2996C132.3 57.5996 132.5 59.6996 133.4 61.0996C134.5 62.5996 136.4 63.3996 139.2 63.3996C142.1 63.3996 143.9 62.6996 146.1 60.8996C146.1 60.8996 147.1 63.0996 149.8 63.0996H151.7V62.9996ZM198.7 33.7996C204.1 33.7996 206.5 27.5996 206.5 27.5996H187.5C181 27.5996 180.1 33.7996 180.1 33.7996H189.1L181.4 62.9996C181.4 62.9996 188.8 61.0996 191.3 51.0996L195.9 33.7996H198.7ZM213.5 62.9996H219.8L222.8 51.7996L224.3 46.1996C225.7 40.6996 223.9 36.7996 218.4 36.7996C216.2 36.7996 213.8 37.6996 211.6 39.4996L214.7 27.5996H208.4L199 62.9996C199 62.9996 205.4 61.9996 207.6 54.3996L209.5 47.1996C210.4 43.7996 212.8 42.5996 214.8 42.5996C216.8 42.5996 218.6 43.6996 217.7 47.1996L213.5 62.9996ZM166 54.3996L173.1 27.6996H166.8L157.4 63.0996C157.4 62.9996 163.8 61.9996 166 54.3996ZM242 43.3996C243 44.6996 242.5 46.9996 241.8 49.6996C241.1 52.3996 240.3 54.6996 238.7 55.9996C237.8 56.6996 236.7 57.0996 235.4 57.0996C234.1 57.0996 233.3 56.6996 232.8 55.9996C231.9 54.6996 232.3 52.3996 233 49.6996C233.7 46.9996 234.5 44.7996 236.1 43.3996C237 42.6996 238.1 42.2996 239.3 42.2996C240.6 42.2996 241.4 42.6996 242 43.3996ZM242.5 59.7996C245.4 57.3996 246.8 54.3996 248 49.6996C249.2 44.9996 249.4 42.0996 247.8 39.6996C246.7 37.9996 244.5 36.4996 240.8 36.4996C237.1 36.4996 234.2 37.9996 232.2 39.6996C229.3 42.0996 227.9 45.0996 226.7 49.6996C225.5 54.3996 225.3 57.2996 226.9 59.7996C228 61.4996 230.1 62.9996 233.9 62.9996C237.6 62.9996 240.5 61.4996 242.5 59.7996ZM267.8 43.7996L273.8 38.8996C272.5 37.0996 271 36.4996 268.5 36.4996C265.8 36.4996 263 37.7996 261.4 39.2996L262.1 36.7996H256L249.1 62.6996C249.1 62.6996 255.6 61.8996 257.9 53.2996L259.5 47.0996C260.4 43.7996 262.9 42.2996 264.8 42.2996C266.4 42.2996 267.1 42.7996 267.8 43.7996ZM287.1 44.4996C287.2 45.3996 287.2 46.0996 286.9 47.2996H277.3C277.7 46.1996 278 45.4996 278.6 44.4996C279.7 42.9996 281.4 41.7996 283.5 41.7996C285.8 41.7996 286.9 42.9996 287.1 44.4996ZM287.6 51.6996C291.9 51.6996 292.7 48.7996 292.7 48.7996C294.6 41.6996 292 36.3996 285 36.3996C278.5 36.3996 272.7 41.1996 270.5 49.5996C267.7 60.0996 272.7 62.8996 278.7 62.8996C283.3 62.8996 286.1 61.4996 289.4 58.7996L286.6 54.9996C284.6 56.5996 283 57.3996 280.2 57.3996C276.7 57.3996 275.3 54.9996 276.2 51.5996H287.6M309.8 53.9996C307.3 62.7996 313.8 62.5996 313.8 62.5996L318.2 46.0996C318.9 43.2996 319.1 40.7996 317.6 38.6996C316.6 37.2996 314.8 36.3996 312.2 36.3996C309.9 36.3996 307.3 37.2996 305.2 39.0996L305.8 36.6996H299.6L292.7 62.5996H299L300.1 58.5996L303.2 46.9996C304.1 43.4996 306.7 42.2996 308.7 42.2996C310.7 42.2996 312.5 43.4996 311.6 46.9996L309.8 53.9996Z" fill="#C10024"/><path d="M47.9301 74.3004L44.9345 74.2004C44.9345 74.2004 38.1445 74.4004 34.6496 65.0004L19.9712 22.9004C19.9712 22.9004 32.4528 28.2004 35.748 39.0004L47.9301 74.3004ZM66.9022 29.9004C72.5938 29.9004 75.0901 23.4004 75.0901 23.4004H55.1195C48.2296 23.4004 47.4308 29.9004 47.4308 29.9004H56.9169L48.8288 60.6004C48.8288 60.6004 56.5175 58.6004 59.2135 48.0004L64.0064 29.8004H66.9022" fill="#C10024"/></svg>`;

const logos = [
  // New logos to add
  {
    name: 'Meteo France',
    publicId: 'meteo-france',
    url: 'https://upload.wikimedia.org/wikipedia/fr/4/47/Logo_M%C3%A9t%C3%A9o_France_2016.svg',
  },
  {
    name: 'Rail Europe',
    publicId: 'rail-europe',
    url: 'https://assets.statics.raileurope.com/assets/logos/raileurope-1f1619bc542e53ec7a719e672bdf32495a0ffcd4694063889c0d8fe5aebbbf37.svg',
  },
  {
    name: 'Le Ski',
    publicId: 'leski',
    url: 'https://www.leski.com/images/layout/le-ski-logo-colour.svg',
  },
  {
    name: 'Courchevel Chalets Apartments',
    publicId: 'courchevel-chalets-apartments',
    url: 'https://www.courchevel-chalets-apartments.com/images/chalet-apartment-rentals-courchevel.svg',
  },
  {
    name: 'Meribel Chalets Apartments',
    publicId: 'meribel-chalets-apartments',
    url: 'https://www.meribel-chalets-apartments.com/images/chalet-apartment-rentals-meribel.svg',
  },
  {
    name: 'Courchevel',
    publicId: 'courchevel',
    url: 'https://www.supremeski.com/img/resorts/1707473959-icon-courchevel.svg',
  },
  {
    name: 'Les Menuires',
    publicId: 'menuires',
    url: 'https://www.supremeski.com/img/resorts/1750693699-Les_menuires.svg',
  },
  {
    name: 'Méribel',
    publicId: 'meribel',
    url: 'https://www.supremeski.com/img/resorts/1708014593-logo_colored.svg',
  },
  {
    name: 'Saint Martin de Belleville',
    publicId: 'stmartin',
    url: 'https://www.supremeski.com/img/resorts/1708086040-logo.svg',
  },
  {
    name: 'Supreme Ski',
    publicId: 'supreme',
    url: 'https://www.supremeski.com/img/home/logo-supreme-blue.svg',
  },
  {
    name: 'New Generation',
    publicId: 'newgen',
    url: 'https://cdn.worldvectorlogo.com/logos/newgen.svg',
  },
  {
    name: 'RTM',
    publicId: 'rtm',
    url: 'https://cdn.worldvectorlogo.com/logos/rtm.svg',
  },
  {
    name: 'Ski-Physio',
    publicId: 'ski-physio',
    url: 'https://www.ski-physio.com/assets/images/ski-physio-logo-full-white.svg',
  },
  {
    name: 'Eurostar',
    publicId: 'eurostar',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Eurostar_logo_%282023%29.svg',
  },
  {
    name: 'Trainline',
    publicId: 'trainline',
    url: 'https://cdn.brandfetch.io/id1gWQQuEf/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1751343327857',
  },
  // Newly requested uploads
  { name: 'Oxford Ski', publicId: 'oxford-ski', url: 'https://cdn.brandfetch.io/idJgU1N1gU/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1748075756487' },
  { name: 'Alpine Escape', publicId: 'alpine-escape', url: 'https://cdn.brandfetch.io/ideyobie4z/w/439/h/57/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1691030779135' },
  { name: 'Fish and Pips', publicId: 'fish-and-pips', url: 'https://www.fandptravel.com/wp-content/themes/fishandpips/images/F&P_logo_dark-cropped.svg' },
  { name: 'Elegant Resorts', publicId: 'elegant-resorts', url: 'https://www.elegantresorts.co.uk/holiday-styles/images/headerImages/erLogoStacked.svg' },
  { name: 'Meribel Ski Chalets', publicId: 'meribel-ski-chalets', url: 'https://images.squarespace-cdn.com/content/v1/608bde37c6be74204acbef51/1619779233726-Y9AYE3V749SM6BCE05DK/Meribel-Logo-2007.png?format=1500w' },
  { name: 'Val Thorens', publicId: 'valthorens', url: svgDataUri(VALTHORENS_SVG) },
  {
    name: 'AMS',
    publicId: 'ams',
    url: 'https://cdn.worldvectorlogo.com/logos/ams.svg',
  },
  {
    name: 'Alpine Answers',
    publicId: 'alpine-answers',
    url: 'https://www.alpineanswers.co.uk/assets/AlpineAnswers-Logo-ff65e52b3a375eda75de9546f55a3fcbe189aa47b379eb89c67effb5aacc87ce.svg',
  },
  {
    name: 'Ski Basics',
    publicId: 'ski-basics',
    url: 'https://www.skibasics.com/images/logo-2023.svg',
  },
  {
    name: 'Elegant Resorts',
    publicId: 'elegant-resorts',
    url: 'https://www.elegantresorts.co.uk/images/headerImages/er-logo.svg',
  },
  {
    name: 'Snow Forecast',
    publicId: 'snow-forecast',
    url: 'https://www.snow-forecast.com/favicon.svg',
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
  console.log(`Uploading ${logos.length} logos to Cloudinary cloud "${CLOUD_NAME}" using preset "${UPLOAD_PRESET}"...`);
  const results = [];
  for (const logo of logos) {
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
  console.log(`\nDone. Success: ${ok}, Failed: ${fail}`);
  if (fail > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(1);
});


