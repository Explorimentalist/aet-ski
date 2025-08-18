// aet-ski/scripts/upload-specific-logos.mjs
// Upload specific logos to replace existing ones in Cloudinary

/* eslint-disable no-console */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dzrn3khsd';
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'aet-ski-preset';

// Helper to package inline SVG content as a data URI string for upload
function svgDataUri(svg) {
  const b64 = Buffer.from(svg, 'utf8').toString('base64');
  return `data:image/svg+xml;base64,${b64}`;
}

// Specific logos to upload/replace
const specificLogos = [
  {
    name: 'Ski Cuisine',
    publicId: 'ski-cuisine',
    url: 'https://www.skicuisine.com/images/ski-cuisine-logo.svg',
  },
  {
    name: 'Delicious Mountain',
    publicId: 'delicious-mountain',
    url: 'https://www.deliciousmountain.com/images/delicious-mountain-logo.svg',
  },
  {
    name: 'New Generation',
    publicId: 'new-generation',
    url: 'https://cdn.worldvectorlogo.com/logos/newgen.svg',
  },
  {
    name: 'Marmalade',
    publicId: 'marmalade',
    url: 'https://www.marmaladeski.com/images/marmalade-logo.svg',
  },
  {
    name: 'Freeride France',
    publicId: 'freeride-france',
    url: 'https://www.freeridefrance.com/images/freeride-france-logo.svg',
  },
  {
    name: 'Merinet',
    publicId: 'merinet',
    url: 'https://www.merinet.com/images/merinet-logo.svg',
  },
  {
    name: 'Courchnet',
    publicId: 'courchnet',
    url: 'https://www.courchnet.com/images/courchnet-logo.svg',
  },
];

async function uploadLogo({ name, publicId, url }) {
  const formData = new FormData();
  formData.append('file', url);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'logos');
  formData.append('public_id', publicId);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const response = await fetch(endpoint, { 
    method: 'POST', 
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  });

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
  console.log(`Uploading ${specificLogos.length} specific logos to Cloudinary cloud "${CLOUD_NAME}" using preset "${UPLOAD_PRESET}"...`);
  console.log('This will replace existing logos with new versions.\n');
  
  const results = [];
  for (const logo of specificLogos) {
    try {
      console.log(`→ Uploading ${logo.name} (${logo.publicId})...`);
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
  
  if (fail > 0) {
    console.log('\nFailed uploads:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.name}: ${r.error}`);
    });
    process.exitCode = 1;
  } else {
    console.log('\nAll logos uploaded successfully!');
  }
}

main().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
