import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

interface SevkiyatEmri {
  id: string;
  tarih: string;
  durum: 'Bekliyor' | 'Toplanıyor' | 'Tamamlandı';
  cikisDepoKodu: string;
  cikisDepoAdi: string;
  karsiDepoKodu: string;
  karsiDepoAdi: string;
  cariKodu: string;
  cariAdi: string;
  projeKodu: string;
  projeAdi: string;
  belgeSeriNo: string;
  eIrsaliye: boolean;
  aciklama1: string;
  aciklama2: string;
  aciklama3: string;
  stoklar?: any[];
}

interface SevkiyatEmriBaslatProps {
  sevkiyat: SevkiyatEmri;
  selectedDepo?: string;
  onClose: () => void;
}

const SevkiyatEmriBaslat: React.FC<SevkiyatEmriBaslatProps> = ({
  sevkiyat,
  selectedDepo,
  onClose
}) => {
  const [isStokBilgileriOpen, setIsStokBilgileriOpen] = useState(false);
  const [paketEtiketiOlustur, setPaketEtiketiOlustur] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  // Dil
  const { t } = useLanguage();

  // Durum çevirisi için yardımcı fonksiyon
  const getStatusText = (status: string) => {
    switch (status) {
      case 'Bekliyor':
        return t('bekliyor');
      case 'Toplanıyor':
        return t('toplaniyor');
      case 'Tamamlandı':
        return t('tamamlandi');
      default:
        return status;
    }
  };

  // Tema
  const { isDarkMode } = useTheme();

  // Tema renkleri
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

  // Örnek stok verileri
  const stokBilgileri: StokBilgisi[] = [
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
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>

      {/* Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >

        {/* Ana İçerik Alanı */}
        <View style={{ padding: 16, borderWidth: 2, borderColor: blueBorderColor, borderRadius: 12 }}>
          {/* Başlık */}
          <View className="flex-row items-center mb-6">
            <Ionicons name="document-text-outline" size={24} color={textColor} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor, marginLeft: 8 }}>{t('sevkiyat-emirleri')}</Text>
          </View>

          {/* Sevkiyat Kartı */}
          <View style={{ backgroundColor: cardColor, borderRadius: 12, shadowOpacity: 0.1, borderColor, borderWidth: 1, overflow: 'hidden', marginBottom: 16 }}>
            {/* Sevkiyat Header */}
            <View style={{ backgroundColor: backgroundColor, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: borderColor }}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View style={{ width: 32, height: 32, backgroundColor: grayColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <Ionicons name="document-text-outline" size={16} color={textColor} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: textColor }}>{t('sevkiyat-emri')} #{sevkiyat.id}</Text>
                    <Text style={{ fontSize: 14, color: secondaryColor }}>{sevkiyat.tarih}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: greenColor, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{t('baslatilacak')}</Text>
                </View>
              </View>
            </View>

            {/* Sevkiyat Detayları */}
            <View style={{ padding: 16, gap: 12 }}>
              {/* Depo Bilgileri */}
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('depo-bilgileri')}</Text>
                <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, gap: 8, borderWidth: 1, borderColor: blueBorderColor }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cikis-depo')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{sevkiyat.cikisDepoKodu} - {sevkiyat.cikisDepoAdi}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('karsi-depo')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{sevkiyat.karsiDepoKodu} - {sevkiyat.karsiDepoAdi}</Text>
                  </View>
                </View>
              </View>

              {/* Cari ve Proje Bilgileri */}
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('cari-ve-proje')}</Text>
                <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, gap: 8, borderWidth: 1, borderColor: greenBorderColor }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cari')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{sevkiyat.cariKodu} - {sevkiyat.cariAdi}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('proje')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{sevkiyat.projeKodu} - {sevkiyat.projeAdi}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('belge-seri-no')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{sevkiyat.belgeSeriNo}</Text>
                  </View>
                </View>
              </View>

              {/* E-İrsaliye */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('e-irsaliye')}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, backgroundColor: sevkiyat.eIrsaliye ? greenColor : redColor }}>
                  <Ionicons
                    name={sevkiyat.eIrsaliye ? 'checkmark' : 'close'}
                    size={14}
                    color={sevkiyat.eIrsaliye ? textColor : textColor}
                  />
                  <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 4, color: sevkiyat.eIrsaliye ? textColor : textColor }}>
                    {sevkiyat.eIrsaliye ? t('aktif') : t('pasif')}
                  </Text>
                </View>
              </View>

              {/* Açıklamalar */}
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('aciklamalar')}</Text>
                <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, gap: 4, borderWidth: 1, borderColor: purpleBorderColor }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>1. {sevkiyat.aciklama1}</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>2. {sevkiyat.aciklama2}</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>3. {sevkiyat.aciklama3}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Paket Etiketi Oluştur Checkbox - Sadece tikli değilse göster */}
          {!paketEtiketiOlustur && (
            <View className="mb-6">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  backgroundColor: surfaceColor,
                  borderRadius: 12,
                  borderColor,
                  borderWidth: 1
                }}
                onPress={() => setPaketEtiketiOlustur(!paketEtiketiOlustur)}
                activeOpacity={0.7}
              >
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  borderWidth: 2,
                  marginRight: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: paketEtiketiOlustur ? primaryColor : cardColor,
                  borderColor: paketEtiketiOlustur ? primaryColor : borderColor
                }}>
                  {paketEtiketiOlustur && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
                <View className="flex-1">
                  <Text style={{ fontSize: 16, fontWeight: '500', color: textColor }}>{t('paket-etiketi-olustur')}</Text>
                  <Text style={{ fontSize: 14, color: secondaryColor, marginTop: 4 }}>{t('paket-etiketi-olusturmak-icin-bu-secenegi-secin')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}


          {/* Paketi Bitir Butonu - Sadece checkbox tikli ise göster */}
          {paketEtiketiOlustur && (
            <View className="mb-4">
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: 'center',
                  shadowOpacity: 0.2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginHorizontal: 4,
                  backgroundColor: greenColor
                }}
                activeOpacity={0.8}
                onPress={() => setShowConfirmPopup(true)}
              >
                <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('paketi-bitir')}</Text>
                <Ionicons name="checkmark" size={20} color={textColor} style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          )}


          {/* Barkod Okutma */}
          <View className="mb-4">
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: cardColor,
                borderRadius: 12,
                padding: 8,
                shadowOpacity: 0.1,
                borderColor: greenBorderColor,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              activeOpacity={0.7}
              onPress={() => console.log('Kamera OCR pressed')}
            >
              <View style={{
                width: 32,
                height: 32,
                backgroundColor: greenColor,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Ionicons name="scan-sharp" size={16} color={textColor} />
              </View>
              <Text style={{ color: textColor, fontWeight: '500', fontSize: 14 }}>{t('barkod-okut')}</Text>
            </TouchableOpacity>
          </View>


          {/* Stok Bilgileri Detayı */}
          <View style={{ backgroundColor: cardColor, borderRadius: 12, borderWidth: 1, borderColor: purpleBorderColor, marginBottom: 16 }}>
            {/* Tıklanabilir Header */}
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: borderColor }}
              onPress={() => setIsStokBilgileriOpen(!isStokBilgileriOpen)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <Ionicons name="cube-outline" size={18} color={purpleBorderColor} />
                <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginLeft: 8 }}>{t('stok-bilgileri')}</Text>
                <View style={{ backgroundColor: purpleColor, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, marginLeft: 8 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>3 {t('urun')}</Text>
                </View>
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
                {stokBilgileri.map((stok, index) => (
                  <View key={index} style={{ marginBottom: index === 2 ? 0 : 16 }}>
                    <View style={{ backgroundColor: index % 2 === 0 ? borderColor : indigoColor, borderRadius: 8, padding: 12, gap: 8 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('stok-kodu')}:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.stokKodu}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('stok-adi')}:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.stokAdi}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('miktar')}:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.miktari}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('seri-numarasi')}:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.seriNumarasi || t('yok')}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '600', color: textColor }}>{t('seri-takibi')}:</Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 20,
                          backgroundColor: stok.seriTakibi ? greenColor : redColor
                        }}>
                          <Ionicons
                            name={stok.seriTakibi ? 'checkmark' : 'close'}
                            size={12}
                            color={stok.seriTakibi ? textColor : textColor}
                          />
                          <Text style={{
                            fontSize: 12,
                            fontWeight: '500',
                            marginLeft: 4,
                            color: stok.seriTakibi ? textColor : textColor
                          }}>
                            {stok.seriTakibi ? t('evet') : t('hayir')}
                          </Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('miktar-kadar-serisi')}:</Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 20,
                          backgroundColor: stok.miktarKadarSerisi ? greenColor : redColor
                        }}>
                          <Ionicons
                            name={stok.miktarKadarSerisi ? 'checkmark' : 'close'}
                            size={12}
                            color={stok.miktarKadarSerisi ? textColor : textColor}
                          />
                          <Text style={{
                            fontSize: 12,
                            fontWeight: '500',
                            marginLeft: 4,
                            color: stok.miktarKadarSerisi ? textColor : textColor
                          }}>
                            {stok.miktarKadarSerisi ? t('evet') : t('hayir')}
                          </Text>
                        </View>
                      </View>

                      {/* Depo Bakiyesi */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('depo-bakiyesi')}:</Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 20,
                          backgroundColor: yellowColor
                        }}>
                          <Ionicons name="cube-outline" size={12} color={textColor} />
                          <Text style={{
                            fontSize: 12,
                            fontWeight: '500',
                            marginLeft: 4,
                            color: isDarkMode ? textColor : textColor
                          }}>
                            {stok.depoBakiyesi} {t('adet')}
                          </Text>
                        </View>
                      </View>

                      {/* Raf Bakiyesi */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('raf-bakiyesi')}:</Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 20,
                          backgroundColor: purpleColor
                        }}>
                          <Ionicons name="library-outline" size={12} color={textColor} />
                          <Text style={{
                            fontSize: 12,
                            fontWeight: '500',
                            marginLeft: 4,
                            color: isDarkMode ? textColor : textColor
                          }}>
                            {stok.rafBakiyesi} {t('adet')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
          {/* Aksiyon Butonları */}
          <View className="flex-row justify-center">
            <TouchableOpacity
              style={{
                width: 128,
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: 'center',
                borderColor,
                borderWidth: 1,
                backgroundColor: cardColor,
                flexDirection: 'row',
                justifyContent: 'center',
                marginHorizontal: 4
              }}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
              <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('geri')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 128,
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: 'center',
                shadowOpacity: 0.2,
                flexDirection: 'row',
                justifyContent: 'center',
                marginHorizontal: 4,
                backgroundColor: greenColor
              }}
              activeOpacity={0.8}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{t('tamamla')}</Text>
              <Ionicons name="checkmark" size={20} color={textColor} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Paketi Bitir Onay Popup'ı */}
      <Modal
        visible={showConfirmPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmPopup(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
          <View style={{ backgroundColor: cardColor, borderRadius: 12, padding: 24, width: '95%', maxWidth: 384, borderWidth: 1, borderColor: yellowBorderColor }}>
            {/* Popup Header */}
            <View className="items-center mb-4">
              <View style={{
                width: 64,
                height: 64,
                backgroundColor: grayColor,
                borderRadius: 32,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <Ionicons name="warning" size={32} color={warningColor} />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor, textAlign: 'center' }}>{t('paketi-bitir')}</Text>
            </View>

            {/* Popup Message */}
            <Text style={{ color: secondaryColor, textAlign: 'center', marginBottom: 24, lineHeight: 20 }}>
              {t('paketi-bitirmek-istediginize-emin-misiniz')}
            </Text>

            {/* Popup Buttons */}
            <View className="flex-row justify-center space-x-3">
              <TouchableOpacity
                style={{
                  width: 128,
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: 'center',
                  borderColor,
                  borderWidth: 1,
                  backgroundColor: cardColor,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginHorizontal: 4
                }}
                onPress={() => setShowConfirmPopup(false)}
                activeOpacity={0.7}
              >
                <Text style={{ color: textColor, fontWeight: '600' }}>{t('hayir')}</Text>
                <Ionicons name="close" size={20} color={textColor} style={{ marginLeft: 4 }} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 128,
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: 'center',
                  shadowOpacity: 0.2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginHorizontal: 4,
                  backgroundColor: greenColor
                }}
                onPress={() => {
                  setShowConfirmPopup(false);
                  setPaketEtiketiOlustur(false); // Checkbox alanını tekrar görünür yap
                  // Burada paketi bitirme işlemi yapılacak
                  console.log('Paket bitirildi');
                }}
                activeOpacity={0.7}
              >
                <Text style={{ color: textColor, fontWeight: '600' }}>{t('evet')}</Text>
                <Ionicons name="checkmark" size={20} color={textColor} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SevkiyatEmriBaslat;