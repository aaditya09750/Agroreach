import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { orderService, CreateOrderData } from '../services/orderService';
import { useUser } from './UserContext';
import { useCurrency } from './CurrencyContext';
import { getImageUrl } from '../utils/imageUtils';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number | string;
  _id?: string;
  orderId?: string; // Custom order ID like ORD-2024-00001
  date: string;
  total: string;
  status: 'Order received' | 'Processing' | 'On the way' | 'Delivered' | 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  gst: number;
  billingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    country: string;
    state: string;
    zipCode: string;
    companyName?: string;
  };
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (orderData: CreateOrderData) => Promise<void>;
  getOrderById: (id: number | string) => Order | undefined;
  refreshOrders: () => Promise<void>;
  showNotification: boolean;
  notificationMessage: string;
  hideNotification: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const { user, billingAddress } = useUser();
  const { currency } = useCurrency();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Load orders when user logs in
  useEffect(() => {
    if (user) {
      console.log('OrderContext: User logged in, loading orders for:', user.email);
      loadOrders();
    } else {
      console.log('OrderContext: No user, clearing orders');
      setOrders([]);
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      console.log('OrderContext: Fetching orders from server...');
      const response = await orderService.getMyOrders();
      
      console.log('OrderContext: Raw orders response:', response);
      
      // Backend returns { success: true, data: [...], pagination: {...} }
      const ordersData = response.data || response;
      
      console.log('OrderContext: Orders data:', ordersData);
      console.log('OrderContext: Number of orders loaded:', ordersData.length);
      
      const mappedOrders = ordersData.map((order: {
        _id: string;
        orderId?: string;
        createdAt: string;
        total: number;
        status: string;
        shipping?: number;
        tax?: number;
        subtotal?: number;
        items?: Array<{
          product: string | { _id: string; name?: string; images?: string[] };
          name?: string;
          price: number;
          quantity: number;
          image?: string;
        }>;
        billingAddress?: {
          firstName?: string;
          lastName?: string;
          email?: string;
          phone?: string;
          streetAddress?: string;
          street?: string;
          city?: string;
          state?: string;
          postalCode?: string;
          zipCode?: string;
          country?: string;
          companyName?: string;
        };
        user?: {
          email?: string;
          phone?: string;
        };
      }) => ({
        id: order._id,
        _id: order._id,
        orderId: order.orderId, // Add custom orderId
        date: new Date(order.createdAt).toLocaleDateString('en-US', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        total: `$${order.total.toFixed(2)}`,
        status: mapOrderStatus(order.status),
        items: order.items?.map((item) => {
          // Extract product info properly
          let productId: string;
          let productName: string;
          let productImage: string;

          if (typeof item.product === 'string') {
            // Product is just an ID
            productId = item.product;
            productName = item.name || 'Product';
            productImage = getImageUrl(item.image);
          } else {
            // Product is populated object
            productId = item.product._id;
            productName = item.product.name || item.name || 'Product';
            productImage = getImageUrl(item.product.images?.[0] || item.image);
          }

          return {
            id: productId,
            name: productName,
            price: item.price,
            quantity: item.quantity,
            image: productImage,
          };
        }) || [],
        subtotal: order.subtotal || 0,
        shipping: order.shipping || 0,
        gst: order.tax || 0,
        billingAddress: {
          firstName: order.billingAddress?.firstName || '',
          lastName: order.billingAddress?.lastName || '',
          email: order.billingAddress?.email || order.user?.email || '',
          phone: order.billingAddress?.phone || order.user?.phone || '',
          streetAddress: order.billingAddress?.streetAddress || order.billingAddress?.street || '',
          country: order.billingAddress?.country || '',
          state: order.billingAddress?.state || '',
          zipCode: order.billingAddress?.zipCode || order.billingAddress?.postalCode || '',
          companyName: order.billingAddress?.companyName || '',
        },
      }));
      setOrders(mappedOrders);
    } catch (error) {
      console.error('Failed to load orders', error);
    } finally {
      setLoading(false);
    }
  };

  const mapOrderStatus = (status: string) => {
    const statusMap: Record<string, Order['status']> = {
      'pending': 'Order received',
      'processing': 'Processing',
      'confirmed': 'Processing',
      'shipped': 'On the way',
      'delivered': 'Delivered',
      'cancelled': 'cancelled',
    };
    return statusMap[status] || 'Order received';
  };

  const refreshOrders = async () => {
    if (user) {
      await loadOrders();
    }
  };

  const addOrder = async (orderData: CreateOrderData) => {
    if (!user) {
      alert('Please login to place an order');
      return;
    }

    try {
      console.log('Creating order with data:', orderData);
      console.log('User billing address:', billingAddress);
      
      // Validate shipping address exists
      if (!orderData.shippingAddress) {
        throw new Error('Shipping address is required');
      }
      
      // Check if billing address is populated in UserContext
      const hasBillingAddress = billingAddress.firstName && 
                               billingAddress.lastName && 
                               billingAddress.email && 
                               billingAddress.phone;
      
      // Only merge billing address if it's populated, otherwise let orderService handle it
      let completeOrderData = orderData;
      
      if (hasBillingAddress) {
        // Merge billing address into order data with proper field mapping
        completeOrderData = {
          ...orderData,
          currency: currency, // Add currency to order
          billingAddress: {
            firstName: billingAddress.firstName,
            lastName: billingAddress.lastName,
            email: billingAddress.email,
            phone: billingAddress.phone,
            streetAddress: orderData.shippingAddress.street,
            country: orderData.shippingAddress.country,
            state: orderData.shippingAddress.state,
            zipCode: orderData.shippingAddress.postalCode,
            companyName: billingAddress.companyName || ''
          }
        };
      } else {
        // Add currency even if billing address is not set
        completeOrderData = {
          ...orderData,
          currency: currency
        };
      }

      console.log('Complete order data:', completeOrderData);
      
      await orderService.createOrder(completeOrderData);
      await loadOrders();
      
      // Show notification
      setNotificationMessage(`Order placed successfully!`);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error: unknown) {
      console.error('Failed to create order', error);
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('Error response:', (error as { response?: { data?: unknown } }).response?.data);
      }
      throw error;
    }
  };

  const getOrderById = (id: number | string): Order | undefined => {
    return orders.find(order => String(order.id) === String(id));
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        addOrder,
        getOrderById,
        refreshOrders,
        showNotification,
        notificationMessage,
        hideNotification
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
