import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../data/products';
import { useProduct } from '../../context/ProductContext';
import { useCurrency } from '../../context/CurrencyContext';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={12} className={i < rating ? 'text-warning fill-current' : 'text-gray-300 fill-current'} />
    ))}
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { openModal } = useProduct();
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const { image, name, price, oldPrice, rating, status, discount, stockStatus } = product;

  const isHover = status === 'hover';
  const isSale = status === 'sale';
  const isOutOfStock = stockStatus === 'Out of Stock';

  // Convert price
  const convertedPrice = convertPrice(price);
  const currencySymbol = getCurrencySymbol();
  
  // Show old price only when there's a discount
  const hasDiscount = discount !== undefined && discount !== null && Number(discount) > 0;

  const cardClasses = `border border-border-color hover:border-primary hover:shadow-product-hover rounded-lg p-4 flex flex-col group product-card-hover relative cursor-pointer transition-all`;

  return (
    <div className={cardClasses} onClick={() => openModal(product)}>
      <div className="relative mb-4">
        {isSale && (
          <div className="absolute top-2 left-2 bg-sale text-white text-xs font-semibold px-2 py-1 rounded z-10">Sale 50%</div>
        )}
        {isOutOfStock && (
          <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md z-10">Out of Stock</div>
        )}
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-auto aspect-square object-contain transition-opacity ${isOutOfStock ? 'opacity-30' : 'opacity-100'}`} 
        />
      </div>
      <div className="flex-grow">
        <p className={`text-sm ${isHover ? 'text-primary' : 'text-text-light'}`}>{name}</p>
        <div className="flex items-center gap-2 mt-1">
            <p className="text-base font-medium text-text-dark">{currencySymbol}{convertedPrice.toFixed(2)}</p>
            {hasDiscount && oldPrice && <p className="text-sm text-gray-300 line-through opacity-60">{currencySymbol}{convertPrice(oldPrice).toFixed(2)}</p>}
        </div>
        <StarRating rating={rating} />
      </div>
      <button 
        className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          isOutOfStock 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-100 text-text-dark group-hover:bg-primary group-hover:text-white'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (isOutOfStock) return;
        }}
        disabled={isOutOfStock}
      >
        <ShoppingCart size={20} />
      </button>
    </div>
  );
};

export default ProductCard;
