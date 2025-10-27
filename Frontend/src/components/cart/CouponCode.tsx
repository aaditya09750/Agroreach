import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';

const CouponCode: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="border border-border-color rounded-lg p-6">
      <h3 className="text-lg font-medium text-text-dark mb-4">{t('cart.couponCode')}</h3>
      <div className="flex">
        <input 
          type="text" 
          placeholder={t('cart.enterCode')}
          className="w-full px-4 py-3 border border-border-color rounded-l-full text-text-dark-gray placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
        <button className="bg-text-dark text-white font-semibold px-6 rounded-r-full hover:bg-opacity-90 transition-colors">
          {t('cart.applyCoupon')}
        </button>
      </div>
    </div>
  );
};

export default CouponCode;
