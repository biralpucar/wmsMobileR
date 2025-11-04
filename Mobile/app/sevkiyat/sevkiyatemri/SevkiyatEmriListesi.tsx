import CustomDropdown from '@/components/CustomDropdown';
import { useDepo } from '@/contexts/DepoContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomAlert from '../../../components/CustomAlert';

interface DropdownOption {
    label: string;
    value: string;
}

interface RouteParams {
    selectedDepo?: string;
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

interface SevkiyatEmriListesiProps {
    selectedDepo?: string;
    onDetayPress?: (sevkiyat: SevkiyatEmri) => void;
    onBaslatPress?: (sevkiyat: SevkiyatEmri) => void;
    onDepoChange?: (newDepoValue: string) => void;
}

const SevkiyatEmriListesi: React.FC<SevkiyatEmriListesiProps> = ({
    selectedDepo: propSelectedDepo,
    onDetayPress,
    onBaslatPress,
    onDepoChange
}) => {
    const { theme, isDarkMode } = useTheme();
    const { selectedDepo, setSelectedDepo, depoOptions, selectedDepoInfo } = useDepo();
    const { t } = useLanguage();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const cardColor = useThemeColor({}, 'card');
    const borderColor = useThemeColor({}, 'border');
    const primaryColor = isDarkMode ? '#3B82F6' : '#2563EB';
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

    const [expandedSevkiyatlar, setExpandedSevkiyatlar] = useState<{ [key: string]: boolean }>({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Depo seçimi değiştiğinde context'i güncelle
    const handleDepoChange = (newDepoValue: string) => {
        setSelectedDepo(newDepoValue);
    };


    // Örnek veri
    const [sevkiyatEmirleri] = useState<SevkiyatEmri[]>([
        {
            id: "SEV001",
            tarih: "2024-01-15",
            durum: "Bekliyor",
            cikisDepoKodu: "D001",
            cikisDepoAdi: "Ana Depo",
            karsiDepoKodu: "002",
            karsiDepoAdi: "Şube Depo",
            cariKodu: "C001",
            cariAdi: "ABC Şirketi",
            projeKodu: "PRJ001",
            projeAdi: "Proje A",
            belgeSeriNo: "SEV2024001",
            eIrsaliye: true,
            aciklama1: "Acil sevkiyat",
            aciklama2: "Şube ihtiyacı",
            aciklama3: "Onay bekliyor",
            stoklar: []
        },
        {
            id: "SEV002",
            tarih: "2024-01-16",
            durum: "Toplanıyor",
            cikisDepoKodu: "D002",
            cikisDepoAdi: "Şube Depo",
            karsiDepoKodu: "003",
            karsiDepoAdi: "Bölge Depo",
            cariKodu: "C002",
            cariAdi: "XYZ Ltd.",
            projeKodu: "PRJ002",
            projeAdi: "Proje B",
            belgeSeriNo: "SEV2024002",
            eIrsaliye: false,
            aciklama1: "Normal sevkiyat",
            aciklama2: "Stok dengeleme",
            aciklama3: "İşlemde",
            stoklar: []
        },
        {
            id: "SEV003",
            tarih: "2024-01-17",
            durum: "Bekliyor",
            cikisDepoKodu: "D001",
            cikisDepoAdi: "Ana Depo",
            karsiDepoKodu: "004",
            karsiDepoAdi: "Merkez Depo",
            cariKodu: "C003",
            cariAdi: "DEF A.Ş.",
            projeKodu: "PRJ003",
            projeAdi: "Proje C",
            belgeSeriNo: "SEV2024003",
            eIrsaliye: true,
            aciklama1: "Tamamlanan sevkiyat",
            aciklama2: "Başarılı",
            aciklama3: "Arşivlendi",
            stoklar: []
        }
    ]);

    const toggleSevkiyatExpansion = (sevkiyatId: string) => {
        setExpandedSevkiyatlar(prev => ({
            ...prev,
            [sevkiyatId]: !prev[sevkiyatId]
        }));
    };

    const getStatusColor = (durum: string) => {
        switch (durum) {
            case 'Bekliyor':
                return yellowColor;
            case 'Toplanıyor':
                return purpleColor;
            case 'Tamamlandı':
                return greenColor;
            default:
                return blueColor;
        }
    };

    const getStatusText = (durum: string) => {
        switch (durum) {
            case 'Bekliyor':
                return t('bekliyor');
            case 'Toplanıyor':
                return t('toplaniyor');
            case 'Tamamlandı':
                return t('tamamlandi');
            default:
                return durum;
        }
    };


    const handleDetayPress = (sevkiyat: SevkiyatEmri) => {
        if (onDetayPress) {
            onDetayPress(sevkiyat);
        }
    };


    const handleBaslatPress = (sevkiyat: SevkiyatEmri) => {
        if (!selectedDepo) {
            setAlertMessage(t('lutfen-once-bir-depo-seciniz'));
            setAlertVisible(true);
        } else if (selectedDepo !== `${sevkiyat.cikisDepoKodu}`) {
            setAlertMessage(`${t('secilen-depo')} (${selectedDepo}) ${t('ile-sevkiyat-cikis-deposu')} (${sevkiyat.cikisDepoKodu} - ${sevkiyat.cikisDepoAdi}) ${t('farklidir-lutfen-uygun-depoyu-seciniz')}`);
            setAlertVisible(true);
        } else {
            if (onBaslatPress) {
                onBaslatPress(sevkiyat);
            }
        }
    };

    return (
        <>
            {/* Uyarı Mesajı - Depo seçilmemişse göster */}
            {!selectedDepo && (
                <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: yellowColor, borderColor: yellowBorderColor }}>
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="warning-outline" size={20} color={textColor} />
                        <Text className="font-medium ml-2" style={{ color: textColor }}>{t('depo-secimi-gerekli')}</Text>
                    </View>
                    <Text className="text-sm" style={{ color: textColor }}>
                        {t('ana-sayfadan-bir-depo-secimi-yapilmamis')}
                    </Text>
                </View>
            )}

            {/* Kaynak Depo Seçimi */}
            <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: cardColor, borderColor: greenBorderColor}}>
                <View className="flex-row items-center mb-3">
                    <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
                        <FontAwesome6 name="warehouse" size={20} color={textColor} />
                    </View>
                    <Text className="text-lg font-semibold" style={{ color: textColor }}>{t('secilen-depo')}</Text>
                </View>
                <CustomDropdown
                    label=""
                    icon="business-outline"
                    iconColor={blueBorderColor}
                    placeholder={t('kaynak-depo-seciniz')}
                    options={depoOptions}
                    value={selectedDepo || ''}
                    onSelect={(option) => handleDepoChange(option.value)}
                />
            </View>

            {/* Sevkiyat Listesi */}
            <View className='p-4 border rounded-xl' style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth:2}}>

                {/* Başlık */}
                <View className="flex-row items-center mb-6">
                    <MaterialCommunityIcons name="truck-fast-outline" size={24} color={textColor} />
                    <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('sevkiyat-emirleri')}</Text>
                </View>

                {sevkiyatEmirleri.length === 0 && (
                    <View className="items-center py-8">
                        <Ionicons name="document-outline" size={48} color={textColor} style={{ opacity: 0.5 }} />
                        <Text className="text-center mt-4" style={{ color: textColor, opacity: 0.7 }}>
                            {t('secilen-kriterlere-uygun-sevkiyat-emri-bulunamadi')}
                        </Text>
                    </View>
                )}

                <View>
                    {sevkiyatEmirleri.map((sevkiyat) => (
                        <View key={sevkiyat.id} style={{ backgroundColor: cardColor, marginBottom: 16, borderRadius: 12, borderWidth: 1, borderColor: greenBorderColor, overflow: 'hidden' }}>
                            {/* Sevkiyat Header */}
                            <TouchableOpacity
                                style={{ backgroundColor: backgroundColor, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: borderColor }}
                                onPress={() => toggleSevkiyatExpansion(sevkiyat.id)}
                                activeOpacity={0.7}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{
                                            width: 32,
                                            height: 32,
                                            backgroundColor: grayColor,
                                            borderRadius: 8,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 12
                                        }}>
                                            <FontAwesome6 name="truck-ramp-box" size={16} color={textColor} />
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: '600', color: textColor }}>{t('sevkiyat-emri')} #{sevkiyat.id}</Text>
                                            <Text style={{ fontSize: 14, color: textColor, opacity: 0.9 }}>{sevkiyat.tarih}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginRight: 12, backgroundColor: getStatusColor(sevkiyat.durum) }}>
                                            <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{getStatusText(sevkiyat.durum)}</Text>
                                        </View>
                                        <Ionicons
                                            name={expandedSevkiyatlar[sevkiyat.id] ? "chevron-up" : "chevron-down"}
                                            size={20}
                                            color="white"
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* Sevkiyat Detayları */}
                            {expandedSevkiyatlar[sevkiyat.id] && (
                                <View style={{ padding: 16 }}>
                                    {/* Depo Bilgileri */}
                                    <View style={{ marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('depo-bilgileri')}</Text>
                                        <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: blueBorderColor }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
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
                                    <View style={{ marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('cari-ve-proje')}</Text>
                                        <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: greenBorderColor }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cari')}:</Text>
                                                <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{sevkiyat.cariKodu} - {sevkiyat.cariAdi}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('e-irsaliye')}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 12,
                                            paddingVertical: 4,
                                            borderRadius: 20,
                                            backgroundColor: sevkiyat.eIrsaliye
                                                ? greenColor
                                                : redColor
                                        }}>
                                            <Ionicons
                                                name={sevkiyat.eIrsaliye ? 'checkmark' : 'close'}
                                                size={14}
                                                color={sevkiyat.eIrsaliye ? textColor : textColor}
                                            />
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                marginLeft: 4,
                                                color: textColor
                                            }}>
                                                {sevkiyat.eIrsaliye ? t('aktif') : t('pasif')}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Açıklamalar */}
                                    <View style={{ marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('aciklamalar')}</Text>
                                        <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: purpleBorderColor }}>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: textColor, marginBottom: 4 }}>1. {sevkiyat.aciklama1}</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: textColor, marginBottom: 4 }}>2. {sevkiyat.aciklama2}</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>3. {sevkiyat.aciklama3}</Text>
                                        </View>
                                    </View>

                                    {/* Aksiyon Butonları */}
                                    <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
                                        <TouchableOpacity
                                            style={{
                                                flex: 1,
                                                paddingVertical: 12,
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                backgroundColor: blueColor,
                                                gap: 8
                                            }}
                                            onPress={() => handleDetayPress(sevkiyat)}
                                        >
                                            <Ionicons name="eye" size={16} color={textColor} />
                                            <Text style={{ color: textColor, fontWeight: '700', fontSize: 14 }}>{t('detay')}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{
                                                flex: 1,
                                                paddingVertical: 12,
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                backgroundColor: greenColor,
                                                gap: 8
                                            }}
                                            onPress={() => handleBaslatPress(sevkiyat)}
                                        >
                                            <Text style={{ color: textColor, fontWeight: '700', fontSize: 14 }}>{t('baslat')}</Text>
                                            <Ionicons name="play" size={16} color={textColor} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>

            {/* Custom Alert */}
            <CustomAlert
                visible={alertVisible}
                title={t('depo-uyarisi')}
                message={alertMessage}
                buttons={[
                    {
                        text: t('tamam'),
                        onPress: () => setAlertVisible(false),
                        style: "default"
                    }
                ]}
                onClose={() => setAlertVisible(false)}
            />
        </>
    );
};

export default SevkiyatEmriListesi;