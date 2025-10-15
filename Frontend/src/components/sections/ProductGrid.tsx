import React from 'react';
import ProductCard from '../ui/ProductCard';
import { Product } from '../../data/products';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-text-muted">No products found matching your filters.</p>
        <p className="text-sm text-text-light mt-2">Try adjusting your filters to see more products.</p>
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
