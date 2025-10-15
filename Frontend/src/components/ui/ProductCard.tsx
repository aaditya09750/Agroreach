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
  const { image, name, price, oldPrice, rating, status } = product;

  const isHover = status === 'hover';
  const isSale = status === 'sale';
  const isOutOfStock = status === 'out-of-stock';

  // Convert price
  const convertedPrice = convertPrice(price);
  const currencySymbol = getCurrencySymbol();
  
  // Handle old price if exists
  let convertedOldPrice = null;
  if (oldPrice) {
    convertedOldPrice = convertPrice(oldPrice);
  }

  const cardClasses = `border border-border-color hover:border-primary hover:shadow-product-hover rounded-lg p-4 flex flex-col group product-card-hover relative cursor-pointer transition-all`;

  return (
    <div className={cardClasses} onClick={() => openModal(product)}>
      <div className="relative mb-4">
        {isSale && (
          <div className="absolute top-2 left-2 bg-sale text-white text-xs font-semibold px-2 py-1 rounded">Sale 50%</div>
        )}
        {isOutOfStock && (
          <div className="absolute top-2 left-2 bg-text-dark text-white text-xs font-semibold px-2 py-1 rounded">Out of Stock</div>
        )}
        <img src={image} alt={name} className={`w-full h-auto aspect-square object-contain ${isOutOfStock ? 'opacity-50' : ''}`} />
      </div>
      <div className="flex-grow">
        <p className={`text-sm ${isHover ? 'text-primary' : 'text-text-light'}`}>{name}</p>
        <div className="flex items-center gap-2 mt-1">
            <p className="text-base font-medium text-text-dark">{currencySymbol}{convertedPrice.toFixed(2)}</p>
            {convertedOldPrice && <p className="text-sm text-text-muted line-through">{currencySymbol}{convertedOldPrice.toFixed(2)}</p>}
        </div>
        <StarRating rating={rating} />
      </div>
      <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-gray-100 text-text-dark group-hover:bg-primary group-hover:text-white" onClick={(e) => e.stopPropagation()}>
        <ShoppingCart size={20} />
      </button>
    </div>
  );
};

export default ProductCard;
