import React, { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import { Users, Mail, Phone, Calendar, ShoppingBag, IndianRupee, Eye, Trash2, RefreshCw } from 'lucide-react';

interface CustomerOrder {
  _id: string;
  orderId: string;
  total: number;
  status: string;
  createdAt: string;
}

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: string;
  orders?: CustomerOrder[];
  totalOrders?: number;
  totalSpent?: number;
}

const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Memoize loadCustomers to prevent unnecessary re-creation
  const loadCustomers = useCallback(async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      }

      console.log('=== LOADING CUSTOMERS ===');
      console.log('Admin token exists:', !!localStorage.getItem('admin_token'));

      const response = await adminService.getAllUsers();
      console.log('Full API response:', response);
      
      const allUsers = response.data.data || response.data.users || response.data || [];
      console.log('All users length:', allUsers.length);
      
      // Filter out admin users
      const regularCustomers = allUsers.filter((user: Customer) => user.role !== 'admin');
      console.log('Regular customers (non-admin):', regularCustomers.length);

      // Fetch orders for all customers in parallel (optimized)
      const customersWithOrders = await Promise.all(
        regularCustomers.map(async (customer: Customer) => {
          try {
            const ordersResponse = await adminService.getAllOrders({ 
              userId: customer._id,
              limit: 10000 // Get all orders for this user
            });
            
            const orders = ordersResponse.data.data || ordersResponse.data.orders || ordersResponse.data || [];
            const totalOrders = orders.length;
            const totalSpent = orders.reduce((sum: number, order: CustomerOrder) => sum + (order.total || 0), 0);

            return {
              ...customer,
              orders: orders.slice(0, 5), // Only keep last 5 for details modal
              totalOrders,
              totalSpent
            };
          } catch (error) {
            console.error(`Error fetching orders for customer ${customer.email}:`, error);
            return {
              ...customer,
              orders: [],
              totalOrders: 0,
              totalSpent: 0
            };
          }
        })
      );

      setCustomers(customersWithOrders);
      console.log('Successfully loaded customers:', customersWithOrders.length);
    } catch (error) {
      console.error('Error loading customers:', error);
      alert('Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any props/state

  useEffect(() => {
    loadCustomers();

    // Auto-refresh every 30 seconds (silent refresh)
    const interval = setInterval(() => {
      loadCustomers(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [loadCustomers]); // Now loadCustomers is stable

  const handleViewDetails = async (customer: Customer) => {
    try {
      // Fetch full order history when viewing details
      const ordersResponse = await adminService.getAllOrders({ 
        userId: customer._id,
        limit: 10000
      });
      
      const orders = ordersResponse.data.data || ordersResponse.data.orders || ordersResponse.data || [];
      
      setSelectedCustomer({
        ...customer,
        orders: orders // All orders for details view
      });
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      setSelectedCustomer(customer);
      setShowDetailsModal(true);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    const customer = customers.find(c => c._id === customerId);
    const orderCount = customer?.totalOrders || 0;
    
    const confirmMessage = orderCount > 0
      ? `Are you sure you want to delete this customer?\n\nThis will also permanently delete ${orderCount} order(s) associated with this customer.\n\nThis action cannot be undone.`
      : `Are you sure you want to delete this customer?\n\nThis action cannot be undone.`;
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await adminService.deleteUser(customerId);
      const deletedOrders = response.data.deletedOrders || 0;
      
      await loadCustomers();
      
      const successMessage = deletedOrders > 0
        ? `Customer deleted successfully along with ${deletedOrders} order(s).`
        : 'Customer deleted successfully.';
      
      alert(successMessage);
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer');
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  const totalOrders = customers.reduce((sum, customer) => sum + (customer.totalOrders || 0), 0);
  const totalRevenue = customers.reduce((sum, customer) => sum + (customer.totalSpent || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-600 mt-1">Manage and view all customer information</p>
        </div>
        <button
          onClick={() => loadCustomers()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Customers</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">{customers.length}</p>
              <p className="text-green-600 text-sm mt-2">↑ Active users</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">{totalOrders}</p>
              <p className="text-green-600 text-sm mt-2">From all customers</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">₹{totalRevenue.toFixed(2)}</p>
              <p className="text-green-600 text-sm mt-2">↑ 6% from last month</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <IndianRupee className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-medium">
                            {customer.firstName?.[0]?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.firstName} {customer.lastName}
                          </div>
                          <div className="text-xs text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <ShoppingBag className="w-4 h-4 mr-2 text-gray-400" />
                        {customer.totalOrders || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm font-medium text-green-600">
                        ₹{customer.totalSpent?.toFixed(2) || '0.00'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(customer.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewDetails(customer)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showDetailsModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header - Sticky */}
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Customer Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
              {/* Customer Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-medium text-2xl">
                    {selectedCustomer.firstName?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedCustomer.email}</p>
                </div>
              </div>

              {/* Customer Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-xs font-medium">Phone</p>
                  <p className="text-gray-900 font-medium mt-1">{selectedCustomer.phone || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-xs font-medium">Joined Date</p>
                  <p className="text-gray-900 font-medium mt-1">
                    {new Date(selectedCustomer.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-xs font-medium">Total Orders</p>
                  <p className="text-gray-900 font-medium mt-1">{selectedCustomer.totalOrders || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-xs font-medium">Total Spent</p>
                  <p className="text-green-600 font-medium mt-1">₹{selectedCustomer.totalSpent?.toFixed(2) || '0.00'}</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-4">Recent Orders</h4>
                {selectedCustomer.orders && selectedCustomer.orders.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCustomer.orders.map((order) => (
                      <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.orderId}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(order.createdAt).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">₹{order.total.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No orders yet</p>
                )}
              </div>
            </div>

            {/* Modal Footer - Sticky */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
