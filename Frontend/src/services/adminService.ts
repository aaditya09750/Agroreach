import { api } from './api';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images?: File[];
  featured?: boolean;
}

export const adminService = {
  // Products Management
  createProduct: async (productData: FormData) => {
    const response = await api.post('/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateProduct: async (id: string, productData: FormData | Record<string, unknown>) => {
    const response = await api.put(`/products/${id}`, productData, {
      headers: productData instanceof FormData 
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  getRecentProducts: async () => {
    const response = await api.get('/admin/products/recent');
    return response.data;
  },

  // Orders Management
  getAllOrders: async (params?: { status?: string; page?: number; limit?: number; search?: string; userId?: string }) => {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string) => {
    const response = await api.patch(`/admin/orders/${id}/status`, { status });
    return response.data;
  },

  deleteOrder: async (id: string) => {
    const response = await api.delete(`/admin/orders/${id}`);
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await api.get(`/admin/orders/${id}`);
    return response.data;
  },

  // Users Management
  getAllUsers: async (params?: { page?: number; limit?: number }) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  getUserById: async (id: string) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  updateUserRole: async (id: string, role: string) => {
    const response = await api.put(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Analytics
  getAnalytics: async () => {
    const response = await api.get('/admin/analytics');
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
};
