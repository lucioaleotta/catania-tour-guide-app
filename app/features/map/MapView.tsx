// app/features/map/MapView.tsx
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useSites } from '@hooks/useSites';
import { useLocation } from '@hooks/useLocation';
import CustomMarker from '@components/maps/CustomMarker';

// Coordinate di Piazza del Duomo di Catania
const CATANIA_DEFAULT: Region = {
  latitude: 37.5022,
  longitude: 15.0873,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function CataniaMapView() {
  const { sites, loading, error } = useSites();
  const location = useLocation();
  const mapRef = useRef<MapView>(null);

  // Definire la regione in base alla posizione dell'utente o alla posizione predefinita
  const mapRegion: Region = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  } : CATANIA_DEFAULT;

  //console.log('Sites data:', sites);
  // Effetto per centrare la mappa quando la posizione cambia
  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(mapRegion, 1000);
    }
  }, [location]);

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
        //ref={mapRef}
        provider={Platform.OS === 'android' ? 'google' : null} 
        style={styles.map}
        initialRegion={CATANIA_DEFAULT}
        //region={mapRegion}
        showsUserLocation={false}
        zoomEnabled
        scrollEnabled
        //loadingEnabled={true}
      >
       {sites.map(site => (
          <Marker
            key={site.id}
            coordinate={{
              latitude: site.latitude,
              longitude: site.longitude
            }}
            title={site.name}
            description={site.description}
          >
          <CustomMarker category={site.category} />
          </Marker>
        ))}
      </MapView>
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