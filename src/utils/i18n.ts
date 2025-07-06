// src/i18n/index.ts - تحديث إعدادات i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import arTranslation from './languages/ar.json';
import enTranslation from './languages/en.json';

const resources = {
  ar: {
    translation: arTranslation
  },
  en: {
    translation: enTranslation
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language'
    }
  });

export default i18n;
