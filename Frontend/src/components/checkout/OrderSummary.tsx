import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useUser } from '../../context/UserContext';
import { useOrder } from '../../context/OrderContext';
import { useTranslation } from '../../i18n/useTranslation';
import RadioInput from '../ui/RadioInput';
import ValidationModal from '../modal/ValidationModal';

const OrderSummary: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { convertPrice, getCurrencySymbol, currency } = useCurrency();
  const { billingAddress } = useUser();
  const { addOrder } = useOrder();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Calculate subtotal
  const subtotal = getCartTotal();
  const convertedSubtotal = convertPrice(subtotal);
  const shipping = 0; // Free shipping
  const gstRate = 0.18; // 18% GST
  const gst = convertedSubtotal * gstRate;
  const total = convertedSubtotal + shipping + gst;
  const currencySymbol = getCurrencySymbol();

  const validateBillingAddress = (): string[] => {
    const missing: string[] = [];
    
    if (!billingAddress.firstName || billingAddress.firstName.trim() === '') {
      missing.push('First Name');
    }
    if (!billingAddress.lastName || billingAddress.lastName.trim() === '') {
      missing.push('Last Name');
    }
    if (!billingAddress.streetAddress || billingAddress.streetAddress.trim() === '') {
      missing.push('Street Address');
    }
    if (!billingAddress.country || billingAddress.country.trim() === '') {
      missing.push('Country / Region');
    }
    if (!billingAddress.state || billingAddress.state.trim() === '') {
      missing.push('State');
    }
    if (!billingAddress.zipCode || billingAddress.zipCode.trim() === '') {
      missing.push('Zip Code');
    }
    if (!billingAddress.email || billingAddress.email.trim() === '') {
      missing.push('Email Address');
    }
    if (!billingAddress.phone || billingAddress.phone.trim() === '') {
      missing.push('Phone Number');
    }
    
    return missing;
  };

  const handlePlaceOrder = async () => {
    // Validate cart
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Validate billing address
    const missing = validateBillingAddress();
    if (missing.length > 0) {
      setMissingFields(missing);
      setShowValidationModal(true);
      return;
    }

    // Get selected payment method
    const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement;
    const paymentMethod = paymentMethodInput?.value || 'cod';

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
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 
                       paymentMethod === 'paypal' ? 'PayPal' : 'Amazon Pay',
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal: convertedSubtotal,
        shipping,
        gst,
        currency: currency // Add currency to order
      });

      // Clear cart
      clearCart();

      // Navigate to order history after a short delay to show notification
      setTimeout(() => {
        navigate('/order-history');
      }, 1000);
    } catch (error: unknown) {
      console.error('Failed to place order:', error);
      
      let errorMessage = 'Failed to place order. Please try again.';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { data?: { message?: string; errors?: Array<{ message: string }> } } }).response;
        if (response?.data?.message) {
          errorMessage = response.data.message;
        } else if (response?.data?.errors && Array.isArray(response.data.errors)) {
          errorMessage = response.data.errors.map((e: { message: string }) => e.message).join(', ');
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="border border-border-color rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-xl font-medium text-text-dark mb-3">{t('checkout.orderSummary')}</h3>
        <div className="space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-text-dark-gray text-sm">{t('checkout.noItems')}</p>
          ) : (
            cartItems.map(item => {
              const itemTotal = item.price * item.quantity;
              const convertedItemTotal = convertPrice(itemTotal);
              
              return (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-contain" />
                    <span className="text-text-dark">{item.name}</span>
                    <span className="text-text-dark">x{item.quantity}</span>
                  </div>
                  <span className="font-medium text-text-dark">{currencySymbol}{convertedItemTotal.toFixed(2)}</span>
                </div>
              );
            })
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-border-color space-y-3">
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
        </div>
        <div className="mt-4 pt-4 border-t border-border-color">
          <div className="flex justify-between text-base">
            <span className="text-text-dark font-medium">{t('cart.total')}:</span>
            <span className="font-semibold text-text-dark">{currencySymbol}{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-text-dark mb-4">{t('checkout.paymentMethod')}</h3>
        <div className="space-y-2.5">
          <RadioInput name="paymentMethod" label={t('checkout.cashOnDelivery')} value="cod" defaultChecked />
          <RadioInput name="paymentMethod" label={t('checkout.paypal')} value="paypal" />
          <RadioInput name="paymentMethod" label={t('checkout.amazonPay')} value="amazon" />
        </div>
      </div>

      <button 
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
        className="w-full bg-primary text-white font-semibold py-3.5 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPlacingOrder ? t('cart.placingOrder') : t('cart.placeOrder')}
      </button>

      {/* Validation Modal */}
      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        missingFields={missingFields}
      />
    </div>
  );
};

export default OrderSummary;
