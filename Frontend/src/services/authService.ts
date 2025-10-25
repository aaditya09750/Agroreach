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
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signin', credentials);
    if (response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getStoredToken: () => {
    return localStorage.getItem('token');
  },

  setStoredUser: (user: AuthResponse['user']) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
};
