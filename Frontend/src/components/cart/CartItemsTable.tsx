import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTranslation } from '../../i18n/useTranslation';
import CartItemRow from './CartItemRow';

const CartItemsTable: React.FC = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (cartItems.length === 0) {
    return (
      <div className="border border-border-color rounded-lg p-12 text-center">
        <p className="text-xl text-text-muted mb-4">{t('cart.empty')}</p>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors"
        >
          {t('cart.continueShopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="border border-border-color rounded-lg">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">{t('cart.product')}</th>
            <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">{t('cart.price')}</th>
            <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">{t('cart.quantity')}</th>
            <th className="px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">{t('cart.subtotal')}</th>
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
          {t('cart.returnToShop')}
        </button>
      </div>
    </div>
  );
};

export default CartItemsTable;
