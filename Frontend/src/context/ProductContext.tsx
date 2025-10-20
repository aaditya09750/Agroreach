import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../data/products';

interface ProductContextType {
  isModalOpen: boolean;
  selectedProduct: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
  getProductViewCount: (productId: number) => number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'product_view_counts';

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewCounts, setViewCounts] = useState<Record<number, number>>(() => {
    // Load view counts from localStorage on initialization
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading view counts:', error);
      return {};
    }
  });

  // Save view counts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(viewCounts));
    } catch (error) {
      console.error('Error saving view counts:', error);
    }
  }, [viewCounts]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    
    // Increment view count for this product
    setViewCounts(prevCounts => ({
      ...prevCounts,
      [product.id]: (prevCounts[product.id] || 0) + 1
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getProductViewCount = (productId: number): number => {
    return viewCounts[productId] || 0;
  };

  return (
    <ProductContext.Provider value={{ 
      isModalOpen, 
      selectedProduct, 
      openModal, 
      closeModal,
      getProductViewCount 
    }}>
      {children}
    </ProductContext.Provider>
  );
};
