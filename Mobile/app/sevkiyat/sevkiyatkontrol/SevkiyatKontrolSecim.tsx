import CustomAlert from '@/components/CustomAlert';
import CustomDropdown from '@/components/CustomDropdown';
import { useDepo } from '@/contexts/DepoContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SevkiyatKontrolSecimProps {
    onClose: () => void;
    onSelect: (selectedData: any[]) => void;
}

const SevkiyatKontrolSecim: React.FC<SevkiyatKontrolSecimProps> = ({
    onClose,
    onSelect
}) => {
    const { selectedDepo, setSelectedDepo, depoOptions, selectedDepoInfo } = useDepo();
    const { t } = useLanguage();
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
    const secondaryColor = useThemeColor({}, 'tabIconDefault');
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
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'error' as const });
    const [isInfoExpanded, setIsInfoExpanded] = useState(true);
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
    const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({});


    // Depo koduna göre depo adını bulan fonksiyon
    const getDepoLabel = (depoCode: string) => {
        const depo = depoOptions.find(option => option.value === depoCode);
        return depo ? depo.label : depoCode;
    };

    const secimOptions = [
        {
            id: '1',
            cariadi: 'ABC A.Ş',
            carikodu: 'DEL001',
            details: [
                { date: "17.07.2025", sevkiyatno: '12213', nakiyetipi: 'a' },
            ]
        },
        {
            id: '2',
            cariadi: 'ABC A.Ş',
            carikodu: 'DEL001',
            details: [
                { date: "17.07.2025", sevkiyatno: '45315', nakiyetipi: 'b' },
            ]
        },
        {
            id: '3',
            cariadi: 'ABC A.Ş',
            carikodu: 'DEL003',
            details: [
                { date: "17.07.2025", sevkiyatno: '51632', nakiyetipi: 'c' },
            ]
        },
        {
            id: '4',
            cariadi: 'ABC A.Ş',
            carikodu: 'DEL004',
            details: [
                { date: "17.07.2025", sevkiyatno: '45165', nakiyetipi: 'd' },
            ]
        },

    ];

    const toggleInfoSection = () => {
        setIsInfoExpanded(prev => !prev);
    };

    const toggleSection = (sectionId: string) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const toggleOptionSelection = (optionId: string) => {
        setSelectedOption(prev => prev === optionId ? '' : optionId);
    };

    const toggleCategorySelection = (categoryId: string) => {
        setSelectedCategories(prev => {
            const selectedOption = secimOptions.find(option => option.id === categoryId);
            if (!selectedOption) return prev;

            const selectedCariKodu = selectedOption.carikodu;
            const isCurrentlySelected = prev[categoryId];

            // Eğer seçim kaldırılıyorsa, sadece bu kategoriyi kaldır
            if (isCurrentlySelected) {
                const newState = { ...prev };
                delete newState[categoryId];
                setSelectedOption('');
                return newState;
            }

            // Eğer yeni seçim yapılıyorsa, önce farklı carikodu'na sahip tüm seçimleri kaldır
            const newState: { [key: string]: boolean } = {};

            // Aynı carikodu'na sahip olan mevcut seçimleri koru
            Object.keys(prev).forEach(key => {
                const option = secimOptions.find(opt => opt.id === key);
                if (option && option.carikodu === selectedCariKodu && prev[key]) {
                    newState[key] = true;
                }
            });

            // Yeni seçimi ekle
            newState[categoryId] = true;
            setSelectedOption(categoryId);

            return newState;
        });
    };

    const handleSubmit = async () => {
        // Seçili kategorileri kontrol et
        const hasSelectedCategory = Object.values(selectedCategories).some(selected => selected);
        if (!hasSelectedCategory) {
            setAlertConfig({ title: t('error'), message: t('pleaseSelectAtLeastOneControlType'), type: 'error' });
            setAlertVisible(true);
            return;
        }

        setIsLoading(true);

        // Simulated validation
        setTimeout(() => {
            setIsLoading(false);

            // Seçili kategorilerin tam detaylarını al
            const selectedKontrolData = secimOptions
                .filter(option => selectedCategories[option.id])
                .map(option => ({
                    id: option.id,
                    cariadi: option.cariadi,
                    carikodu: option.carikodu,
                    details: option.details
                }));

            // İlk seçili kontrol verisini al ve SevkiyatKontrol formatına dönüştür
            const firstSelectedKontrol = selectedKontrolData[0];
            if (firstSelectedKontrol) {
                const kontrol = {
                    id: firstSelectedKontrol.id,
                    tarih: firstSelectedKontrol.details[0]?.date || new Date().toLocaleDateString('tr-TR'),
                    durum: 'Bekliyor' as const,
                    DepoKodu: selectedDepo || '',
                    DepoAdi: getDepoLabel(selectedDepo || ''),
                    cariKodu: firstSelectedKontrol.carikodu,
                    cariAdi: firstSelectedKontrol.cariadi,
                    nakliyeTipi: firstSelectedKontrol.details[0]?.nakiyetipi || '',
                    projeKodu: '',
                    projeAdi: '',
                    belgeSeriNo: firstSelectedKontrol.details[0]?.sevkiyatno || '',
                    stoklar: []
                };

                // onSelect callback'ini çağırarak parent component'e kontrol verisini gönder
                // Bu sayede SevkiyatKontrol.tsx'te handleSecimSelect çalışacak ve başlat ekranına geçecek
                onSelect([kontrol]);
            }
        }, 500);
    };

    return (
        <>
            {/* Uyarı Mesajı - Sadece home.tsx'ten depo seçilmemişse ve dropdown'dan da seçilmemişse göster */}
            {!selectedDepo && (
                <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: yellowColor, borderColor: yellowBorderColor }}>
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="warning-outline" size={20} color={textColor} />
                        <Text className="font-medium ml-2" style={{ color: textColor }}>{t('warehouseSelectionRequired')}</Text>
                    </View>
                    <Text className="text-sm" style={{ color: textColor }}>
                        {t('noWarehouseSelectedFromHomePage')}
                    </Text>
                </View>
            )}


            {/* Kaynak Depo Seçimi */}
            <View style={{
                backgroundColor: cardColor,
                borderRadius: 12,
                padding: 16,
                marginBottom: 24,
                borderColor: greenBorderColor,
                borderWidth: 1
            }}>
                <View className="flex-row items-center mb-3">
                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: blueColor,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12
                    }}>
                        <Ionicons name="business-outline" size={20} color={textColor} />
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>{t('selectedWarehouse')}</Text>
                </View>
                <CustomDropdown
                    label=""
                    icon="business-outline"
                    iconColor={primaryColor}
                    placeholder={t('selectSourceWarehouse')}
                    options={depoOptions}
                    value={selectedDepo}
                    onSelect={(option) => setSelectedDepo(option.value)}
                />
            </View>


            {/* Kontrol Türü Seçimi */}
            <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
                {/* Başlık */}
                <View className="flex-row items-center mb-6">
                    <MaterialCommunityIcons name="truck-fast-outline" size={24} color={textColor} />
                    <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('shipmentControl')}</Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginBottom: 16 }}>
                    {t('controlSelection')} ({Object.values(selectedCategories).filter(Boolean).length} {t('controlSelected')})
                </Text>
                <View style={{ marginBottom: 24, }}>
                    {secimOptions.map((option, index) => (
                        <View key={option.id} style={{
                            backgroundColor: grayColor,
                            borderRadius: 12,
                            marginVertical: 8
                        }}>
                            {/* Option Header */}
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 16,
                                    borderRadius: 12,
                                    backgroundColor: index % 2 === 0 ? grayColor : blueColor
                                }}
                                onPress={() => toggleSection(String(option.id))}
                                activeOpacity={0.7}
                            >
                                <View className="flex-row items-center flex-1">
                                    <View className="flex-1">
                                        <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginBottom: 4 }}>{t('customerName')}: {option.cariadi}</Text>
                                        <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginBottom: 4 }}>{t('customerCode')}: {option.carikodu}</Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center">
                                    <TouchableOpacity
                                        onPress={() => toggleCategorySelection(String(option.id))}
                                        style={{ marginRight: 12 }}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons
                                            name={selectedCategories[option.id] ? 'checkbox' : 'square-outline'}
                                            size={24}
                                            color={selectedCategories[option.id] ? primaryColor : textColor}
                                        />
                                    </TouchableOpacity>
                                    <Ionicons
                                        name={openSections[option.id] ? 'chevron-up' : 'chevron-down'}
                                        size={20}
                                        color={secondaryColor}
                                    />
                                </View>
                            </TouchableOpacity>

                            {/* Option Details */}
                            {openSections[option.id] && (
                                <View style={{ borderColor: greenBorderColor, borderWidth: 1, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                                    {option.details.map((detail, detailIndex) => (
                                        <View
                                            key={detail.sevkiyatno}
                                            style={{
                                                padding: 16,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: detailIndex % 2 === 0 ? surfaceColor : surfaceColor,
                                                borderBottomColor: detailIndex < option.details.length - 1 ? borderColor : 'transparent',
                                                borderBottomWidth: detailIndex < option.details.length - 1 ? 1 : 0
                                            }}
                                        >
                                            <View className="flex-1">
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginBottom: 4 }}>{t('date')}: </Text>
                                                    <Text style={{ fontSize: 16, fontWeight: '400', color: textColor, marginBottom: 4 }}>{detail.date}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginBottom: 4 }}>{t('warehouse')}: </Text>
                                                    <Text style={{ fontSize: 16, fontWeight: '400', color: textColor, marginBottom: 4 }}>{selectedDepo ? `${selectedDepo} - ${getDepoLabel(selectedDepo)}` : t('notSelected')}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginBottom: 4 }}>{t('shipmentNumber')}: </Text>
                                                    <Text style={{ fontSize: 16, fontWeight: '400', color: textColor, marginBottom: 4 }}>{detail.sevkiyatno}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginBottom: 4 }}>{t('transportType')}: </Text>
                                                    <Text style={{ fontSize: 16, fontWeight: '400', color: textColor, marginBottom: 4 }}>{detail.nakiyetipi}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>


                {/* Action Buttons */}
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            width: 128,
                            borderRadius: 12,
                            paddingVertical: 16,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: borderColor,
                            backgroundColor: surfaceColor,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginHorizontal: 4,
                            shadowColor: isDarkMode ? '#000' : '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: isDarkMode ? 0.3 : 0.1,
                            shadowRadius: 4,
                            elevation: 2
                        }}
                        onPress={onClose}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
                        <Text style={{
                            color: textColor,
                            fontSize: 16,
                            fontWeight: '600'
                        }}>
                            {t('back')}
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
                                    borderColor: textColor,
                                    borderTopColor: 'transparent',
                                    borderRadius: 10,
                                    marginRight: 12
                                }} />
                                <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('processing')}</Text>
                            </>
                        ) : (
                            <>
                                <Text style={{
                                    color: textColor,
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginRight: 6
                                }}>
                                    {t('next')}
                                </Text>
                                <Ionicons name="arrow-forward" size={20} color={textColor} />
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <CustomAlert
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                buttons={[
                    {
                        text: t('ok'),
                        onPress: () => setAlertVisible(false)
                    }
                ]}
                onClose={() => setAlertVisible(false)}
            />
        </>
    );
};

export default SevkiyatKontrolSecim;