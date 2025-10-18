import React from 'react';
import { Truck, Headphones, ShoppingBag, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex items-center gap-3 md:gap-4">
    <div className="text-[#00B207] flex-shrink-0">{icon}</div>
    <div>
      <h3 className="font-semibold text-[#1A1A1A] text-sm md:text-base mb-0.5">
        {title}
      </h3>
      <p className="text-[#999999] text-xs md:text-sm">
        {description}
      </p>
    </div>
  </div>
);

const Features: React.FC = () => {
  const { t } = useTranslation();
  
  const featuresData = [
    {
      icon: <Truck size={32} strokeWidth={1.5} />,
      title: t('features.freeShipping'),
      description: t('features.freeShippingDesc'),
    },
    {
      icon: <Headphones size={32} strokeWidth={1.5} />,
      title: t('features.customerSupport'),
      description: t('features.customerSupportDesc'),
    },
    {
      icon: <ShoppingBag size={32} strokeWidth={1.5} />,
      title: t('features.securePayment'),
      description: t('features.securePaymentDesc'),
    },
    {
      icon: <Package size={32} strokeWidth={1.5} />,
      title: t('features.moneyBack'),
      description: t('features.moneyBackDesc'),
    },
  ];

  return (
    <div className="px-4 md:px-6 lg:px-8 xl:px-12 -mt-8 md:-mt-10 lg:-mt-12 relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-5 md:px-8 lg:px-10 py-5 md:py-6 lg:py-7">
            {featuresData.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;