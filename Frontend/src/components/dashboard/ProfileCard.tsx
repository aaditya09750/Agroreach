import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useTranslation } from '../../i18n/useTranslation';
import { User } from 'lucide-react';

const ProfileCard: React.FC = () => {
  const { profile } = useUser();
  const { t } = useTranslation();

  return (
    <div className="border border-border-color rounded-lg p-8 h-full flex flex-col items-center text-center">
      {profile.image ? (
        <img
          src={profile.image}
          alt={t('dashboard.profile')}
          className="w-32 h-32 rounded-full object-cover"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="w-14 h-14 text-gray-400" />
        </div>
      )}
      <h3 className="text-xl font-medium text-text-dark mt-4">
        {profile.firstName || profile.lastName 
          ? `${profile.firstName} ${profile.lastName}`.trim() 
          : t('dashboard.guestUser')}
      </h3>
      <p className="text-sm text-text-muted mt-1">{t('dashboard.customer')}</p>
      <Link 
        to="/settings" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="mt-4 text-base font-medium text-primary hover:underline"
      >
        {t('dashboard.editProfile')}
      </Link>
    </div>
  );
};

export default ProfileCard;
