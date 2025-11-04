import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface StokBilgisi {
  stokKodu: string;
  stokAdi: string;
  seriNumarasi: string;
  miktari: number;
  seriTakibi: boolean;
  miktarKadarSerisi: boolean;
  depoBakiyesi: number;
  rafBakiyesi: number;
}

interface SevkiyatKontrol {
  id: string;
  DepoKodu: string;
  DepoAdi: string;
  cariKodu: string;
  cariAdi: string;
  nakliyeTipi: string;
  projeKodu: string;
  projeAdi: string;
  belgeSeriNo: string;
  durum: 'Bekliyor' | 'Kontrol Ediliyor' | 'Tamamlandı';
  tarih: string;
  stoklar?: StokBilgisi[];
}

interface SevkiyatKontrolBaslatProps {
  kontrol: SevkiyatKontrol;
  selectedDepo?: string;
  onClose: () => void;
}

const SevkiyatKontrolBaslat: React.FC<SevkiyatKontrolBaslatProps> = ({
  kontrol,
  selectedDepo,
  onClose
}) => {
  const { t } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const successColor = useThemeColor({}, 'success');
  const errorColor = useThemeColor({}, 'error');
  const warningColor = useThemeColor({}, 'warning');
  const surfaceColor = useThemeColor({}, 'surface');
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
  const indigoBorderColor = useThemeColor({}, 'indigoBorder');
  const [isStokBilgileriOpen, setIsStokBilgileriOpen] = useState(false);
  const [isKontrolDetayOpen, setIsKontrolDetayOpen] = useState(false); // Varsayılan olarak kapalı
  const [selectedStoklar, setSelectedStoklar] = useState<number[]>([]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Bekliyor':
        return t('bekliyor');
      case 'Kontrol Ediliyor':
        return t('kontrol-ediliyor');
      case 'Tamamlandı':
        return t('tamamlandi');
      default:
        return status;
    }
  };

  const toggleStokSelection = (index: number) => {
    setSelectedStoklar(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: grayColor, borderRadius: 12 }}>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >

        {/* Ana İçerik Alanı */}
        <View style={{ padding: 16, borderColor: blueBorderColor, borderWidth: 2, borderRadius: 12 }}>
          {/* Başlık */}
          <View className="flex-row items-center mb-6">
            <MaterialCommunityIcons name="truck-fast-outline" size={24} color={textColor} />
            <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('sevkiyat-kontrol')}</Text>
          </View>
          {/* Kontrol Kartı */}
          <View style={{ backgroundColor: cardColor, borderRadius: 12, borderColor: greenBorderColor, borderWidth: 1, overflow: 'hidden', marginBottom: 16 }}>
            {/* Kontrol Header - Tıklanabilir */}
            <TouchableOpacity
              style={{ backgroundColor: backgroundColor, paddingHorizontal: 16, paddingVertical: 12 }}
              onPress={() => setIsKontrolDetayOpen(!isKontrolDetayOpen)}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 32, height: 32, backgroundColor: grayColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <Ionicons name="checkmark-circle-outline" size={16} color={textColor} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: textColor }}>{t('kontrol')} #{kontrol.id}</Text>
                    <Text style={{ fontSize: 14, color: textColor }}>{kontrol.tarih}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ backgroundColor: greenColor, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginRight: 8 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{t('baslatilacak')}</Text>
                  </View>
                  <Ionicons
                    name={isKontrolDetayOpen ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={secondaryColor}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {/* Kontrol Detayları - Koşullu Gösterim */}
            {isKontrolDetayOpen && (
              <View style={{ padding: 16 }}>
                {/* Depo Bilgileri */}
                <View style={{ marginBottom: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: textColor, marginBottom: 8 }}>{t('depo-bilgileri')}</Text>
                  <View style={{ backgroundColor: surfaceColor, borderRadius: 8, padding: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 14, color: secondaryColor }}>{t('depo')}:</Text>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{kontrol.DepoKodu} - {kontrol.DepoAdi}</Text>
                    </View>
                  </View>
                </View>

                {/* Cari Bilgileri */}
                <View style={{ marginBottom: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: textColor, marginBottom: 8 }}>{t('cari-bilgileri')}</Text>
                  <View style={{ backgroundColor: surfaceColor, borderRadius: 8, padding: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ fontSize: 14, color: secondaryColor }}>{t('cari')}:</Text>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{kontrol.cariKodu} - {kontrol.cariAdi}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 14, color: secondaryColor }}>{t('tarih')}:</Text>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{kontrol.tarih}</Text>
                    </View>
                  </View>
                </View>

                {/* Sevkiyat Bilgileri */}
                <View style={{ marginBottom: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: textColor, marginBottom: 8 }}>{t('sevkiyat-bilgileri')}</Text>
                  <View style={{ backgroundColor: surfaceColor, borderRadius: 8, padding: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ fontSize: 14, color: secondaryColor }}>{t('sevkiyat-numarasi')}:</Text>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{kontrol.belgeSeriNo}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 14, color: secondaryColor }}>{t('nakliye-tipi')}:</Text>
                      <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{kontrol.nakliyeTipi}</Text>
                    </View>
                  </View>
                </View>


              </View>
            )}
          </View>

          {/* Barkod Okutma Bölümü */}
          <View style={{ borderWidth: 1, borderColor: borderColor, marginBottom: 16 }}>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: cardColor,
                borderRadius: 12,
                padding: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
                borderWidth: 1,
                borderColor: greenBorderColor,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              activeOpacity={0.7}
              onPress={() => console.log('Barkod okut pressed')}
            >
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                <Ionicons
                  name="barcode-sharp"
                  size={20}
                  color={greenBorderColor}
                />
              </View>
              <Text style={{
                color: textColor,
                fontWeight: '500',
                fontSize: 14
              }}>
                {t('barkod-okut')}
              </Text>
            </TouchableOpacity>
          </View>


          {/* Stok Bilgileri Detayı */}
          <View style={{ backgroundColor: cardColor, borderRadius: 12, borderWidth: 1, borderColor: purpleBorderColor, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
            {/* Tıklanabilir Header */}
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: borderColor }}
              onPress={() => setIsStokBilgileriOpen(!isStokBilgileriOpen)}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="cube-outline" size={18} color={purpleBorderColor} />
                <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginLeft: 8 }}>{t('stok-bilgileri')}</Text>
                <View style={{ backgroundColor: purpleColor, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, marginLeft: 8 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>3 {t('urun')}</Text>
                </View>
                {selectedStoklar.length > 0 && (
                  <View style={{ backgroundColor: surfaceColor, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, marginLeft: 8 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: successColor }}>{selectedStoklar.length} {t('secili')}</Text>
                  </View>
                )}
              </View>
              <Ionicons
                name={isStokBilgileriOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={secondaryColor}
              />
            </TouchableOpacity>

            {/* Açılır İçerik */}
            {isStokBilgileriOpen && (
              <View style={{ padding: 16 }}>
                {/* Örnek stok verileri */}
                {[
                  {
                    stokKodu: 'STK001',
                    stokAdi: 'Laptop Dell Inspiron 15',
                    seriNumarasi: 'DL2024001',
                    miktari: 5,
                    seriTakibi: true,
                    miktarKadarSerisi: true,
                    depoBakiyesi: 15,
                    rafBakiyesi: 8
                  },
                  {
                    stokKodu: 'STK002',
                    stokAdi: 'Wireless Mouse Logitech',
                    seriNumarasi: '',
                    miktari: 10,
                    seriTakibi: false,
                    miktarKadarSerisi: false,
                    depoBakiyesi: 50,
                    rafBakiyesi: 25
                  },
                  {
                    stokKodu: 'STK003',
                    stokAdi: 'USB Kablo Type-C',
                    seriNumarasi: 'USB2024001',
                    miktari: 25,
                    seriTakibi: true,
                    miktarKadarSerisi: true,
                    depoBakiyesi: 100,
                    rafBakiyesi: 75
                  }
                ].map((stok, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ marginBottom: 16 }}
                    onPress={() => toggleStokSelection(index)}
                    activeOpacity={0.7}
                  >
                    <View style={{
                      backgroundColor: selectedStoklar.includes(index) ? surfaceColor : (index % 2 === 0 ? grayColor : indigoColor),
                      borderRadius: 8,
                      padding: 12,
                      borderWidth: 2,
                      borderColor: selectedStoklar.includes(index) ? successColor : borderColor,
                      position: 'relative'
                    }}>

                      {/* Seçim Checkbox'ı - Sağ üst köşe */}
                      <TouchableOpacity
                        onPress={() => toggleStokSelection(index)}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 24,
                          height: 24,
                          borderRadius: 4,
                          borderWidth: 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: selectedStoklar.includes(index) ? greenColor : cardColor,
                          borderColor: selectedStoklar.includes(index) ? greenColor : borderColor
                        }}
                      >
                        {selectedStoklar.includes(index) && (
                          <Ionicons name="checkmark" size={14} color="white" />
                        )}
                      </TouchableOpacity>

                      {/* Seçilebilir olduğunu gösteren ikon - Sol üst köşe */}
                      <View style={{ position: 'absolute', top: 8, left: 8, zIndex: 10 }}>
                        <View style={{ width: 24, height: 24, backgroundColor: yellowColor, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                          <Ionicons name="hand-left-outline" size={16} color={textColor} />
                        </View>
                      </View>

                      {/* İçerik alanı - padding top eklendi */}
                      <View style={{ paddingTop: 16 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('stok-kodu')}:</Text>
                          <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{stok.stokKodu}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('stok-adi')}:</Text>
                          <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{stok.stokAdi}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('miktar')}:</Text>
                          <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{stok.miktari}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('seri-numarasi')}:</Text>
                          <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{stok.seriNumarasi || t('yok')}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('seri-takibi')}:</Text>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 16,
                            backgroundColor: stok.seriTakibi ? greenColor : redColor
                          }}>
                            <Ionicons
                              name={stok.seriTakibi ? 'checkmark' : 'close'}
                              size={14}
                              color={stok.seriTakibi ? textColor : textColor}
                            />
                            <Text style={{
                              fontSize: 14,
                              fontWeight: '500',
                              marginLeft: 4,
                              color: stok.seriTakibi ? textColor : textColor
                            }}>
                              {stok.seriTakibi ? t('evet') : t('hayir')}
                            </Text>
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('miktar-kadar-serisi')}:</Text>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 16,
                            backgroundColor: stok.miktarKadarSerisi ? greenColor : redColor
                          }}>
                            <Ionicons
                              name={stok.miktarKadarSerisi ? 'checkmark' : 'close'}
                              size={14}
                              color={stok.miktarKadarSerisi ? textColor : textColor}
                            />
                            <Text style={{
                              fontSize: 14,
                              fontWeight: '500',
                              marginLeft: 4,
                              color: stok.miktarKadarSerisi ? textColor : textColor
                            }}>
                              {stok.miktarKadarSerisi ? t('evet') : t('hayir')}
                            </Text>
                          </View>
                        </View>

                        {/* Depo Bakiyesi */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('depo-bakiyesi')}:</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: orangeColor, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16}}>
                              <Ionicons name="cube" size={14} color={textColor} />
                              <Text style={{ marginLeft: 4, fontSize: 14, fontWeight: '500', color: textColor }}>{stok.depoBakiyesi} {t('adet')}</Text>
                            </View>
                          </View>
                        </View>

                        {/* Raf Bakiyesi */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('raf-bakiyesi')}:</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: orangeColor, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16}}>
                              <Ionicons name="library" size={14} color={textColor} />
                              <Text style={{ marginLeft: 4, fontSize: 14, fontWeight: '500', color: textColor }}>{stok.rafBakiyesi} {t('adet')}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {/* Aksiyon Butonları */}
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: borderColor,
                backgroundColor: cardColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={onClose}
            >
              <Ionicons name="close" size={20} color={textColor} style={{ marginRight: 8 }} />
              <Text style={{ color: textColor, fontWeight: '500' }}>{t('iptal')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 16,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: greenColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => console.log('Kontrolü Başlat pressed')}
            >
              <Text style={{ color: textColor, fontWeight: '500' }}>{t('kontrolu-baslat')}</Text>
              <Ionicons name="play" size={20} color={textColor} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SevkiyatKontrolBaslat;