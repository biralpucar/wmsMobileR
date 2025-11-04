import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLanguage } from '@/hooks/useLanguage';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface PlanliHucreTransferi {
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

interface PlanliHucreTransferiBaslatProps {
  hucreTransferi: PlanliHucreTransferi;
  selectedDepo: string;
  onClose: () => void;
}

const PlanliHucreTransferiBaslat: React.FC<PlanliHucreTransferiBaslatProps> = ({
  hucreTransferi,
  selectedDepo,
  onClose
}) => {
  const [selectedHucre, setSelectedHucre] = useState('');
  const { theme } = useTheme();
  const { t } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const colorRed = useThemeColor({}, 'red');
  const colorGreen = useThemeColor({}, 'green');
  const colorBlue = useThemeColor({}, 'blue');
  const colorOrange = useThemeColor({}, 'orange');
  const colorYellow = useThemeColor({}, 'yellow');
  const colorPurple = useThemeColor({}, 'purple');
  const colorPink = useThemeColor({}, 'pink');
  const ColorGray = useThemeColor({}, 'gray');
  const colorSuccess = useThemeColor({}, 'success');
  const colorIndigo = useThemeColor({}, 'indigo');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const isDarkMode = theme === 'dark';
  const primaryColor = useThemeColor({}, 'primary');

  const [isStokBilgileriOpen, setIsStokBilgileriOpen] = useState(false);

  return (
    <View className="flex-1">
      {/* Başlık */}
      {/* <View className="rounded-xl p-4 mb-4 shadow-sm" style={{ backgroundColor: cardColor }}>
        <Text className="text-xl font-bold mb-2" style={{ color: textColor }}>
          Transfer Başlatma
        </Text>
        <Text style={{ color: textColor, opacity: 0.7 }}>
          Seçilen transfer işlemini başlatmak için gerekli bilgileri doldurun.
        </Text>
      </View> */}

      {/* Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >

        {/* Ana İçerik Alanı */}
        <View className="border" style={{
          padding: 16,
          borderWidth: 2,
          borderRadius: 12,
          backgroundColor: backgroundColor, 
          borderColor: blueBorderColor
        }}>
          {/* Başlık */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <Ionicons
              name="swap-horizontal-outline"
              size={24}
              color={textColor}
            />
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: textColor,
              marginLeft: 8
            }}>
              {t('planliHucreTransferleri')}
            </Text>
          </View>

          {/* Hücre Transferi Kartı */}
          <View style={{
            backgroundColor: cardColor,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            borderWidth: 1,
            borderColor: blueBorderColor,
            overflow: 'hidden',
            marginBottom: 16
          }}>
            {/* Hücre Transferi Header */}
            <View style={{
              backgroundColor: backgroundColor,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: borderColor
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 32,
                    height: 32,
                    backgroundColor: ColorGray,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Ionicons
                      name="swap-horizontal-outline"
                      size={16}
                      color={textColor}
                    />
                  </View>
                  <View>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: textColor
                    }}>
                      {t('hucreTransferi')} #{hucreTransferi.id}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: textColor
                    }}>
                      {hucreTransferi.tarih}
                    </Text>
                  </View>
                </View>
                <View style={{
                  backgroundColor: colorGreen,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 9999
                }}>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: textColor
                  }}>
                    {t('baslatilacak')}
                  </Text>
                </View>
              </View>
            </View>

            {/* Hücre Transferi Detayları */}
            <View style={{ padding: 16, gap: 12 }}>
              {/* Depo Bilgileri */}
              <View style={{ gap: 8 }}>
                <Text style={{fontSize: 14, fontWeight: '500', color: textColor}}>{t('depoBilgileri')}</Text>
                <View style={{
                  backgroundColor: borderColor,
                  borderRadius: 8,
                  padding: 12,
                  gap: 8,
                  borderWidth: 1,
                  borderColor: blueBorderColor,
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{fontSize: 14, fontWeight: '600', color: textColor}}>{t('cikisDepo')}:</Text>
                    <Text style={{fontSize: 14, fontWeight: '400', color: textColor}}>{hucreTransferi.cikisDepoKodu} - {hucreTransferi.cikisDepoAdi}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{fontSize: 14, fontWeight: '600', color: textColor}}>{t('karsiDepo')}:</Text>
                    <Text style={{fontSize: 14, fontWeight: '400', color: textColor}}>{hucreTransferi.karsiDepoKodu} - {hucreTransferi.karsiDepoAdi}</Text>
                  </View>
                </View>
              </View>

              {/* Cari ve Proje Bilgileri */}
              <View style={{ gap: 8 }}>
                <Text style={{fontSize: 14, fontWeight: '600', color: textColor}}>{t('cariVeProje')}</Text>
                <View style={{
                  backgroundColor: borderColor,
                  borderRadius: 8,
                  padding: 12,
                  gap: 8,
                  borderWidth: 1,
                  borderColor: greenBorderColor,
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{fontSize: 14, fontWeight: '600', color: textColor}}>{t('cari')}:</Text>
                    <Text style={{fontSize: 14, fontWeight: '400', color: textColor}}>{hucreTransferi.cariKodu} - {hucreTransferi.cariAdi}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{fontSize: 14, fontWeight: '600', color: textColor}}>{t('proje')}:</Text>
                    <Text style={{fontSize: 14, fontWeight: '400', color: textColor}}>{hucreTransferi.projeKodu} - {hucreTransferi.projeAdi}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{fontSize: 14, fontWeight: '600', color: textColor}}>{t('belgeSeriNo')}:</Text>
                    <Text style={{fontSize: 14, fontWeight: '400', color: textColor}}>{hucreTransferi.belgeSeriNo}</Text>
                  </View>
                </View>
              </View>

              {/* E-İrsaliye */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: textColor
                }}>
                  {t('eIrsaliye')}
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 9999,
                  backgroundColor: hucreTransferi.eIrsaliye ? colorGreen : colorRed
                }}>
                  <Ionicons
                    name={hucreTransferi.eIrsaliye ? 'checkmark' : 'close'}
                    size={14}
                    color={hucreTransferi.eIrsaliye ? textColor : textColor}
                  />
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    marginLeft: 4,
                    color: hucreTransferi.eIrsaliye ? textColor : textColor
                  }}>
                    {hucreTransferi.eIrsaliye ? t('aktif') : t('pasif')}
                  </Text>
                </View>
              </View>

              {/* Açıklamalar */}
              <View style={{ gap: 8 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: textColor
                }}>
                  {t('aciklamalar')}
                </Text>
                <View style={{
                  backgroundColor: borderColor,
                  borderRadius: 8,
                  padding: 12,
                  gap: 4,
                  borderWidth: 1,
                  borderColor: purpleBorderColor,
                }}>
                  <Text style={{fontSize: 14, fontWeight: '600', color: textColor}}>1. {hucreTransferi.aciklama1}</Text>
                  <Text style={{fontSize: 14, fontWeight: '600', color: textColor}}>2. {hucreTransferi.aciklama2}</Text>
                  <Text style={{fontSize: 14, fontWeight: '600', color: textColor}}>3. {hucreTransferi.aciklama3}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stok Bilgileri Detayı */}
          <View style={{
            backgroundColor: cardColor,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            borderWidth: 1,
            borderColor: purpleBorderColor,
            marginBottom: 16
          }}>
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
                <Ionicons
                  name="cube-outline"
                  size={18}
                  color={purpleBorderColor}
                />
                <Text style={{fontSize: 16,fontWeight: '600',color: textColor,marginLeft: 8}}>{t('stokBilgileri')}</Text>
                <View style={{
                  backgroundColor: colorPurple,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 9999,
                  marginLeft: 8
                }}>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: isDarkMode ? textColor : textColor
                  }}>
                    {t('ucUrun')}
                  </Text>
                </View>
              </View>
              <Ionicons
                name={isStokBilgileriOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={textColor}
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
                    <View style={{backgroundColor: index % 2 === 0 ? borderColor : colorIndigo, borderRadius: 8, padding: 12, gap: 8}}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('stokKodu')}:</Text>
                        <Text style={{fontSize: 12, fontWeight: '400', color: textColor}}>{stok.stokKodu}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('stokAdi')}:</Text>
                        <Text style={{fontSize: 12, fontWeight: '400', color: textColor}}>{stok.stokAdi}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('miktar')}:</Text>
                        <Text style={{fontSize: 12, fontWeight: '400',color: textColor}}>{stok.miktari}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('seriNumarasi')}:</Text>
                        <Text style={{fontSize: 12, fontWeight: '400', color: textColor}}>{stok.seriNumarasi || t('yok')}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('seriTakibi')}:</Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 9999,
                          backgroundColor: stok.seriTakibi ? colorGreen : colorRed
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
                        <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('miktarKadarSerisi')}:</Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 9999,
                          backgroundColor: stok.miktarKadarSerisi ? colorGreen : colorRed
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
                        <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('depoBakiyesi')}:</Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 9999,
                          backgroundColor: colorBlue
                        }}>
                          <Ionicons
                            name="cube-outline"
                            size={12}
                            color={textColor}
                          />
                          <Text style={{
                            fontSize: 12,
                            fontWeight: '500',
                            marginLeft: 4,
                            color: textColor
                          }}>
                            {stok.depoBakiyesi} {t('adet')}
                          </Text>
                        </View>
                      </View>

                      {/* Raf Bakiyesi */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('rafBakiyesi')}:</Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 9999,
                          backgroundColor: colorPurple
                        }}>
                          <Ionicons
                            name="library-outline"
                            size={12}
                            color={textColor}
                          />
                          <Text style={{
                            fontSize: 12,
                            fontWeight: '500',
                            marginLeft: 4,
                            color: textColor
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

          {/* Barkod Okutma */}
          <View style={{ marginBottom: 16 }}>
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
              onPress={() => console.log('Kamera OCR pressed')}
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
                {t('barkodOkut')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transfer Edilecek Ürünler */}
          <View style={{
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
            backgroundColor: cardColor,
            borderColor: yellowBorderColor,
            borderWidth: 1
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 16,
              color: textColor
            }}>
              {t('transferEdilecekUrunler')}
            </Text>
            <View style={{
              backgroundColor: cardColor,
              borderRadius: 8,
              padding: 16
            }}>
              <Text style={{
                textAlign: 'center',
                color: textColor,
                opacity: 0.7
              }}>
                {t('buBolumHenuzGelistirilmeAsamasindadir')}
              </Text>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                marginTop: 8,
                color: textColor,
                opacity: 0.5
              }}>
                {t('urunSecimiVeMiktarBelirlemeIslemleri')}
              </Text>
            </View>
          </View>

          {/* Aksiyon Butonları */}
          <View style={{
            flexDirection: 'row',
            gap: 12,
            marginTop: 24
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: 'center',
                backgroundColor: cardColor,
                borderColor: borderColor,
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'center'
              }}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Ionicons
                name="arrow-back"
                size={18}
                color={textColor}
                style={{ marginRight: 8 }}
              />
              <Text style={{
                fontWeight: '600',
                color: textColor
              }}>
                {t('geri')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colorGreen,
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
              }}
              activeOpacity={0.8}
            >
              <Text style={{color: textColor,fontWeight: '600'}}>{t('tamamla')}</Text>
              <Ionicons
                name="checkmark"
                size={18}
                color={textColor}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlanliHucreTransferiBaslat;