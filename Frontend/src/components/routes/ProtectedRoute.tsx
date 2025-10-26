import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Give a small delay to ensure context is fully updated
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Show auth prompt when user is not authenticated
  useEffect(() => {
    if (isReady && !user && !loading) {
      setShowAuthPrompt(true);
    }
  }, [isReady, user, loading]);

  if (loading || !isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Show authentication prompt modal instead of immediate redirect
    if (showAuthPrompt) {
      const routeName = location.pathname.split('/').filter(Boolean).pop() || 'this page';
      const formattedRouteName = routeName.charAt(0).toUpperCase() + routeName.slice(1).replace(/-/g, ' ');

      return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {adminOnly ? 'Admin Access Required' : 'Sign In Required'}
              </h2>
              <p className="text-gray-600">
                {adminOnly 
                  ? 'You need to be an admin to access this page.'
                  : `Please sign in to access ${formattedRouteName}. You'll be able to continue where you left off after signing in.`
                }
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  const redirectPath = adminOnly ? '/admin' : '/signin';
                  navigate(redirectPath, { state: { from: location } });
                }}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {adminOnly ? 'Go to Admin Login' : 'Sign In'}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
            </div>
            {!adminOnly && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup', { state: { from: location } })}
                  className="text-primary font-medium hover:underline"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      );
    }
    
    // Fallback redirect (should not reach here due to the modal above)
    const redirectPath = adminOnly ? '/admin' : '/signin';
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    // User is not an admin, show message and redirect to home
    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">
              You don't have admin privileges to access this page.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
