import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useTranslations } from '@utils/translations';

interface CategoryGridProps {
  onSelectCategory: (category: string | null) => void;
  categories: string[];
}

const CategoryGrid = ({ onSelectCategory, categories }: CategoryGridProps) => {
  const { getCategoryTranslation } = useTranslations();

  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    const iconSize = 24; // Increased icon size
    const iconColor = '#333';

    const iconMap: { [key: string]: JSX.Element } = {
      chiesa: <FontAwesome5 name="church" size={iconSize} color={iconColor} />,
      museo: <FontAwesome5 name="museum" size={iconSize} color={iconColor} />,
      piazza: <FontAwesome5 name="city" size={iconSize} color={iconColor} />,
      teatro: <FontAwesome5 name="theater-masks" size={iconSize} color={iconColor} />,
      palazzo: <FontAwesome5 name="building" size={iconSize} color={iconColor} />,
      // ... aggiungi altre categorie secondo necessità
    };

    return iconMap[categoryLower] || <FontAwesome5 name="map-marker-alt" size={iconSize} color={iconColor} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryItem}
            onPress={() => onSelectCategory(category)}
          >
            {getCategoryIcon(category)}
            <Text style={styles.categoryText}>
              {getCategoryTranslation(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 10,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (width - 60) / 3,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default CategoryGrid;
