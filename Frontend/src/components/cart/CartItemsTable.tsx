import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItemRow from './CartItemRow';

const CartItemsTable: React.FC = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="border border-border-color rounded-lg p-12 text-center">
        <p className="text-xl text-text-muted mb-4">Your cart is empty</p>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="border border-border-color rounded-lg">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Subtotal</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-color">
          {cartItems.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      <div className="p-6 flex justify-between items-center">
        <button 
          onClick={() => navigate('/shop')}
          className="bg-gray-100 text-text-dark font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
        >
          Return to shop
        </button>
      </div>
    </div>
  );
};

export default CartItemsTable;
