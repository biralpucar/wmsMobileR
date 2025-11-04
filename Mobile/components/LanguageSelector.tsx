import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LanguageSelectorProps {
  style?: any;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style }) => {
  const { t, changeLanguage, currentLanguage } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'tint');

  const languages = [
    { code: 'tr', name: t('turkish'), flag: '🇹🇷' },
    { code: 'en', name: t('english'), flag: '🇺🇸' },
  ];

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <View style={styles.header}>
        <Ionicons name="language" size={20} color={textColor} />
        <Text style={[styles.title, { color: textColor }]}>{t('language')}</Text>
      </View>
      
      <View style={styles.languageList}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageItem,
              { borderColor },
              currentLanguage === language.code && {
                backgroundColor: primaryColor + '20',
                borderColor: primaryColor,
              },
            ]}
            onPress={() => changeLanguage(language.code)}
          >
            <Text style={styles.flag}>{language.flag}</Text>
            <Text style={[styles.languageName, { color: textColor }]}>
              {language.name}
            </Text>
            {currentLanguage === language.code && (
              <Ionicons name="checkmark" size={20} color={primaryColor} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  languageList: {
    gap: 8,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
});