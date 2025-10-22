import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface AboutDetailModalProps {
  onClose: () => void;
}

const AboutDetailModal: React.FC<AboutDetailModalProps> = ({ onClose }) => {
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
        aria-labelledby="about-modal-title"
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
            <h2 id="about-modal-title" className="text-2xl md:text-3xl font-bold text-text-dark">
              Our Mission & Vision
            </h2>
            <div className="w-24 h-[2px] rounded-full bg-gradient-to-r from-primary to-primary/1 mt-3"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 text-text-dark-gray text-sm">
            {/* Mission Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-4">Our Mission</h3>
              <p className="leading-relaxed">
                Agroreach's mission is to revolutionize the agricultural supply chain by creating a direct connection 
                between local farmers and consumers. We strive to ensure that fresh, organic produce reaches your 
                doorstep within 24-48 hours of harvest, maintaining maximum nutritional value and freshness.
              </p>
              <p className="leading-relaxed mt-4">
                We are committed to empowering farmers by providing them with fair prices and eliminating unnecessary 
                middlemen. Through our platform, farmers can reach a wider market while consumers enjoy premium quality 
                produce at competitive prices.
              </p>
            </div>

            {/* Vision Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-4">Our Vision</h3>
              <p className="leading-relaxed">
                We envision a future where sustainable agriculture becomes the norm, not the exception. Agroreach aims 
                to build the largest network of organic farmers and conscious consumers across India, promoting 
                eco-friendly farming practices and reducing carbon footprint through efficient logistics.
              </p>
              <p className="leading-relaxed mt-4">
                Our vision extends beyond commerce – we want to create a community that values health, sustainability, 
                and fair trade. By 2030, we aim to connect over 10,000 farmers with millions of households, making 
                organic food accessible and affordable for everyone.
              </p>
            </div>

            {/* What We Offer Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-4">What We Offer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2 text-sm">Fresh Vegetables</h4>
                  <p className="text-xs">
                    Seasonal and year-round vegetables sourced directly from certified organic farms, 
                    delivered within 24 hours of harvest.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2 text-sm">Exotic Fruits</h4>
                  <p className="text-xs">
                    Premium quality fruits including tropical and seasonal varieties, carefully selected 
                    and packed to preserve freshness.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2 text-sm">Daily Essentials</h4>
                  <p className="text-xs">
                    From dairy products to pantry staples, all sourced from trusted local suppliers 
                    maintaining the highest quality standards.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2 text-sm">Custom Orders</h4>
                  <p className="text-xs">
                    Bulk orders for events, restaurants, and institutions with flexible delivery 
                    schedules and competitive wholesale pricing.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Values Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-4">Our Core Values</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-text-dark text-sm">Quality First</h4>
                    <p className="text-xs mt-1">
                      Every product undergoes rigorous quality checks to ensure you receive only the best.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-text-dark text-sm">Sustainability</h4>
                    <p className="text-xs mt-1">
                      We promote eco-friendly farming practices and minimize waste throughout our supply chain.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-text-dark text-sm">Farmer Empowerment</h4>
                    <p className="text-xs mt-1">
                      Fair pricing and direct market access help farmers grow their business and improve livelihoods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-text-dark text-sm">Customer Satisfaction</h4>
                    <p className="text-xs mt-1">
                      24/7 support and hassle-free returns ensure your complete satisfaction with every order.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-text-dark text-sm">Transparency</h4>
                    <p className="text-xs mt-1">
                      Complete traceability from farm to table – know exactly where your food comes from.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-dark mb-4">Our Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">350+</p>
                  <p className="text-xs text-text-muted mt-1">Partner Farmers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">5000+</p>
                  <p className="text-xs text-text-muted mt-1">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">15K+</p>
                  <p className="text-xs text-text-muted mt-1">Orders Delivered</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-xs text-text-muted mt-1">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
              <h3 className="text-base font-semibold text-text-dark mb-2">Join Our Community</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Whether you're a farmer looking to expand your reach or a consumer seeking fresh, organic produce, 
                Agroreach welcomes you to join our growing community. Together, we can build a sustainable future 
                for agriculture and healthy living.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDetailModal;
