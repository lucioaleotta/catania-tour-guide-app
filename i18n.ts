import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import it from './locales/it.json';

i18n
  .use(initReactI18next)
  .init({
    // Removed compatibilityJSON as it is not valid
    lng: Localization.locale.startsWith('it') ? 'it' : 'en',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      it: { translation: it },
    },
    interpolation: { escapeValue: false },
  });