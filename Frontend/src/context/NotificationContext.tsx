import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';

export interface Notification {
  id: string;
  type: 'order' | 'product' | 'payment' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: 'success' | 'error' | 'warning' | 'info';
  createdAt: Date;
}

interface OrderData {
  _id: string;
  orderId: string;
  createdAt: string;
  billingAddress?: {
    firstName?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'time' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      time: 'Just now',
      createdAt: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const refreshNotifications = useCallback(async () => {
    // Only fetch notifications on admin routes
    const currentPath = window.location.pathname;
    if (!currentPath.startsWith('/admin')) {
      return;
    }
    
    try {
      // Fetch recent orders to generate notifications
      const ordersResponse = await adminService.getAllOrders({ page: 1, limit: 10 });
      
      if (ordersResponse.success && ordersResponse.data) {
        const recentOrders = ordersResponse.data.slice(0, 5);
        const orderNotifications: Notification[] = recentOrders.map((order: OrderData, index: number) => ({
          id: `order-${order._id}`,
          type: 'order' as const,
          title: 'New Order Received',
          message: `Order ${order.orderId} from ${order.billingAddress?.firstName || 'Customer'}`,
          time: getTimeAgo(new Date(order.createdAt)),
          read: index >= 3, // First 3 are unread
          icon: 'info' as const,
          createdAt: new Date(order.createdAt),
        }));

        setNotifications(orderNotifications);
      }
    } catch (error) {
      console.error('Failed to refresh notifications:', error);
    }
  }, []);

  // Poll for new orders every 30 seconds (only on admin routes)
  useEffect(() => {
    const currentPath = window.location.pathname;
    
    // Only set up polling on admin routes
    if (currentPath.startsWith('/admin')) {
      refreshNotifications();
      const interval = setInterval(refreshNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [refreshNotifications]);

  // Update time ago every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => 
        prev.map(n => ({
          ...n,
          time: getTimeAgo(n.createdAt),
        }))
      );
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
