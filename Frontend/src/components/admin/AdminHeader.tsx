import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, Package, ShoppingBag, DollarSign, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import ARLogo from '../../assets/AR Logo.png';
import { useCurrency } from '../../context/CurrencyContext';

interface Notification {
  id: number;
  type: 'order' | 'product' | 'payment' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: 'success' | 'error' | 'warning' | 'info';
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-2024-156 from John Doe',
      time: '2 minutes ago',
      read: false,
      icon: 'info'
    },
    {
      id: 2,
      type: 'product',
      title: 'Low Stock Alert',
      message: 'Fresh Tomatoes stock is running low (5 units left)',
      time: '15 minutes ago',
      read: false,
      icon: 'warning'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $450.00 received for Order #ORD-2024-155',
      time: '1 hour ago',
      read: false,
      icon: 'success'
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Shipped',
      message: 'Order #ORD-2024-154 has been shipped successfully',
      time: '2 hours ago',
      read: true,
      icon: 'success'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'New features added to the admin panel',
      time: '3 hours ago',
      read: true,
      icon: 'info'
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Cancelled',
      message: 'Order #ORD-2024-153 has been cancelled by customer',
      time: '5 hours ago',
      read: true,
      icon: 'error'
    }
  ]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string, iconType: string) => {
    if (iconType === 'success') {
      return <CheckCircle2 size={16} className="text-primary" />;
    } else if (iconType === 'error') {
      return <XCircle size={16} className="text-sale" />;
    } else if (iconType === 'warning') {
      return <AlertCircle size={16} className="text-warning" />;
    } else {
      switch (type) {
        case 'order':
          return <ShoppingBag size={16} className="text-primary" />;
        case 'product':
          return <Package size={16} className="text-primary" />;
        case 'payment':
          return <DollarSign size={16} className="text-primary" />;
        default:
          return <Bell size={16} className="text-primary" />;
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg transition-colors relative" 
        title="Notifications"
      >
        <Bell size={18} className="text-text-dark-gray" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-sale rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[380px] bg-white border border-border-color rounded-lg shadow-xl z-[100]">
          {/* Header */}
          <div className="p-4 border-b border-border-color flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text-dark text-sm">Notifications</h3>
              <p className="text-xs text-text-muted mt-0.5">
                You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 border-b border-border-color transition-colors cursor-pointer ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification.icon === 'success' ? 'bg-primary/10' :
                    notification.icon === 'error' ? 'bg-sale/10' :
                    notification.icon === 'warning' ? 'bg-warning/10' :
                    'bg-primary/10'
                  }`}>
                    {getNotificationIcon(notification.type, notification.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-text-dark">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-text-muted mt-1.5">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border-color">
            <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors py-1">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CurrencyDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCurrency = (selectedCurrency: 'USD' | 'INR') => {
    setCurrency(selectedCurrency);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer transition-colors text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-text-dark font-medium">{currency}</span>
        <ChevronDown size={14} className={`text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-border-color rounded-lg shadow-lg py-1 min-w-[80px] z-[100]">
          <button
            onClick={() => handleSelectCurrency('INR')}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              currency === 'INR' ? 'text-primary font-medium' : 'text-text-dark-gray'
            }`}
          >
            ₹ INR
          </button>
          <button
            onClick={() => handleSelectCurrency('USD')}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              currency === 'USD' ? 'text-primary font-medium' : 'text-text-dark-gray'
            }`}
          >
            $ USD
          </button>
        </div>
      )}
    </div>
  );
};

interface AdminHeaderProps {
  hideUserGreeting?: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ hideUserGreeting = false }) => {
  return (
    <header className="bg-white border-b border-border-color sticky top-0 z-50">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={ARLogo} alt="AgroReach Logo" className="h-6" />
            <div className="h-6 w-px bg-border-color"></div>
            <span className="text-base font-semibold text-text-dark">Agroreach Admin</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                placeholder="Search or type a command..."
                className="w-full pl-10 pr-4 py-1.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors text-sm text-text-dark placeholder:text-text-muted"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <CurrencyDropdown />
            <NotificationDropdown />
            {!hideUserGreeting && (
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors" title="User Profile">
                <div className="w-8 h-8 bg-primary/5 rounded-full flex items-center justify-center">
                  <User size={15} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-text-dark">Hi Aaditya</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
