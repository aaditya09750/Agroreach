import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Download, Eye, ChevronDown, MoreVertical, X, Package, User, Mail, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
import { BsBag, BsClock, BsCheckCircle, BsCurrencyDollar, BsCurrencyRupee } from 'react-icons/bs';
import { useCurrency } from '../../context/CurrencyContext';

const AdminOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const actionMenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { getCurrencySymbol, currency } = useCurrency();

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
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

  const [ordersData, setOrdersData] = useState([
    {
      id: 'ORD-2024-001',
      customer: 'Johnson D.',
      email: 'johnson.d@email.com',
      phone: '+1 234-567-8900',
      date: 'Oct 23, 2025',
      total: '1,245.00',
      status: 'completed',
      items: 3,
      shippingAddress: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      paymentMethod: 'Credit Card',
      products: [
        { name: 'Organic Tomatoes', quantity: 2, price: '125.00', image: '/path/to/image1.jpg' },
        { name: 'Fresh Lettuce', quantity: 5, price: '450.00', image: '/path/to/image2.jpg' },
        { name: 'Green Peppers', quantity: 3, price: '670.00', image: '/path/to/image3.jpg' }
      ]
    },
    {
      id: 'ORD-2024-002',
      customer: 'Didinya J.',
      email: 'didinya.j@email.com',
      phone: '+1 234-567-8901',
      date: 'Oct 22, 2025',
      total: '890.50',
      status: 'processing',
      items: 2,
      shippingAddress: {
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
        country: 'USA'
      },
      paymentMethod: 'PayPal',
      products: [
        { name: 'Organic Carrots', quantity: 4, price: '340.50', image: '/path/to/image4.jpg' },
        { name: 'Fresh Spinach', quantity: 3, price: '550.00', image: '/path/to/image5.jpg' }
      ]
    },
    {
      id: 'ORD-2024-003',
      customer: 'Penny L.',
      email: 'penny.l@email.com',
      phone: '+1 234-567-8902',
      date: 'Oct 22, 2025',
      total: '2,150.00',
      status: 'pending',
      items: 5,
      shippingAddress: {
        street: '789 Pine Road',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        country: 'USA'
      },
      paymentMethod: 'Debit Card',
      products: [
        { name: 'Organic Apples', quantity: 10, price: '500.00', image: '/path/to/image6.jpg' },
        { name: 'Fresh Oranges', quantity: 8, price: '650.00', image: '/path/to/image7.jpg' },
        { name: 'Bananas', quantity: 5, price: '250.00', image: '/path/to/image8.jpg' },
        { name: 'Strawberries', quantity: 3, price: '450.00', image: '/path/to/image9.jpg' },
        { name: 'Blueberries', quantity: 2, price: '300.00', image: '/path/to/image10.jpg' }
      ]
    },
    {
      id: 'ORD-2024-004',
      customer: 'Elon M.',
      email: 'elon.m@email.com',
      phone: '+1 234-567-8903',
      date: 'Oct 21, 2025',
      total: '675.25',
      status: 'completed',
      items: 1,
      shippingAddress: {
        street: '321 Elm Street',
        city: 'Austin',
        state: 'TX',
        zip: '73301',
        country: 'USA'
      },
      paymentMethod: 'Credit Card',
      products: [
        { name: 'Organic Cucumbers', quantity: 6, price: '675.25', image: '/path/to/image11.jpg' }
      ]
    },
    {
      id: 'ORD-2024-005',
      customer: 'Sarah K.',
      email: 'sarah.k@email.com',
      phone: '+1 234-567-8904',
      date: 'Oct 21, 2025',
      total: '1,530.00',
      status: 'cancelled',
      items: 4,
      shippingAddress: {
        street: '654 Maple Drive',
        city: 'Miami',
        state: 'FL',
        zip: '33101',
        country: 'USA'
      },
      paymentMethod: 'Cash on Delivery',
      products: [
        { name: 'Fresh Broccoli', quantity: 3, price: '380.00', image: '/path/to/image12.jpg' },
        { name: 'Organic Potatoes', quantity: 5, price: '450.00', image: '/path/to/image13.jpg' },
        { name: 'Sweet Corn', quantity: 4, price: '400.00', image: '/path/to/image14.jpg' },
        { name: 'Green Beans', quantity: 2, price: '300.00', image: '/path/to/image15.jpg' }
      ]
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrdersData(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setOpenActionMenu(null);
  };

  const handleViewOrder = (order: typeof ordersData[0]) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const orders = ordersData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/10 text-primary';
      case 'processing':
        return 'bg-warning/10 text-warning';
      case 'pending':
        return 'bg-gray-200 text-text-dark-gray';
      case 'cancelled':
        return 'bg-sale/10 text-sale';
      default:
        return 'bg-gray-200 text-text-dark-gray';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
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
          <h3 className="text-xl font-bold text-text-dark">1,234</h3>
          <p className="text-xs text-primary mt-1">↑ 12% from last month</p>
        </div>

        <div id="pending-orders-section" className="bg-white p-5 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Pending</p>
            <div className="w-9 h-9  rounded-lg flex items-center justify-center">
              <BsClock className="w-6 h-6 text-warning" strokeWidth={0.5} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-dark">45</h3>
          <p className="text-xs text-text-muted mt-1">Awaiting processing</p>
        </div>

        <div id="completed-orders-section" className="bg-white p-5 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Completed</p>
            <div className="w-9 h-9  rounded-lg flex items-center justify-center">
              <BsCheckCircle className="w-6 h-6 text-primary" strokeWidth={0.5} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-dark">1,087</h3>
          <p className="text-xs text-primary mt-1">↑ 8% from last month</p>
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
          <h3 className="text-xl font-bold text-text-dark">{getCurrencySymbol()}1.2M</h3>
          <p className="text-xs text-primary mt-1">↑ 15% from last month</p>
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
        <div className="overflow-x-auto">
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
                  key={order.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleViewOrder(order)}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-primary">{order.id}</span>
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
                        
                        {openActionMenu === order.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-border-color rounded-lg shadow-lg z-20">
                            <div className="py-1">
                              <button
                                onClick={() => updateOrderStatus(order.id, 'pending')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'pending' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Pending
                              </button>
                              
                              <button
                                onClick={() => updateOrderStatus(order.id, 'processing')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'processing' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Processing
                              </button>
                              
                              <button
                                onClick={() => updateOrderStatus(order.id, 'shipped')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'shipped' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Shipped
                              </button>
                              
                              <button
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'completed' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Completed
                              </button>
                              
                              <button
                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                  order.status === 'cancelled' ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                Cancelled
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
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-border-color flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing <span className="font-medium text-text-dark">1-5</span> of{' '}
            <span className="font-medium text-text-dark">1,234</span> orders
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors">
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
                  {selectedOrder.products.map((product: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package size={24} className="text-text-muted" />
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
                      updateOrderStatus(selectedOrder.id, 'pending');
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
                      updateOrderStatus(selectedOrder.id, 'processing');
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
                      updateOrderStatus(selectedOrder.id, 'shipped');
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
                      updateOrderStatus(selectedOrder.id, 'completed');
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
                      updateOrderStatus(selectedOrder.id, 'cancelled');
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
