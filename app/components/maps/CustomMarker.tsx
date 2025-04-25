// app/components/maps/CustomMarker.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface CustomMarkerProps {
  category: string;
}

export default function CustomMarker({ category }: CustomMarkerProps) {
  const getIconForCategory = () => {
    switch (category.toLowerCase()) {
      case 'chiesa':
      case 'chiese':
        return <FontAwesome5 name="church" size={20} color="purple" />;
      case 'museo':
      case 'musei':
        return <FontAwesome5 name="museum" size={20} color="brown" />;
      case 'piazza':
        return <MaterialIcons name="location-city" size={20} color="blue" />;
      case 'teatro':
      case 'teatri':
      case 'arena':
        return <FontAwesome5 name="theater-masks" size={20} color="orange" />;
      case 'palazzo':
      case 'palazzi':
        return <FontAwesome5 name="building" size={20} color="gray" />;
      case 'fontana':
      case 'fontane':
        return <FontAwesome5 name="fountain" size={20} color="cyan" />;
      case 'parco':
      case 'parchi':
        return <FontAwesome5 name="tree" size={20} color="green" />;
      case 'mercato':
      case 'mercati':
        return <FontAwesome5 name="shopping-basket" size={20} color="orange" />;
      case 'castello':
      case 'castelli':
        return <MaterialIcons name="castle" size={24} color="black" />
      case 'monastero':
      case 'monasteri':
        return <FontAwesome5 name="cross" size={20} color="darkred" />;
      case 'monumento':
      case 'monumenti':
        return <FontAwesome5 name="monument" size={20} color="green" />;
      default:
        return <MaterialIcons name="location-on" size={20} color="red" />;
    }
  };

  return (
    <View style={styles.markerContainer}>
      {getIconForCategory()}
    </View>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  }
});