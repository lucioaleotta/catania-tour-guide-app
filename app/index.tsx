import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import { useSites } from '@hooks/useSites';
import CataniaMapView from '@features/map/MapView';
import CategoryFilter from '@components/ui/CategoryFilter';
import LanguageSelector from '@components/ui/LanguageSelector';
import { useLanguage } from '@contexts/LanguageContext';

export default function HomeScreen() {
  const { sites, loading } = useSites();
  const [filteredSites, setFilteredSites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const { language } = useLanguage();
  
  useEffect(() => {
    if (sites.length > 0) {
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(sites.map(site => site.category)));
      setCategories(uniqueCategories);
      
      // Filter sites if a category is selected
      if (selectedCategory) {
        setFilteredSites(sites.filter(site => site.category === selectedCategory));
      } else {
        setFilteredSites(sites);
      }
    }
  }, [sites, selectedCategory]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con logo e messaggio di benvenuto */}
      <View style={styles.header}>
        <Image 
          source={require('@assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>
          {language === 'it' ? 'Benvenuto a Catania' : 'Welcome to Catania'}
        </Text>
      </View>
      
      {/* Selettore lingua */}
      <View style={styles.controlsContainer}>
        <LanguageSelector />
      </View>
      
      {/* Filtro categorie */}
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      
      {/* Mappa */}
      <CataniaMapView 
        sites={filteredSites}
        loading={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  controlsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
});