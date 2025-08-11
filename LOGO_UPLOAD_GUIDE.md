# Logo Upload Guide

## Overview
This guide explains how to upload and manage logos for the AET Ski Transfer website using Cloudinary.

## Setup Requirements

### 1. Cloudinary Configuration
Before uploading logos, ensure you have:

1. **Cloudinary Account**: Set up at [cloudinary.com](https://cloudinary.com)
2. **Upload Preset**: Create an upload preset named `aet-ski-preset` in your Cloudinary dashboard
   - Go to Settings → Upload → Upload presets
   - Click "Add upload preset"
   - Name: `aet-ski-preset`
   - Signing Mode: Unsigned
   - Folder: `logos` (optional, can be set per upload)

3. **Environment Variables**: Add to your `.env.local`:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   ```

### 2. Upload Process

#### Option A: Using the Admin Interface
1. Navigate to `/admin/upload-logos` in your development environment
2. Click "Show Logo Preview" to see all logos that will be uploaded
3. Click "Upload All Logos" to start the batch upload process
4. Monitor the console for detailed upload progress
5. Check the results section for successful/failed uploads

#### Option B: Programmatic Upload
```typescript
import { uploadAllLogos } from '@/utils/uploadLogos';

// Upload all logos
const results = await uploadAllLogos();

// Upload by category
import { uploadLogosByCategory } from '@/utils/uploadLogos';
const airlineResults = await uploadLogosByCategory('airline');
```

## Logo Management

### Available Logos
The system includes logos for:
- **Airlines**: British Airways, easyJet, Jet2, Air France, Swiss Air, KLM
- **Trains**: Eurostar, TGV
- **Ski Equipment**: Ski Higher, White Storm
- **Ski Schools**: ESF, New Generation
- **Resorts**: Val Thorens, Courchevel, Méribel, etc. (placeholder logos)

### Adding New Logos

1. **Add to Logo Data** (`src/data/logos.ts`):
   ```typescript
   {
     name: 'Company Name',
     publicId: 'company-slug',
     url: 'https://example.com/logo.svg',
     category: 'airline', // or appropriate category
     altText: 'Company Name logo'
   }
   ```

2. **Upload the Logo**:
   - Run the upload process again, or
   - Upload individual logos using the utilities

3. **Use in Components**:
   ```typescript
   import { getLogoUrl } from '@/lib/cloudinary';
   
   const logoUrl = getLogoUrl('company-slug', { height: 40 });
   ```

### Logo Categories
- `airline`: Flight companies
- `resort`: Ski resorts
- `train`: Railway companies
- `accommodation`: Hotels and chalets
- `equipment`: Ski/snowboard rental
- `weather`: Weather services
- `ski-school`: Instruction services
- `wellness`: Spa and medical services
- `resort-info`: Resort information services
- `grocery`: Food and supplies

## Usage in Components

### Travel Info Page
Logos are automatically integrated into the travel info page using:
```typescript
// Airlines section
logo: getLogoUrl('british-airways', { height: 40 })

// Trains section  
logo: getLogoUrl('eurostar', { height: 40 })
```

### Custom Usage
```typescript
import { getLogoUrl } from '@/lib/cloudinary';

// Basic usage
const basicLogo = getLogoUrl('company-slug');

// With dimensions
const resizedLogo = getLogoUrl('company-slug', { 
  height: 40,
  width: 120 
});

// With format optimization
const optimizedLogo = getLogoUrl('company-slug', { 
  height: 40,
  format: 'webp' 
});
```

## File Structure
```
src/
├── lib/cloudinary.ts          # Cloudinary utilities
├── data/logos.ts              # Logo mappings and data
├── utils/uploadLogos.ts       # Upload utilities
└── app/
    └── admin/
        └── upload-logos/      # Admin upload interface
            └── page.tsx
```

## Best Practices

1. **SVG Preference**: Use SVG logos when available for scalability
2. **Consistent Naming**: Use kebab-case for publicId values
3. **Appropriate Sizing**: Set height to 40px for list items, adjust as needed
4. **Alt Text**: Always provide meaningful alt text for accessibility
5. **Categories**: Properly categorize logos for better organization

## Troubleshooting

### Upload Failures
- Check Cloudinary upload preset configuration
- Verify environment variables are set correctly
- Ensure the logo URL is accessible
- Check browser console for detailed error messages

### Missing Logos
- Verify the publicId matches the uploaded asset
- Check Cloudinary dashboard to confirm upload success
- Ensure the logo is in the correct folder (`logos/`)

### Performance
- Use appropriate sizing to avoid loading oversized images
- Consider using WebP format for better compression
- Implement lazy loading for logo-heavy pages

## Security Notes

1. **Remove Admin Page**: Delete `/admin/upload-logos` before production deployment
2. **Upload Preset**: Keep your upload preset unsigned for client-side uploads
3. **Rate Limiting**: Be mindful of Cloudinary rate limits during batch uploads

## Production Deployment

Before deploying to production:
1. Upload all required logos using the admin interface
2. Remove the admin upload page
3. Test all logo URLs in the production environment
4. Set up monitoring for failed logo loads
