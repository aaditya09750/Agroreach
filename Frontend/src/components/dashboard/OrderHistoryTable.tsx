import React from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { useCurrency } from '../../context/CurrencyContext';

const OrderHistoryTable: React.FC = () => {
  const { orders } = useOrder();
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const currencySymbol = getCurrencySymbol();
  
  // Show only the most recent 5 orders
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="border border-border-color rounded-lg">
      <div className="p-6 flex justify-between items-center">
        <h3 className="text-xl font-medium text-text-dark">Recent Order History</h3>
        <Link to="/order-history" className="text-base font-medium text-primary">
          View All
        </Link>
      </div>
      {recentOrders.length > 0 ? (
        <div className="overflow-x-auto scrollbar-hide">
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
              {recentOrders.map((order) => {
                // Extract numeric value from total string (e.g., "$856.68" -> 856.68)
                const numericTotal = parseFloat(order.total.replace(/[^0-9.-]+/g, ''));
                const convertedTotal = convertPrice(numericTotal);
                
                return (
                  <tr key={order._id || order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">
                      {order.orderId || `#${order._id || order.id}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">
                      {currencySymbol}{convertedTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/dashboard/order/${order._id || order.id}`} className="text-primary hover:text-green-700">
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-text-muted">No orders yet. Start shopping to see your order history!</p>
          <Link 
            to="/shop" 
            className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryTable;
