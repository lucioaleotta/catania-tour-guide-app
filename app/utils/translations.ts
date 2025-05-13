// app/utils/translations.ts
import { useLanguage } from '@contexts/LanguageContext';
import { Site } from '@services/api';

export const useTranslations = () => {
  const { language } = useLanguage();

  const strings = {
    it: {
      allCategories: 'Tutti',
      readMore: 'Leggi tutto',
      readLess: 'Leggi meno',
      audioGuide: 'Audio guida:',
      loading: 'Caricamento...',
      playing: 'In riproduzione',
      listenAudio: 'Ascolta guida audio',
      createRoute: 'Crea il tuo percorso',
      hideSelection: 'Nascondi selezione luoghi',
      selectSpecificPlaces: 'Seleziona luoghi specifici',
      howMuchTime: 'Quanto tempo hai a disposizione?',
      hour: 'ora',
      hours: 'ore',
      halfDay: 'Mezza giornata',
      fullDay: 'Giornata intera',
      close: '×',
      errorLoadingSites: 'Impossibile caricare i siti turistici',
      errorGeneratingRoute: 'Errore nella generazione del percorso',
      errorProximityCheck: 'Errore nel controllo prossimità',
      // Nuove traduzioni
      letMeGuideYou: 'Lasciati guidare',
      createCustomRoute: 'Crea percorso personalizzato',
      autoRouteDescription: 'Ti suggerirò il percorso migliore in base al tempo che hai',
      customRouteDescription: 'Seleziona i luoghi che vuoi visitare',
      selectTime: 'Seleziona il tempo a disposizione',
      error: 'Errore',
      ok: 'OK',
      availableTime: 'Tempo a disposizione',
      createRouteButton: 'Crea Percorso',
      routeCreated: 'Percorso creato con successo',
      selectAtLeastOne: 'Seleziona almeno un luogo da visitare',
      timeRequired: 'Seleziona il tempo a disposizione'
    },
    en: {
      allCategories: 'All',
      readMore: 'Read more',
      readLess: 'Read less',
      audioGuide: 'Audio guide:',
      loading: 'Loading...',
      playing: 'Playing',
      listenAudio: 'Listen to audio guide',
      createRoute: 'Create your route',
      hideSelection: 'Hide places selection',
      selectSpecificPlaces: 'Select specific places',
      howMuchTime: 'How much time do you have?',
      hour: 'hour',
      hours: 'hours',
      halfDay: 'Half day',
      fullDay: 'Full day',
      close: '×',
      errorLoadingSites: 'Unable to load tourist sites',
      errorGeneratingRoute: 'Error generating route',
      errorProximityCheck: 'Error checking proximity',
      // New translations
      letMeGuideYou: 'Let me guide you',
      createCustomRoute: 'Create custom route',
      autoRouteDescription: 'I will suggest the best route based on your time',
      customRouteDescription: 'Select the places you want to visit',
      selectTime: 'Select available time',
      error: 'Error',
      ok: 'OK',
      availableTime: 'Available time',
      createRouteButton: 'Create Route',
      routeCreated: 'Route created successfully',
      selectAtLeastOne: 'Select at least one place to visit',
      timeRequired: 'Select available time'
    }
  };

  const t = (key: keyof typeof strings.it): string => {
    return strings[language][key];
  };

  // Utility per ottenere il testo localizzato da un Site
  const getSiteDescription = (site: Site): string => {
    return language === 'it' ? site.descriptionIt : site.descriptionEn;
  };

  const getSiteDetailedDescription = (site: Site): string => {
    return language === 'it' ? site.detailedDescriptionIt : site.detailedDescriptionEn;
  };

  const getSiteAudioUrl = (site: Site): string => {
    return language === 'it' ? site.signedAudioUrlIt : site.signedAudioUrlEn;
  };

  // Traduzioni per le categorie
  const getCategoryTranslation = (category: string): string => {
    const categoryMappings: Record<string, { it: string, en: string }> = {
      'chiesa': { it: 'chiesa', en: 'church' },
      'chiese': { it: 'chiese', en: 'churches' },
      'museo': { it: 'museo', en: 'museum' },
      'musei': { it: 'musei', en: 'museums' },
      'piazza': { it: 'piazza', en: 'square' },
      'teatro': { it: 'teatro', en: 'theater' },
      'teatri': { it: 'teatri', en: 'theaters' },
      'arena': { it: 'arena', en: 'arena' },
      'palazzo': { it: 'palazzo', en: 'palace' },
      'palazzi': { it: 'palazzi', en: 'palaces' },
      'fontana': { it: 'fontana', en: 'fountain' },
      'fontane': { it: 'fontane', en: 'fountains' },
      'parco': { it: 'parco', en: 'park' },
      'parchi': { it: 'parchi', en: 'parks' },
      'mercato': { it: 'mercato', en: 'market' },
      'mercati': { it: 'mercati', en: 'markets' },
      'castello': { it: 'castello', en: 'castle' },
      'castelli': { it: 'castelli', en: 'castles' },
      'monastero': { it: 'monastero', en: 'monastery' },
      'monasteri': { it: 'monasteri', en: 'monasteries' },
      'monumento': { it: 'monumento', en: 'monument' },
      'monumenti': { it: 'monumenti', en: 'monuments' }
    };

    const mapping = categoryMappings[category.toLowerCase()];
    if (mapping) {
      return mapping[language];
    }
    
    return category;
  };

  return {
    t,
    getSiteDescription,
    getSiteDetailedDescription,
    getSiteAudioUrl,
    getCategoryTranslation,
    language
  };
};