import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslations } from '@utils/translations';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onSelectCategory: (category: string) => void;
  onSelectAll: () => void;
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onSelectCategory,
  onSelectAll
}: CategoryFilterProps) {
  const { t, getCategoryTranslation } = useTranslations();
  
  // Verifica se tutte le categorie sono selezionate
  const areAllSelected = categories.length === selectedCategories.length;

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

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Pulsante "All" */}
        <TouchableOpacity
          style={[
            styles.filterButton,
            areAllSelected && styles.activeFilterButton
          ]}
          onPress={onSelectAll}
        >
          <FontAwesome5 
            name="layer-group" 
            size={16} 
            color={areAllSelected ? 'white' : '#333'} 
            style={styles.icon}
          />
          <Text style={[
            styles.filterText,
            areAllSelected && styles.activeFilterText
          ]}>
            {t('allCategories')}
          </Text>
        </TouchableOpacity>

        {/* Pulsanti delle categorie */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategories.includes(category) && styles.activeFilterButton
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <FontAwesome5 
              name={getCategoryIcon(category)} 
              size={16} 
              color={selectedCategories.includes(category) ? 'white' : '#333'} 
              style={styles.icon}
            />
            <Text style={[
              styles.filterText,
              selectedCategories.includes(category) && styles.activeFilterText
            ]}>
              {getCategoryTranslation(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    minWidth: 80,
  },
  activeFilterButton: {
    backgroundColor: '#2196F3',
  },
  icon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '500',
  },
});