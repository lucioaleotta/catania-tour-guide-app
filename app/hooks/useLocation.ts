import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permesso negato');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      console.log('Posizione attuale:', location);
      setLocation(location);
    })();
  }, []);

  return location;
};