// app/components/ui/LanguageSelector.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
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
        <Image
          source={require('../../assets/images/italiano.png')}
          style={[styles.icon, { width: 16, height: 16, tintColor: language === 'it' ? "#fff" : "#333" }]}
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
        <Image
          source={require('../../assets/images/inglese.png')}
          style={[styles.icon, { width: 16, height: 16, tintColor: language === 'en' ? "#fff" : "#333" }]}
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