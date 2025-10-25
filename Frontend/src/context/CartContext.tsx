import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../data/products';
import { cartService } from '../services/cartService';
import { useUser } from './UserContext';
import { getImageUrls } from '../utils/imageUtils';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (product: Product, quantity: number) => Promise<boolean>;
  removeFromCart: (productId: number | string) => Promise<void>;
  updateQuantity: (productId: number | string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  refreshCart: () => Promise<void>;
  showNotification: boolean;
  notificationProduct: Product | null;
  notificationType: 'add' | 'remove';
  hideNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState<Product | null>(null);
  const [notificationType, setNotificationType] = useState<'add' | 'remove'>('add');

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      console.log('Cart response:', response);
      // Backend returns { success, data: { cart, subtotal } }
      const cart = response.data?.cart || response.cart || { items: [] };
      console.log('Cart object:', cart);
      const mappedItems = cart.items?.map((item: {
        product: {
          _id: string;
          name: string;
          category: string;
          price: number;
          rating?: number;
          images?: string[];
          description: string;
          stock?: number;
          stockQuantity?: number;
          stockStatus?: string;
        };
        quantity: number;
      }) => {
        console.log('Mapping item:', item);
        // Use getImageUrls to convert backend image paths to full URLs
        const imageUrls = getImageUrls(item.product.images);
        const mappedItem = {
          id: item.product._id,
          name: item.product.name,
          category: item.product.category,
          price: item.product.price,
          rating: item.product.rating || 4.5,
          reviewCount: 0,
          image: imageUrls[0], // First image as main image
          images: imageUrls, // All images
          description: item.product.description || '',
          stock: item.product.stock || item.product.stockQuantity || 0,
          stockStatus: (item.product.stockStatus as 'In Stock' | 'Out of Stock') || 'In Stock',
          quantity: item.quantity,
        };
        console.log('Mapped item:', mappedItem);
        return mappedItem;
      }) || [];
      console.log('Final cart items:', mappedItems);
      setCartItems(mappedItems);
    } catch (error) {
      console.error('Failed to load cart', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = async () => {
    if (user) {
      await loadCart();
    }
  };

  const addToCart = async (product: Product, quantity: number): Promise<boolean> => {
    if (!user) {
      // Return false to indicate user needs to login
      return false;
    }

    try {
      await cartService.addToCart(String(product.id), quantity);
      await loadCart();
      
      // Show add notification
      setNotificationProduct(product);
      setNotificationType('add');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
      return true;
    } catch (error) {
      console.error('Failed to add to cart', error);
      alert('Failed to add item to cart');
      return false;
    }
  };

  const removeFromCart = async (productId: number | string) => {
    if (!user) return;

    // Get the product before removing for notification
    const productToRemove = cartItems.find(item => String(item.id) === String(productId));
    
    try {
      await cartService.removeFromCart(String(productId));
      await loadCart();
      
      // Show remove notification
      if (productToRemove) {
        setNotificationProduct(productToRemove);
        setNotificationType('remove');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to remove from cart', error);
      alert('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId: number | string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    
    try {
      await cartService.updateCartItem(String(productId), quantity);
      await loadCart();
    } catch (error) {
      console.error('Failed to update quantity', error);
      alert('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await cartService.clearCart();
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart', error);
      alert('Failed to clear cart');
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        refreshCart,
        showNotification,
        notificationProduct,
        notificationType,
        hideNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
