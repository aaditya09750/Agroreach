import React from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../../context/CartContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface CartItemRowProps {
  item: CartItem;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { convertPrice, getCurrencySymbol } = useCurrency();
  
  const convertedPrice = convertPrice(item.price);
  const subtotal = convertedPrice * item.quantity;
  const currencySymbol = getCurrencySymbol();
  
  // Handle both image (string) and images (array) formats
  const imageUrl = item.image || (item.images && item.images[0]) || '/placeholder.jpg';

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty string while typing
    if (value === '') {
      return;
    }
    
    // Parse the input value
    const numValue = parseInt(value, 10);
    
    // Only update if it's a valid positive number
    if (!isNaN(numValue) && numValue >= 1) {
      updateQuantity(item.id, numValue);
    }
  };

  const handleQuantityBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // If quantity is empty or less than 1 after blur, set it to 1
    if (value === '' || parseInt(value, 10) < 1) {
      updateQuantity(item.id, 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img 
            src={imageUrl} 
            alt={item.name} 
            className="w-24 h-24 object-contain rounded-md bg-gray-50"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.jpg';
            }}
          />
          <span className="text-sm font-medium text-text-dark">{item.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-gray">{currencySymbol}{convertedPrice.toFixed(2)}</td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center border border-gray-200 rounded-full bg-white">
          <button 
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            className={`w-10 h-10 flex items-center justify-center rounded-l-full transition-colors ${
              item.quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
            }`}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="text"
            value={item.quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            className="w-[50px] text-sm font-medium text-gray-800 text-center border-0 outline-none focus:ring-0"
            aria-label="Quantity"
          />
          <button 
            onClick={handleIncrease}
            className="w-10 h-10 flex items-center justify-center rounded-r-full text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark">{currencySymbol}{subtotal.toFixed(2)}</td>
      <td className="px-6 py-4">
        <button 
          onClick={handleRemove}
          className="text-text-muted hover:text-sale transition-colors"
          aria-label="Remove item"
        >
          <X size={20} />
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;
