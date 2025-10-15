import React from 'react';
import ProductCard from '../ui/ProductCard';
import { ArrowRight } from 'lucide-react';
import { shopProducts } from '../../data/products';
import { Link } from 'react-router-dom';

const NewestProducts: React.FC = () => {
  const newestProductsData = shopProducts.slice(5, 10);

  const handleViewAllClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-12">
        <div className="text-left">
            <h2 className="text-4xl font-semibold text-text-dark">Newest Products</h2>
            <div className="flex items-center gap-1 mt-4">
                <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
                <div className="w-10 h-1 bg-primary rounded-full"></div>
                <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
            </div>
        </div>
        <Link to="/shop" onClick={handleViewAllClick} className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
          View All <ArrowRight size={18} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {newestProductsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewestProducts;
