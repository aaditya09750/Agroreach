import React from 'react';
import bcBanner from '../../assets/BC Banner.png';
import { useTranslation } from '../../i18n/useTranslation';

const ContactBanner: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div 
      className="h-[130px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bcBanner})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-[120px] h-full flex flex-col justify-center items-left text-left">
        <h1 className="text-4xl font-semibold text-white">{t('header.contactUs')}</h1>
      </div>
    </div>
  );
};

export default ContactBanner;
