# Favicon Implementation for AET

This document outlines the favicon implementation process for the AET website.

## Overview

The website uses a custom SVG favicon that matches the AET branding. The implementation supports both modern SVG favicons and traditional ICO format for maximum browser compatibility.

## Implementation Files

- **SVG Favicon**: Located in `public/icon.svg` and `src/app/icon.svg`
- **ICO Favicon**: Located in `public/favicon.ico` and `src/app/favicon.ico`
- **Generation Script**: Located in `scripts/generate-favicon.js`

## How It Works

1. **Next.js Metadata Configuration**:
   - The `src/app/layout.tsx` file includes metadata configuration for favicons
   - The configuration specifies both SVG and ICO formats, with SVG as the preferred format

2. **Favicon Generation**:
   - The SVG favicon is directly created from the design specification
   - The ICO format is generated from the SVG using Sharp for image processing
   - Temporary PNG files are used during conversion and then cleaned up

## How to Update the Favicon

To update the favicon, you have two options:

### Option 1: Edit the SVG directly

1. Modify the SVG content in `scripts/generate-favicon.js` (look for the `svgContent` variable)
2. Run `npm run favicon` to regenerate all favicon files
3. Verify the changes with `npm run dev`

### Option 2: Replace with a new SVG

1. Create a new SVG file with your design
2. Copy the SVG content into the `svgContent` variable in `scripts/generate-favicon.js`
3. Run `npm run favicon` to regenerate all favicon files
4. Verify the changes with `npm run dev`

## Technical Details

### Favicon Format Support

- **SVG**: Supported in modern browsers (Chrome, Firefox, Edge, Safari)
- **ICO**: Supported in all browsers including older versions of Internet Explorer

### Generation Process

The generation script performs the following steps:

1. Creates SVG files in both `public/` and `src/app/` directories
2. Converts the SVG to PNG in multiple sizes (16x16, 32x32, 48x48, 64x64)
3. Creates ICO files from the 32x32 PNG and places them in both directories
4. Cleans up temporary PNG files

### Metadata Configuration

The favicon configuration in `layout.tsx` specifies both formats with appropriate MIME types:

```tsx
icons: {
  icon: [
    { url: '/icon.svg', type: 'image/svg+xml' },
    { url: '/favicon.ico' }
  ],
  apple: '/apple-touch-icon.png',
},
```

This configuration ensures that browsers will use the best format they support.

## Troubleshooting

If favicon changes don't appear immediately:

1. Clear your browser cache
2. Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)
3. Check the browser's network tab to ensure the favicon files are being loaded

## Dependencies

- `sharp`: Used for image processing and conversion
- The script requires Node.js to run

