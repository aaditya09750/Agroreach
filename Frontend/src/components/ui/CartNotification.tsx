import React, { useEffect } from 'react';
import { Check, X, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartNotification: React.FC = () => {
  const { showNotification, notificationProduct, notificationType, hideNotification } = useCart();

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showNotification, hideNotification]);

  if (!showNotification || !notificationProduct) return null;

  const isRemove = notificationType === 'remove';

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in-right">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 flex items-start gap-4 min-w-[320px] max-w-md">
        <div className={`w-10 h-10 ${isRemove ? 'bg-red-500' : 'bg-primary'} rounded-full flex items-center justify-center flex-shrink-0`}>
          {isRemove ? (
            <Trash2 size={20} className="text-white" />
          ) : (
            <Check size={20} className="text-white" />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-text-dark mb-1">
            {isRemove ? 'Removed from Cart' : 'Added to Cart'}
          </h4>
          <p className="text-sm text-text-muted">
            {isRemove 
              ? `One item has been removed from your cart.`
              : `One item has been added to your cart.`
            }
          </p>
        </div>
        <button
          onClick={hideNotification}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartNotification;
