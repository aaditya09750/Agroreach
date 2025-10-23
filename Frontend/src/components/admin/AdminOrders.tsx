import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const AdminOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { getCurrencySymbol } = useCurrency();

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

  const orders = [
    {
      id: 'ORD-2024-001',
      customer: 'Johnson D.',
      date: 'Oct 23, 2025',
      total: '1,245.00',
      status: 'completed',
      items: 3,
    },
    {
      id: 'ORD-2024-002',
      customer: 'Didinya J.',
      date: 'Oct 22, 2025',
      total: '890.50',
      status: 'processing',
      items: 2,
    },
    {
      id: 'ORD-2024-003',
      customer: 'Penny L.',
      date: 'Oct 22, 2025',
      total: '2,150.00',
      status: 'pending',
      items: 5,
    },
    {
      id: 'ORD-2024-004',
      customer: 'Elon M.',
      date: 'Oct 21, 2025',
      total: '675.25',
      status: 'completed',
      items: 1,
    },
    {
      id: 'ORD-2024-005',
      customer: 'Sarah K.',
      date: 'Oct 21, 2025',
      total: '1,530.00',
      status: 'cancelled',
      items: 4,
    },
  ];

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
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-dark">1,234</h3>
          <p className="text-xs text-primary mt-1">↑ 12% from last month</p>
        </div>

        <div id="pending-orders-section" className="bg-white p-5 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Pending</p>
            <div className="w-9 h-9 bg-warning/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-dark">45</h3>
          <p className="text-xs text-text-muted mt-1">Awaiting processing</p>
        </div>

        <div id="completed-orders-section" className="bg-white p-5 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Completed</p>
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-dark">1,087</h3>
          <p className="text-xs text-primary mt-1">↑ 8% from last month</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-text-muted">Revenue</p>
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                title="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

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
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
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
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View order details">
                      <Eye size={18} className="text-text-dark-gray" />
                    </button>
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
    </div>
  );
};

export default AdminOrders;
