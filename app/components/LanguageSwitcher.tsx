import { useTranslation } from 'react-i18next';
import { Button, View } from 'react-native';


export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'it' ? 'en' : 'it');
  };

  return (
    <View>
      <Button title={i18n.language === 'it' ? '🇬🇧 English' : '🇮🇹 Italiano'} onPress={toggle} />
    </View>
  );
}