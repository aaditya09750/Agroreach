import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface TermsConditionsModalProps {
  onClose: () => void;
}

const TermsConditionsModal: React.FC<TermsConditionsModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="text-text-dark" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <h2 id="terms-modal-title" className="text-2xl md:text-3xl font-bold text-text-dark">
              Terms & Conditions
            </h2>
            <div className="w-24 h-[2px] rounded-full bg-gradient-to-r from-primary to-primary/1 mt-3"></div>
            <p className="text-xs text-text-muted mt-4">Last Updated: October 19, 2025</p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 text-text-dark-gray text-sm">
            {/* Introduction */}
            <div>
              <p className="leading-relaxed">
                Welcome to Agroreach! These Terms and Conditions ("Terms") govern your use of our website and services. 
                By accessing or using Agroreach, you agree to be bound by these Terms. Please read them carefully before 
                using our platform.
              </p>
            </div>

            {/* 1. Acceptance of Terms */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">1. Acceptance of Terms</h3>
              <p className="leading-relaxed">
                By creating an account, placing an order, or using any of our services, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part 
                of these Terms, you must not use our services.
              </p>
            </div>

            {/* 2. User Accounts */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">2. User Accounts</h3>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <strong>2.1 Registration:</strong> To use certain features of Agroreach, you must create an account 
                  by providing accurate and complete information. You are responsible for maintaining the confidentiality 
                  of your account credentials.
                </p>
                <p className="leading-relaxed">
                  <strong>2.2 Account Security:</strong> You must notify us immediately of any unauthorized use of your 
                  account. We are not liable for any loss or damage arising from unauthorized access to your account.
                </p>
                <p className="leading-relaxed">
                  <strong>2.3 Age Requirement:</strong> You must be at least 18 years old to create an account and use 
                  our services.
                </p>
              </div>
            </div>

            {/* 3. Orders and Payments */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">3. Orders and Payments</h3>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <strong>3.1 Order Placement:</strong> All orders are subject to acceptance and availability. We reserve 
                  the right to refuse or cancel any order for any reason, including product availability, errors in pricing, 
                  or suspected fraud.
                </p>
                <p className="leading-relaxed">
                  <strong>3.2 Pricing:</strong> All prices are listed in Indian Rupees (INR) or US Dollars (USD) and are 
                  subject to change without notice. We strive to provide accurate pricing information, but errors may occur.
                </p>
                <p className="leading-relaxed">
                  <strong>3.3 Payment Methods:</strong> We accept various payment methods including credit/debit cards, 
                  UPI, net banking, and digital wallets. Payment must be received before order processing begins.
                </p>
                <p className="leading-relaxed">
                  <strong>3.4 Order Confirmation:</strong> You will receive an email confirmation once your order is placed. 
                  This does not guarantee acceptance; a separate confirmation will be sent when your order ships.
                </p>
              </div>
            </div>

            {/* 4. Delivery and Shipping */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">4. Delivery and Shipping</h3>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <strong>4.1 Delivery Times:</strong> We strive to deliver fresh produce within 24-48 hours of harvest. 
                  Delivery times may vary based on location and product availability.
                </p>
                <p className="leading-relaxed">
                  <strong>4.2 Delivery Areas:</strong> Currently, we deliver to select locations. Please check our delivery 
                  zones during checkout.
                </p>
                <p className="leading-relaxed">
                  <strong>4.3 Failed Deliveries:</strong> If delivery fails due to incorrect address or recipient unavailability, 
                  additional charges may apply for redelivery.
                </p>
              </div>
            </div>

            {/* 5. Returns and Refunds */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">5. Returns and Refunds</h3>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <strong>5.1 Quality Guarantee:</strong> We guarantee the freshness and quality of our products. If you 
                  receive damaged or unsatisfactory items, please contact us within 24 hours of delivery.
                </p>
                <p className="leading-relaxed">
                  <strong>5.2 Return Policy:</strong> Due to the perishable nature of our products, returns are accepted 
                  only for quality issues. Photographic evidence may be required.
                </p>
                <p className="leading-relaxed">
                  <strong>5.3 Refund Processing:</strong> Approved refunds will be processed within 5-7 business days to 
                  the original payment method.
                </p>
              </div>
            </div>

            {/* 6. Product Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">6. Product Information</h3>
              <p className="leading-relaxed">
                We make every effort to display accurate product information, including descriptions, images, and nutritional 
                details. However, actual products may vary slightly due to natural variations in fresh produce. We do not 
                guarantee that product images exactly represent the actual product you will receive.
              </p>
            </div>

            {/* 7. Intellectual Property */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">7. Intellectual Property</h3>
              <p className="leading-relaxed">
                All content on Agroreach, including text, graphics, logos, images, and software, is the property of Agroreach 
                or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create 
                derivative works without our express written permission.
              </p>
            </div>

            {/* 8. User Conduct */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">8. User Conduct</h3>
              <p className="leading-relaxed mb-3">You agree not to:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs">Use our services for any unlawful purpose or in violation of these Terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs">Attempt to gain unauthorized access to our systems or other user accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs">Upload or transmit viruses, malware, or other harmful code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs">Harass, abuse, or harm other users or our staff</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs">Engage in fraudulent activities or misrepresent your identity</span>
                </li>
              </ul>
            </div>

            {/* 9. Limitation of Liability */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">9. Limitation of Liability</h3>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, Agroreach shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from 
                your use or inability to use our services.
              </p>
            </div>

            {/* 10. Modifications to Terms */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">10. Modifications to Terms</h3>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting 
                on our website. Your continued use of Agroreach after changes are posted constitutes acceptance of the 
                modified Terms.
              </p>
            </div>

            {/* 11. Governing Law */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">11. Governing Law</h3>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising 
                from these Terms or your use of our services shall be subject to the exclusive jurisdiction of courts in 
                [Your City], India.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary mt-8">
              <h3 className="text-base font-semibold text-text-dark mb-2">Contact Us</h3>
              <p className="text-xs text-text-muted leading-relaxed mb-3">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-1 text-xs">
                <p><strong>Email:</strong> agroreach@gmail.com</p>
                <p><strong>Phone:</strong> +91 84335 09521</p>
                <p><strong>Address:</strong> Agroreach Headquarters, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsModal;
