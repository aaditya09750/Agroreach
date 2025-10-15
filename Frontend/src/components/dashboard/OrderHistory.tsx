import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OrderHistory: React.FC = () => {
  const { orders } = useOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="border border-border-color rounded-lg w-full">
      <div className="p-6">
        <h3 className="text-xl font-medium text-text-dark">Order History</h3>
      </div>
      {orders.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-text-light uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-xs font-medium text-text-light uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-medium text-text-light uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-xs font-medium text-text-light uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/dashboard/order/${order.id}`} className="text-primary font-medium hover:underline">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="p-6 flex justify-center">
              <nav className="flex items-center gap-2">
                <button 
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 flex items-center justify-center rounded-full ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'border border-border-color text-text-dark hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
                      currentPage === index + 1
                        ? 'bg-primary text-white'
                        : 'text-text-light hover:bg-gray-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button 
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 flex items-center justify-center rounded-full ${
                    currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'border border-border-color text-text-dark hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="p-12 text-center">
          <p className="text-lg text-text-muted mb-4">You haven't placed any orders yet.</p>
          <Link 
            to="/shop" 
            className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
