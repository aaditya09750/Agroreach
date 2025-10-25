import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  useEffect(() => {
    // Perform logout - explicitly logout user session only
    logout(false);
    
    // Redirect to home page after a brief delay
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Logging out...</h2>
        <p className="text-gray-600">You will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default LogoutPage;
