// app/services/api.ts
export interface Site {
    id: number;
    name: string;
    description: string;
    detailedDescription: string;
    category: string;
    latitude: number;
    longitude: number;
    audioUrlIt: string;
    audioUrlEn: string;
  }
  
  const BASE_URL = 'http://localhost:8080/api'; // Modifica l'URL in base al tuo server https://tuo-backend-url.com/api 
  
  export const apiService = {
    getAllSites: async (): Promise<Site[]> => {
      try {
        const response = await fetch(`${BASE_URL}/sites`);
        if (!response.ok) {
          throw new Error('Errore nel recupero dei siti');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching sites:', error);
        return [];
      }
    },
  
    getSiteById: async (id: number): Promise<Site | null> => {
      try {
        const response = await fetch(`${BASE_URL}/sites/${id}`);
        if (!response.ok) {
          throw new Error(`Errore nel recupero del sito con ID ${id}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching site ${id}:`, error);
        return null;
      }
    },
  
    getSitesByCategory: async (category: string): Promise<Site[]> => {
      try {
        const response = await fetch(`${BASE_URL}/sites/category/${category}`);
        if (!response.ok) {
          throw new Error(`Errore nel recupero dei siti della categoria ${category}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching sites for category ${category}:`, error);
        return [];
      }
    }
  };