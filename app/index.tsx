import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocation } from '@hooks/useLocation';
import CataniaMapView from '@features/map/MapView';

export default function HomeScreen() {
  const location = useLocation();
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image 
          source={require('@assets/images/logo.png')} // Assicurati che il percorso sia corretto
          style={styles.logo}
        />
        <Text style={styles.title}>Benvenuto a Catania!</Text>
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
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