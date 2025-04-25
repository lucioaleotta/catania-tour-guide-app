import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

// Coordinate di Piazza del Duomo di Catania
const CATANIA_DEFAULT = {
  latitude: 37.5022,
  longitude: 15.0873,
};

// Raggio approssimativo dell'area di Catania in gradi (circa 30km)
const CATANIA_RADIUS = 0.3;

// Funzione per verificare se una posizione è vicina a Catania
const isInCataniaArea = (lat: number, lon: number): boolean => {
  const distance = Math.sqrt(
    Math.pow(lat - CATANIA_DEFAULT.latitude, 2) + 
    Math.pow(lon - CATANIA_DEFAULT.longitude, 2)
  );
  return distance <= CATANIA_RADIUS;
};

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.error('Permesso negato');
        // Se il permesso è negato, impostiamo la posizione predefinita
        setLocation({
          coords: {
            latitude: CATANIA_DEFAULT.latitude,
            longitude: CATANIA_DEFAULT.longitude,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null
          },
          timestamp: Date.now()
        } as Location.LocationObject);
        return;
      }
      
      try {
        const userLocation = await Location.getCurrentPositionAsync({});
        console.log('Posizione attuale:', userLocation);
        
        // Verifica se l'utente è nell'area di Catania
        if (isInCataniaArea(userLocation.coords.latitude, userLocation.coords.longitude)) {
          setLocation(userLocation);
        } else {
          console.log('Utente fuori Catania, utilizzo posizione predefinita');
          // Utente fuori dall'area di Catania, impostiamo la posizione predefinita
          setLocation({
            coords: {
              latitude: CATANIA_DEFAULT.latitude,
              longitude: CATANIA_DEFAULT.longitude,
              altitude: null,
              accuracy: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null
            },
            timestamp: Date.now()
          } as Location.LocationObject);
        }
      } catch (error) {
        console.error('Errore nel recupero della posizione:', error);
        // In caso di errore, impostiamo la posizione predefinita
        setLocation({
          coords: {
            latitude: CATANIA_DEFAULT.latitude,
            longitude: CATANIA_DEFAULT.longitude,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null
          },
          timestamp: Date.now()
        } as Location.LocationObject);
      }
    })();
  }, []);
  
  return location;
};