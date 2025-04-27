// app/features/sites/SiteDetail.tsx (aggiornato)
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Site } from '@services/api';
import AudioPlayer from '@features/audio/AudioPlayer';
import { useTranslations } from '@utils/translations';

interface SiteDetailProps {
  site: Site;
  onClose: () => void;
}

export default function SiteDetail({ site, onClose }: SiteDetailProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { t, getSiteDescription, getSiteDetailedDescription, getSiteAudioUrl, getCategoryTranslation } = useTranslations();
  
  const description = getSiteDescription(site);
  const detailedDescription = getSiteDetailedDescription(site);
  const audioUrl = getSiteAudioUrl(site);
  const categoryName = getCategoryTranslation(site.category);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>{t('close')}</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{site.name}</Text>
        <Text style={styles.category}>{categoryName}</Text>
        
        <Text style={styles.description}>
          {showFullDescription ? detailedDescription : `${description.substring(0, 100)}...`}
        </Text>
        
        <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
          <Text style={styles.readMoreButton}>
            {showFullDescription ? t('readLess') : t('readMore')}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.audioContainer}>
          <Text style={styles.audioTitle}>{t('audioGuide')}</Text>
          <AudioPlayer audioUrl={audioUrl} />
        </View>
      </ScrollView>
    </View>
  );
}

// Gli stili rimangono invariati...
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 30,
    color: '#666',
  },
  content: {
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  readMoreButton: {
    color: 'blue',
    marginBottom: 20,
  },
  audioContainer: {
    marginTop: 10,
  },
  audioTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  }
});