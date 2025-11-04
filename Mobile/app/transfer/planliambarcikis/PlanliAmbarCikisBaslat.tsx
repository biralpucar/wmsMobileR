import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface PlanliAmbarCikis {
  id: string;
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
  durum: 'Bekliyor' | 'Toplanıyor' | 'Tamamlandı';
  tarih: string;
  stoklar: any[];
}

interface PlanliAmbarCikisBaslatProps {
  ambarCikis: PlanliAmbarCikis;
  selectedDepo: string;
  onClose: () => void;
}

const PlanliAmbarCikisBaslat: React.FC<PlanliAmbarCikisBaslatProps> = ({
  ambarCikis,
  selectedDepo,
  onClose
}) => {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = isDarkMode ? '#60A5FA' : '#3B82F6';
  const secondaryColor = useThemeColor({}, 'secondary');
  const borderColor = useThemeColor({}, 'border');
  const surfaceColor = useThemeColor({}, 'surface');
    const redColor = useThemeColor({}, 'red');
    const orangeColor = useThemeColor({}, 'orange');
    const yellowColor = useThemeColor({}, 'yellow');
    const greenColor = useThemeColor({}, 'green');
    const blueColor = useThemeColor({}, 'blue');
    const indigoColor = useThemeColor({}, 'indigo');
    const purpleColor = useThemeColor({}, 'purple');
    const pinkColor = useThemeColor({}, 'pink');

  const [isStokBilgileriOpen, setIsStokBilgileriOpen] = useState(false);

  return (
    <>
    
      {/* Content */}
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
      >

        {/* Ana İçerik Alanı */}
        <View className='p-4 border border-blue-500 rounded-xl'>
          {/* Başlık */}
          <View className="flex-row items-center mb-6">
            <Ionicons name="arrow-up-outline" size={24} color={textColor} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor, marginLeft: 8 }}>{t('planliAmbarCikislari')}</Text>
          </View>
          
          {/* Ambar Çıkış Kartı */}
          <View style={{ backgroundColor: cardColor, borderRadius: 12, borderWidth: 1, borderColor: borderColor, overflow: 'hidden', marginBottom: 16 }}>
            {/* Ambar Çıkış Header */}
            <View style={{ backgroundColor: surfaceColor, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: borderColor }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 32, height: 32, backgroundColor: purpleColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <Ionicons name="arrow-up-outline" size={16} color={textColor} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: textColor }}>Ambar Çıkış #{ambarCikis.id}</Text>
                    <Text style={{ fontSize: 14, color: secondaryColor }}>{ambarCikis.tarih}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: greenColor, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{t('baslatilacak')}</Text>
                </View>
              </View>
            </View>

            {/* Ambar Çıkış Detayları */}
            <View style={{ padding: 16, gap: 12 }}>
              {/* Depo Bilgileri */}
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('depoBilgileri')}</Text>
                <View style={{ backgroundColor: blueColor, borderRadius: 8, padding: 12, gap: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cikisDepo')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.cikisDepoKodu} - {ambarCikis.cikisDepoAdi}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('karsiDepo')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.karsiDepoKodu} - {ambarCikis.karsiDepoAdi}</Text>
                  </View>
                </View>
              </View>

              {/* Cari ve Proje Bilgileri */}
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('cariVeProje')}</Text>
                <View style={{ backgroundColor: greenColor, borderRadius: 8, padding: 12, gap: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cari')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.cariKodu} - {ambarCikis.cariAdi}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('proje')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.projeKodu} - {ambarCikis.projeAdi}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('belgeSeriNo')}:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.belgeSeriNo}</Text>
                  </View>
                </View>
              </View>

              {/* E-İrsaliye */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('eIrsaliye')}</Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 20,
                  backgroundColor: ambarCikis.eIrsaliye ? greenColor : redColor
                }}>
                  <Ionicons 
                    name={ambarCikis.eIrsaliye ? 'checkmark' : 'close'} 
                    size={14} 
                    color={ambarCikis.eIrsaliye ? textColor : textColor} 
                  />
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    marginLeft: 4,
                    color: ambarCikis.eIrsaliye ? textColor : textColor
                  }}>
                    {ambarCikis.eIrsaliye ? t('aktif') : t('pasif')}
                  </Text>
                </View>
              </View>

              {/* Açıklamalar */}
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('aciklamalar')}</Text>
                <View style={{ backgroundColor: purpleColor, borderRadius: 8, padding: 12, gap: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>1. {ambarCikis.aciklama1}</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>2. {ambarCikis.aciklama2}</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>3. {ambarCikis.aciklama3}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stok Bilgileri Detayı */}
          <View style={{ backgroundColor: cardColor, borderRadius: 12, borderWidth: 1, borderColor: borderColor, marginBottom: 16 }}>
            {/* Tıklanabilir Header */}
            <TouchableOpacity 
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: 16, 
                borderBottomWidth: 1, 
                borderBottomColor: borderColor 
              }}
              onPress={() => setIsStokBilgileriOpen(!isStokBilgileriOpen)}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="cube-outline" size={18} color={primaryColor} />
                <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginLeft: 8 }}>{t('stokBilgileri')}</Text>
                <View style={{ backgroundColor: blueColor, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, marginLeft: 8 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: isDarkMode ? textColor : textColor }}>3 {t('urun')}</Text>
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
                  <View key={index} style={{ marginBottom: index === 2 ? 0 : 16 }}>
                    <View style={{ 
                      backgroundColor: index % 2 === 0 ? borderColor : blueColor, 
                      borderRadius: 8, 
                      padding: 12, 
                      gap: 8 
                    }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('stokKodu')}:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.stokKodu}</Text>
                      </View>
                      
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('stokAdi')}:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.stokAdi}</Text>
                      </View>
                      
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('miktar')}:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.miktari}</Text>
                      </View>
                      
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('seriNumarasi')}:</Text>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.seriNumarasi || t('yok')}</Text>
                      </View>
                      
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('seriTakibi')}:</Text>
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
                        <Text style={{ fontWeight: '600', color: textColor }}>{t('miktarKadarSerisi')}:</Text>
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
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('depoBakiyesi')}:</Text>
                        <View style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          paddingHorizontal: 8, 
                          paddingVertical: 4, 
                          borderRadius: 20, 
                          backgroundColor: yellowColor
                        }}>
                          <Ionicons name="cube-outline" size={12} color={textColor} />
                          <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 4, color: isDarkMode ? textColor : textColor }}>
                            {stok.depoBakiyesi} {t('adet')}
                          </Text>
                        </View>
                      </View>

                      {/* Raf Bakiyesi */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('rafBakiyesi')}:</Text>
                        <View style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          paddingHorizontal: 8, 
                          paddingVertical: 4, 
                          borderRadius: 20, 
                          backgroundColor: purpleColor
                        }}>
                          <Ionicons name="library-outline" size={12} color={textColor} />
                          <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 4, color: isDarkMode ? textColor : textColor }}>
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

          {/* Barkod Okutma */}
          <View style={{ marginBottom: 16 }}>
            <TouchableOpacity 
              style={{ 
                flex: 1, 
                backgroundColor: cardColor, 
                borderRadius: 12, 
                padding: 8, 
                borderWidth: 1, 
                borderColor: borderColor, 
                flexDirection: 'row', 
                alignItems: 'center' 
              }}
              activeOpacity={0.7}
              onPress={() => console.log('Kamera OCR pressed')}
            >
              <View style={{ 
                width: 32, 
                height: 32, 
                backgroundColor: isDarkMode ? '#064E3B' : '#DCFCE7', 
                borderRadius: 8, 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginRight: 12 
              }}>
                <Ionicons name="camera" size={16} color={greenColor} />
              </View>
              <Text style={{ color: textColor, fontWeight: '500', fontSize: 14 }}>{t('barkodOkut')}</Text>
            </TouchableOpacity>
          </View>

          {/* Çıkış Yapılacak Ürünler */}
          <View style={{ 
            backgroundColor: cardColor, 
            borderRadius: 12, 
            padding: 16, 
            marginBottom: 24, 
            borderWidth: 1, 
            borderColor: borderColor 
          }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: textColor, marginBottom: 16 }}>
              {t('cikisYapilacakUrunler')}
            </Text>
            <View style={{ backgroundColor: surfaceColor, borderRadius: 8, padding: 16 }}>
              <Text style={{ color: secondaryColor, textAlign: 'center' }}>
                {t('bolumHenuzGelistirilmeAsamasinda')}
              </Text>
              <Text style={{ color: secondaryColor, textAlign: 'center', fontSize: 14, marginTop: 8 }}>
                {t('urunSecimiVeMiktarBelirlemeIslemleri')}
              </Text>
            </View>
          </View>

          {/* Aksiyon Butonları */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{ 
                width: 128, 
                borderRadius: 12, 
                paddingVertical: 16, 
                alignItems: 'center', 
                borderWidth: 1, 
                borderColor: borderColor, 
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
                flexDirection: 'row', 
                justifyContent: 'center', 
                marginHorizontal: 4, 
                backgroundColor: greenColor 
              }}
              activeOpacity={0.8}
            >
              <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('tamamla')}</Text>
              <Ionicons name="checkmark" size={20} color={textColor} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PlanliAmbarCikisBaslat;