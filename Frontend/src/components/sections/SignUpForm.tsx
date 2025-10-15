import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import Checkbox from '../ui/Checkbox';
import { Link } from 'react-router-dom';

const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
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
    console.log('Form submitted:', formState);
    // Handle registration logic here
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-[520px]">
      <h2 className="text-3xl font-semibold text-text-dark text-center mb-8">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
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
            className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <Eye size={20} />
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formState.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <Eye size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center text-sm">
          <Checkbox 
            label="Accept all terms & Conditions" 
            name="termsAccepted"
            checked={formState.termsAccepted}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="w-full bg-primary text-white font-semibold py-3.5 rounded-full hover:bg-opacity-90 transition-colors">
          Create Account
        </button>
      </form>
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Already have account? </span>
        <Link to="/signin" className="text-text-dark font-medium hover:text-primary transition-colors">Login</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
