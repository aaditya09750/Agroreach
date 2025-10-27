import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import i18n from '../i18n/config';

export type Language = 'English' | 'Marathi' | 'Hindi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  getLanguageCode: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get saved language from localStorage or default to English
  const getSavedLanguage = (): Language => {
    const saved = localStorage.getItem('language');
    if (saved === 'Marathi' || saved === 'Hindi' || saved === 'English') {
      return saved as Language;
    }
    return 'English';
  };

  const [language, setLanguageState] = useState<Language>(getSavedLanguage());

  // Initialize i18n with saved language on mount
  useEffect(() => {
    const langCode = language === 'English' ? 'en' : language === 'Marathi' ? 'mr' : 'hi';
    i18n.changeLanguage(langCode);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Save to localStorage
    localStorage.setItem('language', lang);
    
    // Sync with i18n - convert language name to language code
    const langCode = lang === 'English' ? 'en' : lang === 'Marathi' ? 'mr' : 'hi';
    i18n.changeLanguage(langCode);
  };

  const getLanguageCode = (): string => {
    switch (language) {
      case 'Marathi':
        return 'Mar';
      case 'Hindi':
        return 'Hin';
      default:
        return 'Eng';
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        getLanguageCode,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
