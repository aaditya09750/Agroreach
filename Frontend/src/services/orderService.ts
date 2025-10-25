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

    // Calculate totals
    const subtotal = orderData.subtotal || 0;
    const shipping = orderData.shipping || 0;
    const tax = orderData.gst || 0;
    const total = subtotal + shipping + tax;

    // Ensure billingAddress has all required fields
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

    const response = await api.post('/orders', payload);
    console.log('Backend response:', response.data);
    return response.data;
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
