import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
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
    // Configura l'audio quando il componente viene montato
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      // Pulisci quando il componente viene smontato
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    // Resetta il sound quando cambia l'URL
    if (sound) {
      sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  }, [audioUrl]);

  const playSound = async () => {
    try {
      // Se non c'è URL, mostra un errore
      if (!audioUrl) {
        Alert.alert(
          t('error'),
          t('audioNotAvailable'),
          [{ text: t('ok'), onPress: () => {} }]
        );
        return;
      }

      if (sound) {
        // Se il suono è già caricato, gestisci play/pause
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        // Carica e riproduci il nuovo suono
        setLoading(true);
        
        // Controlla che l'URL sia valido
        const audioSource = { uri: audioUrl };
        if (!audioSource.uri) {
          throw new Error('Invalid audio URL');
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          audioSource,
          { shouldPlay: true },
          (status) => {
            // Callback di stato
            if (status.isLoaded) {
              if (!status.isPlaying && status.didJustFinish) {
                setIsPlaying(false);
              }
            }
          }
        );

        setSound(newSound);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert(
        t('error'),
        t('errorPlayingAudio'),
        [{ text: t('ok'), onPress: () => {} }]
      );
    } finally {
      setLoading(false);
    }
  };

  // Gestisci il caso in cui non c'è URL audio
  if (!audioUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('audioNotAvailable')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.playButton,
          loading && styles.disabledButton
        ]} 
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
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
  }
});