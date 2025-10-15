import React from 'react';
import Icon1 from '../../assets/Icon.png';
import Icon2 from '../../assets/Icon (1).png';
import Icon3 from '../../assets/Icon (2).png';
import Icon4 from '../../assets/Icon (3).png';
import Icon5 from '../../assets/Icon (4).png';
import Icon6 from '../../assets/Icon (5).png';
import BgImage from '../../assets/BG.png';
import aboutManImage from '../../assets/about/AboutMan.png';

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
    const features = [
        { icon: Icon1, title: "100% Organic Food", description: "Certified organic & pesticide-free produce." },
        { icon: Icon2, title: "Great Support 24/7", description: "Always ready to assist you" },
        { icon: Icon3, title: "Customer Feedback", description: "5000+ satisfied customers" },
        { icon: Icon4, title: "100% Secure Payment", description: "Multiple safe payment options" },
        { icon: Icon5, title: "Free Shipping", description: "Free delivery on orders above within 5km" },
        { icon: Icon6, title: "Farm Fresh Quality", description: "Delivered within 24-48 hours." },
    ];

    return (
        <section className="bg-white relative overflow-hidden" style={{ backgroundImage: `url(${BgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-0 relative z-10">
                <div className="relative">
                    <img 
                        src={aboutManImage} 
                        alt="Farmer with fresh produce" 
                        className="relative w-full h-auto rounded-lg z-10" 
                    />
                </div>
                <div>
                    <h2 className="text-5xl font-bold text-text-dark leading-tight">100% Trusted Organic Food Store</h2>
                    <p className="mt-6 text-base text-text-muted leading-relaxed">
                        We source directly from certified organic farms across India, ensuring every product meets the highest quality standards. Our commitment to freshness and sustainability makes us your trusted partner for healthy living.
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
