import CustomAlert from '@/components/CustomAlert';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface AmbarGirisSiparisBaglantiliFormProps {
  formData: {
    selectedDepo?: string;
    hucreTuru?: string;
    cikisYeri?: string;
    projeKodu?: string;
    aciklama1?: string;
    aciklama2?: string;
    aciklamaText?: string;
    siparisBaglantili?: boolean;
  } | null;
  onBack: () => void;
  onComplete: (data: any) => void;
}

const AmbarGirisSiparisBaglantiliForm: React.FC<AmbarGirisSiparisBaglantiliFormProps> = ({ formData, onBack, onComplete }) => {
  // Tema hook'ları
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDarkMode = theme === 'dark';
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const surfaceColor = useThemeColor({}, 'surface');
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

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({});
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'error' as const });

  // Mock data - gerçek uygulamada API'den gelecek
  const productCategories = [
    {
      id: 1,
      title: 'SP001',
      icon: 'settings-outline' as const,
      siparisNo: 'SP001',
      cariKodu: 'C001',
      cariUnvani: 'ABC A.Ş.',
      teslimTarihi: '2025-07-08',
      products: [
        { id: 1, name: t('vidaliKompresor'), stokKodu: 'STK001', miktar: 10, seriTakibi: t('evet'), stock: '10 ' + t('adet'), miktarKadarSeri: t('evet') },
        { id: 2, name: t('rulman6205ZZ'), stokKodu: 'STK002', miktar: 50, seriTakibi: t('hayir'), stock: '50 ' + t('adet'), miktarKadarSeri: t('hayir') }
      ]
    },
    {
      id: 2,
      title: 'SP002',
      icon: 'disc-outline' as const,
      siparisNo: 'SP002',
      cariKodu: 'C001',
      cariUnvani: 'ABC A.Ş.',
      teslimTarihi: '2025-07-10',
      products: [
        { id: 3, name: t('yagFiltresi'), stokKodu: 'STK003', miktar: 20, seriTakibi: t('evet'), stock: '20 ' + t('adet'), miktarKadarSeri: t('hayir') }
      ]
    },
    {
      id: 3,
      title: 'SP003',
      icon: 'funnel-outline' as const,
      siparisNo: 'SP003',
      cariKodu: 'C001',
      cariUnvani: 'ABC A.Ş.',
      teslimTarihi: '2025-07-12',
      products: [
        { id: 4, name: t('havaFiltresi'), stokKodu: 'STK004', miktar: 15, seriTakibi: t('hayir'), stock: '15 ' + t('adet'), miktarKadarSeri: t('hayir') }
      ]
    },
    {
      id: 4,
      title: 'SP004',
      icon: 'construct-outline' as const,
      siparisNo: 'SP004',
      cariKodu: 'C001',
      cariUnvani: 'ABC A.Ş.',
      teslimTarihi: '2025-07-15',
      products: [
        { id: 5, name: t('kompresorKayisi'), stokKodu: 'STK005', miktar: 5, seriTakibi: t('hayir'), stock: '5 ' + t('adet'), miktarKadarSeri: t('hayir') }
      ]
    },
    {
      id: 5,
      title: 'SP005',
      icon: 'hardware-chip-outline' as const,
      siparisNo: 'SP005',
      cariKodu: 'C001',
      cariUnvani: 'ABC A.Ş.',
      teslimTarihi: '2025-07-20',
      products: [
        { id: 6, name: t('elektronikKart'), stokKodu: 'STK006', miktar: 2, seriTakibi: t('evet'), stock: '2 ' + t('adet'), miktarKadarSeri: t('hayir') }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleInfoSection = () => {
    setIsInfoExpanded(prev => !prev);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCategorySelection = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newState = {
        ...prev,
        [categoryId]: !prev[categoryId]
      };

      // Kategori seçildiğinde/seçimi kaldırıldığında ürünleri de güncelle
      const category = productCategories.find(cat => cat.id === Number(categoryId));
      if (category) {
        if (newState[categoryId]) {
          // Kategori seçildi - tüm ürünlerini ekle
          const categoryProductIds = category.products.map(product => product.id);
          setSelectedProducts(prev => {
            const newProducts = [...prev];
            categoryProductIds.forEach(productId => {
              if (!newProducts.includes(String(productId))) {
                newProducts.push(String(productId));
              }
            });
            return newProducts;
          });
        } else {
          // Kategori seçimi kaldırıldı - tüm ürünlerini çıkar
          const categoryProductIds = category.products.map(product => product.id);
          setSelectedProducts(prev => prev.filter(productId => !categoryProductIds.includes(Number(productId))));
        }
      }

      return newState;
    });
  };

  const handleSubmit = async () => {
    // Seçili kategorileri kontrol et
    const hasSelectedCategory = Object.values(selectedCategories).some(selected => selected);
    if (!hasSelectedCategory) {
      setAlertConfig({ title: t('error'), message: t('lutfenEnAzBirKategoriSeciniz'), type: 'error' });
      setAlertVisible(true);
      return;
    }

    setIsLoading(true);

    // Simulated validation
    setTimeout(() => {
      setIsLoading(false);

      // Seçili kategorilerdeki tüm ürünleri al
      const selectedProductsData = productCategories
        .filter(category => selectedCategories[category.id])
        .flatMap(category =>
          category.products.map(product => ({
            name: product.name,
            stokKodu: product.stokKodu,
            miktar: product.miktar,
            seriTakibi: product.seriTakibi,
            stock: product.stock,
            miktarKadarSeri: product.miktarKadarSeri
          }))
        );

      // Seçili kategorilerin detaylarını al
      const selectedCategoryDetails = productCategories
        .filter(category => selectedCategories[category.id])
        .map(category => ({
          id: category.id,
          title: category.title,
          siparisNo: category.siparisNo,
          cariKodu: category.cariKodu,
          cariUnvani: category.cariUnvani,
          teslimTarihi: category.teslimTarihi,
          products: category.products
        }));

      // Cari adını seçili kategorilerden al
      const cariAdi = productCategories.find(cat => selectedCategoryDetails.some(selected => selected.id === cat.id))?.cariUnvani || 'ABC A.Ş.';

      // Form verilerini hazırla
      const submitData = {
        ...formData,
        selectedProducts: selectedProductsData,
        selectedCategoryDetails,
        cariAdi,
        // Dinamik olarak oluşturulan veriler
        siparisNo: `SIP${Date.now().toString().slice(-6)}`,
        urunKod: selectedProductsData.length > 0 ? selectedProductsData.map(p => p.stokKodu).join(', ') : t('seciliUrunYok'),
        miktar: selectedProductsData.length,
        birimFiyat: selectedProductsData.length * 150 // Örnek hesaplama
      };

      // onComplete prop'unu çağır (AmbarGirisSiparisBaglantiliForm2'ye yönlendir)
      onComplete(submitData);
    }, 500);
  };

  return (
    <View className="rounded-2xl shadow-sm p-6" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
      {/* Başlık */}
      <View className="flex-row items-center mb-6">
        <Ionicons name="link" size={24} color={textColor} />
        <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('siparisBaglantiliAmbarGirisForm')}</Text>
      </View>

      {/* Mevcut Bilgiler Card */}
      <View className="rounded-xl p-6 mb-6 shadow-sm" style={{ backgroundColor: backgroundColor, borderColor: greenBorderColor, borderWidth: 1 }}>
        <TouchableOpacity
          className="flex-row items-center justify-between mb-4"
          onPress={toggleInfoSection}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
              <Ionicons name="information-circle" size={20} color={textColor} />
            </View>
            <Text className="text-lg font-bold" style={{ color: textColor }}>{t('mevcutBilgiler')}</Text>
          </View>
          <Ionicons
            name={isInfoExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={textColor}
          />
        </TouchableOpacity>

        {isInfoExpanded && (
          <View className="space-y-3">
            <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
              <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('secilenDepo')}:</Text>
              <Text className="font-semibold" style={{ color: textColor }}>{formData?.selectedDepo || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
              <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('hareketTipi')}:</Text>
              <Text className="font-semibold" style={{ color: textColor }}>{formData?.hucreTuru || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
              <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('cikisYeri')}:</Text>
              <Text className="font-semibold" style={{ color: textColor }}>{formData?.cikisYeri || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
              <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('projeKodu')}:</Text>
              <Text className="font-semibold" style={{ color: textColor }}>{formData?.projeKodu || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2">
              <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('aciklama')}:</Text>
              <Text className="font-semibold" style={{ color: textColor }}>{formData?.aciklamaText || t('belirtilmemis')}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Ürün Seçimi */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: textColor,
          marginBottom: 16
        }}>
          {t('siparisSecimi')} ({Object.values(selectedCategories).filter(Boolean).length} {t('siparisSecildi')})
        </Text>

        <View>
          {productCategories.map((category, index) => (
            <View
              key={category.id}
              style={{ backgroundColor: cardColor, borderRadius: 12, borderColor: borderColor, borderWidth: 1, overflow: 'hidden', marginVertical: 4 }}
            >
              {/* Category Header */}
              <TouchableOpacity
                style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', padding: 16,backgroundColor: index % 2 === 0 ? grayColor: blueColor}}
                onPress={() => toggleSection(String(category.id))}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{fontSize: 16, fontWeight: '600', color: textColor, marginBottom: 4}}>{category.cariUnvani}</Text>
                    <Text style={{fontSize: 14, color: textColor, opacity: 0.7, marginBottom: 4}}>{t('siparisNo')}: {category.siparisNo}</Text>
                    <Text style={{fontSize: 14, color: textColor, opacity: 0.7}}>{t('teslimTarihi')}: {category.teslimTarihi}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => toggleCategorySelection(String(category.id))}
                    style={{ marginRight: 12 }}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={selectedCategories[category.id] ? 'checkbox' : 'square-outline'}
                      size={24}
                      color={selectedCategories[category.id] ? primaryColor : textColor}
                    />
                  </TouchableOpacity>
                  <Ionicons
                    name={openSections[category.id] ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={textColor}
                  />
                </View>
              </TouchableOpacity>

              {/* Category Products */}
              {openSections[category.id] && (
                <View style={{ borderTopWidth: 1, borderTopColor: borderColor }}>
                  {category.products.map((product, productIndex) => (
                    <View
                      key={product.id}
                      style={{
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: productIndex % 2 === 0 ? grayColor : greenColor,
                        borderBottomWidth: productIndex < category.products.length - 1 ? 1 : 0,
                        borderBottomColor: borderColor
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: textColor, marginBottom: 4 }}>{product.name}</Text>
                        <Text style={{ fontSize: 14, color: textColor, opacity: 0.7, marginBottom: 4 }}>{t('stokKodu')}: {product.stokKodu}</Text>
                        <Text style={{ fontSize: 14, color: textColor, opacity: 0.7, marginBottom: 4 }}>{t('miktar')}: {product.miktar}</Text>
                        <Text style={{ fontSize: 14, color: textColor, opacity: 0.7, marginBottom: 4 }}>{t('stok')}: {product.stock}</Text>
                        <Text style={{ fontSize: 14, color: textColor, opacity: 0.7, marginBottom: 4 }}>{t('seriTakibi')}: {product.seriTakibi}</Text>
                        <Text style={{ fontSize: 14, color: textColor, opacity: 0.7 }}>{t('miktarKadarSeri')}: {product.miktarKadarSeri}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'center' }}>
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
          onPress={onBack}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
          <Text style={{
            color: textColor,
            fontSize: 16,
            fontWeight: '600'
          }}>
            {t('geri')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 128,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            backgroundColor: isLoading ? (isDarkMode ? '#6B7280' : '#9CA3AF') : blueColor,
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 4,
            shadowColor: isDarkMode ? '#000' : '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDarkMode ? 0.4 : 0.2,
            shadowRadius: 6,
            elevation: 4
          }}
          onPress={handleSubmit}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <>
              <View style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor: 'white',
                borderTopColor: 'transparent',
                borderRadius: 10,
                marginRight: 12
              }} />
              <Text style={{
                color: textColor,
                fontSize: 16,
                fontWeight: '600'
              }}>
                {t('isleniyor')}
              </Text>
            </>
          ) : (
            <>
              <Text style={{
                color: textColor,
                fontSize: 16,
                fontWeight: '600'
              }}>
                {t('ileri')}
              </Text>
              <Ionicons name="arrow-forward" size={20} color={textColor} style={{ marginLeft: 8 }} />
            </>
          )}
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        buttons={[
          {
            text: t('tamam'),
            onPress: () => setAlertVisible(false)
          }
        ]}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );

};

export default AmbarGirisSiparisBaglantiliForm;