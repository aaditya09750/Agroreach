import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    // Determine which token to use based on the current page/route
    const currentPath = window.location.pathname;
    const isAdminPath = currentPath.startsWith('/admin');
    
    let token: string | null = null;
    
    if (isAdminPath) {
      // On admin routes, use admin token
      token = localStorage.getItem('admin_token');
      console.log('API Interceptor: Using admin_token for path:', currentPath);
    } else {
      // On user routes, use user token
      token = localStorage.getItem('user_token');
      console.log('API Interceptor: Using user_token for path:', currentPath);
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Interceptor: Token attached to request:', config.url);
    } else {
      console.warn('API Interceptor: No token found for request:', config.url);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      const currentPath = window.location.pathname;
      
      // Define public routes that don't require authentication
      const publicRoutes = ['/', '/shop', '/about', '/contact', '/signin', '/signup'];
      const isPublicRoute = publicRoutes.some(route => currentPath === route || currentPath.startsWith(route));
      
      // Only redirect if user is on a protected route
      if (currentPath.startsWith('/admin')) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        if (currentPath !== '/admin') {
          window.location.href = '/admin';
        }
      } else if (!isPublicRoute) {
        // Only redirect to signin if user is on a protected route
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_user');
        if (currentPath !== '/signin') {
          window.location.href = '/signin';
        }
      }
      // If on a public route, just clear the token but don't redirect
      else {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
