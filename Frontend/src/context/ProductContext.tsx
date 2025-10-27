import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../data/products';
import { productService } from '../services/productService';
import { getImageUrls } from '../utils/imageUtils';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  isModalOpen: boolean;
  selectedProduct: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
  getProductViewCount: (productId: number) => number;
  refreshProducts: () => Promise<void>;
  searchProducts: (searchTerm: string) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Fetch all products without pagination limit
      const response = await productService.getAllProducts({ limit: 1000 });
      // Backend returns { success: true, data: [...products...], pagination: {...} }
      const productsArray = response.data || [];
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
          _id: p._id, // Keep MongoDB _id for API calls
          name: p.name,
          category: p.category,
          price: p.price,
          oldPrice: p.oldPrice,
          rating: p.rating || 4.5,
          reviewCount: p.reviewCount || 0,
          image: imageUrls[0], // First image as thumbnail
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
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = async () => {
    await loadProducts();
  };

  const searchProducts = async (searchTerm: string) => {
    try {
      setLoading(true);
      const response = await productService.searchProducts(searchTerm);
      // Backend returns { success: true, data: [...products...], pagination: {...} }
      const productsArray = response.data || [];
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
          _id: p._id, // Keep MongoDB _id for API calls
          name: p.name,
          category: p.category,
          price: p.price,
          oldPrice: p.oldPrice,
          rating: p.rating || 4.5,
          reviewCount: p.reviewCount || 0,
          image: imageUrls[0], // First image as thumbnail
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
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Failed to search products', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category: string) => {
    try {
      setLoading(true);
      const response = await productService.getProductsByCategory(category);
      // Backend returns { success: true, data: [...products...], pagination: {...} }
      const productsArray = response.data || [];
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
          _id: p._id, // Keep MongoDB _id for API calls
          name: p.name,
          category: p.category,
          price: p.price,
          oldPrice: p.oldPrice,
          rating: p.rating || 4.5,
          reviewCount: p.reviewCount || 0,
          image: imageUrls[0], // First image as thumbnail
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
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Failed to filter products', error);
    } finally {
      setLoading(false);
    }
  };

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
    const productIdNum = typeof product.id === 'string' ? parseInt(product.id) : product.id;
    setViewCounts(prevCounts => ({
      ...prevCounts,
      [productIdNum]: (prevCounts[productIdNum] || 0) + 1
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getProductViewCount = (productId: number | string): number => {
    const productIdNum = typeof productId === 'string' ? parseInt(productId) : productId;
    return viewCounts[productIdNum] || 0;
  };

  return (
    <ProductContext.Provider value={{ 
      products,
      loading,
      isModalOpen, 
      selectedProduct, 
      openModal, 
      closeModal,
      getProductViewCount,
      refreshProducts,
      searchProducts,
      filterByCategory,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
