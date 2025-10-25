// Get the backend base URL for images
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';

/**
 * Converts a relative image path to a full URL
 * @param imagePath - The image path from the backend (e.g., "/uploads/image.jpg")
 * @returns Full image URL (e.g., "http://localhost:5000/uploads/image.jpg")
 */
export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) {
    return '/placeholder.jpg';
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a relative path, prepend the backend URL
  if (imagePath.startsWith('/uploads/')) {
    return `${BACKEND_URL}${imagePath}`;
  }

  // If it doesn't start with /uploads/, assume it's just a filename
  if (!imagePath.startsWith('/')) {
    return `${BACKEND_URL}/uploads/${imagePath}`;
  }

  return imagePath;
};

/**
 * Converts an array of image paths to full URLs
 * @param images - Array of image paths
 * @returns Array of full image URLs
 */
export const getImageUrls = (images: string[] | undefined): string[] => {
  if (!images || images.length === 0) {
    return ['/placeholder.jpg'];
  }

  return images.map(img => getImageUrl(img));
};
