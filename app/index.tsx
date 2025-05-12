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
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            {language === 'it' ? 'Benvenuto a Catania' : 'Welcome to Catania'}
          </Text>
        </View>
        <View style={styles.languageSelectorContainer}>
          <LanguageSelector />
        </View>
      </View>
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
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 60,
  },
  logoContainer: {
    width: 50, // Larghezza fissa per il logo
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  welcomeContainer: {
    flex: 1, // Prende tutto lo spazio rimanente
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  languageSelectorContainer: {
    width: 70, // Larghezza fissa per il selettore
    alignItems: 'center',
  },
});