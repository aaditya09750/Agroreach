import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../context/OrderContext';
import { useCurrency } from '../../context/CurrencyContext';
import OrderProgressTracker from './OrderProgressTracker';

interface AddressInfoProps {
  title: string;
  address: {
    firstName: string;
    lastName: string;
    streetAddress: string;
    email: string;
    phone: string;
    state?: string;
    zipCode?: string;
    companyName?: string;
  };
}

const AddressInfo: React.FC<AddressInfoProps> = ({ title, address }) => (
    <div className="md:px-6">
        <h4 className="text-sm font-medium text-text-nav uppercase tracking-wider mb-4">{title}</h4>
        <div className="space-y-3">
            <p className="text-base font-medium text-text-dark">{address.firstName} {address.lastName}</p>
            {address.companyName && <p className="text-sm text-text-dark-gray">{address.companyName}</p>}
            <p className="text-sm text-text-dark-gray">
              {address.streetAddress}
              {address.state && `, ${address.state}`}
              {address.zipCode && ` ${address.zipCode}`}
            </p>
            <p className="text-sm text-text-dark-gray">Email: {address.email}</p>
            <p className="text-sm text-text-dark-gray">Phone: {address.phone}</p>
        </div>
    </div>
);


const OrderDetailContent: React.FC<{ order: Order }> = ({ order }) => {
  const productCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const currencySymbol = getCurrencySymbol();
  
  console.log('OrderDetailContent - order:', order);
  console.log('OrderDetailContent - items:', order.items);
  console.log('OrderDetailContent - item images:', order.items.map(item => ({ name: item.name, image: item.image })));
  
  return (
    <div className="border border-border-color rounded-lg">
      <div className="p-6 flex flex-wrap justify-between items-center border-b border-border-color gap-4">
        <div className="flex items-center gap-4 text-sm text-text-dark-gray">
          <h3 className="text-xl font-medium text-text-dark">Order Details</h3>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">{order.date}</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">{productCount} Product{productCount > 1 ? 's' : ''}</span>
        </div>
        <Link to="/order-history" className="text-base font-medium text-primary whitespace-nowrap">
          Back to List
        </Link>
      </div>

      <div className="p-6 space-y-8">
        <div className="border border-border-color rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-border-color">
            <AddressInfo title="Billing Address" address={order.billingAddress} />
            <AddressInfo title="Shipping Address" address={order.billingAddress} />
        </div>

        <OrderProgressTracker currentStatus={order.status} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-border-color rounded-lg">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-text-light uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-xs font-medium text-text-light uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-xs font-medium text-text-light uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-xs font-medium text-text-light uppercase tracking-wider text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-contain rounded-md border border-gray-200" 
                          onError={(e) => {
                            console.error('Image failed to load:', item.image);
                            e.currentTarget.src = 'https://via.placeholder.com/64?text=No+Image';
                          }}
                        />
                        <span className="text-sm font-medium text-text-dark">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">{currencySymbol}{convertPrice(item.price).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">x{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark text-right">{currencySymbol}{convertPrice(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border border-border-color rounded-lg h-fit">
            <div className="p-4 border-b border-border-color flex justify-between">
              <div>
                <p className="text-xs text-text-muted uppercase">Order ID:</p>
                <p className="text-sm font-medium text-text-dark">{order.orderId || `#${order._id || order.id}`}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase">Payment Method:</p>
                <p className="text-sm font-medium text-text-dark">Cash on Delivery</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-dark-gray">Subtotal:</span>
                <span className="font-medium text-text-dark">{currencySymbol}{convertPrice(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-dark-gray">GST (18%):</span>
                <span className="font-medium text-text-dark">{currencySymbol}{convertPrice(order.gst).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-dark-gray">Shipping:</span>
                <span className="font-medium text-text-dark">
                  {order.shipping === 0 ? 'Free' : `${currencySymbol}${convertPrice(order.shipping).toFixed(2)}`}
                </span>
              </div>
              <hr className="border-border-color my-2" />
              <div className="flex justify-between text-base">
                <span className="font-medium text-text-dark">Total:</span>
                <span className="font-semibold text-primary">{currencySymbol}{convertPrice(order.subtotal + order.gst + order.shipping).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailContent;
