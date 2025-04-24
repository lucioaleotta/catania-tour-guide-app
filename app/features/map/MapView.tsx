// app/features/map/MapView.tsx
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useSites } from '@hooks/useSites';
import { useLocation } from '@hooks/useLocation';
import CustomMarker from '@components/maps/CustomMarker';

export default function CataniaMapView() {
  const { sites, loading, error } = useSites();
  const location = useLocation();

  const initialRegion = {
    latitude: 37.5024,  // Catania - Piazza Duomo
    longitude: 15.0873,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

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
       // provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
       // showsUserLocation={true}
       // showsMyLocationButton={true}
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