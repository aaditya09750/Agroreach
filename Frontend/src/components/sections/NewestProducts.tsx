import React, { useEffect, useState } from 'react';
import ProductCard from '../ui/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { Product } from '../../data/products';
import { getImageUrls } from '../../utils/imageUtils';
import { useTranslation } from '../../i18n/useTranslation';

const NewestProducts: React.FC = () => {
  const { t } = useTranslation();
  const [newestProductsData, setNewestProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getLatestProducts(5);
        const productsArray = response.data || [];
        
        // Map API products to frontend format
        const mappedProducts = productsArray.map((p: {
          _id: string;
          name: string;
          category: string;
          price: number;
          oldPrice?: number;
          rating?: number;
          reviewCount?: number;
          images?: string[];
          description: string;
          stockQuantity?: number;
          stockStatus?: string;
          tags?: string[];
          discount?: number;
          isHotDeal?: boolean;
          isBestSeller?: boolean;
          isTopRated?: boolean;
          status?: 'sale' | 'new' | null;
        }) => {
          const imageUrls = getImageUrls(p.images);
          return {
            id: p._id,
            _id: p._id,
            name: p.name,
            category: p.category,
            price: p.price,
            oldPrice: p.oldPrice,
            rating: p.rating || 4.5,
            reviewCount: p.reviewCount || 0,
            image: imageUrls[0],
            images: imageUrls,
            description: p.description,
            stock: p.stockQuantity || 0,
            stockStatus: (p.stockStatus as 'In Stock' | 'Out of Stock') || 'In Stock',
            tags: p.tags || [],
            discount: p.discount || 0,
            isHotDeal: p.isHotDeal || false,
            isBestSeller: p.isBestSeller || false,
            isTopRated: p.isTopRated || false,
            status: p.status,
          };
        });
        
        setNewestProductsData(mappedProducts);
      } catch (error) {
        console.error('Failed to load latest products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  const handleViewAllClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
            <h2 className="text-4xl font-semibold text-text-dark">{t('products.newest')}</h2>
            <div className="flex items-center gap-1 mt-4">
              <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
              <div className="w-10 h-1 bg-primary rounded-full"></div>
              <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
            </div>
          </div>
          <Link to="/shop" onClick={handleViewAllClick} className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
            {t('products.viewAll')} <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-border-color p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-12">
        <div className="text-left">
            <h2 className="text-4xl font-semibold text-text-dark">{t('products.newest')}</h2>
            <div className="flex items-center gap-1 mt-4">
                <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
                <div className="w-10 h-1 bg-primary rounded-full"></div>
                <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
            </div>
        </div>
        <Link to="/shop" onClick={handleViewAllClick} className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
          {t('products.viewAll')} <ArrowRight size={18} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {newestProductsData.length > 0 ? (
          newestProductsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-text-muted">{t('products.noProductsFound')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewestProducts;
