import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker, Region, Polyline } from 'react-native-maps';
import { useLocation } from '@hooks/useLocation';
import { useCategories } from '@hooks/useCategories';
import CustomMarker from '@components/maps/CustomMarker';
import SiteDetail from '@features/sites/SiteDetail';
import { Site, apiService } from '@services/api';
import RouteCreator, { RouteCreatorRef } from '@features/routes/RouteCreator';
import CategoryFilter from '@components/ui/CategoryFilter';
import { useLanguage } from '@contexts/LanguageContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslations } from '@utils/translations';

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

interface RouteData {
  selectedSites: Site[];
  time: string;
  isAutoRoute: boolean;
}

export default function CataniaMapView({ sites, loading }: CataniaMapViewProps) {
  const location = useLocation();
  const mapRef = useRef<MapView>(null);
  const { language } = useLanguage();
  const { categories, loading: categoriesLoading } = useCategories();
  const routeCreatorRef = useRef<RouteCreatorRef>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [routeSites, setRouteSites] = useState<Site[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { t } = useTranslations();

  const mapRegion: Region = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  } : CATANIA_DEFAULT;

  const filteredSites = sites?.filter(site => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(site.category);
  }) || [];

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(mapRegion, 1000);
    }
  }, [location]);

  const handleSelectAll = () => {
    if (selectedCategories.length === categories?.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories || []);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleRouteCreated = async (routeData: RouteData) => {
    try {
      const { selectedSites, time, isAutoRoute } = routeData;
      
      if (isAutoRoute) {
        // Converti il tempo nel formato corretto
        const timeMap: { [key: string]: number } = {
          '1 ora': 1,
          '2 ore': 2,
          '3 ore': 3,
          'Mezza giornata': 0.5,
          'Giornata intera': 1
        };
  
        const availableTime = timeMap[time] || 1;
  
        // Chiamata al backend
        const response = await apiService.generateRoute({
          sites: [],
          availableTime,
          startingPoint: location ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          } : {
            latitude: 37.5022,
            longitude: 15.0873
          }
        });
  
        // La risposta è già l'array dei siti
        setRouteSites(response);
  
        // Aggiorna la vista della mappa con i nuovi siti
        if (mapRef.current && response.length > 0) {
          const coordinates = response
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
        }
      } else {
        // Se non è una rotta automatica, usa i siti selezionati
        setRouteSites(selectedSites);
      }
    } catch (error) {
      console.error('Error handling route creation:', error);
      Alert.alert(
        t('error'),
        t('errorGeneratingRoute'),
        [{ text: t('ok'), onPress: () => {} }]
      );
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
          customMapStyle={mapStyle}
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

        <View style={styles.categoryFilterContainer}>
          <CategoryFilter
            categories={categories || []}
            selectedCategories={selectedCategories}
            onSelectCategory={handleCategorySelect}
            onSelectAll={handleSelectAll}
          />
        </View>

        <TouchableOpacity 
          style={styles.createRouteButton}
          onPress={() => routeCreatorRef.current?.show()}
        >
          <FontAwesome5 name="route" size={20} color="white" />
          <Text style={styles.createRouteButtonText}>
            {t('createRoute')}
          </Text>
        </TouchableOpacity>

        {selectedSite && (
          <SiteDetail
            site={selectedSite}
            onClose={() => setSelectedSite(null)}
          />
        )}

        <RouteCreator 
          ref={routeCreatorRef}
          sites={sites} 
          onRouteCreated={handleRouteCreated}
          selectedCategories={selectedCategories}
        />
      </View>
    </SafeAreaView>
  );
}

const mapStyle = [
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryFilterContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    zIndex: 999,
  },
  createRouteButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createRouteButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  }
});

