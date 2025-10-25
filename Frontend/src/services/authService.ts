import { api } from './api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Address {
  _id?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface BillingAddress {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress?: string;
  country?: string;
  state?: string;
  zipCode?: string;
  email?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: {
      id?: string;
      _id?: string;
      firstName?: string;
      lastName?: string;
      name?: string;
      email: string;
      phone?: string;
      role: string;
      addresses?: Address[];
      profileImage?: string;
      billingAddress?: BillingAddress;
    };
  };
  token?: string;
  user?: {
    id?: string;
    _id?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    phone?: string;
    role: string;
    addresses?: Address[];
    profileImage?: string;
    billingAddress?: BillingAddress;
  };
}

export const authService = {
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', userData);
    if (response.data.data?.token) {
      const user = response.data.data.user;
      const storagePrefix = user?.role === 'admin' ? 'admin_' : 'user_';
      localStorage.setItem(`${storagePrefix}token`, response.data.data.token);
      localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
    }
    return response.data;
  },

  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signin', credentials);
    if (response.data.data?.token) {
      const user = response.data.data.user;
      const storagePrefix = user?.role === 'admin' ? 'admin_' : 'user_';
      localStorage.setItem(`${storagePrefix}token`, response.data.data.token);
      localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
    }
    return response.data;
  },

  logout: (isAdmin: boolean = false) => {
    const storagePrefix = isAdmin ? 'admin_' : 'user_';
    localStorage.removeItem(`${storagePrefix}token`);
    localStorage.removeItem(`${storagePrefix}user`);
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  getStoredUser: (isAdmin: boolean = false) => {
    const storagePrefix = isAdmin ? 'admin_' : 'user_';
    const userStr = localStorage.getItem(`${storagePrefix}user`);
    return userStr ? JSON.parse(userStr) : null;
  },

  getStoredToken: (isAdmin: boolean = false) => {
    const storagePrefix = isAdmin ? 'admin_' : 'user_';
    return localStorage.getItem(`${storagePrefix}token`);
  },

  setStoredUser: (user: AuthResponse['user'], isAdmin: boolean = false) => {
    const storagePrefix = isAdmin ? 'admin_' : 'user_';
    localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
  },

  // Helper to check if user is admin based on stored data
  isAdminSession: () => {
    return localStorage.getItem('admin_token') !== null;
  },

  // Helper to check if user session exists
  isUserSession: () => {
    return localStorage.getItem('user_token') !== null;
  },

  // Migrate old localStorage keys to new format (run once on app load)
  migrateOldStorage: () => {
    const oldToken = localStorage.getItem('token');
    const oldUser = localStorage.getItem('user');
    
    if (oldToken && oldUser) {
      try {
        const user = JSON.parse(oldUser);
        const storagePrefix = user?.role === 'admin' ? 'admin_' : 'user_';
        
        // Move to new keys
        localStorage.setItem(`${storagePrefix}token`, oldToken);
        localStorage.setItem(`${storagePrefix}user`, oldUser);
        
        // Remove old keys
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        console.log('Successfully migrated old localStorage keys');
      } catch (error) {
        console.error('Error migrating localStorage:', error);
      }
    }
  },
};
