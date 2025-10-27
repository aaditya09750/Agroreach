import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AboutDetailModal from '../modal/AboutDetailModal';
import { useTranslation } from '../../i18n/useTranslation';

const AboutIntro: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <section className="flex flex-col md:flex-row items-center justify-center gap-10">
      <div className="relative shadow-2xl shadow-primary/40 rounded-2xl overflow-hidden shrink-0">
        <img 
          className="max-w-md w-full object-cover rounded-2xl"
          src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
          alt={t('about.teamCollaboration')}
        />
        <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-4 rounded-xl">
          <div className="flex -space-x-4 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" 
              alt={t('about.teamMember')}
              className="w-9 h-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[1]" 
            />
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" 
              alt={t('about.teamMember')}
              className="w-9 h-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]" 
            />
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
              alt={t('about.teamMember')}
              className="w-9 h-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]" 
            />
            <div className="flex items-center justify-center text-xs text-white w-9 h-9 rounded-full border-[3px] border-white bg-primary hover:-translate-y-1 transition z-[4]">
              50+
            </div>
          </div>
          <p className="text-sm font-medium text-text-dark">{t('about.joinCommunity')}</p>
        </div>
      </div>
      
      <div className="text-bold text-text-dark-gray max-w-lg">
        <h1 className="text-2xl uppercase font-bold text-text-dark">{t('about.whatWeDo')}</h1>
        <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-primary to-primary/1 mt-2"></div>
        
        <p className="mt-8">
          {t('about.description1')}
        </p>
        
        <p className="mt-4">
          {t('about.description2')}
        </p>
        
        <p className="mt-4">
          {t('about.description3')}
        </p>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-primary to-primary/80 py-3 px-8 rounded-full text-white font-medium"
        >
          <span>{t('common.readMore')}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>

    {isModalOpen && <AboutDetailModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default AboutIntro;

