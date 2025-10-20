import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../data/products';
import { X, Star, ShoppingCart } from 'lucide-react';
import ProductImageGallery from './ProductImageGallery';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useProduct } from '../../context/ProductContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={18} className={` ${i < rating ? 'text-warning fill-current' : 'text-gray-300 fill-current'}`} />
    ))}
  </div>
);

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const { getProductViewCount } = useProduct();
  const viewCount = getProductViewCount(product.id);
  const convertedPrice = convertPrice(product.price);
  const currencySymbol = getCurrencySymbol();
  
  let convertedOldPrice = null;
  if (product.oldPrice) {
    convertedOldPrice = convertPrice(product.oldPrice);
  }

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product.status === 'out-of-stock' || product.stockStatus === 'Out of Stock') {
      alert('This product is out of stock and cannot be added to cart.');
      return;
    }

    setIsAddingToCart(true);
    
    // Add to cart using context
    addToCart(product, quantity);
    
    setTimeout(() => {
      setIsAddingToCart(false);
      setQuantity(1); // Reset quantity after adding
    }, 500);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Image Gallery */}
            <div className="w-full">
              <ProductImageGallery images={product.images.length > 0 ? product.images : [product.image]} />
            </div>

            {/* Right Side - Product Info */}
            <div className="flex flex-col">
              {/* Product Title */}
              <h2 id="product-modal-title" className="text-3xl font-semibold text-text-dark mb-3">
                {product.name}
              </h2>
              
              {/* Stock Badge */}
              <div className="mb-3">
                <span className={`inline-block text-xs font-medium px-3 py-1.5 rounded ${
                  product.stockStatus === 'In Stock' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-sale/10 text-sale'
                }`}>
                  {product.stockStatus}
                </span>
              </div>

              {/* Rating and SKU */}
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-sm text-text-dark">{viewCount} Review</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-5">
                {convertedOldPrice && (
                  <span className="text-xl text-gray-400 line-through">{currencySymbol}{convertedOldPrice.toFixed(2)}</span>
                )}
                <span className="text-3xl font-semibold text-primary">{currencySymbol}{convertedPrice.toFixed(2)}</span>
                {product.discount && (
                  <span className="bg-sale/10 text-sale text-sm font-medium px-2.5 py-1 rounded">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Seller */}
              <div className="flex items-center gap-1 mb-5 pb-2 border-b border-gray-200">
                <span className="text-sm font-medium text-text-dark">Seller:</span>
                <span className="text-sm text-text-dark">Yash Santosh Hule</span>
              </div>

              {/* Description */}
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                {product.description || 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.'}
              </p>

              {/* Add to Cart Section */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-border-color rounded-full overflow-hidden">
                  <button 
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1 || product.status === 'out-of-stock' || product.stockStatus === 'Out of Stock'}
                    className={`w-10 h-10 flex items-center justify-center transition-colors font-semibold ${
                      quantity <= 1 || product.status === 'out-of-stock' || product.stockStatus === 'Out of Stock'
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-base font-medium min-w-[50px] text-center">{quantity}</span>
                  <button 
                    onClick={handleIncreaseQuantity}
                    disabled={product.status === 'out-of-stock' || product.stockStatus === 'Out of Stock'}
                    className={`w-10 h-10 flex items-center justify-center transition-colors font-semibold ${
                      product.status === 'out-of-stock' || product.stockStatus === 'Out of Stock'
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.status === 'out-of-stock' || product.stockStatus === 'Out of Stock'}
                  className={`flex-1 font-semibold flex items-center justify-center gap-2 py-3 px-6 rounded-full transition-colors ${
                    product.status === 'out-of-stock' || product.stockStatus === 'Out of Stock'
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : isAddingToCart 
                        ? 'bg-primary text-white opacity-70 cursor-not-allowed' 
                        : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {product.status === 'out-of-stock' || product.stockStatus === 'Out of Stock' 
                    ? 'Out of Stock' 
                    : isAddingToCart 
                      ? 'Adding...' 
                      : 'Add to Cart'}
                  <ShoppingCart size={18} />
                </button>
              </div>

              {/* Category and Tags */}
              <div className="text-sm space-y-2 pt-4 border-t border-gray-200">
                <p className="text-text-dark">
                  <span className="font-medium">Category:</span>{' '}
                  <span className="text-text-muted">{product.category || 'Uncategorized'}</span>
                </p>
                <p className="text-text-dark">
                  <span className="font-medium">Tag:</span>{' '}
                  <span className="text-text-muted">
                    {product.tags && product.tags.length > 0 ? product.tags.join(', ') : 'No tags'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
