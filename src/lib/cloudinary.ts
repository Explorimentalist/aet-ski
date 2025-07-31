// src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image upload helper
export async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'aet-ski-preset'); // You'll need to create this in Cloudinary
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
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

// Image transformation helpers
export function getOptimizedImageUrl(publicId: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
} = {}) {
  const { width, height, quality = 80, format = 'auto' } = options;
  
  let url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  
  // Add transformations
  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`, `f_${format}`);
  
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`;
  }
  
  return `${url}/${publicId}`;
}

// Responsive image helper
export function getResponsiveImageUrl(publicId: string, breakpoints: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
} = {}) {
  const { mobile = 400, tablet = 768, desktop = 1200 } = breakpoints;
  
  return {
    mobile: getOptimizedImageUrl(publicId, { width: mobile }),
    tablet: getOptimizedImageUrl(publicId, { width: tablet }),
    desktop: getOptimizedImageUrl(publicId, { width: desktop }),
  };
} 