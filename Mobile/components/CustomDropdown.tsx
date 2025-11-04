import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

// Expo Speech Recognition'ı güvenli şekilde import et
let ExpoSpeechRecognitionModule: any = null;
let useSpeechRecognitionEvent: any = null;

try {
  const speechRecognition = require('expo-speech-recognition');
  ExpoSpeechRecognitionModule = speechRecognition.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = speechRecognition.useSpeechRecognitionEvent;
} catch (error) {
  console.log('Expo Speech Recognition not available:', error);
}

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: DropdownOption[];
  value?: string;
  onSelect: (option: DropdownOption) => void;
  disabled?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
  enableVoiceSearch?: boolean; // Sesli arama özelliğini aktif/pasif yapar
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  icon,
  iconColor = '#6B7280',
  placeholder = 'Seçiniz...',
  searchPlaceholder = 'Ara...',
  options,
  value,
  onSelect,
  disabled = false,
  showClearButton = false,
  onClear,
  enableVoiceSearch = true, // Varsayılan olarak açık
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const surfaceColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const redColor = useThemeColor({}, 'red');
  const orangeColor = useThemeColor({}, 'orange');
  const yellowColor = useThemeColor({}, 'yellow');
  const greenColor = useThemeColor({}, 'green');
  const blueColor = useThemeColor({}, 'blue');
  const indigoColor = useThemeColor({}, 'indigo');
  const purpleColor = useThemeColor({}, 'purple');
  const pinkColor = useThemeColor({}, 'pink');
  const grayColor = useThemeColor({}, 'gray');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const redBorderColor = useThemeColor({}, 'redBorder');
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dinleniyor, setDinleniyor] = useState<boolean>(false);
  const [speechAvailable, setSpeechAvailable] = useState<boolean>(false);

  // Speech Recognition'ın mevcut olup olmadığını kontrol et
  useEffect(() => {
    if (ExpoSpeechRecognitionModule && enableVoiceSearch) {
      if (Platform.OS === 'web') {
        try {
          const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
          setSpeechAvailable(available);
          if (!available) {
            console.log('Ses tanıma özelliği bu tarayıcıda desteklenmemektedir.');
          }
        } catch (error) {
          console.log('Speech recognition check error:', error);
          setSpeechAvailable(false);
        }
      } else {
        setSpeechAvailable(true);
      }
    } else {
      setSpeechAvailable(false);
    }
  }, [enableVoiceSearch]);

  // Sesli komut event listener'ları - hook'ları her zaman çağır, içeride koşul kontrol et
  // Hook'lar koşullu çağrılamaz, bu yüzden her zaman çağırıp içeride kontrol yapıyoruz
  if (useSpeechRecognitionEvent) {
    useSpeechRecognitionEvent("start", () => {
      if (!enableVoiceSearch || !speechAvailable) return;
      console.log('Speech recognition started');
      setDinleniyor(true);
    });

    useSpeechRecognitionEvent("end", () => {
      if (!enableVoiceSearch || !speechAvailable) return;
      console.log('Speech recognition ended');
      setDinleniyor(false);
    });

    useSpeechRecognitionEvent("result", (event: any) => {
      if (!enableVoiceSearch || !speechAvailable) return;
      console.log('Speech recognition result:', event);
      if (event.results && event.results.length > 0) {
        // Sesli komuttan gelen orijinal metin
        const originalText = event.results[0].transcript;
        console.log('Orijinal sesli metin:', originalText);

        // Boşlukları kaldırılmış hali
        const textWithoutSpaces = originalText.replace(/\s+/g, '');

        // En yakın eşleşmeyi bul (hem boşluklu hem boşluksuz versiyonları dene)
        const bestMatchWithSpaces = findBestMatch(originalText);
        const bestMatchWithoutSpaces = findBestMatch(textWithoutSpaces);

        // Hangi eşleşme daha iyi ise onu kullan
        const finalMatch = calculateSimilarity(originalText, bestMatchWithSpaces) >=
          calculateSimilarity(textWithoutSpaces, bestMatchWithoutSpaces)
          ? bestMatchWithSpaces
          : bestMatchWithoutSpaces;

        setSearchText(finalMatch);
      }
    });

    useSpeechRecognitionEvent("error", (event: any) => {
      if (!enableVoiceSearch || !speechAvailable) return;
      console.log('Speech recognition error:', event.error, event.message);
      setDinleniyor(false);
    });
  }

  const selectedOption = options.find(option => option.value === value);

  // Türkçe karakterleri normalize etme fonksiyonu
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^\w\s]/g, '') // Özel karakterleri kaldır
      .replace(/\s+/g, ' '); // Çoklu boşlukları tek boşluğa çevir
  };

  // String similarity algoritması - Levenshtein distance
  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = normalizeText(str1);
    const s2 = normalizeText(str2);

    if (s1 === s2) return 1;
    if (s1.length === 0 || s2.length === 0) return 0;

    // Substring kontrolü - eğer biri diğerinin içinde varsa yüksek skor ver
    if (s1.includes(s2) || s2.includes(s1)) {
      const minLength = Math.min(s1.length, s2.length);
      const maxLength = Math.max(s1.length, s2.length);
      return minLength / maxLength * 0.9; // %90 benzerlik ver
    }

    const matrix = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));

    for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= s2.length; j++) {
      for (let i = 1; i <= s1.length; i++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j - 1][i] + 1,     // deletion
          matrix[j][i - 1] + 1,     // insertion
          matrix[j - 1][i - 1] + cost // substitution
        );
      }
    }

    const maxLength = Math.max(s1.length, s2.length);
    return (maxLength - matrix[s2.length][s1.length]) / maxLength;
  };

  // En yakın seçeneği bulma fonksiyonu
  const findBestMatch = (voiceText: string): string => {
    if (!voiceText || voiceText.trim() === '') return voiceText;

    let bestMatch = voiceText;
    let bestSimilarity = 0;
    const threshold = 0.3; // Minimum benzerlik eşiği (%30) - daha esnek

    options.forEach(option => {
      // Hem label hem de value ile karşılaştır
      const labelSimilarity = calculateSimilarity(voiceText, option.label);
      const valueSimilarity = calculateSimilarity(voiceText, option.value);

      const maxSimilarity = Math.max(labelSimilarity, valueSimilarity);

      if (maxSimilarity > bestSimilarity && maxSimilarity >= threshold) {
        bestSimilarity = maxSimilarity;
        bestMatch = option.label; // En yakın eşleşmenin label'ını kullan
      }
    });

    console.log(`Sesli metin: "${voiceText}" -> En yakın eşleşme: "${bestMatch}" (Benzerlik: ${(bestSimilarity * 100).toFixed(1)}%)`);
    return bestMatch;
  };

  // Sesli komut fonksiyonları - sadece enableVoiceSearch true ve speechAvailable ise çalışır
  const startListening = async () => {
    if (!enableVoiceSearch || !speechAvailable || !ExpoSpeechRecognitionModule) {
      console.log('Ses tanıma özelliği mevcut değil.');
      return;
    }

    if (Platform.OS === 'web') {
      try {
        const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
        if (!available) {
          console.log('Ses tanıma özelliği bu tarayıcıda desteklenmemektedir.');
          return;
        }
      } catch (error) {
        console.log('Speech recognition availability check error:', error);
        return;
      }
    }

    try {
      // İzinleri kontrol et ve iste
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        console.log('Ses tanıma için mikrofon izni gereklidir.');
        return;
      }

      // Ses tanımayı başlat
      ExpoSpeechRecognitionModule.start({
        lang: "tr-TR",
        interimResults: true,
        continuous: false,
        maxAlternatives: 1,
        requiresOnDeviceRecognition: false,
        addsPunctuation: true,
      });
    } catch (e) {
      console.error('Start listening error:', e);
    }
  };

  const stopListening = async () => {
    if (!enableVoiceSearch || !speechAvailable || !ExpoSpeechRecognitionModule) {
      return;
    }

    try {
      ExpoSpeechRecognitionModule.stop();
    } catch (e) {
      console.error('Stop listening error:', e);
    }
  };

  // Arama metnine göre filtrelenmiş seçenekler
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchText.toLowerCase()) ||
    option.value.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsVisible(false);
    setSearchText('');
  };

  const openModal = () => {
    setIsVisible(true);
    setSearchText('');
  };

  const closeModal = () => {
    setIsVisible(false);
    setSearchText('');
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{
        fontSize: 14,
        fontWeight: '600',
        color: textColor,
        marginBottom: 8,
      }}>{label}</Text>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: borderColor,
          borderRadius: 8,
          paddingVertical: 12,
          backgroundColor: surfaceColor,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: disabled ? 0.5 : 1,
        }}
        onPress={() => !disabled && openModal()}
        activeOpacity={0.7}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
          {icon && (
            <View style={{
              marginLeft: 12,
              marginRight: 12,
            }}>
              <Ionicons name={icon} size={20} color={iconColor} />
            </View>
          )}
          <Text
            style={{
              fontSize: 16,
              flex: 1,
              color: selectedOption ? textColor : secondaryColor,
              marginLeft: !icon ? 16 : 0,
            }}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {showClearButton && value && onClear && (
            <TouchableOpacity
              className='rounded-full'
              style={{
                marginRight: 4,
                padding: 1,
              }}
              onPress={(e) => {
                e.stopPropagation();
                onClear();
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name="trash"
                size={20}
                color={redColor}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginRight: 16 }}>
          <Ionicons
            name={isVisible ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={secondaryColor}
          />
        </View>

      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={closeModal}
        >
          <Pressable
            style={{
              backgroundColor: cardColor,
              borderRadius: 12,
              marginHorizontal: 24,
              width: 320,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: textColor,
                flex: 1,
                textAlign: 'center',
              }}>{label}</Text>
              {enableVoiceSearch && speechAvailable && (
                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: dinleniyor ? '#EF4444' : primaryColor,
                  }}
                  onPress={dinleniyor ? stopListening : startListening}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={dinleniyor ? "stop" : "mic"}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Arama Kutusu */}
            <View style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
            }}>
              {/* Dinleme durumu göstergesi - sadece enableVoiceSearch true ve speechAvailable ise gösterilir */}
              {enableVoiceSearch && speechAvailable && dinleniyor && (
                <View style={{
                  backgroundColor: '#F0FDF4',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#BBF7D0',
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      width: 8,
                      height: 8,
                      backgroundColor: '#10B981',
                      borderRadius: 4,
                      marginRight: 8,
                    }} />
                    <Text style={{
                      color: '#065F46',
                      fontWeight: '500',
                      fontSize: 14,
                    }}>Dinleniyor...</Text>
                  </View>
                </View>
              )}

              <View style={{
                borderWidth: 1,
                borderColor: borderColor,
                borderRadius: 8,
                backgroundColor: surfaceColor,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{
                  marginLeft: 12,
                  marginRight: 8,
                }}>
                  <Ionicons name="search" size={20} color={secondaryColor} />
                </View>
                <TextInput
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: textColor,
                  }}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={secondaryColor}
                  value={searchText}
                  onChangeText={setSearchText}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity
                    style={{ marginRight: 12 }}
                    onPress={() => setSearchText('')}
                  >
                    <Ionicons name="close" size={20} color={textColor} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 300 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: index !== filteredOptions.length - 1 ? 1 : 0,
                    borderBottomColor: borderColor,
                    backgroundColor: item.value === value
                      ? primaryColor + '15'
                      : index % 2 === 0
                        ? surfaceColor
                        : backgroundColor,
                  }}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: item.value === value ? primaryColor : textColor,
                      fontWeight: item.value === value ? '600' : '400',
                    }}
                  >
                    {item.value} - {item.label}
                  </Text>
                  {item.value === value && (
                    <Ionicons name="checkmark" size={20} color={primaryColor} />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={{
                  paddingVertical: 32,
                  paddingHorizontal: 24,
                }}>
                  <Text style={{
                    textAlign: 'center',
                    color: secondaryColor,
                  }}>Sonuç bulunamadı</Text>
                </View>
              }
            />

            <TouchableOpacity
              style={{
                padding: 16,
                borderTopWidth: 1,
                borderTopColor: borderColor,
              }}
              onPress={closeModal}
              activeOpacity={0.7}
            >
              <Text style={{
                textAlign: 'center',
                color: secondaryColor,
                fontWeight: '500',
              }}>İptal</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CustomDropdown;