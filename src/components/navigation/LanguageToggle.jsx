"use client";
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  
  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '8px 16px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
      title="Toggle Language"
    >
      {i18n.language === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}
    </button>
  );
}
