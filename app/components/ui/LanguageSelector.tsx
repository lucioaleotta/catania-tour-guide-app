import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useLanguage } from '@contexts/LanguageContext';

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
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    height: 24, // Altezza fissa più piccola
  },
  languageButton: {
    paddingVertical: 4, // Padding ridotto
    paddingHorizontal: 8, // Padding ridotto
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLanguage: {
    backgroundColor: '#333',
  },
  languageText: {
    fontSize: 12, // Font size ridotto
    fontWeight: 'bold',
    color: '#333',
  },
  activeLanguageText: {
    color: 'white',
  }
});