import React from 'react';
import ProductCard from '../ui/ProductCard';
import { Product } from '../../data/products';
import { useTranslation } from '../../i18n/useTranslation';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { t } = useTranslation();
  
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-text-muted">{t('products.noProductsFound')}</p>
        <p className="text-sm text-text-light mt-2">{t('products.tryAdjustingFilters')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
