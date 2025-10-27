import { api } from './api';

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: string;
}

export const productService = {
  getAllProducts: async (params?: ProductFilters) => {
    // Set a high default limit to get all products
    const defaultParams = { limit: 1000, ...params };
    const response = await api.get('/products', { params: defaultParams });
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await api.get('/products', { 
      params: { featured: true, limit: 8 } 
    });
    return response.data;
  },

  getProductsByCategory: async (category: string) => {
    const response = await api.get('/products', { 
      params: { category, limit: 1000 } 
    });
    return response.data;
  },

  searchProducts: async (searchTerm: string) => {
    const response = await api.get('/products', { 
      params: { search: searchTerm, limit: 1000 } 
    });
    return response.data;
  },

  incrementViewCount: async (productId: string) => {
    const response = await api.patch(`/products/${productId}/view`);
    return response.data;
  },

  getLatestProducts: async (limit: number = 5) => {
    const response = await api.get('/products', { 
      params: { sort: 'newest', limit } 
    });
    return response.data;
  },

  getHotDeals: async (limit: number = 3) => {
    const response = await api.get('/products', { 
      params: { isHotDeal: 'true', limit } 
    });
    return response.data;
  },

  getBestSellers: async (limit: number = 3) => {
    const response = await api.get('/products', { 
      params: { isBestSeller: 'true', limit } 
    });
    return response.data;
  },

  getTopRated: async (limit: number = 3) => {
    const response = await api.get('/products', { 
      params: { isTopRated: 'true', limit } 
    });
    return response.data;
  },
};
