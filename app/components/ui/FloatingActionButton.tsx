// app/components/ui/FloatingActionButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  color?: string;
  size?: number;
}

export default function FloatingActionButton({
  onPress,
  icon = 'map-marker',
  color = '#fff',
  size = 24
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      style={styles.fabContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.fab}>
        <FontAwesome5 name={icon} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});