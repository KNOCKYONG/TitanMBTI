import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { supportedLanguages } from '../i18n/config';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentLang = supportedLanguages.find(lang => lang.code === i18n.language) || supportedLanguages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    
    // Add URL parameter for language
    const url = new URL(window.location);
    url.searchParams.set('lang', langCode);
    window.history.replaceState({}, '', url);
  };

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4 text-amber-400" />
        <span className="text-sm font-medium text-gray-300 group-hover:text-white">
          {currentLang.flag} {currentLang.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="py-2">
              {supportedLanguages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-700/50 transition-colors duration-150
                    ${i18n.language === lang.code ? 'bg-amber-500/10' : ''}
                  `}
                  whileHover={{ x: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className={`text-sm ${i18n.language === lang.code ? 'text-amber-400 font-medium' : 'text-gray-300'}`}>
                      {lang.name}
                    </span>
                  </div>
                  {i18n.language === lang.code && (
                    <Check className="w-4 h-4 text-amber-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;