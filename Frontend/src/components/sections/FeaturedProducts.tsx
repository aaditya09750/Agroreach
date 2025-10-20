import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import SectionHeader from '../ui/SectionHeader';
import { shopProducts } from '../../data/products';
import { useCurrency } from '../../context/CurrencyContext';
import { useProduct } from '../../context/ProductContext';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';

// Import banner image
import bannerImage from '../../assets/Home/Banner.png';

interface SmallProductCardProps {
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  isHover?: boolean;
  productId?: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={i < rating ? 'text-warning fill-current' : 'text-gray-300 fill-current'} />
    ))}
  </div>
);

const SmallProductCard: React.FC<SmallProductCardProps> = ({ image, name, price, oldPrice, rating, isHover, productId }) => {
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const { openModal } = useProduct();
  const convertedPrice = convertPrice(price);
  const currencySymbol = getCurrencySymbol();
  
  const handleClick = () => {
    if (productId) {
      const product = shopProducts.find(p => p.id === productId);
      if (product) {
        openModal(product);
      }
    }
  };
  
  return (
    <div 
      className={`p-4 border border-border-color hover:border-primary hover:shadow-product-hover rounded-md flex items-center gap-4 group relative transition-all cursor-pointer`}
      onClick={handleClick}
    >
      <img src={image} alt={name} className="w-24 h-24 object-contain" />
      <div className="flex-grow">
        <p className="text-sm text-text-light">{name}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-base font-medium text-text-dark">{currencySymbol}{convertedPrice.toFixed(2)}</p>
          {oldPrice && <p className="text-base text-text-muted line-through">{currencySymbol}{convertPrice(oldPrice).toFixed(2)}</p>}
        </div>
        <StarRating rating={rating} />
      </div>
      {isHover && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"><ShoppingCart size={20} /></button>
        </div>
      )}
    </div>
  );
};

const DealSection: React.FC<{ title: string; products: SmallProductCardProps[] }> = ({ title, products }) => (
  <div>
    <h3 className="text-xl font-medium text-text-dark mb-4">{title}</h3>
    <div className="space-y-4">
      {products.map((product, index) => (
        <SmallProductCard key={index} {...product} />
      ))}
    </div>
  </div>
);

const BannerCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative rounded-lg overflow-hidden h-full bg-cover bg-center" 
      style={{backgroundImage: `url(${bannerImage})`}}
    >
      <div className="pt-12 pb-8 px-8 text-center flex flex-col items-center h-full">
        <p className="text-xs uppercase tracking-widest font-medium text-text-dark">SUMMER SALE</p>
        <p className="text-5xl font-semibold text-primary mt-2">75% off</p>
        <button 
          onClick={() => navigate('/shop')}
          className="mt-6 bg-white text-primary font-semibold py-3 px-8 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
        >
          Shop Now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts: React.FC = () => {
  const featuredProductsData = shopProducts.slice(0, 5);

  // Hot Deals - Get products by ID and map to SmallProductCard format
  const hotDeals = [4, 2, 14].map(id => {
    const product = shopProducts.find(p => p.id === id);
    return product ? {
      image: product.image,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      rating: product.rating,
      productId: product.id
    } : null;
  }).filter(Boolean) as SmallProductCardProps[];

  // Best Seller - Get products by ID and map to SmallProductCard format
  const bestSeller = [6, 1, 5].map(id => {
    const product = shopProducts.find(p => p.id === id);
    return product ? {
      image: product.image,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      rating: product.rating,
      productId: product.id
    } : null;
  }).filter(Boolean) as SmallProductCardProps[];

  // Top Rated - Get products by ID and map to SmallProductCard format
  const topRated = [1, 13, 7].map(id => {
    const product = shopProducts.find(p => p.id === id);
    return product ? {
      image: product.image,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      rating: product.rating,
      productId: product.id
    } : null;
  }).filter(Boolean) as SmallProductCardProps[];

  return (
    <section>
      {/* Featured Products Section */}
      <SectionHeader title="Featured Products" />
      <div className="overflow-x-auto mt-12 scrollbar-hide">
        <div className="flex gap-5 justify-center px-4">
          {featuredProductsData.map((product) => (
            <div key={product.id} className="w-64 flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Hot Deals, Best Seller, Top Rated, and Banner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-12">
        <DealSection title="Hot Deals" products={hotDeals} />
        <DealSection title="Best Seller" products={bestSeller} />
        <DealSection title="Top Rated" products={topRated} />
        <BannerCard />
      </div>
    </section>
  );
};

export default FeaturedProducts;
