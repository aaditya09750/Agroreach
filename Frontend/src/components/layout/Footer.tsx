import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ARLogo from '../../assets/AR Logo.png';
import TermsConditionsModal from '../modal/TermsConditionsModal';
import PrivacyPolicyModal from '../modal/PrivacyPolicyModal';
import Toast, { ToastType } from '../ui/Toast';
import { newsletterService } from '../../services/newsletterService';

// Scroll to top handler
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Subscription: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setToast({ message: 'Please enter your email address', type: 'warning' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToast({ message: 'Please enter a valid email address', type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await newsletterService.subscribe(email);
      
      if (response.success) {
        setToast({ 
          message: response.message || 'Successfully subscribed! Check your email for confirmation.', 
          type: 'success' 
        });
        setEmail('');
      } else {
        setToast({ 
          message: response.message || 'Failed to subscribe. Please try again.', 
          type: 'error' 
        });
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      setToast({ 
        message: err.message || 'Something went wrong. Please try again later.', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] py-8 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
          {/* Newsletter Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-semibold text-text-dark">{t('footer.subscribeTitle')}</h3>
            <p className="text-sm text-text-muted mt-1">{t('footer.subscribeDesc')}</p>
          </div>

          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <img src={ARLogo} alt="Agroreach Logo" className="h-8 w-8 object-contain" />
            <span className="text-2xl font-semibold text-text-dark">Agroreach</span>
          </div>

          {/* Input Section */}
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md">
            <input
              type="email"
              placeholder={t('footer.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-l-full border border-gray-100 focus:outline-none text-sm bg-white disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white font-semibold px-6 py-3 rounded-r-full hover:bg-opacity-90 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Subscribing...' : t('footer.subscribe')}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};


const FooterLinks: React.FC = () => {
  const { t } = useTranslation();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  return (
    <>
    <div className="bg-background-dark text-text-muted pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-20">
          {/* Logo and Contact Section */}
          <div className="lg:w-[280px] flex-shrink-0">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-2 mb-4">
              <img src={ARLogo} alt="Agroreach Logo" className="h-5 w-5 object-contain" />
              <span className="text-1xl font-medium text-white -tracking-[0.03em]">{t('footer.aboutAgroreach')}</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">{t('footer.aboutDesc')}</p>
            <div className="flex items-center gap-2 text-sm flex-nowrap">
              <a href="tel:+91 84335 09521" className="text-white font-small border-b-2 border-primary pb-1 whitespace-nowrap">+91 84335 09521</a>
              <span className="text-gray-400">or</span>
              <a href="mailto:agroreach@gmail.com" className="text-white font-small border-b-2 border-primary pb-1 whitespace-nowrap">agroreach@gmail.com</a>
            </div>
          </div>

          {/* Three List Columns with Equal Spacing */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
            <div>
              <h4 className="text-base font-medium text-white mb-5">{t('footer.myAccount')}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/dashboard" onClick={scrollToTop} className="hover:text-white transition-colors">{t('footer.myAccount')}</Link></li>
                <li><Link to="/order-history" onClick={scrollToTop} className="hover:text-white transition-colors">{t('footer.orderHistory')}</Link></li>
                <li><Link to="/settings" onClick={scrollToTop} className="hover:text-white transition-colors">{t('footer.settings')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-medium text-white mb-5">{t('footer.helps')}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">{t('footer.contact')}</Link></li>
                <li>
                  <button 
                    onClick={() => setIsTermsModalOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t('footer.termsCondition')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t('footer.privacyPolicy')}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-medium text-white mb-5">{t('footer.proxy')}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors">{t('footer.about')}</Link></li>
                <li><Link to="/shop" onClick={scrollToTop} className="hover:text-white transition-colors">{t('footer.shop')}</Link></li>
                <li><a href="/order-history" className="hover:text-white transition-colors">{t('footer.trackOrder')}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Modals */}
    {isTermsModalOpen && <TermsConditionsModal onClose={() => setIsTermsModalOpen(false)} />}
    {isPrivacyModalOpen && <PrivacyPolicyModal onClose={() => setIsPrivacyModalOpen(false)} />}
    </>
  );
};

const Copyright: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-background-dark border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright Text */}
        <p className="text-sm text-gray-400 text-center md:text-left">{t('footer.copyright')}</p>

        {/* Social Media Icons */}
        <div className="flex items-center gap-3">
        <a
          href="#"
          aria-label="Instagram"
          className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-primary active:scale-90 group"        >
          <svg viewBox="0 0 16 16" className="w-3 h-3 group-hover:animate-slideInTop">
            <path fill="white" d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
          </svg>
        </a>
        <a
          href="#"
          aria-label="Twitter"
          className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-primary active:scale-90 group"
        >
          <svg viewBox="0 0 16 16" className="w-3 h-3 group-hover:animate-slideInTop">
            <path fill="white" d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
          </svg>
        </a>
        <a
          href="#"
          aria-label="Pinterest"
          className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-primary active:scale-90 group"
        >
          <svg viewBox="0 0 448 512" className="w-3 h-3 group-hover:animate-slideInTop">
            <path fill="white" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
          </svg>
        </a>
        <a
          href="#"
          aria-label="WhatsApp"
          className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-primary active:scale-90 group"
        >
          <svg viewBox="0 0 16 16" className="w-3 h-3 group-hover:animate-slideInTop">
            <path fill="white" d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="font-poppins">
      <Subscription />
      <FooterLinks />
      <Copyright />
    </footer>
  );
};

export default Footer;
