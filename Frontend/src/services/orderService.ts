import { api } from './api';

export interface OrderItem {
  product?: string;
  id?: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CreateOrderData {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    streetAddress?: string;
    country?: string;
    state?: string;
    zipCode?: string;
    companyName?: string;
    street?: string;
    city?: string;
    postalCode?: string;
  };
  paymentMethod: string;
  shippingMethod?: string;
  items?: OrderItem[];
  subtotal?: number;
  shipping?: number;
  gst?: number;
  tax?: number;
  total?: number;
}

export const orderService = {
  createOrder: async (orderData: CreateOrderData) => {
    console.log('orderService.createOrder called with:', orderData);
    
    // Transform items to match backend format
    const items = orderData.items?.map(item => ({
      product: String(item.id),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    })) || [];

    console.log('Transformed items:', items);

    // Calculate totals - use provided values or calculate
    const subtotal = orderData.subtotal || 0;
    const shipping = orderData.shipping || 0;
    const tax = orderData.tax || orderData.gst || 0;
    const total = orderData.total || (subtotal + shipping + tax);

    // Build billingAddress from available data
    // If billingAddress is provided and has required fields, use it
    // Otherwise, validation will fail on backend
    const billingAddress = {
      firstName: orderData.billingAddress?.firstName || '',
      lastName: orderData.billingAddress?.lastName || '',
      email: orderData.billingAddress?.email || '',
      phone: orderData.billingAddress?.phone || '',
      streetAddress: orderData.billingAddress?.streetAddress || orderData.billingAddress?.street || '',
      country: orderData.billingAddress?.country || '',
      state: orderData.billingAddress?.state || '',
      zipCode: orderData.billingAddress?.zipCode || orderData.billingAddress?.postalCode || '',
      companyName: orderData.billingAddress?.companyName || ''
    };

    console.log('Final billing address:', billingAddress);
    
    // Validate that required billing address fields are present
    if (!billingAddress.firstName || !billingAddress.lastName || 
        !billingAddress.email || !billingAddress.phone || 
        !billingAddress.streetAddress || !billingAddress.country || 
        !billingAddress.state || !billingAddress.zipCode) {
      throw new Error('Please complete your billing address in Settings before placing an order');
    }

    const payload = {
      items,
      billingAddress,
      paymentMethod: orderData.paymentMethod,
      subtotal,
      shipping,
      tax,
      total
    };

    console.log('Sending to backend:', payload);

    try {
      const response = await api.post('/orders', payload);
      console.log('Backend response:', response.data);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string; errors?: Array<{ field: string; message: string }> }; status?: number } };
      console.error('Backend error response:', axiosError.response?.data);
      console.error('Backend error status:', axiosError.response?.status);
      console.error('Backend error message:', axiosError.response?.data?.message);
      if (axiosError.response?.data?.errors) {
        console.error('Validation errors:', axiosError.response.data.errors);
      }
      throw error;
    }
  },

  getMyOrders: async () => {
    const response = await api.get('/orders/user');
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  cancelOrder: async (id: string) => {
    const response = await api.patch(`/orders/${id}/cancel`);
    return response.data;
  },
};
