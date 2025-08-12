import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Import translation files
import koTranslations from './locales/ko/translation.json';
import enTranslations from './locales/en/translation.json';
import jaTranslations from './locales/ja/translation.json';
import zhTranslations from './locales/zh/translation.json';
import esTranslations from './locales/es/translation.json';
import frTranslations from './locales/fr/translation.json';
import deTranslations from './locales/de/translation.json';
import ruTranslations from './locales/ru/translation.json';
import ptTranslations from './locales/pt/translation.json';
import arTranslations from './locales/ar/translation.json';
import hiTranslations from './locales/hi/translation.json';
import viTranslations from './locales/vi/translation.json';
import thTranslations from './locales/th/translation.json';
import idTranslations from './locales/id/translation.json';
import itTranslations from './locales/it/translation.json';

const resources = {
  ko: { translation: koTranslations },
  en: { translation: enTranslations },
  ja: { translation: jaTranslations },
  zh: { translation: zhTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  ru: { translation: ruTranslations },
  pt: { translation: ptTranslations },
  ar: { translation: arTranslations },
  hi: { translation: hiTranslations },
  vi: { translation: viTranslations },
  th: { translation: thTranslations },
  id: { translation: idTranslations },
  it: { translation: itTranslations }
};

// 언어 코드 매핑 (브라우저 언어 코드를 앱 언어 코드로 변환)
const languageMapping = {
  'ko-KR': 'ko',
  'en-US': 'en',
  'en-GB': 'en',
  'ja-JP': 'ja',
  'zh-CN': 'zh',
  'zh-TW': 'zh',
  'es-ES': 'es',
  'es-MX': 'es',
  'fr-FR': 'fr',
  'de-DE': 'de',
  'ru-RU': 'ru',
  'pt-BR': 'pt',
  'pt-PT': 'pt',
  'ar-SA': 'ar',
  'hi-IN': 'hi',
  'vi-VN': 'vi',
  'th-TH': 'th',
  'id-ID': 'id',
  'it-IT': 'it'
};

// 사용자 언어 감지 함수
export const detectUserLanguage = () => {
  // 1. localStorage에서 저장된 언어 확인
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage && resources[savedLanguage]) {
    return savedLanguage;
  }

  // 2. URL 파라미터에서 언어 확인
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && resources[urlLang]) {
    return urlLang;
  }

  // 3. 브라우저 언어 감지
  const browserLang = navigator.language || navigator.userLanguage;
  
  // 정확한 매칭 확인
  if (languageMapping[browserLang]) {
    return languageMapping[browserLang];
  }
  
  // 언어 코드의 첫 두 글자로 매칭
  const shortLang = browserLang.substring(0, 2).toLowerCase();
  if (resources[shortLang]) {
    return shortLang;
  }

  // 4. 기본 언어는 한국어
  return 'ko';
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: detectUserLanguage(),
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'preferredLanguage'
    },

    interpolation: {
      escapeValue: false // React already escapes values
    },

    react: {
      useSuspense: false
    }
  });

// 언어 변경 시 localStorage에 저장
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('preferredLanguage', lng);
  document.documentElement.lang = lng;
  
  // RTL 언어 처리
  if (lng === 'ar' || lng === 'he') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
});

export default i18n;

// 지원하는 언어 목록
export const supportedLanguages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];