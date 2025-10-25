import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown, Search, ShoppingCart, Phone, X } from 'lucide-react';
import { BsPersonCircle } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import ARLogo from '../../assets/AR Logo.png';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import { shopProducts, Product } from '../../data/products';

const CurrencyDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCurrency = (selectedCurrency: 'USD' | 'INR') => {
    setCurrency(selectedCurrency);
    // Reset language to English when switching to USD
    if (selectedCurrency === 'USD') {
      setLanguage('English');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currency}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-border-color rounded-md shadow-lg py-1 min-w-[80px] z-[100]">
          <button
            onClick={() => handleSelectCurrency('INR')}
            className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors ${
              currency === 'INR' ? 'text-primary font-medium' : 'text-text-dark-gray'
            }`}
          >
            INR
          </button>
          <button
            onClick={() => handleSelectCurrency('USD')}
            className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors ${
              currency === 'USD' ? 'text-primary font-medium' : 'text-text-dark-gray'
            }`}
          >
            USD
          </button>
        </div>
      )}
    </div>
  );
};

const LanguageDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, getLanguageCode } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (selectedLanguage: 'English' | 'Marathi' | 'Hindi') => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{getLanguageCode()}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-border-color rounded-md shadow-lg py-1 min-w-[100px] z-[100]">
          <button
            onClick={() => handleSelectLanguage('English')}
            className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors ${
              language === 'English' ? 'text-primary font-medium' : 'text-text-dark-gray'
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleSelectLanguage('Marathi')}
            className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors ${
              language === 'Marathi' ? 'text-primary font-medium' : 'text-text-dark-gray'
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => handleSelectLanguage('Hindi')}
            className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors ${
              language === 'Hindi' ? 'text-primary font-medium' : 'text-text-dark-gray'
            }`}
          >
            हिन्दी
          </button>
        </div>
      )}
    </div>
  );
};

const TopBar: React.FC = () => {
  const { currency } = useCurrency();
  const { t } = useTranslation();
  const address = currency === 'INR' 
    ? 'Ambegaon - 410503, Pune, Maharashtra, India'
    : 'Lincoln- 344, Illinois, Chicago, USA';

  return (
    <div className="hidden lg:block border-b border-border-color relative z-[60]">
      <div className="container mx-auto px-8 flex justify-between items-center py-2 text-xs text-text-dark-gray">
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{t('header.storeLocation')}: {address}</span>
        </div>
        <div className="flex items-center gap-4">
          {currency === 'INR' && (
            <>
              <LanguageDropdown />
              <div className="border-l border-border-color h-3"></div>
            </>
          )}
          <CurrencyDropdown />
          <div className="border-l border-border-color h-3"></div>
          <div className="flex items-center gap-1">
            <Link to="/signin" className="hover:text-primary">{t('header.signIn')}</Link>
            <span>/</span>
            <Link to="/signup" className="hover:text-primary">{t('header.signUp')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const MidBar: React.FC = () => {
  const { getCartCount, getCartTotal } = useCart();
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const { user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();
  const convertedTotal = convertPrice(cartTotal);
  const currencySymbol = getCurrencySymbol();

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      const filtered = shopProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Handle search submit
  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      setShowResults(false);
      navigate('/shop', { state: { searchQuery } });
      // Clear the search input after navigating
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle product click
  const handleProductClick = (productId: number) => {
    setShowResults(false);
    setSearchQuery('');
    navigate('/shop', { state: { productId } });
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
  <div className="sticky top-0 z-50 bg-white shadow-sm">
    <div className="container mx-auto px-8 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src={ARLogo} alt="AR Logo" className="h-8 w-8 object-contain" />
        <span className="text-2xl font-semibold text-text-dark -tracking-[0.02em]">Agroreach</span>
      </Link>
      
      {/* Search Bar with Results */}
      <div className="hidden lg:block w-full max-w-md relative" ref={searchRef}>
        <div className="flex w-full border-2 border-border-color rounded-md overflow-hidden">
          <div className="flex-grow flex items-center">
            <span className="pl-3 pr-2"><Search size={15} className="text-text-dark" /></span>
            <input 
              type="text" 
              placeholder={t('header.searchPlaceholder')}
              className="w-full py-2.5 outline-none text-sm pr-8"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            {searchQuery && (
              <button 
                onClick={handleClearSearch}
                className="absolute right-24 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button 
            onClick={handleSearch}
            className="bg-primary text-white font-medium px-5 hover:bg-opacity-90 transition-colors text-sm"
          >
            {t('header.search')}
          </button>
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-md shadow-lg max-h-96 overflow-y-auto scrollbar-hide z-[100]">
            {searchResults.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs text-gray-500 border-b border-border-color">
                  Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
                </div>
                {searchResults.slice(0, 8).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-text-dark">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm font-semibold text-primary">
                            {currencySymbol}{convertPrice(product.price).toFixed(2)}
                          </p>
                          {product.oldPrice && (
                            <p className="text-xs text-gray-400 line-through">
                              {currencySymbol}{convertPrice(product.oldPrice).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        product.stockStatus === 'In Stock' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stockStatus}
                      </div>
                    </div>
                  </div>
                ))}
                {searchResults.length > 8 && (
                  <div 
                    onClick={handleSearch}
                    className="px-4 py-3 text-center text-sm text-primary hover:bg-gray-50 cursor-pointer font-medium"
                  >
                    View all {searchResults.length} results
                  </div>
                )}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <Search size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-sm font-medium text-gray-600 mb-1">{t('common.noResults')}</p>
                <p className="text-xs text-gray-400">
                  "{searchQuery}" is not available in our store
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          {user && (
            <span className="text-sm font-medium text-text-dark hidden lg:block">
              Hi {user.name.split(' ')[0]}
            </span>
          )}
          <BsPersonCircle size={22} className="text-text-dark" />
        </Link>
        <div className="hidden lg:block border-l border-gray-300 h-5"></div>
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingCart size={20} className="text-text-dark" />
            {cartCount > 0 && (
              <div className="absolute -top-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </div>
            )}
          </Link>
          <div className="hidden md:block">
            <p className="text-xs text-text-light">{t('header.shoppingCart')}:</p>
            <p className="text-sm font-medium text-primary">{currencySymbol}{convertedTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

const NavBar: React.FC = () => {
    const { pathname } = useLocation();
    const { currency } = useCurrency();
    const { t } = useTranslation();

    const phoneNumber = currency === 'INR' 
        ? '+91 84335 09521' 
        : '+1 (312) 555-0198';

    return (
        <div className="bg-gray-800 border-t border-gray-700">
            <div className="container mx-auto px-8 flex justify-between items-center text-sm">
                <nav className="hidden lg:flex items-center gap-8">
                    <Link to="/" className={`py-3.5 font-medium transition-colors ${pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-primary'}`}>
                        {t('header.home')}
                    </Link>
                    <Link to="/shop" className={`py-3.5 transition-colors ${pathname.startsWith('/shop') ? 'text-white' : 'text-gray-300 hover:text-primary'}`}>
                        {t('header.shop')}
                    </Link>
                    <Link to="/dashboard" className={`py-3.5 transition-colors ${pathname.startsWith('/dashboard') ? 'text-white' : 'text-gray-300 hover:text-primary'}`}>
                        {t('header.myAccount')}
                    </Link>
                    <Link to="/about" className={`py-3.5 transition-colors ${pathname === '/about' ? 'text-white font-medium' : 'text-gray-300 hover:text-primary'}`}>
                        {t('header.aboutUs')}
                    </Link>
                    <Link to="/contact" className={`py-3.5 transition-colors ${pathname === '/contact' ? 'text-white font-medium' : 'text-gray-300 hover:text-primary'}`}>
                        {t('header.contactUs')}
                    </Link>
                </nav>
                <div className="flex items-center gap-2 text-gray-300 font-medium">
                    <Phone size={18} />
                    <span>{phoneNumber}</span>
                </div>
            </div>
        </div>
    );
};

const Header: React.FC = () => {
  return (
    <header className="font-poppins">
      <TopBar />
      <MidBar />
      <NavBar />
    </header>
  );
};

export default Header;
