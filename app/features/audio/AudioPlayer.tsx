// app/features/audio/AudioPlayer.tsx (aggiornato)
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslations } from '@utils/translations';

interface AudioPlayerProps {
  audioUrl: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslations();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        setLoading(true);
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
        
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && !status.isBuffering && 'didJustFinish' in status && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      }
    } catch (error) {
      console.error('Error playing sound', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.playButton} 
        onPress={playSound}
        disabled={loading}
      >
        <FontAwesome 
          name={loading ? 'spinner' : isPlaying ? 'pause' : 'play'} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>
      <Text style={styles.text}>
        {loading ? t('loading') : isPlaying ? t('playing') : t('listenAudio')}
      </Text>
    </View>
  );
}

// Gli stili rimangono invariati...
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  text: {
    fontSize: 16,
  }
});