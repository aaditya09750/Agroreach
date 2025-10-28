import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useUser } from '../../context/UserContext';
import { useOrder } from '../../context/OrderContext';
import { useTranslation } from '../../i18n/useTranslation';
import { ShoppingCart, X } from 'lucide-react';

const EmptyCartNotification: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 800);
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] animate-slide-in-right">
      <div className="bg-white rounded-lg shadow-2xl border border-orange-200 p-4 flex items-start gap-4 min-w-[320px] max-w-md">
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
          <ShoppingCart size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-text-dark mb-1">
            {t('cart.empty')}
          </h4>
          <p className="text-sm text-text-muted">
            {t('cart.emptyMessage')}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

const CartTotal: React.FC = () => {
  const { getCartTotal, cartItems, clearCart } = useCart();
  const { convertPrice, getCurrencySymbol, currency } = useCurrency();
  const { billingAddress } = useUser();
  const { addOrder } = useOrder();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showEmptyCartNotification, setShowEmptyCartNotification] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const subtotal = getCartTotal();
  const convertedSubtotal = convertPrice(subtotal);
  const shipping = 0; // Free shipping
  const gstRate = 0.18; // 18% GST
  const gst = convertedSubtotal * gstRate;
  const total = convertedSubtotal + shipping + gst;
  const currencySymbol = getCurrencySymbol();

  // Check if billing address is saved (at least first name and street address required)
  const hasAddress = billingAddress.firstName && billingAddress.streetAddress;

  const handleCheckout = async (e: React.MouseEvent) => {
    if (cartItems.length === 0) {
      e.preventDefault();
      setShowEmptyCartNotification(true);
      return;
    }

    if (hasAddress && cartItems.length > 0) {
      e.preventDefault();
      
      setIsPlacingOrder(true);
      
      try {
        // Create order with proper format for backend
        await addOrder({
          shippingAddress: {
            street: billingAddress.streetAddress,
            city: billingAddress.state,
            state: billingAddress.state,
            postalCode: billingAddress.zipCode,
            country: billingAddress.country
          },
          paymentMethod: 'Cash on Delivery',
          items: cartItems.map(item => ({
            id: item.id, // orderService will transform to 'product'
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          subtotal: convertedSubtotal,
          shipping,
          tax: gst, // Backend expects 'tax' field
          total, // Add total field required by backend
          currency: currency // Add currency to order
        });

        // Clear cart
        await clearCart();

        // Navigate to order history after a short delay to show notification
        setTimeout(() => {
          navigate('/order-history');
        }, 1000);
      } catch (error) {
        console.error('Failed to place order:', error);
        // Show more specific error message
        const errorMessage = error instanceof Error ? error.message : 'Failed to place order. Please try again.';
        alert(errorMessage);
      } finally {
        setIsPlacingOrder(false);
      }
    }
  };

  return (
    <div className="border border-border-color rounded-lg p-6">
      <h3 className="text-lg font-medium text-text-dark mb-4">{t('cart.cartTotal')}</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-dark-gray">{t('cart.subtotal')}:</span>
          <span className="font-medium text-text-dark">{currencySymbol}{convertedSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-dark-gray">{t('cart.shipping')}:</span>
          <span className="font-medium text-text-dark">{t('cart.free')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-dark-gray">{t('cart.gst')} (18%):</span>
          <span className="font-medium text-text-dark">{currencySymbol}{gst.toFixed(2)}</span>
        </div>
        <hr className="border-border-color !my-4" />
        <div className="flex justify-between text-base">
          <span className="text-text-dark-gray">{t('cart.total')}:</span>
          <span className="font-semibold text-text-dark">{currencySymbol}{total.toFixed(2)}</span>
        </div>
      </div>
      {hasAddress ? (
        <button
          onClick={handleCheckout}
          disabled={isPlacingOrder}
          className="block w-full mt-6 bg-primary text-white text-center font-semibold py-3 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPlacingOrder ? t('cart.placingOrder') : t('cart.placeOrder')}
        </button>
      ) : (
        <Link 
          to="/checkout" 
          onClick={(e) => {
            if (cartItems.length === 0) {
              e.preventDefault();
              setShowEmptyCartNotification(true);
            }
          }}
          className="block w-full mt-6 bg-primary text-white text-center font-semibold py-3 rounded-full hover:bg-opacity-90 transition-colors"
        >
          {t('cart.proceedToCheckout')}
        </Link>
      )}

      {/* Empty Cart Notification */}
      <EmptyCartNotification
        isOpen={showEmptyCartNotification}
        onClose={() => setShowEmptyCartNotification(false)}
      />
    </div>
  );
};

export default CartTotal;
