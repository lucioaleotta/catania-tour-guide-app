// app/components/ui/LanguageSelector.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useLanguage } from '@contexts/LanguageContext';
import { FontAwesome5 } from '@expo/vector-icons';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.languageButton,
          language === 'it' && styles.activeLanguage
        ]}
        onPress={() => setLanguage('it')}
      >
        <FontAwesome5 
          name="flag" 
          size={16} 
          color={language === 'it' ? "#fff" : "#333"} 
          style={styles.icon} 
        />
        <Text style={[
          styles.languageText,
          language === 'it' && styles.activeLanguageText
        ]}>
          IT
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.languageButton,
          language === 'en' && styles.activeLanguage
        ]}
        onPress={() => setLanguage('en')}
      >
        <FontAwesome5 
          name="flag-usa" 
          size={16} 
          color={language === 'en' ? "#fff" : "#333"} 
          style={styles.icon} 
        />
        <Text style={[
          styles.languageText,
          language === 'en' && styles.activeLanguageText
        ]}>
          EN
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginHorizontal: 2,
  },
  activeLanguage: {
    backgroundColor: '#2196F3',
  },
  languageText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  activeLanguageText: {
    color: 'white',
  },
  icon: {
    marginRight: 5
  }
});