import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocation } from '@hooks/useLocation';
import CataniaMapView from '@features/map/MapView';

export default function HomeScreen() {
  const location = useLocation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benvenuto a Catania!</Text>
      <CataniaMapView />
      {location && (
        <Text style={styles.locationText}>
          Posizione attuale: {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  locationText: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 5,
  }
});