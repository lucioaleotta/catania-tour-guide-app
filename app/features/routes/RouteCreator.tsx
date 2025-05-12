import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  Dimensions
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslations } from '@utils/translations';
import { Site } from '@services/api';

// Interfacce
interface RouteCreatorProps {
  sites: Site[];
  onRouteCreated: (routeData: { 
    selectedSites: Site[], 
    time: string, 
    isAutoRoute: boolean 
  }) => void;
  selectedCategories: string[];
}

export interface RouteCreatorRef {
  show: () => void;
  hide: () => void;
}

const { width } = Dimensions.get('window');

const RouteCreator = forwardRef<RouteCreatorRef, RouteCreatorProps>(({ 
  sites, 
  onRouteCreated,
  selectedCategories 
}, ref) => {
  // Stati
  const { t, getCategoryTranslation } = useTranslations();
  const [selectedSites, setSelectedSites] = useState<Site[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoRoute, setIsAutoRoute] = useState<boolean | null>(null);

  // Gestione ref
  useImperativeHandle(ref, () => ({
    show: () => {
      setIsVisible(true);
      setIsAutoRoute(null);
      setSelectedTime(null);
      setSelectedSites([]);
    },
    hide: () => setIsVisible(false)
  }));

  // Handlers
  const handleModeSelection = (auto: boolean) => {
    setIsAutoRoute(auto);
    setSelectedSites([]);
  };

  const handleClose = () => {
    setIsVisible(false);
    setSelectedSites([]);
    setSelectedTime(null);
  };

  const handleSiteSelection = (site: Site) => {
    setSelectedSites(prev => {
      if (prev.some(s => s.id === site.id)) {
        return prev.filter(s => s.id !== site.id);
      } else {
        return [...prev, site];
      }
    });
  };

  const handleCreateRoute = () => {
    if (!selectedTime) {
      Alert.alert(
        t('error'),
        t('selectTime'),
        [{ text: t('ok'), onPress: () => {} }]
      );
      return;
    }

    if (!isAutoRoute && selectedSites.length === 0) {
      Alert.alert(
        t('error'),
        t('selectAtLeastOne'),
        [{ text: t('ok'), onPress: () => {} }]
      );
      return;
    }

    onRouteCreated({
      selectedSites: isAutoRoute ? [] : selectedSites,
      time: selectedTime,
      isAutoRoute: Boolean(isAutoRoute)
    });
    handleClose();
  };

  // Helper functions
  const getCategoryIcon = (category: string): string => {
    const categoryLower = category.toLowerCase();
    switch (categoryLower) {
      case 'chiesa':
      case 'chiese':
        return 'church';
      case 'museo':
      case 'musei':
        return 'museum';
      case 'piazza':
        return 'city';
      case 'teatro':
      case 'teatri':
        return 'theater-masks';
      case 'palazzo':
      case 'palazzi':
        return 'building';
      case 'fontana':
      case 'fontane':
        return 'tint';
      case 'parco':
      case 'parchi':
        return 'tree';
      case 'mercato':
      case 'mercati':
        return 'shopping-basket';
      case 'castello':
      case 'castelli':
        return 'fort-awesome';
      case 'monastero':
      case 'monasteri':
        return 'cross';
      case 'monumento':
      case 'monumenti':
        return 'monument';
      case 'food':
        return 'utensils';
      default:
        return 'map-marker-alt';
    }
  };

  const filteredAndGroupedSites = React.useMemo(() => {
    const filteredSites = selectedCategories.length > 0
      ? sites.filter(site => selectedCategories.includes(site.category))
      : sites;

    return filteredSites.reduce((acc, site) => {
      if (!acc[site.category]) {
        acc[site.category] = [];
      }
      acc[site.category].push(site);
      return acc;
    }, {} as Record<string, Site[]>);
  }, [sites, selectedCategories]);

  const timeOptions = [
    { id: '1h', label: '1 ora' },
    { id: '2h', label: '2 ore' },
    { id: '3h', label: '3 ore' },
    { id: 'half', label: 'Mezza giornata' },
    { id: 'full', label: 'Giornata intera' }
  ];

  // Render modalità selezione
  if (isAutoRoute === null) {
    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('createYourRoute')}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleClose}
            >
              <FontAwesome5 name="times" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.modeSelectionContainer}>
            <TouchableOpacity
              style={styles.modeButton}
              onPress={() => handleModeSelection(true)}
            >
              <FontAwesome5 name="magic" size={40} color="#2196F3" style={styles.modeIcon} />
              <Text style={styles.modeTitle}>{t('letMeGuideYou')}</Text>
              <Text style={styles.modeDescription}>{t('autoRouteDescription')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modeButton}
              onPress={() => handleModeSelection(false)}
            >
              <FontAwesome5 name="map-marked-alt" size={40} color="#2196F3" style={styles.modeIcon} />
              <Text style={styles.modeTitle}>{t('createCustomRoute')}</Text>
              <Text style={styles.modeDescription}>{t('customRouteDescription')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  // Render principale
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isAutoRoute ? t('letMeGuideYou') : t('createCustomRoute')}
          </Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
          >
            <FontAwesome5 name="times" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.timeSection}>
          <Text style={styles.timeTitle}>{t('availableTime')}</Text>
          <View style={styles.timeOptionsContainer}>
            <View style={styles.timeOptionsRow}>
              {timeOptions.slice(0, 3).map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.timeButton,
                    selectedTime === option.label && styles.selectedTimeButton
                  ]}
                  onPress={() => setSelectedTime(option.label)}
                >
                  <Text style={[
                    styles.timeButtonText,
                    selectedTime === option.label && styles.selectedTimeButtonText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.timeOptionsRow}>
              {timeOptions.slice(3).map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.timeButton,
                    selectedTime === option.label && styles.selectedTimeButton
                  ]}
                  onPress={() => setSelectedTime(option.label)}
                >
                  <Text style={[
                    styles.timeButtonText,
                    selectedTime === option.label && styles.selectedTimeButtonText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {!isAutoRoute && (
          <ScrollView style={styles.sitesList}>
            {Object.entries(filteredAndGroupedSites).map(([category, sites]) => (
              <View key={category} style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <FontAwesome5 
                    name={getCategoryIcon(category)} 
                    size={20} 
                    color="#666" 
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.categoryTitle}>
                    {getCategoryTranslation(category)}
                  </Text>
                </View>
                {sites.map((site) => (
                  <TouchableOpacity
                    key={site.id}
                    style={[
                      styles.siteItem,
                      selectedSites.includes(site) && styles.selectedSiteItem
                    ]}
                    onPress={() => handleSiteSelection(site)}
                  >
                    <Text style={styles.siteName}>{site.name}</Text>
                    {selectedSites.includes(site) && (
                      <FontAwesome5 name="check" size={16} color="#2196F3" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        )}

        <TouchableOpacity
          style={[
            styles.createButton,
            (!selectedTime || (!isAutoRoute && !selectedSites.length)) && styles.disabledButton
          ]}
          onPress={handleCreateRoute}
          disabled={!selectedTime || (!isAutoRoute && !selectedSites.length)}
        >
          <Text style={styles.createButtonText}>{t('createRoute')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sitesList: {
    flex: 1,
    padding: 15,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  siteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedSiteItem: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  siteName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  timeSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  timeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  timeOptionsContainer: {
    alignItems: 'center',
  },
  timeOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  timeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: width / 3 - 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedTimeButton: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedTimeButtonText: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#2196F3',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modeSelectionContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  modeButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modeIcon: {
    marginBottom: 15,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modeDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

RouteCreator.displayName = 'RouteCreator';
export default RouteCreator;