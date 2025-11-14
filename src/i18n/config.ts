import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import axios from 'axios';

// IP-based language detection
const detectLanguageByIP = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    const countryCode = response.data.country_code;

    // If user is from Georgia, set Georgian, otherwise English
    return countryCode === 'GE' ? 'ka' : 'en';
  } catch (error) {
    console.error('Failed to detect language by IP:', error);
    return 'en'; // Default to English
  }
};

// Custom language detector
const customLanguageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    const storedLang = localStorage.getItem('i18nextLng');

    if (storedLang) {
      callback(storedLang);
    } else {
      const detectedLang = await detectLanguageByIP();
      callback(detectedLang);
    }
  },
  init: () => {},
  cacheUserLanguage: (lng: string) => {
    localStorage.setItem('i18nextLng', lng);
  },
};

i18n
  .use(Backend)
  .use(customLanguageDetector)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ka'],
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
