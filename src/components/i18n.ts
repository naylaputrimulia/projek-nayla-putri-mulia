import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: "Home",
          about: "About",
          skills: "Skills",
          projects: "Projects",
          contact: "Contact",
        }
      },
      id: {
        translation: {
          home: "Beranda",
          about: "Tentang",
          skills: "Keahlian",
          projects: "Proyek",
          contact: "Kontak",
        }
      }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;