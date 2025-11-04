import CustomHeader from '@/components/CustomHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import CustomDropdown from '../../components/CustomDropdown';
import { CksStok } from '../servis/erpClass/stokServisClass';
import { getCksStoklar } from '../servis/erpServis/stokServis';

export default function StokDetayEkrani() {
  const [selectedStokKodu, setSelectedStokKodu] = useState('');
  const [stokAdi, setStokAdi] = useState('');
  const [birim, setBirim] = useState('');
  const [kategori, setKategori] = useState('');
  const [mevcut, setMevcut] = useState('');
  const [rezerve, setRezerve] = useState('');
  const [kullanilabilir, setKullanilabilir] = useState('');

  // API Stok verileri için state'ler
  const [apiStoklar, setApiStoklar] = useState<CksStok[]>([]);
  const [isStokLoading, setIsStokLoading] = useState<boolean>(false);
  const [stokError, setStokError] = useState<string | null>(null);
  const [selectedStokDetay, setSelectedStokDetay] = useState<CksStok | null>(null);

  // Tema hook'ları
  const { isDarkMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBg = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const surfaceColor = useThemeColor({}, 'surface');

  // API'den stok verilerini çek
  useEffect(() => {
    const fetchStoklar = async () => {
      console.log('StokDetayEkrani: useEffect başlatıldı');
      setIsStokLoading(true);
      setStokError(null);
      
      try {
        console.log('StokDetayEkrani: API\'den stok verileri çekiliyor...');
        const response = await getCksStoklar();
        console.log('StokDetayEkrani: API response:', response);
        
        if (response.success && response.data) {
          const stoklar = response.data;
          console.log('StokDetayEkrani: API\'den gelen stok sayısı:', stoklar.length);
          console.log('StokDetayEkrani: İlk stok örneği:', stoklar[0]);
          
          setApiStoklar(stoklar);
        } else {
          console.log('StokDetayEkrani: API\'den veri alınamadı:', response.message);
          setStokError(response.message || 'Stok verileri alınamadı');
        }
      } catch (error) {
        console.error('StokDetayEkrani: API hatası:', error);
        setStokError('Stok verileri yüklenirken hata oluştu');
      } finally {
        setIsStokLoading(false);
      }
    };

    fetchStoklar();
  }, []);

  // API verilerini dropdown formatına dönüştür
  const convertApiStokToProduct = (stok: CksStok) => {
    // Hem büyük hem küçük harfli alan adlarını destekle
    const stokKodu = stok.STOK_KODU || stok.stoK_KODU || '';
    const stokAdi = stok.STOK_ADI || stok.stoK_ADI || '';
    const miktar = stok.MIKTAR || stok.miktar || 0;
    const birim = stok.BIRIM || stok.birim || '';

    return {
      label: `${stokKodu} - ${stokAdi}`,
      value: stokKodu,
      stokDetay: stok
    };
  };

  // Stok kodu seçenekleri - API'den gelen veriler varsa onları kullan, yoksa fallback
  const stokKoduOptions = apiStoklar.length > 0 
    ? (() => {
        console.log('StokDetayEkrani: API verilerinden dropdown seçenekleri oluşturuluyor, stok sayısı:', apiStoklar.length);
        const options = apiStoklar.map(convertApiStokToProduct);
        console.log('StokDetayEkrani: Oluşturulan dropdown seçenekleri:', options.slice(0, 3)); // İlk 3 seçeneği göster
        return options;
      })()
    : (() => {
        console.log('StokDetayEkrani: API verisi yok, fallback seçenekler kullanılıyor');
        return [
          { label: 'STK001 - Laptop Bilgisayar', value: 'STK001' },
          { label: 'STK002 - Masaüstü Bilgisayar', value: 'STK002' },
          { label: 'STK003 - Yazıcı', value: 'STK003' },
        ];
      })();

  const handleStokSelection = (option: { label: string; value: string; stokDetay?: CksStok }) => {
    setSelectedStokKodu(option.value);
    
    if (option.stokDetay) {
      // API'den gelen gerçek veri
      const stok = option.stokDetay;
      setSelectedStokDetay(stok);
      
      const stokAdi = stok.STOK_ADI || stok.stoK_ADI || '';
      const birim = stok.BIRIM || stok.birim || 'Adet';
      const miktar = stok.MIKTAR || stok.miktar || 0;
      const kategori = stok.KATEGORI || stok.kategori || 'Genel';
      
      setStokAdi(stokAdi);
      setBirim(birim);
      setKategori(kategori);
      setMevcut(miktar.toString());
      setRezerve('0'); // API'de rezerve bilgisi yoksa 0 olarak ayarla
      setKullanilabilir(miktar.toString()); // Kullanılabilir = Mevcut - Rezerve
    } else {
      // Fallback veriler
      setStokAdi('Örnek Ürün Adı');
      setBirim('Adet');
      setKategori('Genel');
      setMevcut('100');
      setRezerve('10');
      setKullanilabilir('90');
    }
  };

  const handleGeriDon = () => {
    router.back();
  };

  const handleKaydet = () => {
    // Kaydetme işlemi burada yapılacak
    console.log('Stok bilgileri kaydedildi');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <CustomHeader 
        title="Stok Detay Ekranı" 
        onBackPress={handleGeriDon}
      />

      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16 }}>
        {/* API Durum Bilgisi */}
        {isStokLoading && (
          <View style={{ 
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#1E3A8A' : '#EFF6FF',
            borderColor: primaryColor
          }}>
            <View style={{
              width: 16,
              height: 16,
              borderWidth: 2,
              borderColor: primaryColor,
              borderTopColor: 'transparent',
              borderRadius: 8,
              marginRight: 12
            }} />
            <Text style={{ color: primaryColor, fontWeight: '500' }}>Stok verileri yükleniyor...</Text>
          </View>
        )}

        {stokError && (
          <View style={{
            borderWidth: 1,
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            backgroundColor: isDarkMode ? '#7F1D1D' : '#FEF2F2',
            borderColor: '#EF4444'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="alert-circle-outline" size={16} color="#EF4444" />
              <Text style={{ 
                fontWeight: '500',
                marginLeft: 8,
                color: isDarkMode ? '#FCA5A5' : '#DC2626'
              }}>Hata: {stokError}</Text>
            </View>
          </View>
        )}

        {/* Stok Seçimi */}
        <CustomDropdown
          label="Stok Kodu"
          icon="cube-outline"
          placeholder="Stok kodu ve adı seçiniz"
          options={stokKoduOptions}
          value={selectedStokKodu}
          onSelect={handleStokSelection}
        />

        {/* Stok Detayları */}
        {selectedStokKodu && (
          <View style={{ marginTop: 24 }}>
            <View style={{ 
              borderRadius: 12,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
              borderWidth: 1,
              backgroundColor: cardBg,
              borderColor
            }}>
              {/* Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: primaryColor,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}>
                  <Ionicons name="cube" size={20} color="white" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>Stok Bilgileri</Text>
                  <Text style={{ fontSize: 14, color: textColor, opacity: 0.7 }}>Detaylı stok durumu</Text>
                </View>
              </View>

              {/* Stok Bilgileri */}
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4, marginBottom: 12 }}>
                  <Text style={{ fontWeight: '500', color: textColor, opacity: 0.8 }}>Stok Adı:</Text>
                  <Text style={{ fontWeight: '600', color: textColor }}>{stokAdi}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4, marginBottom: 12 }}>
                  <Text style={{ fontWeight: '500', color: textColor, opacity: 0.8 }}>Birim:</Text>
                  <Text style={{ fontWeight: '600', color: textColor }}>{birim}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4, marginBottom: 12 }}>
                  <Text style={{ fontWeight: '500', color: textColor, opacity: 0.8 }}>Kategori:</Text>
                  <Text style={{ fontWeight: '600', color: textColor }}>{kategori}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
                  <Text style={{ fontWeight: '500', color: textColor, opacity: 0.8 }}>Mevcut Stok:</Text>
                  <View style={{
                    backgroundColor: isDarkMode ? '#065F46' : '#D1FAE5',
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 4
                  }}>
                    <Text style={{
                      color: isDarkMode ? '#10B981' : '#065F46',
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}>{mevcut} Adet</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Additional Stock Info */}
            <View style={{
              marginTop: 16,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              backgroundColor: cardBg,
              borderColor
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: textColor }}>Stok Durumu</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={{ fontSize: 14, marginBottom: 4, color: textColor, opacity: 0.7 }}>Rezerve</Text>
                  <View style={{
                    backgroundColor: isDarkMode ? '#92400E' : '#FED7AA',
                    borderRadius: 8,
                    padding: 12
                  }}>
                    <Text style={{
                      color: isDarkMode ? '#F59E0B' : '#92400E',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}>{rezerve}</Text>
                  </View>
                </View>
                
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={{ fontSize: 14, marginBottom: 4, color: textColor, opacity: 0.7 }}>Kullanılabilir</Text>
                  <View style={{
                    backgroundColor: isDarkMode ? '#1E40AF' : '#DBEAFE',
                    borderRadius: 8,
                    padding: 12
                  }}>
                    <Text style={{
                      color: isDarkMode ? '#3B82F6' : '#1E40AF',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}>{kullanilabilir}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}