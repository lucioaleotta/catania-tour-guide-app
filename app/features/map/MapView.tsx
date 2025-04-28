//app/features/map/MapView.tsx
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useLocation } from '@hooks/useLocation';
import CustomMarker from '@components/maps/CustomMarker';
import SiteDetail from '@features/sites/SiteDetail';
import { Site } from '@services/api'
//import { useTranslations } from '@utils/translations';



// Coordinate di Piazza del Duomo di Catania
const CATANIA_DEFAULT: Region = {
  latitude: 37.5022,
  longitude: 15.0873,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

//const {getSiteDescription } = useTranslations();


interface CataniaMapViewProps {
  sites: Site[];
  loading: boolean;
}

export default function CataniaMapView({ sites, loading }: CataniaMapViewProps) {
  const location = useLocation();
  const mapRef = useRef<MapView>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  // Definire la regione in base alla posizione dell'utente o alla posizione predefinita
  const mapRegion: Region = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  } : CATANIA_DEFAULT;

  // Effetto per centrare la mappa quando la posizione cambia
  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(mapRegion, 1000);
    }
  }, [location]);

  console.log('Regione della mappa:', mapRegion);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={Platform.OS === 'android' ? 'google' : undefined}
        style={styles.map}
        initialRegion={CATANIA_DEFAULT}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {sites && Array.isArray(sites) && sites.map(site => {
          console.log('Rendering marker per il sito:', site);
          return (
            <Marker
              key={site.id}
              coordinate={{
                latitude: site.latitude,
                longitude: site.longitude
              }}
              title={site.name}
              //description={getSiteDescription(site).substring(0, 30) + '...'}
              onPress={() => setSelectedSite(site)}
            >
              <CustomMarker category={site.category} />
            </Marker>
          );
        })}
      </MapView>
      {selectedSite && (

        <SiteDetail
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
        />

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});