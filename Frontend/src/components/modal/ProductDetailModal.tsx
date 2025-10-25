import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../data/products';
import { X, Star, ShoppingCart } from 'lucide-react';
import ProductImageGallery from './ProductImageGallery';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';

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
  const hasIncrementedRef = useRef(false); // Track if we've already incremented
  const currentProductIdRef = useRef<string | number | null>(null); // Track current product
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [reviewCount, setReviewCount] = useState(product.reviewCount || 0);
  const { addToCart } = useCart();
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const { user } = useUser();
  const navigate = useNavigate();
  const convertedPrice = convertPrice(product.price);
  const currencySymbol = getCurrencySymbol();

  useEffect(() => {
    // Increment review count when modal opens (counts as a view)
    const productId = product._id || product.id;
    
    // Reset the flag if we're viewing a different product
    if (currentProductIdRef.current !== productId) {
      hasIncrementedRef.current = false;
      currentProductIdRef.current = productId;
    }
    
    // Use ref to prevent double-increment in React Strict Mode
    if (hasIncrementedRef.current) {
      console.log('Already incremented for this product, skipping...');
      return;
    }
    
    const incrementView = async () => {
      try {
        if (productId) {
          console.log('Incrementing review count for product:', productId);
          hasIncrementedRef.current = true;
          
          const response = await productService.incrementViewCount(String(productId));
          console.log('Review count response:', response);
          
          if (response.success && response.data?.reviewCount !== undefined) {
            setReviewCount(response.data.reviewCount);
            console.log('Updated review count to:', response.data.reviewCount);
          }
        } else {
          console.warn('No product ID found:', product);
        }
      } catch (error) {
        console.error('Error incrementing review count:', error);
        hasIncrementedRef.current = false; // Reset on error so it can retry
      }
    };

    incrementView();

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
  }, [product._id, product.id, onClose, product]);

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

  const handleAddToCart = async () => {
    // Check if user is authenticated
    if (!user) {
      // Show auth prompt modal
      setShowAuthPrompt(true);
      return;
    }

    if (product.status === 'out-of-stock' || product.stockStatus === 'Out of Stock') {
      alert('This product is out of stock and cannot be added to cart.');
      return;
    }

    setIsAddingToCart(true);
    
    // Add to cart using context
    const success = await addToCart(product, quantity);
    
    if (success) {
      setTimeout(() => {
        setIsAddingToCart(false);
        setQuantity(1); // Reset quantity after adding
      }, 500);
    } else {
      setIsAddingToCart(false);
    }
  };

  const handleSignInRedirect = () => {
    onClose(); // Close the product modal
    navigate('/signin');
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
        <div className="overflow-y-auto max-h-[90vh] scrollbar-hide p-8">
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

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-sm text-text-dark">{reviewCount} Review{reviewCount !== 1 ? 's' : ''}</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-5">
                {product.oldPrice && Number(product.discount || 0) > 0 && (
                  <span className="text-lg text-gray-300 line-through opacity-60">{currencySymbol}{convertPrice(product.oldPrice).toFixed(2)}</span>
                )}
                <span className="text-3xl font-semibold text-primary">{currencySymbol}{convertedPrice.toFixed(2)}</span>
                {product.discount !== undefined && product.discount !== null && Number(product.discount) > 0 && (
                  <span className="bg-sale/10 text-sale text-sm font-medium px-2.5 py-1 rounded">
                    {product.discount}% off
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

      {/* Authentication Prompt Modal */}
      {showAuthPrompt && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign In Required</h3>
            <p className="text-gray-600 mb-6">
              Please sign in to add products to your cart and enjoy a seamless shopping experience.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAuthPrompt(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSignInRedirect}
                className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailModal;
