import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import MapView, { Marker, Region, Polyline } from 'react-native-maps';
import { useLocation } from '@hooks/useLocation';
import CustomMarker from '@components/maps/CustomMarker';
import SiteDetail from '@features/sites/SiteDetail';
import { Site } from '@services/api';
import RouteCreator from '@features/routes/RouteCreator';

// Coordinate di Piazza del Duomo di Catania
const CATANIA_DEFAULT: Region = {
  latitude: 37.5022,
  longitude: 15.0873,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

interface CataniaMapViewProps {
  sites: Site[];
  loading: boolean;
}

export default function CataniaMapView({ sites, loading }: CataniaMapViewProps) {
  const location = useLocation();
  const mapRef = useRef<MapView>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [routeSites, setRouteSites] = useState<Site[]>([]);
  
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
  
  // Gestisce la creazione di un nuovo percorso con controlli più robusti
  const handleRouteCreated = (route: Site[]) => {
    console.log("Route received:", route);
    
    // Verifica che route sia definito e sia un array
    if (!route) {
      console.error("Route is undefined or null");
      return;
    }
    
    // Assicuriamoci che sia un array
    if (!Array.isArray(route)) {
      console.error("Route is not an array:", route);
      return;
    }
    
    setRouteSites(route);
    
    // Calcola i limiti per fare zoom sulla mappa solo se ci sono siti nel percorso
    if (route.length > 0 && mapRef.current) {
      try {
        const coordinates = route.map(site => {
          // Verifica che i siti abbiano coordinate valide
          if (!site || typeof site.latitude !== 'number' || typeof site.longitude !== 'number') {
            console.error("Invalid site coordinates:", site);
            return null;
          }
          return {
            latitude: site.latitude,
            longitude: site.longitude,
          };
        }).filter(coord => coord !== null);
        
        // Verifica che ci siano coordinate valide
        if (coordinates.length > 0) {
          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          });
        }
      } catch (error) {
        console.error("Error fitting coordinates:", error);
      }
    }
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
        ref={mapRef}
        provider={Platform.OS === 'android' ? 'google' : undefined}
        style={styles.map}
        initialRegion={CATANIA_DEFAULT}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {sites && Array.isArray(sites) && sites.map(site => (
          <Marker
            key={site.id}
            coordinate={{
              latitude: site.latitude,
              longitude: site.longitude
            }}
            title={site.name}
            onPress={() => setSelectedSite(site)}
          >
            <CustomMarker category={site.category} />
          </Marker>
        ))}
        
        {/* Linea del percorso con controlli aggiuntivi */}
        {routeSites && Array.isArray(routeSites) && routeSites.length > 1 && (
          <Polyline
            coordinates={routeSites
              .filter(site => site && typeof site.latitude === 'number' && typeof site.longitude === 'number')
              .map(site => ({
                latitude: site.latitude,
                longitude: site.longitude,
              }))}
            strokeWidth={4}
            strokeColor="#2196F3"
          />
        )}
      </MapView>
      
      {selectedSite && (
        <SiteDetail
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
        />
      )}
      
      {/* RouteCreator con il controllo che sites sia definito */}
      {sites && Array.isArray(sites) && (
        <RouteCreator 
          sites={sites} 
          onRouteCreated={handleRouteCreated} 
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