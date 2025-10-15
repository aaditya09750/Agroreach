import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  // Use the first image or fallback to empty string
  const displayImages = images.length > 0 ? images : [];
  const [mainImage, setMainImage] = useState(displayImages[0] || '');

  // If no images available, show a placeholder
  if (displayImages.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-50 rounded-lg h-[450px]">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-full items-center">
      {/* Thumbnail Column - Always show */}
      <div className="flex flex-col items-center gap-2 h-full justify-center">
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          aria-label="Scroll up"
        >
          <ChevronUp size={18} className="text-gray-600"/>
        </button>
        <div className="flex flex-col gap-3">
          {displayImages.map((img, index) => (
            <button 
              key={index}
              className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                mainImage === img 
                  ? 'border-primary' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setMainImage(img)}
              aria-label={`View image ${index + 1}`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={18} className="text-gray-600"/>
        </button>
      </div>
      
      {/* Main Image */}
      <div className="flex-1 bg-white rounded-lg overflow-hidden flex items-center justify-center h-[500px]">
        <img 
          src={mainImage} 
          alt="Main product" 
          className="max-w-full max-h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
