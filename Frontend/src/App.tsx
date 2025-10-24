import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './i18n/config'; // Import i18n configuration
import HomePage from './pages/user/HomePage';
import ShopPage from './pages/user/ShopPage';
import ContactPage from './pages/user/ContactPage';
import AboutPage from './pages/user/AboutPage';
import SignInPage from './pages/user/SignInPage';
import SignUpPage from './pages/user/SignUpPage';
import DashboardPage from './pages/user/DashboardPage';
import OrderHistoryPage from './pages/user/OrderHistoryPage';
import OrderDetailPage from './pages/user/OrderDetailPage';
import CartPage from './pages/user/CartPage';
import CheckoutPage from './pages/user/CheckoutPage';
import SettingsPage from './pages/user/SettingsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { OrderProvider } from './context/OrderContext';
import CartNotification from './components/ui/CartNotification';
import UserNotification from './components/ui/UserNotification';
import OrderNotification from './components/ui/OrderNotification';
import SkeletonLoader from './components/ui/SkeletonLoader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }
  return (
    <CurrencyProvider>
      <LanguageProvider>
        <ProductProvider>
          <CartProvider>
            <UserProvider>
              <OrderProvider>
                <Router>
                    <CartNotification />
                    <UserNotification />
                    <OrderNotification />
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/shop" element={<ShopPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/signin" element={<SignInPage />} />
                      <Route path="/signup" element={<SignUpPage />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/order-history" element={<OrderHistoryPage />} />
                      <Route path="/dashboard/order/:orderId" element={<OrderDetailPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/admin" element={<AdminLoginPage />} />
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>
                </Router>
              </OrderProvider>
            </UserProvider>
          </CartProvider>
        </ProductProvider>
      </LanguageProvider>
    </CurrencyProvider>
  );
}

export default App;


// Helloo World