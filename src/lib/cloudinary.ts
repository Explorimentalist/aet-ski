// src/lib/cloudinary.ts
// Client-safe Cloudinary URL generation (no server-side dependencies)

// Get cloud name from environment or fallback
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'aet-ski';

// Image upload helper - client-side upload
export async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'aet-ski-preset'); // You'll need to create this in Cloudinary
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Image transformation helpers - pure client-side URL generation
export function getOptimizedImageUrl(publicId: string, options: {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
  crop?: 'scale' | 'fit' | 'fill' | 'crop';
} = {}) {
  const { 
    width, 
    height, 
    quality = 'auto', 
    format = 'auto',
    crop = 'scale'
  } = options;
  
  // Handle fallback URLs (if publicId is already a full URL)
  if (publicId.startsWith('http')) {
    return publicId;
  }
  
  let url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  
  // Add transformations for SEO-optimized delivery
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  
  // Always add format and quality for SEO performance
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);
  
  // Add additional SEO optimizations
  transformations.push('fl_progressive'); // Progressive JPEG loading
  transformations.push('fl_immutable_cache'); // Better caching
  
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`;
  }
  
  return `${url}/${publicId}`;
}

// Responsive image helper for SEO-optimized delivery
export function getResponsiveImageUrl(publicId: string, breakpoints: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
} = {}) {
  const { mobile = 400, tablet = 768, desktop = 1200 } = breakpoints;
  
  return {
    mobile: getOptimizedImageUrl(publicId, { 
      width: mobile, 
      quality: 'auto',
      format: 'auto'
    }),
    tablet: getOptimizedImageUrl(publicId, { 
      width: tablet, 
      quality: 'auto',
      format: 'auto'
    }),
    desktop: getOptimizedImageUrl(publicId, { 
      width: desktop, 
      quality: 'auto',
      format: 'auto'
    }),
  };
}

// Generate srcSet for responsive images - SEO best practice
export function generateSrcSet(publicId: string, widths: number[] = [400, 768, 1200, 1600]) {
  return widths
    .map(width => {
      const url = getOptimizedImageUrl(publicId, { 
        width, 
        quality: 'auto', 
        format: 'auto'
      });
      return `${url} ${width}w`;
    })
    .join(', ');
}

// Phase 2: Advanced format optimization with WebP/AVIF fallbacks
export function getAdvancedOptimizedUrl(publicId: string, options: {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'scale' | 'fit' | 'fill' | 'crop';
  deviceType?: 'mobile' | 'tablet' | 'desktop';
} = {}) {
  const { 
    width, 
    height, 
    quality = 'auto', 
    format = 'auto',
    crop = 'scale',
    deviceType = 'desktop'
  } = options;
  
  // Handle fallback URLs (if publicId is already a full URL)
  if (publicId.startsWith('http')) {
    return publicId;
  }
  
  let url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  
  // Add transformations for Phase 2 optimizations
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  
  // Phase 2: Device-specific quality optimization
  let optimizedQuality = quality;
  if (quality === 'auto') {
    switch (deviceType) {
      case 'mobile':
        optimizedQuality = 75; // Lower quality for mobile to save bandwidth
        break;
      case 'tablet':
        optimizedQuality = 80; // Medium quality for tablet
        break;
      case 'desktop':
        optimizedQuality = 85; // Higher quality for desktop
        break;
    }
  }
  
  // Phase 2: Advanced format optimization
  transformations.push(`f_${format}`);
  transformations.push(`q_${optimizedQuality}`);
  
  // Phase 2: Enhanced SEO optimizations
  transformations.push('g_auto'); // Auto gravity for better cropping
  transformations.push('fl_progressive'); // Progressive loading
  transformations.push('fl_immutable_cache'); // Better caching
  
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`;
  }
  
  return `${url}/${publicId}`;
}

// Phase 2: Generate responsive srcSet with format optimization
export function generateAdvancedSrcSet(publicId: string, options: {
  widths?: number[];
  formats?: ('webp' | 'avif' | 'auto')[];
  deviceTypes?: ('mobile' | 'tablet' | 'desktop')[];
} = {}) {
  const { 
    widths = [400, 768, 1200, 1600],
    formats = ['avif', 'webp', 'auto'], // AVIF first, then WebP, then fallback
    deviceTypes = ['mobile', 'tablet', 'desktop']
  } = options;
  
  const srcSets: string[] = [];
  
  // Generate srcSet for each format
  formats.forEach(format => {
    const formatSrcSet = widths
      .map((width, index) => {
        const deviceType = deviceTypes[index] || 'desktop';
        const url = getAdvancedOptimizedUrl(publicId, { 
          width, 
          quality: 'auto',
          format,
          deviceType
        });
        return `${url} ${width}w`;
      })
      .join(', ');
    
    srcSets.push(formatSrcSet);
  });
  
  return srcSets;
}

// Phase 2: Generate picture element with format fallbacks
export function generatePictureElement(publicId: string, options: {
  alt: string;
  className?: string;
  widths?: number[];
  mobileWidths?: number[];
  tabletWidths?: number[];
  desktopWidths?: number[];
  priority?: boolean;
}) {
  const {
    alt,
    className = '',
    widths = [400, 768, 1200, 1600],
    mobileWidths = [400, 800],
    tabletWidths = [800, 1200],
    desktopWidths = [1200, 1600],
    priority = false
  } = options;
  
  // Generate srcSets for different formats
  const avifSrcSet = generateAdvancedSrcSet(publicId, { 
    widths, 
    formats: ['avif'] 
  })[0];
  const webpSrcSet = generateAdvancedSrcSet(publicId, { 
    widths, 
    formats: ['webp'] 
  })[0];
  const fallbackSrcSet = generateAdvancedSrcSet(publicId, { 
    widths, 
    formats: ['auto'] 
  })[0];
  
  return {
    avifSrcSet,
    webpSrcSet,
    fallbackSrcSet,
    fallbackUrl: getAdvancedOptimizedUrl(publicId, { 
      width: 1200, 
      quality: 'auto',
      format: 'auto'
    })
  };
}

// Upload image by URL helper for external logos
export async function uploadImageByUrl(imageUrl: string, options?: { 
  folder?: string; 
  publicId?: string;
  resourceType?: 'image' | 'video' | 'raw' | 'auto';
}) {
  try {
    const formData = new FormData();
    formData.append('file', imageUrl);
    formData.append('upload_preset', 'aet-ski-preset'); // You'll need to create this in Cloudinary
    
    if (options?.folder) {
      formData.append('folder', options.folder);
    }
    
    if (options?.publicId) {
      formData.append('public_id', options.publicId);
    }

    if (options?.resourceType) {
      formData.append('resource_type', options.resourceType);
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      publicId: data.public_id,
      secureUrl: data.secure_url,
      width: data.width,
      height: data.height,
      format: data.format,
    };
  } catch (error) {
    console.error('Error uploading image by URL:', error);
    throw error;
  }
}

// Batch upload multiple images
export async function batchUploadLogos(logos: Array<{
  name: string;
  url: string;
  publicId: string;
}>) {
  const results = [];
  
  for (const logo of logos) {
    try {
      console.log(`Uploading ${logo.name}...`);
      const result = await uploadImageByUrl(logo.url, {
        folder: 'logos',
        publicId: logo.publicId,
        resourceType: 'auto'
      });
      results.push({
        name: logo.name,
        success: true,
        publicId: result.publicId,
        secureUrl: result.secureUrl,
      });
      console.log(`✓ ${logo.name} uploaded successfully`);
    } catch (error) {
      console.error(`✗ Failed to upload ${logo.name}:`, error);
      results.push({
        name: logo.name,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
  
  return results;
}

// Get logo URL from Cloudinary with optimizations for logos
export function getLogoUrl(
  publicId: string,
  options: {
    height?: number;
    width?: number;
    // include 'svg' to allow vector delivery
    format?: 'auto' | 'png' | 'webp' | 'svg';
    crop?: 'scale' | 'fit' | 'fill' | 'crop';
  } = {}
) {
  const { height, width, format = 'auto', crop = 'scale' } = options;

  // For SVG format: use direct URL but let Cloudinary handle version IDs
  if (format === 'svg') {
    // Use the optimized URL function but with format 'auto' to let Cloudinary handle it
    return getOptimizedImageUrl(`logos/${publicId}`, {
      height,
      width,
      format: 'auto', // Let Cloudinary determine the best format for SVG
      quality: 'auto',
      crop,
    });
  }

  // For all other formats: use getOptimizedImageUrl to handle version IDs automatically
  return getOptimizedImageUrl(`logos/${publicId}`, {
    height,
    width,
    format,
    quality: 'auto',
    crop,
  });
}