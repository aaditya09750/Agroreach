import api from './api';

interface ApiError {
  response?: {
    data?: {
      success: boolean;
      message: string;
    };
  };
}

export const newsletterService = {
  // Subscribe to newsletter
  subscribe: async (email: string) => {
    try {
      const response = await api.post('/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError.response?.data || { success: false, message: 'Failed to subscribe' };
    }
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email: string) => {
    try {
      const response = await api.post('/newsletter/unsubscribe', { email });
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError.response?.data || { success: false, message: 'Failed to unsubscribe' };
    }
  }
};
