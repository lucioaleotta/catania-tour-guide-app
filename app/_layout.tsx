import '../i18n'; // Assumendo che i18n sia nella root
import { Stack } from 'expo-router';
import { Image, View } from 'react-native';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }}>
        <Image source={require('../assets/logo.png')} style={{ width: 50, height: 50 }} resizeMode="contain" />
        <LanguageSwitcher />
      </View>
      <Stack />
    </View>
  );
}