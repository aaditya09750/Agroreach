import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './i18n/config'; // Import i18n configuration
import { authService } from './services/authService';
import HomePage from './pages/user/HomePage';
import ShopPage from './pages/user/ShopPage';
import ContactPage from './pages/user/ContactPage';
import AboutPage from './pages/user/AboutPage';
import SignInPage from './pages/user/SignInPage';
import SignUpPage from './pages/user/SignUpPage';
import LogoutPage from './pages/user/LogoutPage';
import DashboardPage from './pages/user/DashboardPage';
import OrderHistoryPage from './pages/user/OrderHistoryPage';
import OrderDetailPage from './pages/user/OrderDetailPage';
import CartPage from './pages/user/CartPage';
import CheckoutPage from './pages/user/CheckoutPage';
import SettingsPage from './pages/user/SettingsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { OrderProvider } from './context/OrderContext';
import { NotificationProvider } from './context/NotificationContext';
import CartNotification from './components/ui/CartNotification';
import UserNotification from './components/ui/UserNotification';
import OrderNotification from './components/ui/OrderNotification';
import SkeletonLoader from './components/ui/SkeletonLoader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Migrate old localStorage keys to new format
    authService.migrateOldStorage();
    
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
        <UserProvider>
          <NotificationProvider>
            <ProductProvider>
              <CartProvider>
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
                      <Route path="/logout" element={<LogoutPage />} />
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/order-history" element={
                        <ProtectedRoute>
                          <OrderHistoryPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/order/:orderId" element={
                        <ProtectedRoute>
                          <OrderDetailPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/settings" element={
                        <ProtectedRoute>
                          <SettingsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin" element={<AdminLoginPage />} />
                      <Route path="/admin/dashboard" element={
                        <ProtectedRoute adminOnly>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                    </Routes>
                </Router>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </NotificationProvider>
      </UserProvider>
    </LanguageProvider>
  </CurrencyProvider>
  );
}

export default App;


// Helloo World