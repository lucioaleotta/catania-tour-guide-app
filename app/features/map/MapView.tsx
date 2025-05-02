import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Region, Polyline } from 'react-native-maps';
import { useLocation } from '@hooks/useLocation';
import { useCategories } from '@hooks/useCategories';
import CustomMarker from '@components/maps/CustomMarker';
import SiteDetail from '@features/sites/SiteDetail';
import { Site } from '@services/api';
import RouteCreator from '@features/routes/RouteCreator';
import CategoryGrid from '@components/ui/CategoryGrid';
import SearchBar from '@components/ui/SearchBar';
import { useLanguage } from '@contexts/LanguageContext';

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
  const { language } = useLanguage();
  const { categories, loading: categoriesLoading } = useCategories();
  
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [routeSites, setRouteSites] = useState<Site[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Definire la regione in base alla posizione dell'utente o alla posizione predefinita
  const mapRegion: Region = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  } : CATANIA_DEFAULT;

  // Filter sites based on selected category and search query
  const filteredSites = sites?.filter(site => {
    const matchesCategory = selectedCategory ? site.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? site.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  }) || [];

  // Effetto per centrare la mappa quando la posizione cambia
  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(mapRegion, 1000);
    }
  }, [location]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleRouteCreated = (route: Site[]) => {
    if (!route || !Array.isArray(route)) {
      console.error("Invalid route data");
      return;
    }

    setRouteSites(route);

    if (route.length > 0 && mapRef.current) {
      try {
        const coordinates = route
          .filter(site => site && typeof site.latitude === 'number' && typeof site.longitude === 'number')
          .map(site => ({
            latitude: site.latitude,
            longitude: site.longitude,
          }));

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

  if (loading || categoriesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={Platform.OS === 'android' ? 'google' : undefined}
          style={styles.map}
          initialRegion={CATANIA_DEFAULT}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {filteredSites.map(site => (
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

          {routeSites && routeSites.length > 1 && (
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

        <SearchBar onSearch={setSearchQuery} />

        {selectedSite && (
          <SiteDetail
            site={selectedSite}
            onClose={() => setSelectedSite(null)}
          />
        )}

        {sites && Array.isArray(sites) && (
          <RouteCreator 
            sites={sites} 
            onRouteCreated={handleRouteCreated} 
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allButton: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  allButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});