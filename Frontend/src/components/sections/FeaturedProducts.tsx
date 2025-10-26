import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import SectionHeader from '../ui/SectionHeader';
import { useCurrency } from '../../context/CurrencyContext';
import { useProduct } from '../../context/ProductContext';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { productService } from '../../services/productService';
import { getImageUrls } from '../../utils/imageUtils';

// Import banner image
import bannerImage from '../../assets/Home/Banner.png';

interface SmallProductCardProps {
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  isHover?: boolean;
  productId?: string | number;
  discount?: string | number;
  stockStatus?: 'In Stock' | 'Out of Stock';
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={i < rating ? 'text-warning fill-current' : 'text-gray-300 fill-current'} />
    ))}
  </div>
);

const SmallProductCard: React.FC<SmallProductCardProps> = ({ image, name, price, oldPrice, rating, isHover, productId, discount, stockStatus }) => {
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const { openModal, products } = useProduct();
  const convertedPrice = convertPrice(price);
  const currencySymbol = getCurrencySymbol();
  
  // Show old price only when there's a discount
  const hasDiscount = discount !== undefined && discount !== null && Number(discount) > 0;
  const isOutOfStock = stockStatus === 'Out of Stock';
  
  const handleClick = () => {
    if (productId) {
      // Find the product in context products
      const product = products.find(p => 
        p.id === productId || 
        p._id === productId || 
        String(p.id) === String(productId) || 
        String(p._id) === String(productId)
      );
      
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
      <div className="relative w-24 h-24 flex-shrink-0">
        {isOutOfStock && (
          <div className="absolute top-0 left-0 bg-gray-900 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded z-10">Out</div>
        )}
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-contain transition-opacity ${isOutOfStock ? 'opacity-30' : 'opacity-100'}`} 
        />
      </div>
      <div className="flex-grow">
        <p className="text-sm text-text-light">{name}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-base font-medium text-text-dark">{currencySymbol}{convertedPrice.toFixed(2)}</p>
          {hasDiscount && oldPrice && <p className="text-sm text-gray-300 line-through opacity-60">{currencySymbol}{convertPrice(oldPrice).toFixed(2)}</p>}
        </div>
        <StarRating rating={rating} />
      </div>
      {isHover && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isOutOfStock 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300' 
                : 'bg-white border border-gray-200 hover:bg-primary hover:text-white hover:border-primary'
            }`}
            disabled={isOutOfStock}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

const DealSection: React.FC<{ title: string; products: SmallProductCardProps[] }> = ({ title, products }) => (
  <div>
    <h3 className="text-xl font-medium text-text-dark mb-4">{title}</h3>
    <div className="space-y-4">
      {products.length > 0 ? (
        products.map((product, index) => (
          <SmallProductCard key={index} {...product} />
        ))
      ) : (
        <div className="text-center py-8 text-text-muted">
          <p className="text-sm">No {title.toLowerCase()} available</p>
        </div>
      )}
    </div>
  </div>
);

const BannerCard: React.FC = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/shop');
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden h-full bg-cover bg-center" 
      style={{backgroundImage: `url(${bannerImage})`}}
    >
      <div className="pt-12 pb-8 px-8 text-center flex flex-col items-center h-full">
        <p className="text-xs uppercase tracking-widest font-medium text-text-dark">WINTER SALE</p>
        <p className="text-5xl font-semibold text-primary mt-2">75% off</p>
        <button 
          onClick={handleShopNowClick}
          className="mt-6 bg-white text-primary font-semibold py-3 px-8 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
        >
          Shop Now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts: React.FC = () => {
  const { products } = useProduct();
  const [hotDeals, setHotDeals] = useState<SmallProductCardProps[]>([]);
  const [bestSeller, setBestSeller] = useState<SmallProductCardProps[]>([]);
  const [topRated, setTopRated] = useState<SmallProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Use first 5 products from context for featured section
  const featuredProductsData = products.slice(0, 5);

  useEffect(() => {
    const fetchDealProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch Hot Deals, Best Sellers, and Top Rated products in parallel
        const [hotDealsResponse, bestSellerResponse, topRatedResponse] = await Promise.all([
          productService.getHotDeals(3),
          productService.getBestSellers(3),
          productService.getTopRated(3)
        ]);

        // Map Hot Deals
        const hotDealsData = (hotDealsResponse.data || []).map((p: any) => {
          const imageUrls = getImageUrls(p.images);
          return {
            image: imageUrls[0],
            name: p.name,
            price: p.price,
            oldPrice: p.oldPrice,
            rating: p.rating || 4.5,
            productId: p._id,
            discount: p.discount,
            stockStatus: p.stockStatus || 'In Stock'
          };
        });

        // Map Best Sellers
        const bestSellerData = (bestSellerResponse.data || []).map((p: any) => {
          const imageUrls = getImageUrls(p.images);
          return {
            image: imageUrls[0],
            name: p.name,
            price: p.price,
            oldPrice: p.oldPrice,
            rating: p.rating || 4.5,
            productId: p._id,
            discount: p.discount,
            stockStatus: p.stockStatus || 'In Stock'
          };
        });

        // Map Top Rated
        const topRatedData = (topRatedResponse.data || []).map((p: any) => {
          const imageUrls = getImageUrls(p.images);
          return {
            image: imageUrls[0],
            name: p.name,
            price: p.price,
            oldPrice: p.oldPrice,
            rating: p.rating || 4.5,
            productId: p._id,
            discount: p.discount,
            stockStatus: p.stockStatus || 'In Stock'
          };
        });

        setHotDeals(hotDealsData);
        setBestSeller(bestSellerData);
        setTopRated(topRatedData);
      } catch (error) {
        console.error('Failed to load deal products:', error);
        // Set empty arrays on error
        setHotDeals([]);
        setBestSeller([]);
        setTopRated([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDealProducts();
  }, []);

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
        {loading ? (
          <>
            {/* Loading skeletons */}
            {[1, 2, 3].map((section) => (
              <div key={section}>
                <div className="h-6 w-24 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-4 border border-border-color rounded-md flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex-grow space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <BannerCard />
          </>
        ) : (
          <>
            <DealSection title="Hot Deals" products={hotDeals.length > 0 ? hotDeals : []} />
            <DealSection title="Best Seller" products={bestSeller.length > 0 ? bestSeller : []} />
            <DealSection title="Top Rated" products={topRated.length > 0 ? topRated : []} />
            <BannerCard />
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
