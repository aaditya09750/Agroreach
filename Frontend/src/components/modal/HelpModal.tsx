import React, { useEffect, useRef } from 'react';
import { X, Mail, Phone, MessageCircle, FileText, HelpCircle, Video } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
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

  const helpTopics = [
    {
      icon: Package,
      title: 'Product Management',
      description: 'Learn how to add, edit, and manage your products effectively.',
      articles: 3
    },
    {
      icon: ShoppingBag,
      title: 'Order Processing',
      description: 'Understanding order statuses, fulfillment, and customer notifications.',
      articles: 5
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Managing customer data, groups, and communication.',
      articles: 2
    },
    {
      icon: DollarSign,
      title: 'Revenue & Analytics',
      description: 'Track your income, generate reports, and analyze performance.',
      articles: 4
    },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-8 md:p-8"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden relative shadow-2xl my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="text-text-dark" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[85vh] scrollbar-hide p-6 md:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <HelpCircle size={24} className="text-primary" />
              </div>
              <div>
                <h2 id="help-modal-title" className="text-2xl md:text-3xl font-bold text-text-dark">
                  Help Center
                </h2>
                <p className="text-sm text-text-muted">Get help with managing your admin panel</p>
              </div>
            </div>
            <div className="w-24 h-[2px] rounded-full bg-gradient-to-r from-primary to-primary/1"></div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button className="flex items-center gap-3 p-4 border border-border-color rounded-lg hover:border-primary hover:bg-primary/5 transition-colors group">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-text-dark text-sm">Email Support</h3>
                <p className="text-xs text-text-muted">support@agroreach.com</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-border-color rounded-lg hover:border-primary hover:bg-primary/5 transition-colors group">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-text-dark text-sm">Call Us</h3>
                <p className="text-xs text-text-muted">+91 98765 43210</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-border-color rounded-lg hover:border-primary hover:bg-primary/5 transition-colors group">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageCircle size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-text-dark text-sm">Live Chat</h3>
                <p className="text-xs text-text-muted">Available 24/7</p>
              </div>
            </button>
          </div>

          {/* Help Topics */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-dark mb-4">Popular Help Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {helpTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <div 
                    key={index}
                    className="p-5 border border-border-color rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-dark mb-1 text-sm">{topic.title}</h4>
                        <p className="text-xs text-text-muted mb-2">{topic.description}</p>
                        <span className="text-xs text-primary font-medium">
                          {topic.articles} articles
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-dark mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <details className="group border border-border-color rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-text-dark text-sm">How do I add a new product?</span>
                  <svg className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-4 pt-0 text-sm text-text-dark-gray">
                  Navigate to the Products section from the sidebar, fill in the product details including name, 
                  category, price, and stock. Upload product images and click "Add Product" to save.
                </div>
              </details>

              <details className="group border border-border-color rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-text-dark text-sm">How do I process orders?</span>
                  <svg className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-4 pt-0 text-sm text-text-dark-gray">
                  Go to Orders section to view all incoming orders. Click on an order to view details, 
                  update the status (pending, processing, completed), and manage fulfillment.
                </div>
              </details>

              <details className="group border border-border-color rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-text-dark text-sm">How do I view sales analytics?</span>
                  <svg className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-4 pt-0 text-sm text-text-dark-gray">
                  The Dashboard/Home section provides an overview of your sales, revenue, and performance metrics. 
                  Access detailed analytics through the Income section for comprehensive reports.
                </div>
              </details>

              <details className="group border border-border-color rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-text-dark text-sm">Can I export order data?</span>
                  <svg className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-4 pt-0 text-sm text-text-dark-gray">
                  Yes, you can export order data by clicking the "Export" button in the Orders section. 
                  This will download a CSV file with all order information for your records.
                </div>
              </details>
            </div>
          </div>

          {/* Video Tutorials */}
          <div>
            <h3 className="text-lg font-semibold text-text-dark mb-4">Video Tutorials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-border-color rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Video size={28} className="text-primary ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-text-dark text-sm mb-1">Getting Started with Admin Panel</h4>
                  <p className="text-xs text-text-muted">5:30 minutes</p>
                </div>
              </div>

              <div className="border border-border-color rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Video size={28} className="text-primary ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-text-dark text-sm mb-1">Managing Products & Inventory</h4>
                  <p className="text-xs text-text-muted">8:15 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation Link */}
          <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-dark mb-2">Need More Help?</h3>
                <p className="text-sm text-text-dark-gray mb-4">
                  Check out our comprehensive documentation for detailed guides, API references, and best practices.
                </p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import icons that are used in the component
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';

export default HelpModal;
