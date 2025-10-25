import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Download, Eye, ChevronDown, MoreVertical, X, Package, User, Mail, Phone, MapPin, Calendar, CreditCard, Trash2 } from 'lucide-react';
import { BsBag, BsClock, BsCheckCircle, BsCurrencyDollar, BsCurrencyRupee } from 'react-icons/bs';
import { useCurrency } from '../../context/CurrencyContext';
import { useNotifications } from '../../context/NotificationContext';
import { adminService } from '../../services/adminService';
import { getImageUrl } from '../../utils/imageUtils';

interface OrderProduct {
  name: string;
  quantity: number;
  price: string;
  image: string;
}

interface OrderData {
  id: string;
  _id: string;
  orderId: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  total: string;
  status: string;
  items: number;
  shippingAddress: {
    street: string;
    city?: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  products: OrderProduct[];
}

const AdminOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [ordersData, setOrdersData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [ordersPerPage] = useState(10);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    totalOrdersGrowth: 0,
    completedOrdersGrowth: 0,
    revenueGrowth: 0
  });
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const actionMenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { getCurrencySymbol, currency } = useCurrency();
  const { refreshNotifications, addNotification } = useNotifications();

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
      
      // Close action menu if clicked outside
      const clickedOutsideAllMenus = Object.values(actionMenuRefs.current).every(
        ref => !ref || !ref.contains(event.target as Node)
      );
      if (clickedOutsideAllMenus) {
        setOpenActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchQuery]);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const params: { status?: string; search?: string; page?: number; limit?: number } = {
          page: currentPage,
          limit: ordersPerPage
        };
        
        if (filterStatus !== 'all') {
          // Map frontend filter status to backend status
          const backendStatusMap: { [key: string]: string } = {
            'pending': 'pending',
            'processing': 'processing',
            'shipped': 'shipped',
            'completed': 'delivered', // Frontend "completed" = Backend "delivered"
            'cancelled': 'cancelled'
          };
          params.status = backendStatusMap[filterStatus] || filterStatus;
        }
        
        if (searchQuery) {
          params.search = searchQuery;
        }

        const response = await adminService.getAllOrders(params);
        
        console.log('Admin orders response:', response);
        
        if (response.success && response.data) {
          // Map backend status to frontend status
          const mapBackendStatusToFrontend = (backendStatus: string): string => {
            const statusMap: { [key: string]: string } = {
              'pending': 'pending',
              'processing': 'processing',
              'shipped': 'shipped',
              'delivered': 'completed', // Backend "delivered" shows as "completed" in frontend
              'cancelled': 'cancelled'
            };
            return statusMap[backendStatus] || backendStatus;
          };

          // Transform backend data to match frontend format
          const transformedOrders: OrderData[] = response.data.map((order: {
            _id: string;
            orderId: string;
            user: { firstName: string; lastName: string; email: string };
            billingAddress: {
              firstName: string;
              lastName: string;
              email: string;
              phone: string;
              streetAddress: string;
              city?: string;
              state: string;
              zipCode: string;
              country: string;
            };
            createdAt: string;
            total: number;
            status: string;
            items: Array<{
              product: { _id: string; name: string; images?: string[] };
              name: string;
              price: number;
              quantity: number;
              image?: string;
            }>;
            paymentMethod: string;
          }) => ({
            id: order._id,
            _id: order._id,
            orderId: order.orderId,
            customer: `${order.billingAddress.firstName} ${order.billingAddress.lastName}`,
            email: order.billingAddress.email || order.user?.email || '',
            phone: order.billingAddress.phone || '',
            date: new Date(order.createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            }),
            total: order.total.toFixed(2),
            status: mapBackendStatusToFrontend(order.status), // Map backend status to frontend
            items: order.items.length,
            shippingAddress: {
              street: order.billingAddress.streetAddress,
              city: order.billingAddress.city,
              state: order.billingAddress.state,
              zip: order.billingAddress.zipCode,
              country: order.billingAddress.country,
            },
            paymentMethod: order.paymentMethod,
            products: order.items.map(item => ({
              name: item.product?.name || item.name,
              quantity: item.quantity,
              price: item.price.toFixed(2),
              image: getImageUrl(item.product?.images?.[0] || item.image),
            })),
          }));
          
          setOrdersData(transformedOrders);
          
          // Set pagination data
          if (response.pagination) {
            setTotalOrders(response.pagination.total);
            setTotalPages(response.pagination.totalPages);
          }
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filterStatus, searchQuery, currentPage, ordersPerPage]);

  // Fetch order statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all orders to calculate stats (without pagination for stats)
        const allOrdersResponse = await adminService.getAllOrders({ limit: 10000 });
        
        if (allOrdersResponse.success && allOrdersResponse.data) {
          const orders = allOrdersResponse.data;
          
          // Calculate total orders
          const total = orders.length;
          
          // Calculate pending orders (status: pending)
          const pending = orders.filter((order: { status: string }) => order.status === 'pending').length;
          
          // Calculate completed orders (status: delivered in backend)
          const completed = orders.filter((order: { status: string }) => order.status === 'delivered').length;
          
          // Calculate total revenue
          const revenue = orders.reduce((sum: number, order: { total: number }) => sum + order.total, 0);
          
          // Calculate growth percentages (mock data for now - would need historical data)
          // In a real app, you'd compare with last month's data from the backend
          const totalGrowth = Math.floor(Math.random() * 20); // Mock: 0-20%
          const completedGrowth = Math.floor(Math.random() * 15); // Mock: 0-15%
          const revenueGrowth = Math.floor(Math.random() * 25); // Mock: 0-25%
          
          setStats({
            totalOrders: total,
            pendingOrders: pending,
            completedOrders: completed,
            totalRevenue: revenue,
            totalOrdersGrowth: totalGrowth,
            completedOrdersGrowth: completedGrowth,
            revenueGrowth: revenueGrowth
          });
        }
      } catch (error) {
        console.error('Failed to fetch order stats:', error);
      }
    };

    fetchStats();
    
    // Refresh stats every minute
    const interval = setInterval(fetchStats, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Listen for filter events from sidebar
  useEffect(() => {
    const handleFilterEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      const filter = customEvent.detail.filter;
      setFilterStatus(filter);
    };

    window.addEventListener('applyOrderFilter', handleFilterEvent);

    return () => {
      window.removeEventListener('applyOrderFilter', handleFilterEvent);
    };
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      // Map frontend status to backend status
      const backendStatus = newStatus === 'completed' ? 'delivered' : newStatus;
      
      console.log('Updating order status:', { orderId, newStatus, backendStatus });
      
      const response = await adminService.updateOrderStatus(orderId, backendStatus);
      
      console.log('Status update response:', response);
      
      // Update local state with the frontend status
      setOrdersData(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setOpenActionMenu(null);
      
      // Add notification for status update
      addNotification({
        type: 'order',
        title: 'Order Status Updated',
        message: `Order #${orderId.slice(-8)} status changed to ${newStatus}`,
        read: false,
        icon: 'success'
      });
      
      // Refresh notifications to get latest orders
      refreshNotifications();
      
      // Update stats based on status change
      setStats(prevStats => {
        let pendingDelta = 0;
        let completedDelta = 0;
        
        // Calculate the change in pending orders
        const oldStatus = ordersData.find(o => o._id === orderId)?.status;
        if (oldStatus === 'pending' && newStatus !== 'pending') {
          pendingDelta = -1;
        } else if (oldStatus !== 'pending' && newStatus === 'pending') {
          pendingDelta = 1;
        }
        
        // Calculate the change in completed orders
        if (oldStatus === 'completed' && newStatus !== 'completed') {
          completedDelta = -1;
        } else if (oldStatus !== 'completed' && newStatus === 'completed') {
          completedDelta = 1;
        }
        
        return {
          ...prevStats,
          pendingOrders: prevStats.pendingOrders + pendingDelta,
          completedOrders: prevStats.completedOrders + completedDelta
        };
      });
      
      // Show success message
      alert('Order status updated successfully!');
    } catch (error) {
      console.error('Failed to update order status:', error);
      
      // Add error notification
      addNotification({
        type: 'system',
        title: 'Order Update Failed',
        message: 'Failed to update order status. Please try again.',
        read: false,
        icon: 'error'
      });
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        alert(axiosError.response?.data?.message || 'Failed to update order status. Please try again.');
      } else {
        alert('Failed to update order status. Please try again.');
      }
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }

    try {
      await adminService.deleteOrder(orderId);
      
      // Remove order from local state
      const deletedOrder = ordersData.find(o => o._id === orderId);
      setOrdersData(prevOrders => prevOrders.filter(order => order._id !== orderId));
      setOpenActionMenu(null);
      
      // Update stats
      setStats(prevStats => {
        const updates: Partial<typeof prevStats> = {
          totalOrders: prevStats.totalOrders - 1
        };
        
        if (deletedOrder?.status === 'pending') {
          updates.pendingOrders = prevStats.pendingOrders - 1;
        } else if (deletedOrder?.status === 'completed') {
          updates.completedOrders = prevStats.completedOrders - 1;
        }
        
        if (deletedOrder?.total) {
          updates.totalRevenue = prevStats.totalRevenue - parseFloat(deletedOrder.total);
        }
        
        return { ...prevStats, ...updates };
      });
      
      // Update total orders count
      setTotalOrders(prev => prev - 1);
      
      // Add success notification
      addNotification({
        type: 'order',
        title: 'Order Deleted',
        message: `Order #${orderId.slice(-8)} has been deleted successfully`,
        read: false,
        icon: 'success'
      });
      
      // Refresh notifications
      refreshNotifications();
      
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Failed to delete order:', error);
      
      // Add error notification
      addNotification({
        type: 'system',
        title: 'Delete Failed',
        message: 'Failed to delete order. Please try again.',
        read: false,
        icon: 'error'
      });
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        alert(axiosError.response?.data?.message || 'Failed to delete order. Please try again.');
      } else {
        alert('Failed to delete order. Please try again.');
      }
    }
  };

  const handleViewOrder = (order: OrderData) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const orders = ordersData;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-primary/10 text-primary';
      case 'processing':
      case 'confirmed':
        return 'bg-warning/10 text-warning';
      case 'pending':
        return 'bg-gray-200 text-text-dark-gray';
      case 'cancelled':
        return 'bg-sale/10 text-sale';
      case 'shipped':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-200 text-text-dark-gray';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-dark">Shop Orders</h1>
          <p className="text-sm text-text-muted mt-1">Manage and track all customer orders</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Stats Cards */}
      <div id="all-orders-section" className="grid grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Total Orders</p>
            <div className="w-9 h-9  rounded-lg flex items-center justify-center">
              <BsBag className="w-6 h-6 text-primary" strokeWidth={0.5} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-dark">{stats.totalOrders.toLocaleString()}</h3>
          <p className="text-xs text-primary mt-1">↑ {stats.totalOrdersGrowth}% from last month</p>
        </div>

        <div id="pending-orders-section" className="bg-white p-5 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Pending</p>
            <div className="w-9 h-9  rounded-lg flex items-center justify-center">
              <BsClock className="w-6 h-6 text-warning" strokeWidth={0.5} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-dark">{stats.pendingOrders}</h3>
          <p className="text-xs text-text-muted mt-1">Awaiting processing</p>
        </div>

        <div id="completed-orders-section" className="bg-white p-5 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Completed</p>
            <div className="w-9 h-9  rounded-lg flex items-center justify-center">
              <BsCheckCircle className="w-6 h-6 text-primary" strokeWidth={0.5} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-dark">{stats.completedOrders.toLocaleString()}</h3>
          <p className="text-xs text-primary mt-1">↑ {stats.completedOrdersGrowth}% from last month</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Revenue</p>
            <div className="w-9 h-9  rounded-lg flex items-center justify-center">
              {currency === 'USD' ? (
                <BsCurrencyDollar className="w-6 h-6 text-primary" strokeWidth={0.5} />
              ) : (
                <BsCurrencyRupee className="w-6 h-6 text-primary" strokeWidth={0.5} />
              )}
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-dark">
            {getCurrencySymbol()}{(stats.totalRevenue / 1000).toFixed(1)}K
          </h3>
          <p className="text-xs text-primary mt-1">↑ {stats.revenueGrowth}% from last month</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-border-color">
        {/* Table Header with Filters */}
        <div className="p-6 border-b border-border-color">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative" ref={statusDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors"
                >
                  <span>{statusOptions.find(opt => opt.value === filterStatus)?.label}</span>
                  <ChevronDown size={16} />
                </button>
                {showStatusDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-border-color rounded-lg shadow-lg z-10">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setFilterStatus(option.value);
                          setShowStatusDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          filterStatus === option.value ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto overflow-y-visible">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-sm text-text-muted mt-4">Loading orders...</p>
              </div>
            </div>
          ) : ordersData.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Package size={48} className="mx-auto text-text-muted mb-4" />
                <p className="text-lg font-medium text-text-dark">No orders found</p>
                <p className="text-sm text-text-muted mt-2">
                  {searchQuery || filterStatus !== 'all' 
                    ? 'Try adjusting your filters' 
                    : 'No orders have been placed yet'}
                </p>
              </div>
            </div>
          ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border-color">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredOrders.map((order) => (
                <tr 
                  key={order._id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleViewOrder(order)}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-primary">{order.orderId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {order.customer.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-text-dark">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-dark-gray">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-text-dark-gray">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-medium text-text-dark">{getCurrencySymbol()}{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewOrder(order);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="View order details"
                      >
                        <Eye size={18} className="text-text-dark-gray" />
                      </button>
                      
                      {/* Action Dropdown Menu */}
                      <div 
                        className="relative"
                        ref={(el) => actionMenuRefs.current[order.id] = el}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setOpenActionMenu(openActionMenu === order.id ? null : order.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Update status"
                        >
                          <MoreVertical size={18} className="text-text-dark-gray" />
                        </button>
                        
                        {openActionMenu === order._id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-border-color rounded-lg shadow-lg z-[9999]">
                            <div className="py-1">
                              <button
                                onClick={() => updateOrderStatus(order._id, 'pending')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'pending' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Pending
                              </button>
                              
                              <button
                                onClick={() => updateOrderStatus(order._id, 'processing')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'processing' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Processing
                              </button>
                              
                              <button
                                onClick={() => updateOrderStatus(order._id, 'shipped')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'shipped' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Shipped
                              </button>
                              
                              <button
                                onClick={() => updateOrderStatus(order._id, 'completed')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'completed' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Completed
                              </button>
                              
                              <button
                                onClick={() => updateOrderStatus(order._id, 'cancelled')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'cancelled' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Cancelled
                              </button>
                              
                              <div className="border-t border-border-color my-1"></div>
                              
                              <button
                                onClick={() => handleDeleteOrder(order._id)}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 transition-colors text-red-600 flex items-center gap-2"
                              >
                                <Trash2 size={14} />
                                Delete Order
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-border-color flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing <span className="font-medium text-text-dark">
              {ordersData.length === 0 ? 0 : (currentPage - 1) * ordersPerPage + 1}-{Math.min(currentPage * ordersPerPage, totalOrders)}
            </span> of{' '}
            <span className="font-medium text-text-dark">{totalOrders}</span> orders
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-border-color rounded-lg text-sm transition-colors ${
                currentPage === 1 
                  ? 'text-text-muted cursor-not-allowed bg-gray-50' 
                  : 'text-text-dark-gray hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-primary text-white'
                      : 'border border-border-color text-text-dark-gray hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-border-color rounded-lg text-sm transition-colors ${
                currentPage === totalPages 
                  ? 'text-text-muted cursor-not-allowed bg-gray-50' 
                  : 'text-text-dark-gray hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeOrderModal}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-border-color px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text-dark">Order Details</h2>
                <p className="text-sm text-text-muted mt-1">{selectedOrder.id}</p>
              </div>
              <button
                onClick={closeOrderModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-text-dark-gray" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-text-muted mb-1">Order Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-muted mb-1">Order Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-text-dark-gray" />
                    <p className="text-sm font-medium text-text-dark">{selectedOrder.date}</p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="border border-border-color rounded-lg p-5">
                <h3 className="text-lg font-semibold text-text-dark mb-4 flex items-center gap-2">
                  <User size={20} className="text-primary" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Name</p>
                    <p className="text-sm font-medium text-text-dark">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Email</p>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-text-dark-gray" />
                      <p className="text-sm text-text-dark">{selectedOrder.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Phone</p>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-text-dark-gray" />
                      <p className="text-sm text-text-dark">{selectedOrder.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Payment Method</p>
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-text-dark-gray" />
                      <p className="text-sm text-text-dark">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border border-border-color rounded-lg p-5">
                <h3 className="text-lg font-semibold text-text-dark mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  Shipping Address
                </h3>
                <div className="text-sm text-text-dark space-y-1">
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}</p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="border border-border-color rounded-lg p-5">
                <h3 className="text-lg font-semibold text-text-dark mb-4 flex items-center gap-2">
                  <Package size={20} className="text-primary" />
                  Order Items ({selectedOrder.items})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((product: OrderProduct, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package size={24} className="text-text-muted" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-text-dark">{product.name}</p>
                          <p className="text-sm text-text-muted">Quantity: {product.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-text-dark">{getCurrencySymbol()}{product.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border border-border-color rounded-lg p-5 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-text-muted">Subtotal</p>
                    <p className="text-sm font-medium text-text-dark">{getCurrencySymbol()}{selectedOrder.total}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-text-muted">Shipping</p>
                    <p className="text-sm font-medium text-text-dark">{getCurrencySymbol()}0.00</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-text-muted">Tax</p>
                    <p className="text-sm font-medium text-text-dark">{getCurrencySymbol()}0.00</p>
                  </div>
                  <div className="border-t border-border-color pt-3 flex items-center justify-between">
                    <p className="text-base font-semibold text-text-dark">Total</p>
                    <p className="text-lg font-bold text-primary">{getCurrencySymbol()}{selectedOrder.total}</p>
                  </div>
                </div>
              </div>

              {/* Update Status Actions */}
              <div className="border border-border-color rounded-lg p-5">
                <h3 className="text-lg font-semibold text-text-dark mb-4">Update Order Status</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder._id, 'pending');
                      setSelectedOrder({ ...selectedOrder, status: 'pending' });
                    }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedOrder.status === 'pending'
                        ? 'bg-gray-500 text-white shadow-md'
                        : 'bg-gray-100 text-text-dark-gray hover:bg-gray-200'
                    }`}
                  >
                    Pending
                  </button>
                  
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder._id, 'processing');
                      setSelectedOrder({ ...selectedOrder, status: 'processing' });
                    }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedOrder.status === 'processing'
                        ? 'bg-warning text-white shadow-md'
                        : 'bg-warning/10 text-warning hover:bg-warning/20'
                    }`}
                  >
                    Processing
                  </button>
                  
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder._id, 'shipped');
                      setSelectedOrder({ ...selectedOrder, status: 'shipped' });
                    }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedOrder.status === 'shipped'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    Shipped
                  </button>
                  
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder._id, 'completed');
                      setSelectedOrder({ ...selectedOrder, status: 'completed' });
                    }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedOrder.status === 'completed'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    Completed
                  </button>
                  
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder._id, 'cancelled');
                      setSelectedOrder({ ...selectedOrder, status: 'cancelled' });
                    }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedOrder.status === 'cancelled'
                        ? 'bg-sale text-white shadow-md'
                        : 'bg-sale/10 text-sale hover:bg-sale/20'
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Print Invoice
                </button>
                <button className="flex-1 px-6 py-3 border border-border-color text-text-dark rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
