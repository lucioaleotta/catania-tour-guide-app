// app/services/api.ts
export interface Site {
    id: number;
    name: string;
    descriptionIt: string;
    descriptionEn: string;
    detailedDescriptionIt: string;
    detailedDescriptionEn: string;
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
    },

    // Aggiungiamo a apiService
    generateRoute: async (request: RouteRequest): Promise<Site[]> => {
      try {
        console.log("Sending route request:", request);
        
        const response = await fetch(`${BASE_URL}/routes/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        });
        
        if (!response.ok) {
          throw new Error(`Errore nella generazione del percorso: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Route response - data:", data);
        console.log("Route response - data.rouute:", data.route);
        
        // Verifica che data.route esista e sia un array
        //if (!data || !data.route || !Array.isArray(data.route)) {
        if (!data || !Array.isArray(data)) {
          console.error("Invalid API response structure:", data);
          return [];
        }
        
        return data;
      } catch (error) {
        console.error('Error generating route:', error);
        return [];
      }
    },
  
    checkProximity: async (position: { latitude: number; longitude: number }): Promise<Site[]> => {
      try {
        const response = await fetch(`${BASE_URL}/proximity/check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(position),
        });
        
        if (!response.ok) {
          throw new Error('Errore nel controllo prossimità');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error checking proximity:', error);
        return [];
      }
    }
  };
  
  export interface RouteRequest {
    sites: number[];
    startingPoint?: { latitude: number; longitude: number };
    availableTime?: number;
  }
  
  export interface RouteResponse {
    route: Site[];
  }