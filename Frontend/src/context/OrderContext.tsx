import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  date: string;
  total: string;
  status: 'Order received' | 'Processing' | 'On the way' | 'Delivered';
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
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  getOrderById: (id: number) => Order | undefined;
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.floor(Math.random() * 9000) + 1000, // Generate random order ID
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'Order received'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    // Show notification
    setNotificationMessage(`Order #${newOrder.id} placed successfully!`);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const getOrderById = (id: number): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        showNotification,
        notificationMessage,
        hideNotification
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
