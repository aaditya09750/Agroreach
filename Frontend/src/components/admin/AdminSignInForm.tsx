import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import Checkbox from '../ui/Checkbox';
import { Link, useNavigate } from 'react-router-dom';

const AdminSignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin login submitted:', formState);
    localStorage.setItem('adminAuthenticated', 'true');
    navigate('/admin/dashboard');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-[520px]">
      <h2 className="text-3xl font-semibold text-text-dark text-center">Sign In</h2>
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
        <button type="submit" className="w-full bg-primary text-white font-semibold py-3.5 rounded-full hover:bg-opacity-90 transition-colors">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminSignInForm;
