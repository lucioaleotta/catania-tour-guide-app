// app/components/ui/TimeSelector.tsx (aggiornato)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslations } from '@utils/translations';

interface TimeSelectorProps {
  selectedTime: number | null;
  onSelectTime: (time: number | null) => void;
}

export default function TimeSelector({ selectedTime, onSelectTime }: TimeSelectorProps) {
  const { t } = useTranslations();
  
  const timeOptions = [
    { label: `1 ${t('hour')}`, value: 1 },
    { label: `2 ${t('hours')}`, value: 2 },
    { label: `3 ${t('hours')}`, value: 3 },
    { label: t('halfDay'), value: 4 },
    { label: t('fullDay'), value: 8 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('howMuchTime')}</Text>
      <View style={styles.optionsContainer}>
        {timeOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.timeButton,
              selectedTime === option.value && styles.selectedTimeButton
            ]}
            onPress={() => onSelectTime(option.value)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === option.value && styles.selectedTimeText
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: 'white',
      borderRadius: 10,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    timeButton: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      margin: 5,
    },
    selectedTimeButton: {
      backgroundColor: '#2196F3',
    },
    timeText: {
      fontSize: 16,
    },
    selectedTimeText: {
      color: 'white',
      fontWeight: '600',
    }
  });  