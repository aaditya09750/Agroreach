import { api } from './api';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  image?: File;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface AddressData {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface BillingAddressData {
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

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData) => {
    // Create FormData for file upload
    const formData = new FormData();
    
    if (data.firstName) formData.append('firstName', data.firstName);
    if (data.lastName) formData.append('lastName', data.lastName);
    if (data.phone) formData.append('phone', data.phone);
    if (data.email) formData.append('email', data.email);
    if (data.image) formData.append('image', data.image);

    const response = await api.put('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateBillingAddress: async (billingAddress: BillingAddressData) => {
    const response = await api.put('/users/billing-address', { billingAddress });
    return response.data;
  },

  updatePassword: async (data: UpdatePasswordData) => {
    const response = await api.put('/users/password', data);
    return response.data;
  },

  addAddress: async (address: AddressData) => {
    const response = await api.post('/users/addresses', address);
    return response.data;
  },

  updateAddress: async (addressId: string, address: AddressData) => {
    const response = await api.put(`/users/addresses/${addressId}`, address);
    return response.data;
  },

  deleteAddress: async (addressId: string) => {
    const response = await api.delete(`/users/addresses/${addressId}`);
    return response.data;
  },
};
