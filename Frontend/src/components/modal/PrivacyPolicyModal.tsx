import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
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
        aria-labelledby="privacy-modal-title"
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
        <div className="overflow-y-auto max-h-[90vh] scrollbar-hide p-6 md:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <h2 id="privacy-modal-title" className="text-2xl md:text-3xl font-bold text-text-dark">
              Privacy Policy
            </h2>
            <div className="w-24 h-[2px] rounded-full bg-gradient-to-r from-primary to-primary/1 mt-3"></div>
            <p className="text-xs text-text-muted mt-4">Last Updated: October 19, 2025</p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 text-text-dark-gray text-sm">
            {/* Introduction */}
            <div>
              <p className="leading-relaxed">
                At Agroreach, we are committed to protecting your privacy and ensuring the security of your personal 
                information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our website and services. Please read this policy carefully to understand our practices.
              </p>
            </div>

            {/* 1. Information We Collect */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">1. Information We Collect</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-dark mb-2 text-sm">1.1 Personal Information</h4>
                  <p className="leading-relaxed mb-2">We collect personal information that you provide to us, including:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-xs">Name, email address, phone number, and delivery address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-xs">Payment information (processed securely through third-party payment gateways)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-xs">Account credentials (username and password)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-xs">Order history and preferences</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-text-dark mb-2 text-sm">1.2 Automatically Collected Information</h4>
                  <p className="leading-relaxed mb-2">When you visit our website, we automatically collect certain information:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-xs">IP address, browser type, and operating system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-xs">Pages visited, time spent on pages, and click data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-xs">Device information and unique identifiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="text-xs">Referring website and search terms used</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-text-dark mb-2 text-sm">1.3 Cookies and Tracking Technologies</h4>
                  <p className="leading-relaxed">
                    We use cookies, web beacons, and similar technologies to enhance your experience, analyze usage patterns, 
                    and personalize content. You can control cookie preferences through your browser settings.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. How We Use Your Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">2. How We Use Your Information</h3>
              <p className="leading-relaxed mb-3">We use the collected information for the following purposes:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Order Processing:</strong> To process and fulfill your orders, send confirmations, and provide delivery updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Customer Service:</strong> To respond to inquiries, provide support, and resolve issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Personalization:</strong> To customize your experience and recommend products based on preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Marketing:</strong> To send promotional emails, newsletters, and special offers (with your consent)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Analytics:</strong> To analyze website performance, user behavior, and improve our services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Security:</strong> To detect and prevent fraud, unauthorized access, and other security threats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our Terms and Conditions</span>
                </li>
              </ul>
            </div>

            {/* 3. Information Sharing and Disclosure */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">3. Information Sharing and Disclosure</h3>
              <p className="leading-relaxed mb-3">We may share your information in the following circumstances:</p>
              
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <strong>3.1 Service Providers:</strong> We share information with trusted third-party service providers 
                  who assist us in operating our website, processing payments, delivering orders, and providing customer support.
                </p>
                <p className="leading-relaxed">
                  <strong>3.2 Partner Farmers:</strong> We share necessary delivery information with our partner farmers 
                  to fulfill your orders.
                </p>
                <p className="leading-relaxed">
                  <strong>3.3 Legal Requirements:</strong> We may disclose your information if required by law, court order, 
                  or governmental regulation, or to protect our rights, property, or safety.
                </p>
                <p className="leading-relaxed">
                  <strong>3.4 Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your 
                  information may be transferred to the new owner.
                </p>
                <p className="leading-relaxed">
                  <strong>3.5 With Your Consent:</strong> We may share information for other purposes with your explicit consent.
                </p>
              </div>
            </div>

            {/* 4. Data Security */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">4. Data Security</h3>
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="space-y-2 ml-6 mt-3">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs">SSL/TLS encryption for data transmission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs">Secure payment processing through PCI-DSS compliant gateways</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs">Regular security audits and vulnerability assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs">Access controls and authentication mechanisms</span>
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security 
                but strive to use commercially acceptable means to protect your data.
              </p>
            </div>

            {/* 5. Your Privacy Rights */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">5. Your Privacy Rights</h3>
              <p className="leading-relaxed mb-3">You have the following rights regarding your personal information:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Access:</strong> Request a copy of the personal information we hold about you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Correction:</strong> Request correction of inaccurate or incomplete information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span className="text-xs"><strong>Data Portability:</strong> Request your data in a machine-readable format</span>
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, please contact us at agroreach@gmail.com.
              </p>
            </div>

            {/* 6. Data Retention */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">6. Data Retention</h3>
              <p className="leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, unless a longer retention period is required by law. When information is no longer needed, 
                we securely delete or anonymize it.
              </p>
            </div>

            {/* 7. Third-Party Links */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">7. Third-Party Links</h3>
              <p className="leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                or content of these external sites. We encourage you to review their privacy policies before providing 
                any personal information.
              </p>
            </div>

            {/* 8. Children's Privacy */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">8. Children's Privacy</h3>
              <p className="leading-relaxed">
                Agroreach is not intended for children under 18 years of age. We do not knowingly collect personal 
                information from children. If you become aware that a child has provided us with personal information, 
                please contact us immediately, and we will take steps to delete such information.
              </p>
            </div>

            {/* 9. International Data Transfers */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">9. International Data Transfers</h3>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that 
                appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and 
                applicable laws.
              </p>
            </div>

            {/* 10. Changes to Privacy Policy */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">10. Changes to Privacy Policy</h3>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                The updated policy will be posted on this page with a revised "Last Updated" date. We encourage you to review 
                this policy periodically.
              </p>
            </div>

            {/* 11. Cookie Policy */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">11. Cookie Policy</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="leading-relaxed mb-3">We use the following types of cookies:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span className="text-xs"><strong>Essential Cookies:</strong> Required for website functionality and security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span className="text-xs"><strong>Performance Cookies:</strong> Help us analyze website performance and usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span className="text-xs"><strong>Functional Cookies:</strong> Remember your preferences and settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span className="text-xs"><strong>Advertising Cookies:</strong> Deliver relevant ads based on your interests</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary mt-8">
              <h3 className="text-base font-semibold text-text-dark mb-2">Contact Us</h3>
              <p className="text-xs text-text-muted leading-relaxed mb-3">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicyModal;
