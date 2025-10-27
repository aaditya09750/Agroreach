import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { getTranslatedProductName, getTranslatedCategory } from './productTranslations';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();
  const { language } = useLanguage();

  // Helper to translate product names
  const translateProduct = (productName: string): string => {
    return getTranslatedProductName(productName, language);
  };

  // Helper to translate category names
  const translateCategory = (category: string): string => {
    return getTranslatedCategory(category, language);
  };

  return {
    t,
    i18n,
    language,
    translateProduct,
    translateCategory
  };
};
