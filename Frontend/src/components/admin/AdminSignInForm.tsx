import React, { useState } from 'react';
import { Eye, AlertCircle } from 'lucide-react';
import Checkbox from '../ui/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const AdminSignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, logout } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(formState.email, formState.password);
      
      if (user && user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user && user.role !== 'admin') {
        // Non-admin user tried to access admin portal
        logout(); // Properly clear user state
        setError('Access denied. This portal is for administrators only.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Check if error message contains "Invalid email or password"
        if (err.message.includes('Invalid email') || err.message.includes('password')) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-[520px]">
      <h2 className="text-3xl font-semibold text-text-dark text-center">Admin Sign In</h2>
      
      {error && (
        <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-border-color rounded-md text-text-dark-gray placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            required
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-border-color rounded-md text-text-dark-gray placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted"
            aria-label="Toggle password visibility"
          >
            <Eye size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center text-sm">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formState.rememberMe}
            onChange={handleChange}
          />
          <Link to="/admin" className="text-text-dark-gray hover:text-primary">Forget Password</Link>
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-3.5 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminSignInForm;
