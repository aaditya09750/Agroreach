import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import Checkbox from '../ui/Checkbox';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useTranslation } from '../../i18n/useTranslation';

const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formState.termsAccepted) {
      setError(t('auth.acceptTermsError'));
      return;
    }
    
    if (formState.password !== formState.confirmPassword) {
      setError(t('auth.passwordMismatchError'));
      return;
    }
    
    if (formState.password.length < 6) {
      setError(t('auth.passwordLengthError'));
      return;
    }
    
    setLoading(true);
    
    try {
      const user = await register(formState.name, formState.email, formState.password, formState.phone);
      
      // Only navigate if user was successfully created
      if (user) {
        // Redirect to the page they tried to visit or dashboard
        const locationState = location.state as { from?: { pathname?: string } } | null;
        const from = locationState?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(t('auth.registrationFailed'));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('auth.registrationFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-[520px]">
      <h2 className="text-3xl font-semibold text-text-dark text-center mb-8">{t('auth.createAccount')}</h2>
      
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            name="name"
            placeholder={t('auth.fullNamePlaceholder')}
            value={formState.name}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder={t('auth.emailPlaceholder')}
            value={formState.email}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder={t('auth.phoneNumber')}
            value={formState.phone}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            required
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={t('auth.passwordPlaceholder')}
            value={formState.password}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            aria-label={t('auth.togglePasswordVisibility')}
          >
            <Eye size={20} />
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder={t('auth.confirmPasswordPlaceholder')}
            value={formState.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            aria-label={t('auth.togglePasswordVisibility')}
          >
            <Eye size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center text-sm">
          <Checkbox 
            label={t('auth.acceptTerms')}
            name="termsAccepted"
            checked={formState.termsAccepted}
            onChange={handleChange}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-3.5 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('common.loading') : t('auth.createAccount')}
        </button>
      </form>
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">{t('auth.alreadyHaveAccount')} </span>
        <Link to="/signin" className="text-text-dark font-medium hover:text-primary transition-colors">{t('auth.signIn')}</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
