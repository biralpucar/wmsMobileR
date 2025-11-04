import CustomHeader from '@/components/CustomHeader';
import CustomInfoCard from '@/components/CustomInfoCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLanguage } from '@/hooks/useLanguage';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


interface StokBilgisi {
  stokKodu: string;
  stokAdi: string;
  miktar: number;
  seriler: string[];
}

const HucreTransferi = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDepo } = route.params as { selectedDepo?: string } || {};
  const { t } = useLanguage();

  // Tema hook'ları
  const { theme, isDarkMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = isDarkMode ? '#3B82F6' : '#2563EB';
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const redColor = useThemeColor({}, 'red');
  const orangeColor = useThemeColor({}, 'orange');
  const yellowColor = useThemeColor({}, 'yellow');
  const greenColor = useThemeColor({}, 'green');
  const blueColor = useThemeColor({}, 'blue');
  const indigoColor = useThemeColor({}, 'indigo');
  const purpleColor = useThemeColor({}, 'purple');
  const pinkColor = useThemeColor({}, 'pink');
  
  const [stokBilgisi, setStokBilgisi] = useState<StokBilgisi>({
    stokKodu: 'STK001',
    stokAdi: 'Örnek Ürün',
    miktar: 1,
    seriler: ['SER001', 'SER002']
  });

  const [showSerilerModal, setShowSerilerModal] = useState(false);
  const [yeniSeri, setYeniSeri] = useState('');
  const [secilenSeri, setSecilenSeri] = useState('');

  const handleBarkodOkut = () => {
    // Örnek barkod okutma sonucu
    setStokBilgisi({
      stokKodu: 'STK002',
      stokAdi: 'Yeni Okutulmuş Ürün',
      miktar: 5,
      seriler: ['SER003', 'SER004', 'SER005']
    });
  };

  const handleSeriEkle = () => {
    if (yeniSeri.trim()) {
      setStokBilgisi(prev => ({
        ...prev,
        seriler: [...prev.seriler, yeniSeri.trim()]
      }));
      setYeniSeri('');
    }
  };

  const handleSeriSil = (index: number) => {
    setStokBilgisi(prev => ({
      ...prev,
      seriler: prev.seriler.filter((_, i) => i !== index)
    }));
  };

  const handleMiktarDegistir = (degisim: number) => {
    setStokBilgisi(prev => ({
      ...prev,
      miktar: Math.max(0, prev.miktar + degisim)
    }));
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <CustomHeader
        title={t('hucreBilgisi')}
        subtitle={t('hucreleMalTakipIslemi')}
        iconName="move-outline"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      {/* Info Card */}
      <CustomInfoCard
        title={t('bilgilendirme')}
        message={t('hucreHakkindaBilgiAlmaIslemi')}
        iconName="information"
        buttonPosition={{ right: 10, top: 100 }}
        cardPosition={{ top: 135, right: 16, left: 16 }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
      >


        {/* Ana İçerik Alanı */}
        <View className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 1 }}>
          {/* Başlık */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <FontAwesome6 name="table-cells-large" size={24} color={textColor} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor, marginLeft: 8 }}>{t('hucreleBilgisi')}</Text>
          </View>
          {/* Barkod Okutma Alanı */}
          <View style={{ marginBottom: 24 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
                borderRadius: 12,
                padding: 12,
                borderWidth: 1,
                borderColor: borderColor,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
              activeOpacity={0.7}
              onPress={handleBarkodOkut}
            >
              <View style={{
                width: 32,
                height: 32,
                backgroundColor: isDarkMode ? '#065F46' : '#D1FAE5',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Ionicons name="camera" size={16} color="#10B981" />
              </View>
              <Text style={{
                color: textColor,
                fontWeight: '500',
                fontSize: 14
              }}>
                {t('barkodOkut')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Stok Bilgisi */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: textColor,
              marginBottom: 16
            }}>
              {t('stokBilgisi')}
            </Text>

            {stokBilgisi.stokKodu ? (
              <View style={{
                backgroundColor: cardColor,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: greenBorderColor,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                gap: 16
              }}>
                {/* Stok Kodu */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isDarkMode ? '#1E3A8A' : '#DBEAFE',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Ionicons name="barcode-outline" size={16} color={primaryColor} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 14,
                      color: isDarkMode ? '#9CA3AF' : '#6B7280'
                    }}>
                      {t('stokKodu')}
                    </Text>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: textColor
                    }}>
                      {stokBilgisi.stokKodu}
                    </Text>
                  </View>
                </View>

                {/* Stok Adı */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isDarkMode ? '#064E3B' : '#D1FAE5',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Ionicons name="cube-outline" size={16} color="#10B981" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 14,
                      color: isDarkMode ? '#9CA3AF' : '#6B7280'
                    }}>
                      {t('stokAdi')}
                    </Text>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: textColor
                    }}>
                      {stokBilgisi.stokAdi}
                    </Text>
                  </View>
                </View>

                {/* Miktar */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isDarkMode ? '#92400E' : '#FEF3C7',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Ionicons name="calculator-outline" size={16} color="#F59E0B" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 14,
                      color: isDarkMode ? '#9CA3AF' : '#6B7280',
                      marginBottom: 4
                    }}>
                      {t('miktar')}
                    </Text>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: textColor
                    }}>
                      {stokBilgisi.miktar}
                    </Text>
                  </View>
                </View>

                {/* Seriler */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isDarkMode ? '#581C87' : '#F3E8FF',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Ionicons name="list-outline" size={16} color="#8B5CF6" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 14,
                      color: isDarkMode ? '#9CA3AF' : '#6B7280',
                      marginBottom: 8
                    }}>{t('seriler')} ({stokBilgisi.seriler.length})</Text>
                    {stokBilgisi.seriler.length > 0 ? (
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {stokBilgisi.seriler.map((seri, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor: '#8B5CF6',
                              paddingHorizontal: 12,
                              paddingVertical: 8,
                              borderRadius: 20,
                              shadowColor: '#000',
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.1,
                              shadowRadius: 4,
                              elevation: 3
                            }}
                            onPress={() => {
                              setSecilenSeri(seri);
                              setShowSerilerModal(true);
                            }}
                            activeOpacity={0.7}
                          >
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>{seri}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => setShowSerilerModal(true)}
                        activeOpacity={0.7}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 8,
                          backgroundColor: cardColor,
                          borderColor: borderColor,
                          borderWidth: 1
                        }}
                      >
                        <Text style={{ fontWeight: '500', color: textColor }}>{t('serileriGoruntuleDuzenle')}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <View style={{
                backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
                borderRadius: 12,
                padding: 32,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: borderColor
              }}>
                <Ionicons
                  name="cube-outline"
                  size={48}
                  color={isDarkMode ? '#6B7280' : '#9CA3AF'}
                />
                <Text style={{
                  color: isDarkMode ? '#9CA3AF' : '#6B7280',
                  fontSize: 16,
                  marginTop: 16,
                  textAlign: 'center'
                }}>
                  {t('henuzUrunEklenmemis')}
                </Text>
                <Text style={{
                  color: isDarkMode ? '#6B7280' : '#9CA3AF',
                  fontSize: 14,
                  marginTop: 8,
                  textAlign: 'center'
                }}>
                  {t('barkodOkutarakUrunEkleyebilirsiniz')}
                </Text>
              </View>
            )}
          </View>

          {/* Aksiyon Butonları */}
          {stokBilgisi.stokKodu && (
            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity
                className="flex-1 rounded-xl py-4 items-center flex-row justify-center mx-1"
                style={{ backgroundColor: cardColor, borderColor: borderColor, borderWidth: 1 }}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
                <Text className="text-base font-semibold" style={{ color: textColor }}>{t('geri')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 rounded-xl py-4 items-center shadow-lg flex-row justify-center mx-1"
                style={{ backgroundColor: greenColor }}
                onPress={() => {
                  console.log('Transfer tamamlandı:', stokBilgisi);
                  navigation.goBack();
                }}
                activeOpacity={0.8}
              >
                <Text className="text-white text-base font-semibold">{t('tamamla')}</Text>
                <Ionicons name="checkmark" size={20} color="white" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Seriler Modal */}
      <Modal
        visible={showSerilerModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowSerilerModal(false);
          setSecilenSeri('');
        }}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="rounded-xl p-6 mx-4 w-80 max-h-96" style={{ backgroundColor: backgroundColor }}>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold" style={{ color: textColor }}>
                {secilenSeri ? `${t('seriDetayi')}: ${secilenSeri}` : t('seriNumaralari')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowSerilerModal(false);
                  setSecilenSeri('');
                }}
                className="w-8 h-8 rounded-lg items-center justify-center"
                style={{ backgroundColor: cardColor }}
              >
                <Ionicons name="close" size={16} color={textColor} />
              </TouchableOpacity>
            </View>

            {secilenSeri ? (
              <View className="mb-4">
                <Text className="mb-2" style={{ color: textColor }}>{t('seriNumarasi')}: {secilenSeri}</Text>
                <Text className="mb-2" style={{ color: textColor }}>{t('durum')}: {t('aktif')}</Text>
                <Text className="mb-2" style={{ color: textColor }}>{t('olusturmaTarihi')}: {new Date().toLocaleDateString('tr-TR')}</Text>
                <Text className="mb-4" style={{ color: textColor }}>{t('aciklama')}: {t('buSeriNumarasiIleIlgiliDetayBilgiler')}</Text>
              </View>
            ) : (
              <>
                {/* Yeni Seri Ekleme */}
                <View className="flex-row mb-4">
                  <TextInput
                    className="flex-1 rounded-lg px-3 py-2 mr-2"
                    style={{ borderColor: borderColor, borderWidth: 1, backgroundColor: cardColor, color: textColor }}
                    value={yeniSeri}
                    onChangeText={setYeniSeri}
                    placeholder={t('yeniSeriNumarasi')}
                    placeholderTextColor={textColor + '80'}
                  />
                  <TouchableOpacity
                    className="bg-blue-500 rounded-lg px-4 py-2 items-center justify-center"
                    onPress={handleSeriEkle}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="add" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Seri Listesi */}
                <ScrollView className="max-h-48">
                  {stokBilgisi.seriler.map((seri, index) => (
                    <View key={index} className="flex-row items-center justify-between py-2" style={{ borderBottomColor: borderColor, borderBottomWidth: 1 }}>
                      <TouchableOpacity
                        onPress={() => setSecilenSeri(seri)}
                        className="flex-1"
                      >
                        <Text className="flex-1" style={{ color: textColor }}>{seri}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSeriSil(index)}
                        className="w-8 h-8 bg-red-100 rounded-lg items-center justify-center ml-2"
                      >
                        <Ionicons name="trash-outline" size={16} color={redColor} />

                      </TouchableOpacity>
                    </View>
                  ))}
                  {stokBilgisi.seriler.length === 0 && (
                    <Text className="text-center py-4" style={{ color: textColor, opacity: 0.7 }}>{t('henuzSeriNumarasiEklenmemis')}</Text>
                  )}
                </ScrollView>
              </>
            )}

            {/* Modal Butonları */}
            <View className="flex-row justify-end mt-4">
              <TouchableOpacity
                className="rounded-lg px-6 py-2"
                style={{ backgroundColor: greenColor }}
                onPress={() => {
                  setShowSerilerModal(false);
                  setSecilenSeri('');
                }}
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold">{t('tamam')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HucreTransferi;