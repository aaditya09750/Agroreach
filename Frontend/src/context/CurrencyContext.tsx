import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Currency = 'USD' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (inrPrice: number) => number;
  formatPrice: (inrPrice: number) => string;
  getCurrencySymbol: () => string;
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

// Exchange rate: 1 USD = 88.221 INR
const USD_TO_INR_RATE = 88.221;

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('INR');

  // Initialize currency based on route and saved preference
  useEffect(() => {
    const currentPath = window.location.pathname;
    const isAdminPath = currentPath.startsWith('/admin');
    
    if (isAdminPath) {
      // Admin panel always defaults to INR
      setCurrency('INR');
    } else {
      // For user pages, load saved preference or default to INR
      const savedCurrency = localStorage.getItem('selectedCurrency') as Currency;
      if (savedCurrency && (savedCurrency === 'USD' || savedCurrency === 'INR')) {
        setCurrency(savedCurrency);
      }
    }
  }, []);

  // Update localStorage when currency changes (only for non-admin pages)
  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    
    // Don't save currency preference if on admin page
    const currentPath = window.location.pathname;
    const isAdminPath = currentPath.startsWith('/admin');
    
    if (!isAdminPath) {
      localStorage.setItem('selectedCurrency', newCurrency);
    }
  };

  /**
   * Convert INR price to selected currency
   * All prices in database are stored in INR
   * @param inrPrice - Price in INR (base currency)
   * @returns Converted price based on selected currency
   */
  const convertPrice = (inrPrice: number): number => {
    if (!inrPrice || isNaN(inrPrice)) {
      return 0;
    }

    if (currency === 'USD') {
      // Convert INR to USD: divide by exchange rate
      return inrPrice / USD_TO_INR_RATE;
    }
    
    // If INR is selected, return as-is
    return inrPrice;
  };

  /**
   * Format price with currency symbol and proper decimal places
   * @param inrPrice - Price in INR (base currency)
   * @returns Formatted price string with currency symbol
   */
  const formatPrice = (inrPrice: number): string => {
    const convertedPrice = convertPrice(inrPrice);
    const symbol = getCurrencySymbol();
    
    if (currency === 'INR') {
      // INR: Format with 2 decimal places
      return `${symbol}${convertedPrice.toFixed(2)}`;
    } else {
      // USD: Format with 2 decimal places
      return `${symbol}${convertedPrice.toFixed(2)}`;
    }
  };

  /**
   * Get currency symbol based on selected currency
   * @returns Currency symbol ($ or ₹)
   */
  const getCurrencySymbol = (): string => {
    return currency === 'USD' ? '$' : '₹';
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        convertPrice,
        formatPrice,
        getCurrencySymbol,
        exchangeRate: USD_TO_INR_RATE,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
