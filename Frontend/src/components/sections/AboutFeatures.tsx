import React from 'react';
import Icon1 from '../../assets/Icon.png';
import Icon2 from '../../assets/Icon (1).png';
import Icon3 from '../../assets/Icon (2).png';
import Icon4 from '../../assets/Icon (3).png';
import Icon5 from '../../assets/Icon (4).png';
import Icon6 from '../../assets/Icon (5).png';
import BgImage from '../../assets/BG.png';
import aboutManImage from '../../assets/about/AboutMan.png';
import { useTranslation } from '../../i18n/useTranslation';

const FeatureItem: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-14 h-14 bg-primary-light rounded-full flex items-center justify-center">
            <img src={icon} alt={title} className="w-10 h-10" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-text-dark">{title}</h3>
            <p className="mt-1 text-sm text-text-muted">{description}</p>
        </div>
    </div>
);

const AboutFeatures: React.FC = () => {
    const { t } = useTranslation();
    
    const features = [
        { icon: Icon1, title: t('about.organicFood'), description: t('about.organicFoodDesc') },
        { icon: Icon2, title: t('about.greatSupport'), description: t('about.greatSupportDesc') },
        { icon: Icon3, title: t('about.customerFeedback'), description: t('about.customerFeedbackDesc') },
        { icon: Icon4, title: t('about.securePayment'), description: t('about.securePaymentDesc') },
        { icon: Icon5, title: t('about.freeShipping'), description: t('about.freeShippingDesc') },
        { icon: Icon6, title: t('about.farmFresh'), description: t('about.farmFreshDesc') },
    ];

    return (
        <section className="bg-white relative overflow-hidden" style={{ backgroundImage: `url(${BgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-0 relative z-10">
                <div className="relative">
                    <img 
                        src={aboutManImage} 
                        alt={t('about.farmerWithProduce')}
                        className="relative w-full h-auto rounded-lg z-10" 
                    />
                </div>
                <div>
                    <h2 className="text-5xl font-bold text-text-dark leading-tight">{t('about.trustedStore')}</h2>
                    <p className="mt-6 text-base text-text-muted leading-relaxed">
                        {t('about.trustedStoreDesc')}
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {features.map((feature, index) => (
                            <FeatureItem key={index} {...feature} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutFeatures;
